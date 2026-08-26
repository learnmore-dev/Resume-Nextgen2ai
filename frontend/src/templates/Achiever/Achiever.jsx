import React from 'react';
import './Achiever.css';

export const Achiever = ({ resume }) => {
  const pInfo = resume?.personal_info || {};
  const skills = resume?.skills || [];
  const exp = resume?.experience || [];
  const edu = resume?.education || [];
  const projects = resume?.projects || [];
  const achievements = resume?.achievements || [
    { title: 'Top 15 – HackHazards Hackathon 2025 (Fluvio Track) for DevNest AI.', date: 'May 2025' },
    { title: 'Solved 500+ DSA problems on LeetCode & GeeksforGeeks using Java.', date: 'Oct 2024 – Jan 2026' }
  ];

  return (
    <div className="achiever-template" style={{ padding: '25px 35px', fontFamily: '"Times New Roman", Times, serif', color: '#1A1A1A', background: '#FFFFFF' }}>
      {/* Header Name: ~20 pt Bold */}
      <div style={{ textAlign: 'center', marginBottom: '14px' }}>
        <h1 style={{ fontSize: '20px', fontWeight: 'bold', margin: '0 0 4px 0', fontFamily: '"Times New Roman", Times, serif' }}>
          {pInfo.full_name || pInfo.name || resume?.title || 'Manisha Chauhan'}
        </h1>
        {/* Contact details: ~9.5–10 pt */}
        <div style={{ fontSize: '12px', color: '#1A1A1A', display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', fontFamily: '"Times New Roman", Times, serif' }}>
          {(pInfo.phone) && <span><strong>{pInfo.phone}</strong></span>}
          {pInfo.phone && pInfo.email && <span>|</span>}
          {pInfo.email && <span><u>{pInfo.email}</u></span>}
          {pInfo.email && (pInfo.linkedin_url || pInfo.linkedin) && <span>|</span>}
          {(pInfo.linkedin_url || pInfo.linkedin) && <span><u><a href={pInfo.linkedin_url || pInfo.linkedin} style={{ color: '#1A1A1A' }}>Linkedin</a></u></span>}
          {(pInfo.github_url || pInfo.github) && <span>|</span>}
          {(pInfo.github_url || pInfo.github) && <span><u><a href={pInfo.github_url || pInfo.github} style={{ color: '#1A1A1A' }}>Github</a></u></span>}
          {(pInfo.portfolio_url || pInfo.portfolio) && <span>|</span>}
          {(pInfo.portfolio_url || pInfo.portfolio) && <span><u><a href={pInfo.portfolio_url || pInfo.portfolio} style={{ color: '#1A1A1A' }}>Portfolio</a></u></span>}
        </div>
      </div>

      {/* Summary: Section Heading ~10 pt Bold, Body ~9 pt */}
      {pInfo.summary && (
        <div style={{ marginBottom: '14px' }}>
          <div style={{ fontSize: '13px', fontWeight: 'bold', borderBottom: '1px solid #1A1A1A', paddingBottom: '2px', marginBottom: '6px', fontFamily: '"Times New Roman", Times, serif' }}>
            Summary
          </div>
          <p style={{ fontSize: '11px', lineHeight: '1.45', margin: 0, textAlign: 'justify', fontFamily: '"Times New Roman", Times, serif' }}>
            {pInfo.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {exp.length > 0 && (
        <div style={{ marginBottom: '14px' }}>
          <div style={{ fontSize: '13px', fontWeight: 'bold', borderBottom: '1px solid #1A1A1A', paddingBottom: '2px', marginBottom: '8px', fontFamily: '"Times New Roman", Times, serif' }}>
            Experience
          </div>
          {exp.map((item, idx) => (
            <div key={idx} style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '3px' }}>
                <div>
                  <strong>{item.role || item.position}</strong> {item.company && <span>| <em>{item.company}</em></span>}
                </div>
                <div style={{ fontWeight: 'bold' }}>
                  {item.start_date ? `${item.start_date} – ${item.is_current ? 'Present' : item.end_date}` : item.duration}
                </div>
              </div>
              {item.bullets && item.bullets.length > 0 ? (
                <ul style={{ margin: '3px 0 0 16px', padding: 0, fontSize: '11px', lineHeight: '1.4' }}>
                  {item.bullets.map((b, i) => (
                    <li key={i} style={{ marginBottom: '2px' }}>{b}</li>
                  ))}
                </ul>
              ) : item.raw_description ? (
                <p style={{ fontSize: '11px', margin: '3px 0 0', lineHeight: '1.4' }}>{item.raw_description}</p>
              ) : null}
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div style={{ marginBottom: '14px' }}>
          <div style={{ fontSize: '13px', fontWeight: 'bold', borderBottom: '1px solid #1A1A1A', paddingBottom: '2px', marginBottom: '8px', fontFamily: '"Times New Roman", Times, serif' }}>
            Projects
          </div>
          {projects.map((proj, idx) => (
            <div key={idx} style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '3px' }}>
                <div>
                  <strong>{proj.name}</strong>
                  {(proj.tech_stack || proj.tech) && (
                    <span style={{ fontStyle: 'italic', fontSize: '11px', color: '#333' }}>
                      {' '}| {Array.isArray(proj.tech_stack) ? proj.tech_stack.join(', ') : (proj.tech_stack || proj.tech)}
                    </span>
                  )}
                  {proj.link && (
                    <span> | <u><a href={proj.link} style={{ color: '#1A1A1A' }}>Link</a></u></span>
                  )}
                </div>
                <div style={{ fontWeight: 'bold' }}>
                  {proj.start_date ? `${proj.start_date} – ${proj.end_date}` : proj.duration || 'Dec 2025 – Jan 2026'}
                </div>
              </div>
              {proj.bullets && proj.bullets.length > 0 ? (
                <ul style={{ margin: '3px 0 0 16px', padding: 0, fontSize: '11px', lineHeight: '1.4' }}>
                  {proj.bullets.map((b, i) => (
                    <li key={i} style={{ marginBottom: '2px' }}>{b}</li>
                  ))}
                </ul>
              ) : proj.description ? (
                <p style={{ fontSize: '11px', margin: '3px 0 0', lineHeight: '1.4' }}>{proj.description}</p>
              ) : null}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {edu.length > 0 && (
        <div style={{ marginBottom: '14px' }}>
          <div style={{ fontSize: '13px', fontWeight: 'bold', borderBottom: '1px solid #1A1A1A', paddingBottom: '2px', marginBottom: '8px', fontFamily: '"Times New Roman", Times, serif' }}>
            Education
          </div>
          {edu.map((e, idx) => (
            <div key={idx} style={{ marginBottom: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                <div>
                  <strong>{e.degree}</strong> {e.field_of_study && !e.degree.includes(e.field_of_study) && <span>— {e.field_of_study}</span>}
                </div>
                <div style={{ fontWeight: 'bold' }}>
                  {e.start_date ? `${e.start_date} – ${e.end_date}` : e.end_date || e.duration}
                </div>
              </div>
              <div style={{ fontSize: '11px', color: '#333', fontStyle: 'italic' }}>
                {e.institution}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div style={{ marginBottom: '14px' }}>
          <div style={{ fontSize: '13px', fontWeight: 'bold', borderBottom: '1px solid #1A1A1A', paddingBottom: '2px', marginBottom: '8px', fontFamily: '"Times New Roman", Times, serif' }}>
            Skills
          </div>
          <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '11px', lineHeight: '1.5' }}>
            {skills.map((s, idx) => (
              <li key={idx} style={{ marginBottom: '2px' }}>
                {s.category ? (
                  <><strong>{s.category}:</strong> {s.skill_name || s.name || s}</>
                ) : (
                  <span>{s.skill_name || s.name || s}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Achievements */}
      {achievements.length > 0 && (
        <div style={{ marginBottom: '8px' }}>
          <div style={{ fontSize: '13px', fontWeight: 'bold', borderBottom: '1px solid #1A1A1A', paddingBottom: '2px', marginBottom: '8px', fontFamily: '"Times New Roman", Times, serif' }}>
            Achievements
          </div>
          <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '11px', lineHeight: '1.5' }}>
            {achievements.map((ach, idx) => (
              <li key={idx} style={{ marginBottom: '3px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    {typeof ach === 'string' ? ach : (
                      <><strong>{ach.title.split('for DevNest AI.')[0]}</strong>{ach.title.includes('for DevNest AI.') ? ' for DevNest AI.' : ''}</>
                    )}
                  </div>
                  {ach.date && <div style={{ fontWeight: 'bold', whiteSpace: 'nowrap', marginLeft: '10px' }}>{ach.date}</div>}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Achiever;
