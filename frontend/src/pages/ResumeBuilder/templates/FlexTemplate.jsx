import React from 'react';

export const FlexTemplate = ({ resume }) => {
  const pInfo = resume.personal_info || {};
  const skills = resume.skills || [];
  const exp = resume.experience || [];

  return (
    <div className="tpl-flex" style={{
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      backgroundColor: '#FFFFFF',
      color: '#1E293B',
      minHeight: '800px',
      position: 'relative',
      overflow: 'hidden',
      padding: '40px 44px'
    }}>
      {/* Background Graphic Blobs */}
      <div style={{
        position: 'absolute',
        top: '-40px',
        right: '40px',
        width: '240px',
        height: '240px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #EC4899 0%, #F43F5E 100%)',
        opacity: 0.35,
        filter: 'blur(30px)',
        zIndex: 0
      }} />

      <div style={{
        position: 'absolute',
        bottom: '20px',
        right: '-20px',
        width: '260px',
        height: '260px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #10B981 0%, #06B6D4 100%)',
        opacity: 0.3,
        filter: 'blur(40px)',
        zIndex: 0
      }} />

      {/* Main Content Above Graphic Layer */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Giant Title */}
        <h1 style={{ fontSize: '32px', fontWeight: '900', color: '#0F172A', letterSpacing: '-0.02em', marginBottom: '2px', textTransform: 'uppercase' }}>
          {pInfo.full_name || resume.title || 'GERRI SMITH'}
        </h1>
        <div style={{ fontSize: '13px', fontWeight: '800', color: '#EC4899', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '24px' }}>
          {resume.target_job_title || 'Restaurant Manager'}
        </div>

        {/* Profile */}
        {pInfo.summary && (
          <div style={{ marginBottom: '24px', maxWidth: '85%' }}>
            <p style={{ fontSize: '12px', lineHeight: '1.6', color: '#334155', fontWeight: '500' }}>
              {pInfo.summary}
            </p>
          </div>
        )}

        <div style={{ display: 'flex', gap: '36px' }}>
          {/* Employment History Left Column */}
          <div style={{ flex: 1 }}>
            {exp.length > 0 && (
              <div>
                <h3 style={{ fontSize: '12px', fontWeight: '800', color: '#0F172A', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '14px' }}>
                  Employment History
                </h3>
                {exp.map(item => (
                  <div key={item.id} style={{ marginBottom: '16px' }}>
                    <div style={{ fontSize: '12.5px', fontWeight: '800', color: '#0F172A' }}>
                      {item.role} at {item.company}
                    </div>
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
          </div>

          {/* Skills Right Column */}
          {skills.length > 0 && (
            <div style={{ width: '200px' }}>
              <h3 style={{ fontSize: '12px', fontWeight: '800', color: '#0F172A', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '14px' }}>
                Skills
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {skills.map((s, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: '600', color: '#1E293B', background: 'rgba(255,255,255,0.7)', padding: '4px 8px', borderRadius: '4px', border: '1px solid #E2E8F0' }}>
                    <span>{s.skill_name}</span>
                    <span style={{ color: '#10B981', fontWeight: '700' }}>Expert</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
