import React from 'react';

export const AxisTemplate = ({ resume }) => {
  const pInfo = resume.personal_info || {};
  const skills = resume.skills || [];
  const exp = resume.experience || [];
  const edu = resume.education || [];

  return (
    <div className="tpl-axis" style={{
      display: 'flex',
      minHeight: '800px',
      fontFamily: "'Inter', sans-serif",
      backgroundColor: '#FFFFFF',
      color: '#1E293B'
    }}>
      {/* Main Content Left Column (68%) */}
      <div style={{ flex: '1', padding: '36px 32px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#0F172A', marginBottom: '2px' }}>
          {pInfo.full_name || resume.title || 'GREGORY WALLS'}
        </h1>
        <div style={{ fontSize: '13px', color: '#64748B', fontWeight: '600', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '1px' }}>
          {resume.target_job_title || 'Software Specialist'}
        </div>

        {/* Profile */}
        {pInfo.summary && (
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '12px', fontWeight: '800', color: '#0F4652', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '2px solid #0F4652', paddingBottom: '4px', marginBottom: '8px' }}>
              Profile
            </h3>
            <p style={{ fontSize: '11px', color: '#334155', lineHeight: '1.6' }}>{pInfo.summary}</p>
          </div>
        )}

        {/* Employment History */}
        {exp.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '12px', fontWeight: '800', color: '#0F4652', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '2px solid #0F4652', paddingBottom: '4px', marginBottom: '12px' }}>
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
            <h3 style={{ fontSize: '12px', fontWeight: '800', color: '#0F4652', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '2px solid #0F4652', paddingBottom: '4px', marginBottom: '10px' }}>
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

      {/* Dark Blue Sidebar Right Column (32%) */}
      <div style={{ width: '220px', backgroundColor: '#0F4652', color: '#FFFFFF', padding: '36px 20px' }}>
        {/* Contact Details */}
        <div style={{ marginBottom: '28px' }}>
          <h4 style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', color: '#93C5FD', marginBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '4px' }}>
            Details
          </h4>
          <div style={{ fontSize: '10.5px', color: '#E2E8F0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {pInfo.location && <div>📍 {pInfo.location}</div>}
            {pInfo.phone && <div>📞 {pInfo.phone}</div>}
            {pInfo.email && <div style={{ wordBreak: 'break-all' }}>✉️ {pInfo.email}</div>}
            {pInfo.linkedin_url && <div style={{ wordBreak: 'break-all' }}>🔗 {pInfo.linkedin_url}</div>}
          </div>
        </div>

        {/* Skills Progress Bars */}
        {skills.length > 0 && (
          <div>
            <h4 style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', color: '#93C5FD', marginBottom: '14px', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '4px' }}>
              Skills
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {skills.map((s, i) => (
                <div key={i}>
                  <div style={{ fontSize: '10.5px', fontWeight: '600', color: '#F8FAFC', marginBottom: '3px' }}>{s.skill_name}</div>
                  <div style={{ height: '4px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${80 + (i % 3) * 10}%`, backgroundColor: '#38BDF8', borderRadius: '2px' }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
