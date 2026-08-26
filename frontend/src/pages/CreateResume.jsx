import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, FileText, Sparkles } from 'lucide-react';

// This small first step mirrors the resume.ai flow: collect the essentials,
// then let the user choose a layout before opening the editor.
export const CreateResume = () => {
  const navigate = useNavigate();
  const [details, setDetails] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('resume_onboarding_details')) || {
        full_name: '',
        email: ''
      };
    } catch {
      return { full_name: '', email: '' };
    }
  });

  const submit = (event) => {
    event.preventDefault();
    localStorage.setItem('resume_onboarding_details', JSON.stringify(details));
    navigate('/create-resume/templates');
  };

  return (
    <div className="onboarding-page">
      <header className="onboarding-header">
        <div className="onboarding-brand"><Sparkles size={24} /> HireMint</div>
      </header>
      <main className="onboarding-content">
        <div className="onboarding-step">Step 1 of 2</div>
        <div className="onboarding-icon"><FileText size={30} /></div>
        <h1>Let's start with the basics</h1>
        <p>Your details will appear at the top of your resume. You can update them anytime.</p>
        <form className="onboarding-form" onSubmit={submit}>
          <label htmlFor="full_name">Full name</label>
          <input
            id="full_name"
            value={details.full_name}
            onChange={(event) => setDetails({ ...details, full_name: event.target.value })}
            placeholder="Altaf Mansoori"
            autoComplete="name"
            required
          />
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            type="email"
            value={details.email}
            onChange={(event) => setDetails({ ...details, email: event.target.value })}
            placeholder="you@example.com"
            autoComplete="email"
            required
          />
          <button type="submit">Continue to templates <ArrowRight size={18} /></button>
        </form>
      </main>
    </div>
  );
};

export default CreateResume;
