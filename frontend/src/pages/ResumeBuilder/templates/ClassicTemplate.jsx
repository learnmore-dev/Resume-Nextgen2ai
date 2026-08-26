import React from 'react';

export const ClassicTemplate = ({ resume }) => {
  const pInfo = resume.personal_info || {};
  const skills = resume.skills || [];
  const exp = resume.experience || [];
  const edu = resume.education || [];

  return (
    <div className="tpl-classic" style={{
      display: 'flex',
      minHeight: '800px',
      fontFamily: "'Inter', sans-serif",
      backgroundColor: '#FFFFFF',
      color: '#1E293B'
    }}>
      {/* Left Sidebar (30%) */}
      <div style={{ width: '220px', padding: '36px 20px', borderRight: '1px solid #E2E8F0', backgroundColor: '#FAFAFA' }}>
        {/* Contact Info */}
        <div style={{ marginBottom: '28px' }}>
          <h4 style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', color: '#475569', marginBottom: '10px' }}>
            Details
          </h4>
          <div style={{ fontSize: '10.5px', color: '#64748B', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {pInfo.location && <div>{pInfo.location}</div>}
            {pInfo.phone && <div>{pInfo.phone}</div>}
            {pInfo.email && <div style={{ wordBreak: 'break-all' }}>{pInfo.email}</div>}
            {pInfo.linkedin_url && <div style={{ wordBreak: 'break-all' }}>{pInfo.linkedin_url}</div>}
          </div>
        </div>

        {/* Skills with Rating Dots */}
        {skills.length > 0 && (
          <div>
            <h4 style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', color: '#475569', marginBottom: '12px' }}>
              Skills
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {skills.map((s, i) => (
                <div key={i}>
                  <div style={{ fontSize: '10.5px', fontWeight: '600', color: '#1E293B', marginBottom: '3px' }}>{s.skill_name}</div>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {[1, 2, 3, 4, 5].map(dot => (
                      <span key={dot} style={{
                        width: '7px',
                        height: '7px',
                        borderRadius: '50%',
                        backgroundColor: dot <= 4 ? '#0F172A' : '#CBD5E1'
                      }} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Main Column (70%) */}
      <div style={{ flex: 1, padding: '36px 32px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#0F172A', marginBottom: '2px' }}>
          {pInfo.full_name || resume.title || 'ELSA WILLIAMS'}
        </h1>
        <div style={{ fontSize: '12px', fontWeight: '600', color: '#64748B', marginBottom: '20px', textTransform: 'uppercase' }}>
          {resume.target_job_title || 'Physical Therapist'}
        </div>

        {/* Profile */}
        {pInfo.summary && (
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '12px', fontWeight: '800', color: '#0F172A', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid #CBD5E1', paddingBottom: '4px', marginBottom: '8px' }}>
              Profile
            </h3>
            <p style={{ fontSize: '11px', color: '#334155', lineHeight: '1.6' }}>{pInfo.summary}</p>
          </div>
        )}

        {/* Employment History */}
        {exp.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '12px', fontWeight: '800', color: '#0F172A', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid #CBD5E1', paddingBottom: '4px', marginBottom: '12px' }}>
              Employment History
            </h3>
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

        {/* Education */}
        {edu.length > 0 && (
          <div>
            <h3 style={{ fontSize: '12px', fontWeight: '800', color: '#0F172A', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid #CBD5E1', paddingBottom: '4px', marginBottom: '10px' }}>
              Education
            </h3>
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
    </div>
  );
};
