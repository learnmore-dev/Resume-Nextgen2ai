import React from 'react';
import './Axis.css';

export const Axis = ({ resume }) => {
  const pInfo = resume?.personal_info || {};
  const skills = resume?.skills || [];
  const exp = resume?.experience || [];
  const edu = resume?.education || [];

  return (
    <div className="axis-template">
      {/* Main Content Left */}
      <div className="axis-main-column">
        <h1 className="axis-name">{pInfo.full_name || resume?.title || 'GREGORY WALLS'}</h1>
        <div className="axis-title">{resume?.target_job_title || 'Carpenter & Builder'}</div>

        {pInfo.summary && (
          <div style={{ marginBottom: '20px' }}>
            <h3 className="axis-section-heading">Profile</h3>
            <p style={{ fontSize: '11px', color: '#334155', lineHeight: '1.6' }}>{pInfo.summary}</p>
          </div>
        )}

        {exp.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <h3 className="axis-section-heading">Employment History</h3>
            {exp.map(item => (
              <div key={item.id} style={{ marginBottom: '14px' }}>
                <div style={{ fontSize: '12px', fontWeight: '700', color: '#0F172A' }}>{item.role}, {item.company}</div>
                <div style={{ fontSize: '10px', color: '#64748B', fontStyle: 'italic', marginBottom: '4px' }}>
                  {item.start_date} — {item.is_current ? 'Present' : item.end_date}
                </div>
                {item.bullets && item.bullets.length > 0 ? (
                  <ul style={{ paddingLeft: '16px', margin: 0, fontSize: '11px', color: '#334155' }}>
                    {item.bullets.map((b, i) => <li key={i} style={{ marginBottom: '2px' }}>{b}</li>)}
                  </ul>
                ) : (
                  <p style={{ fontSize: '11px', color: '#334155', margin: 0 }}>{item.raw_description}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {edu.length > 0 && (
          <div>
            <h3 className="axis-section-heading">Education</h3>
            {edu.map(e => (
              <div key={e.id} style={{ marginBottom: '8px' }}>
                <div style={{ fontSize: '12px', fontWeight: '700', color: '#0F172A' }}>{e.institution}</div>
                <div style={{ fontSize: '11px', color: '#475569' }}>{e.degree} {e.field_of_study && `in ${e.field_of_study}`}</div>
                <div style={{ fontSize: '10px', color: '#64748B' }}>{e.end_date}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Dark Sidebar Right */}
      <div className="axis-sidebar">
        <div style={{ marginBottom: '28px' }}>
          <h4 className="axis-sidebar-title">Details</h4>
          <div style={{ fontSize: '10.5px', color: '#E2E8F0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {pInfo.email && <div style={{ wordBreak: 'break-all' }}>✉️ {pInfo.email}</div>}
            {pInfo.phone && <div>📞 {pInfo.phone}</div>}
            {pInfo.location && <div>📍 {pInfo.location}</div>}
            {pInfo.linkedin_url && <div style={{ wordBreak: 'break-all' }}>🔗 {pInfo.linkedin_url}</div>}
            {pInfo.github_url && <div style={{ wordBreak: 'break-all' }}>💻 {pInfo.github_url}</div>}
            {pInfo.portfolio_url && <div style={{ wordBreak: 'break-all' }}>🌐 {pInfo.portfolio_url}</div>}
          </div>
        </div>

        {skills.length > 0 && (
          <div>
            <h4 className="axis-sidebar-title">Skills</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {skills.map((s, i) => (
                <div key={i} style={{ fontSize: '10px', color: '#E2E8F0', lineHeight: '1.4' }}>
                  {s.category ? <strong style={{ color: '#F8FAFC' }}>{s.category}: </strong> : null}
                  <span>{s.skill_name || s.name || s}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Axis;
