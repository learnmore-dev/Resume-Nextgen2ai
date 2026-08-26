import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import { resumeApi } from '../api/resumeApi';
import { TemplateRenderer } from './ResumeBuilder/templates/TemplateRenderer';

const TEMPLATES_DATA = [
  { id: 1, name: 'Achiever', category: 'Professional', layout: 'sidebar-left', color: '#16697a', tag: 'ATS-FRIENDLY' },
  { id: 2, name: 'Axis', category: 'ATS-Friendly', layout: 'ats', color: '#0f4652', tag: 'POPULAR' },
  { id: 3, name: 'Borderless', category: 'Simple', layout: 'clean', color: '#ee571d', tag: 'FREE' },
  { id: 4, name: 'Classic', category: 'Professional', layout: 'classic', color: '#1e2532', tag: 'CLASSIC' },
  { id: 5, name: 'Clear', category: 'Simple', layout: 'clean', color: '#0284c7', tag: 'ATS-FRIENDLY' },
  { id: 6, name: 'Cloud', category: 'Two-column', layout: 'two-col', color: '#4f46e5', tag: 'GOOGLE DOCS' },
  { id: 7, name: 'Connector', category: 'Professional', layout: 'sidebar-left', color: '#0f766e', tag: 'WORD' },
  { id: 8, name: 'Core', category: 'Simple', layout: 'ats', color: '#334155', tag: 'FREE' },
  { id: 9, name: 'Creator', category: 'Picture', layout: 'creative', color: '#ea5425', tag: 'PICTURE' },
  { id: 10, name: 'Driven', category: 'Professional', layout: 'header-banner', color: '#16697a', tag: 'ATS-FRIENDLY' },
  { id: 11, name: 'Echo', category: 'Two-column', layout: 'two-col', color: '#0284c7', tag: 'POPULAR' },
  { id: 12, name: 'Flex', category: 'Simple', layout: 'clean', color: '#10b981', tag: 'FREE' },
  { id: 13, name: 'Flow', category: 'ATS-Friendly', layout: 'ats', color: '#4f46e5', tag: 'ATS-FRIENDLY' },
  { id: 14, name: 'Formal', category: 'Professional', layout: 'classic', color: '#0f172a', tag: 'WORD' },
  { id: 15, name: 'Frame', category: 'Two-column', layout: 'sidebar-left', color: '#ee571d', tag: 'GOOGLE DOCS' },
  { id: 16, name: 'Fresh', category: 'Picture', layout: 'creative', color: '#059669', tag: 'PICTURE' },
  { id: 17, name: 'Global', category: 'Professional', layout: 'header-banner', color: '#2563eb', tag: 'ATS-FRIENDLY' },
  { id: 18, name: 'Ink', category: 'Simple', layout: 'clean', color: '#475569', tag: 'FREE' },
  { id: 19, name: 'Minimalist', category: 'Simple', layout: 'clean', color: '#0f172a', tag: 'POPULAR' },
  { id: 20, name: 'Modern Duo', category: 'Two-column', layout: 'two-col', color: '#7c3aed', tag: 'GOOGLE DOCS' },
  { id: 21, name: 'Nova', category: 'ATS-Friendly', layout: 'ats', color: '#10b981', tag: 'ATS-FRIENDLY' },
  { id: 22, name: 'Plain', category: 'Simple', layout: 'clean', color: '#64748b', tag: 'FREE' },
  { id: 23, name: 'Pure', category: 'Professional', layout: 'classic', color: '#0f766e', tag: 'WORD' },
  { id: 24, name: 'Sharp', category: 'Professional', layout: 'header-banner', color: '#dc2626', tag: 'POPULAR' },
];

