import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useResume } from '../context/ResumeContext';
import { Sparkles, ChevronDown, FileText, Target, Layout, ShieldCheck, Menu, X, LogOut, User as UserIcon } from 'lucide-react';
import { GoogleAuthModal } from './GoogleAuthModal';
import { UserAvatar, getCleanFirstName } from './UserAvatar';

export const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout, showAuthModal, authRedirectPath, openAuthModal, closeAuthModal } = useAuth();
  const { resumes, createResume } = useResume();
  const navigate = useNavigate();
  const location = useLocation();
  const [toolsDropdown, setToolsDropdown] = useState(false);
  const [careerDropdown, setCareerDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (e, path) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (!isAuthenticated) {
      openAuthModal(path);
      return;
    }
    navigate(path);
  };

  const handleBuildClick = async () => {
    setMobileMenuOpen(false);
    if (!isAuthenticated) {
      openAuthModal('/templates');
      return;
    }
    navigate('/templates');
  };

  return (
    <header className="site-header">
      <div className="header-container">
        {/* Brand Logo */}
        <Link to="/" className="brand-logo-container" onClick={() => setMobileMenuOpen(false)}>
          <div className="sparkle-icon-wrapper" style={{ background: '#ee571d' }}>
            <Sparkles size={20} className="sparkle-icon" color="#fff" />
          </div>
          <div className="brand-text-group">
            <span className="brand-title" style={{ fontSize: '1.4rem', color: '#0F172A', fontWeight: '800' }}>
              NextGen<span style={{ color: '#ee571d' }}> Resume</span>
            </span>
          </div>
        </Link>

        {/* Center Navigation Links (Desktop) */}
        <nav className="center-nav-links desktop-nav">
          <button 
            type="button"
            onClick={(e) => handleNavClick(e, '/templates')} 
            className="nav-item"
            style={{ background: 'none', border: 'none', font: 'inherit', cursor: 'pointer', padding: 0 }}
          >
            Resume Templates
          </button>
          <Link to="/objectives-summaries" className="nav-item">
            Objectives & Summaries
          </Link>

          {/* Career Advice Dropdown */}
          <div 
            className="nav-dropdown-wrapper"
            onMouseEnter={() => setCareerDropdown(true)}
            onMouseLeave={() => setCareerDropdown(false)}
          >
            <span className="nav-item dropdown-trigger" style={{ cursor: 'pointer' }}>
              Career Advice <ChevronDown size={14} className="chevron" />
            </span>
            {careerDropdown && (
              <div className="nav-dropdown-menu">
                <Link to="/resume-writing-guide" onClick={() => setCareerDropdown(false)} className="dropdown-link">
                  <Target size={16} /> Resume Writing Guide
                </Link>
                <Link to="/career-interview-tips" onClick={() => setCareerDropdown(false)} className="dropdown-link">
                  <Layout size={16} /> Career & Interview Tips
                </Link>
              </div>
            )}
          </div>

          {/* Tools Dropdown */}
          <div 
            className="nav-dropdown-wrapper"
            onMouseEnter={() => setToolsDropdown(true)}
            onMouseLeave={() => setToolsDropdown(false)}
          >
            <span className="nav-item dropdown-trigger" style={{ cursor: 'pointer' }}>
              Tools <ChevronDown size={14} className="chevron" />
            </span>
            {toolsDropdown && (
              <div className="nav-dropdown-menu">
                <button 
                  type="button"
                  onClick={(e) => handleNavClick(e, '/job-analyzer')} 
                  className="dropdown-link"
                  style={{ width: '100%', background: 'none', border: 'none', font: 'inherit', textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <ShieldCheck size={16} /> Free ATS Resume Checker
                </button>
                <button 
                  type="button"
                  onClick={(e) => handleNavClick(e, '/dashboard')} 
                  className="dropdown-link"
                  style={{ width: '100%', background: 'none', border: 'none', font: 'inherit', textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <FileText size={16} /> Dashboard
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* Right Actions (Desktop) */}
        <div className="header-actions desktop-actions">
          {isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Link 
                to="/dashboard" 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px', 
                  textDecoration: 'none', 
                  padding: '6px 12px',
                  borderRadius: '20px',
                  background: '#F1F5F9',
                  color: '#1E293B',
                  fontWeight: 600,
                  fontSize: '0.88rem',
                  border: '1px solid #E2E8F0'
                }}
              >
                <UserAvatar 
                  src={user?.picture} 
                  name={user?.name || user?.username} 
                  size={24} 
                />
                <span>{getCleanFirstName(user?.name, user?.username)}</span>
              </Link>

              {isAdmin && (
                <Link 
                  to="/admin-dashboard" 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '6px', 
                    textDecoration: 'none', 
                    padding: '6px 12px',
                    borderRadius: '20px',
                    background: '#0F172A',
                    color: '#FFFFFF',
                    fontWeight: 700,
                    fontSize: '0.82rem',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                  }}
                >
                  <ShieldCheck size={14} color="#38BDF8" />
                  <span>Admin Panel</span>
                </Link>
              )}

              <button
                onClick={logout}
                style={{
                  background: 'transparent',
                  border: '1px solid #E2E8F0',
                  padding: '6px 10px',
                  borderRadius: '8px',
                  fontSize: '0.82rem',
                  color: '#64748B',
                  cursor: 'pointer',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
                title="Logout"
              >
                <LogOut size={14} />
              </button>

              <button 
                onClick={handleBuildClick} 
                className="btn-build-resume-orange"
                style={{ 
                  backgroundColor: '#ee571d', 
                  color: '#fff', 
                  padding: '8px 16px', 
                  borderRadius: '8px', 
                  fontWeight: 700, 
                  border: 'none', 
                  cursor: 'pointer', 
                  fontSize: '0.9rem' 
                }}
              >
                Build Resume
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                onClick={openAuthModal}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  padding: '8px 14px',
                  borderRadius: '8px',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  color: '#1E293B',
                  cursor: 'pointer',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                }}
              >
                <svg width="18" height="18" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.79l7.97-6.2z"/>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                </svg>
                Sign in with Google
              </button>

              <button 
                onClick={handleBuildClick} 
                className="btn-build-resume-orange"
                style={{ 
                  backgroundColor: '#ee571d', 
                  color: '#fff', 
                  padding: '9px 18px', 
                  borderRadius: '8px', 
                  fontWeight: 700, 
                  border: 'none', 
                  cursor: 'pointer', 
                  fontSize: '0.92rem' 
                }}
              >
                Build My Resume
              </button>
            </div>
          )}
        </div>

        {/* Hamburger Toggle Button (Mobile) */}
        <button
          type="button"
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={24} color="#0F172A" /> : <Menu size={24} color="#0F172A" />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer">
          {isAuthenticated && (
            <div style={{ padding: '12px 16px', background: '#F8FAFC', borderRadius: '10px', marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <UserAvatar 
                  src={user?.picture} 
                  name={user?.name || user?.username} 
                  size={36} 
                />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#1E293B' }}>{user?.name || user?.username}</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>{user?.email}</div>
                </div>
              </div>
              <button onClick={() => { logout(); setMobileMenuOpen(false); }} style={{ background: 'none', border: 'none', color: '#EF4444', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}>
                Logout
              </button>
            </div>
          )}

          <button 
            type="button"
            className="mobile-nav-item" 
            onClick={(e) => handleNavClick(e, '/templates')}
            style={{ width: '100%', background: 'none', border: 'none', font: 'inherit', textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
          >
            <Layout size={18} /> Resume Templates
          </button>
          <Link to="/objectives-summaries" className="mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>
            <Sparkles size={18} /> Objectives & Summaries
          </Link>
          <Link to="/resume-writing-guide" className="mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>
            <Target size={18} /> Resume Writing Guide
          </Link>
          <Link to="/career-interview-tips" className="mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>
            <Layout size={18} /> Career & Interview Tips
          </Link>
          <button 
            type="button"
            className="mobile-nav-item" 
            onClick={(e) => handleNavClick(e, '/job-analyzer')}
            style={{ width: '100%', background: 'none', border: 'none', font: 'inherit', textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
          >
            <ShieldCheck size={18} /> Free ATS Resume Checker
          </button>
          <button 
            type="button"
            className="mobile-nav-item" 
            onClick={(e) => handleNavClick(e, '/dashboard')}
            style={{ width: '100%', background: 'none', border: 'none', font: 'inherit', textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
          >
            <FileText size={18} /> User Dashboard
          </button>

          {isAuthenticated && isAdmin && (
            <button 
              type="button"
              className="mobile-nav-item" 
              onClick={(e) => handleNavClick(e, '/admin-dashboard')} 
              style={{ width: '100%', background: 'none', border: 'none', font: 'inherit', textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', color: '#4F46E5', fontWeight: 700 }}
            >
              <ShieldCheck size={18} color="#4F46E5" /> Admin Panel & Users
            </button>
          )}

          {!isAuthenticated && (
            <div style={{ paddingTop: '8px', paddingBottom: '4px' }}>
              <button
                onClick={() => { setMobileMenuOpen(false); openAuthModal(); }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  background: '#FFFFFF',
                  border: '1.5px solid #E2E8F0',
                  padding: '12px',
                  borderRadius: '10px',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  color: '#1E293B',
                  cursor: 'pointer'
                }}
              >
                <svg width="20" height="20" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.79l7.97-6.2z"/>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                </svg>
                Sign in with Google
              </button>
            </div>
          )}

          <div style={{ paddingTop: '10px' }}>
            <button 
              onClick={handleBuildClick} 
              className="btn-build-resume-orange"
              style={{ 
                width: '100%',
                backgroundColor: '#ee571d', 
                color: '#fff', 
                padding: '12px 20px', 
                borderRadius: '8px',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <Sparkles size={18} /> Build My Resume
            </button>
          </div>
        </div>
      )}

      {/* Google Auth Modal */}
      <GoogleAuthModal 
        isOpen={showAuthModal} 
        onClose={closeAuthModal} 
        redirectPath={authRedirectPath || '/templates'} 
      />
    </header>
  );
};

export default Navbar;
