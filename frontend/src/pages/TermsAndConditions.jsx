import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, FileText, Scale, Lock, AlertCircle, ArrowLeft, CheckCircle2 } from 'lucide-react';

export const TermsAndConditions = () => {
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
            <span className="active">Terms and Conditions</span>
          </div>

          <h1 className="templates-main-heading" style={{ fontSize: '2.6rem', marginBottom: '12px' }}>
            Terms & <span className="highlight-noticed">Conditions</span>
          </h1>

          <p className="templates-hero-desc" style={{ fontSize: '1.02rem', maxWidth: '750px', margin: '0 auto 16px', lineHeight: 1.6 }}>
            Please read these terms carefully before using NextGen Resume and related services provided by NextGen2AI.
          </p>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.12)', padding: '6px 16px', borderRadius: '20px', color: '#E2E8F0', fontSize: '0.85rem' }}>
            <Scale size={15} color="#38BDF8" /> Last Updated: September 2026 | Effective Immediately
          </div>
        </div>
      </section>

      {/* Main Legal Content Container */}
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ background: '#FFFFFF', borderRadius: '20px', border: '1px solid #E2E8F0', padding: '3rem 2.5rem', boxShadow: '0 4px 20px -2px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          
          {/* Section 1 */}
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
              <span style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#EEF2FF', color: '#4F46E5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.95rem' }}>1</span>
              Agreement to Terms
            </h2>
            <p style={{ color: '#475569', lineHeight: 1.7, fontSize: '0.96rem', margin: 0 }}>
              These Terms and Conditions constitute a legally binding agreement between you, whether personally or on behalf of an entity ("you") and <strong>NextGen2AI</strong> ("Company", "we", "us", or "our"), concerning your access to and use of the NextGen Resume platform and web application. By accessing or using our services, you confirm that you have read, understood, and agreed to be bound by all of these Terms and Conditions.
            </p>
          </div>

          {/* Section 2 */}
          <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '2rem' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
              <span style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#EEF2FF', color: '#4F46E5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.95rem' }}>2</span>
              AI Resume Building & Content Generation
            </h2>
            <p style={{ color: '#475569', lineHeight: 1.7, fontSize: '0.96rem', marginBottom: '1rem' }}>
              NextGen Resume leverages advanced artificial intelligence to offer resume tailoring suggestions, summary generation, keyword optimization, and ATS scoring. By utilizing our AI tools, you acknowledge that:
            </p>
            <ul style={{ color: '#475569', lineHeight: 1.7, fontSize: '0.94rem', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>AI-generated text suggestions are provided for advisory and formatting purposes only.</li>
              <li>You remain solely responsible for the truthfulness, accuracy, and factual correctness of all career achievements, metrics, degrees, and employment histories on your final resumes.</li>
              <li>We do not guarantee interview callbacks or employment offers as hiring choices remain strictly within the discretion of external recruiting employers.</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '2rem' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
              <span style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#EEF2FF', color: '#4F46E5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.95rem' }}>3</span>
              Payments, Pricing & Digital Downloads
            </h2>
            <p style={{ color: '#475569', lineHeight: 1.7, fontSize: '0.96rem', marginBottom: '1rem' }}>
              Our platform allows free creation, customization, and cloud storage of master resumes. Certain premium export capabilities (such as high-definition ATS-optimized PDF generation) are offered at the nominal rate of <strong>₹29 per resume unlock</strong> processed securely via Razorpay.
            </p>
            <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0F172A', fontWeight: 700, fontSize: '0.92rem' }}>
                <CheckCircle2 size={16} color="#10B981" /> Direct Instant Fulfillment
              </div>
              <p style={{ margin: 0, fontSize: '0.88rem', color: '#64748B', lineHeight: 1.5 }}>
                Upon successful confirmation of payment from Razorpay, your resume PDF download is unlocked immediately for unlimited future exports and edits of that template.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0F172A', fontWeight: 700, fontSize: '0.92rem' }}>
                <CheckCircle2 size={16} color="#10B981" /> Refund Policy
              </div>
              <p style={{ margin: 0, fontSize: '0.88rem', color: '#64748B', lineHeight: 1.5 }}>
                Due to the immediate digital delivery of PDF resumes, payments are non-refundable once the file is downloaded, unless a proven technical billing error occurred. For billing inquiries, contact <code>office@nextgen2ai.com</code>.
              </p>
            </div>
          </div>

          {/* Section 4 */}
          <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '2rem' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
              <span style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#EEF2FF', color: '#4F46E5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.95rem' }}>4</span>
              User Accounts & Data Ownership
            </h2>
            <p style={{ color: '#475569', lineHeight: 1.7, fontSize: '0.96rem', margin: 0 }}>
              You retain 100% intellectual property ownership of all personal data, employment history, work samples, and resume content you enter on our platform. NextGen2AI grants you a personal, worldwide, royalty-free license to use, download, print, and distribute your generated resumes for personal job-seeking purposes. You agree not to distribute or resell NextGen Resume's software templates or design codebase without explicit prior written authorization.
            </p>
          </div>

          {/* Section 5 */}
          <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '2rem' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
              <span style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#EEF2FF', color: '#4F46E5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.95rem' }}>5</span>
              Governing Law & Jurisdiction
            </h2>
            <p style={{ color: '#475569', lineHeight: 1.7, fontSize: '0.96rem', margin: 0 }}>
              These terms shall be governed by and defined following the laws of India. NextGen2AI and you irrevocably consent that the courts of Bangalore, Karnataka, India shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.
            </p>
          </div>

          {/* Contact Box */}
          <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h4 style={{ margin: '0 0 4px', fontSize: '1.05rem', color: '#0F172A', fontWeight: 800 }}>Have Questions Regarding Our Terms?</h4>
              <p style={{ margin: 0, fontSize: '0.88rem', color: '#64748B' }}>Contact our legal and support team at office@nextgen2ai.com</p>
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
              Contact Support
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
