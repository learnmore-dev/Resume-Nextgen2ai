import React from 'react';

export const CreatorTemplate = ({ resume }) => {
  const pInfo = resume.personal_info || {};
  const skills = resume.skills || [];
  const exp = resume.experience || [];
  const edu = resume.education || [];

  return (
    <div className="tpl-creator" style={{
      fontFamily: "'Playfair Display', 'Georgia', serif",
      backgroundColor: '#FFFFFF',
      color: '#1A1A1A',
      padding: '40px 48px',
      minHeight: '800px'
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid #1A1A1A', paddingBottom: '20px', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', margin: 0, lineHeight: 1.1 }}>
            {(pInfo.full_name || resume.title || 'JACK FARRELL').split(' ').map((n, i) => <div key={i}>{n}</div>)}
          </h1>
          <div style={{ fontSize: '11px', fontFamily: 'sans-serif', color: '#666', marginTop: '12px' }}>
            {pInfo.location && <div>{pInfo.location}</div>}
            {pInfo.phone && <div>{pInfo.phone}</div>}
            {pInfo.email && <div>{pInfo.email}</div>}
          </div>
        </div>

        {/* Large Portrait Box */}
        <div style={{ width: '120px', height: '140px', backgroundColor: '#E2E8F0', borderRadius: '4px', border: '1px solid #CBD5E1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B', fontSize: '10px' }}>
          PHOTO
        </div>
      </div>

      {/* Numbered Sections */}
      {/* ① PROFILE */}
      {pInfo.summary && (
        <div style={{ marginBottom: '24px' }}>
          <div style={{ fontSize: '13px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>
            ① PROFILE
          </div>
          <p style={{ fontSize: '11.5px', fontFamily: 'sans-serif', color: '#333', lineHeight: '1.6' }}>{pInfo.summary}</p>
        </div>
      )}

      {/* ② SKILLS */}
      {skills.length > 0 && (
        <div style={{ marginBottom: '24px' }}>
          <div style={{ fontSize: '13px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>
            ② SKILLS
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', fontSize: '11px', fontFamily: 'sans-serif' }}>
            {skills.map((s, i) => (
              <span key={i} style={{ borderBottom: '1px solid #999', paddingBottom: '2px' }}>
                {s.skill_name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ③ EMPLOYMENT HISTORY */}
      {exp.length > 0 && (
        <div style={{ marginBottom: '24px' }}>
          <div style={{ fontSize: '13px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px' }}>
            ③ EMPLOYMENT HISTORY
          </div>
          {exp.map(item => (
            <div key={item.id} style={{ marginBottom: '14px' }}>
              <div style={{ fontSize: '12px', fontWeight: '700' }}>{item.role}, {item.company}</div>
              <div style={{ fontSize: '10px', fontFamily: 'sans-serif', color: '#666', fontStyle: 'italic', marginBottom: '4px' }}>
                {item.start_date} — {item.is_current ? 'Present' : item.end_date}
              </div>
              {item.bullets && item.bullets.length > 0 ? (
                <ul style={{ paddingLeft: '18px', margin: 0, fontSize: '11px', fontFamily: 'sans-serif', color: '#333' }}>
                  {item.bullets.map((b, i) => <li key={i} style={{ marginBottom: '2px' }}>{b}</li>)}
                </ul>
              ) : (
                <p style={{ fontSize: '11px', fontFamily: 'sans-serif', color: '#333', margin: 0 }}>{item.raw_description}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ④ EDUCATION */}
      {edu.length > 0 && (
        <div>
          <div style={{ fontSize: '13px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>
            ④ EDUCATION
          </div>
          {edu.map(e => (
            <div key={e.id} style={{ marginBottom: '8px', fontSize: '11.5px', fontFamily: 'sans-serif' }}>
              <strong>{e.degree} {e.field_of_study && `in ${e.field_of_study}`}</strong>, {e.institution} ({e.end_date})
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
