import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, Loader2, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { authApi } from '../api/resumeApi';

export const GoogleAuthModal = ({ isOpen, onClose, redirectPath = '/dashboard' }) => {
  const { loginWithGoogle, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [gsiReady, setGsiReady] = useState(false);
  
  // Google Client ID state
  const [clientId, setClientId] = useState('');

  const googleBtnRef = useRef(null);

  // Fetch active Google Client ID configuration
  useEffect(() => {
    if (!isOpen) return;

    const fetchConfig = async () => {
      try {
        const res = await authApi.getGoogleConfig();
        const activeId = res.data?.client_id || import.meta.env.VITE_GOOGLE_CLIENT_ID || '';
        setClientId(activeId);
      } catch (err) {
        console.warn('Failed to load Google config', err);
      }
    };

    fetchConfig();
  }, [isOpen]);

  // Initialize official Google Identity Services SDK
  useEffect(() => {
    if (!isOpen || !clientId) return;

    let checkInterval = null;

    const initGoogleGSI = () => {
      if (window.google?.accounts?.id && clientId) {
        try {
          window.google.accounts.id.initialize({
            client_id: clientId,
            callback: async (response) => {
              if (response.credential) {
                setLoading(true);
                setError(null);
                try {
                  await loginWithGoogle({ credential: response.credential });
                  if (onClose) onClose();
                  navigate(redirectPath);
                } catch (err) {
                  console.error('Google token verification failed', err);
                  setError('Google token verification failed. Please try again.');
                } finally {
                  setLoading(false);
                }
              }
            }
          });

          if (googleBtnRef.current) {
            googleBtnRef.current.innerHTML = '';
            window.google.accounts.id.renderButton(googleBtnRef.current, {
              theme: 'outline',
              size: 'large',
              width: 320,
              text: 'continue_with',
              shape: 'pill'
            });
            setGsiReady(true);
          }

          window.google.accounts.id.prompt();
          if (checkInterval) clearInterval(checkInterval);
        } catch (e) {
          console.warn('Google GSI error:', e);
        }
      }
    };

    initGoogleGSI();
    checkInterval = setInterval(initGoogleGSI, 500);

    return () => {
      if (checkInterval) clearInterval(checkInterval);
    };
  }, [isOpen, clientId, redirectPath]);

  // Fallback OAuth2 popup if clicked while GSI renders or as alternative
  const handleGooglePopupLogin = () => {
    if (!clientId) {
      setError('Google Client ID is missing. Please check backend .env');
      return;
    }

    if (!window.google?.accounts?.oauth2) {
      setError('Connecting to Google services... Please click again in 2 seconds.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const client = window.google.accounts.oauth2.initTokenClient({
        client_id: clientId,
        scope: 'email profile openid',
        callback: async (tokenResponse) => {
          if (tokenResponse.error) {
            if (tokenResponse.error === 'origin_mismatch' || String(tokenResponse.error_description || '').includes('origin_mismatch')) {
              setError('Error 400: origin_mismatch. Please add your origin (e.g. http://localhost:3003 or production domain) to Authorized JavaScript origins in Google Cloud Console.');
            } else {
              setError(tokenResponse.error_description || 'Google sign-in was cancelled or failed.');
            }
            setLoading(false);
            return;
          }

          if (tokenResponse.access_token) {
            try {
              const userInfoRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: { Authorization: `Bearer ${tokenResponse.access_token}` }
              });
              const profile = await userInfoRes.json();

              if (profile.email) {
                await loginWithGoogle({
                  email: profile.email,
                  name: profile.name || profile.given_name || profile.email.split('@')[0],
                  picture: profile.picture || ''
                });
                if (onClose) onClose();
                navigate(redirectPath);
              } else {
                throw new Error('No email returned from Google profile');
              }
            } catch (err) {
              console.error('Failed to get Google profile', err);
              setError('Failed to fetch profile from Google. Please try again.');
            } finally {
              setLoading(false);
            }
          }
        }
      });

      client.requestAccessToken({ prompt: 'select_account' });
    } catch (e) {
      console.error('Google popup error', e);
      setError('Failed to open Google sign-in window.');
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.85)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999999,
        padding: '1rem',
        animation: 'fadeIn 0.2s ease-out'
      }}
      // Dismiss modal on backdrop click
      onClick={(e) => {
        if (onClose && e.target === e.currentTarget && !loading) {
          onClose();
        }
      }}
    >
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: '24px',
          maxWidth: '420px',
          width: '100%',
          overflow: 'hidden',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
          border: '1px solid rgba(226, 232, 240, 0.9)',
          position: 'relative'
        }}
      >
        {/* Close button to return to browsing */}
        {onClose && !loading && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            style={{
              position: 'absolute',
              top: '1.25rem',
              right: '1.25rem',
              background: '#F1F5F9',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#64748B',
              cursor: 'pointer',
              zIndex: 10,
              fontSize: '18px',
              fontWeight: 'bold',
              transition: 'background 0.2s'
            }}
          >
            ×
          </button>
        )}

        {/* Modal Header */}
        <div style={{ padding: '2.5rem 2rem 1.5rem', textAlign: 'center' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              margin: '0 auto 1.25rem',
              borderRadius: '20px',
              background: '#FFFFFF',
              border: '1.5px solid #E2E8F0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 20px -4px rgba(0,0,0,0.08)'
            }}
          >
            {/* Google SVG Icon */}
            <svg width="32" height="32" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.79l7.97-6.2z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
          </div>

          <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
            Sign In with Google
          </h3>
          <p style={{ fontSize: '0.9rem', color: '#64748B', lineHeight: 1.5, margin: 0 }}>
            Sign up or log in to NextGen Resume to access all resume templates, AI builder, and personal dashboard.
          </p>
        </div>

        <div style={{ padding: '0 2rem 2.25rem', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
          {error && (
            <div style={{
              width: '100%',
              background: '#FEF2F2',
              border: '1px solid #FCA5A5',
              borderRadius: '12px',
              padding: '0.85rem',
              color: '#DC2626',
              fontSize: '0.82rem',
              lineHeight: 1.4,
              display: 'flex',
              alignItems: 'flex-start',
              gap: '8px'
            }}>
              <AlertCircle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>{error}</span>
            </div>
          )}

          {loading && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#4F46E5', fontSize: '0.9rem', fontWeight: 600 }}>
              <Loader2 size={20} className="animate-spin" /> Verifying Google Account...
            </div>
          )}

          {/* THE REAL OFFICIAL GOOGLE SIGN-IN BUTTON CONTAINER */}
          <div 
            style={{ 
              width: '100%', 
              display: 'flex', 
              justifyContent: 'center', 
              minHeight: '44px',
              alignItems: 'center' 
            }}
          >
            <div ref={googleBtnRef} style={{ display: gsiReady ? 'block' : 'none' }} />
            
            {/* Display clean styled button until GSI iframe mounts or if clicked directly */}
            {!gsiReady && (
              <button
                type="button"
                onClick={handleGooglePopupLogin}
                disabled={loading}
                style={{
                  width: '320px',
                  height: '44px',
                  backgroundColor: '#FFFFFF',
                  color: '#1F2937',
                  border: '1px solid #DADCE0',
                  borderRadius: '24px',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
                  transition: 'all 0.2s ease',
                  opacity: loading ? 0.7 : 1
                }}
              >
                <svg width="18" height="18" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.79l7.97-6.2z"/>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                </svg>
                Continue with Google
              </button>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '0.75rem', color: '#94A3B8', fontSize: '0.75rem' }}>
            <ShieldCheck size={14} color="#10B981" />
            <span>Secure 256-bit OAuth 2.0 Google Verification</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleAuthModal;
