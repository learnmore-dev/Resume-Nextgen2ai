import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useResume } from '../context/ResumeContext';
import { Sparkles, ChevronDown, FileText, Target, Layout, ShieldCheck } from 'lucide-react';

export const Navbar = () => {
  const { resumes, createResume } = useResume();
  const navigate = useNavigate();
  const location = useLocation();
  const [toolsDropdown, setToolsDropdown] = useState(false);
  const [careerDropdown, setCareerDropdown] = useState(false);

  if (location.pathname.startsWith('/create-resume')) return null;

  const handleBuildClick = async () => {
    if (resumes && resumes.length > 0) {
      navigate(`/builder/${resumes[0].id}`);
    } else {
      try {
        const newResume = await createResume({ title: 'My Resume', template_id: 1 });
        navigate(`/builder/${newResume.id}`);
      } catch (e) {
        navigate('/create-resume');
      }
    }
  };

  return (
    <header className="site-header">
      <div className="header-container">
        {/* Brand Logo */}
        <Link to="/" className="brand-logo-container">
          <div className="sparkle-icon-wrapper" style={{ background: '#ee571d' }}>
            <Sparkles size={20} className="sparkle-icon" color="#fff" />
          </div>
          <div className="brand-text-group">
            <span className="brand-title" style={{ fontSize: '1.4rem', color: '#0F172A', fontWeight: '800' }}>
              Resume<span style={{ color: '#ee571d' }}>Nova</span>
            </span>
          </div>
        </Link>

        {/* Center Navigation Links */}
        <nav className="center-nav-links">
          <Link to="/templates" className="nav-item">
            Resume Templates
          </Link>
          <Link to="/job-analyzer" className="nav-item">
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
                <Link to="/job-analyzer" className="dropdown-link">
                  <Target size={16} /> Resume Writing Guide
                </Link>
                <Link to="/templates" className="dropdown-link">
                  <Layout size={16} /> Cover Letters
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

        {/* Right CTA Button */}
        <div className="header-actions">
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
      </div>
    </header>
  );
};

export default Navbar;
