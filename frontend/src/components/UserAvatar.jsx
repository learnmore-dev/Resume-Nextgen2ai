import React, { useState, useEffect } from 'react';

/**
 * Robust, high-performance UserAvatar component.
 * - Always includes `referrerPolicy="no-referrer"` so Google profile avatars (lh3.googleusercontent.com)
 *   are NEVER blocked with 403 Forbidden by Google's anti-hotlinking referer check.
 * - Gracefully handles load failures via `onError` and immediately falls back to a clean,
 *   gradient initial badge so broken image icons never appear.
 * - Dynamically generates consistent, pleasant gradients based on user's name.
 */

// Curated palette of modern gradients for initial avatars
const AVATAR_GRADIENTS = [
  'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)', // Indigo / Purple
  'linear-gradient(135deg, #2563EB 0%, #38BDF8 100%)', // Blue / Sky
  'linear-gradient(135deg, #059669 0%, #10B981 100%)', // Emerald
  'linear-gradient(135deg, #D97706 0%, #F59E0B 100%)', // Amber
  'linear-gradient(135deg, #DC2626 0%, #F87171 100%)', // Rose
  'linear-gradient(135deg, #7C3AED 0%, #C084FC 100%)', // Violet
  'linear-gradient(135deg, #0D9488 0%, #2DD4BF 100%)', // Teal
];

function getGradientForName(name = '') {
  let hash = 0;
  const str = String(name || 'User');
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % AVATAR_GRADIENTS.length;
  return AVATAR_GRADIENTS[index];
}

export const getCleanInitial = (name = '', fallback = 'U') => {
  if (!name) return fallback;
  // Strip non-letter leading characters and grab first visible character
  const clean = String(name).replace(/^[^a-zA-Z0-9]+/, '');
  return clean ? clean.charAt(0).toUpperCase() : fallback;
};

export const getCleanFirstName = (name = '', username = '') => {
  const raw = name || username || '';
  if (!raw) return 'User';
  // Split on dots, spaces, underscores, or hyphens (e.g., 'sowmya.learnmore' -> 'Sowmya')
  const parts = raw.split(/[ ._\-@]/);
  const first = parts[0] || 'User';
  return first.charAt(0).toUpperCase() + first.slice(1);
};

export const UserAvatar = ({
  src,
  name,
  size = 24,
  className = '',
  style = {},
  border = 'none'
}) => {
  const [hasError, setHasError] = useState(false);

  // Reset error state if the src prop changes
  useEffect(() => {
    setHasError(false);
  }, [src]);

  const initial = getCleanInitial(name, 'U');
  const gradient = getGradientForName(name);
  const fontSize = Math.max(10, Math.floor(size * 0.42));

  // If valid image src is available and no error occurred during loading
  if (src && !hasError) {
    return (
      <img
        src={src}
        alt={name || 'User profile'}
        referrerPolicy="no-referrer"
        crossOrigin="anonymous"
        onError={() => setHasError(true)}
        className={className}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: '50%',
          objectFit: 'cover',
          display: 'inline-block',
          border,
          flexShrink: 0,
          ...style
        }}
      />
    );
  }

  // Fallback avatar badge with initials
  return (
    <div
      className={className}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        background: gradient,
        color: '#FFFFFF',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: `${fontSize}px`,
        fontWeight: 700,
        letterSpacing: '-0.02em',
        userSelect: 'none',
        border,
        flexShrink: 0,
        boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
        ...style
      }}
      title={name || 'User'}
    >
      {initial}
    </div>
  );
};
