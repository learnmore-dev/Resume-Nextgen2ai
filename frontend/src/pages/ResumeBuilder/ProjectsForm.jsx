import React, { useState } from 'react';
import { resumeApi } from '../../api/resumeApi';
import { Plus, Trash2, Edit3, Check, Sparkles } from 'lucide-react';

const DEFAULT_PYTHON_PROJECTS = [
  {
    name: "Trainer Management System",
    tech_stack: ["Python", "Django", "MySQL"],
    link: "https://github.com/manisha/trainer-management-system",
    description: "Developed a web-based Trainer Management System for managing trainer profiles, courses, batches, schedules, and trainer assignments.\nImplemented CRUD operations, database relationships, validation, and an admin interface to streamline training operations.",
    bullets: [
      "Developed a web-based Trainer Management System for managing trainer profiles, courses, batches, schedules, and trainer assignments.",
      "Implemented CRUD operations, database relationships, validation, and an admin interface to streamline training operations."
    ]
  },
  {
    name: "Hotel Booking & Management System",
    tech_stack: ["Python", "Django", "REST Framework", "React.js", "PostgreSQL"],
    link: "https://github.com/manisha/hotel-booking-system",
    description: "Built a full-stack hotel booking platform with real-time room availability, search & advanced filters, online booking flow, and secure payment integration.\nImplemented role-based access control, REST APIs for React-Django communication, customer reviews/ratings, and an admin dashboard.",
    bullets: [
      "Built a full-stack hotel booking platform with real-time room availability, search & advanced filters, online booking flow, and secure payment integration.",
      "Implemented role-based access control, REST APIs for React-Django communication, customer reviews/ratings, and an admin dashboard."
    ]
  }
];

