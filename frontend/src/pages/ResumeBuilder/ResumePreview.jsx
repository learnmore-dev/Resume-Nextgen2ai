import React from 'react';
import { TemplateRenderer } from './templates/TemplateRenderer';

export const ResumePreview = ({ resume }) => {
  if (!resume) return <div style={{ color: 'var(--text-muted)' }}>Loading resume preview...</div>;

  return (
    <div className="builder-preview" style={{ background: '#FFFFFF', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
      <TemplateRenderer resume={resume} />
    </div>
  );
};

export default ResumePreview;
