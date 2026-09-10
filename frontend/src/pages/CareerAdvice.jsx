import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, CheckCircle2, XCircle, Zap, ShieldCheck, Target, ArrowRight } from 'lucide-react';

export const CareerAdvice = () => {
  const navigate = useNavigate();

  const ACTION_VERBS = [
    { cat: 'Engineering & Development', verbs: ['Architected', 'Engineered', 'Developed', 'Deployed', 'Refactored', 'Automated', 'Scaled'] },
    { cat: 'Data & Analytics', verbs: ['Analyzed', 'Modeled', 'Extracted', 'Quantified', 'Forecasted', 'Visualized', 'Optimized'] },
    { cat: 'Leadership & Impact', verbs: ['Spearheaded', 'Orchestrated', 'Delivered', 'Pioneered', 'Accelerated', 'Boosted', 'Streamlined'] }
  ];

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh', paddingBottom: '4rem' }}>
      {/* Hero Banner */}
      <section className="templates-hero-banner" style={{ padding: '45px 24px 50px', marginBottom: '2rem' }}>
        <div className="templates-hero-container" style={{ maxWidth: '900px' }}>
          <div className="templates-breadcrumb" style={{ marginBottom: '14px' }}>
            <span onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Home</span>
            <span className="sep">›</span>
            <span className="active">Career Advice & Resume Guide</span>
          </div>

          <h1 className="templates-main-heading" style={{ fontSize: '2.8rem', marginBottom: '10px' }}>
            Ultimate Resume Writing & <span className="highlight-noticed">Career Guide</span>
          </h1>

          <p className="templates-hero-desc" style={{ fontSize: '1rem', maxWidth: '720px', margin: '0 auto 20px' }}>
            Expert strategies to beat ATS algorithms, structure high-impact bullet points using the Google XYZ formula, and land interviews at top tech companies.
          </p>

          <div className="templates-trust-badges" style={{ margin: '0' }}>
            <span className="trust-item"><ShieldCheck size={16} color="#34D399" /> Google XYZ Formula</span>
            <span className="trust-dot">•</span>
            <span className="trust-item">100+ Action Verbs</span>
            <span className="trust-dot">•</span>
            <span className="trust-item">ATS Best Practices</span>
          </div>
        </div>
      </section>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 1.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* Section 1: The Google XYZ Formula */}
        <div className="glass-card" style={{ background: '#FFFFFF', border: '1.5px solid #BFDBFE', borderRadius: '12px', padding: '1.75rem', boxShadow: '0 4px 15px rgba(37,99,235,0.06)' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0F172A', margin: '0 0 0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Zap size={20} color="#2563EB" /> 1. The Google XYZ Bullet Formula
          </h3>
          <p style={{ fontSize: '0.88rem', color: '#475569', margin: '0 0 1.25rem', lineHeight: '1.5' }}>
            Former Google Senior VP of People Operations Laszlo Bock recommends structuring every bullet point as:
          </p>
          <div style={{ background: '#EFF6FF', borderLeft: '4px solid #2563EB', padding: '1rem 1.25rem', borderRadius: '0 8px 8px 0', marginBottom: '1.25rem' }}>
            <span style={{ fontSize: '1.05rem', fontWeight: '800', color: '#1E40AF' }}>
              "Accomplished [X], as measured by [Y], by doing [Z]"
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '8px', padding: '1rem' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: '800', color: '#991B1B', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                <XCircle size={16} color="#DC2626" /> Weak Bullet Point (0 ATS Points)
              </div>
              <p style={{ fontSize: '0.82rem', color: '#7F1D1D', margin: 0, lineHeight: '1.4' }}>
                "Responsible for writing Java backend code and fixing bugs in the database."
              </p>
            </div>

            <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '8px', padding: '1rem' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: '800', color: '#166534', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                <CheckCircle2 size={16} color="#16A34A" /> Strong XYZ Bullet (100 ATS Points)
              </div>
              <p style={{ fontSize: '0.82rem', color: '#14532D', margin: 0, lineHeight: '1.4' }}>
                "Engineered 12+ REST microservices in Spring Boot, accelerating transaction processing speeds by 30% and reducing database latency."
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: 100+ High-Impact Action Verbs */}
        <div className="glass-card" style={{ background: '#FFFFFF', border: '1.5px solid #BFDBFE', borderRadius: '12px', padding: '1.75rem', boxShadow: '0 4px 15px rgba(37,99,235,0.06)' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0F172A', margin: '0 0 1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Target size={20} color="#2563EB" /> 2. High-Impact Power Action Verbs
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            {ACTION_VERBS.map((grp, i) => (
              <div key={i} style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '1rem' }}>
                <h4 style={{ fontSize: '0.88rem', fontWeight: '800', color: '#0F172A', margin: '0 0 8px' }}>{grp.cat}</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                  {grp.verbs.map((v, idx) => (
                    <span key={idx} style={{ fontSize: '0.76rem', background: '#DBEAFE', color: '#1E40AF', padding: '2px 7px', borderRadius: '4px', fontWeight: '700' }}>
                      {v}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Call to Action */}
        <div style={{ textAlign: 'center', background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)', borderRadius: '12px', padding: '2rem', color: '#FFFFFF' }}>
          <h3 style={{ fontSize: '1.4rem', fontWeight: '800', margin: '0 0 8px', color: '#FFFFFF' }}>
            Ready to Build Your Winning Resume?
          </h3>
          <p style={{ fontSize: '0.9rem', color: '#94A3B8', margin: '0 0 1.25rem' }}>
            Use our AI Resume Builder with professional ATS templates and auto-tailoring.
          </p>
          <button onClick={() => navigate('/templates')} className="btn btn-primary" style={{ padding: '0.85rem 2rem', fontSize: '1rem', fontWeight: '800', borderRadius: '8px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            Build My Resume Now <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CareerAdvice;