export const ProjectsForm = ({ resume, onUpdate }) => {
  const [adding, setAdding] = useState(false);
  const [loadingPreset, setLoadingPreset] = useState(false);
  const [newProj, setNewProj] = useState({
    name: '', tech_stack_str: '', link: '', raw_bullets: ''
  });

  // Edit State
  const [editingId, setEditingId] = useState(null);
  const [editProj, setEditProj] = useState({
    name: '', tech_stack_str: '', link: '', raw_bullets: ''
  });

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const techArray = newProj.tech_stack_str
        ? newProj.tech_stack_str.split(',').map(s => s.trim()).filter(Boolean)
        : [];
      const bulletsArray = newProj.raw_bullets
        ? newProj.raw_bullets.split('\n').map(b => b.trim()).filter(Boolean)
        : [];

      await resumeApi.addProject(resume.id, {
        name: newProj.name.trim(),
        tech_stack: techArray,
        link: newProj.link.trim(),
        description: newProj.raw_bullets,
        bullets: bulletsArray
      });

      setNewProj({ name: '', tech_stack_str: '', link: '', raw_bullets: '' });
      setAdding(false);
      onUpdate();
    } catch (err) {
      console.error('Failed to add project', err);
    }
  };

  const handleLoadPreset = async () => {
    setLoadingPreset(true);
    try {
      for (const pData of DEFAULT_PYTHON_PROJECTS) {
        await resumeApi.addProject(resume.id, pData);
      }
      onUpdate();
    } catch (err) {
      console.error('Failed preset load', err);
    } finally {
      setLoadingPreset(false);
    }
  };

  const startEdit = (p) => {
    setEditingId(p.id);
    const techStr = Array.isArray(p.tech_stack) ? p.tech_stack.join(', ') : (p.tech_stack || '');
    const bulletsStr = (p.bullets && p.bullets.length > 0) ? p.bullets.join('\n') : (p.description || '');

    setEditProj({
      name: p.name || '',
      tech_stack_str: techStr,
      link: p.link || '',
      raw_bullets: bulletsStr
    });
  };

  const handleSaveEdit = async (projId) => {
    try {
      const techArray = editProj.tech_stack_str
        ? editProj.tech_stack_str.split(',').map(s => s.trim()).filter(Boolean)
        : [];
      const bulletsArray = editProj.raw_bullets
        ? editProj.raw_bullets.split('\n').map(b => b.trim()).filter(Boolean)
        : [];

      await resumeApi.updateProject(resume.id, projId, {
        name: editProj.name.trim(),
        tech_stack: techArray,
        link: editProj.link.trim(),
        description: editProj.raw_bullets,
        bullets: bulletsArray
      });

      setEditingId(null);
      onUpdate();
    } catch (err) {
      console.error('Failed to update project', err);
    }
  };

  const handleDelete = async (projId) => {
    try {
      await resumeApi.deleteProject(resume.id, projId);
      onUpdate();
    } catch (err) {
      console.error('Failed to delete project', err);
    }
  };

  return (
    <div className="glass-card" style={{ marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', margin: 0 }}>Key Projects</h3>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            type="button"
            onClick={handleLoadPreset}
            disabled={loadingPreset}
            className="btn btn-secondary"
            style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}
          >
            {loadingPreset ? 'Loading...' : '+ Load Default Python Projects'}
          </button>
          <button onClick={() => setAdding(!adding)} className="btn btn-primary" style={{ fontSize: '0.85rem' }}>
            <Plus size={15} /> Add Project
          </button>
        </div>
      </div>

      {adding && (
        <form onSubmit={handleAdd} style={{ background: 'rgba(99,102,241,0.05)', padding: '1.25rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label style={{ fontSize: '0.8rem', fontWeight: '600' }}>Project Title</label>
              <input type="text" className="form-control" placeholder="Trainer Management System" value={newProj.name} onChange={(e) => setNewProj({...newProj, name: e.target.value})} required />
            </div>
            <div className="form-group" style={{ margin: 0 }}>
              <label style={{ fontSize: '0.8rem', fontWeight: '600' }}>Tech Stack (comma-separated)</label>
              <input type="text" className="form-control" placeholder="Python, Django, MySQL" value={newProj.tech_stack_str} onChange={(e) => setNewProj({...newProj, tech_stack_str: e.target.value})} />
            </div>
          </div>
          <div className="form-group">
            <label style={{ fontSize: '0.8rem', fontWeight: '600' }}>Project Link / GitHub URL</label>
            <input type="url" className="form-control" placeholder="https://github.com/manisha/trainer-management-system" value={newProj.link} onChange={(e) => setNewProj({...newProj, link: e.target.value})} />
          </div>
          <div className="form-group">
            <label style={{ fontSize: '0.8rem', fontWeight: '600' }}>Project Highlights / Feature Lines (2 bullet lines)</label>
            <textarea className="form-control" rows={3} placeholder="Developed a web-based Trainer Management System...\nImplemented CRUD operations, database relationships..." value={newProj.raw_bullets} onChange={(e) => setNewProj({...newProj, raw_bullets: e.target.value})} />
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
            <button type="button" onClick={() => setAdding(false)} className="btn btn-secondary">Cancel</button>
            <button type="submit" className="btn btn-primary">Save Project</button>
          </div>
        </form>
      )}

      {resume.projects && resume.projects.length === 0 ? (
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No projects added yet.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {resume.projects.map(p => (
            <div key={p.id} style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '1.1rem', color: '#0F172A' }}>
              {editingId === p.id ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: '600', color: '#475569' }}>Project Title</label>
                      <input type="text" className="form-control" value={editProj.name} onChange={(e) => setEditProj({...editProj, name: e.target.value})} />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: '600', color: '#475569' }}>Tech Stack (comma-separated)</label>
                      <input type="text" className="form-control" value={editProj.tech_stack_str} onChange={(e) => setEditProj({...editProj, tech_stack_str: e.target.value})} />
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: '600', color: '#475569' }}>Project Link URL</label>
                    <input type="text" className="form-control" value={editProj.link} onChange={(e) => setEditProj({...editProj, link: e.target.value})} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: '600', color: '#475569' }}>Bullets / Explanations (2 short lines)</label>
                    <textarea className="form-control" rows={3} value={editProj.raw_bullets} onChange={(e) => setEditProj({...editProj, raw_bullets: e.target.value})} />
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                    <button type="button" onClick={() => setEditingId(null)} className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>
                      Cancel
                    </button>
                    <button type="button" onClick={() => handleSaveEdit(p.id)} className="btn btn-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>
                      <Check size={14} /> Save Changes
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <div>
                      <h4 style={{ fontSize: '1.05rem', color: '#0F172A', margin: 0, fontWeight: '700' }}>
                        {p.name}
                        {(p.tech_stack || p.tech) && (
                          <span style={{ fontSize: '0.85rem', fontStyle: 'italic', color: '#475569', fontWeight: '500' }}>
                            {' '}| {Array.isArray(p.tech_stack) ? p.tech_stack.join(', ') : (p.tech_stack || p.tech)}
                          </span>
                        )}
                        {p.link && (
                          <a href={p.link} target="_blank" rel="noreferrer" style={{ fontSize: '0.85rem', color: '#2563EB', marginLeft: '8px', textDecoration: 'underline' }}>
                            Link ↗
                          </a>
                        )}
                      </h4>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <button type="button" onClick={() => startEdit(p)} className="btn btn-secondary" style={{ padding: '0.35rem 0.7rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Edit3 size={13} color="#059669" /> Edit
                      </button>
                      <button onClick={() => handleDelete(p.id)} className="btn btn-danger" style={{ padding: '0.35rem 0.6rem' }}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  {p.bullets && p.bullets.length > 0 ? (
                    <ul style={{ paddingLeft: '1.2rem', color: '#334155', fontSize: '0.88rem', margin: 0 }}>
                      {p.bullets.map((b, i) => (
                        <li key={i} style={{ marginBottom: '0.25rem' }}>{b}</li>
                      ))}
                    </ul>
                  ) : (
                    <p style={{ color: '#475569', fontSize: '0.88rem', margin: 0 }}>
                      {p.description}
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
