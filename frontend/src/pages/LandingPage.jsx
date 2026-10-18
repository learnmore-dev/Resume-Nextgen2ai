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

  const handleKeywordClick = (path) => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    navigate(path);
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
    },
    {
      q: "What is an ATS and why does it matter?",
      a: "ATS stands for Applicant Tracking System — software used by most mid-to-large companies to automatically filter resumes before a human reads them. Around 75% of resumes are rejected by ATS. NextGen Resume helps you pass ATS filters by checking your resume against the actual job description and highlighting missing keywords."
    },
    {
      q: "How do I make my resume ATS friendly?",
      a: "Use standard section headings like Experience, Education, and Skills. Avoid tables, images, and columns. Match keywords exactly from the job description. Use a clean, single-column layout. NextGen Resume's ATS checker scores your resume against any job posting and shows you exactly what to fix."
    },
    {
      q: "How long should my resume be?",
      a: "For 0–5 years of experience: one page. For 5+ years or senior roles: one to two pages. Never exceed two pages unless you are in academia or applying for a C-suite role with an extensive track record. Quality and relevance always beat length."
    },
    {
      q: "Can I use NextGen Resume for multiple job applications?",
      a: "Yes. You can create multiple resume versions in your free account — one tailored for each role or company you are applying to. Tailoring your resume for each application significantly increases your response rate."
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
        <div className="home-offer-sticker" aria-label="Resume PDF offer: ₹29 only, reduced from ₹199">
          <span className="home-offer-old">₹199</span>
          <span className="home-offer-price">₹29 <small>Only</small></span>
        </div>

        <div className="home-hero-container">
          {/* Top Pill Badge */}
          <div className="home-hero-pill-badge">
            <Sparkles size={14} color="#38BDF8" />
            <span>SMART RESUME. BETTER OPPORTUNITIES.</span>
          </div>

          {/* Main Title */}
          <h1 className="home-hero-title">
            Free Resume Builder Online<br />
            That <span className="highlight-noticed">Opens Doors</span>
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
              <span className="score-badge-value">95%</span>
              <span className="score-badge-label">ATS Match</span>
              <span className="score-badge-sub">Score</span>
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

      {/* 7. SEO Keywords Block */}
      <section className="seo-keywords-block">
        <div className="seo-keywords-inner">
          <h2 className="seo-keywords-title">Explore Resume Tools & Guides</h2>
          <p className="seo-keywords-desc">Find the right resume builder for every career stage and need.</p>
          <div className="seo-keywords-grid">
            {[
              { label: 'Free Resume Builder', path: '/free-resume-builder' },
              { label: 'Free Resume Templates', path: '/free-resume-templates' },
              { label: 'ATS Friendly Resume Template', path: '/ats-resume-builder' },
              { label: 'Professional Resume Builder', path: '/professional-resume-builder' },
              { label: 'Best AI Resume Builder', path: '/ai-resume-builder' },
              { label: 'Google Docs Resume Templates', path: '/google-docs-resume-templates' },
              { label: 'Resume Builder No Pay', path: '/resume-builder-no-pay' },
              { label: 'Resume Builder PDF', path: '/resume-builder-pdf' },
              { label: 'Microsoft Word Resume Download', path: '/resume-builder-microsoft-word' },
              { label: 'Resume Builder for Freshers', path: '/resume-builder-for-freshers' },
              { label: 'Create Resume Online Free', path: '/create-resume-online-free' },
              { label: 'Edit Resume Online Free', path: '/edit-resume-online' },
              { label: 'Resume Builder for Students', path: '/student-resume-builder' },
              { label: 'Resume Examples', path: '/resume-examples' },
              { label: 'Kickresume Alternative', path: '/kickresume-alternative' },
            ].map(({ label, path }) => (
              <button
                key={path}
                type="button"
                className="seo-keyword-chip"
                onClick={() => handleKeywordClick(path)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 7b. Resume Stats Strip */}
      <section style={{ padding:'3rem 1.5rem', background:'#fff' }}>
        <div style={{ maxWidth:'1080px', margin:'0 auto' }}>
          <h2 style={{ fontSize:'clamp(1.4rem,2.5vw,1.9rem)', fontWeight:800, color:'#172033', textAlign:'center', marginBottom:'0.5rem' }}>Why Your Resume Matters More Than You Think</h2>
          <p style={{ color:'#64748b', textAlign:'center', marginBottom:'2rem' }}>The numbers behind job searching — and why a strong resume changes everything.</p>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:'1.25rem' }}>
            {[
              { v:'75%', l:'of resumes are rejected by ATS before a human ever reads them' },
              { v:'6 sec', l:'average time a recruiter spends reviewing a resume on first pass' },
              { v:'250+', l:'average applications received per corporate job opening' },
              { v:'40%', l:'more interview callbacks when a resume is tailored to the job description' },
              { v:'3×', l:'higher offer rate for candidates who quantify achievements with numbers' },
            ].map(s => (
              <div key={s.l} style={{ background:'#f7f8fb', borderRadius:'14px', padding:'1.5rem', textAlign:'center' }}>
                <div style={{ fontSize:'2.2rem', fontWeight:900, color:'#ee571d', lineHeight:1 }}>{s.v}</div>
                <p style={{ fontSize:'0.85rem', color:'#58657a', marginTop:'0.5rem', lineHeight:1.6 }}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7c. How It Works */}
      <section style={{ padding:'3.5rem 1.5rem', background:'#f7f8fb' }}>
        <div style={{ maxWidth:'1080px', margin:'0 auto' }}>
          <h2 style={{ fontSize:'clamp(1.4rem,2.5vw,1.9rem)', fontWeight:800, color:'#172033', textAlign:'center', marginBottom:'0.5rem' }}>How It Works — Build Your Resume in 4 Steps</h2>
          <p style={{ color:'#64748b', textAlign:'center', marginBottom:'2rem' }}>From blank page to job-ready PDF in minutes.</p>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:'1.25rem' }}>
            {[
              { n:'01', title:'Choose a Template', desc:'Browse professionally designed, ATS-friendly resume templates built for every industry and career level. Pick the one that suits your style.' },
              { n:'02', title:'Fill In Your Details', desc:'Enter your experience, education, skills, and achievements. Our AI assistant suggests impactful bullet points and keywords tailored to your target role.' },
              { n:'03', title:'Check Your ATS Score', desc:'Paste a job description and instantly see how well your resume matches. Identify missing keywords and close gaps before you apply.' },
              { n:'04', title:'Download & Apply', desc:'Export a clean, professionally formatted PDF in one click. Your resume is ready to submit to any job portal, email, or application form.' },
            ].map(({ n, title, desc }) => (
              <div key={n} style={{ background:'#fff', borderRadius:'14px', padding:'1.5rem', border:'1px solid #e7eaf0', position:'relative', overflow:'hidden' }}>
                <div style={{ fontSize:'3rem', fontWeight:900, color:'#ee571d', opacity:0.12, position:'absolute', top:'0.5rem', right:'0.75rem', lineHeight:1 }}>{n}</div>
                <div style={{ fontSize:'1.5rem', fontWeight:900, color:'#ee571d', marginBottom:'0.6rem' }}>{n}</div>
                <h3 style={{ fontSize:'1rem', fontWeight:800, color:'#172033', marginBottom:'0.4rem' }}>{title}</h3>
                <p style={{ fontSize:'0.88rem', color:'#58657a', lineHeight:1.7, margin:0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7d. Comparison Table */}
      <section style={{ padding:'3.5rem 1.5rem', background:'#fff' }}>
        <div style={{ maxWidth:'1080px', margin:'0 auto' }}>
          <h2 style={{ fontSize:'clamp(1.4rem,2.5vw,1.9rem)', fontWeight:800, color:'#172033', textAlign:'center', marginBottom:'0.5rem' }}>NextGen Resume vs The Alternatives</h2>
          <p style={{ color:'#64748b', textAlign:'center', marginBottom:'2rem' }}>See how we compare against traditional resume writing and other online builders.</p>
          <div style={{ overflowX:'auto' }}>
            <table style={{ width:'100%', borderCollapse:'collapse', fontSize:'0.9rem' }}>
              <thead>
                <tr style={{ background:'#192337', color:'#fff' }}>
                  <th style={{ padding:'1rem 1.25rem', textAlign:'left', borderRadius:'12px 0 0 0' }}>Feature</th>
                  <th style={{ padding:'1rem 1.25rem', textAlign:'center', color:'#ff8a57' }}>NextGen Resume</th>
                  <th style={{ padding:'1rem 1.25rem', textAlign:'center' }}>Traditional Writing</th>
                  <th style={{ padding:'1rem 1.25rem', textAlign:'center', borderRadius:'0 12px 0 0' }}>Other Builders</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Price', '✅ Free', '❌ ₹3,000–₹15,000', '⚠️ Paid plans'],
                  ['AI Writing Suggestions', '✅ Yes — built-in', '❌ Manual only', '⚠️ Limited / paid'],
                  ['ATS Score Checker', '✅ Yes — any job description', '❌ No', '⚠️ Paid feature'],
                  ['Professional Templates', '✅ Multiple, free', '⚠️ Basic Word doc', '✅ Available'],
                  ['PDF Download', '✅ Free, one click', '⚠️ Manual export', '⚠️ Paid on most'],
                  ['Edit Anytime', '✅ Unlimited, free', '❌ Pay per revision', '⚠️ Subscription'],
                  ['Multiple Resume Versions', '✅ Yes — free', '❌ Extra charge', '⚠️ Paid plan'],
                ].map(([feat, ng, trad, other], i) => (
                  <tr key={feat} style={{ background: i % 2 === 0 ? '#f7f8fb' : '#fff', borderBottom:'1px solid #e7eaf0' }}>
                    <td style={{ padding:'0.9rem 1.25rem', fontWeight:600, color:'#172033' }}>{feat}</td>
                    <td style={{ padding:'0.9rem 1.25rem', textAlign:'center', color:'#16a34a', fontWeight:600 }}>{ng}</td>
                    <td style={{ padding:'0.9rem 1.25rem', textAlign:'center', color:'#58657a' }}>{trad}</td>
                    <td style={{ padding:'0.9rem 1.25rem', textAlign:'center', color:'#58657a' }}>{other}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 7e. Testimonials */}
      <section style={{ padding:'3.5rem 1.5rem', background:'#f7f8fb' }}>
        <div style={{ maxWidth:'1080px', margin:'0 auto' }}>
          <h2 style={{ fontSize:'clamp(1.4rem,2.5vw,1.9rem)', fontWeight:800, color:'#172033', textAlign:'center', marginBottom:'0.5rem' }}>What Job Seekers Are Saying</h2>
          <p style={{ color:'#64748b', textAlign:'center', marginBottom:'2rem' }}>Real feedback from people who built their resume with NextGen Resume.</p>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:'1.25rem' }}>
            {[
              { name:'Priya Sharma', role:'Software Engineer — Hired at Infosys', stars:5, review:'I tried three different resume builders and NextGen was the only one that gave me an actual ATS score against the job description. Got my first interview in two weeks.' },
              { name:'Rahul Mehta', role:'Data Analyst — Freshers, just graduated', stars:5, review:'As a fresher I had no idea what to write. The AI suggestions helped me structure my project work into real bullet points. Landed 3 interview calls in the first month.' },
              { name:'Anjali Verma', role:'Senior Marketing Manager', stars:5, review:'I had not updated my resume in 4 years. The section-by-section builder made it easy to modernise everything. The PDF export looks extremely professional.' },
              { name:'Karthik Iyer', role:'DevOps Engineer — Career switch from IT support', stars:5, review:'Switching careers is hard but NextGen Resume helped me highlight my transferable skills and certifications in a way that actually got responses from tech companies.' },
            ].map(({ name, role, stars, review }) => (
              <div key={name} style={{ background:'#fff', borderRadius:'14px', padding:'1.5rem', border:'1px solid #e7eaf0' }}>
                <div style={{ display:'flex', gap:'2px', marginBottom:'0.75rem' }}>
                  {Array(stars).fill('⭐').map((s,i) => <span key={i} style={{ fontSize:'0.9rem' }}>{s}</span>)}
                </div>
                <p style={{ fontSize:'0.9rem', color:'#374151', lineHeight:1.7, marginBottom:'1rem', fontStyle:'italic' }}>"{review}"</p>
                <div style={{ fontSize:'0.88rem', fontWeight:700, color:'#172033' }}>{name}</div>
                <div style={{ fontSize:'0.8rem', color:'#64748b' }}>{role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FAQ Block */}
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
