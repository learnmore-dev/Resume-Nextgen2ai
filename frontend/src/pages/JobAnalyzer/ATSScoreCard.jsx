import React from 'react';
import { ShieldCheck, TrendingUp, Zap, Sparkles } from 'lucide-react';
import MissingKeywords from './MissingKeywords';
import ImpactCheck from './ImpactCheck';
import ResumeOptimizer from './ResumeOptimizer';

export const ATSScoreCard = ({ analysis, onOptimize, optimizing, isUploadedPdf }) => {
  if (!analysis) return null;

  const score = Math.round(analysis.overall_score || 0);
  const breakdown = analysis.breakdown || {};

  const getScoreColor = (sc) => {
    if (sc >= 80) return '#10B981'; // Emerald
    if (sc >= 60) return '#F59E0B'; // Amber
    return '#EF4444'; // Red
  };

  const scoreItems = [
    { label: 'Hard Technical Skills (30%)', val: breakdown.hard_skills || 0, desc: 'Core languages, frameworks & DBs' },
    { label: 'Soft Skills & Methodologies (10%)', val: breakdown.soft_skills || 0, desc: 'Agile, leadership & teamwork' },
    { label: 'Job Title Alignment (15%)', val: breakdown.title_alignment || 0, desc: 'Role match & seniority level' },
    { label: 'Quantifiable Metrics & Impact (15%)', val: breakdown.impact_metrics || 0, desc: 'XYZ formula (%, numbers, stats)' },
    { label: 'Power Action Verbs (10%)', val: breakdown.action_verbs || 0, desc: 'Engineered, Spearheaded, Optimized' },
    { label: 'Section Health (10%)', val: breakdown.section_health || 0, desc: 'Contact, Summary, Exp, Edu, Skills, Projects' },
    { label: 'ATS Readability & Formatting (10%)', val: breakdown.formatting || 0, desc: 'Clean standard parseability' },
  ];

  return (
    <div className="glass-card" style={{ marginBottom: '2.5rem', background: '#FFFFFF', border: '1.5px solid #BFDBFE', borderRadius: '14px', padding: '2.25rem', boxShadow: '0 12px 35px rgba(37,99,235,0.08)' }}>
      
      {/* 🌟 1. Header & Circular Score Meter */}
      <div style={{ textAlign: 'center', marginBottom: '2rem', borderBottom: '1px solid #E2E8F0', paddingBottom: '2rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#EFF6FF', color: '#2563EB', padding: '4px 14px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '800', marginBottom: '1rem' }}>
          <ShieldCheck size={16} /> PRODUCTION ATS EVALUATION REPORT
        </div>
        
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.85rem', fontWeight: '900', color: '#0F172A', margin: '0 0 1.25rem' }}>
          Real-World ATS Scoring & Match Analysis
        </h2>

        {/* Circular Gauge */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0.5rem auto 1rem' }}>
          <div style={{
            width: '140px',
            height: '140px',
            borderRadius: '50%',
            border: `7px solid ${getScoreColor(score)}`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `0 0 25px ${getScoreColor(score)}33`,
            background: '#FFFFFF'
          }}>
            <span style={{ fontSize: '2.8rem', fontWeight: '900', color: getScoreColor(score), lineHeight: '1' }}>
              {score}%
            </span>
            <span style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: '800', textTransform: 'uppercase', marginTop: '3px' }}>
              ATS Score
            </span>
          </div>

          {/* Status Badge */}
          <div style={{
            marginTop: '1.25rem',
            padding: '8px 22px',
            borderRadius: '20px',
            background: score >= 80 ? '#DCFCE7' : (score >= 60 ? '#FEF3C7' : '#FEE2E2'),
            color: score >= 80 ? '#15803D' : (score >= 60 ? '#B45309' : '#991B1B'),
            fontWeight: '900',
            fontSize: '0.92rem',
            border: `1.5px solid ${score >= 80 ? '#86EFAC' : (score >= 60 ? '#FDE68A' : '#FCA5A5')}`
          }}>
            {analysis.status_label || (score >= 80 ? 'HIGH CALLBACK CHANCE' : 'NEEDS OPTIMIZATION')}
          </div>
        </div>
      </div>

      {/* 🌟 2. 7-Dimension Weighted Breakdown Meters */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h4 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0F172A', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <TrendingUp size={20} color="#2563EB" /> Weighted Scoring Dimensions (100% Total)
        </h4>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {scoreItems.map((item, idx) => (
            <div key={idx} style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: '800', color: '#0F172A' }}>{item.label}</span>
                <strong style={{ color: getScoreColor(item.val), fontSize: '0.95rem' }}>{Math.round(item.val)}%</strong>
              </div>
              <div style={{ fontSize: '0.72rem', color: '#64748B', marginBottom: '6px' }}>{item.desc}</div>
              <div style={{ width: '100%', height: '7px', background: '#E2E8F0', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${Math.min(item.val, 100)}%`, height: '100%', background: getScoreColor(item.val), transition: 'width 0.6s ease' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🌟 3. Impact Metrics Gauge */}
      <ImpactCheck metrics={analysis.metrics} />

      {/* 🌟 4. Categorized Matched & Missing Keywords */}
      <MissingKeywords
        matchedKeywords={analysis.matched_keywords}
        missingKeywords={analysis.missing_keywords}
      />

      {/* 🌟 5. Strategic Recommendations */}
      {analysis.suggestions?.length > 0 && (
        <div style={{ marginBottom: '2.5rem', background: '#EFF6FF', border: '1.5px solid #BFDBFE', padding: '1.25rem', borderRadius: '10px' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: '800', color: '#1E40AF', margin: '0 0 0.75rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Zap size={18} color="#2563EB" /> Strategic Recommendations
          </h4>
          <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.86rem', color: '#1E3A8A', lineHeight: '1.6' }}>
            {analysis.suggestions.map((s, i) => (
              <li key={i} style={{ marginBottom: '0.45rem' }}>{s}</li>
            ))}
          </ul>
        </div>
      )}

      {/* 🌟 6. AI Resume Improvement & 1-Click Auto-Tailor */}
      {!isUploadedPdf && (
        <ResumeOptimizer
          analysis={analysis}
          onOptimize={onOptimize}
          optimizing={optimizing}
          optimizedResult={analysis.optimizedResult}
          onReset={onReset}
        />
      )}
    </div>
  );
};

export default ATSScoreCard;
