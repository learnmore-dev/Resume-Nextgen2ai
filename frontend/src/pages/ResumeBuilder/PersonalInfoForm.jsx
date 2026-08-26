import React, { useState } from 'react';
import { resumeApi } from '../../api/resumeApi';
import { Sparkles, Save, Check } from 'lucide-react';

const DOMAIN_SUMMARY_PRESETS = {
  'Software Engineer': {
    fresher: 'Motivated Computer Science graduate with strong fundamentals in algorithms, data structures, and object-oriented programming. Eager to leverage problem-solving skills and hands-on project experience in building scalable web applications.',
    oneYear: 'Results-driven Software Engineer with 1+ year of experience in full-lifecycle software development using React, Node.js, and Python. Proven track record in optimizing backend APIs and delivering clean, maintainable code.',
    threeYears: 'Senior Software Engineer with 3+ years of experience designing high-throughput microservices and cloud architectures. Adept at leading sprint cycles, mentoring junior developers, and driving 35% improvements in system reliability.'
  },
  'Python Full Stack': {
    fresher: 'Full Stack Developer with strong foundations in JavaScript, HTML, CSS, and React.js, and hands-on experience building scalable applications using React, Next.js, Node.js, and PostgreSQL. Experienced in developing RESTful APIs and client–server architectures through internship and full-stack projects. Built AI-powered applications with exposure to Agile development and Git workflows. Solved 500+ DSA problems demonstrating strong problem-solving skills. Collaborative team player eager to learn, take feedback, and grow in fast-paced environments.',
    oneYear: 'Full Stack Developer with strong foundations in JavaScript, HTML, CSS, and React.js, and hands-on experience building scalable applications using React, Next.js, Node.js, and PostgreSQL. Experienced in developing RESTful APIs and client–server architectures through internship and full-stack projects. Built AI-powered applications with exposure to Agile development and Git workflows. Solved 500+ DSA problems demonstrating strong problem-solving skills. Collaborative team player eager to learn, take feedback, and grow in fast-paced environments.',
    threeYears: 'Full Stack Developer with strong foundations in JavaScript, HTML, CSS, and React.js, and hands-on experience building scalable applications using React, Next.js, Node.js, and PostgreSQL. Experienced in developing RESTful APIs and client–server architectures through internship and full-stack projects. Built AI-powered applications with exposure to Agile development and Git workflows. Solved 500+ DSA problems demonstrating strong problem-solving skills. Collaborative team player eager to learn, take feedback, and grow in fast-paced environments.'
  },
  'Java Full Stack': {
    fresher: 'Motivated Java Full Stack Developer skilled in Core Java, Spring Boot, Hibernate, Angular/React, and MySQL. Ready to contribute to enterprise software development.',
    oneYear: 'Java Full Stack Engineer with 1 year of experience building scalable backend microservices using Spring Boot, JPA, and modern React frontends.',
    threeYears: 'Enterprise Java Full Stack Engineer with 3+ years experience building cloud-native microservices with Java 17, Spring Cloud, Kafka, Docker, and MySQL.'
  },
  'Data Analytics': {
    fresher: 'Detail-oriented Data Analyst graduate skilled in Python, SQL, Pandas, Tableau, and statistical modeling. Ready to transform raw datasets into business insights.',
    oneYear: 'Data Analyst with 1 year of experience building automated ETL pipelines, SQL queries, and Power BI dashboards that improved reporting accuracy.',
    threeYears: 'Analytical Data Specialist with 3+ years experience delivering predictive models, Snowflake database analytics, and executive Power BI dashboards.'
  },
  'Full Stack Developer': {
    fresher: 'Enthusiastic Full Stack Developer proficient in JavaScript, React, HTML5/CSS3, and Node.js. Passionate about crafting responsive front-end user experiences.',
    oneYear: 'Detail-oriented Full Stack Developer with 1 year of professional experience building web applications with React, Express, and PostgreSQL.',
    threeYears: 'Accomplished Full Stack Developer with 3+ years of experience engineering scalable web applications and SaaS platforms.'
  },
  'UI/UX Designer': {
    fresher: 'Creative UI/UX Designer with a strong portfolio of user-centered design projects, wireframes, and interactive prototypes. Skilled in Figma.',
    oneYear: 'User Experience Designer with 1 year of experience creating intuitive web and mobile interfaces. Experienced in conducting usability testing.',
    threeYears: 'Product Designer with 3+ years of experience delivering end-to-end design solutions for high-growth tech products.'
  }
};

