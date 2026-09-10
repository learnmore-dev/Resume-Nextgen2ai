import React, { useState } from 'react';
import { resumeApi } from '../../api/resumeApi';
import { Sparkles, Save, Check } from 'lucide-react';
import { DomainSelectDropdown } from './DomainSelectDropdown';

const IT_COURSE_DOMAINS = [
  { value: 'Data Analytics', label: '📊 Data Analytics (Python, SQL, Power BI, Excel)' },
  { value: 'Python Full Stack', label: '🐍 Python Full Stack (Django, React, PostgreSQL)' },
  { value: 'Java Full Stack', label: '☕ Java Full Stack (Spring Boot, React, MySQL)' },
  { value: 'MERN Stack Developer', label: '⚛️ MERN Stack (MongoDB, Express, React, Node.js)' },
  { value: 'Data Science & Machine Learning', label: '🤖 Data Science & ML (Python, Scikit-Learn, TensorFlow)' },
  { value: 'DevOps & Cloud Engineer', label: '☁️ DevOps & Cloud (AWS, Docker, Kubernetes, CI/CD)' },
  { value: 'Software Engineer', label: '💻 Software Engineer (DSA, OOP, System Design)' },
  { value: 'Cyber Security Analyst', label: '🛡️ Cyber Security & SOC Analyst (SIEM, Splunk, Network)' },
  { value: 'QA Automation Engineer', label: '🧪 QA Automation Tester (Selenium, PyTest, TestNG)' },
  { value: 'UI/UX Designer', label: '🎨 UI/UX & Product Designer (Figma, Wireframing, UX)' },
  { value: 'Mobile App Developer', label: '📱 Mobile App Developer (Flutter, React Native)' },
  { value: 'Business Analyst', label: '📈 Business Analyst (SQL, Agile/Scrum, JIRA, Power BI)' }
];

const EXPERIENCE_OPTIONS = [
  { id: 'fresher', label: '🎓 Fresher (0 Yrs)', years: 'Fresher' },
  { id: 'sixMonths', label: '🌱 6 Months (Intern/Trainee)', years: '6 Months' },
  { id: 'oneYear', label: '💼 1 Year Experience', years: '1 Year' },
  { id: 'threeYears', label: '🚀 3 Years Experience', years: '3 Years' },
  { id: 'fiveYears', label: '⭐ 5 Years Experience', years: '5 Years' },
  { id: 'tenYears', label: '👑 10+ Years (Lead/Principal)', years: '10+ Years' },
];

