import React from 'react';

export const AchieverTemplate = ({ resume }) => {
  const pInfo = resume.personal_info || {};
  const skills = resume.skills || [];
  const exp = resume.experience || [];
  const edu = resume.education || [];

  return (
    <div className="tpl-achiever" style={{
      fontFamily: "'Georgia', 'Times New Roman', serif",
      color: '#1A1A1A',
      backgroundColor: '#FFFFFF',
      padding: '40px 48px',
      minHeight: '800px',
      lineHeight: '1.5'
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h1 style={{
          fontSize: '28px',
          fontWeight: '700',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          marginBottom: '4px',
          color: '#111827'
        }}>
          {pInfo.full_name || resume.title || 'HOWARD JONES'}
        </h1>
        <div style={{ fontSize: '13px', fontStyle: 'italic', color: '#4B5563', marginBottom: '8px' }}>
          {resume.target_job_title || 'Professional'}
        </div>
        <div style={{ fontSize: '11px', color: '#6B7280', display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          {pInfo.location && <span>{pInfo.location}</span>}
          {pInfo.phone && <span>{pInfo.phone}</span>}
          {pInfo.email && <span>{pInfo.email}</span>}
          {pInfo.linkedin_url && <span>{pInfo.linkedin_url}</span>}
        </div>
      </div>

      {/* Section Helper */}
      const SectionHeader = ({ title }) => (
        <div style={{
          textAlign: 'center',
          borderTop: '1px solid #1A1A1A',
          borderBottom: '1px solid #1A1A1A',
          padding: '3px 0',
          margin: '18px 0 12px',
          fontSize: '12px',
          fontWeight: '700',
          letterSpacing: '2px',
          textTransform: 'uppercase'
        }}>
          {title}
        </div>
      );

      {/* Profile */}
      {pInfo.summary && (
        <>
          <div style={{
            textAlign: 'center',
            borderTop: '1px solid #1A1A1A',
            borderBottom: '1px solid #1A1A1A',
            padding: '3px 0',
            margin: '18px 0 12px',
            fontSize: '12px',
            fontWeight: '700',
            letterSpacing: '2px',
            textTransform: 'uppercase'
          }}>
            PROFILE
          </div>
          <p style={{ fontSize: '11.5px', textAlign: 'justify', color: '#374151', margin: '0 8px' }}>
            {pInfo.summary}
          </p>
        </>
      )}

      {/* Employment History */}
      {exp.length > 0 && (
        <>
          <div style={{
            textAlign: 'center',
            borderTop: '1px solid #1A1A1A',
            borderBottom: '1px solid #1A1A1A',
            padding: '3px 0',
            margin: '18px 0 12px',
            fontSize: '12px',
            fontWeight: '700',
            letterSpacing: '2px',
            textTransform: 'uppercase'
          }}>
            EMPLOYMENT HISTORY
          </div>
          {exp.map(item => (
            <div key={item.id} style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '700' }}>
                <span>❖ {item.role}, {item.company}</span>
                <span style={{ fontStyle: 'italic', fontWeight: 'normal', fontSize: '11px', color: '#4B5563' }}>
                  {item.start_date} — {item.is_current ? 'Present' : item.end_date}
                </span>
              </div>
              {item.bullets && item.bullets.length > 0 ? (
                <ul style={{ paddingLeft: '24px', margin: '4px 0 0', fontSize: '11px', color: '#374151' }}>
                  {item.bullets.map((b, i) => (
                    <li key={i} style={{ marginBottom: '2px' }}>{b}</li>
                  ))}
                </ul>
              ) : (
                <p style={{ fontSize: '11px', color: '#374151', margin: '4px 0 0 16px' }}>{item.raw_description}</p>
              )}
            </div>
          ))}
        </>
      )}

      {/* Education */}
      {edu.length > 0 && (
        <>
          <div style={{
            textAlign: 'center',
            borderTop: '1px solid #1A1A1A',
            borderBottom: '1px solid #1A1A1A',
            padding: '3px 0',
            margin: '18px 0 12px',
            fontSize: '12px',
            fontWeight: '700',
            letterSpacing: '2px',
            textTransform: 'uppercase'
          }}>
            EDUCATION
          </div>
          {edu.map(e => (
            <div key={e.id} style={{ marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '700' }}>
                <span>❖ {e.institution}</span>
                <span style={{ fontStyle: 'italic', fontWeight: 'normal', fontSize: '11px', color: '#4B5563' }}>{e.end_date}</span>
              </div>
              <div style={{ fontSize: '11px', fontStyle: 'italic', color: '#4B5563', paddingLeft: '16px' }}>
                {e.degree} {e.field_of_study && `in ${e.field_of_study}`}
              </div>
            </div>
          ))}
        </>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <>
          <div style={{
            textAlign: 'center',
            borderTop: '1px solid #1A1A1A',
            borderBottom: '1px solid #1A1A1A',
            padding: '3px 0',
            margin: '18px 0 12px',
            fontSize: '12px',
            fontWeight: '700',
            letterSpacing: '2px',
            textTransform: 'uppercase'
          }}>
            SKILLS
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 24px', fontSize: '11px', paddingLeft: '8px' }}>
            {skills.map((s, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dotted #E5E7EB', paddingBottom: '2px' }}>
                <span>{s.skill_name}</span>
                <span style={{ fontStyle: 'italic', color: '#6B7280' }}>Expert</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
