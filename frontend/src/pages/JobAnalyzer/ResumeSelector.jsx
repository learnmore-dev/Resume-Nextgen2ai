import React from 'react';
import { FileText, Check } from 'lucide-react';

export const ResumeSelector = ({ resumes, selectedId, onSelect }) => {
  return (
    <div>
      <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '800', color: '#0F172A', marginBottom: '0.5rem' }}>
        Select Built Resume to Analyze:
      </label>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: '0.75rem' }}>
        {resumes.map((r) => {
          const isSelected = selectedId === r.id;
          return (
            <div
              key={r.id}
              onClick={() => onSelect(r.id)}
              style={{
                border: isSelected ? '2px solid #2563EB' : '1px solid #E2E8F0',
                background: isSelected ? '#EFF6FF' : '#FFFFFF',
                borderRadius: '10px',
                padding: '0.85rem 1rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: isSelected ? '0 4px 12px rgba(37,99,235,0.12)' : 'none'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileText size={18} color={isSelected ? '#2563EB' : '#64748B'} />
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#0F172A' }}>{r.title}</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748B' }}>
                    {r.is_master ? '⭐ Master Resume' : 'Targeted Version'}
                  </div>
                </div>
              </div>
              {isSelected && <Check size={16} color="#2563EB" style={{ strokeWidth: 3 }} />}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ResumeSelector;