const DOMAIN_SUMMARY_PRESETS = {
  'Data Analytics': {
    fresher: 'Data Analytics Fresher with a strong foundation in Python, SQL, Excel, Power BI, and data visualization. Skilled in data cleaning, data preprocessing, exploratory data analysis (EDA), statistical analysis, and creating interactive dashboards to derive meaningful business insights. Hands-on experience working with real-world datasets and converting raw data into actionable insights.',
    sixMonths: 'Data Analyst Trainee / Intern with 6 months of hands-on experience in SQL querying, exploratory data analysis, and building business intelligence dashboards using Power BI and Excel.',
    oneYear: 'Results-driven Data Analyst with 1+ year of professional experience in SQL data querying, creating executive Power BI dashboards, and developing automated Python ETL pipelines to derive actionable business insights.',
    threeYears: 'Senior Data Analyst with 3+ years of experience in business intelligence, advanced SQL warehousing, predictive analytics, and delivering cross-functional insights that drive strategic business decisions.',
    fiveYears: 'Lead Data Analyst with 5+ years of experience spearheading enterprise BI initiatives, predictive analytics architectures, and cross-functional reporting pipelines for executive leadership.',
    tenYears: 'Principal Data Analytics Director with 10+ years of experience architecting enterprise data strategies, machine learning analytics, and leading high-performing business intelligence teams.'
  },
  'Python Full Stack': {
    fresher: 'Full Stack Developer with strong foundations in JavaScript, HTML, CSS, and React.js, and hands-on experience building scalable applications using React, Next.js, Node.js, and PostgreSQL. Experienced in developing RESTful APIs and client–server architectures through internship and full-stack projects. Built AI-powered applications with exposure to Agile development and Git workflows.',
    sixMonths: 'Python Full Stack Developer Intern with 6 months experience assisting in REST API development with Django/FastAPI and building responsive user interfaces in React.js.',
    oneYear: 'Python Full Stack Developer with 1+ year of experience in building scalable web applications using Django, React.js, and PostgreSQL. Skilled in REST API design, frontend state management, and cloud deployments.',
    threeYears: 'Senior Python Full Stack Engineer with 3+ years of experience architecting high-traffic distributed web applications with FastAPI, Django, React, Docker, and PostgreSQL.',
    fiveYears: 'Lead Python Full Stack Architect with 5+ years of experience designing fault-tolerant microservices, cloud deployments on AWS, and mentoring engineering teams.',
    tenYears: 'Principal Software Architect with 10+ years of experience leading full-stack engineering organizations, distributed system designs, and large-scale digital transformations.'
  },
  'Java Full Stack': {
    fresher: 'Motivated Java Full Stack Developer with strong foundations in Core Java, Object-Oriented Programming (OOP), Data Structures & Algorithms, and Spring Boot. Hands-on experience building full-stack web applications with Spring Boot REST APIs and modern React frontends.',
    sixMonths: 'Java Developer Trainee with 6 months experience in Core Java, Spring Boot microservices, and frontend integration using React/Angular.',
    oneYear: 'Java Full Stack Developer with 1+ year of experience developing enterprise microservices using Spring Boot, Hibernate, REST APIs, and React/Angular.',
    threeYears: 'Enterprise Java Full Stack Engineer with 3+ years of experience designing high-performance distributed systems with Java 17, Spring Cloud, Kafka, Docker, and MySQL.',
    fiveYears: 'Staff Java Software Engineer with 5+ years of experience architecting mission-critical financial and enterprise microservices platforms.',
    tenYears: 'Principal Java Architect with 10+ years of experience leading enterprise software engineering, high-throughput distributed architectures, and cloud migrations.'
  },
  'MERN Stack Developer': {
    fresher: 'MERN Stack Developer with solid fundamentals in MongoDB, Express.js, React.js, and Node.js. Skilled in developing responsive user interfaces, designing RESTful APIs, and implementing JWT authentication.',
    sixMonths: 'MERN Stack Intern with 6 months experience creating full-stack components, building Express APIs, and managing MongoDB databases.',
    oneYear: 'MERN Stack Developer with 1+ year of experience building scalable single-page web applications using React.js, Node.js, and MongoDB.',
    threeYears: 'Senior Full Stack Engineer with 3+ years of experience building high-scale Single Page Applications with Next.js, React, Node.js, and MongoDB.',
    fiveYears: 'Lead Full Stack Engineer with 5+ years of experience managing full-stack JavaScript architectures, state management, and cloud deployments.',
    tenYears: 'Principal Full Stack Architect with 10+ years of experience designing global web applications, micro-frontends, and cloud native systems.'
  },
  'Data Science & Machine Learning': {
    fresher: 'Aspiring Data Scientist with strong expertise in Python, Machine Learning algorithms, statistical modeling, and data visualization. Hands-on experience building predictive models using Scikit-Learn, Pandas, and TensorFlow.',
    sixMonths: 'Data Science Intern with 6 months experience conducting exploratory data analysis, data cleaning, and training baseline ML models with Python.',
    oneYear: 'Data Scientist with 1+ year of experience building predictive ML pipelines, conducting statistical analysis, and deploying models with FastAPI.',
    threeYears: 'Senior Data Scientist with 3+ years of experience deploying production ML models, deep learning architectures, and automated MLOps pipelines.',
    fiveYears: 'Lead Machine Learning Scientist with 5+ years of experience building end-to-end AI/ML systems, NLP pipelines, and computer vision models.',
    tenYears: 'Chief AI & Data Scientist with 10+ years of experience directing AI research, enterprise ML strategy, and delivering high-ROI algorithmic products.'
  },
  'DevOps & Cloud Engineer': {
    fresher: 'DevOps Engineer with strong expertise in Linux administration, Docker containerization, CI/CD automation with GitHub Actions / Jenkins, and AWS cloud infrastructure management.',
    sixMonths: 'Junior DevOps Trainee with 6 months experience assisting in containerizing applications with Docker and configuring basic CI/CD pipelines.',
    oneYear: 'DevOps Engineer with 1+ year of experience managing AWS cloud infrastructure, containerized deployments with Docker, and CI/CD pipelines.',
    threeYears: 'Senior DevOps & Cloud Engineer with 3+ years of experience architecting Kubernetes clusters, Terraform infrastructure, and robust CI/CD pipelines.',
    fiveYears: 'Staff Cloud Infrastructure Engineer with 5+ years of experience leading multi-cloud architectures, Kubernetes clusters, and zero-downtime releases.',
    tenYears: 'Principal Cloud & Site Reliability Architect with 10+ years of experience leading enterprise infrastructure, cloud security, and global SRE teams.'
  },
  'Software Engineer': {
    fresher: 'Motivated Computer Science graduate with strong fundamentals in algorithms, data structures, and object-oriented programming. Eager to leverage problem-solving skills and hands-on project experience in building scalable web applications.',
    sixMonths: 'Software Engineering Intern with 6 months experience contributing to feature development, bug fixes, and unit testing across Agile sprints.',
    oneYear: 'Results-driven Software Engineer with 1+ year of experience in full-lifecycle software development using React, Node.js, and Python. Proven track record in optimizing backend APIs and delivering clean, maintainable code.',
    threeYears: 'Senior Software Engineer with 3+ years of experience designing high-throughput microservices and cloud architectures. Adept at leading sprint cycles, mentoring junior developers, and driving system reliability.',
    fiveYears: 'Staff Software Engineer with 5+ years of experience driving core architectural decisions, system performance optimization, and team delivery excellence.',
    tenYears: 'Principal Software Engineer / Tech Lead with 10+ years of experience guiding enterprise technology roadmap, system resilience, and high-impact engineering culture.'
  },
  'Cyber Security Analyst': {
    fresher: 'Cyber Security Analyst with knowledge of network security, threat detection, vulnerability assessment, SIEM tools, and security incident response. Committed to safeguarding enterprise assets.',
    sixMonths: 'SOC Trainee with 6 months experience monitoring security incident alerts in Splunk and assisting in vulnerability scans.',
    oneYear: 'Security Analyst with 1+ year of experience in vulnerability management, SOC monitoring with Splunk, and network security.',
    threeYears: 'Senior Information Security Analyst with 3+ years of experience in penetration testing, threat hunting, and incident response.',
    fiveYears: 'Cyber Security Operations Lead with 5+ years of experience managing SOC teams, incident response protocols, and security audits.',
    tenYears: 'Chief Information Security Officer (CISO) with 10+ years of experience establishing enterprise cyber defense, compliance, and risk management.'
  },
  'QA Automation Engineer': {
    fresher: 'QA Automation Engineer skilled in Selenium WebDriver, Python/Java, TestNG, REST API testing with Postman, and CI/CD integration. Passionate about software reliability and test automation.',
    sixMonths: 'QA Intern with 6 months experience in manual test case execution, defect tracking in JIRA, and basic Selenium scripting.',
    oneYear: 'QA Automation Engineer with 1+ year of experience building automated test suites with Selenium, PyTest, and Postman.',
    threeYears: 'Senior QA Automation Engineer with 3+ years of experience building robust hybrid automation frameworks and CI/CD testing pipelines.',
    fiveYears: 'QA Lead with 5+ years of experience designing enterprise test automation strategies, performance testing, and leading QA teams.',
    tenYears: 'Director of Quality Engineering with 10+ years of experience managing global QA organizations and automated quality governance.'
  },
  'UI/UX Designer': {
    fresher: 'Creative UI/UX Designer with a strong portfolio of user-centered design projects, wireframes, and interactive prototypes. Skilled in Figma, user research, and responsive web design.',
    sixMonths: 'UI/UX Design Intern with 6 months experience designing wireframes, responsive UI components, and interactive prototypes in Figma.',
    oneYear: 'UI/UX Designer with 1+ year of experience crafting intuitive web and mobile interfaces, conducting usability testing, and maintaining design systems.',
    threeYears: 'Senior Product Designer with 3+ years of experience delivering end-to-end user experience solutions for high-growth tech platforms.',
    fiveYears: 'Lead Product Designer with 5+ years of experience orchestrating design systems, user research methodologies, and product UX vision.',
    tenYears: 'Head of Product Design with 10+ years of experience shaping brand experience, design strategy, and leading world-class design teams.'
  },
  'Mobile App Developer': {
    fresher: 'Mobile App Developer with strong foundations in Flutter / React Native and Dart/JavaScript. Skilled in building cross-platform iOS and Android apps with responsive UI and REST API integration.',
    sixMonths: 'Mobile App Developer Intern with 6 months experience creating mobile screens, state management, and API integration in Flutter.',
    oneYear: 'Mobile App Developer with 1+ year of experience building and deploying Flutter and React Native applications.',
    threeYears: 'Senior Mobile Engineer with 3+ years of experience architecting high-performance cross-platform mobile apps.',
    fiveYears: 'Lead Mobile Architect with 5+ years of experience building high-scale consumer mobile applications with 1M+ downloads.',
    tenYears: 'Principal Mobile Engineering Lead with 10+ years of experience directing iOS/Android product architectures and mobile SDKs.'
  },
  'Business Analyst': {
    fresher: 'Detail-oriented Business Analyst with strong analytical skills, expertise in SQL, Excel, Power BI, and Agile methodologies. Adept at gathering requirements and translating business needs into technical solutions.',
    sixMonths: 'Junior Business Analyst Intern with 6 months experience in requirement gathering, creating user stories in JIRA, and preparing process flowcharts.',
    oneYear: 'Business Analyst with 1+ year of experience working with cross-functional teams, requirement gathering in JIRA, and creating executive dashboards.',
    threeYears: 'Senior Business Analyst with 3+ years of experience driving product roadmaps, business process re-engineering, and strategic data analytics.',
    fiveYears: 'Lead Business Architect with 5+ years of experience aligning business requirements with enterprise software solutions.',
    tenYears: 'Principal Product & Business Strategist with 10+ years of experience driving large-scale digital transformation and enterprise product roadmap.'
  }
};

