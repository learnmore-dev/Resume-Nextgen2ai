import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, Eye, Database, Globe, Key, ArrowLeft, CheckCircle2 } from 'lucide-react';

export const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh', paddingBottom: '5rem' }}>
      {/* Hero Header */}
      <section className="templates-hero-banner" style={{ padding: '50px 24px 55px', marginBottom: '2.5rem' }}>
        <div className="templates-hero-container" style={{ maxWidth: '960px' }}>
          <div className="templates-breadcrumb" style={{ marginBottom: '14px' }}>
            <span onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Home</span>
            <span className="sep">›</span>
            <span className="active">Legal & Policies</span>
            <span className="sep">›</span>
            <span className="active">Privacy Policy</span>
          </div>

          <h1 className="templates-main-heading" style={{ fontSize: '2.6rem', marginBottom: '12px' }}>
            Privacy <span className="highlight-noticed">Policy</span>
          </h1>

          <p className="templates-hero-desc" style={{ fontSize: '1.02rem', maxWidth: '750px', margin: '0 auto 16px', lineHeight: 1.6 }}>
            Your privacy and career data confidentiality are paramount. Learn how NextGen2AI protects, encrypts, and respects your information.
          </p>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.12)', padding: '6px 16px', borderRadius: '20px', color: '#E2E8F0', fontSize: '0.85rem' }}>
            <Lock size={15} color="#34D399" /> 256-Bit SSL Encryption | GDPR & IT Act Compliant
          </div>
        </div>
      </section>

      {/* Main Content Container */}
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ background: '#FFFFFF', borderRadius: '20px', border: '1px solid #E2E8F0', padding: '3rem 2.5rem', boxShadow: '0 4px 20px -2px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          
          {/* Section 1 */}
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
              <span style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#F0FDF4', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.95rem' }}>1</span>
              Information We Collect
            </h2>
            <p style={{ color: '#475569', lineHeight: 1.7, fontSize: '0.96rem', marginBottom: '1rem' }}>
              We collect only the essential information necessary to build, score, and customize your resume:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              <div style={{ background: '#F8FAFC', padding: '1.25rem', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                <h4 style={{ margin: '0 0 6px', fontSize: '0.95rem', fontWeight: 700, color: '#0F172A' }}>Google Account Credentials</h4>
                <p style={{ margin: 0, fontSize: '0.88rem', color: '#64748B', lineHeight: 1.5 }}>
                  When you sign in using Google OAuth 2.0, we receive your verified full name, email address, and profile photo. We never have access to your Google password.
                </p>
              </div>

              <div style={{ background: '#F8FAFC', padding: '1.25rem', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                <h4 style={{ margin: '0 0 6px', fontSize: '0.95rem', fontWeight: 700, color: '#0F172A' }}>Resume & Career Details</h4>
                <p style={{ margin: 0, fontSize: '0.88rem', color: '#64748B', lineHeight: 1.5 }}>
                  The employment histories, degrees, bullet points, skills, certifications, and target job descriptions you input to generate resumes.
                </p>
              </div>

              <div style={{ background: '#F8FAFC', padding: '1.25rem', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                <h4 style={{ margin: '0 0 6px', fontSize: '0.95rem', fontWeight: 700, color: '#0F172A' }}>Transactional Payment Data</h4>
                <p style={{ margin: 0, fontSize: '0.88rem', color: '#64748B', lineHeight: 1.5 }}>
                  Payments for PDF downloads are processed entirely by Razorpay. We store only confirmation order IDs and payment timestamps; we do not store debit/credit card numbers.
                </p>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '2rem' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
              <span style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#F0FDF4', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.95rem' }}>2</span>
              How We Protect & Use Your Data
            </h2>
            <p style={{ color: '#475569', lineHeight: 1.7, fontSize: '0.96rem', marginBottom: '1rem' }}>
              We use your data solely for the following objectives:
            </p>
            <ul style={{ color: '#475569', lineHeight: 1.7, fontSize: '0.94rem', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><strong>Resume Generation & Cloud Sync</strong>: Preserving your customized master resumes in your secure dashboard.</li>
              <li><strong>ATS Scoring & Semantic Optimization</strong>: Running keyword matching algorithms to help your resumes rank higher on recruiter ATS portals.</li>
              <li><strong>Strict No-Sale Guarantee</strong>: We <strong>NEVER</strong> sell, rent, or trade your personal information, email address, or resume content to third-party data brokers or marketing agencies.</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '2rem' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
              <span style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#F0FDF4', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.95rem' }}>3</span>
              AI Processing & Confidentiality
            </h2>
            <p style={{ color: '#475569', lineHeight: 1.7, fontSize: '0.96rem', margin: 0 }}>
              NextGen Resume incorporates secure enterprise AI models (such as OpenAI GPT-4) via encrypted API connections. Prompts are transmitted solely to generate your requested improvements and summaries. Under our enterprise data terms, your resume inputs are <strong>NOT</strong> used to train foundational AI models.
            </p>
          </div>

          {/* Section 4 */}
          <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '2rem' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
              <span style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#F0FDF4', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.95rem' }}>4</span>
              User Rights & Account Deletion
            </h2>
            <p style={{ color: '#475569', lineHeight: 1.7, fontSize: '0.96rem', margin: '0 0 1rem' }}>
              You maintain total control over your digital footprint. You have the right at any time to:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#334155', fontSize: '0.92rem' }}>
                <CheckCircle2 size={18} color="#10B981" /> Request an export of all resumes and stored personal details.
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#334155', fontSize: '0.92rem' }}>
                <CheckCircle2 size={18} color="#10B981" /> Delete specific resumes permanently from your dashboard.
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#334155', fontSize: '0.92rem' }}>
                <CheckCircle2 size={18} color="#10B981" /> Request total erasure of your account and profile by contacting our Data Privacy Officer.
              </div>
            </div>
          </div>

          {/* Contact Box */}
          <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h4 style={{ margin: '0 0 4px', fontSize: '1.05rem', color: '#0F172A', fontWeight: 800 }}>Data Protection & Privacy Officer</h4>
              <p style={{ margin: 0, fontSize: '0.88rem', color: '#64748B' }}>NextGen2AI, Kundalahalli Gate, Vartur Marathahalli main road, Bangalore-560037 | office@nextgen2ai.com</p>
            </div>
            <button
              onClick={() => navigate('/contact')}
              style={{
                background: '#ee571d',
                color: '#FFFFFF',
                padding: '10px 22px',
                borderRadius: '10px',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.9rem'
              }}
            >
              Contact DPO
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
