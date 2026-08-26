import React, { useState } from 'react';
import { resumeApi } from '../../api/resumeApi';
import { Plus, X, Award, Edit3, Check } from 'lucide-react';

const DEFAULT_ACHIEVEMENTS = [
  { title: "Top 15 - HackHazards Hackathon 2025 (Fluvio Track) for DevNest AI.", date: "May 2025" },
  { title: "Solved 500+ DSA problems on LeetCode & GeeksforGeeks using Java.", date: "Oct 2024 - Jan 2026" }
];

export const AchievementsForm = ({ resume, onUpdate }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [loadingPreset, setLoadingPreset] = useState(false);

  // Edit State
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDate, setEditDate] = useState('');

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      await resumeApi.addAchievement(resume.id, { title: title.trim(), date: date.trim() });
      setTitle('');
      setDate('');
      onUpdate();
    } catch (err) {
      console.error('Failed to add achievement', err);
    }
  };

  const handleLoadPreset = async () => {
    setLoadingPreset(true);
    try {
      for (const ach of DEFAULT_ACHIEVEMENTS) {
        await resumeApi.addAchievement(resume.id, ach);
      }
      onUpdate();
    } catch (err) {
      console.error('Failed preset load', err);
    } finally {
      setLoadingPreset(false);
    }
  };

  const startEdit = (ach) => {
    setEditingId(ach.id);
    setEditTitle(ach.title || '');
    setEditDate(ach.date || '');
  };

  const handleSaveEdit = async (achId) => {
    if (!editTitle.trim()) return;
    try {
      await resumeApi.updateAchievement(resume.id, achId, {
        title: editTitle.trim(),
        date: editDate.trim()
      });
      setEditingId(null);
      onUpdate();
    } catch (err) {
      console.error('Failed to update achievement', err);
    }
  };

  const handleDelete = async (achId) => {
    try {
      await resumeApi.deleteAchievement(resume.id, achId);
      onUpdate();
    } catch (err) {
      console.error('Failed to delete achievement', err);
    }
  };

  const achievementsList = resume.achievements || [];

  return (
    <div className="glass-card" style={{ marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Award size={20} color="#2563EB" /> Achievements & Honors
        </h3>
        <button
          type="button"
          onClick={handleLoadPreset}
          disabled={loadingPreset}
          className="btn btn-secondary"
          style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}
        >
          {loadingPreset ? 'Loading...' : '+ Load Default Achievements'}
        </button>
      </div>

      <form onSubmit={handleAdd} style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <input
          type="text"
          className="form-control"
          placeholder="e.g. Top 15 - HackHazards Hackathon 2025"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ flex: 1 }}
        />
        <input
          type="text"
          className="form-control"
          placeholder="e.g. May 2025"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{ width: '160px' }}
        />
        <button type="submit" className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>
          <Plus size={16} /> Add Achievement
        </button>
      </form>

      {achievementsList.length === 0 ? (
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No achievements added yet.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {achievementsList.map(ach => (
            <div key={ach.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '0.55rem 0.85rem', borderRadius: '6px', fontSize: '0.85rem', color: '#0F172A' }}>
              {editingId === ach.id ? (
                <div style={{ display: 'flex', gap: '8px', flex: 1, marginRight: '10px' }}>
                  <input
                    type="text"
                    className="form-control"
                    style={{ flex: 1, padding: '4px 8px', fontSize: '0.8rem' }}
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                  <input
                    type="text"
                    className="form-control"
                    style={{ width: '140px', padding: '4px 8px', fontSize: '0.8rem' }}
                    value={editDate}
                    onChange={(e) => setEditDate(e.target.value)}
                  />
                  <button type="button" onClick={() => handleSaveEdit(ach.id)} className="btn btn-primary" style={{ padding: '4px 10px', fontSize: '0.75rem', whiteSpace: 'nowrap' }}>
                    <Check size={14} /> Save
                  </button>
                  <button type="button" onClick={() => setEditingId(null)} className="btn btn-secondary" style={{ padding: '4px 10px', fontSize: '0.75rem', whiteSpace: 'nowrap' }}>
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', justifyBetween: 'space-between', flex: 1, marginRight: '15px' }}>
                    <span style={{ fontWeight: '500' }}>{ach.title}</span>
                    {ach.date && <span style={{ color: '#64748B', fontWeight: '600', marginLeft: 'auto', paddingLeft: '10px' }}>{ach.date}</span>}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <button type="button" onClick={() => startEdit(ach)} style={{ background: 'none', border: 'none', color: '#059669', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '3px' }}>
                      <Edit3 size={13} /> Edit
                    </button>
                    <X size={14} style={{ cursor: 'pointer', color: '#64748B' }} onClick={() => handleDelete(ach.id)} />
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
