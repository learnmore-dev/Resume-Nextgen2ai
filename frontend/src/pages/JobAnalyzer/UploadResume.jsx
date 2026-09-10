import React, { useRef } from 'react';
import { UploadCloud, FileCheck, X, FileText } from 'lucide-react';

export const UploadResume = ({ file, onFileSelect, onFileRemove }) => {
  const inputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  return (
    <div>
      <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '800', color: '#0F172A', marginBottom: '0.5rem' }}>
        Upload External Resume (.PDF or .DOCX):
      </label>

      {!file ? (
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          style={{
            border: '2px dashed #93C5FD',
            background: '#F8FAFC',
            borderRadius: '12px',
            padding: '1.75rem',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#2563EB'; e.currentTarget.style.background = '#EFF6FF'; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#93C5FD'; e.currentTarget.style.background = '#F8FAFC'; }}
        >
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.docx,.txt"
            style={{ display: 'none' }}
            onChange={(e) => e.target.files?.[0] && onFileSelect(e.target.files[0])}
          />
          <UploadCloud size={36} color="#2563EB" style={{ margin: '0 auto 8px' }} />
          <div style={{ fontSize: '0.92rem', fontWeight: '800', color: '#0F172A' }}>
            Click to Browse or Drag & Drop your Resume PDF / DOCX
          </div>
          <div style={{ fontSize: '0.78rem', color: '#64748B', marginTop: '4px' }}>
            Supports .pdf, .docx (Max 10MB) — Full privacy & instant text extraction
          </div>
        </div>
      ) : (
        <div style={{
          border: '1.5px solid #86EFAC',
          background: '#F0FDF4',
          borderRadius: '10px',
          padding: '1rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FileCheck size={24} color="#15803D" />
            <div>
              <div style={{ fontSize: '0.88rem', fontWeight: '800', color: '#15803D' }}>{file.name}</div>
              <div style={{ fontSize: '0.74rem', color: '#166534' }}>
                {(file.size / 1024).toFixed(1)} KB • Ready for instant ATS scoring
              </div>
            </div>
          </div>
          <button
            onClick={onFileRemove}
            style={{
              background: '#DCFCE7',
              border: 'none',
              borderRadius: '6px',
              padding: '6px',
              cursor: 'pointer',
              color: '#15803D',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title="Remove uploaded file"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default UploadResume;