export const PersonalInfoForm = ({ resume, onUpdate }) => {
  const [formData, setFormData] = useState(resume.personal_info || {
    full_name: '', email: '', phone: '', location: '',
    linkedin_url: '', github_url: '', portfolio_url: '', summary: ''
  });
  const [selectedDomain, setSelectedDomain] = useState('Data Analytics');
  const [experienceLevel, setExperienceLevel] = useState('fresher'); // 'fresher' | 'sixMonths' | 'oneYear' | 'threeYears' | 'fiveYears' | 'tenYears'
  const [customRoleInput, setCustomRoleInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatingAi, setGeneratingAi] = useState(false);
  const [autofillingFull, setAutofillingFull] = useState(false);

  React.useEffect(() => {
    if (resume?.personal_info) {
      setFormData(resume.personal_info);
    }
  }, [resume?.id, resume?.personal_info]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
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

  const handleApplyPreset = (text, levelKey = 'fresher') => {
    setExperienceLevel(levelKey);
    setFormData(prev => ({ ...prev, summary: text }));
  };

  const getExperienceLabel = (lvlKey) => {
    const found = EXPERIENCE_OPTIONS.find(o => o.id === lvlKey);
    return found ? found.years : 'Fresher';
  };

  const handleGenerateSummary = async () => {
    setGeneratingAi(true);
    try {
      const expStr = getExperienceLabel(experienceLevel);
      const res = await resumeApi.generateSummary(resume.id, { role: selectedDomain, experience_level: expStr });
      setFormData(prev => ({ ...prev, summary: res.data.summary }));
      onUpdate();
    } catch (err) {
      console.error('AI summary failed', err);
    } finally {
      setGeneratingAi(false);
    }
  };

  const handleFullAutofillRole = async (roleToFill, expLvl = experienceLevel) => {
    const targetRole = roleToFill || customRoleInput || selectedDomain;
    if (!targetRole) return;
    setAutofillingFull(true);
    try {
      const expStr = getExperienceLabel(expLvl);
      const res = await resumeApi.aiAutofillRole(resume.id, {
        role: targetRole,
        experience_level: expStr
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

  const handleDomainDropdownSelect = (e) => {
    const domainVal = e.target.value;
    if (!domainVal) return;
    setCustomRoleInput(domainVal);
    setSelectedDomain(domainVal);
    
    // Auto-update summary preset if available
    const presets = DOMAIN_SUMMARY_PRESETS[domainVal];
    if (presets && presets[experienceLevel]) {
      setFormData(prev => ({ ...prev, summary: presets[experienceLevel] }));
    }
    
    // Automatically trigger autofill data fetch for the selected IT domain
    handleFullAutofillRole(domainVal, experienceLevel);
  };

  const currentPresets = DOMAIN_SUMMARY_PRESETS[selectedDomain] || DOMAIN_SUMMARY_PRESETS['Data Analytics'];

  return (
    <form onSubmit={handleSave} className="glass-card" style={{ marginBottom: '1.5rem', background: '#FFFFFF', border: '1px solid #BFDBFE', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 4px 15px rgba(37,99,235,0.06)' }}>
      {/* 🚀 AI 1-Click Full Resume Generator */}
      <div style={{ marginBottom: '1.5rem', background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)', padding: '1.25rem', borderRadius: '10px', color: '#FFFFFF', boxShadow: '0 4px 12px rgba(15, 23, 42, 0.25)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.4rem' }}>
          <Sparkles size={18} color="#F59E0B" />
          <h4 style={{ fontSize: '1rem', fontWeight: '800', margin: 0, color: '#FFFFFF' }}>AI 1-Click Full Resume Generator</h4>
        </div>
        <p style={{ fontSize: '0.82rem', color: '#94A3B8', margin: '0 0 1rem' }}>
          Select any IT course domain and experience level to automatically generate complete summary, skills, experience & projects!
        </p>

        {/* 🌟 IT Courses Domain Dropdown Selector */}
        <div style={{ marginBottom: '0.85rem' }}>
          <label style={{ fontSize: '0.78rem', color: '#38BDF8', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
            <span>🎓 Select IT Course Domain:</span>
          </label>
          <DomainSelectDropdown
            options={IT_COURSE_DOMAINS}
            value={customRoleInput || selectedDomain}
            onChange={(domainVal) => {
              setCustomRoleInput(domainVal);
              setSelectedDomain(domainVal);
              const presets = DOMAIN_SUMMARY_PRESETS[domainVal];
              if (presets && presets[experienceLevel]) {
                setFormData(prev => ({ ...prev, summary: presets[experienceLevel] }));
              }
              handleFullAutofillRole(domainVal, experienceLevel);
            }}
            placeholder="-- Choose an IT Domain to Auto-Fill Entire Resume --"
          />
        </div>

        {/* Custom Input & Auto-Generate Button */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <input
            type="text"
            className="form-control"
            style={{ flex: 1, minWidth: '200px', background: '#0F172A', color: '#FFFFFF', border: '1px solid #334155', borderRadius: '8px' }}
            placeholder="Selected domain or type custom (e.g. Data Analytics / Python Full Stack)"
            value={customRoleInput}
            onChange={(e) => setCustomRoleInput(e.target.value)}
          />
          <button
            type="button"
            onClick={() => handleFullAutofillRole(customRoleInput)}
            disabled={autofillingFull}
            className="btn btn-ai"
            style={{ padding: '0.55rem 1.2rem', fontSize: '0.88rem', fontWeight: '700', borderRadius: '8px' }}
          >
            <Sparkles size={16} /> {autofillingFull ? 'Generating Full Resume...' : 'Auto-Generate Resume'}
          </button>
        </div>

        {/* 🌟 6 Experience Level Selector Pills: Fresher, 6 Months, 1 Year, 3 Years, 5 Years, 10+ Years */}
        <div style={{ marginTop: '0.85rem', padding: '8px 10px', background: 'rgba(255,255,255,0.06)', borderRadius: '8px' }}>
          <div style={{ fontSize: '0.78rem', color: '#CBD5E1', fontWeight: '700', marginBottom: '6px' }}>
            Experience Level:
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
            {EXPERIENCE_OPTIONS.map(lvl => (
              <button
                key={lvl.id}
                type="button"
                onClick={() => {
                  setExperienceLevel(lvl.id);
                  const presets = DOMAIN_SUMMARY_PRESETS[selectedDomain];
                  if (presets && presets[lvl.id]) {
                    setFormData(prev => ({ ...prev, summary: presets[lvl.id] }));
                  }
                  // Re-fetch with new experience level
                  handleFullAutofillRole(customRoleInput || selectedDomain, lvl.id);
                }}
                style={{
                  background: experienceLevel === lvl.id ? '#2563EB' : 'rgba(255,255,255,0.08)',
                  color: '#FFFFFF',
                  border: experienceLevel === lvl.id ? '1px solid #60A5FA' : '1px solid rgba(255,255,255,0.18)',
                  padding: '4px 9px',
                  borderRadius: '6px',
                  fontSize: '0.76rem',
                  cursor: 'pointer',
                  fontWeight: experienceLevel === lvl.id ? '700' : '500',
                  transition: 'all 0.2s ease',
                  boxShadow: experienceLevel === lvl.id ? '0 2px 8px rgba(37,99,235,0.4)' : 'none'
                }}
              >
                {lvl.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', margin: 0, color: '#0F172A', fontWeight: '800' }}>Personal Information</h3>
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

      {/* Professional Summary Section */}
      <div style={{ marginTop: '1.5rem', background: '#F8FAFC', padding: '1.2rem', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
        <div className="form-group" style={{ margin: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <div>
              <label style={{ fontSize: '0.95rem', fontWeight: '800', color: '#0F172A', margin: 0 }}>Professional Summary</label>
              <p style={{ fontSize: '0.78rem', color: '#64748B', margin: '2px 0 0' }}>Auto-generated based on your chosen domain & experience above, or edit directly below:</p>
            </div>
            <button type="button" onClick={handleGenerateSummary} className="btn btn-ai" style={{ fontSize: '0.8rem', padding: '0.35rem 0.8rem', fontWeight: '700' }} disabled={generatingAi}>
              <Sparkles size={14} /> {generatingAi ? 'Generating...' : 'AI Custom Generate'}
            </button>
          </div>
          <textarea
            name="summary"
            className="form-control"
            rows={4}
            value={formData.summary || ''}
            onChange={handleChange}
            placeholder="Your professional summary will appear here. You can also edit it directly..."
          />
        </div>
      </div>
    </form>
  );
};
