import React from 'react';

/**
 * LeftNavPanel for section navigation (Personal Info, Education, etc).
 * Visibly distinct, accessible and collapsible for small screens.
 * Accepts sections list, activeSection, and onSectionChange handler as props.
 *
 * PUBLIC_INTERFACE
 */
function LeftNavPanel({ sections = [], activeSection, onSectionChange }) {
  return (
    <aside
      className="left-nav-panel"
      style={{
        background: 'var(--kavia-dark)',
        borderRight: '1px solid var(--border-color)',
        minWidth: 200,
        maxWidth: 260,
        flex: '0 0 220px',
        padding: '1.5rem 0.5rem',
        color: 'var(--text-color)',
        height: 'calc(100vh - 64px)',
        boxSizing: 'border-box',
        position: 'sticky',
        top: 64
      }}
      aria-label="Section Navigation"
      tabIndex={0}
    >
      {/* Navigation links for form sections */}
      <nav>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {sections.map(section => (
            <li key={section.id}>
              <button
                type="button"
                onClick={() => onSectionChange && onSectionChange(section.id)}
                style={{
                  background: activeSection === section.id ? 'linear-gradient(93deg,var(--accent) 47%, var(--secondary-bg) 93%)' : 'transparent',
                  border: 'none',
                  color: activeSection === section.id ? '#fff' : 'var(--text-secondary)',
                  font: 'inherit',
                  cursor: 'pointer',
                  padding: '10px 16px',
                  width: '100%',
                  textAlign: 'left',
                  fontWeight: activeSection === section.id ? 600 : 400,
                  borderRadius: 5,
                  marginBottom: 2,
                  marginTop: 1,
                  letterSpacing: activeSection === section.id ? '0.002em' : undefined,
                  boxShadow: activeSection === section.id ? '0 2px 8px 0 rgba(190,115,211,0.17)' : undefined,
                  transition: 'background 0.13s, color 0.13s, box-shadow 0.13s'
                }}
                aria-current={activeSection === section.id ? 'page' : undefined}
                tabIndex={0}
              >
                {section.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default LeftNavPanel;
