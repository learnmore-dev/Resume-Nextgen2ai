import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, ShieldCheck, Zap, CheckCircle2, XCircle, 
  ArrowRight, Award, Layout, Target, Copy, Check, 
  AlertTriangle, Sparkles, BookOpen, Layers, CheckSquare
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ACTION_VERBS = [
  {
    category: 'Engineering & Architecture',
    verbs: ['Architected', 'Engineered', 'Refactored', 'Decoupled', 'Scaled', 'Containerized', 'Optimized', 'Automated', 'Benchmarked', 'Deployed']
  },
  {
    category: 'Cloud, DevOps & SRE',
    verbs: ['Orchestrated', 'Migrated', 'Provisioned', 'Standardized', 'Instrumented', 'Hardened', 'Streamlined', 'Virtualized', 'Maintained', 'Remediated']
  },
  {
    category: 'Data, AI & Analytics',
    verbs: ['Modeled', 'Quantified', 'Synthesized', 'Ingested', 'Extracted', 'Forecasted', 'Normalized', 'Visualized', 'Transformed', 'Indexed']
  },
  {
    category: 'Product & Leadership',
    verbs: ['Spearheaded', 'Pioneered', 'Delivered', 'Mobilized', 'Negotiated', 'Transformed', 'Mentored', 'Prioritized', 'A/B Tested', 'Championed']
  }
];

const RESUME_SECTIONS = [
  {
    name: '1. Contact Header & Target Title',
    importance: 'Mandatory',
    rules: 'Include Full Name, Target Role Headline (e.g. Senior Software Engineer), Email, Phone, City & State, and LinkedIn/GitHub URL. Never include full home address, photos (for US/UK/Canada ATS), or marital status.',
    example: 'Rahul Sharma | Senior Full Stack Engineer\nBangalore, KA | +91-9876543210 | rahul.sharma@example.com | linkedin.com/in/rahul-tech'
  },
  {
    name: '2. Professional Executive Summary',
    importance: 'High Impact',
    rules: 'A 3-4 sentence elevator pitch highlighting total years of experience, core tech stack, top business metric achievements, and domains of expertise. Avoid vague clichés like "hardworking team player".',
    example: 'Results-driven Full Stack Engineer with 4+ years of experience architecting high-throughput React and Django microservices handling 2M+ daily active users. Expert in PostgreSQL query optimization, AWS cloud deployments, and CI/CD automation. Reduced checkout latency by 35% across core SaaS flows.'
  },
  {
    name: '3. Core Competencies & Technical Skills',
    importance: 'Critical for ATS',
    rules: 'Categorize skills logically (Languages, Frameworks, Cloud & DevOps, Databases, Tools) so ATS parsers and hiring managers can verify your qualifications in under 6 seconds.',
    example: 'Languages: Python, TypeScript, Java, SQL\nFrameworks: React.js, Django REST, Node.js, Spring Boot\nCloud & Tools: AWS (ECS, S3, RDS), Docker, Kubernetes, Git, PostgreSQL, Redis'
  },
  {
    name: '4. Professional Experience (Google XYZ)',
    importance: 'Most Critical (70% of Score)',
    rules: 'Structure every single bullet point using: "Accomplished [X], as measured by [Y], by doing [Z]". Always start with a power action verb and include quantifiable metrics (%, $, ms, hours).',
    example: '• Architected asynchronous message-queue pipeline using Celery and Redis, reducing background email delivery times by 68% for 450,000 monthly transactions.\n• Engineered 12+ reusable React UI components, cutting front-end feature development sprint cycles from 14 to 8 days.'
  },
  {
    name: '5. Key Projects & Deliverables',
    importance: 'Essential for All Levels',
    rules: 'Showcase 2-3 impactful technical projects. Mention the problem solved, technologies leveraged, live demo/GitHub link, and performance outcomes.',
    example: 'NextGen AI Resume Platform (React, Django, OpenAI, PostgreSQL)\n• Built full-stack ATS scanner analyzing semantic keyword alignment with 95% accuracy.\n• Implemented Razorpay payment integration for automated PDF unlock fulfillment.'
  },
  {
    name: '6. Education & Certifications',
    importance: 'Mandatory',
    rules: 'List Degree, Major, Institution, Graduation Year, and CGPA/GPA (if > 8.0 or recent grad). Highlight recognized certifications (AWS Solutions Architect, CKA, PMP).',
    example: 'B.Tech in Computer Science & Engineering | 2020 - 2024\nIndus Institute of Technology | CGPA: 8.8/10\nCertifications: AWS Certified Solutions Architect – Associate (2025)'
  }
];

