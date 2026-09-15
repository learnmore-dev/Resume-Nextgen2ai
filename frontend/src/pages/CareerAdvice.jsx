import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, CheckCircle2, XCircle, Zap, ShieldCheck, Target, 
  ArrowRight, Award, TrendingUp, Cpu, Database, Lock, Briefcase, 
  Check, Copy, Sparkles, Layers, DollarSign, HelpCircle
} from 'lucide-react';

const ACTION_VERBS_BY_DOMAIN = [
  {
    cat: 'Systems Architecture & Backend Engineering',
    icon: <Cpu size={18} color="#2563EB" />,
    verbs: ['Architected', 'Engineered', 'Refactored', 'Decoupled', 'Containerized', 'Micro-serviced', 'Optimized', 'Parallelized', 'Benchmarked', 'Provisioned', 'Automated', 'Scaled']
  },
  {
    cat: 'Cloud, DevOps & Infrastructure',
    icon: <Layers size={18} color="#0D9488" />,
    verbs: ['Orchestrated', 'Migrated', 'Automated', 'Instrumented', 'Hardened', 'Standardized', 'Deployed', 'Virtualized', 'Streamlined', 'Monitored', 'Configured', 'Disaster-Recovered']
  },
  {
    cat: 'Data Engineering, AI & Analytics',
    icon: <Database size={18} color="#9333EA" />,
    verbs: ['Modeled', 'Quantified', 'Ingested', 'Synthesized', 'Fine-Tuned', 'Forecasted', 'Extracted', 'Validated', 'Visualized', 'Normalized', 'Transformed', 'Indexed']
  },
  {
    cat: 'Product Management & Strategic Delivery',
    icon: <Target size={18} color="#EA580C" />,
    verbs: ['Spearheaded', 'Pioneered', 'Delivered', 'Conceptualized', 'Championed', 'Prioritized', 'Iterated', 'Synthesized', 'A/B Tested', 'Roadmapped', 'Shipped', 'Unified']
  },
  {
    cat: 'Cybersecurity, Governance & SRE',
    icon: <Lock size={18} color="#DC2626" />,
    verbs: ['Fortified', 'Audited', 'Mitigated', 'Remediated', 'Enforced', 'Safeguarded', 'Triaged', 'Patch-managed', 'Authenticated', 'Compliance-certified', 'Isolated', 'Defended']
  },
  {
    cat: 'Executive Leadership & Team Scaling',
    icon: <TrendingUp size={18} color="#16A34A" />,
    verbs: ['Mentored', 'Cultivated', 'Directed', 'Mobilized', 'Accelerated', 'Negotiated', 'Budgeted', 'Transformed', 'Recruited', 'Empowered', 'Standardized', 'Orchestrated']
  }
];

const XYZ_CASE_STUDIES = [
  {
    role: 'Senior Software Engineer / Backend Lead',
    metric: '+35% Throughput | -45ms Latency',
    weak: 'Worked on Java APIs, fixed backend bugs, and helped improve our PostgreSQL database.',
    strong: 'Architected 14 asynchronous Spring Boot microservices processing 4.2M daily transactions, reducing average API response latency by 42ms and cutting compute cloud costs by $18,000/month.',
    breakdown: {
      x: 'Architected 14 asynchronous microservices',
      y: 'Reduced latency by 42ms and saved $18,000/mo on compute',
      z: 'Leveraged Spring Boot, Redis caching, and async message queues'
    }
  },
  {
    role: 'DevOps / Platform Solutions Architect',
    metric: '99.99% Uptime | 4x Faster Deployments',
    weak: 'Managed AWS infrastructure and wrote CI/CD deployment scripts in GitHub Actions.',
    strong: 'Orchestrated high-availability multi-region Kubernetes clusters on AWS EKS with automated Terraform IaC, accelerating deployment release frequency from bi-weekly to 4x daily with zero production downtime.',
    breakdown: {
      x: 'Accelerated deployment frequency to 4x daily',
      y: 'Maintained 99.99% uptime with zero downtime releases',
      z: 'Implemented Kubernetes GitOps pipelines and automated blue-green deployments'
    }
  },
  {
    role: 'Lead Data Analyst / BI Specialist',
    metric: '₹3.4Cr Revenue Growth Identified',
    weak: 'Made Power BI reports, extracted SQL data, and shared sales numbers with management.',
    strong: 'Engineered predictive customer retention models across 250,000+ active user cohorts in Python and SQL, pinpointing critical churn drivers to drive a 14% uplift in quarterly subscription renewal rates (₹3.4Cr ARR impact).',
    breakdown: {
      x: 'Increased quarterly subscription renewal rates by 14%',
      y: 'Generated ₹3.4Cr annual recurring revenue impact',
      z: 'Built cohort retention and machine learning classification models on Snowflake'
    }
  },
  {
    role: 'Senior Product Manager',
    metric: '+28% User Activation | -30% Drop-off',
    weak: 'Responsible for product roadmap, user feedback, and working with engineers on new features.',
    strong: 'Spearheaded end-to-end redesign of the customer onboarding funnel across web and mobile, reducing user drop-off by 30% and lifting Day-7 product activation from 41% to 69% within 90 days.',
    breakdown: {
      x: 'Lifted Day-7 user activation from 41% to 69%',
      y: 'Decreased onboarding funnel drop-off by 30%',
      z: 'Executed rapid A/B testing, user journey telemetry, and simplified single-sign-on flows'
    }
  }
];