const MANISHA_SAMPLE_DATA = {
  personal_info: {
    full_name: 'Manisha Chauhan',
    phone: '+91 7249516523',
    email: 'manishachauhan5469@gmail.com',
    location: 'Delhi, India',
    linkedin_url: 'https://linkedin.com/in/manishachauhan',
    github_url: 'https://github.com/manisha',
    portfolio_url: 'https://manisha-portfolio.com',
    summary: 'Full Stack Developer with strong foundations in JavaScript, HTML, CSS, and React.js, and hands-on experience building scalable applications using React, Next.js, Node.js, and PostgreSQL. Experienced in developing RESTful APIs and client–server architectures through internship and full-stack projects. Built AI-powered applications with exposure to Agile development and Git workflows. Solved 500+ DSA problems demonstrating strong problem-solving skills. Collaborative team player eager to learn, take feedback, and grow in fast-paced environments.'
  },
  target_job_title: 'Full Stack Developer',
  experience: [
    {
      id: 1,
      role: 'Full Stack Developer Intern',
      company: 'Groot Technologies',
      start_date: 'Aug 2025',
      end_date: 'Dec 2025',
      is_current: false,
      bullets: [
        'Built a full-stack HR Management System with admin & employee dashboards, reducing manual HR work by ~40%.',
        'Implemented role-based access control (RBAC) for attendance, leaves, and departments, improving data accuracy by ~30%.',
        'Developed secure REST APIs using Node.js, Express.js, Sequelize, integrating PostgreSQL & Supabase.',
        'Worked in an Agile environment with exposure to Docker and CI/CD pipelines.'
      ]
    }
  ],
  projects: [
    {
      id: 1,
      name: 'Autonomous AI Project Manager (Full Stack AI System)',
      tech_stack: ['Next.js', 'FastAPI', 'PostgreSQL', 'Groq LLM', 'Docker', 'GitHub Actions'],
      description: 'Multi-agent AI system that converts high-level goals into executable tasks.',
      link: 'https://github.com/manisha/ai-project-manager',
      start_date: 'Dec 2025',
      end_date: 'Jan 2026',
      bullets: [
        'Developed a multi-agent AI system that converts high-level goals into executable tasks, improving task execution efficiency by ~60%.',
        'Implemented orchestrator-based task planning, self-review, and retry logic, reducing manual intervention by ~70%.',
        'Built optimized REST APIs supporting 100+ concurrent tasks with reliable task state management.'
      ]
    },
    {
      id: 2,
      name: 'AI Finance Platform (Full Stack Project)',
      tech_stack: ['React', 'Next.js', 'RESTful APIs', 'Tailwind CSS', 'Gemini AI', 'Prisma', 'Clerk Auth'],
      description: 'Full-stack platform for real-time tracking of financial records.',
      link: 'https://github.com/manisha/ai-finance',
      start_date: 'Mar 2025',
      end_date: 'Jun 2025',
      bullets: [
        'Built a full-stack platform for real-time tracking of 100+ financial records using secure REST APIs.',
        'Integrated Gemini AI to generate automated financial insights, improving decision visibility by ~30%.',
        'Implemented authentication and authorization using Clerk Auth with optimized database queries.'
      ]
    }
  ],
  education: [
    {
      id: 1,
      institution: 'Indus Institute of Technology, Ahmedabad',
      degree: 'Bachelor of Technology (B.Tech.) — CSE | CGPA: 9.2/10',
      field_of_study: 'Computer Science & Engineering',
      start_date: 'Sep 2022',
      end_date: 'May 2026'
    },
    {
      id: 2,
      institution: 'Shri Raghubir High School, Palghar',
      degree: 'Intermediate (Class 12) — 81%',
      field_of_study: 'Science',
      start_date: 'Jun 2021',
      end_date: 'May 2022'
    }
  ],
  skills: [
    { category: 'Languages', skill_name: 'Java (Core, OOP, Collections), Python, JavaScript (ES6)' },
    { category: 'Frontend', skill_name: 'React.js, Next.js, HTML5, CSS3, Tailwind CSS, Shadcn UI, Ant Design' },
    { category: 'Backend & Platforms', skill_name: 'Node.js, Express.js, REST APIs' },
    { category: 'Databases', skill_name: 'MySQL, PostgreSQL, MongoDB, Mongoose, Prisma' },
    { category: 'Development Tools & DevOps', skill_name: 'VS Code, Git, GitHub, Docker, CI/CD Pipelines (GitHub Actions), Postman' },
    { category: 'AI Tools & Knowledge', skill_name: 'Gemini AI, Groq API, AI Model Integration, AI-powered application development' },
    { category: 'CS Fundamentals', skill_name: 'DBMS, Computer Network, SDLC (Agile, Scrum), DSA, OOPs, LLD(Basics)' },
    { category: 'Soft Skills', skill_name: 'Strong Communication, Technical Documentation, Analytical Thinking, Team Collaboration' }
  ],
  achievements: [
    { title: 'Top 15 – HackHazards Hackathon 2025 (Fluvio Track) for DevNest AI.', date: 'May 2025' },
    { title: 'Solved 500+ DSA problems on LeetCode & GeeksforGeeks using Java.', date: 'Oct 2024 – Jan 2026' }
  ]
};

