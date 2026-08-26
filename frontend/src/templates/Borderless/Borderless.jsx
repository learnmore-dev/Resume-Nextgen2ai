import React from 'react';
import './Borderless.css';

export const Borderless = ({ resume }) => {
  const pInfo = resume?.personal_info || {};
  const skills = resume?.skills || [];
  const exp = resume?.experience || [];
  const edu = resume?.education || [];

  return (
    <div className="borderless-template">
      {/* Cream Header */}
      <div className="borderless-header">
        <div>
          <h1 className="borderless-name">{pInfo.full_name || resume?.title || 'MONICA HELMSLEY'}</h1>
          <div className="borderless-sub">{resume?.target_job_title || 'Marketing Manager'}</div>
        </div>

        <div style={{ textAlign: 'right', fontSize: '11px', color: '#475569', display: 'flex', flexDirection: 'column', gap: '3px' }}>
          {pInfo.email && <div>✉️ {pInfo.email}</div>}
          {pInfo.phone && <div>📞 {pInfo.phone}</div>}
          {pInfo.location && <div>📍 {pInfo.location}</div>}
          {pInfo.linkedin_url && <div>🔗 {pInfo.linkedin_url}</div>}
          {pInfo.github_url && <div>💻 {pInfo.github_url}</div>}
          {pInfo.portfolio_url && <div>🌐 {pInfo.portfolio_url}</div>}
        </div>
      </div>

      {/* Main Body */}
      <div className="borderless-body">
        {pInfo.summary && (
          <div style={{ marginBottom: '24px' }}>
            <p style={{ fontSize: '13px', lineHeight: '1.6', color: '#334155', fontWeight: '500' }}>{pInfo.summary}</p>
          </div>
        )}

        {skills.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <div style={{ fontSize: '11px', fontWeight: '700', color: '#64748B', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
              Skills
            </div>
            <ul style={{ paddingLeft: '18px', margin: 0, fontSize: '11px', color: '#334155', lineHeight: '1.6' }}>
              {skills.map((s, i) => (
                <li key={i} style={{ marginBottom: '4px' }}>
                  {s.category ? <strong>{s.category}: </strong> : null}
                  <span>{s.skill_name || s.name || s}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {exp.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '12px', fontWeight: '800', color: '#1E293B', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '14px' }}>
              Employment History
            </h3>
            {exp.map(item => (
              <div key={item.id} style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '13px', fontWeight: '700', color: '#0F172A' }}>{item.role} at {item.company}</div>
                <div style={{ fontSize: '10.5px', color: '#64748B', marginBottom: '6px' }}>
                  {item.start_date} — {item.is_current ? 'Present' : item.end_date}
                </div>
                {item.bullets && item.bullets.length > 0 ? (
                  <ul style={{ paddingLeft: '18px', margin: 0, fontSize: '11.5px', color: '#334155' }}>
                    {item.bullets.map((b, i) => <li key={i} style={{ marginBottom: '3px' }}>{b}</li>)}
                  </ul>
                ) : (
                  <p style={{ fontSize: '11.5px', color: '#334155', margin: 0 }}>{item.raw_description}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {edu.length > 0 && (
          <div>
            <h3 style={{ fontSize: '12px', fontWeight: '800', color: '#1E293B', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>
              Education
            </h3>
            {edu.map(e => (
              <div key={e.id} style={{ marginBottom: '8px' }}>
                <div style={{ fontSize: '12.5px', fontWeight: '700', color: '#0F172A' }}>{e.degree} {e.field_of_study && `in ${e.field_of_study}`}</div>
                <div style={{ fontSize: '11px', color: '#475569' }}>{e.institution} ({e.end_date})</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Borderless;
