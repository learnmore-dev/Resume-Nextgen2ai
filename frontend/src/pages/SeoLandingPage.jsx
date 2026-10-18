import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Check, FileText, ShieldCheck, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './SeoLandingPage.css';

const seoPages = {
  ats: {
    title: 'ATS Friendly Resume Builder',
    documentTitle: 'ATS Friendly Resume Builder | NextGen Resume',
    description: 'Create a clear, ATS-conscious resume with NextGen Resume. Choose a professional template, tailor your experience, and prepare your application.',
    intro: 'Build a resume that is easy for recruiters to scan and simple to tailor to a job description. Start with a clean layout, organize your experience, and make your relevant skills clear.',
    benefits: ['Choose from clean, professional resume layouts', 'Organize experience, education, projects, and skills', 'Use the ATS checker to review your resume against a job description'],
    steps: ['Choose a simple resume template', 'Add your work history and the skills relevant to your target role', 'Review your resume against the job description before you apply'],
    guidanceTitle: 'Make your resume easier to scan',
    guidance: 'Applicant tracking systems and recruiters both benefit from clear, consistent information. Use descriptive section headings, standard job titles, and concise achievement-focused bullets. There is no template that can guarantee a particular ATS result, so review each application carefully.',
    faqs: [
      ['What makes a resume ATS friendly?', 'A clear structure, recognizable section headings, readable text, and role-relevant language help both applicant tracking systems and recruiters interpret your experience.'],
      ['Will an ATS-friendly template guarantee an interview?', 'No. A resume cannot guarantee an interview or a particular ATS score. Tailor your details honestly to the role and follow the employer’s application instructions.'],
      ['Can I check my resume against a job description?', 'Yes. NextGen Resume includes a job analyzer to help you compare your resume with a job description and spot potentially missing keywords.']
    ]
  },
  freshers: {
    title: 'Resume Builder for Freshers',
    documentTitle: 'Resume Builder for Freshers | NextGen Resume',
    description: 'Create your first resume with a free resume builder for freshers. Highlight education, internships, projects, skills, and achievements in a clear format.',
    intro: 'Starting your career? Turn coursework, projects, internships, and extracurricular achievements into a focused first resume. Use a guided builder to organize what you have done and show what you can contribute.',
    benefits: ['Bring education and relevant coursework into focus', 'Showcase internships, projects, and practical skills', 'Use a professional layout for entry-level applications'],
    steps: ['Start with your contact details and a short role-focused summary', 'Add projects, internships, education, and relevant skills', 'Check each bullet for clear actions, outcomes, and accurate details'],
    guidanceTitle: 'What to include in a fresher resume',
    guidance: 'Lead with the strongest evidence for the role. If you have limited work experience, put projects, internships, certifications, or volunteer work near the top. Describe your contribution and the tools you used; never claim experience or results you cannot support.',
    faqs: [
      ['How do I write a resume with no experience?', 'Focus on education, relevant projects, internships, volunteering, and transferable skills. Use specific examples to show what you learned or accomplished.'],
      ['Should freshers include projects on a resume?', 'Yes, when a project demonstrates skills relevant to the role. State the goal, your contribution, tools used, and a verifiable result where available.'],
      ['How long should a fresher resume be?', 'For many entry-level applications, one concise page is a useful target. Follow any length or format instructions in the job posting.']
    ]
  },
  templates: {
    title: 'Free Resume Templates',
    documentTitle: 'Free Resume Templates | NextGen Resume',
    description: 'Explore free resume templates for different roles and career stages. Choose a clean design, customize your sections, and build a job-ready resume.',
    intro: 'Find a resume layout that suits your experience and the roles you want. Compare clean, professional styles, then customize your content in the guided resume builder.',
    benefits: ['Browse templates across professional and simple styles', 'Choose layouts designed for clear, readable sections', 'Customize your content and prepare a PDF resume'],
    steps: ['Browse the available resume templates', 'Choose a layout that fits your role and experience', 'Add your details, review the preview, and export your resume'],
    guidanceTitle: 'Choosing the right resume template',
    guidance: 'Prioritize readability over decoration. A straightforward, single-column layout can be a practical choice for many applications. Make sure your final resume is easy to scan, reflects your actual experience, and follows any file or formatting rules set by the employer.',
    faqs: [
      ['Are the resume templates free?', 'You can browse templates and create a resume with NextGen Resume. Check the current product flow for any account requirements.'],
      ['Which resume template should I choose?', 'Choose a design that keeps your most relevant qualifications easy to find and suits your industry, career stage, and application requirements.'],
      ['Can I download a resume as a PDF?', 'Yes. After creating your resume, use the builder’s Download PDF action to export it.']
    ]
  },
  students: {
    title: 'Resume Builder for Students',
    documentTitle: 'Resume Builder for Students | NextGen Resume',
    description: 'Build a student resume for internships, campus roles, and your first job. Highlight coursework, academic projects, clubs, volunteering, and skills.',
    intro: 'Create a student resume that connects your studies and experiences to your next opportunity. Organize coursework, projects, campus activities, and part-time work into a clear story.',
    benefits: ['Highlight relevant classes and academic projects', 'Include campus leadership, volunteering, and part-time work', 'Create a polished resume for internships and entry-level roles'],
    steps: ['Select a target internship or role', 'Gather relevant classes, projects, activities, and experience', 'Put the most relevant evidence first and proofread before applying'],
    guidanceTitle: 'Turn student experience into relevant evidence',
    guidance: 'Experience can come from more than a full-time job. A class project, student organization, volunteer commitment, or campus role can demonstrate collaboration, communication, research, and technical skills. Describe your specific contribution and keep claims accurate.',
    faqs: [
      ['What should a student put on a resume?', 'Include contact details, education, relevant coursework, projects, work experience, extracurricular activities, volunteering, and skills that support the role.'],
      ['Should a student resume include a GPA?', 'Include your GPA when it is strong, requested, or relevant to the opportunity. Make sure it is accurate and clearly labeled.'],
      ['Can students use this resume builder for internships?', 'Yes. Use the builder to organize relevant coursework and experience, then tailor the resume to each internship description.']
    ]
  },
  experienced: {
    title: 'Resume Builder for Experienced Professionals',
    documentTitle: 'Resume Builder for Experienced Professionals | NextGen Resume',
    description: 'Build a focused resume for experienced professionals. Highlight career progression, leadership, relevant achievements, and expertise for your next move.',
    intro: 'Present a clear picture of your career and the value you bring to your next role. Bring relevant achievements and leadership forward, and make it easy to understand your progression.',
    benefits: ['Emphasize relevant accomplishments and career growth', 'Organize a longer work history into a focused narrative', 'Tailor skills and experience to a specific senior role'],
    steps: ['Identify the role and experience most relevant to your next move', 'Prioritize recent, measurable, and verifiable accomplishments', 'Trim older or less relevant details and review the final document'],
    guidanceTitle: 'Focus an established career on the next step',
    guidance: 'A longer career history does not require listing every task from every role. Give more space to recent, relevant work and specific outcomes. Use metrics only when they are accurate and explain your scope, leadership, or specialist expertise in plain language.',
    faqs: [
      ['How far back should an experienced professional go on a resume?', 'Prioritize the experience that supports your target role. Older roles can be summarized when their detail is less relevant, while following any employer requirements.'],
      ['How can I show impact in a resume?', 'Describe the challenge, your action, and the outcome. Use specific figures only when you can substantiate them.'],
      ['Should I tailor my resume for each job?', 'Yes. Prioritize the most relevant experience and terminology from each job description without overstating your qualifications.']
    ]
  },
  examples: {
    title: 'Resume Examples',
    documentTitle: 'Resume Examples for Different Career Stages | NextGen Resume',
    description: 'Explore practical resume examples and writing guidance for students, freshers, and experienced professionals. Use them to plan your own tailored resume.',
    intro: 'See how to organize a resume for different career stages and roles. Use these examples as a starting point, then adapt the structure and wording to reflect your own experience accurately.',
    benefits: ['See examples of concise, achievement-focused bullet points', 'Compare what to emphasize at different career stages', 'Use the resume builder to create your own version'],
    steps: ['Choose the example closest to your current career stage', 'Use the structure to organize your own relevant information', 'Replace sample content with accurate details from your experience'],
    guidanceTitle: 'Example resume bullet points',
    guidance: 'Treat examples as writing patterns, not claims to copy. Replace every sample detail with your own real contribution, tools, and results.',
    examplesList: [
      { label: 'Student project', text: 'Designed a course-planning prototype with a four-person team; interviewed classmates and documented three usability improvements.' },
      { label: 'Entry-level internship', text: 'Built a weekly reporting script during an internship, reducing repetitive spreadsheet steps for the project team.' },
      { label: 'Experienced professional', text: 'Led a cross-functional release process across product and engineering, coordinating milestones and communicating launch risks.' }
    ],
    faqs: [
      ['Can I copy a resume example?', 'Use examples for structure and inspiration, but write about your own experience. Do not copy achievements, credentials, or results that are not yours.'],
      ['Where can I find examples for my career stage?', 'This page includes student, entry-level, and experienced-professional bullet examples. The linked guides provide additional advice for freshers and students.'],
      ['How do I make a resume example relevant to a job?', 'Identify the requirements in the job description, then prioritize your own relevant skills and evidence. Keep all details accurate.']
    ]
  },
  pdf: {
    title: 'Resume Maker PDF',
    documentTitle: 'Resume Maker PDF | Create and Download a Resume | NextGen Resume',
    description: 'Make a professional resume and download it as a PDF. Choose a template, add your experience and skills, then export your finished resume.',
    intro: 'Create a resume in a clear, professional layout and export a PDF when it is ready. Add your own experience, review the finished document, and prepare a version tailored to the role.',
    benefits: ['Choose a professional resume template', 'Edit your details and review the resume preview', 'Download your completed resume using the PDF export'],
    steps: ['Choose a template and enter your resume details', 'Review the content, formatting, and contact information', 'Select Download PDF in the builder to export your resume'],
    guidanceTitle: 'Before you send your resume PDF',
    guidance: 'Open the downloaded file and check that your contact information, dates, links, and page breaks look right. Use a clear filename and follow the employer’s file-format instructions when you submit your application.',
    faqs: [
      ['How do I make a resume PDF?', 'Create or open your resume in the builder, review it, and use the Download PDF button to export the finished document.'],
      ['Can I edit my resume before downloading it?', 'Yes. Update the resume in the builder and review the preview before exporting the PDF.'],
      ['Should I send a resume as a PDF?', 'Follow the employer’s application instructions. PDF is commonly used to preserve formatting, but some employers may request another file type.']
    ]
  }
};

