import React, { useState } from 'react';
import { resumeApi } from '../../api/resumeApi';
import { Plus, Trash2, Sparkles, Check, Edit3, X } from 'lucide-react';

const DEFAULT_EXPERIENCE = [
  {
    company: "Groot Technologies",
    role: "Full Stack Developer Intern",
    start_date: "Aug 2025",
    end_date: "Dec 2025",
    is_current: false,
    raw_description: "Built a full-stack HR Management System with admin & employee dashboards, reducing manual HR work by ~40%.\nImplemented role-based access control (RBAC) for attendance, leaves, and departments, improving data accuracy by ~30%.\nDeveloped secure REST APIs using Node.js, Express.js, Sequelize, integrating PostgreSQL & Supabase.\nWorked in an Agile environment with exposure to Docker and CI/CD pipelines.",
    bullets: [
      "Built a full-stack HR Management System with admin & employee dashboards, reducing manual HR work by ~40%.",
      "Implemented role-based access control (RBAC) for attendance, leaves, and departments, improving data accuracy by ~30%.",
      "Developed secure REST APIs using Node.js, Express.js, Sequelize, integrating PostgreSQL & Supabase.",
      "Worked in an Agile environment with exposure to Docker and CI/CD pipelines."
    ]
  }
];

export const ExperienceForm = ({ resume, onUpdate }) => {
  const [adding, setAdding] = useState(false);
  const [loadingPreset, setLoadingPreset] = useState(false);
  const [aiLoadingId, setAiLoadingId] = useState(null);
  const [newExp, setNewExp] = useState({
    company: '', role: '', start_date: '', end_date: '', is_current: false, raw_description: ''
  });

  // Edit State
  const [editingId, setEditingId] = useState(null);
  const [editExp, setEditExp] = useState({
    company: '', role: '', start_date: '', end_date: '', is_current: false, bulletsText: ''
  });

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await resumeApi.addExperience(resume.id, newExp);
      setNewExp({ company: '', role: '', start_date: '', end_date: '', is_current: false, raw_description: '' });
      setAdding(false);
      onUpdate();
    } catch (err) {
      console.error('Failed to add experience', err);
    }
  };

  const handleLoadPreset = async () => {
    setLoadingPreset(true);
    try {
      for (const expData of DEFAULT_EXPERIENCE) {
        await resumeApi.addExperience(resume.id, expData);
      }
      onUpdate();
    } catch (err) {
      console.error('Failed preset load', err);
    } finally {
      setLoadingPreset(false);
    }
  };

  const startEdit = (exp) => {
    setEditingId(exp.id);
    setEditExp({
      company: exp.company || '',
      role: exp.role || '',
      start_date: exp.start_date || '',
      end_date: exp.end_date || '',
      is_current: exp.is_current || false,
      bulletsText: (exp.bullets && exp.bullets.length > 0) ? exp.bullets.join('\n') : (exp.raw_description || '')
    });
  };

  const handleSaveEdit = async (expId) => {
    try {
      const bulletsArray = editExp.bulletsText
        .split('\n')
        .map(b => b.trim())
        .filter(b => b.length > 0);

      await resumeApi.updateExperience(resume.id, expId, {
        company: editExp.company,
        role: editExp.role,
        start_date: editExp.start_date,
        end_date: editExp.end_date,
        is_current: editExp.is_current,
        bullets: bulletsArray,
        raw_description: editExp.bulletsText
      });
      setEditingId(null);
      onUpdate();
    } catch (err) {
      console.error('Failed to update experience', err);
    }
  };

  const handleDelete = async (expId) => {
    try {
      await resumeApi.deleteExperience(resume.id, expId);
      onUpdate();
    } catch (err) {
      console.error('Failed to delete experience', err);
    }
  };

  const handleImproveBullets = async (exp) => {
    setAiLoadingId(exp.id);
    try {
      await resumeApi.improveBullets(resume.id, { experience_id: exp.id });
      onUpdate();
    } catch (err) {
      console.error('AI bullet improvement failed', err);
    } finally {
      setAiLoadingId(null);
    }
  };

  return (
    <div className="glass-card" style={{ marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', margin: 0 }}>Work Experience</h3>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            type="button"
            onClick={handleLoadPreset}
            disabled={loadingPreset}
            className="btn btn-secondary"
            style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}
          >
            {loadingPreset ? 'Loading...' : '+ Load Default Experience'}
          </button>
          <button onClick={() => setAdding(!adding)} className="btn btn-primary" style={{ fontSize: '0.85rem' }}>
            <Plus size={15} /> Add Experience
          </button>
        </div>
      </div>

      {adding && (
        <form onSubmit={handleAdd} style={{ background: 'rgba(99,102,241,0.05)', padding: '1.25rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label>Company Name</label>
              <input type="text" className="form-control" placeholder="Groot Technologies" value={newExp.company} onChange={(e) => setNewExp({...newExp, company: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Job Title / Role</label>
              <input type="text" className="form-control" placeholder="Full Stack Developer Intern" value={newExp.role} onChange={(e) => setNewExp({...newExp, role: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Start Date</label>
              <input type="text" className="form-control" placeholder="Aug 2025" value={newExp.start_date} onChange={(e) => setNewExp({...newExp, start_date: e.target.value})} />
            </div>
            <div className="form-group">
              <label>End Date</label>
              <input type="text" className="form-control" placeholder="Dec 2025" value={newExp.end_date} onChange={(e) => setNewExp({...newExp, end_date: e.target.value})} disabled={newExp.is_current} />
            </div>
          </div>
          <div className="form-group">
            <label>Raw Description / Key Accomplishments (One per line)</label>
            <textarea className="form-control" placeholder="Built a full-stack HR Management System..." value={newExp.raw_description} onChange={(e) => setNewExp({...newExp, raw_description: e.target.value})} rows={4} />
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
            <button type="button" onClick={() => setAdding(false)} className="btn btn-secondary">Cancel</button>
            <button type="submit" className="btn btn-primary">Save Experience</button>
          </div>
        </form>
      )}

      {resume.experience && resume.experience.length === 0 ? (
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No work experience added yet.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {resume.experience.map(exp => (
            <div key={exp.id} style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '1.2rem', color: '#0F172A' }}>
              {editingId === exp.id ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: '600', color: '#475569' }}>Role / Position</label>
                      <input type="text" className="form-control" value={editExp.role} onChange={(e) => setEditExp({...editExp, role: e.target.value})} />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: '600', color: '#475569' }}>Company</label>
                      <input type="text" className="form-control" value={editExp.company} onChange={(e) => setEditExp({...editExp, company: e.target.value})} />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: '600', color: '#475569' }}>Start Date</label>
                      <input type="text" className="form-control" value={editExp.start_date} onChange={(e) => setEditExp({...editExp, start_date: e.target.value})} />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: '600', color: '#475569' }}>End Date</label>
                      <input type="text" className="form-control" value={editExp.end_date} onChange={(e) => setEditExp({...editExp, end_date: e.target.value})} />
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: '600', color: '#475569' }}>Bullet Points (One bullet per line)</label>
                    <textarea className="form-control" rows={4} value={editExp.bulletsText} onChange={(e) => setEditExp({...editExp, bulletsText: e.target.value})} />
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                    <button type="button" onClick={() => setEditingId(null)} className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>
                      Cancel
                    </button>
                    <button type="button" onClick={() => handleSaveEdit(exp.id)} className="btn btn-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>
                      <Check size={14} /> Save Changes
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                    <div>
                      <h4 style={{ fontSize: '1.1rem', color: '#0F172A', margin: 0, fontWeight: '700' }}>
                        {exp.role} <span style={{ color: '#2563EB', fontWeight: '600' }}>| {exp.company}</span>
                      </h4>
                      <div style={{ fontSize: '0.8rem', color: '#64748B', marginTop: '2px', fontWeight: '600' }}>
                        {exp.start_date} – {exp.is_current ? 'Present' : exp.end_date}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <button type="button" onClick={() => startEdit(exp)} className="btn btn-secondary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Edit3 size={13} color="#059669" /> Edit
                      </button>
                      <button type="button" onClick={() => handleImproveBullets(exp)} className="btn btn-ai" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }} disabled={aiLoadingId === exp.id}>
                        <Sparkles size={14} /> {aiLoadingId === exp.id ? 'Enhancing...' : 'Improve with AI'}
                      </button>
                      <button onClick={() => handleDelete(exp.id)} className="btn btn-danger" style={{ padding: '0.4rem 0.6rem' }}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  {exp.bullets && exp.bullets.length > 0 ? (
                    <ul style={{ paddingLeft: '1.25rem', color: '#334155', fontSize: '0.88rem', margin: 0 }}>
                      {exp.bullets.map((b, i) => (
                        <li key={i} style={{ marginBottom: '0.3rem' }}>{b}</li>
                      ))}
                    </ul>
                  ) : (
                    <p style={{ color: '#64748B', fontSize: '0.85rem', fontStyle: 'italic', margin: 0 }}>
                      {exp.raw_description || 'Click "Edit" to add description or "Improve with AI" to generate bullet points.'}
                    </p>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
