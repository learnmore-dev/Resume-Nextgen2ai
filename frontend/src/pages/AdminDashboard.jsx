import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, Layers, CreditCard, Search, RefreshCw, 
  Clock, Calendar, CheckCircle2, ExternalLink, ShieldCheck, 
  ArrowLeft, FileText, ChevronRight, X, AlertCircle 
} from 'lucide-react';
import { adminApi } from '../api/resumeApi';
import { useAuth } from '../context/AuthContext';
import { UserAvatar } from '../components/UserAvatar';

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [overview, setOverview] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [overviewRes, usersRes] = await Promise.all([
        adminApi.getOverview(),
        adminApi.getUsers()
      ]);
      setOverview(overviewRes.data);
      setUsers(usersRes.data);
    } catch (err) {
      console.error('Failed to load admin data', err);
      setError('Failed to fetch admin overview and user directory.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredUsers = users.filter(u => {
    const matchesSearch = 
      (u.name && u.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (u.email && u.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (u.username && u.username.toLowerCase().includes(searchTerm.toLowerCase()));

    if (!matchesSearch) return false;

    if (filterType === 'with_resumes') return u.resumes_count > 0;
    if (filterType === 'paid') return u.total_paid_inr > 0;
    return true;
  });

  const formatDate = (isoString) => {
    if (!isoString) return 'Never';
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

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC', padding: '2.5rem 1.5rem' }}>
      <div style={{ maxWidth: '1320px', margin: '0 auto' }}>
        
        {/* Top Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.35rem' }}>
              <button 
                onClick={() => navigate('/dashboard')}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  padding: '6px 10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.85rem',
                  color: '#64748B',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                <ArrowLeft size={16} /> User Dashboard
              </button>
              <span style={{ 
                background: '#EEF2FF', 
                color: '#4F46E5', 
                fontSize: '0.75rem', 
                fontWeight: 700, 
                padding: '4px 10px', 
                borderRadius: '20px',
                border: '1px solid #C7D2FE',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}>
                <ShieldCheck size={14} /> NextGen Admin Control
              </span>
            </div>
            <h1 style={{ margin: 0, fontSize: '2rem', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em' }}>
              Admin Dashboard & User Registry
            </h1>
            <p style={{ margin: '0.35rem 0 0', color: '#64748B', fontSize: '0.92rem' }}>
              Real-time directory of all signed-up users, Google account credentials, and template creation history.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={fetchData}
              disabled={loading}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: '#FFFFFF',
                border: '1.5px solid #CBD5E1',
                padding: '0.65rem 1.1rem',
                borderRadius: '10px',
                fontSize: '0.88rem',
                fontWeight: 600,
                color: '#334155',
                cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
              }}
            >
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
              {loading ? 'Refreshing...' : 'Refresh Data'}
            </button>
          </div>
        </div>

        {error && (
          <div style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', color: '#DC2626', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        {/* 4 Metric KPI Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
          {/* Card 1: Total Users */}
          <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '1.5rem', border: '1px solid #E2E8F0', boxShadow: '0 2px 4px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Total Registered Users
              </span>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4F46E5' }}>
                <Users size={20} />
              </div>
            </div>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0F172A', lineHeight: 1 }}>
              {overview ? overview.total_users : '...'}
            </div>
            <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: '#10B981', fontWeight: 600 }}>
              +{overview ? overview.today_signups : 0} signed up today
            </div>
          </div>

          {/* Card 2: Total Resumes / Templates */}
          <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '1.5rem', border: '1px solid #E2E8F0', boxShadow: '0 2px 4px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Templates Created
              </span>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#F0FDF4', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#16A34A' }}>
                <Layers size={20} />
              </div>
            </div>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0F172A', lineHeight: 1 }}>
              {overview ? overview.total_resumes : '...'}
            </div>
            <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: '#10B981', fontWeight: 600 }}>
              +{overview ? overview.today_resumes : 0} created today
            </div>
          </div>

          {/* Card 3: Razorpay Paid Orders */}
          <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '1.5rem', border: '1px solid #E2E8F0', boxShadow: '0 2px 4px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Razorpay Orders (₹29)
              </span>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#FFF7ED', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#EA580C' }}>
                <CreditCard size={20} />
              </div>
            </div>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0F172A', lineHeight: 1 }}>
              {overview ? overview.total_paid_orders : '...'}
            </div>
            <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: '#EA580C', fontWeight: 600 }}>
              Verified Unlock Downloads
            </div>
          </div>

          {/* Card 4: Total Revenue */}
          <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '1.5rem', border: '1px solid #E2E8F0', boxShadow: '0 2px 4px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Total Revenue Collected
              </span>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#FAF5FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9333EA' }}>
                <span style={{ fontSize: '1.2rem', fontWeight: 800 }}>₹</span>
              </div>
            </div>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0F172A', lineHeight: 1 }}>
              ₹{overview ? overview.total_revenue_inr : '0'}
            </div>
            <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: '#9333EA', fontWeight: 600 }}>
              Direct Razorpay Bank Settlements
            </div>
          </div>
        </div>

        {/* User Registry Table Section */}
        <div style={{ background: '#FFFFFF', borderRadius: '20px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)', overflow: 'hidden' }}>
          
          {/* Table Controls */}
          <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#0F172A' }}>
                Registered Users Directory ({filteredUsers.length})
              </h3>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              {/* Filter Tabs */}
              <div style={{ display: 'flex', background: '#F1F5F9', padding: '4px', borderRadius: '10px' }}>
                <button
                  onClick={() => setFilterType('all')}
                  style={{
                    background: filterType === 'all' ? '#FFFFFF' : 'transparent',
                    color: filterType === 'all' ? '#0F172A' : '#64748B',
                    border: 'none',
                    padding: '6px 14px',
                    borderRadius: '8px',
                    fontWeight: 700,
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                    boxShadow: filterType === 'all' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                  }}
                >
                  All Users
                </button>
                <button
                  onClick={() => setFilterType('with_resumes')}
                  style={{
                    background: filterType === 'with_resumes' ? '#FFFFFF' : 'transparent',
                    color: filterType === 'with_resumes' ? '#0F172A' : '#64748B',
                    border: 'none',
                    padding: '6px 14px',
                    borderRadius: '8px',
                    fontWeight: 700,
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                    boxShadow: filterType === 'with_resumes' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                  }}
                >
                  With Templates
                </button>
                <button
                  onClick={() => setFilterType('paid')}
                  style={{
                    background: filterType === 'paid' ? '#FFFFFF' : 'transparent',
                    color: filterType === 'paid' ? '#0F172A' : '#64748B',
                    border: 'none',
                    padding: '6px 14px',
                    borderRadius: '8px',
                    fontWeight: 700,
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                    boxShadow: filterType === 'paid' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                  }}
                >
                  Paid Customers
                </button>
              </div>

              {/* Search Bar */}
              <div style={{ position: 'relative', minWidth: '260px' }}>
                <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px 8px 36px',
                    borderRadius: '10px',
                    border: '1.5px solid #CBD5E1',
                    fontSize: '0.85rem',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Table List */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#64748B', fontWeight: 700, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  <th style={{ padding: '14px 20px' }}>User Details</th>
                  <th style={{ padding: '14px 20px' }}>Email Address</th>
                  <th style={{ padding: '14px 20px' }}>Signup Date & Time</th>
                  <th style={{ padding: '14px 20px' }}>Last Login</th>
                  <th style={{ padding: '14px 20px' }}>Templates Built</th>
                  <th style={{ padding: '14px 20px' }}>Revenue (₹)</th>
                  <th style={{ padding: '14px 20px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="7" style={{ textAlign: 'center', padding: '3rem', color: '#94A3B8' }}>
                      No registered users found matching your filters.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((u) => (
                    <tr 
                      key={u.id} 
                      style={{ 
                        borderBottom: '1px solid #F1F5F9',
                        transition: 'background 0.15s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F8FAFC'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      {/* User Avatar & Name */}
                      <td style={{ padding: '14px 20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <UserAvatar 
                            src={u.avatar} 
                            name={u.name} 
                            size={38} 
                            border="1.5px solid #E2E8F0"
                          />
                          <div>
                            <div style={{ fontWeight: 700, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <span>{u.name}</span>
                              <span style={{ fontSize: '0.68rem', background: '#DCFCE7', color: '#166534', padding: '1px 6px', borderRadius: '6px', fontWeight: 700 }}>
                                Google
                              </span>
                            </div>
                            <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>ID #{u.id} • {u.username}</div>
                          </div>
                        </div>
                      </td>

                      {/* Email */}
                      <td style={{ padding: '14px 20px', color: '#334155', fontWeight: 600 }}>
                        {u.email}
                      </td>

                      {/* Signup Date */}
                      <td style={{ padding: '14px 20px', color: '#64748B', whiteSpace: 'nowrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Calendar size={14} color="#94A3B8" />
                          <span>{formatDate(u.date_joined)}</span>
                        </div>
                      </td>

                      {/* Last Login */}
                      <td style={{ padding: '14px 20px', color: '#64748B', whiteSpace: 'nowrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Clock size={14} color="#94A3B8" />
                          <span>{formatDate(u.last_login)}</span>
                        </div>
                      </td>

                      {/* Templates Created */}
                      <td style={{ padding: '14px 20px' }}>
                        <span style={{ 
                          background: u.resumes_count > 0 ? '#EEF2FF' : '#F1F5F9',
                          color: u.resumes_count > 0 ? '#4F46E5' : '#64748B',
                          padding: '4px 10px',
                          borderRadius: '12px',
                          fontWeight: 700,
                          fontSize: '0.82rem'
                        }}>
                          {u.resumes_count} {u.resumes_count === 1 ? 'Template' : 'Templates'}
                        </span>
                      </td>

                      {/* Revenue Paid */}
                      <td style={{ padding: '14px 20px' }}>
                        <span style={{ 
                          fontWeight: 700,
                          color: u.total_paid_inr > 0 ? '#16A34A' : '#94A3B8',
                          fontSize: '0.9rem'
                        }}>
                          ₹{u.total_paid_inr.toFixed(2)}
                        </span>
                      </td>

                      {/* Action */}
                      <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                        <button
                          onClick={() => setSelectedUser(u)}
                          style={{
                            background: '#F1F5F9',
                            border: '1px solid #E2E8F0',
                            padding: '6px 12px',
                            borderRadius: '8px',
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            color: '#334155',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          View History <ChevronRight size={14} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal: Detailed User Template History */}
        {selectedUser && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.7)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 99999,
            padding: '1rem'
          }}>
            <div style={{
              background: '#FFFFFF',
              borderRadius: '20px',
              maxWidth: '680px',
              width: '100%',
              maxHeight: '85vh',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
            }}>
              {/* Modal Header */}
              <div style={{ padding: '1.5rem 1.75rem', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <UserAvatar 
                    src={selectedUser.avatar} 
                    name={selectedUser.name} 
                    size={44} 
                    border="1.5px solid #E2E8F0"
                  />
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#0F172A' }}>
                      {selectedUser.name}
                    </h3>
                    <p style={{ margin: 0, fontSize: '0.82rem', color: '#64748B' }}>
                      {selectedUser.email} • Joined {formatDate(selectedUser.date_joined)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedUser(null)}
                  style={{ background: '#F1F5F9', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#64748B' }}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Body: Template History */}
              <div style={{ padding: '1.5rem 1.75rem', overflowY: 'auto', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: '#1E293B' }}>
                    Created Resumes & Templates ({selectedUser.resumes.length})
                  </h4>
                  <span style={{ fontSize: '0.8rem', color: '#64748B' }}>
                    Total Razorpay Paid: <strong>₹{selectedUser.total_paid_inr.toFixed(2)}</strong>
                  </span>
                </div>

                {selectedUser.resumes.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '2.5rem', background: '#F8FAFC', borderRadius: '12px', color: '#94A3B8' }}>
                    <FileText size={36} style={{ marginBottom: '0.5rem', opacity: 0.5 }} />
                    <p style={{ margin: 0, fontSize: '0.9rem' }}>This user has not created any templates yet.</p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    {selectedUser.resumes.map((r) => (
                      <div 
                        key={r.id} 
                        style={{
                          background: '#F8FAFC',
                          border: '1px solid #E2E8F0',
                          borderRadius: '12px',
                          padding: '1rem 1.25rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '1rem'
                        }}
                      >
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                            <span style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0F172A' }}>
                              {r.title}
                            </span>
                            <span style={{ fontSize: '0.72rem', background: '#EEF2FF', color: '#4F46E5', padding: '2px 8px', borderRadius: '8px', fontWeight: 700 }}>
                              {r.template_name}
                            </span>
                            {r.is_master && (
                              <span style={{ fontSize: '0.72rem', background: '#FEF3C7', color: '#B45309', padding: '2px 8px', borderRadius: '8px', fontWeight: 700 }}>
                                Master Base
                              </span>
                            )}
                          </div>
                          <div style={{ fontSize: '0.78rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <span>Created: <strong>{formatDate(r.created_at)}</strong></span>
                            <span>Updated: <strong>{formatDate(r.updated_at)}</strong></span>
                          </div>
                        </div>

                        <div>
                          {r.is_paid ? (
                            <span style={{ fontSize: '0.75rem', background: '#DCFCE7', color: '#15803D', padding: '4px 10px', borderRadius: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <CheckCircle2 size={12} /> Paid ₹29
                            </span>
                          ) : (
                            <span style={{ fontSize: '0.75rem', background: '#F1F5F9', color: '#64748B', padding: '4px 10px', borderRadius: '12px', fontWeight: 600 }}>
                              Free Draft
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div style={{ padding: '1rem 1.75rem', borderTop: '1px solid #E2E8F0', background: '#F8FAFC', display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => setSelectedUser(null)}
                  style={{
                    background: '#0F172A',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '8px 18px',
                    borderRadius: '8px',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer'
                  }}
                >
                  Close Audit
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;
