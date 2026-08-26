import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import { resumeApi } from '../api/resumeApi';
import { Plus, Edit3, Target, Download, Trash2, GitCommit, Sparkles, Layers, FileText } from 'lucide-react';

export const Dashboard = () => {
  const { resumes, fetchResumes, fetchResumeDetail } = useResume();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [creating, setCreating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchResumes();
  }, []);

  const handleCreateMaster = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    setCreating(true);
    try {
      const res = await resumeApi.createResume({
        title: newTitle,
        is_master: true
      });
      setShowCreateModal(false);
      setNewTitle('');
      await fetchResumes();
      navigate(`/builder/${res.data.id}`);
    } catch (err) {
      console.error('Failed to create resume', err);
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this resume?')) return;
    try {
      await resumeApi.deleteResume(id);
      fetchResumes();
    } catch (e) {
      console.error('Failed to delete', e);
    }
  };

  const masterResumes = resumes.filter(r => r.is_master);
  const tailoredResumes = resumes.filter(r => !r.is_master);

  return (
    <div style={{ padding: '2.5rem', maxWidth: '1280px', margin: '0 auto' }}>
      {/* Header Banner */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2.5rem' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', marginBottom: '0.5rem' }}>Resume Dashboard</h1>
          <p style={{ color: 'var(--text-muted)' }}>Manage base master resumes & AI job-tailored variations</p>
        </div>
        <button onClick={() => setShowCreateModal(true)} className="btn btn-primary" style={{ padding: '0.85rem 1.4rem' }}>
          <Plus size={20} /> Create Master Resume
        </button>
      </div>

      {/* Master Resumes Section */}
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-display)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem', color: 'var(--text-main)' }}>
          <Layers className="text-indigo-400" size={20} /> Master Resumes
        </h2>
        {masterResumes.length === 0 ? (
          <div className="glass-card" style={{ textAlign: 'center', padding: '3rem 1.5rem' }}>
            <FileText size={48} style={{ color: 'var(--text-dim)', marginBottom: '1rem' }} />
            <h3 style={{ marginBottom: '0.5rem' }}>No Master Resumes Found</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>Create a Master Resume containing all your complete experience & education.</p>
            <button onClick={() => setShowCreateModal(true)} className="btn btn-primary">
              <Plus size={18} /> Create Your First Master Resume
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
            {masterResumes.map(r => (
              <div key={r.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <span className="badge badge-master">Master Base</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                      Updated {new Date(r.updated_at).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{r.title}</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                    Complete source resume used for single-click AI job tailoring.
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button onClick={() => navigate(`/builder/${r.id}`)} className="btn btn-secondary" style={{ flex: 1, fontSize: '0.85rem' }}>
                      <Edit3 size={15} /> Edit Resume
                    </button>
                    <button onClick={() => navigate(`/job-analyzer?resume_id=${r.id}`)} className="btn btn-ai" style={{ flex: 1, fontSize: '0.85rem' }}>
                      <Target size={15} /> Tailor for JD
                    </button>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                    <a href={resumeApi.getPDFUrl(r.id, r.template_id)} target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }}>
                      <Download size={14} /> PDF
                    </a>
                    <button onClick={() => handleDelete(r.id)} className="btn btn-danger" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Tailored Resumes Section */}
      <div>
        <h2 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-display)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem', color: 'var(--text-main)' }}>
          <GitCommit className="text-emerald-400" size={20} /> Job-Tailored Resumes ({tailoredResumes.length})
        </h2>
        {tailoredResumes.length === 0 ? (
          <div className="glass-card" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            <p style={{ fontSize: '0.95rem' }}>No job-specific tailored resumes yet. Click "Tailor for JD" on any Master Resume to generate one!</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
            {tailoredResumes.map(r => (
              <div key={r.id} className="glass-card" style={{ borderLeft: '4px solid var(--accent-emerald)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <span className="badge badge-tailored">Job Tailored</span>
                  {r.parent_resume_title && (
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <GitCommit size={12} /> Parent: {r.parent_resume_title}
                    </span>
                  )}
                </div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.4rem' }}>{r.title}</h3>
                {r.target_job_title && (
                  <div style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', marginBottom: '1rem' }}>
                    Target: <strong>{r.target_job_title}</strong> {r.target_company && `at ${r.target_company}`}
                  </div>
                )}
                <div style={{ display: 'flex', gap: '0.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.85rem' }}>
                  <button onClick={() => navigate(`/builder/${r.id}`)} className="btn btn-secondary" style={{ flex: 1, fontSize: '0.85rem' }}>
                    <Edit3 size={15} /> Edit & Preview
                  </button>
                  <a href={resumeApi.getPDFUrl(r.id, r.template_id)} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ padding: '0.45rem 0.85rem', fontSize: '0.85rem' }}>
                    <Download size={15} /> PDF
                  </a>
                  <button onClick={() => handleDelete(r.id)} className="btn btn-danger" style={{ padding: '0.45rem 0.75rem' }}>
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal for creating new master resume */}
      {showCreateModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="glass-card" style={{ width: '100%', maxWidth: '480px', padding: '2rem' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '1rem' }}>New Master Resume</h3>
            <form onSubmit={handleCreateMaster}>
              <div className="form-group">
                <label>Resume Title</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Master Software Engineer Resume"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  autoFocus
                  required
                />
              </div>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                <button type="button" onClick={() => setShowCreateModal(false)} className="btn btn-secondary">Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={creating}>
                  {creating ? 'Creating...' : 'Create Master Resume'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
