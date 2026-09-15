import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import { 
  Sparkles, CheckCircle2, ChevronDown, ArrowRight, 
  FileText, Target, Layout, ShieldCheck, Zap, Download, Star,
  Check, Globe, Search, Award, TrendingUp, Layers, Briefcase, ExternalLink
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const LandingPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, openAuthModal } = useAuth();
  const { createResume, resumes } = useResume();
  const [activeFaq, setActiveFaq] = useState(null);
  const [creating, setCreating] = useState(false);

  const handleStartBuilding = (targetPath = '/templates') => {
    if (!isAuthenticated) {
      openAuthModal(targetPath);
      return;
    }
    navigate(targetPath);
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "What is NextGen Resume?",
      a: "NextGen Resume is an intelligent resume builder that uses advanced AI to help you create professional, ATS-friendly resumes in minutes. It analyzes your experience and suggests improvements to increase your chances of getting hired."
    },
    {
      q: "How do I create a resume?",
      a: "Simply click on 'Build Your Resume', choose a template, and follow the steps. You can input your details or upload an existing resume for ATS scoring and analysis. Our AI will guide you through each section."
    },
    {
      q: "Is my personal info safe?",
      a: "Yes, absolutely. We prioritize data privacy and security. Your personal information is encrypted and stored securely. We do not share your data with third parties without your consent."
    },
    {
      q: "Can I build a cover letter with NextGen Resume?",
      a: "Yes! Our tools include AI summary and cover letter generators that match your resume's design and craft compelling narratives tailored to target job descriptions."
    },
    {
      q: "Can I customize my resume for different jobs?",
      a: "Definitely. You can create multiple versions of your resume tailored to specific job descriptions. Our AI analyzes job keywords to optimize your resume's ATS match score."
    },
    {
      q: "Is there a free version?",
      a: "Yes! You can build, customize, and export your resumes completely for free."
    },
    {
      q: "How do I download my resume?",
      a: "Once you are happy with your resume, simply click the 'Export' button in the builder to export clean, formatted resumes."
    },
    {
      q: "Do I still need to edit the resume after AI suggestions?",
      a: "While our AI provides strong, high-impact bullet suggestions, we always recommend reviewing the final content to ensure it perfectly reflects your voice and exact metrics."
    }
  ];

  return (
    <div className="resume-ai-landing">
      {/* 1. Header Hero Block */}
      <section className="home-hero-section">
        {/* Background Decorative Graphics */}
        <div className="home-hero-dots home-dots-left"></div>
        <div className="home-hero-dots home-dots-right"></div>
        <div className="home-hero-wireframe home-wireframe-resume"></div>
        <div className="home-hero-wireframe home-wireframe-briefcase"></div>

        <div className="home-hero-container">
          {/* Top Pill Badge */}
          <div className="home-hero-pill-badge">
            <Sparkles size={14} color="#38BDF8" />
            <span>SMART RESUME. BETTER OPPORTUNITIES.</span>
          </div>

          {/* Main Title */}
          <h1 className="home-hero-title">
            AI-Powered Resumes<br />
            That <span className="highlight-noticed">Open Doors</span>
          </h1>

          {/* Subtitle */}
          <p className="home-hero-desc">
            Create a strong, personalized resume in minutes.<br />
            Highlight your skills, showcase your achievements,<br />
            and stand out to every recruiter.
          </p>

          {/* Center Interactive Glass Card */}
          <div className="home-hero-center-card-wrapper">
            <div className="home-hero-center-card">
              <div className="hero-card-icon-area">
                <span className="card-sparkle sparkle-1">✦</span>
                <span className="card-sparkle sparkle-2">✦</span>
                <span className="card-sparkle sparkle-3">✦</span>
                <div className="hero-mini-resume-doc">
                  <div className="mini-doc-profile-row">
                    <div className="mini-doc-user-icon">👤</div>
                    <div className="mini-doc-user-lines">
                      <div className="mini-user-line"></div>
                      <div className="mini-user-line short"></div>
                    </div>
                  </div>
                  <div className="mini-doc-body-lines">
                    <div className="mini-body-line"></div>
                    <div className="mini-body-line"></div>
                    <div className="mini-body-line short"></div>
                  </div>
                  <div className="mini-doc-green-check">✓</div>
                </div>
              </div>

              <h3 className="hero-center-card-title">Let’s build your winning resume!</h3>
              <p className="hero-center-card-subtitle">Get a free AI review and tips to improve your resume.</p>

              <button onClick={() => handleStartBuilding('/templates')} className="btn-home-hero-orange">
                <span>Review My Resume</span>
                <ArrowRight size={20} />
              </button>
            </div>

            {/* Floating Resume Score Badge */}
            <div className="hero-floating-score-badge">
              <span className="score-badge-label">Resume Score</span>
              <span className="score-badge-value">92%</span>
              <span className="score-badge-sub">Good to go!</span>
            </div>
          </div>

          {/* Bottom 4 Feature Highlights */}
          <div className="home-hero-4features">
            <div className="home-feature-item">
              <div className="home-feat-icon icon-teal">
                <Zap size={20} />
              </div>
              <div className="home-feat-text">
                <h4>Quick & Easy</h4>
                <p>Build your resume in just a few minutes.</p>
              </div>
            </div>

            <div className="home-feature-item">
              <div className="home-feat-icon icon-cyan">
                <Target size={20} />
              </div>
              <div className="home-feat-text">
                <h4>Tailored for You</h4>
                <p>Custom suggestions that match your profile.</p>
              </div>
            </div>

            <div className="home-feature-item">
              <div className="home-feat-icon icon-blue">
                <ShieldCheck size={20} />
              </div>
              <div className="home-feat-text">
                <h4>ATS-Ready</h4>
                <p>Designed to pass ATS and get you noticed.</p>
              </div>
            </div>

            <div className="home-feature-item">
              <div className="home-feat-icon icon-amber">
                <Star size={20} />
              </div>
              <div className="home-feat-text">
                <h4>Stand Out</h4>
                <p>Showcase your strengths and achievements.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Customer Logos Block */}
      <section className="features-logos-block">
        <p className="features-title">Candidates hired by top employers:</p>
        <div className="logos-container">
          <span className="company-logo-text">Booking.com</span>
          <span className="company-logo-text KPMG">KPMG</span>
          <span className="company-logo-text AMEX">AMERICAN EXPRESS</span>
          <span className="company-logo-text ACCENTURE">accenture</span>
          <span className="company-logo-text GOOGLE">Google</span>
        </div>
      </section>

      {/* 3. Unlock Your Career Potential Block */}
      <section className="unlock-potential-block">
        <div className="section-header">
          <h2 className="section-title">
            Unlock Your Career Potential <br />
            <span>with <span className="text-orange">Smart Resume Creation</span></span>
          </h2>
          <p className="section-desc">
            Instantly craft compelling resumes that showcase your expertise, impress employers & help you step confidently into your dream role.
          </p>
        </div>

        <div className="cards-grid-3">
          {/* Card 1 */}
          <div className="feature-card">
            <div className="card-visual bg-light-blue">
              <div className="visual-inner resume-preview-hints">
                <div className="hint-badge hint-top">
                  <span className="hint-plus">+10%</span> Add summary
                </div>
                <div className="hint-badge hint-bottom">
                  <span className="hint-plus">+15%</span> Add impact metrics
                </div>
                <div className="score-bar-visual">
                  <div className="bar-fill" style={{ width: '88%' }}></div>
                  <span className="score-text">ATS Score: 88% Excellent</span>
                </div>
              </div>
            </div>
            <div className="card-text">
              <h3>AI-Powered Resume Creation</h3>
              <p>Use cutting-edge AI to highlight your strengths, background, and ambitions. Produce a polished resume that resonates with recruiters.</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="feature-card">
            <div className="card-visual bg-light-blue">
              <div className="visual-inner tailored-templates-visual">
                <div className="resume-stack">
                  <div className="resume-card back">
                    <div className="resume-header-bar cream"></div>
                  </div>
                  <div className="resume-card front">
                    <div className="resume-header-bar orange">
                      <div className="avatar-circle"></div>
                    </div>
                    <div className="resume-lines">
                      <div className="line full"></div>
                      <div className="line half"></div>
                      <div className="line three-quarter"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-text">
              <h3>Tailored Templates</h3>
              <p>Select from a range of refined templates that showcase your unique style. Impress employers with clear, organized resumes spotlighting key accomplishments.</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="feature-card">
            <div className="card-visual bg-light-blue">
              <div className="visual-inner feedback-visual">
                <div className="calculating-badge">
                  <Sparkles size={18} className="text-orange spinner" />
                  <span className="badge-text">Calculating ATS Score...</span>
                </div>
              </div>
            </div>
            <div className="card-text">
              <h3>Real-Time Feedback & Scoring</h3>
              <p>Receive immediate feedback on strengths and improvement areas. Pinpoint missing keywords, refine critical sections, and enhance resume impact.</p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="feature-card">
            <div className="card-visual bg-light-blue">
              <div className="visual-inner expert-visual">
                <div className="floating-badge ai-expert-badge">
                  <div className="badge-header">
                    <Sparkles size={14} color="#10B981" />
                    <span>AI ASSISTANT</span>
                  </div>
                  <div className="badge-content">
                    <span className="badge-title">BOOST YOUR SCORE</span>
                    <div className="badge-list">
                      <div className="badge-item"><span className="score-pill green">+5%</span> Action Verbs</div>
                      <div className="badge-item"><span className="score-pill green">+15%</span> Quantified Results</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-text">
              <h3>Expert Suggestions</h3>
              <p>Get personalized prompts to emphasize experience and skills. Make your resume shine with targeted changes that attract attention and impress hiring managers.</p>
            </div>
          </div>

          {/* Card 5 */}
          <div className="feature-card">
            <div className="card-visual bg-light-blue">
              <div className="visual-inner import-export-visual">
                <div className="download-ui">
                  <div className="btn-download-mock">
                    <Download size={16} /> Export Resume
                  </div>
                  <div className="dropdown-menu-mock">
                    <div className="menu-item"><FileText size={14} /> PDF Document (.pdf)</div>
                    <div className="menu-item"><FileText size={14} /> Plain Text (.txt)</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-text">
              <h3>Seamless Imports & Exports</h3>
              <p>Import your career history quickly. Export final resumes in clean formats formatted for any applicant tracking system.</p>
            </div>
          </div>

          {/* Card 6 */}
          <div className="feature-card">
            <div className="card-visual bg-light-blue">
              <div className="visual-inner career-path-visual">
                <div className="path-badge"><Briefcase size={16} /> Software Engineer</div>
                <div className="path-badge active"><Award size={16} /> Senior Tech Lead</div>
                <div className="path-badge"><TrendingUp size={16} /> Engineering Manager</div>
              </div>
            </div>
            <div className="card-text">
              <h3>Fits Your Career Path</h3>
              <p>Arrange sections, reorder details, and highlight accomplishments aligned with your aspirations. Showcase your expertise in a style appealing to employers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Templates Slider & Optimization Block */}
      <section className="templates-slider-block">
        <div className="slider-container">
          <div className="slider-visuals">
            <div className="slider-image-wrapper">
              <div className="mock-template-preview">
                <div className="tpl-head">
                  <div className="tpl-name-box"></div>
                  <div className="tpl-sub-box"></div>
                </div>
                <div className="tpl-body-section">
                  <div className="tpl-title-bar">EXPERIENCE</div>
                  <div className="tpl-bullet"></div>
                  <div className="tpl-bullet short"></div>
                  <div className="tpl-title-bar">EDUCATION & SKILLS</div>
                  <div className="tpl-bullet"></div>
                </div>
              </div>

              {/* Floating Overlay: AI Assistant Badge */}
              <div className="floating-badge ai-assistant">
                <div className="badge-header">
                  <Sparkles size={14} color="#10B981" />
                  <span>AI ASSISTANT</span>
                </div>
                <div className="badge-content">
                  <span className="badge-title">BOOST YOUR MATCH</span>
                  <div className="badge-list">
                    <div className="badge-item"><span className="score-pill green">+8%</span> Add React & Node.js</div>
                    <div className="badge-item"><span className="score-pill green">+12%</span> Add Leadership metrics</div>
                  </div>
                </div>
              </div>

              {/* Floating Overlay: Score */}
              <div className="floating-badge score-badge">
                <div className="score-value">95%</div>
                <div className="score-label">ATS Match<br />Score</div>
              </div>
            </div>
          </div>

          <div className="slider-text-content">
            <h2 className="slider-title">Optimize Your Resume’s Potential</h2>
            <p className="slider-description">
              Leverage smart insights and personalized guidance to stand out from the crowd. Elevate every section of your resume, ensuring it resonates with hiring managers.
            </p>
            <ul className="benefit-list">
              <li>
                <CheckCircle2 className="check-icon" size={20} color="#10B981" />
                Showcase your most relevant accomplishments and skills
              </li>
              <li>
                <CheckCircle2 className="check-icon" size={20} color="#10B981" />
                Align keywords directly with industry demands and job descriptions
              </li>
              <li>
                <CheckCircle2 className="check-icon" size={20} color="#10B981" />
                Refine formatting for crystal clarity and visual appeal
              </li>
              <li>
                <CheckCircle2 className="check-icon" size={20} color="#10B981" />
                Strengthen each bullet point with high-impact action verbs
              </li>
            </ul>

            <div style={{ marginTop: '32px' }}>
              <button 
                onClick={() => handleStartBuilding('/templates')}
                className="btn-create-resume-white"
                style={{ background: '#ee571d', color: '#fff' }}
              >
                Browse All Templates
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA Block */}
      <section className="cta-block">
        <div className="cta-bg-glow"></div>
        <div className="cta-content">
          <h2 className="cta-title">
            <span>Discover Inspiration from Our </span>Resume Examples
          </h2>
          <p className="cta-desc">
            Explore our library of professional samples, each crafted to help you land interviews. Gain proven insights to shape a winning application.
          </p>
          <button 
            onClick={() => handleStartBuilding('/templates')}
            className="btn-cta"
          >
            <span>View All Templates & Examples</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* 6. All-in-One Solutions Block */}
      <section className="solutions-block">
        <div className="section-header">
          <h2 className="section-title">
            <span className="text-orange">All-in-One </span>Resume Solutions
          </h2>
          <p className="section-desc">
            Access user-friendly tools and expert guidance to build and optimize your resume effortlessly.
          </p>
        </div>

        <div className="solutions-grid">
          <div className="solution-card">
            <div className="icon-box orange"><Layout size={22} color="#fff" /></div>
            <h3>Professional Templates</h3>
            <p>Choose from sleek, ATS-ready templates to show your expertise effectively and stand out immediately.</p>
          </div>

          <div className="solution-card">
            <div className="icon-box orange"><Sparkles size={22} color="#fff" /></div>
            <h3>Smart Suggestions</h3>
            <p>Improve each section with targeted AI prompts that highlight your relevant skills and career successes.</p>
          </div>

          <div className="solution-card">
            <div className="icon-box orange"><Download size={22} color="#fff" /></div>
            <h3>One-Click Exports</h3>
            <p>Generate polished PDF documents instantly, ensuring seamless sharing across application portals.</p>
          </div>

          <div className="solution-card">
            <div className="icon-box orange"><ShieldCheck size={22} color="#fff" /></div>
            <h3>ATS Scanner</h3>
            <p>Compare your resume with real job posts to catch missing keywords before submitting applications.</p>
          </div>

          <div className="solution-card">
            <div className="icon-box orange"><FileText size={22} color="#fff" /></div>
            <h3>Cover Letter Generator</h3>
            <p>Easily craft complementary cover letters that match your resume’s style & emphasize your value.</p>
          </div>

          <div className="solution-card">
            <div className="icon-box orange"><Zap size={22} color="#fff" /></div>
            <h3>Real-Time Analytics</h3>
            <p>Get instant score metrics and actionable steps to reach maximum resume impact.</p>
          </div>
        </div>
      </section>

      {/* 7. FAQ Block */}
      <section className="faq-block">
        <h2 className="section-title">Frequently Asked Questions</h2>
        <div className="faq-list">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className={`faq-item ${activeFaq === idx ? 'active' : ''}`}
            >
              <button 
                className="faq-question-btn"
                onClick={() => toggleFaq(idx)}
              >
                <span className="faq-text">{faq.q}</span>
                <span className="faq-icon">
                  <ChevronDown 
                    size={20} 
                    color="#ee571d" 
                    style={{ transform: activeFaq === idx ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
                  />
                </span>
              </button>
              {activeFaq === idx && (
                <div className="faq-answer">
                  <p>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default LandingPage;