export const Templates = () => {
  const navigate = useNavigate();
  const { createResume, resumes } = useResume();
  const [activeCategory, setActiveCategory] = useState('All');
  const [loadingId, setLoadingId] = useState(null);

  const categories = ['All', 'ATS-Friendly', 'Picture', 'Google Docs', 'Professional', 'Simple', 'Two-column', 'Word'];

  const handleUseTemplate = async (tpl) => {
    setLoadingId(tpl.id);
    try {
      const newResume = await createResume({
        title: `Resume - ${tpl.name}`,
        template_id: tpl.id
      });
      // Pre-fill with Manisha Chauhan's resume data
      if (MANISHA_SAMPLE_DATA.personal_info) {
        try {
          await resumeApi.updatePersonalInfo(newResume.id, MANISHA_SAMPLE_DATA.personal_info);
        } catch (e) {
          console.error(e);
        }
      }
      navigate(`/builder/${newResume.id}`);
    } catch (e) {
      if (resumes && resumes.length > 0) {
        navigate(`/builder/${resumes[0].id}`);
      } else {
        navigate('/create-resume');
      }
    } finally {
      setLoadingId(null);
    }
  };

  const filteredTemplates = TEMPLATES_DATA.filter(tpl => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'ATS-Friendly') return tpl.category === 'ATS-Friendly' || tpl.tag === 'ATS-FRIENDLY';
    if (activeCategory === 'Picture') return tpl.category === 'Picture' || tpl.tag === 'PICTURE';
    if (activeCategory === 'Google Docs') return tpl.tag === 'GOOGLE DOCS';
    if (activeCategory === 'Word') return tpl.tag === 'WORD';
    return tpl.category === activeCategory;
  });

  return (
    <div className="templates-showcase-page">
      {/* Header Banner */}
      <section className="templates-hero-banner">
        <div className="templates-hero-container">
          <div className="templates-breadcrumb">
            <span onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>AI Resume Builder</span>
            <span className="sep">»</span>
            <span className="active">Resume Templates</span>
          </div>

          <h1 className="templates-main-heading">
            Free, Customizable Resume Templates<br /> for Every Career Level
          </h1>

          <p className="templates-hero-desc">
            Design a resume that's both professional and personal. Our collection of resume templates helps you build a standout resume effortlessly—no design skills needed. Whether you're just starting out or making a career change, each template is ATS-friendly, easy to edit, and built to impress hiring managers across industries.
          </p>

          <button 
            onClick={() => handleUseTemplate(TEMPLATES_DATA[0])}
            className="btn-templates-create"
          >
            Create Your Resume
          </button>
        </div>
      </section>

      {/* Category Tabs Section */}
      <section className="templates-categories-bar">
        <div className="categories-container">
          {categories.map(cat => (
            <button
              key={cat}
              className={`cat-pill ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Grid of Templates (Real Live Scaled Document Previews matching Manisha Chauhan resume) */}
      <section className="templates-grid-section">
        <div className="templates-grid-container">
          <div className="templates-cards-grid">
            {filteredTemplates.map(tpl => (
              <div key={tpl.id} className="template-card-box">
                <div className="card-mockup-area">
                  {/* Badge top right */}
                  <span className="card-tag-badge">{tpl.tag}</span>

                  {/* REAL SCALED DOCUMENT PREVIEW OF MANISHA CHAUHAN RESUME */}
                  <div style={{
                    width: '100%',
                    height: '100%',
                    overflow: 'hidden',
                    position: 'relative',
                    background: '#FFFFFF'
                  }}>
                    <div style={{
                      width: '720px',
                      height: '1020px',
                      transform: 'scale(0.38)',
                      transformOrigin: 'top left',
                      pointerEvents: 'none',
                      userSelect: 'none'
                    }}>
                      <TemplateRenderer resume={{ ...MANISHA_SAMPLE_DATA, template_id: tpl.id }} />
                    </div>
                  </div>

                  {/* Hover Overlay with Orange Button matching Image 2 */}
                  <div className="card-hover-overlay">
                    <button 
                      onClick={() => handleUseTemplate(tpl)}
                      disabled={loadingId === tpl.id}
                      className="btn-edit-template-orange"
                    >
                      {loadingId === tpl.id ? 'Starting...' : 'Edit This Template'}
                    </button>
                  </div>
                </div>

                <div className="card-label-row">
                  <h3>{tpl.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Templates;