export const ResumeWritingGuide = () => {
  const navigate = useNavigate();
  const { isAuthenticated, openAuthModal } = useAuth();
  const [activeTab, setActiveTab] = useState('anatomy');
  const [copiedVerb, setCopiedVerb] = useState(null);

  const handleStartBuilding = () => {
    if (!isAuthenticated) {
      openAuthModal('/templates');
      return;
    }
    navigate('/templates');
  };

  const handleCopyVerb = (verb) => {
    navigator.clipboard.writeText(verb);
    setCopiedVerb(verb);
    setTimeout(() => setCopiedVerb(null), 1500);
  };

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh', paddingBottom: '5rem' }}>
      {/* Hero Banner */}
      <section className="templates-hero-banner" style={{ padding: '50px 24px 55px', marginBottom: '2.5rem' }}>
        <div className="templates-hero-container" style={{ maxWidth: '960px' }}>
          <div className="templates-breadcrumb" style={{ marginBottom: '14px' }}>
            <span onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Home</span>
            <span className="sep">›</span>
            <span className="active">Career Advice</span>
            <span className="sep">›</span>
            <span className="active">Resume Writing Guide</span>
          </div>

          <h1 className="templates-main-heading" style={{ fontSize: '2.8rem', marginBottom: '12px' }}>
            The Complete <span className="highlight-noticed">Resume Writing Guide</span>
          </h1>

          <p className="templates-hero-desc" style={{ fontSize: '1.05rem', maxWidth: '780px', margin: '0 auto 18px', lineHeight: 1.6 }}>
            Master the anatomy of an interview-winning resume. Learn exact section structures, ATS keyword parsing rules, the Google XYZ formula, and common mistakes that cost candidates job offers.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.14)', padding: '5px 14px', borderRadius: '20px', color: '#E2E8F0', fontSize: '0.82rem' }}>
              <ShieldCheck size={15} color="#34D399" /> 100% ATS Compliant
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.14)', padding: '5px 14px', borderRadius: '20px', color: '#E2E8F0', fontSize: '0.82rem' }}>
              <Zap size={15} color="#FBBF24" /> Google XYZ Framework
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.14)', padding: '5px 14px', borderRadius: '20px', color: '#E2E8F0', fontSize: '0.82rem' }}>
              <Award size={15} color="#38BDF8" /> Recruiter Approved
            </span>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 1.5rem' }}>
        
        {/* Navigation Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', background: '#FFFFFF', padding: '6px', borderRadius: '14px', border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', flexWrap: 'wrap', gap: '4px' }}>
            <button
              onClick={() => setActiveTab('anatomy')}
              style={{
                background: activeTab === 'anatomy' ? '#0F172A' : 'transparent',
                color: activeTab === 'anatomy' ? '#FFFFFF' : '#64748B',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '10px',
                fontWeight: 700,
                fontSize: '0.92rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Layout size={17} /> Resume Anatomy (6 Sections)
            </button>

            <button
              onClick={() => setActiveTab('formats')}
              style={{
                background: activeTab === 'formats' ? '#0F172A' : 'transparent',
                color: activeTab === 'formats' ? '#FFFFFF' : '#64748B',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '10px',
                fontWeight: 700,
                fontSize: '0.92rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <FileText size={17} /> Formats Compared
            </button>

            <button
              onClick={() => setActiveTab('ats-rules')}
              style={{
                background: activeTab === 'ats-rules' ? '#0F172A' : 'transparent',
                color: activeTab === 'ats-rules' ? '#FFFFFF' : '#64748B',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '10px',
                fontWeight: 700,
                fontSize: '0.92rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <ShieldCheck size={17} /> ATS Golden Rules
            </button>

            <button
              onClick={() => setActiveTab('mistakes')}
              style={{
                background: activeTab === 'mistakes' ? '#0F172A' : 'transparent',
                color: activeTab === 'mistakes' ? '#FFFFFF' : '#64748B',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '10px',
                fontWeight: 700,
                fontSize: '0.92rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <AlertTriangle size={17} /> 10 Fatal Mistakes
            </button>
          </div>
        </div>

        {/* TAB 1: Anatomy of a Winning Resume */}
        {activeTab === 'anatomy' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ background: '#FFFFFF', borderRadius: '20px', border: '1px solid #E2E8F0', padding: '2.5rem', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem' }}>
                The 6 Fundamental Sections of an Industry-Standard Resume
              </h2>
              <p style={{ color: '#64748B', fontSize: '0.94rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                Hiring managers spend an average of <strong>6 to 7 seconds</strong> scanning your resume on initial review. Each section must deliver maximum signal-to-noise ratio.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {RESUME_SECTIONS.map((sec, idx) => (
                  <div key={idx} style={{ background: '#F8FAFC', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '1.75rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '8px' }}>
                      <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#0F172A' }}>{sec.name}</h3>
                      <span style={{ background: '#EEF2FF', color: '#4F46E5', padding: '3px 12px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 700 }}>
                        {sec.importance}
                      </span>
                    </div>

                    <p style={{ margin: '0 0 1rem', fontSize: '0.92rem', color: '#475569', lineHeight: 1.6 }}>
                      {sec.rules}
                    </p>

                    <div style={{ background: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '10px', padding: '1rem 1.25rem' }}>
                      <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#10B981', textTransform: 'uppercase', marginBottom: '4px' }}>
                        ✓ Model Production Example:
                      </div>
                      <pre style={{ margin: 0, fontSize: '0.86rem', color: '#1E293B', fontFamily: 'inherit', whiteSpace: 'pre-wrap', lineHeight: 1.5 }}>
                        {sec.example}
                      </pre>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Resume Formats Compared */}
        {activeTab === 'formats' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ background: '#FFFFFF', borderRadius: '20px', border: '1px solid #E2E8F0', padding: '2.5rem', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem' }}>
                Choosing the Right Resume Format
              </h2>
              <p style={{ color: '#64748B', fontSize: '0.94rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                Selecting the right structure depends heavily on your career stage, industry, and whether you are changing domains.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
                
                {/* Format 1: Reverse Chronological */}
                <div style={{ background: '#F8FAFC', borderRadius: '16px', border: '2px solid #2563EB', padding: '1.75rem', position: 'relative' }}>
                  <span style={{ position: 'absolute', top: '-12px', right: '16px', background: '#2563EB', color: '#FFF', padding: '2px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 800 }}>
                    RECOMMENDED (90% OF APPLICANTS)
                  </span>
                  <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.25rem', fontWeight: 800, color: '#0F172A' }}>
                    1. Reverse-Chronological Format
                  </h3>
                  <p style={{ color: '#475569', fontSize: '0.88rem', lineHeight: 1.5, marginBottom: '1rem' }}>
                    Lists your work history in reverse chronological order, starting with your most recent or current role.
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.85rem', color: '#334155' }}>
                    <div><strong>Best For:</strong> Professionals with continuous, progressive experience in the same field.</div>
                    <div><strong>ATS Compatibility:</strong> <span style={{ color: '#16A34A', fontWeight: 700 }}>100% (Gold Standard)</span></div>
                    <div><strong>Key Advantage:</strong> Instantly highlights career growth and recent high-impact achievements.</div>
                  </div>
                </div>

                {/* Format 2: Hybrid / Combination */}
                <div style={{ background: '#F8FAFC', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '1.75rem' }}>
                  <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.25rem', fontWeight: 800, color: '#0F172A' }}>
                    2. Hybrid / Combination Format
                  </h3>
                  <p style={{ color: '#475569', fontSize: '0.88rem', lineHeight: 1.5, marginBottom: '1rem' }}>
                    Combines a prominent technical skills matrix with a detailed chronological work history below.
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.85rem', color: '#334155' }}>
                    <div><strong>Best For:</strong> Senior engineers, tech leads, and career transitioners with strong skill sets.</div>
                    <div><strong>ATS Compatibility:</strong> <span style={{ color: '#16A34A', fontWeight: 700 }}>95% (Excellent)</span></div>
                    <div><strong>Key Advantage:</strong> Spotlight technical skills before diving into chronological work history.</div>
                  </div>
                </div>

                {/* Format 3: Functional */}
                <div style={{ background: '#F8FAFC', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '1.75rem' }}>
                  <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.25rem', fontWeight: 800, color: '#0F172A' }}>
                    3. Functional (Skills-Based) Format
                  </h3>
                  <p style={{ color: '#475569', fontSize: '0.88rem', lineHeight: 1.5, marginBottom: '1rem' }}>
                    Focuses exclusively on skills and abilities rather than chronological dates or company names.
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.85rem', color: '#334155' }}>
                    <div><strong>Best For:</strong> Freelancers, creative portfolios, or candidates with extensive employment gaps.</div>
                    <div><strong>ATS Compatibility:</strong> <span style={{ color: '#DC2626', fontWeight: 700 }}>Poor (Often rejected by ATS)</span></div>
                    <div><strong>Caution:</strong> Most tech recruiters dislike this format as it obscures career timelines.</div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ATS Golden Rules */}
        {activeTab === 'ats-rules' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ background: '#FFFFFF', borderRadius: '20px', border: '1px solid #E2E8F0', padding: '2.5rem', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem' }}>
                ATS Golden Rules: How to Guarantee a 90%+ Match Score
              </h2>
              <p style={{ color: '#64748B', fontSize: '0.94rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                Follow these technical layout standards to ensure every Applicant Tracking System correctly indexes your resume.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                <div style={{ background: '#F8FAFC', padding: '1.5rem', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
                  <h4 style={{ margin: '0 0 8px', fontSize: '1.05rem', fontWeight: 800, color: '#0F172A' }}>1. Exact Keyword Phrasing</h4>
                  <p style={{ margin: 0, fontSize: '0.88rem', color: '#64748B', lineHeight: 1.6 }}>
                    If the JD requests "React.js", "Docker", and "PostgreSQL", use the exact spellings. Do not abbreviate or substitute unless you include both forms (e.g. "Continuous Integration / Continuous Deployment (CI/CD)").
                  </p>
                </div>

                <div style={{ background: '#F8FAFC', padding: '1.5rem', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
                  <h4 style={{ margin: '0 0 8px', fontSize: '1.05rem', fontWeight: 800, color: '#0F172A' }}>2. Linear Single-Layer Text</h4>
                  <p style={{ margin: 0, fontSize: '0.88rem', color: '#64748B', lineHeight: 1.6 }}>
                    Avoid floating Word text boxes, graphs, and skill percentage bars. Parsers extract plain text left-to-right, top-to-bottom. NextGen Resume templates are pre-engineered with clean semantic HTML to guarantee linear extraction.
                  </p>
                </div>

                <div style={{ background: '#F8FAFC', padding: '1.5rem', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
                  <h4 style={{ margin: '0 0 8px', fontSize: '1.05rem', fontWeight: 800, color: '#0F172A' }}>3. Standard Header Terminology</h4>
                  <p style={{ margin: 0, fontSize: '0.88rem', color: '#64748B', lineHeight: 1.6 }}>
                    Stick to conventional section headings: "Experience" (or "Work History"), "Education", "Skills", "Projects", "Certifications". Quirky headers like "My Journey" fail classifier tagging.
                  </p>
                </div>

                <div style={{ background: '#F8FAFC', padding: '1.5rem', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
                  <h4 style={{ margin: '0 0 8px', fontSize: '1.05rem', fontWeight: 800, color: '#0F172A' }}>4. File Format: ATS PDF</h4>
                  <p style={{ margin: 0, fontSize: '0.88rem', color: '#64748B', lineHeight: 1.6 }}>
                    Always export in text-searchable PDF format. Never submit scanned PNG/JPEG images masquerading as PDFs, as OCR parsers regularly drop entire blocks of text.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: 10 Fatal Mistakes */}
        {activeTab === 'mistakes' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ background: '#FFFFFF', borderRadius: '20px', border: '1px solid #E2E8F0', padding: '2.5rem', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem' }}>
                10 Fatal Resume Mistakes That Disqualify Candidates
              </h2>
              <p style={{ color: '#64748B', fontSize: '0.94rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                Avoid these red flags that cause recruiters to discard resumes within seconds.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
                {[
                  { title: '1. No Quantifiable Metrics', desc: 'Describing daily job tasks ("worked on APIs") without sharing the business outcome (latency reduced, users served, revenue saved).' },
                  { title: '2. Spelling & Syntax Errors', desc: 'Even a single typo in a critical technical skill (e.g. "Pyton", "JavScript") signals a lack of attention to detail.' },
                  { title: '3. Unprofessional Email Address', desc: 'Using emails like "coolboy99@gmail.com" instead of a clean "firstname.lastname@gmail.com".' },
                  { title: '4. Exceeding 2 Pages', desc: 'Unless you have 10+ years of senior executive experience, keep your resume concise (1 page for 0-5 yrs, max 2 pages for senior).' },
                  { title: '5. Missing Target Role Headline', desc: 'Not stating what job you want at the top, forcing the recruiter to guess your career path.' },
                  { title: '6. Generic One-Size-Fits-All', desc: 'Submitting the identical resume to 50 jobs instead of tailoring bullet points to match the target job description.' },
                  { title: '7. Dense Walls of Text', desc: 'Paragraphs longer than 3 lines are skipped. Use clean, punchy 1-2 line bullet points.' },
                  { title: '8. Passive Voice Overload', desc: 'Starting bullets with "Responsible for" or "Assisted with" instead of decisive verbs like "Engineered", "Spearheaded", "Automated".' },
                  { title: '9. Cluttered Multi-Graphic Designs', desc: 'Fancy graphic icons, progress bars (e.g. "Java 80%"), and decorative elements that corrupt ATS text parsing.' },
                  { title: '10. Outdated Tech or Dead Links', desc: 'Listing deprecated libraries or including dead GitHub/LinkedIn links that return 404.' }
                ].map((item, idx) => (
                  <div key={idx} style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '14px', padding: '1.25rem' }}>
                    <h4 style={{ margin: '0 0 6px', fontSize: '0.98rem', fontWeight: 800, color: '#991B1B', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <XCircle size={16} color="#DC2626" /> {item.title}
                    </h4>
                    <p style={{ margin: 0, fontSize: '0.86rem', color: '#7F1D1D', lineHeight: 1.5 }}>
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Bottom CTA Block */}
        <div style={{ marginTop: '3.5rem', textAlign: 'center', background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)', borderRadius: '24px', padding: '3.5rem 2rem', color: '#FFFFFF', boxShadow: '0 10px 30px rgba(15,23,42,0.15)' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, margin: '0 0 0.85rem', color: '#FFFFFF' }}>
            Put This Guide into Practice in 5 Minutes
          </h2>
          <p style={{ fontSize: '1.02rem', color: '#94A3B8', margin: '0 auto 2rem', maxWidth: '640px', lineHeight: 1.6 }}>
            NextGen Resume’s AI automatically applies the Google XYZ formula, enforces ATS rules, and suggests high-impact power verbs tailored to your career.
          </p>
          <button 
            onClick={handleStartBuilding}
            style={{ 
              padding: '14px 32px', 
              fontSize: '1.05rem', 
              fontWeight: 800, 
              borderRadius: '10px', 
              background: '#ee571d', 
              color: '#FFFFFF', 
              border: 'none', 
              cursor: 'pointer', 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '10px',
              boxShadow: '0 4px 15px rgba(238,87,29,0.35)'
            }}
          >
            <span>Build Your ATS Resume Now</span>
            <ArrowRight size={20} />
          </button>
        </div>

      </div>
    </div>
  );
};

export default ResumeWritingGuide;