const relatedPages = [
  { to: '/ats-resume-builder', label: 'ATS Friendly Resume Builder' },
  { to: '/resume-builder-for-freshers', label: 'Resume Builder for Freshers' },
  { to: '/resume-templates', label: 'Free Resume Templates' },
  { to: '/student-resume-builder', label: 'Resume Builder for Students' },
  { to: '/resume-builder-for-experienced', label: 'Resume Builder for Experienced Professionals' },
  { to: '/resume-examples', label: 'Resume Examples' },
  { to: '/resume-maker-pdf', label: 'Resume Maker PDF' }
];

export const SeoLandingPage = ({ pageKey }) => {
  const page = seoPages[pageKey];
  const navigate = useNavigate();
  const { isAuthenticated, openAuthModal } = useAuth();

  useEffect(() => {
    if (!page) return undefined;

    const previousTitle = document.title;
    let descriptionMeta = document.querySelector('meta[name="description"]');
    const createdDescription = !descriptionMeta;
    if (!descriptionMeta) {
      descriptionMeta = document.createElement('meta');
      descriptionMeta.name = 'description';
      document.head.appendChild(descriptionMeta);
    }
    const previousDescription = descriptionMeta.content;
    descriptionMeta.content = page.description;

    let canonicalLink = document.querySelector('link[rel="canonical"]');
    const createdCanonical = !canonicalLink;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    const previousCanonical = canonicalLink.href;

    document.title = page.documentTitle;
    canonicalLink.href = `${window.location.origin}${window.location.pathname}`;

    return () => {
      document.title = previousTitle;
      if (createdDescription) descriptionMeta.remove();
      else descriptionMeta.content = previousDescription;
      if (createdCanonical) canonicalLink.remove();
      else canonicalLink.href = previousCanonical;
    };
  }, [page]);

  if (!page) return null;

  const handleBuildResume = () => {
    if (isAuthenticated) navigate('/templates');
    else openAuthModal('/templates');
  };

  return (
    <div className="seo-landing">
      <section className="seo-hero">
        <div className="seo-hero-inner">
          <Link className="seo-breadcrumb" to="/">Home <span aria-hidden="true">/</span> {page.title}</Link>
          <span className="seo-eyebrow"><Sparkles size={15} /> YOUR NEXT STEP STARTS HERE</span>
          <h1>{page.title}</h1>
          <p className="seo-intro">{page.intro}</p>
          <div className="seo-hero-actions">
            <button type="button" className="seo-primary-button" onClick={handleBuildResume}>
              Build My Resume <ArrowRight size={18} />
            </button>
            <Link className="seo-secondary-button" to="/resume-templates">Explore resume templates</Link>
          </div>
          <div className="seo-trust-line"><ShieldCheck size={17} /> Clear guidance, professional layouts, and a resume you can make your own.</div>
        </div>
      </section>

      <section className="seo-content-section">
        <div className="seo-content-grid">
          <div>
            <span className="seo-section-kicker">MADE FOR YOUR NEXT APPLICATION</span>
            <h2>Build a resume that reflects your experience</h2>
            <p className="seo-body-copy">{page.guidance}</p>
          </div>
          <ul className="seo-benefit-list">
            {page.benefits.map((benefit) => (
              <li key={benefit}><span><Check size={17} /></span>{benefit}</li>
            ))}
          </ul>
        </div>
      </section>

      {page.examplesList && (
        <section className="seo-content-section seo-tinted-section">
          <div className="seo-section-inner">
            <span className="seo-section-kicker">START WITH A STRUCTURE</span>
            <h2>Resume bullet examples</h2>
            <div className="seo-example-grid">
              {page.examplesList.map((example) => (
                <article className="seo-example-card" key={example.label}>
                  <h3>{example.label}</h3>
                  <p>{example.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="seo-content-section">
        <div className="seo-section-inner">
          <span className="seo-section-kicker">THREE SIMPLE STEPS</span>
          <h2>{page.guidanceTitle}</h2>
          <ol className="seo-steps">
            {page.steps.map((step, index) => (
              <li key={step}>
                <span className="seo-step-number">0{index + 1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="seo-content-section seo-tinted-section">
        <div className="seo-section-inner">
          <span className="seo-section-kicker">GOOD TO KNOW</span>
          <h2>Frequently asked questions</h2>
          <div className="seo-faq-list">
            {page.faqs.map(([question, answer]) => (
              <details className="seo-faq-item" key={question}>
                <summary>{question}</summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="seo-content-section">
        <div className="seo-section-inner">
          <span className="seo-section-kicker">EXPLORE MORE</span>
          <h2>More resume tools and guides</h2>
          <nav className="seo-related-links" aria-label="Related resume guides">
            {relatedPages.filter((related) => related.to !== window.location.pathname).map((related) => (
              <Link to={related.to} key={related.to}>{related.label}<ArrowRight size={16} /></Link>
            ))}
          </nav>
        </div>
      </section>

      <section className="seo-final-cta">
        <div>
          <FileText size={25} />
          <h2>Ready to get started?</h2>
          <p>Choose a template and build a resume for the opportunity ahead.</p>
        </div>
        <button type="button" className="seo-primary-button" onClick={handleBuildResume}>
          Start building <ArrowRight size={18} />
        </button>
      </section>
    </div>
  );
};

export default SeoLandingPage;
