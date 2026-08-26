import React from 'react';
import './Clear.css';

export const Clear = ({ resume }) => {
  const pInfo = resume?.personal_info || {};
  const skills = resume?.skills || [];
  const exp = resume?.experience || [];
  const edu = resume?.education || [];

  return (
    <div className="clear-template">
      <div className="clear-header">
        <h1 className="clear-name">{pInfo.full_name || resume?.title || 'JOHN DOE'}</h1>
        <div style={{ fontSize: '13px', color: '#475569', fontWeight: '600', marginBottom: '8px' }}>
          {resume?.target_job_title || 'Software Engineer'}
        </div>
        <div style={{ fontSize: '11px', color: '#64748B', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          {pInfo.email && <span>📧 {pInfo.email}</span>}
          {pInfo.phone && <span>📞 {pInfo.phone}</span>}
          {pInfo.location && <span>📍 {pInfo.location}</span>}
          {pInfo.linkedin_url && <span>🔗 {pInfo.linkedin_url}</span>}
          {pInfo.github_url && <span>💻 {pInfo.github_url}</span>}
          {pInfo.portfolio_url && <span>🌐 {pInfo.portfolio_url}</span>}
        </div>
      </div>

      {pInfo.summary && (
        <div style={{ marginBottom: '20px' }}>
          <h3 className="clear-section-title">Summary</h3>
          <p style={{ fontSize: '11.5px', lineHeight: '1.6', color: '#334155' }}>{pInfo.summary}</p>
        </div>
      )}

      {exp.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h3 className="clear-section-title">Experience</h3>
          {exp.map(item => (
            <div key={item.id} style={{ marginBottom: '14px' }}>
              <div style={{ fontSize: '12.5px', fontWeight: '700', color: '#0F172A' }}>{item.role} — {item.company}</div>
              <div style={{ fontSize: '10.5px', color: '#64748B', marginBottom: '4px' }}>
                {item.start_date} – {item.is_current ? 'Present' : item.end_date}
              </div>
              {item.bullets && item.bullets.length > 0 ? (
                <ul style={{ paddingLeft: '18px', margin: 0, fontSize: '11px', color: '#334155' }}>
                  {item.bullets.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              ) : (
                <p style={{ fontSize: '11px', color: '#334155' }}>{item.raw_description}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {skills.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h3 className="clear-section-title">Skills</h3>
          <div style={{ fontSize: '11px', color: '#334155' }}>
            {skills.map(s => s.skill_name).join(' • ')}
          </div>
        </div>
      )}

      {edu.length > 0 && (
        <div>
          <h3 className="clear-section-title">Education</h3>
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

export default Clear;
