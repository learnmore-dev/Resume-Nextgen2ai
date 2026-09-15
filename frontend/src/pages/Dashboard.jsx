import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import { resumeApi } from '../api/resumeApi';
import { 
  Plus, Edit3, Target, Download, Trash2, GitCommit, Sparkles, 
  Layers, FileText, Calendar, Clock, ShieldCheck, CheckCircle2, Layout 
} from 'lucide-react';
import { PaymentModal } from '../components/PaymentModal';
import { useAuth } from '../context/AuthContext';
import { UserAvatar } from '../components/UserAvatar';

const TEMPLATE_NAMES = {
  1: 'Modern Clean',
  2: 'Minimalist Tech',
  3: 'Executive Elite',
  4: 'Creative Impact',
  5: 'Compact Professional'
};

export const Dashboard = () => {
  const { user, isAdmin } = useAuth();
  const { resumes, fetchResumes, fetchResumeDetail } = useResume();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [creating, setCreating] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedResumeForPayment, setSelectedResumeForPayment] = useState(null);
  const [activeTab, setActiveTab] = useState('history'); // 'history', 'master', 'tailored'
  const navigate = useNavigate();

  useEffect(() => {
    fetchResumes();
  }, []);

  const formatDateTime = (isoString) => {
    if (!isoString) return 'Just now';
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return isoString;
    }
  };

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

  const executeDownload = async (resume) => {
    try {
      const response = await resumeApi.exportPDF(resume.id, resume.template_id);
      const fileUrl = URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = `${resume.title.replace(/[^a-z0-9]+/gi, '_') || 'Resume'}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(fileUrl);
    } catch (error) {
      console.error('PDF export failed', error);
      if (error.response?.status === 402) {
        setSelectedResumeForPayment(resume);
        setShowPaymentModal(true);
      } else {
        window.alert('PDF download failed. Please try again.');
      }
    }
  };

  const handleDownloadClick = async (resume) => {
    try {
      const statusRes = await resumeApi.checkPaymentStatus(resume.id);
      if (statusRes.data?.is_paid) {
        await executeDownload(resume);
      } else {
        setSelectedResumeForPayment(resume);
        setShowPaymentModal(true);
      }
    } catch (err) {
      setSelectedResumeForPayment(resume);
      setShowPaymentModal(true);
    }
  };

  const masterResumes = resumes.filter(r => r.is_master);
  const tailoredResumes = resumes.filter(r => !r.is_master);

  return (
    <div style={{ padding: '2.5rem', maxWidth: '1280px', margin: '0 auto' }}>
      {/* User Welcome Banner */}
      {user && (
        <div 
          style={{
            background: 'linear-gradient(135deg, #F8FAFC 0%, #EFF6FF 100%)',
            border: '1px solid #E2E8F0',
            borderRadius: '16px',
            padding: '1.25rem 1.75rem',
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <UserAvatar 
              src={user.picture} 
              name={user.name || user.username} 
              size={48} 
              border="2px solid #6366F1"
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#0F172A', fontWeight: 800 }}>
                  Welcome back, {user.name || user.username}!
                </h3>
                <span style={{ fontSize: '0.72rem', background: '#DCFCE7', color: '#15803D', padding: '2px 8px', borderRadius: '12px', fontWeight: 700 }}>
                  Google Verified
                </span>
              </div>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748B' }}>
                {user.email} • Your saved templates and resume history are synchronized.
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ background: '#FFFFFF', padding: '6px 14px', borderRadius: '10px', border: '1px solid #E2E8F0', textAlign: 'center' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A' }}>{resumes.length}</div>
              <div style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 600 }}>Total Templates</div>
            </div>
            <div style={{ background: '#FFFFFF', padding: '6px 14px', borderRadius: '10px', border: '1px solid #E2E8F0', textAlign: 'center' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#4F46E5' }}>{masterResumes.length}</div>
              <div style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 600 }}>Master Resumes</div>
            </div>
            <div style={{ background: '#FFFFFF', padding: '6px 14px', borderRadius: '10px', border: '1px solid #E2E8F0', textAlign: 'center' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#10B981' }}>{tailoredResumes.length}</div>
              <div style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 600 }}>Job Tailored</div>
            </div>
            {isAdmin && (
              <Link
                to="/admin-dashboard"
                style={{
                  background: '#0F172A',
                  color: '#FFFFFF',
                  padding: '8px 14px',
                  borderRadius: '10px',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                <ShieldCheck size={15} color="#38BDF8" /> Admin Panel
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Header Banner & Action Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', marginBottom: '0.5rem' }}>Resume Dashboard</h1>
          <p style={{ color: 'var(--text-muted)' }}>Template creation audit trail, master resumes & AI job-tailored variations</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => navigate('/templates')} className="btn btn-secondary" style={{ padding: '0.85rem 1.2rem' }}>
            <Layout size={18} /> Choose New Template
          </button>
          <button onClick={() => setShowCreateModal(true)} className="btn btn-primary" style={{ padding: '0.85rem 1.4rem' }}>
            <Plus size={20} /> Create Master Resume
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border-color)', marginBottom: '2rem', paddingBottom: '4px' }}>
        <button
          onClick={() => setActiveTab('history')}
          style={{
            background: activeTab === 'history' ? '#EEF2FF' : 'transparent',
            color: activeTab === 'history' ? '#4F46E5' : 'var(--text-muted)',
            border: 'none',
            borderBottom: activeTab === 'history' ? '2.5px solid #4F46E5' : '2.5px solid transparent',
            padding: '10px 18px',
            borderRadius: '8px 8px 0 0',
            fontWeight: 700,
            fontSize: '0.92rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Clock size={16} /> Template History & Timeline ({resumes.length})
        </button>
        <button
          onClick={() => setActiveTab('master')}
          style={{
            background: activeTab === 'master' ? '#EEF2FF' : 'transparent',
            color: activeTab === 'master' ? '#4F46E5' : 'var(--text-muted)',
            border: 'none',
            borderBottom: activeTab === 'master' ? '2.5px solid #4F46E5' : '2.5px solid transparent',
            padding: '10px 18px',
            borderRadius: '8px 8px 0 0',
            fontWeight: 700,
            fontSize: '0.92rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Layers size={16} /> Master Resumes ({masterResumes.length})
        </button>
        <button
          onClick={() => setActiveTab('tailored')}
          style={{
            background: activeTab === 'tailored' ? '#EEF2FF' : 'transparent',
            color: activeTab === 'tailored' ? '#4F46E5' : 'var(--text-muted)',
            border: 'none',
            borderBottom: activeTab === 'tailored' ? '2.5px solid #4F46E5' : '2.5px solid transparent',
            padding: '10px 18px',
            borderRadius: '8px 8px 0 0',
            fontWeight: 700,
            fontSize: '0.92rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <GitCommit size={16} /> Job-Tailored ({tailoredResumes.length})
        </button>
      </div>

      {/* 1. Dedicated Template History & Activity View */}
      {activeTab === 'history' && (
        <div style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-display)', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0, color: 'var(--text-main)' }}>
              <Clock className="text-indigo-400" size={20} /> Template Creation History & Audit ({resumes.length} Total)
            </h2>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Sorted by latest created date & time
            </span>
          </div>

          {resumes.length === 0 ? (
            <div className="glass-card" style={{ textAlign: 'center', padding: '3.5rem 1.5rem' }}>
              <FileText size={48} style={{ color: 'var(--text-dim)', marginBottom: '1rem' }} />
              <h3 style={{ marginBottom: '0.5rem' }}>No Templates Created Yet</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                Pick from our modern, ATS-friendly templates to create your first resume!
              </p>
              <button onClick={() => navigate('/templates')} className="btn btn-primary">
                <Plus size={18} /> Choose a Template
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {resumes.map((r, index) => (
                <div 
                  key={r.id} 
                  className="glass-card" 
                  style={{ 
                    padding: '1.25rem 1.5rem',
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between', 
                    flexWrap: 'wrap', 
                    gap: '1.25rem',
                    borderLeft: r.is_master ? '4px solid #4F46E5' : '4px solid #10B981'
                  }}
                >
                  <div style={{ flex: 1, minWidth: '280px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.35rem', flexWrap: 'wrap' }}>
                      <span style={{ 
                        background: '#EEF2FF', 
                        color: '#4F46E5', 
                        fontSize: '0.75rem', 
                        padding: '2px 8px', 
                        borderRadius: '8px', 
                        fontWeight: 700 
                      }}>
                        {TEMPLATE_NAMES[r.template_id] || `Template #${r.template_id}`}
                      </span>
                      <span className={`badge ${r.is_master ? 'badge-master' : 'badge-tailored'}`} style={{ fontSize: '0.72rem' }}>
                        {r.is_master ? 'Master Base' : 'Job Tailored'}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                        ID #{r.id}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.2rem', margin: '0 0 0.5rem', color: 'var(--text-main)', fontWeight: 800 }}>
                      {r.title}
                    </h3>

                    {r.target_job_title && (
                      <div style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', marginBottom: '0.5rem' }}>
                        Targeting: <strong>{r.target_job_title}</strong> {r.target_company && `at ${r.target_company}`}
                      </div>
                    )}

                    {/* Creation & Update Timestamps */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.8rem', color: 'var(--text-muted)', flexWrap: 'wrap' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <Calendar size={14} color="#6366F1" />
                        <span>Created: <strong style={{ color: 'var(--text-main)' }}>{formatDateTime(r.created_at)}</strong></span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <Clock size={14} color="#10B981" />
                        <span>Last Updated: <strong style={{ color: 'var(--text-main)' }}>{formatDateTime(r.updated_at)}</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <button onClick={() => navigate(`/builder/${r.id}`)} className="btn btn-secondary" style={{ fontSize: '0.85rem', padding: '0.55rem 1rem' }}>
                      <Edit3 size={15} /> Edit Resume
                    </button>
                    <button onClick={() => navigate(`/job-analyzer?resume_id=${r.id}`)} className="btn btn-ai" style={{ fontSize: '0.85rem', padding: '0.55rem 1rem' }}>
                      <Target size={15} /> Tailor for JD
                    </button>
                    <button onClick={() => handleDownloadClick(r)} className="btn btn-primary" style={{ fontSize: '0.85rem', padding: '0.55rem 1rem' }}>
                      <Download size={15} /> PDF (₹29)
                    </button>
                    <button onClick={() => handleDelete(r.id)} className="btn btn-danger" style={{ padding: '0.55rem 0.8rem' }} title="Delete">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 2. Master Resumes Tab Section */}
      {activeTab === 'master' && (
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-display)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem', color: 'var(--text-main)' }}>
            <Layers className="text-indigo-400" size={20} /> Master Resumes ({masterResumes.length})
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
                        Created {formatDateTime(r.created_at)}
                      </span>
                    </div>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '0.35rem' }}>{r.title}</h3>
                    <div style={{ fontSize: '0.8rem', color: '#6366F1', fontWeight: 600, marginBottom: '0.75rem' }}>
                      {TEMPLATE_NAMES[r.template_id] || `Template #${r.template_id}`}
                    </div>
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
                      <button onClick={() => handleDownloadClick(r)} className="btn btn-secondary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }}>
                        <Download size={14} /> PDF
                      </button>
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
      )}

      {/* 3. Tailored Resumes Tab Section */}
      {activeTab === 'tailored' && (
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
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {formatDateTime(r.created_at)}
                    </span>
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
                    <button onClick={() => handleDownloadClick(r)} className="btn btn-primary" style={{ padding: '0.45rem 0.85rem', fontSize: '0.85rem' }}>
                      <Download size={15} /> PDF
                    </button>
                    <button onClick={() => handleDelete(r.id)} className="btn btn-danger" style={{ padding: '0.45rem 0.75rem' }}>
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

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

      {/* Razorpay ₹29 Payment Modal */}
      {showPaymentModal && selectedResumeForPayment && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => {
            setShowPaymentModal(false);
            setSelectedResumeForPayment(null);
          }}
          resume={selectedResumeForPayment}
          onPaymentSuccess={() => {
            executeDownload(selectedResumeForPayment);
          }}
        />
      )}
    </div>
  );
};
