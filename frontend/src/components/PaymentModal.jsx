import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, Zap, Lock, X, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import { resumeApi } from '../api/resumeApi';

export const PaymentModal = ({ isOpen, onClose, resume, onPaymentSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [demoNotice, setDemoNotice] = useState(null);

  if (!isOpen) return null;

  const handlePay = async (simulateDemo = false) => {
    setLoading(true);
    setError(null);
    setDemoNotice(null);

    try {
      // 1. Create order on backend
      const orderRes = await resumeApi.createRazorpayOrder(resume.id);
      const data = orderRes.data;

      // If already paid, trigger download immediately
      if (data.already_paid) {
        onPaymentSuccess();
        onClose();
        return;
      }

      const { order_id, amount, currency, key_id, is_demo_mode } = data;

      // If simulated or no real Razorpay keys configured yet
      if (is_demo_mode && (simulateDemo || !window.Razorpay || !key_id || key_id.startsWith('rzp_test_placeholder'))) {
        setDemoNotice('Demo Mode: Simulating ₹29 payment verification. Add your real Razorpay Key in backend/.env for live UPI/Cards.');
        
        // Auto verify demo payment
        const verifyRes = await resumeApi.verifyRazorpayPayment(resume.id, {
          razorpay_order_id: order_id,
          razorpay_payment_id: `pay_demo_${Date.now()}`,
          razorpay_signature: 'demo_signature'
        });

        if (verifyRes.data?.success) {
          setTimeout(() => {
            onPaymentSuccess();
            onClose();
          }, 800);
        }
        return;
      }

      // Check if Razorpay SDK loaded
      if (!window.Razorpay) {
        setError('Razorpay SDK failed to load. Please check your internet connection or try again.');
        setLoading(false);
        return;
      }

      // 2. Open standard Razorpay Checkout
      const options = {
        key: key_id,
        amount: amount, // in paise
        currency: currency || 'INR',
        name: 'NextGen Resume',
        description: `ATS Resume PDF Download - ₹${amount / 100}`,
        image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
        order_id: order_id,
        handler: async function (response) {
          try {
            setLoading(true);
            const verifyRes = await resumeApi.verifyRazorpayPayment(resume.id, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            });

            if (verifyRes.data?.success) {
              onPaymentSuccess();
              onClose();
            } else {
              setError('Payment verification failed. Please contact support.');
            }
          } catch (err) {
            console.error('Verification error:', err);
            setError(err.response?.data?.error || 'Payment verification failed.');
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          name: resume?.personal_info?.full_name || 'Candidate',
          email: resume?.personal_info?.email || '',
          contact: resume?.personal_info?.phone || ''
        },
        theme: {
          color: '#6366F1'
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (resp) {
        setError(resp.error?.description || 'Payment failed. Please try another method.');
        setLoading(false);
      });
      rzp.open();
    } catch (err) {
      console.error('Order creation error:', err);
      setError(err.response?.data?.error || 'Failed to initialize payment order. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 99999,
        padding: '1rem',
        animation: 'fadeIn 0.2s ease-out'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget && !loading) onClose();
      }}
    >
      <div 
        style={{
          background: '#FFFFFF',
          borderRadius: '20px',
          maxWidth: '460px',
          width: '100%',
          overflow: 'hidden',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          border: '1px solid rgba(226, 232, 240, 0.8)',
          position: 'relative'
        }}
      >
        {/* Header Ribbon */}
        <div style={{
          background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
          padding: '1.75rem 1.5rem',
          color: '#FFFFFF',
          position: 'relative',
          textAlign: 'center'
        }}>
          {!loading && (
            <button
              onClick={onClose}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                cursor: 'pointer'
              }}
            >
              <X size={18} />
            </button>
          )}

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(255, 255, 255, 0.2)',
            padding: '4px 12px',
            borderRadius: '20px',
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            marginBottom: '0.75rem'
          }}>
            <Zap size={14} /> Instant PDF Unlock
          </div>

          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0 0 0.5rem 0', letterSpacing: '-0.02em' }}>
            Download Official ATS Resume
          </h3>
          <p style={{ margin: 0, fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.85)' }}>
            Unlock high-res printable PDF ready for recruiter ATS screening
          </p>
        </div>

        {/* Pricing Box */}
        <div style={{ padding: '1.5rem' }}>
          <div style={{
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: '14px',
            padding: '1rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.25rem'
          }}>
            <div>
              <div style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 600 }}>One-Time Download Fee</div>
              <div style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: 600 }}>Lifetime access for this resume</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ textDecoration: 'line-through', color: '#94A3B8', fontSize: '0.9rem', marginRight: '6px' }}>₹199</span>
              <span style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1E293B' }}>₹29</span>
            </div>
          </div>

          {/* Feature Checklist */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#334155' }}>
              <CheckCircle2 size={16} color="#10B981" />
              <span><strong>100% ATS Friendly</strong> formatting & vector font rendering</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#334155' }}>
              <CheckCircle2 size={16} color="#10B981" />
              <span><strong>Print-Ready HD PDF</strong> with zero watermarks</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#334155' }}>
              <CheckCircle2 size={16} color="#10B981" />
              <span><strong>Instant Download</strong> automatically once payment is verified</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#334155' }}>
              <CheckCircle2 size={16} color="#10B981" />
              <span>Supports UPI (Google Pay, PhonePe, Paytm), Cards & Net Banking</span>
            </div>
          </div>

          {error && (
            <div style={{
              background: '#FEF2F2',
              border: '1px solid #FCA5A5',
              borderRadius: '10px',
              padding: '0.75rem',
              color: '#DC2626',
              fontSize: '0.82rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '1rem'
            }}>
              <AlertCircle size={16} style={{ flexShrink: 0 }} />
              <span>{error}</span>
            </div>
          )}

          {demoNotice && (
            <div style={{
              background: '#EFF6FF',
              border: '1px solid #93C5FD',
              borderRadius: '10px',
              padding: '0.75rem',
              color: '#1D4ED8',
              fontSize: '0.8rem',
              marginBottom: '1rem',
              lineHeight: 1.4
            }}>
              💡 {demoNotice}
            </div>
          )}

          {/* Pay Button */}
          <button
            onClick={() => handlePay(false)}
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.85rem',
              background: 'linear-gradient(135deg, #4F46E5 0%, #6366F1 100%)',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '12px',
              fontSize: '1rem',
              fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 10px 15px -3px rgba(79, 70, 229, 0.3)',
              transition: 'all 0.2s',
              opacity: loading ? 0.8 : 1
            }}
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" /> Processing Payment...
              </>
            ) : (
              <>
                <Lock size={16} /> Pay ₹29 & Download PDF <ArrowRight size={16} />
              </>
            )}
          </button>

          {/* Payment Trust Footer */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            marginTop: '1rem',
            color: '#94A3B8',
            fontSize: '0.75rem'
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <ShieldCheck size={14} color="#10B981" /> 256-bit Encrypted
            </span>
            <span>•</span>
            <span>Secured by Razorpay</span>
          </div>
        </div>
      </div>
    </div>
  );
};
