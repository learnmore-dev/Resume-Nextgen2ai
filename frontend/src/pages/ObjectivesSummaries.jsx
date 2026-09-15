import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Copy, Check, BookOpen, Filter, ArrowRight, ShieldCheck, Briefcase, Award, Zap } from 'lucide-react';

const IT_SUMMARY_DATA = [
  {
    domain: 'Artificial Intelligence & ML',
    icon: '🤖',
    experienceLevel: 'Senior / Lead (4-8 Yrs)',
    title: 'Staff AI & LLM Systems Engineer',
    text: 'Innovative Staff AI Engineer with 6+ years of experience architecting production-grade Large Language Model (LLM) pipelines, Retrieval-Augmented Generation (RAG) frameworks, and low-latency semantic search clusters. Proficient in PyTorch, LangChain, vector databases (Pinecone, Milvus), and fine-tuning open-source models (Llama, Mistral). Improved query precision by 42% while reducing token inference costs by 35% across enterprise workloads.'
  },
  {
    domain: 'Artificial Intelligence & ML',
    icon: '🤖',
    experienceLevel: 'Associate (1-3 Yrs)',
    title: 'AI / Machine Learning Engineer',
    text: 'Results-driven Machine Learning Engineer with 2 years of experience developing predictive statistical models, NLP text classifiers, and computer vision algorithms. Skilled in Python, Scikit-learn, TensorFlow, FastAPI microservices, and Docker containerization. Successfully deployed 8 automated inference APIs handling 100,000+ daily requests with 99.9% uptime.'
  },
  {
    domain: 'Full Stack & Web Architecture',
    icon: '💻',
    experienceLevel: 'Lead / Principal (5+ Yrs)',
    title: 'Principal Full Stack Solutions Architect',
    text: 'High-impact Solutions Architect with 8+ years leading cross-functional engineering teams in designing distributed, cloud-native web platforms. Deep mastery of React.js, TypeScript, Node.js, Python/Django, and asynchronous event architectures using Apache Kafka and Redis. Directed the migration of monolithic legacy backends to microservices, unlocking 4x faster release velocity and zero downtime deployments.'
  },
  {
    domain: 'Full Stack & Web Architecture',
    icon: '🐍',
    experienceLevel: 'Mid-Level (2-4 Yrs)',
    title: 'Senior Python Full Stack Engineer',
    text: 'Versatile Python Full Stack Engineer with 3+ years of experience building secure, scalable RESTful microservices with Django and FastAPI alongside dynamic React.js frontends. Adept at PostgreSQL database schema design, query indexing, Docker orchestration, and automated CI/CD workflows in GitHub Actions. Reduced average API latency by 38% for high-volume endpoints.'
  },
  {
    domain: 'Full Stack & Web Architecture',
    icon: '⚛️',
    experienceLevel: 'Associate (1-3 Yrs)',
    title: 'MERN Stack Software Engineer',
    text: 'Proactive Full Stack Engineer proficient in MongoDB, Express.js, React.js, and Node.js. Experienced in designing responsive, accessibility-first component libraries, secure JWT/OAuth 2.0 authentication flows, and state management architectures with Redux Toolkit. Built and maintained 12+ production client web portals.'
  },
  {
    domain: 'Java Enterprise & Microservices',
    icon: '☕',
    experienceLevel: 'Senior Engineer (4-7 Yrs)',
    title: 'Senior Java Backend Microservices Engineer',
    text: 'Senior Backend Engineer with 5 years of experience architecting fault-tolerant, high-throughput microservices using Java 21, Spring Boot 3, Spring Cloud, and Kafka messaging. Expert in database optimization with PostgreSQL/MySQL, Hibernate JPA caching, and resilience engineering with Resilience4j. Successfully handled 5,000+ peak RPS with sub-50ms response times.'
  },
  {
    domain: 'Java Enterprise & Microservices',
    icon: '☕',
    experienceLevel: 'Associate (0-2 Yrs)',
    title: 'Associate Java Software Engineer',
    text: 'Motivated Java Developer with strong foundations in Core Java, Collections, Multithreading, OOP, and Spring Boot REST APIs. Hands-on experience developing modular microservices, writing JUnit unit tests, and integrating React frontends. Solved 450+ algorithmic challenges with a strong focus on clean code and performance.'
  },
  {
    domain: 'Data Analytics & BI',
    icon: '📊',
    experienceLevel: 'Senior / Lead (5+ Yrs)',
    title: 'Lead Data Analytics & BI Architect',
    text: 'Strategic Business Intelligence Lead with 6+ years of experience managing enterprise data warehousing (Snowflake, BigQuery), ETL pipeline orchestration (Airflow, dbt), and executive Power BI/Tableau reporting. Partnered with C-suite stakeholders to identify revenue leakages, translating 50M+ customer event streams into ₹4.2Cr annual cost savings.'
  },
  {
    domain: 'Data Analytics & BI',
    icon: '📊',
    experienceLevel: 'Associate (1-3 Yrs)',
    title: 'Data Analyst & Quantitative Specialist',
    text: 'Analytical Data Analyst with 2 years of experience in data modeling, SQL query optimization, Python statistical modeling, and Power BI dashboarding. Expert at synthesizing complex multi-source datasets into intuitive visual KPIs, streamlining monthly stakeholder reporting time by 55%.'
  },
  {
    domain: 'Cloud Infrastructure & DevOps',
    icon: '☁️',
    experienceLevel: 'Senior / Lead (4-8 Yrs)',
    title: 'Principal Cloud & DevOps Architect',
    text: 'Seasoned Cloud Solutions Architect with 7 years of expertise architecting secure multi-region AWS environments, Kubernetes (EKS) clusters, and automated Terraform Infrastructure as Code (IaC). Certified AWS Solutions Architect Professional with a track record of cutting enterprise cloud expenditures by 32% while sustaining 99.995% service availability.'
  },
  {
    domain: 'Cybersecurity & Governance',
    icon: '🔒',
    experienceLevel: 'Senior / Specialist (3-6 Yrs)',
    title: 'Enterprise Cybersecurity & SOC Specialist',
    text: 'Cybersecurity Specialist experienced in SIEM monitoring (Splunk, Microsoft Sentinel), vulnerability assessment (Qualys, Nessus), and incident containment across cloud and hybrid environments. Instrumental in driving ISO 27001 and SOC 2 Type II compliance audits, remediating critical network attack vectors with zero data breach incidents.'
  },
  {
    domain: 'QA & Test Automation',
    icon: '🧪',
    experienceLevel: 'Senior QA (3-6 Yrs)',
    title: 'Lead QA Automation & SDET Architect',
    text: 'Accomplished SDET with 5 years of experience building scalable test automation frameworks using Selenium WebDriver, Playwright, Python, and Java TestNG. Integrated continuous regression pipelines into GitHub Actions / Jenkins, expanding automated test coverage from 45% to 92% and reducing sprint deployment release cycles by 3 days.'
  }
];

