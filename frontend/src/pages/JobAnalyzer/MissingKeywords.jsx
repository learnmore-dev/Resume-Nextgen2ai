import React from 'react';
import { CheckCircle2, AlertTriangle, ShieldAlert, Wrench, Users } from 'lucide-react';

export const MissingKeywords = ({ matchedKeywords = [], missingKeywords = {} }) => {
  const critical = missingKeywords.critical_hard_skills || [];
  const tools = missingKeywords.tools_methodologies || [];
  const soft = missingKeywords.soft_skills || [];

  return (
    <div style={{ marginBottom: '2rem' }}>
      {/* 🟢 Matched Keywords */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h4 style={{ fontSize: '0.92rem', fontWeight: '800', color: '#15803D', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '0.75rem' }}>
          <CheckCircle2 size={18} color="#16A34A" /> Matched Keywords & Technologies ({matchedKeywords.length})
        </h4>
        {matchedKeywords.length > 0 ? (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {matchedKeywords.map((kw, i) => (
              <span
                key={i}
                style={{
                  background: '#DCFCE7',
                  color: '#15803D',
                  border: '1px solid #86EFAC',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontSize: '0.8rem',
                  fontWeight: '700'
                }}
              >
                ✓ {kw}
              </span>
            ))}
          </div>
        ) : (
          <p style={{ fontSize: '0.82rem', color: '#64748B' }}>No direct keyword matches found yet.</p>
        )}
      </div>

      {/* 🔴 Critical Hard Skills Missing */}
      {critical.length > 0 && (
        <div style={{ marginBottom: '1.25rem', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '8px', padding: '1rem' }}>
          <h4 style={{ fontSize: '0.88rem', fontWeight: '800', color: '#991B1B', display: 'flex', alignItems: 'center', gap: '6px', margin: '0 0 0.5rem' }}>
            <ShieldAlert size={16} color="#DC2626" /> Missing Critical Hard Skills ({critical.length})
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {critical.map((kw, i) => (
              <span
                key={i}
                style={{
                  background: '#FEE2E2',
                  color: '#991B1B',
                  border: '1px solid #FCA5A5',
                  padding: '3px 9px',
                  borderRadius: '5px',
                  fontSize: '0.78rem',
                  fontWeight: '700'
                }}
              >
                ✗ {kw}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 🟡 Tools & Methodologies Missing */}
      {tools.length > 0 && (
        <div style={{ marginBottom: '1.25rem', background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: '8px', padding: '1rem' }}>
          <h4 style={{ fontSize: '0.88rem', fontWeight: '800', color: '#92400E', display: 'flex', alignItems: 'center', gap: '6px', margin: '0 0 0.5rem' }}>
            <Wrench size={16} color="#D97706" /> Secondary Tools & DevOps Missing ({tools.length})
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {tools.map((kw, i) => (
              <span
                key={i}
                style={{
                  background: '#FEF3C7',
                  color: '#92400E',
                  border: '1px solid #FDE68A',
                  padding: '3px 9px',
                  borderRadius: '5px',
                  fontSize: '0.78rem',
                  fontWeight: '600'
                }}
              >
                • {kw}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 🔵 Soft Skills Missing */}
      {soft.length > 0 && (
        <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '8px', padding: '1rem' }}>
          <h4 style={{ fontSize: '0.88rem', fontWeight: '800', color: '#1E40AF', display: 'flex', alignItems: 'center', gap: '6px', margin: '0 0 0.5rem' }}>
            <Users size={16} color="#2563EB" /> Soft Skills / Methodologies ({soft.length})
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {soft.map((kw, i) => (
              <span
                key={i}
                style={{
                  background: '#DBEAFE',
                  color: '#1E40AF',
                  border: '1px solid #BFDBFE',
                  padding: '3px 9px',
                  borderRadius: '5px',
                  fontSize: '0.78rem',
                  fontWeight: '600'
                }}
              >
                • {kw}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MissingKeywords;
