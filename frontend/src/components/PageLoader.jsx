import React from 'react';

/**
 * Ultra-lightweight, smooth page transition loader.
 * Renders a subtle top progress bar and minimal spinner with 0 layout shift.
 */
export const PageLoader = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '40vh',
        width: '100%',
        padding: '2rem',
      }}
    >
      <div
        style={{
          width: '36px',
          height: '36px',
          border: '3px solid #E2E8F0',
          borderTopColor: '#ee571d',
          borderRadius: '50%',
          animation: 'spin 0.6s linear infinite',
        }}
      />
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
