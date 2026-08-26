import React, { useState } from 'react';
import { resumeApi } from '../../api/resumeApi';
import { Plus, Trash2, Edit3, Check } from 'lucide-react';

const DEFAULT_EDUCATION = [
  {
    degree: "Bachelor of Technology (B.Tech.)",
    field_of_study: "CSE | CGPA: 9.2/10",
    institution: "Indus Institute of Technology, Ahmedabad",
    start_date: "Sep 2022",
    end_date: "May 2026"
  },
  {
    degree: "Intermediate (Class 12)",
    field_of_study: "81%",
    institution: "Shri Raghubir High School, Palghar",
    start_date: "Jun 2021",
    end_date: "May 2022"
  }
];

export const EducationForm = ({ resume, onUpdate }) => {
  const [adding, setAdding] = useState(false);
  const [loadingPreset, setLoadingPreset] = useState(false);
  const [newEdu, setNewEdu] = useState({
    institution: '', degree: '', field_of_study: '', start_date: '', end_date: '', grade: ''
  });

  // Edit State
  const [editingId, setEditingId] = useState(null);
  const [editEdu, setEditEdu] = useState({
    institution: '', degree: '', field_of_study: '', start_date: '', end_date: ''
  });

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await resumeApi.addEducation(resume.id, newEdu);
      setNewEdu({ institution: '', degree: '', field_of_study: '', start_date: '', end_date: '', grade: '' });
      setAdding(false);
      onUpdate();
    } catch (err) {
      console.error('Failed to add education', err);
    }
  };

  const handleLoadPreset = async () => {
    setLoadingPreset(true);
    try {
      for (const eduData of DEFAULT_EDUCATION) {
        await resumeApi.addEducation(resume.id, eduData);
      }
      onUpdate();
    } catch (err) {
      console.error('Failed preset load', err);
    } finally {
      setLoadingPreset(false);
    }
  };

  const startEdit = (ed) => {
    setEditingId(ed.id);
    setEditEdu({
      institution: ed.institution || '',
      degree: ed.degree || '',
      field_of_study: ed.field_of_study || '',
      start_date: ed.start_date || '',
      end_date: ed.end_date || ''
    });
  };

  const handleSaveEdit = async (eduId) => {
    try {
      await resumeApi.updateEducation(resume.id, eduId, editEdu);
      setEditingId(null);
      onUpdate();
    } catch (err) {
      console.error('Failed to update education', err);
    }
  };

  const handleDelete = async (eduId) => {
    try {
      await resumeApi.deleteEducation(resume.id, eduId);
      onUpdate();
    } catch (err) {
      console.error('Failed to delete education', err);
    }
  };

  return (
    <div className="glass-card" style={{ marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', margin: 0 }}>Education</h3>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            type="button"
            onClick={handleLoadPreset}
            disabled={loadingPreset}
            className="btn btn-secondary"
            style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}
          >
            {loadingPreset ? 'Loading...' : '+ Load Default Education'}
          </button>
          <button onClick={() => setAdding(!adding)} className="btn btn-primary" style={{ fontSize: '0.85rem' }}>
            <Plus size={15} /> Add Education
          </button>
        </div>
      </div>

      {adding && (
        <form onSubmit={handleAdd} style={{ background: 'rgba(99,102,241,0.05)', padding: '1.25rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label style={{ fontSize: '0.8rem', fontWeight: '600' }}>Degree</label>
              <input type="text" className="form-control" placeholder="Bachelor of Technology (B.Tech.)" value={newEdu.degree} onChange={(e) => setNewEdu({...newEdu, degree: e.target.value})} required />
            </div>
            <div className="form-group">
              <label style={{ fontSize: '0.8rem', fontWeight: '600' }}>Field of Study / Score</label>
              <input type="text" className="form-control" placeholder="CSE | CGPA: 9.2/10" value={newEdu.field_of_study} onChange={(e) => setNewEdu({...newEdu, field_of_study: e.target.value})} />
            </div>
            <div className="form-group">
              <label style={{ fontSize: '0.8rem', fontWeight: '600' }}>Institution / University</label>
              <input type="text" className="form-control" placeholder="Indus Institute of Technology, Ahmedabad" value={newEdu.institution} onChange={(e) => setNewEdu({...newEdu, institution: e.target.value})} required />
            </div>
            <div className="form-group">
              <label style={{ fontSize: '0.8rem', fontWeight: '600' }}>Start & End Dates / Duration</label>
              <input type="text" className="form-control" placeholder="Sep 2022 – May 2026" value={newEdu.end_date} onChange={(e) => setNewEdu({...newEdu, end_date: e.target.value})} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
            <button type="button" onClick={() => setAdding(false)} className="btn btn-secondary">Cancel</button>
            <button type="submit" className="btn btn-primary">Save Education</button>
          </div>
        </form>
      )}

      {resume.education && resume.education.length === 0 ? (
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No education records added yet.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {resume.education.map(ed => (
            <div key={ed.id} style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '1rem', color: '#0F172A' }}>
              {editingId === ed.id ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: '600', color: '#475569' }}>Degree</label>
                      <input type="text" className="form-control" value={editEdu.degree} onChange={(e) => setEditEdu({...editEdu, degree: e.target.value})} />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: '600', color: '#475569' }}>Field of Study / Grade</label>
                      <input type="text" className="form-control" value={editEdu.field_of_study} onChange={(e) => setEditEdu({...editEdu, field_of_study: e.target.value})} />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: '600', color: '#475569' }}>Institution / College</label>
                      <input type="text" className="form-control" value={editEdu.institution} onChange={(e) => setEditEdu({...editEdu, institution: e.target.value})} />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: '600', color: '#475569' }}>Dates / Duration</label>
                      <input type="text" className="form-control" value={editEdu.end_date} onChange={(e) => setEditEdu({...editEdu, end_date: e.target.value})} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', marginTop: '4px' }}>
                    <button type="button" onClick={() => setEditingId(null)} className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>
                      Cancel
                    </button>
                    <button type="button" onClick={() => handleSaveEdit(ed.id)} className="btn btn-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>
                      <Check size={14} /> Save Changes
                    </button>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ fontSize: '1rem', color: '#0F172A', margin: 0, fontWeight: '700' }}>
                      {ed.degree} {ed.field_of_study && <span style={{ color: '#2563EB', fontWeight: '600' }}>— {ed.field_of_study}</span>}
                    </h4>
                    <div style={{ fontSize: '0.85rem', color: '#475569', marginTop: '2px', fontWeight: '500' }}>
                      <em>{ed.institution}</em> • {ed.start_date ? `${ed.start_date} – ${ed.end_date}` : ed.end_date}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <button type="button" onClick={() => startEdit(ed)} className="btn btn-secondary" style={{ padding: '0.35rem 0.7rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Edit3 size={13} color="#059669" /> Edit
                    </button>
                    <button onClick={() => handleDelete(ed.id)} className="btn btn-danger" style={{ padding: '0.35rem 0.6rem' }}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