export const CareerAdvice = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('ats');
  const [copiedVerb, setCopiedVerb] = useState(null);

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
            <span className="active">Career Excellence Hub</span>
            <span className="sep">›</span>
            <span className="active">Executive Resume Architecture Guide</span>
          </div>

          <h1 className="templates-main-heading" style={{ fontSize: '2.8rem', marginBottom: '12px' }}>
            Executive Career & <span className="highlight-noticed">Resume Masterclass</span>
          </h1>

          <p className="templates-hero-desc" style={{ fontSize: '1.05rem', maxWidth: '780px', margin: '0 auto 18px', lineHeight: 1.6 }}>
            Battle-tested strategies used by senior engineers, architects, and product leads to beat corporate ATS filters, quantify multi-crore impact, and secure top-tier interviews.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.14)', padding: '5px 14px', borderRadius: '20px', color: '#E2E8F0', fontSize: '0.82rem' }}>
              <ShieldCheck size={15} color="#34D399" /> Google XYZ Framework
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.14)', padding: '5px 14px', borderRadius: '20px', color: '#E2E8F0', fontSize: '0.82rem' }}>
              <Zap size={15} color="#FBBF24" /> 150+ Enterprise Verbs
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.14)', padding: '5px 14px', borderRadius: '20px', color: '#E2E8F0', fontSize: '0.82rem' }}>
              <Award size={15} color="#38BDF8" /> 95%+ ATS Pass Rate
            </span>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 1.5rem' }}>
        
        {/* Navigation Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', background: '#FFFFFF', padding: '6px', borderRadius: '14px', border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', flexWrap: 'wrap', gap: '4px' }}>
            <button
              onClick={() => setActiveTab('ats')}
              style={{
                background: activeTab === 'ats' ? '#0F172A' : 'transparent',
                color: activeTab === 'ats' ? '#FFFFFF' : '#64748B',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '10px',
                fontWeight: 700,
                fontSize: '0.92rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s'
              }}
            >
              <ShieldCheck size={17} /> ATS Optimization Blueprint
            </button>

            <button
              onClick={() => setActiveTab('xyz')}
              style={{
                background: activeTab === 'xyz' ? '#0F172A' : 'transparent',
                color: activeTab === 'xyz' ? '#FFFFFF' : '#64748B',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '10px',
                fontWeight: 700,
                fontSize: '0.92rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s'
              }}
            >
              <Zap size={17} /> Google XYZ Formula
            </button>

            <button
              onClick={() => setActiveTab('verbs')}
              style={{
                background: activeTab === 'verbs' ? '#0F172A' : 'transparent',
                color: activeTab === 'verbs' ? '#FFFFFF' : '#64748B',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '10px',
                fontWeight: 700,
                fontSize: '0.92rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s'
              }}
            >
              <Target size={17} /> 150+ Power Verbs
            </button>

            <button
              onClick={() => setActiveTab('interview')}
              style={{
                background: activeTab === 'interview' ? '#0F172A' : 'transparent',
                color: activeTab === 'interview' ? '#FFFFFF' : '#64748B',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '10px',
                fontWeight: 700,
                fontSize: '0.92rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s'
              }}
            >
              <DollarSign size={17} /> Senior Interview & Salary Guide
            </button>
          </div>
        </div>

        {/* TAB 1: ATS Optimization Blueprint */}
        {activeTab === 'ats' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* Intro Card */}
            <div style={{ background: '#FFFFFF', borderRadius: '20px', border: '1px solid #E2E8F0', padding: '2.5rem', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.25rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#EFF6FF', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ShieldCheck size={26} />
                </div>
                <div>
                  <h2 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 800, color: '#0F172A' }}>
                    How Modern Applicant Tracking Systems (ATS) Actually Work
                  </h2>
                  <p style={{ margin: '4px 0 0', color: '#64748B', fontSize: '0.92rem' }}>
                    Over 98% of Fortune 500 companies (Google, Microsoft, Amazon, TCS, Infosys) use ATS platforms like Workday, Taleo, Greenhouse, and Lever.
                  </p>
                </div>
              </div>

              <p style={{ color: '#475569', lineHeight: 1.7, fontSize: '0.96rem', marginBottom: '1.5rem' }}>
                An ATS does not "read" your resume visually. It parses the raw text stream, strips styling elements, classifies headers into semantic sections (Contact, Experience, Skills, Education), and executes <strong>Contextual Vector Matching</strong> against the recruiter’s specific job description. If your resume uses non-standard graphics, floating text boxes, or tables, critical keywords are jumbled into unreadable garbage.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
                <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '14px', padding: '1.5rem' }}>
                  <h4 style={{ margin: '0 0 10px', fontSize: '1rem', fontWeight: 800, color: '#991B1B', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <XCircle size={18} color="#DC2626" /> Critical ATS Formatting Mistakes
                  </h4>
                  <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.88rem', color: '#7F1D1D', lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <li><strong>Floating Text Boxes & Graphics</strong>: Completely skipped by Workday parsers.</li>
                    <li><strong>Creative Headings</strong>: Using "Where I've Been" instead of "Professional Experience".</li>
                    <li><strong>Keyword Stuffing</strong>: Hidden white text keywords are instantly flagged as fraud.</li>
                    <li><strong>Unsearchable PDFs</strong>: Scanned image PDFs that cannot be selected as raw text.</li>
                  </ul>
                </div>

                <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '14px', padding: '1.5rem' }}>
                  <h4 style={{ margin: '0 0 10px', fontSize: '1rem', fontWeight: 800, color: '#166534', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={18} color="#16A34A" /> The NextGen ATS Standard
                  </h4>
                  <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.88rem', color: '#14532D', lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <li><strong>Standard Semantic Hierarchy</strong>: Strict H1, H2, and clean unordered bullet lists.</li>
                    <li><strong>Exact Hard Skill Matching</strong>: Aligning terminology (e.g. "Kubernetes", "AWS EKS", "React.js").</li>
                    <li><strong>Linear Text Extraction Flow</strong>: 100% extractable by all enterprise parsers.</li>
                    <li><strong>Clean Single / Dual Column Grids</strong>: High visual appeal without layout corruption.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Checklist Card */}
            <div style={{ background: '#FFFFFF', borderRadius: '20px', border: '1px solid #E2E8F0', padding: '2rem 2.5rem', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
              <h3 style={{ margin: '0 0 1.25rem', fontSize: '1.3rem', fontWeight: 800, color: '#0F172A' }}>
                Pre-Submission ATS Checklist (Score 90%+)
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                {[
                  'Target Job Title prominently positioned in headline and summary',
                  'At least 6 hard skills from the JD naturally embedded in bullet points',
                  'Every experience bullet starts with a past-tense action verb (unless current)',
                  'Each major role features at least 2 quantifiable metrics (%, ₹, $, ms, hours)',
                  'Clean contact info: Full Name, Phone, Email, City/State, LinkedIn URL',
                  'Exported using NextGen Resume ATS-Validated PDF engine'
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', background: '#F8FAFC', padding: '1rem', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                    <CheckCircle2 size={18} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontSize: '0.88rem', color: '#334155', lineHeight: 1.5, fontWeight: 500 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: Google XYZ Formula */}
        {activeTab === 'xyz' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            <div style={{ background: '#FFFFFF', borderRadius: '20px', border: '1px solid #E2E8F0', padding: '2.5rem', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#EFF6FF', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Zap size={26} />
                </div>
                <div>
                  <h2 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 800, color: '#0F172A' }}>
                    The Google XYZ Bullet Formula
                  </h2>
                  <p style={{ margin: '4px 0 0', color: '#64748B', fontSize: '0.92rem' }}>
                    Created by Laszlo Bock, former Google Senior VP of People Operations, to evaluate senior engineering and leadership talent.
                  </p>
                </div>
              </div>

              <div style={{ background: 'linear-gradient(135deg, #1E40AF 0%, #1E3A8A 100%)', borderRadius: '14px', padding: '1.5rem 2rem', color: '#FFFFFF', marginBottom: '2rem' }}>
                <div style={{ fontSize: '0.85rem', color: '#93C5FD', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
                  The Universal Winning Structure:
                </div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.01em', lineHeight: 1.4 }}>
                  "Accomplished <span style={{ color: '#FDE047' }}>[X]</span>, as measured by <span style={{ color: '#86EFAC' }}>[Y]</span>, by doing <span style={{ color: '#67E8F9' }}>[Z]</span>."
                </div>
                <div style={{ display: 'flex', gap: '24px', marginTop: '1rem', flexWrap: 'wrap', fontSize: '0.88rem', color: '#E2E8F0' }}>
                  <span><strong style={{ color: '#FDE047' }}>X</strong> = The Business Achievement</span>
                  <span><strong style={{ color: '#86EFAC' }}>Y</strong> = The Quantified Metric ($/%, time, latency)</span>
                  <span><strong style={{ color: '#67E8F9' }}>Z</strong> = The Specific Technical Action / Tools</span>
                </div>
              </div>

              {/* Case Studies */}
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', marginBottom: '1.25rem' }}>
                Real Enterprise Case Studies: Weak vs Google XYZ Transformation
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {XYZ_CASE_STUDIES.map((study, idx) => (
                  <div key={idx} style={{ background: '#F8FAFC', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '1.75rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '8px' }}>
                      <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A' }}>{study.role}</span>
                      <span style={{ background: '#DCFCE7', color: '#166534', padding: '4px 12px', borderRadius: '20px', fontSize: '0.82rem', fontWeight: 700 }}>
                        {study.metric}
                      </span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                      <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '10px', padding: '1rem' }}>
                        <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#DC2626', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
                          <XCircle size={14} /> Weak / Fresher Phrasing (Generic Duty)
                        </div>
                        <p style={{ margin: 0, fontSize: '0.86rem', color: '#7F1D1D', lineHeight: 1.5 }}>
                          "{study.weak}"
                        </p>
                      </div>

                      <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '10px', padding: '1rem' }}>
                        <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#16A34A', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
                          <CheckCircle2 size={14} /> Transformed Google XYZ Bullet (100% Impact)
                        </div>
                        <p style={{ margin: 0, fontSize: '0.86rem', color: '#14532D', lineHeight: 1.5, fontWeight: 500 }}>
                          "{study.strong}"
                        </p>
                      </div>
                    </div>

                    {/* Breakdown pill row */}
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', fontSize: '0.8rem', background: '#FFFFFF', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                      <span style={{ color: '#0F172A' }}><strong>Accomplishment (X):</strong> {study.breakdown.x}</span>
                      <span style={{ color: '#0F172A' }}>• <strong>Metric (Y):</strong> {study.breakdown.y}</span>
                      <span style={{ color: '#0F172A' }}>• <strong>Tech Stack (Z):</strong> {study.breakdown.z}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: 150+ Power Action Verbs */}
        {activeTab === 'verbs' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            <div style={{ background: '#FFFFFF', borderRadius: '20px', border: '1px solid #E2E8F0', padding: '2.5rem', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#FDF2F8', color: '#DB2777', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Target size={26} />
                </div>
                <div>
                  <h2 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 800, color: '#0F172A' }}>
                    150+ Enterprise Power Action Verbs
                  </h2>
                  <p style={{ margin: '4px 0 0', color: '#64748B', fontSize: '0.92rem' }}>
                    Replace passive phrases like "Assisted with" or "Responsible for" with authoritative industry verbs. Click any verb to copy!
                  </p>
                </div>
              </div>

              {copiedVerb && (
                <div style={{ background: '#DCFCE7', color: '#166534', padding: '8px 16px', borderRadius: '10px', marginBottom: '1.25rem', fontSize: '0.85rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <Check size={16} /> Copied "{copiedVerb}" to clipboard!
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
                {ACTION_VERBS_BY_DOMAIN.map((grp, i) => (
                  <div key={i} style={{ background: '#F8FAFC', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
                      {grp.icon}
                      <h4 style={{ margin: 0, fontSize: '0.98rem', fontWeight: 800, color: '#0F172A' }}>{grp.cat}</h4>
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {grp.verbs.map((verb, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleCopyVerb(verb)}
                          style={{
                            background: '#FFFFFF',
                            border: '1.5px solid #CBD5E1',
                            borderRadius: '8px',
                            padding: '6px 12px',
                            fontSize: '0.85rem',
                            fontWeight: 700,
                            color: '#1E293B',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            transition: 'all 0.15s'
                          }}
                        >
                          <span>{verb}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 4: Senior Interview & Salary Guide */}
        {activeTab === 'interview' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            <div style={{ background: '#FFFFFF', borderRadius: '20px', border: '1px solid #E2E8F0', padding: '2.5rem', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.25rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#F0FDF4', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <DollarSign size={26} />
                </div>
                <div>
                  <h2 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 800, color: '#0F172A' }}>
                    Senior Tech Interview Framework & Salary Negotiation
                  </h2>
                  <p style={{ margin: '4px 0 0', color: '#64748B', fontSize: '0.92rem' }}>
                    Strategic frameworks for behavioral rounds, system design discussions, and securing compensation at the top 10% of market bands.
                  </p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                
                <div style={{ background: '#F8FAFC', borderRadius: '14px', border: '1px solid #E2E8F0', padding: '1.5rem' }}>
                  <h3 style={{ margin: '0 0 10px', fontSize: '1.15rem', fontWeight: 800, color: '#0F172A' }}>
                    1. The STAR-C Behavioral Method
                  </h3>
                  <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.6, margin: '0 0 1rem' }}>
                    When asked <em>"Tell me about a time you resolved a major production outage"</em>, structure your 3-minute answer using:
                  </p>
                  <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.88rem', color: '#334155', lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <li><strong>Situation</strong>: Set the company scale and severity in 30 seconds.</li>
                    <li><strong>Task</strong>: Your specific ownership role (not just the team).</li>
                    <li><strong>Action</strong>: The technical troubleshooting, tools, and decisions.</li>
                    <li><strong>Result</strong>: Quantifiable outcome (downtime saved, root cause patched).</li>
                    <li><strong>Countermeasure (C)</strong>: Architectural safeguard implemented to prevent recurrence.</li>
                  </ul>
                </div>

                <div style={{ background: '#F8FAFC', borderRadius: '14px', border: '1px solid #E2E8F0', padding: '1.5rem' }}>
                  <h3 style={{ margin: '0 0 10px', fontSize: '1.15rem', fontWeight: 800, color: '#0F172A' }}>
                    2. Strategic Salary Negotiation
                  </h3>
                  <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.6, margin: '0 0 1rem' }}>
                    How senior candidates navigate compensation without leaving money on the table:
                  </p>
                  <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.88rem', color: '#334155', lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <li><strong>Anchor with Market Bands</strong>: Quote total compensation targets (Base + Joining Bonus + Stock Grants/RSUs).</li>
                    <li><strong>Never Give the First Number</strong>: <em>"I am focused on finding the right technical challenge; what is the budgeted range for this level?"</em></li>
                    <li><strong>Counter with Multiple Levers</strong>: If base salary is capped, negotiate signing bonuses, ESOP vesting cliffs, or annual performance accelerators.</li>
                  </ul>
                </div>

              </div>

              <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '12px', padding: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h4 style={{ margin: '0 0 4px', fontSize: '1rem', fontWeight: 800, color: '#1E40AF' }}>
                    Need tailored bullet points for your target company?
                  </h4>
                  <p style={{ margin: 0, fontSize: '0.88rem', color: '#3B82F6' }}>
                    Paste your job description into NextGen Resume Builder to get AI-optimized suggestions in seconds.
                  </p>
                </div>
                <button
                  onClick={() => navigate('/templates')}
                  style={{
                    background: '#1E40AF',
                    color: '#FFFFFF',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    fontWeight: 700,
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}
                >
                  Launch AI Builder
                </button>
              </div>

            </div>

          </div>
        )}

        {/* Global Bottom CTA */}
        <div style={{ marginTop: '3rem', textAlign: 'center', background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)', borderRadius: '24px', padding: '3rem 2rem', color: '#FFFFFF', boxShadow: '0 10px 30px rgba(15,23,42,0.15)' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: '0 0 0.75rem', color: '#FFFFFF' }}>
            Transform Your Resume into an Interview Magnet
          </h2>
          <p style={{ fontSize: '1rem', color: '#94A3B8', margin: '0 auto 1.75rem', maxWidth: '600px', lineHeight: 1.6 }}>
            Put the Google XYZ Formula and ATS best practices to work automatically with NextGen Resume’s AI generation engine.
          </p>
          <button 
            onClick={() => navigate('/templates')} 
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
            <span>Choose a Professional Template</span>
            <ArrowRight size={20} />
          </button>
        </div>

      </div>
    </div>
  );
};

export default CareerAdvice;
