import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Check, FileText, ShieldCheck, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './SeoLandingPage.css';

const seoPages = {
  ats: {
    title: 'ATS Friendly Resume Template',
    documentTitle: 'ATS Friendly Resume Template & Builder | NextGen Resume',
    description: 'Create a clear, ATS-friendly resume with NextGen Resume. Choose a professional template, tailor your experience, and pass applicant tracking systems with confidence.',
    intro: 'Build a resume that is easy for recruiters to scan and simple to tailor to a job description. Start with a clean layout, organize your experience, and make your relevant skills clear.',
    benefits: ['Choose from clean, professional ATS-friendly resume layouts', 'Organize experience, education, projects, and skills', 'Use the ATS checker to review your resume against a job description'],
    steps: ['Choose a simple, ATS-optimized resume template', 'Add your work history and the skills relevant to your target role', 'Review your resume against the job description before you apply'],
    guidanceTitle: 'Make your resume easier to scan',
    guidance: 'Applicant tracking systems and recruiters both benefit from clear, consistent information. Use descriptive section headings, standard job titles, and concise achievement-focused bullets. There is no template that can guarantee a particular ATS result, so review each application carefully.',
    faqs: [
      ['What makes a resume ATS friendly?', 'A clear structure, recognizable section headings, readable text, and role-relevant language help both applicant tracking systems and recruiters interpret your experience.'],
      ['Will an ATS-friendly template guarantee an interview?', 'No. A resume cannot guarantee an interview or a particular ATS score. Tailor your details honestly to the role and follow the employer\'s application instructions.'],
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
      ['Are the resume templates free?', 'Yes. You can browse all templates and create a complete resume with NextGen Resume at no cost.'],
      ['Which resume template should I choose?', 'Choose a design that keeps your most relevant qualifications easy to find and suits your industry, career stage, and application requirements.'],
      ['Can I download a resume as a PDF?', 'Yes. After creating your resume, use the builder\'s Download PDF action to export it.']
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
    title: 'Resume Builder PDF',
    documentTitle: 'Resume Builder PDF | Create and Download Resume as PDF | NextGen Resume',
    description: 'Make a professional resume and download it as a PDF. Choose a template, add your experience and skills, then export your finished resume instantly.',
    intro: 'Create a resume in a clear, professional layout and export a PDF when it is ready. Add your own experience, review the finished document, and prepare a version tailored to the role.',
    benefits: ['Choose a professional resume template', 'Edit your details and review the resume preview', 'Download your completed resume as a clean PDF in one click'],
    steps: ['Choose a template and enter your resume details', 'Review the content, formatting, and contact information', 'Select Download PDF in the builder to export your resume'],
    guidanceTitle: 'Before you send your resume PDF',
    guidance: 'Open the downloaded file and check that your contact information, dates, links, and page breaks look right. Use a clear filename and follow the employer\'s file-format instructions when you submit your application.',
    faqs: [
      ['How do I make a resume PDF?', 'Create or open your resume in the builder, review it, and use the Download PDF button to export the finished document.'],
      ['Can I edit my resume before downloading it?', 'Yes. Update the resume in the builder and review the preview before exporting the PDF.'],
      ['Should I send a resume as a PDF?', 'Follow the employer\'s application instructions. PDF is commonly used to preserve formatting, but some employers may request another file type.']
    ]
  },
  professional: {
    title: 'Professional Resume Builder',
    documentTitle: 'Professional Resume Builder | NextGen Resume',
    description: 'Build a polished professional resume with NextGen Resume. Choose from industry-standard templates, tailor your content, and present your career story with impact.',
    intro: 'A professional resume goes beyond listing job titles. It communicates your value, highlights measurable achievements, and positions you as the best candidate for the role. Start with a clean template and build a focused, well-structured document.',
    benefits: [
      'Choose from professionally designed, clean resume layouts',
      'Highlight career achievements with impact-driven bullet points',
      'Tailor your professional summary and skills to every job',
      'Export a polished PDF ready to send to any employer',
    ],
    steps: [
      'Select a professional template that suits your industry and experience level',
      'Write a sharp, role-specific professional summary and add your top achievements',
      'Tailor keywords to the job description and download your finalized PDF',
    ],
    guidanceTitle: 'What makes a resume truly professional?',
    guidance: 'A professional resume is honest, concise, and tailored. Use clear section headings, consistent formatting, and strong action verbs. Quantify achievements wherever you can — numbers and outcomes speak louder than generic responsibilities. Review for typos, ensure your contact details are accurate, and always adapt the content to the specific role before applying.',
    faqs: [
      ['What should a professional resume include?', 'Contact information, a concise professional summary, work experience with achievement-focused bullets, education, key skills, and relevant certifications or projects.'],
      ['How long should a professional resume be?', 'One to two pages is typically recommended. Experienced professionals with 10+ years may use two pages; most others benefit from a focused one-pager.'],
      ['Can I create multiple versions of my professional resume?', 'Yes. NextGen Resume lets you create and save multiple resumes so you can tailor each version to a different role or industry.'],
    ]
  },
  nopay: {
    title: 'Free Resume Builder — No Payment Required',
    documentTitle: 'Free Resume Builder No Pay | Build & Download Free | NextGen Resume',
    description: 'Build, customize, and download a professional resume for free. No credit card, no hidden fees. NextGen Resume is a 100% free resume builder.',
    intro: 'You should not have to pay to apply for a job. NextGen Resume gives you access to professional resume templates, an AI-powered builder, and a PDF download — all without requiring any payment or credit card details.',
    benefits: [
      'Create a professional resume completely free of charge',
      'Access all templates and the AI writing assistant at no cost',
      'Download your finished resume as a PDF without paying',
      'No credit card required — no hidden fees at any step',
    ],
    steps: [
      'Sign up for a free account — no payment details needed',
      'Choose a template, fill in your experience, and use AI suggestions to improve your bullets',
      'Download your completed resume as a PDF, for free',
    ],
    guidanceTitle: 'Why is NextGen Resume free?',
    guidance: 'NextGen Resume is built on the belief that everyone deserves access to professional career tools. The core resume builder, templates, and PDF export are all free. Optional premium features are available for job seekers who want additional tools, but you can build and download a complete, professional resume without spending anything.',
    faqs: [
      ['Is the resume builder really free?', 'Yes. You can create, customize, and download a professional resume for free. No credit card is required.'],
      ['Are there hidden charges?', 'The core builder and PDF download are free. Optional premium features exist, but you will never be surprised with charges for the basic tools.'],
      ['Do I need to create an account?', 'A free account lets you save your resume and come back to edit it. It takes under a minute to sign up and requires no payment information.'],
    ]
  },
  word: {
    title: 'Microsoft Word Resume Download',
    documentTitle: 'Microsoft Word Resume Download | Resume Templates for Word | NextGen Resume',
    description: 'Download resume templates compatible with Microsoft Word. Edit your resume in Word, or use NextGen Resume\'s online builder for a faster, smarter experience.',
    intro: 'Looking for a resume you can open and edit in Microsoft Word? NextGen Resume offers clean, professionally formatted resume templates you can download and edit in Word, or build online for real-time AI suggestions, live previews, and one-click PDF export.',
    benefits: [
      'Download clean resume templates ready for Microsoft Word',
      'Edit in Word or use the online builder for a faster workflow',
      'ATS-friendly formatting that works in both Word and PDF',
      'No design skills needed — just fill in your details',
    ],
    steps: [
      'Browse the resume templates and select one that fits your style',
      'Download the Word-compatible template or build online for more features',
      'Add your details, review the layout, and save or export your finished resume',
    ],
    guidanceTitle: 'Word vs. online resume builder — which is better?',
    guidance: 'Microsoft Word gives you manual formatting control, but an online resume builder saves time and eliminates formatting headaches. The online builder handles spacing, fonts, and layout automatically, and you can export a clean PDF in one click. If an employer specifically requests a .docx file, download the Word-compatible version after building your resume online.',
    faqs: [
      ['Can I download a resume as a Word file?', 'Yes. NextGen Resume provides Word-compatible template downloads in addition to PDF export.'],
      ['Will Word resume templates work with ATS?', 'Standard Word-formatted resumes with clear section headings and readable fonts generally perform well with applicant tracking systems. Avoid tables and text boxes that may confuse parsers.'],
      ['Is an online builder better than editing in Word?', 'For most job seekers, an online builder is faster and produces a more consistent result. Word is a good option if you need to manually adjust formatting or if the employer requires a .docx file.'],
    ]
  },
  googledocs: {
    title: 'Google Docs Resume Templates',
    documentTitle: 'Google Docs Resume Templates | Free Resume Templates | NextGen Resume',
    description: 'Get free resume templates for Google Docs. Build and edit your resume in Google Docs, or use NextGen Resume\'s smarter online builder for AI-powered suggestions and ATS scoring.',
    intro: 'Google Docs is a popular choice for building resumes because it is free, accessible from any device, and easy to share. NextGen Resume offers clean templates you can use in Google Docs, plus a more powerful online builder with AI suggestions, ATS checking, and one-click PDF export.',
    benefits: [
      'Access clean resume templates formatted for Google Docs',
      'Edit in Google Docs or build faster with the online builder',
      'Share your resume link or export a PDF in one step',
      'Works on any device — desktop, tablet, or mobile',
    ],
    steps: [
      'Choose a template that suits your experience level and industry',
      'Open it in Google Docs and fill in your details, or build it online for faster results',
      'Share a link or download a PDF when your resume is ready',
    ],
    guidanceTitle: 'Google Docs resume tips',
    guidance: 'When using Google Docs for your resume, keep your formatting simple. Stick to standard fonts such as Arial, Calibri, or Georgia. Avoid complex tables and use clear section headings. Before sending, export as PDF to lock the formatting. If you want AI suggestions and keyword matching, the NextGen Resume online builder delivers a faster, smarter experience.',
    faqs: [
      ['How do I use a Google Docs resume template?', 'Open the template link in Google Docs, make a copy to your Drive, and edit it with your own information. Then export as PDF or share the document link.'],
      ['Are Google Docs resumes ATS-friendly?', 'A simply formatted Google Docs resume without tables or images is generally readable by ATS. Avoid complex multi-column layouts and special formatting that may not parse correctly.'],
      ['Is an online builder better than Google Docs for resumes?', 'For most people, yes. An online builder handles formatting automatically, offers AI writing suggestions, and lets you check your resume against a job description.'],
    ]
  },
  ai: {
    title: 'Best AI Resume Builder',
    documentTitle: 'Best AI Resume Builder | Smart Resume Creation | NextGen Resume',
    description: 'Build a resume with AI assistance. Get smart bullet suggestions, a professional summary generator, and ATS keyword recommendations — all in one free tool.',
    intro: 'An AI resume builder does the heavy lifting so you can focus on accuracy and personalization. NextGen Resume uses artificial intelligence to suggest impactful bullet points, generate professional summaries, identify missing keywords, and score your resume against a target job description.',
    benefits: [
      'AI-powered bullet point suggestions based on your role and experience',
      'Instant professional summary generation tailored to the job',
      'ATS keyword analysis to identify gaps before you apply',
      'Real-time resume scoring against any job description',
    ],
    steps: [
      'Enter your work history and target role — the AI will suggest impactful bullet points',
      'Generate a professional summary and review AI keyword recommendations',
      'Run an ATS score check against your target job description and export your final resume',
    ],
    guidanceTitle: 'How to get the most from an AI resume builder',
    guidance: 'AI suggestions are a starting point, not a final draft. Always review and edit every bullet the AI generates to make sure it accurately reflects your own experience. Add your specific metrics, tools, and outcomes — a resume with real numbers beats a generic AI draft every time. Use the AI to structure and improve your content, but make sure every claim on the page is something you can genuinely back up in an interview.',
    faqs: [
      ['Does the AI write my resume for me?', 'The AI provides suggestions, structures your content, and recommends improvements. You review and edit every suggestion to ensure accuracy — the final resume is always yours.'],
      ['Can AI match my resume to a job description?', 'Yes. NextGen Resume\'s job analyzer compares your resume against a job description and highlights missing keywords and skill gaps.'],
      ['Is an AI resume builder better than writing it myself?', 'AI tools help you write faster, avoid blank-page paralysis, and catch gaps you might miss. The best resumes combine AI structure with your own accurate, specific achievements.'],
    ]
  },
  createonline: {
    title: 'Create Resume Online Free',
    documentTitle: 'Create Resume Online Free | Free Online Resume Builder | NextGen Resume',
    description: 'Create a professional resume online for free. No downloads, no software needed. Build, edit, and download your resume in minutes with NextGen Resume.',
    intro: 'Build your resume directly in your browser — no software to install, no files to manage. NextGen Resume\'s free online resume builder lets you create, edit, and download a professional resume from any device, anytime.',
    benefits: [
      'Build your resume online from any browser — no software needed',
      'Create a professional resume completely free, no credit card required',
      'Edit and update your resume anytime from any device',
      'Download as PDF or share a link instantly',
    ],
    steps: [
      'Open NextGen Resume in your browser and sign up for free',
      'Choose a professional template and fill in your experience, skills, and education',
      'Preview your resume, make final edits, and download as a clean PDF',
    ],
    guidanceTitle: 'Why build your resume online?',
    guidance: 'Online resume builders save you from formatting battles in Word or Google Docs. Everything is handled automatically — fonts, spacing, section layout — so you can focus on your content. NextGen Resume also gives you AI writing suggestions and a job description matcher so you know your resume is optimized before you apply.',
    faqs: [
      ['Can I create a resume online for free?', 'Yes. NextGen Resume is completely free to use. You can create, edit, and download a professional resume with no payment required.'],
      ['Do I need to install anything?', 'No. The entire resume builder runs in your browser. Just open the website, sign up, and start building.'],
      ['Can I edit my resume after downloading it?', 'Yes. Your resume is saved in your account. Log in anytime to make changes and re-download an updated version.'],
    ]
  },
  editresume: {
    title: 'Edit Resume Online Free',
    documentTitle: 'Edit Resume Online Free | Update Your Resume Instantly | NextGen Resume',
    description: 'Edit your resume online for free. Update your experience, skills, and formatting in real time, then download a fresh PDF — no software needed.',
    intro: 'Your resume should grow with your career. NextGen Resume makes it easy to edit your resume online, update any section, swap templates, and download an updated PDF whenever you need one — all for free, directly in your browser.',
    benefits: [
      'Edit every section of your resume online in real time',
      'Swap templates without losing your content',
      'Update skills, experience, and education in minutes',
      'Download an updated PDF anytime you make changes',
    ],
    steps: [
      'Log in to NextGen Resume and open the resume you want to edit',
      'Click any section to update your content, change your template, or reorder sections',
      'Preview the updated resume and download a fresh PDF when you are satisfied',
    ],
    guidanceTitle: 'Keep your resume up to date',
    guidance: 'A current resume is always ready when opportunity knocks. Update your resume after finishing a project, earning a certification, or changing roles. Small, regular updates are easier than a full rewrite. Use NextGen Resume\'s AI suggestions to strengthen weak bullets whenever you make edits.',
    faqs: [
      ['Can I edit my resume for free?', 'Yes. All editing features are free. Log in, make your changes, and download the updated version at no cost.'],
      ['Can I change my resume template after I have already built it?', 'Yes. You can switch between templates and your existing content will carry over automatically.'],
      ['How do I update my resume for a new job application?', 'Open your resume in the builder, update your summary and skills to match the new job description, and use the ATS checker to spot any missing keywords before applying.'],
    ]
  },
  kickresume: {
    title: 'NextGen Resume — The Best Kickresume Alternative',
    documentTitle: 'Best Kickresume Alternative | Free AI Resume Builder | NextGen Resume',
    description: 'Looking for a Kickresume alternative? NextGen Resume offers AI-powered resume building, ATS scoring, professional templates, and free PDF downloads — no paywall.',
    intro: 'NextGen Resume is a powerful, free alternative to Kickresume. Get professional templates, AI-powered writing suggestions, a real-time ATS score checker, and unlimited PDF downloads — without the subscription fees. Everything you need to build a standout resume, completely free.',
    benefits: [
      'Professional resume templates — no subscription required',
      'AI writing assistant that suggests impactful bullet points',
      'ATS score checker: compare your resume against any job description',
      'Unlimited free PDF downloads — no paywall',
    ],
    steps: [
      'Sign up for free — no credit card, no subscription',
      'Choose a professional template and build your resume with AI assistance',
      'Check your ATS score, refine your content, and download your PDF for free',
    ],
    guidanceTitle: 'Why choose NextGen Resume over Kickresume?',
    guidance: 'Kickresume is a popular resume builder, but its best features sit behind a paid subscription. NextGen Resume gives you professional templates, AI-powered writing help, and an ATS job description analyzer — all free. You can create multiple resume versions, tailor each one to a specific job, and download clean PDFs without hitting a paywall. It is built for job seekers who want serious tools without the cost.',
    examplesList: [
      { label: 'Free AI suggestions', text: 'Get AI-powered bullet point recommendations tailored to your role and industry — no paid plan needed.' },
      { label: 'ATS score checker', text: 'Paste any job description and instantly see how well your resume matches — identify missing keywords before you apply.' },
      { label: 'Multiple resume versions', text: 'Create separate resume versions for different roles or industries, all saved in one free account.' },
    ],
    faqs: [
      ['Is NextGen Resume a free alternative to Kickresume?', 'Yes. NextGen Resume is free to use. Core features including templates, AI suggestions, ATS scoring, and PDF downloads are all available without any subscription.'],
      ['Does NextGen Resume have an ATS checker like Kickresume?', 'Yes. Paste a job description into the job analyzer and NextGen Resume will show you your ATS match score and highlight missing keywords.'],
      ['Can I create multiple resumes like on Kickresume?', 'Yes. Your free account lets you create and save multiple resume versions so you can tailor applications for different roles.'],
    ]
  },
};

const relatedPages = [
  { to: '/ats-resume-builder', label: 'ATS Friendly Resume Template' },
  { to: '/resume-builder-for-freshers', label: 'Resume Builder for Freshers' },
  { to: '/free-resume-templates', label: 'Free Resume Templates' },
  { to: '/student-resume-builder', label: 'Resume Builder for Students' },
  { to: '/resume-builder-for-experienced', label: 'Resume Builder for Experienced' },
  { to: '/resume-examples', label: 'Resume Examples' },
  { to: '/resume-builder-pdf', label: 'Resume Builder PDF' },
  { to: '/professional-resume-builder', label: 'Professional Resume Builder' },
  { to: '/free-resume-builder', label: 'Free Resume Builder — No Pay' },
  { to: '/resume-builder-microsoft-word', label: 'Microsoft Word Resume' },
  { to: '/google-docs-resume-templates', label: 'Google Docs Resume Templates' },
  { to: '/ai-resume-builder', label: 'Best AI Resume Builder' },
  { to: '/create-resume-online-free', label: 'Create Resume Online Free' },
  { to: '/edit-resume-online', label: 'Edit Resume Online Free' },
  { to: '/kickresume-alternative', label: 'Kickresume Alternative' },
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

    // Scroll to top on every SEO page load
    window.scrollTo({ top: 0, behavior: 'instant' });

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

  const handleKeywordLink = (to) => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    navigate(to);
  };

  return (
    <div className="seo-landing">
      <section className="seo-hero">
        <div className="seo-hero-inner">
          <Link className="seo-breadcrumb" to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}>
            Home <span aria-hidden="true">/</span> {page.title}
          </Link>
          <span className="seo-eyebrow"><Sparkles size={15} /> YOUR NEXT STEP STARTS HERE</span>
          <h1>{page.title}</h1>
          <p className="seo-intro">{page.intro}</p>
          <div className="seo-hero-actions">
            <button type="button" className="seo-primary-button" onClick={handleBuildResume}>
              Build My Resume <ArrowRight size={18} />
            </button>
            <Link
              className="seo-secondary-button"
              to="/free-resume-templates"
              onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
            >
              Explore free templates
            </Link>
          </div>
          <div className="seo-trust-line">
            <ShieldCheck size={17} /> Clear guidance, professional layouts, and a resume you can make your own.
          </div>
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
            {relatedPages
              .filter((related) => related.to !== window.location.pathname)
              .map((related) => (
                <button
                  type="button"
                  className="seo-related-link-btn"
                  key={related.to}
                  onClick={() => handleKeywordLink(related.to)}
                >
                  {related.label}<ArrowRight size={16} />
                </button>
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
