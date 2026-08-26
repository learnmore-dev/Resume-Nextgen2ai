import React from 'react';
import './Driven.css';

export const Driven = ({ resume }) => {
  const pInfo = resume?.personal_info || {};
  const skills = resume?.skills || [];
  const exp = resume?.experience || [];
  const edu = resume?.education || [];

  return (
    <div className="driven-template">
      <div className="driven-header">
        <h1 className="driven-name">{pInfo.full_name || resume?.title || 'SEBASTIAN WILDER'}</h1>
        <div style={{ fontSize: '13px', fontWeight: '700', color: '#334155', textTransform: 'uppercase', marginTop: '4px' }}>
          {resume?.target_job_title || 'Student / Professional'}
        </div>
      </div>

      <div style={{ padding: '32px 36px', display: 'flex', gap: '32px' }}>
        <div style={{ width: '35%' }}>
          <div style={{ marginBottom: '24px' }}>
            <h4 className="driven-section-title">Details</h4>
            <div style={{ fontSize: '11px', color: '#475569', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {pInfo.location && <div>{pInfo.location}</div>}
              {pInfo.phone && <div>{pInfo.phone}</div>}
              {pInfo.email && <div style={{ wordBreak: 'break-all' }}>{pInfo.email}</div>}
            </div>
          </div>

          {pInfo.summary && (
            <div style={{ marginBottom: '24px' }}>
              <h4 className="driven-section-title">Profile</h4>
              <p style={{ fontSize: '11px', color: '#334155', lineHeight: '1.5' }}>{pInfo.summary}</p>
            </div>
          )}

          {skills.length > 0 && (
            <div>
              <h4 className="driven-section-title">Skills</h4>
              <div style={{ fontSize: '11px', color: '#334155', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {skills.map((s, i) => (
                  <div key={i} style={{ borderBottom: '1px solid #E2E8F0', paddingBottom: '2px' }}>{s.skill_name}</div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{ flex: 1 }}>
          {exp.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <h4 className="driven-section-title">Employment History</h4>
              {exp.map(item => (
                <div key={item.id} style={{ marginBottom: '14px' }}>
                  <div style={{ fontSize: '12px', fontWeight: '800', color: '#0F172A' }}>{item.role}, {item.company}</div>
                  <div style={{ fontSize: '10px', color: '#64748B', fontWeight: '600', marginBottom: '4px' }}>
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
              <h4 className="driven-section-title">Education</h4>
              {edu.map(e => (
                <div key={e.id} style={{ marginBottom: '8px' }}>
                  <div style={{ fontSize: '12px', fontWeight: '700', color: '#0F172A' }}>{e.degree} {e.field_of_study && `in ${e.field_of_study}`}</div>
                  <div style={{ fontSize: '11px', color: '#475569' }}>{e.institution} ({e.end_date})</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Driven;
