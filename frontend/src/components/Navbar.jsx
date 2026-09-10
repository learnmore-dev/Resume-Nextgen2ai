import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useResume } from '../context/ResumeContext';
import { Sparkles, ChevronDown, FileText, Target, Layout, ShieldCheck, Menu, X } from 'lucide-react';

export const Navbar = () => {
  const { resumes, createResume } = useResume();
  const navigate = useNavigate();
  const location = useLocation();
  const [toolsDropdown, setToolsDropdown] = useState(false);
  const [careerDropdown, setCareerDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleBuildClick = async () => {
    setMobileMenuOpen(false);
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
              Resume<span style={{ color: '#ee571d' }}>Nova</span>
            </span>
          </div>
        </Link>

        {/* Center Navigation Links (Desktop) */}
        <nav className="center-nav-links desktop-nav">
          <Link to="/templates" className="nav-item">
            Resume Templates
          </Link>
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
                <Link to="/career-advice" className="dropdown-link">
                  <Target size={16} /> Resume Writing Guide
                </Link>
                <Link to="/career-advice" className="dropdown-link">
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
                <Link to="/job-analyzer" className="dropdown-link">
                  <ShieldCheck size={16} /> Free ATS Resume Checker
                </Link>
                <Link to="/dashboard" className="dropdown-link">
                  <FileText size={16} /> Dashboard
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* Right Actions (Desktop) */}
        <div className="header-actions desktop-actions">
          <button 
            onClick={handleBuildClick} 
            className="btn-build-resume-orange"
            style={{ 
              backgroundColor: '#ee571d', 
              color: '#fff', 
              padding: '10px 20px', 
              borderRadius: '8px',
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.95rem'
            }}
          >
            Build My Resume
          </button>
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
          <Link to="/templates" className="mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>
            <Layout size={18} /> Resume Templates
          </Link>
          <Link to="/objectives-summaries" className="mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>
            <Sparkles size={18} /> Objectives & Summaries
          </Link>
          <Link to="/career-advice" className="mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>
            <Target size={18} /> Career Advice & Guide
          </Link>
          <Link to="/job-analyzer" className="mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>
            <ShieldCheck size={18} /> Free ATS Resume Checker
          </Link>
          <Link to="/dashboard" className="mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>
            <FileText size={18} /> Dashboard
          </Link>
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
    </header>
  );
};

export default Navbar;
