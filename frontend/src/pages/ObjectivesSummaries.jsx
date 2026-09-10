import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Copy, Check, BookOpen, Filter, ArrowRight, ShieldCheck } from 'lucide-react';

const IT_SUMMARY_DATA = [
  {
    domain: 'Data Analytics',
    icon: '📊',
    experienceLevel: 'Fresher (0 Yrs)',
    title: 'Data Analytics Fresher Summary',
    text: 'Detail-oriented Data Analytics Fresher with strong foundations in Python, SQL, Advanced Excel, Power BI, and Exploratory Data Analysis (EDA). Skilled in data cleaning, data preprocessing, statistical modeling, and designing interactive dashboards to convert raw datasets into actionable business insights. Solved 100+ real-world analytical problems with a strong problem-solving mindset.'
  },
  {
    domain: 'Data Analytics',
    icon: '📊',
    experienceLevel: '1-3 Years',
    title: 'Junior Data Analyst Summary',
    text: 'Results-driven Data Analyst with 2 years of experience in data modeling, SQL query optimization, ETL pipeline development, and executive Power BI dashboards. Adept at identifying revenue trends, customer segmentation, and automated KPI reporting to support strategic business decisions.'
  },
  {
    domain: 'Data Analytics',
    icon: '📊',
    experienceLevel: '5+ Years',
    title: 'Senior Data Analyst / BI Lead Summary',
    text: 'Senior Data Analyst with 5+ years of experience leading cross-functional business intelligence initiatives, data warehousing architectures, and predictive analytics. Proven track record of improving reporting efficiency by 60% and delivering scalable analytics solutions for enterprise stakeholders.'
  },
  {
    domain: 'Python Full Stack',
    icon: '🐍',
    experienceLevel: 'Fresher (0 Yrs)',
    title: 'Python Full Stack Fresher Summary',
    text: 'Enthusiastic Python Full Stack Developer with hands-on expertise in Python, Django, REST APIs, React.js, and PostgreSQL. Solved 400+ DSA problems with strong knowledge of OOPs and client-server architectures. Passionate about building robust, scalable web applications.'
  },
  {
    domain: 'Python Full Stack',
    icon: '🐍',
    experienceLevel: '1-3 Years',
    title: 'Python Developer Summary',
    text: 'Full Stack Python Developer with 2+ years of experience engineering secure RESTful microservices with Django / FastAPI and building dynamic React frontends. Proficient in database schema design with PostgreSQL, Docker containerization, and Git CI/CD workflows.'
  },
  {
    domain: 'Java Full Stack',
    icon: '☕',
    experienceLevel: 'Fresher (0 Yrs)',
    title: 'Java Full Stack Fresher Summary',
    text: 'Motivated Java Full Stack Developer with solid fundamentals in Core Java, Collections, OOP, Data Structures & Algorithms, and Spring Boot. Hands-on experience developing REST APIs and modern React frontends. Solved 400+ DSA problems and eager to contribute to enterprise-scale applications.'
  },
  {
    domain: 'Java Full Stack',
    icon: '☕',
    experienceLevel: '3-5 Years',
    title: 'Java Full Stack Engineer Summary',
    text: 'High-performing Java Full Stack Engineer with 4 years of experience architecting fault-tolerant microservices using Spring Boot, Spring Security, Kafka messaging, and React.js. Experienced in MySQL indexing, Hibernate JPA optimization, and cloud deployments.'
  },
  {
    domain: 'MERN Stack',
    icon: '⚛️',
    experienceLevel: 'Fresher / Junior',
    title: 'MERN Stack Developer Summary',
    text: 'MERN Stack Developer with solid fundamentals in MongoDB, Express.js, React.js, and Node.js. Skilled in developing responsive user interfaces, designing RESTful APIs, and implementing secure JWT authentication. Passionate about full-stack web development.'
  },
  {
    domain: 'DevOps & Cloud',
    icon: '☁️',
    experienceLevel: '1-3 Years',
    title: 'DevOps & Cloud Engineer Summary',
    text: 'Automation-focused DevOps Engineer with hands-on expertise in Linux administration, Docker containerization, Kubernetes cluster management, CI/CD pipeline automation (GitHub Actions / Jenkins), and AWS cloud infrastructure provisioning with Terraform.'
  },
  {
    domain: 'Cyber Security',
    icon: '🔒',
    experienceLevel: 'Fresher / Associate',
    title: 'SOC & Cyber Security Analyst Summary',
    text: 'Dedicated Cyber Security Analyst with knowledge of SIEM tools (Splunk), network intrusion detection (Snort, Wireshark), vulnerability assessment (Nessus), and incident triage. Committed to safeguarding organizational digital assets following NIST security frameworks.'
  },
  {
    domain: 'QA Automation',
    icon: '🧪',
    experienceLevel: '1-3 Years',
    title: 'QA Automation Engineer Summary',
    text: 'Detail-oriented QA Automation Engineer skilled in Selenium WebDriver, Python / Java, PyTest, TestNG, and REST API verification with Postman. Experienced in building Page Object Model (POM) frameworks and integrating automated regression test suites into CI/CD pipelines.'
  }
];

