import React, { useState } from 'react';
import { resumeApi } from '../../api/resumeApi';
import { Plus, X, Sparkles, Edit3, Check } from 'lucide-react';

const PYTHON_FRESHER_SKILLS = [
  { category: "Languages", skill_name: "Java (Core, OOP, Collections), Python, JavaScript (ES6)" },
  { category: "Frontend", skill_name: "React.js, Next.js, HTML5, CSS3, Tailwind CSS, Shadcn UI, Ant Design" },
  { category: "Backend & Platforms", skill_name: "Node.js, Express.js, REST APIs" },
  { category: "Databases", skill_name: "MySQL, PostgreSQL, MongoDB, Mongoose, Prisma" },
  { category: "Development Tools & DevOps", skill_name: "VS Code, Git, GitHub, Docker, CI/CD Pipelines (GitHub Actions), Postman" },
  { category: "AI Tools & Knowledge", skill_name: "Gemini AI, Groq API, AI Model Integration, AI-powered application development" },
  { category: "CS Fundamentals", skill_name: "DBMS, Computer Network, SDLC (Agile, Scrum), DSA, OOPs, LLD(Basics)" },
  { category: "Soft Skills", skill_name: "Strong Communication, Technical Documentation, Analytical Thinking, Team Collaboration" }
];

export const SkillsForm = ({ resume, onUpdate }) => {
  const [skillName, setSkillName] = useState('');
  const [category, setCategory] = useState('Technical');
  const [loadingPreset, setLoadingPreset] = useState(false);

  // Edit State
  const [editingId, setEditingId] = useState(null);
  const [editCategory, setEditCategory] = useState('');
  const [editSkillName, setEditSkillName] = useState('');

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!skillName.trim()) return;
    try {
      await resumeApi.addSkill(resume.id, { skill_name: skillName.trim(), category });
      setSkillName('');
      onUpdate();
    } catch (err) {
      console.error('Failed to add skill', err);
    }
  };

  const handleLoadPreset = async () => {
    setLoadingPreset(true);
    try {
      for (const sk of PYTHON_FRESHER_SKILLS) {
        await resumeApi.addSkill(resume.id, sk);
      }
      onUpdate();
    } catch (err) {
      console.error('Failed preset load', err);
    } finally {
      setLoadingPreset(false);
    }
  };

  const startEdit = (sk) => {
    setEditingId(sk.id);
    setEditCategory(sk.category || 'Technical');
    setEditSkillName(sk.skill_name || '');
  };

  const handleSaveEdit = async (skillId) => {
    if (!editSkillName.trim()) return;
    try {
      await resumeApi.updateSkill(resume.id, skillId, {
        category: editCategory,
        skill_name: editSkillName.trim()
      });
      setEditingId(null);
      onUpdate();
    } catch (err) {
      console.error('Failed to update skill', err);
    }
  };

  const handleDelete = async (skillId) => {
    try {
      await resumeApi.deleteSkill(resume.id, skillId);
      onUpdate();
    } catch (err) {
      console.error('Failed to delete skill', err);
    }
  };

  return (
    <div className="glass-card" style={{ marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', margin: 0 }}>Skills & Competencies</h3>
        <button
          type="button"
          onClick={handleLoadPreset}
          disabled={loadingPreset}
          className="btn btn-ai"
          style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}
        >
          <Sparkles size={14} /> {loadingPreset ? 'Loading...' : 'Load Python Full Stack / Fresher Skills'}
        </button>
      </div>

      <form onSubmit={handleAdd} style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <select className="form-control" style={{ width: '160px' }} value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Languages">Languages</option>
          <option value="Frontend">Frontend</option>
          <option value="Backend & Platforms">Backend & Platforms</option>
          <option value="Databases">Databases</option>
          <option value="Development Tools & DevOps">DevOps & Tools</option>
          <option value="AI Tools & Knowledge">AI Tools</option>
          <option value="CS Fundamentals">CS Fundamentals</option>
          <option value="Soft Skills">Soft Skills</option>
          <option value="Technical">Technical</option>
        </select>
        <input
          type="text"
          className="form-control"
          placeholder="e.g. Python, React.js, PostgreSQL"
          value={skillName}
          onChange={(e) => setSkillName(e.target.value)}
        />
        <button type="submit" className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>
          <Plus size={16} /> Add Skill
        </button>
      </form>

      {resume.skills && resume.skills.length === 0 ? (
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No skills added yet.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {resume.skills.map(sk => (
            <div key={sk.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '0.55rem 0.85rem', borderRadius: '6px', fontSize: '0.85rem', color: '#0F172A' }}>
              {editingId === sk.id ? (
                <div style={{ display: 'flex', gap: '8px', flex: 1, marginRight: '10px' }}>
                  <input
                    type="text"
                    className="form-control"
                    style={{ width: '170px', padding: '4px 8px', fontSize: '0.8rem' }}
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                  />
                  <input
                    type="text"
                    className="form-control"
                    style={{ flex: 1, padding: '4px 8px', fontSize: '0.8rem' }}
                    value={editSkillName}
                    onChange={(e) => setEditSkillName(e.target.value)}
                  />
                  <button type="button" onClick={() => handleSaveEdit(sk.id)} className="btn btn-primary" style={{ padding: '4px 10px', fontSize: '0.75rem', whiteSpace: 'nowrap' }}>
                    <Check size={14} /> Save
                  </button>
                  <button type="button" onClick={() => setEditingId(null)} className="btn btn-secondary" style={{ padding: '4px 10px', fontSize: '0.75rem', whiteSpace: 'nowrap' }}>
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <div>
                    <strong style={{ color: '#2563EB', marginRight: '6px' }}>{sk.category}:</strong>
                    <span>{sk.skill_name}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <button type="button" onClick={() => startEdit(sk)} style={{ background: 'none', border: 'none', color: '#059669', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '3px' }}>
                      <Edit3 size={13} /> Edit
                    </button>
                    <X size={14} style={{ cursor: 'pointer', color: '#64748B' }} onClick={() => handleDelete(sk.id)} />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
