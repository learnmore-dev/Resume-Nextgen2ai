import React from 'react';
import './Modern.css';

export const Modern = ({ resume }) => {
  const pInfo = resume?.personal_info || {};
  const skills = resume?.skills || [];
  const exp = resume?.experience || [];
  const edu = resume?.education || [];

  return (
    <div className="modern-template">
      <div className="modern-header-banner">
        <h1 className="modern-name">{pInfo.full_name || resume?.title || 'ALEX RIVERA'}</h1>
        <div style={{ fontSize: '13px', color: '#94A3B8', fontWeight: '600', marginTop: '4px' }}>
          {resume?.target_job_title || 'Lead Product Designer'}
        </div>
        <div style={{ fontSize: '11px', color: '#CBD5E1', display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '12px' }}>
          {pInfo.email && <span>✉️ {pInfo.email}</span>}
          {pInfo.phone && <span>📞 {pInfo.phone}</span>}
          {pInfo.location && <span>📍 {pInfo.location}</span>}
          {pInfo.linkedin_url && <span>🔗 {pInfo.linkedin_url}</span>}
          {pInfo.github_url && <span>💻 {pInfo.github_url}</span>}
          {pInfo.portfolio_url && <span>🌐 {pInfo.portfolio_url}</span>}
        </div>
      </div>

      {pInfo.summary && (
        <div style={{ marginBottom: '20px' }}>
          <h3 className="modern-section-title">Professional Summary</h3>
          <p style={{ fontSize: '11.5px', lineHeight: '1.6', color: '#334155' }}>{pInfo.summary}</p>
        </div>
      )}

      {exp.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h3 className="modern-section-title">Work Experience</h3>
          {exp.map(item => (
            <div key={item.id} style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '12.5px', fontWeight: '700', color: '#0F172A' }}>{item.role} — <span style={{ color: '#2563EB' }}>{item.company}</span></span>
                <span style={{ fontSize: '10.5px', color: '#64748B', fontStyle: 'italic' }}>{item.start_date} – {item.is_current ? 'Present' : item.end_date}</span>
              </div>
              {item.bullets && item.bullets.length > 0 ? (
                <ul style={{ paddingLeft: '18px', margin: '4px 0 0', fontSize: '11px', color: '#334155' }}>
                  {item.bullets.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              ) : (
                <p style={{ fontSize: '11px', color: '#334155', marginTop: '4px' }}>{item.raw_description}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {skills.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h3 className="modern-section-title">Skills & Technologies</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {skills.map((s, i) => (
              <span key={i} style={{ fontSize: '11px', backgroundColor: '#EFF6FF', color: '#1D4ED8', padding: '4px 10px', borderRadius: '4px', fontWeight: '600' }}>
                {s.skill_name}
              </span>
            ))}
          </div>
        </div>
      )}

      {edu.length > 0 && (
        <div>
          <h3 className="modern-section-title">Education</h3>
          {edu.map(e => (
            <div key={e.id} style={{ fontSize: '11.5px', color: '#0F172A', marginBottom: '6px' }}>
              <strong>{e.degree} {e.field_of_study && `in ${e.field_of_study}`}</strong>, {e.institution} ({e.end_date})
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Modern;
