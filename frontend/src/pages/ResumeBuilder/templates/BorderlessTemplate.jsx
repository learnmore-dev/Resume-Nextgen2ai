import React from 'react';

export const BorderlessTemplate = ({ resume }) => {
  const pInfo = resume.personal_info || {};
  const skills = resume.skills || [];
  const exp = resume.experience || [];
  const edu = resume.education || [];

  return (
    <div className="tpl-borderless" style={{
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      backgroundColor: '#FFFFFF',
      color: '#1E293B',
      minHeight: '800px'
    }}>
      {/* Cream Header Banner */}
      <div style={{
        backgroundColor: '#F7F2EE',
        padding: '36px 40px',
        display: 'flex',
        justify: 'space-between',
        alignItems: 'flex-start',
        borderBottom: '1px solid #E5DEDA'
      }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#1E293B', letterSpacing: '0.05em', margin: 0, textTransform: 'uppercase' }}>
            {pInfo.full_name || resume.title || 'MONICA HELMSLEY'}
          </h1>
          <div style={{ fontSize: '12px', fontWeight: '700', color: '#64748B', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '4px' }}>
            {resume.target_job_title || 'Marketing Manager'}
          </div>
        </div>

        <div style={{ textAlign: 'right', fontSize: '11px', color: '#475569', display: 'flex', flexDirection: 'column', gap: '3px' }}>
          {pInfo.email && <div>{pInfo.email}</div>}
          {pInfo.phone && <div>{pInfo.phone}</div>}
          {pInfo.location && <div>{pInfo.location}</div>}
        </div>
      </div>

      {/* Main Body */}
      <div style={{ padding: '32px 40px' }}>
        {/* Profile / Summary */}
        {pInfo.summary && (
          <div style={{ marginBottom: '24px' }}>
            <p style={{ fontSize: '13px', lineHeight: '1.6', color: '#334155', fontWeight: '500' }}>
              {pInfo.summary}
            </p>
          </div>
        )}

        {/* Skills Pills */}
        {skills.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <div style={{ fontSize: '11px', fontWeight: '700', color: '#64748B', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
              Skills
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {skills.map((s, i) => (
                <span key={i} style={{
                  fontSize: '11px',
                  backgroundColor: '#F1F5F9',
                  color: '#334155',
                  padding: '4px 12px',
                  borderRadius: '4px',
                  fontWeight: '600'
                }}>
                  {s.skill_name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Employment History */}
        {exp.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '12px', fontWeight: '800', color: '#1E293B', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '14px' }}>
              Employment History
            </h3>
            {exp.map(item => (
              <div key={item.id} style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '13px', fontWeight: '700', color: '#0F172A' }}>
                  {item.role} at {item.company}
                </div>
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

        {/* Education */}
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
