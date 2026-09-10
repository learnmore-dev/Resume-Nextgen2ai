import React from 'react';
import { Target, CheckCircle2, AlertCircle } from 'lucide-react';

export const ImpactCheck = ({ metrics }) => {
  if (!metrics) return null;

  const total = metrics.total_bullets || 0;
  const quantified = metrics.quantified_bullets || 0;
  const ratio = metrics.ratio_percent || 0;

  return (
    <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '1.25rem', marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Target size={20} color="#2563EB" />
          <span style={{ fontSize: '0.95rem', fontWeight: '800', color: '#0F172A' }}>
            Impact & Quantification Check (XYZ-Style)
          </span>
        </div>
        <div style={{ fontSize: '0.85rem', fontWeight: '800', color: ratio >= 45 ? '#15803D' : '#B45309' }}>
          {quantified} of {total} bullets have verified measurable impact ({Math.round(ratio)}%)
        </div>
      </div>

      <div style={{ width: '100%', height: '8px', background: '#E2E8F0', borderRadius: '4px', overflow: 'hidden', marginBottom: '0.75rem' }}>
        <div
          style={{
            width: `${Math.min(ratio, 100)}%`,
            height: '100%',
            background: ratio >= 45 ? '#10B981' : (ratio >= 25 ? '#F59E0B' : '#EF4444'),
            transition: 'width 0.6s ease'
          }}
        />
      </div>

      <div style={{ fontSize: '0.78rem', color: '#64748B', lineHeight: '1.4' }}>
        💡 <strong>Impact Formula:</strong> Requires measurable outcome + action verb (e.g. <em>"Optimized PostgreSQL queries reducing latency by 35%"</em> or <em>"Scaled system to 10K+ active users"</em>).
      </div>
    </div>
  );
};

export default ImpactCheck;