export const PersonalInfoForm = ({ resume, onUpdate }) => {
  const [formData, setFormData] = useState(resume.personal_info || {
    full_name: '', email: '', phone: '', location: '',
    linkedin_url: '', github_url: '', portfolio_url: '', summary: ''
  });
  const [selectedDomain, setSelectedDomain] = useState('Python Full Stack');
  const [customRoleInput, setCustomRoleInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatingAi, setGeneratingAi] = useState(false);
  const [autofillingFull, setAutofillingFull] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await resumeApi.updatePersonalInfo(resume.id, formData);
      onUpdate();
    } catch (err) {
      console.error('Save failed', err);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyPreset = (text) => {
    setFormData(prev => ({ ...prev, summary: text }));
  };

  const handleGenerateSummary = async () => {
    setGeneratingAi(true);
    try {
      const res = await resumeApi.generateSummary(resume.id, { role: selectedDomain });
      setFormData(prev => ({ ...prev, summary: res.data.summary }));
      onUpdate();
    } catch (err) {
      console.error('AI summary failed', err);
    } finally {
      setGeneratingAi(false);
    }
  };

  const handleFullAutofillRole = async (roleToFill) => {
    const targetRole = roleToFill || customRoleInput || selectedDomain;
    if (!targetRole) return;
    setAutofillingFull(true);
    try {
      const res = await resumeApi.aiAutofillRole(resume.id, {
        role: targetRole,
        experience_level: '3+ Years'
      });
      if (res.data && res.data.personal_info) {
        setFormData(res.data.personal_info);
      }
      onUpdate();
    } catch (e) {
      console.error('Auto fill failed', e);
    } finally {
      setAutofillingFull(false);
    }
  };

  const currentPresets = DOMAIN_SUMMARY_PRESETS[selectedDomain] || DOMAIN_SUMMARY_PRESETS['Python Full Stack'];

  return (
    <form onSubmit={handleSave} className="glass-card" style={{ marginBottom: '1.5rem' }}>
      {/* 🚀 AI 1-Click Role Generator (Python Full Stack, Java Full Stack, Data Analytics, etc.) */}
      <div style={{ marginBottom: '1.5rem', background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)', padding: '1.25rem', borderRadius: '8px', color: '#FFFFFF' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.4rem' }}>
          <Sparkles size={18} color="#F59E0B" />
          <h4 style={{ fontSize: '1rem', fontWeight: '800', margin: 0, color: '#FFFFFF' }}>AI 1-Click Full Resume Generator</h4>
        </div>
        <p style={{ fontSize: '0.82rem', color: '#94A3B8', margin: '0 0 1rem' }}>
          Type any role (e.g. <strong>Python Full Stack</strong>, <strong>Java Full Stack</strong>, <strong>Data Analytics</strong>) to automatically write the summary, skills, experience & projects!
        </p>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <input
            type="text"
            className="form-control"
            style={{ flex: 1, minWidth: '200px', background: '#0F172A', color: '#FFFFFF', border: '1px solid #334155' }}
            placeholder="e.g. Python Full Stack / Java Full Stack / Data Analytics"
            value={customRoleInput}
            onChange={(e) => setCustomRoleInput(e.target.value)}
          />
          <button
            type="button"
            onClick={() => handleFullAutofillRole(customRoleInput)}
            disabled={autofillingFull}
            className="btn btn-ai"
            style={{ padding: '0.55rem 1.2rem', fontSize: '0.88rem', fontWeight: '700' }}
          >
            <Sparkles size={16} /> {autofillingFull ? 'Generating Full Resume...' : 'Auto-Generate Resume'}
          </button>
        </div>

        {/* Quick Click Badges */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '0.8rem' }}>
          {['Python Full Stack', 'Java Full Stack', 'Data Analytics', 'UI/UX Designer'].map(quickRole => (
            <button
              key={quickRole}
              type="button"
              onClick={() => { setCustomRoleInput(quickRole); setSelectedDomain(quickRole); handleFullAutofillRole(quickRole); }}
              style={{
                background: 'rgba(255,255,255,0.1)',
                color: '#F3F4F6',
                border: '1px solid rgba(255,255,255,0.2)',
                padding: '4px 10px',
                borderRadius: '4px',
                fontSize: '0.78rem',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              + {quickRole}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem' }}>Personal Information</h3>
        <button type="submit" className="btn btn-secondary" style={{ fontSize: '0.85rem' }} disabled={loading}>
          <Save size={15} /> {loading ? 'Saving...' : 'Save Info'}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div className="form-group">
          <label>Full Name</label>
          <input type="text" name="full_name" className="form-control" value={formData.full_name || ''} onChange={handleChange} placeholder="Rahul Sharma" />
        </div>
        <div className="form-group">
          <label>Email Address</label>
          <input type="email" name="email" className="form-control" value={formData.email || ''} onChange={handleChange} placeholder="rahul@example.com" />
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input type="text" name="phone" className="form-control" value={formData.phone || ''} onChange={handleChange} placeholder="+91 9876543210" />
        </div>
        <div className="form-group">
          <label>Location</label>
          <input type="text" name="location" className="form-control" value={formData.location || ''} onChange={handleChange} placeholder="Bangalore, India" />
        </div>
        <div className="form-group">
          <label>LinkedIn URL</label>
          <input type="url" name="linkedin_url" className="form-control" value={formData.linkedin_url || ''} onChange={handleChange} placeholder="https://linkedin.com/in/rahul" />
        </div>
        <div className="form-group">
          <label>GitHub URL</label>
          <input type="url" name="github_url" className="form-control" value={formData.github_url || ''} onChange={handleChange} placeholder="https://github.com/rahul" />
        </div>
        <div className="form-group" style={{ gridColumn: 'span 2' }}>
          <label>Portfolio URL <small style={{ color: '#64748B', fontWeight: 'normal' }}>(Optional — only shown if provided)</small></label>
          <input type="url" name="portfolio_url" className="form-control" value={formData.portfolio_url || ''} onChange={handleChange} placeholder="https://yourportfolio.com (Leave blank if none)" />
        </div>
      </div>

      {/* Auto Professional Summary Presets Section */}
      <div style={{ marginTop: '1.5rem', background: '#F8FAFC', padding: '1.2rem', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#0F172A', margin: 0 }}>Select Target Domain for Auto-Summary</h4>
            <p style={{ fontSize: '0.8rem', color: '#64748B', margin: '2px 0 0' }}>Choose your role to load 3 tailored summary options based on your experience level.</p>
          </div>
          <select
            value={selectedDomain}
            onChange={(e) => setSelectedDomain(e.target.value)}
            style={{ padding: '0.4rem 0.8rem', borderRadius: '6px', border: '1px solid #CBD5E1', background: '#FFFFFF', fontSize: '0.85rem', fontWeight: '600', color: '#0F172A' }}
          >
            {Object.keys(DOMAIN_SUMMARY_PRESETS).map(domain => (
              <option key={domain} value={domain}>{domain}</option>
            ))}
          </select>
        </div>

        {/* 3 Summary Experience Preset Options */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '1.2rem' }}>
          {/* Option 1: Fresher */}
          <div
            onClick={() => handleApplyPreset(currentPresets.fresher)}
            style={{
              padding: '0.85rem',
              background: '#FFFFFF',
              border: formData.summary === currentPresets.fresher ? '2px solid #2563EB' : '1px solid #E2E8F0',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <div style={{ fontSize: '0.8rem', fontWeight: '800', color: '#2563EB', textTransform: 'uppercase', marginBottom: '4px' }}>
              🎓 Fresher (0 Yrs)
            </div>
            <p style={{ fontSize: '0.78rem', color: '#475569', margin: 0, lineHeight: '1.4', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {currentPresets.fresher}
            </p>
          </div>

          {/* Option 2: 1 Year Exp */}
          <div
            onClick={() => handleApplyPreset(currentPresets.oneYear)}
            style={{
              padding: '0.85rem',
              background: '#FFFFFF',
              border: formData.summary === currentPresets.oneYear ? '2px solid #2563EB' : '1px solid #E2E8F0',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <div style={{ fontSize: '0.8rem', fontWeight: '800', color: '#059669', textTransform: 'uppercase', marginBottom: '4px' }}>
              💼 1 Year Experience
            </div>
            <p style={{ fontSize: '0.78rem', color: '#475569', margin: 0, lineHeight: '1.4', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {currentPresets.oneYear}
            </p>
          </div>

          {/* Option 3: 3+ Years Exp */}
          <div
            onClick={() => handleApplyPreset(currentPresets.threeYears)}
            style={{
              padding: '0.85rem',
              background: '#FFFFFF',
              border: formData.summary === currentPresets.threeYears ? '2px solid #2563EB' : '1px solid #E2E8F0',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <div style={{ fontSize: '0.8rem', fontWeight: '800', color: '#7C3AED', textTransform: 'uppercase', marginBottom: '4px' }}>
              🚀 3+ Years Experience
            </div>
            <p style={{ fontSize: '0.78rem', color: '#475569', margin: 0, lineHeight: '1.4', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {currentPresets.threeYears}
            </p>
          </div>
        </div>

        {/* Textarea for summary */}
        <div className="form-group" style={{ margin: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: '700' }}>Active Professional Summary</label>
            <button type="button" onClick={handleGenerateSummary} className="btn btn-ai" style={{ fontSize: '0.8rem', padding: '0.3rem 0.7rem' }} disabled={generatingAi}>
              <Sparkles size={14} /> {generatingAi ? 'Generating...' : 'AI Custom Generate'}
            </button>
          </div>
          <textarea
            name="summary"
            className="form-control"
            rows={3}
            value={formData.summary || ''}
            onChange={handleChange}
            placeholder="Selected summary preset text will appear here..."
          />
        </div>
      </div>
    </form>
  );
};
