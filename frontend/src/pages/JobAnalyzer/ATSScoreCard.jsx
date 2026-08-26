import React from 'react';
import { Sparkles, CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck } from 'lucide-react';

export const ATSScoreCard = ({ analysis, onOptimize, optimizing }) => {
  if (!analysis) return null;

  const getScoreColor = (score) => {
    if (score >= 80) return 'var(--accent-emerald)';
    if (score >= 60) return 'var(--accent-amber)';
    return 'var(--accent-rose)';
  };

  return (
    <div className="glass-card" style={{ marginBottom: '2rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1.75rem' }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', marginBottom: '1.25rem' }}>ATS Match Analysis Report</h3>

        {/* Circular Overall Score Gauge */}
        <div className="score-circle" style={{ '--score': analysis.overall_score, border: `4px solid ${getScoreColor(analysis.overall_score)}` }}>
          <div className="score-value" style={{ color: getScoreColor(analysis.overall_score) }}>
            {Math.round(analysis.overall_score)}
          </div>
          <div className="score-label">ATS Match Score</div>
        </div>

        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '1rem' }}>
          {analysis.overall_score >= 80 ? '🎉 Excellent match! Your resume is highly competitive for this ATS screen.' :
           analysis.overall_score >= 60 ? '⚠️ Moderate match. Adding missing keywords will significantly boost your callback rate.' :
           '🚨 Low ATS match. Use our One-Click AI Optimizer below to tailor your resume instantly.'}
        </p>
      </div>

      {/* Sub-Score Breakdown Bars */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '2rem' }}>
        {[
          { label: 'Keyword Match (30%)', score: analysis.keyword_match_score },
          { label: 'Skills Match (25%)', score: analysis.skills_match_score },
          { label: 'Job Title Alignment (10%)', score: analysis.job_title_match_score },
          { label: 'Experience Relevance (15%)', score: analysis.experience_relevance_score },
          { label: 'Section Structure (10%)', score: analysis.structure_score },
          { label: 'Formatting Integrity (5%)', score: analysis.formatting_score },
        ].map((item, idx) => (
          <div key={idx} style={{ background: 'var(--bg-card)', padding: '0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
              <span>{item.label}</span>
              <strong style={{ color: getScoreColor(item.score) }}>{Math.round(item.score)}%</strong>
            </div>
            <div style={{ width: '100%', height: '6px', background: 'rgba(0,0,0,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: `${item.score}%`, height: '100%', background: getScoreColor(item.score), transition: 'width 0.5s ease' }} />
            </div>
          </div>
        ))}
      </div>

      {/* Matched vs Missing Keywords */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
        <div>
          <h4 style={{ fontSize: '0.95rem', color: 'var(--accent-emerald)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <CheckCircle2 size={16} /> Matched Keywords ({analysis.matched_keywords?.length || 0})
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {analysis.matched_keywords?.map((kw, i) => (
              <span key={i} className="pill pill-match">{kw}</span>
            ))}
          </div>
        </div>

        <div>
          <h4 style={{ fontSize: '0.95rem', color: 'var(--accent-rose)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <AlertTriangle size={16} /> Missing Keywords ({analysis.missing_keywords?.length || 0})
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {analysis.missing_keywords?.map((kw, i) => (
              <span key={i} className="pill pill-missing">{kw}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Suggestions */}
      {analysis.suggestions?.length > 0 && (
        <div style={{ marginBottom: '2rem', background: 'rgba(99,102,241,0.05)', border: '1px solid rgba(99,102,241,0.2)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
          <h4 style={{ fontSize: '1rem', color: 'var(--primary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ShieldCheck size={18} /> Actionable Improvement Recommendations
          </h4>
          <ul style={{ paddingLeft: '1.25rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            {analysis.suggestions.map((s, i) => (
              <li key={i} style={{ marginBottom: '0.4rem' }}>{s}</li>
            ))}
          </ul>
        </div>
      )}

      {/* One-Click Optimize Button */}
      <div style={{ textAlign: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
        <button onClick={onOptimize} className="btn btn-primary" style={{ padding: '0.9rem 2rem', fontSize: '1rem' }} disabled={optimizing}>
          {optimizing ? 'Creating Tailored Resume...' : <><Sparkles size={20} /> Optimize My Resume for this Job Description <ArrowRight size={18} /></>}
        </button>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '0.6rem' }}>
          * Creates a NEW tailored child resume without overwriting your master resume.
        </p>
      </div>
    </div>
  );
};