export const ObjectivesSummaries = () => {
  const navigate = useNavigate();
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [copiedIndex, setCopiedIndex] = useState(null);

  const domains = [
    'All', 
    'Artificial Intelligence & ML', 
    'Full Stack & Web Architecture', 
    'Java Enterprise & Microservices', 
    'Data Analytics & BI', 
    'Cloud Infrastructure & DevOps', 
    'Cybersecurity & Governance', 
    'QA & Test Automation'
  ];

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
    <div style={{ background: '#F8FAFC', minHeight: '100vh', paddingBottom: '5rem' }}>
      {/* Hero Banner */}
      <section className="templates-hero-banner" style={{ padding: '50px 24px 55px', marginBottom: '2.5rem' }}>
        <div className="templates-hero-container" style={{ maxWidth: '960px' }}>
          <div className="templates-breadcrumb" style={{ marginBottom: '14px' }}>
            <span onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Home</span>
            <span className="sep">›</span>
            <span className="active">Career Resources</span>
            <span className="sep">›</span>
            <span className="active">Professional Resume Summaries</span>
          </div>

          <h1 className="templates-main-heading" style={{ fontSize: '2.8rem', marginBottom: '12px' }}>
            Enterprise-Grade <span className="highlight-noticed">Resume Summaries</span>
          </h1>

          <p className="templates-hero-desc" style={{ fontSize: '1.05rem', maxWidth: '780px', margin: '0 auto 18px', lineHeight: 1.6 }}>
            Curated, metrics-driven professional summaries tailored for associate engineers, senior tech leads, and solutions architects. Copy directly into your resume with 1 click!
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.14)', padding: '5px 14px', borderRadius: '20px', color: '#E2E8F0', fontSize: '0.82rem' }}>
              <ShieldCheck size={15} color="#34D399" /> 100% ATS Optimized
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.14)', padding: '5px 14px', borderRadius: '20px', color: '#E2E8F0', fontSize: '0.82rem' }}>
              <Sparkles size={15} color="#FBBF24" /> Quantified Impact Metrics
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.14)', padding: '5px 14px', borderRadius: '20px', color: '#E2E8F0', fontSize: '0.82rem' }}>
              <Award size={15} color="#38BDF8" /> 8 Tech Domains
            </span>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 1.5rem' }}>
        
        {/* Domain Filter Pills */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.85rem', color: '#64748B', fontSize: '0.88rem', fontWeight: 700 }}>
            <Filter size={16} /> Filter by Specialization:
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {domains.map(domain => (
              <button
                key={domain}
                onClick={() => setSelectedDomain(domain)}
                style={{
                  background: selectedDomain === domain ? '#0F172A' : '#FFFFFF',
                  color: selectedDomain === domain ? '#FFFFFF' : '#475569',
                  border: '1.5px solid',
                  borderColor: selectedDomain === domain ? '#0F172A' : '#E2E8F0',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontWeight: selectedDomain === domain ? 800 : 600,
                  fontSize: '0.86rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                  boxShadow: selectedDomain === domain ? '0 2px 8px rgba(15,23,42,0.15)' : 'none'
                }}
              >
                {domain}
              </button>
            ))}
          </div>
        </div>

        {/* Summaries Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem' }}>
          {filtered.map((item, idx) => (
            <div
              key={idx}
              style={{
                background: '#FFFFFF',
                borderRadius: '20px',
                border: '1px solid #E2E8F0',
                padding: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
                position: 'relative'
              }}
            >
              <div>
                {/* Header info */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '1.3rem' }}>{item.icon}</span>
                    <span style={{ background: '#EFF6FF', color: '#2563EB', padding: '3px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 700 }}>
                      {item.domain}
                    </span>
                  </div>
                  <span style={{ background: '#F1F5F9', color: '#475569', padding: '3px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600 }}>
                    {item.experienceLevel}
                  </span>
                </div>

                <h3 style={{ margin: '0 0 0.85rem', fontSize: '1.18rem', fontWeight: 800, color: '#0F172A', lineHeight: 1.3 }}>
                  {item.title}
                </h3>

                <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '12px', border: '1px solid #F1F5F9', marginBottom: '1.25rem' }}>
                  <p style={{ margin: 0, fontSize: '0.89rem', color: '#334155', lineHeight: 1.6 }}>
                    "{item.text}"
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #F1F5F9', paddingTop: '1rem' }}>
                <button
                  onClick={() => handleCopy(item.text, idx)}
                  style={{
                    background: copiedIndex === idx ? '#DCFCE7' : '#FFFFFF',
                    color: copiedIndex === idx ? '#166534' : '#0F172A',
                    border: '1.5px solid',
                    borderColor: copiedIndex === idx ? '#86EFAC' : '#CBD5E1',
                    borderRadius: '8px',
                    padding: '7px 14px',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.15s'
                  }}
                >
                  {copiedIndex === idx ? (
                    <>
                      <Check size={15} /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={15} /> Copy Summary
                    </>
                  )}
                </button>

                <button
                  onClick={() => navigate('/templates')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#ee571d',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <span>Use in Builder</span>
                  <ArrowRight size={14} />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div style={{ marginTop: '3.5rem', textAlign: 'center', background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)', borderRadius: '24px', padding: '3rem 2rem', color: '#FFFFFF', boxShadow: '0 10px 30px rgba(15,23,42,0.15)' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: '0 0 0.75rem', color: '#FFFFFF' }}>
            Need an AI Summary Tailored to Your Specific Resume?
          </h2>
          <p style={{ fontSize: '1rem', color: '#94A3B8', margin: '0 auto 1.75rem', maxWidth: '600px', lineHeight: 1.6 }}>
            Our built-in AI will analyze your work experience bullets and instantly generate 3 custom executive summaries tailored to your target job role.
          </p>
          <button 
            onClick={() => navigate('/templates')} 
            style={{ 
              padding: '14px 32px', 
              fontSize: '1.05rem', 
              fontWeight: 800, 
              borderRadius: '10px', 
              background: '#ee571d', 
              color: '#FFFFFF', 
              border: 'none', 
              cursor: 'pointer', 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '10px',
              boxShadow: '0 4px 15px rgba(238,87,29,0.35)'
            }}
          >
            <span>Create My Custom Resume</span>
            <ArrowRight size={20} />
          </button>
        </div>

      </div>
    </div>
  );
};

export default ObjectivesSummaries;