export const ObjectivesSummaries = () => {
  const navigate = useNavigate();
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [copiedIndex, setCopiedIndex] = useState(null);

  const domains = ['All', 'Data Analytics', 'Python Full Stack', 'Java Full Stack', 'MERN Stack', 'DevOps & Cloud', 'Cyber Security', 'QA Automation'];

  const filtered = IT_SUMMARY_DATA.filter(item => {
    if (selectedDomain === 'All') return true;
    return item.domain === selectedDomain;
  });

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh', paddingBottom: '4rem' }}>
      {/* Hero Banner */}
      <section className="templates-hero-banner" style={{ padding: '45px 24px 50px', marginBottom: '2rem' }}>
        <div className="templates-hero-container" style={{ maxWidth: '900px' }}>
          <div className="templates-breadcrumb" style={{ marginBottom: '14px' }}>
            <span onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Home</span>
            <span className="sep">›</span>
            <span className="active">Resume Objectives & Summaries</span>
          </div>

          <h1 className="templates-main-heading" style={{ fontSize: '2.8rem', marginBottom: '10px' }}>
            Professional Resume <span className="highlight-noticed">Objectives & Summaries</span>
          </h1>

          <p className="templates-hero-desc" style={{ fontSize: '1rem', maxWidth: '720px', margin: '0 auto 20px' }}>
            Browse industry-proven, ATS-optimized professional summaries tailored for freshers, junior developers, and senior engineers across top IT domains. 1-Click Copy & Paste directly into your resume!
          </p>

          <div className="templates-trust-badges" style={{ margin: '0' }}>
            <span className="trust-item"><Sparkles size={16} color="#38BDF8" /> 100% ATS Optimized</span>
            <span className="trust-dot">•</span>
            <span className="trust-item">1-Click Copy</span>
            <span className="trust-dot">•</span>
            <span className="trust-item">All IT Domains</span>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '2rem', justifyContent: 'center' }}>
          {domains.map(d => (
            <button
              key={d}
              onClick={() => setSelectedDomain(d)}
              style={{
                padding: '7px 16px',
                borderRadius: '20px',
                border: '1.5px solid #CBD5E1',
                background: selectedDomain === d ? '#2563EB' : '#FFFFFF',
                color: selectedDomain === d ? '#FFFFFF' : '#334155',
                fontSize: '0.85rem',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: selectedDomain === d ? '0 4px 12px rgba(37,99,235,0.25)' : 'none'
              }}
            >
              {d}
            </button>
          ))}
        </div>

        {/* Summaries Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(480px, 1fr))', gap: '1.5rem' }}>
          {filtered.map((item, idx) => (
            <div key={idx} className="glass-card" style={{ background: '#FFFFFF', border: '1.5px solid #BFDBFE', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 4px 15px rgba(37,99,235,0.06)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '1.25rem' }}>{item.icon}</span>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: '800', color: '#0F172A' }}>{item.title}</h4>
                      <span style={{ fontSize: '0.75rem', color: '#2563EB', fontWeight: '700' }}>{item.experienceLevel}</span>
                    </div>
                  </div>
                  <span style={{ fontSize: '0.72rem', background: '#EFF6FF', color: '#1E40AF', padding: '2px 8px', borderRadius: '4px', fontWeight: '700' }}>
                    {item.domain}
                  </span>
                </div>

                <p style={{ fontSize: '0.86rem', color: '#334155', lineHeight: '1.6', margin: '0 0 1rem', background: '#F8FAFC', padding: '1rem', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                  "{item.text}"
                </p>
              </div>

              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', alignItems: 'center' }}>
                <button
                  onClick={() => handleCopy(item.text, idx)}
                  className="btn btn-secondary"
                  style={{ fontSize: '0.82rem', padding: '0.45rem 0.9rem', display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: '700' }}
                >
                  {copiedIndex === idx ? (
                    <>
                      <Check size={14} color="#16A34A" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={14} /> Copy Summary
                    </>
                  )}
                </button>
                <button
                  onClick={() => navigate('/templates')}
                  className="btn btn-primary"
                  style={{ fontSize: '0.82rem', padding: '0.45rem 0.9rem', fontWeight: '700' }}
                >
                  Use in Resume ↗
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ObjectivesSummaries;
