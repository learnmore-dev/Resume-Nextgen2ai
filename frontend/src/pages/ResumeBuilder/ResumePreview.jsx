import React from 'react';
import { TemplateRenderer } from './templates/TemplateRenderer';

export const ResumePreview = ({ resume }) => {
  if (!resume) return <div style={{ color: 'var(--text-muted)' }}>Loading resume preview...</div>;

  return (
    <div className="builder-preview" style={{ background: '#FFFFFF', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', overflowY: 'auto', maxHeight: 'calc(100vh - 110px)', padding: '1.25rem', paddingBottom: '1.25rem' }}>
      <TemplateRenderer resume={resume} />
      
      {/* Print Restriction Banner (Only visible on browser Ctrl+P / Print) */}
      <div className="print-restriction-banner">
        <div style={{ fontSize: '18px', fontWeight: '800', marginBottom: '6px' }}>
          🔒 Full Resume Print Restricted
        </div>
        <div style={{ fontSize: '13px', lineHeight: '1.5' }}>
          Browser printing (Ctrl+P) is disabled. Experience, Education, Projects & Skills are hidden.<br />
          Please click the <strong>"Download PDF"</strong> button inside the app to download your complete official resume.
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
