import React, { useState } from 'react';
import { resumeApi } from '../../api/resumeApi';
import { Plus, Trash2, Edit3, Check, Sparkles } from 'lucide-react';

const DEFAULT_PYTHON_EDUCATION = [
  {
    degree: "Bachelor of Technology (B.Tech.)",
    field_of_study: "Computer Science & Engineering | CGPA: 9.2/10",
    institution: "Indus Institute of Technology, Ahmedabad",
    start_date: "Sep 2022",
    end_date: "May 2026"
  },
  {
    degree: "Higher Secondary (Class 12)",
    field_of_study: "Science (PCM) - 81%",
    institution: "Shri Raghubir High School, Palghar",
    start_date: "Jun 2021",
    end_date: "May 2022"
  }
];

const DEFAULT_DATA_ANALYTICS_EDUCATION = [
  {
    degree: "Bachelor of Technology (B.Tech.) / B.Sc.",
    field_of_study: "Data Science & Analytics / CSE | CGPA: 8.9/10",
    institution: "Indus Institute of Technology, Ahmedabad",
    start_date: "Sep 2022",
    end_date: "May 2026"
  },
  {
    degree: "Higher Secondary (Class 12)",
    field_of_study: "Science (Mathematics & Statistics) - 84%",
    institution: "Shri Raghubir High School",
    start_date: "Jun 2021",
    end_date: "May 2022"
  }
];

const DEFAULT_JAVA_EDUCATION = [
  {
    degree: "Bachelor of Technology (B.Tech.)",
    field_of_study: "Information Technology | CGPA: 8.8/10",
    institution: "National Institute of Technology",
    start_date: "Sep 2022",
    end_date: "May 2026"
  },
  {
    degree: "Higher Secondary (Class 12)",
    field_of_study: "Science (PCM) - 83%",
    institution: "Delhi Public School",
    start_date: "Jun 2021",
    end_date: "May 2022"
  }
];

const ROLE_EDUCATION_PRESETS = {
  'Data Analytics': {
    label: 'Data Analytics',
    education: DEFAULT_DATA_ANALYTICS_EDUCATION
  },
  'Python Full Stack': {
    label: 'Python Full Stack',
    education: DEFAULT_PYTHON_EDUCATION
  },
  'Java Full Stack': {
    label: 'Java Full Stack',
    education: DEFAULT_JAVA_EDUCATION
  }
};

const detectRole = (resume) => {
  const target = (resume?.target_job_title || '').toLowerCase();
  const summary = (resume?.personal_info?.summary || '').toLowerCase();
  const title = (resume?.title || '').toLowerCase();
  const combined = `${target} ${summary} ${title}`;

  if (combined.includes('data') || combined.includes('analytic') || combined.includes('bi')) {
    return 'Data Analytics';
  }
  if (combined.includes('java') || combined.includes('spring')) {
    return 'Java Full Stack';
  }
  return 'Python Full Stack';
};

export const EducationForm = ({ resume, onUpdate }) => {
  const [adding, setAdding] = useState(false);
  const [loadingPreset, setLoadingPreset] = useState(false);
  const [selectedDomain, setSelectedDomain] = React.useState(detectRole(resume));

  React.useEffect(() => {
    setSelectedDomain(detectRole(resume));
  }, [resume?.target_job_title, resume?.personal_info?.summary, resume?.title]);

  const activePreset = ROLE_EDUCATION_PRESETS[selectedDomain] || ROLE_EDUCATION_PRESETS['Data Analytics'];

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

  const handleLoadPreset = async (eduList) => {
    setLoadingPreset(true);
    try {
      if (resume.education && resume.education.length > 0) {
        for (const existingEdu of resume.education) {
          try {
            await resumeApi.deleteEducation(resume.id, existingEdu.id);
          } catch (e) {
            console.error('Failed to delete old education', e);
          }
        }
      }

      const listToLoad = eduList || activePreset.education;
      for (const eduData of listToLoad) {
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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.6rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', margin: 0, color: '#0F172A', fontWeight: '800' }}>Education</h3>
          <span style={{ fontSize: '0.75rem', background: '#EEF2FF', color: '#4F46E5', padding: '2px 8px', borderRadius: '4px', fontWeight: '700' }}>
            Domain: {selectedDomain}
          </span>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <select
            value={selectedDomain}
            onChange={(e) => setSelectedDomain(e.target.value)}
            style={{ padding: '0.35rem 0.6rem', fontSize: '0.78rem', borderRadius: '6px', border: '1px solid #CBD5E1', background: '#FFFFFF', fontWeight: '600' }}
          >
            {Object.keys(ROLE_EDUCATION_PRESETS).map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => handleLoadPreset(activePreset.education)}
            disabled={loadingPreset}
            className="btn btn-ai"
            style={{ fontSize: '0.8rem', padding: '0.4rem 0.85rem' }}
          >
            <Sparkles size={14} /> {loadingPreset ? 'Loading...' : `+ Load ${selectedDomain} Default Education`}
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

      {(!resume?.education || resume.education.length === 0) ? (
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No education records added yet.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {(resume.education || []).map(ed => (
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
