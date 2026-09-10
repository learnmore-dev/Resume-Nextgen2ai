import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export const DomainSelectDropdown = ({
  options,
  value,
  onChange,
  placeholder = "-- Choose an IT Domain to Auto-Fill Entire Resume --",
  style = {}
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedItem = options.find(o => o.value === value);

  return (
    <div ref={dropdownRef} style={{ position: 'relative', width: '100%', ...style }}>
      {/* Trigger Button */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          padding: '0.62rem 0.95rem',
          borderRadius: '8px',
          background: '#FFFFFF',
          border: isOpen ? '1.5px solid #2563EB' : '1.5px solid #38BDF8',
          color: selectedItem ? '#0F172A' : '#64748B',
          fontSize: '0.88rem',
          fontWeight: '700',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          boxShadow: isOpen
            ? '0 0 0 3px rgba(56, 189, 248, 0.35), 0 4px 12px rgba(0,0,0,0.08)'
            : '0 2px 8px rgba(0,0,0,0.06)',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          userSelect: 'none'
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {selectedItem ? selectedItem.label : placeholder}
        </span>
        <ChevronDown
          size={18}
          color="#0284C7"
          style={{
            flexShrink: 0,
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        />
      </div>

      {/* Animated Dropdown Menu with Pure White Background & Hover Effects */}
      {isOpen && (
        <div
          className="custom-domain-dropdown-menu"
          style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            left: 0,
            right: 0,
            background: '#FFFFFF',
            borderRadius: '10px',
            border: '1.5px solid #BFDBFE',
            boxShadow: '0 15px 35px -5px rgba(15, 23, 42, 0.2), 0 8px 16px -4px rgba(15, 23, 42, 0.1)',
            zIndex: 99999,
            maxHeight: '290px',
            overflowY: 'auto',
            padding: '6px',
            backdropFilter: 'blur(8px)'
          }}
        >
          {options.map(item => {
            const isSelected = item.value === value;
            return (
              <div
                key={item.value}
                onClick={() => {
                  onChange(item.value);
                  setIsOpen(false);
                }}
                style={{
                  padding: '0.62rem 0.9rem',
                  borderRadius: '6px',
                  fontSize: '0.85rem',
                  fontWeight: isSelected ? '800' : '600',
                  color: isSelected ? '#1D4ED8' : '#1E293B',
                  background: isSelected ? 'linear-gradient(90deg, #EFF6FF 0%, #DBEAFE 100%)' : '#FFFFFF',
                  borderLeft: isSelected ? '3px solid #2563EB' : '3px solid transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  transition: 'all 0.18s cubic-bezier(0.4, 0, 0.2, 1)',
                  marginBottom: '2px'
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.background = '#F1F5F9';
                    e.currentTarget.style.transform = 'translateX(4px)';
                    e.currentTarget.style.color = '#2563EB';
                    e.currentTarget.style.borderLeftColor = '#60A5FA';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.background = '#FFFFFF';
                    e.currentTarget.style.transform = 'translateX(0)';
                    e.currentTarget.style.color = '#1E293B';
                    e.currentTarget.style.borderLeftColor = 'transparent';
                  }
                }}
              >
                <span>{item.label}</span>
                {isSelected && <Check size={16} color="#2563EB" style={{ flexShrink: 0 }} />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DomainSelectDropdown;
