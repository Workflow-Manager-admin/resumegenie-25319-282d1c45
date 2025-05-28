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
                  background: activeSection === section.id ? 'var(--kavia-orange)' : 'none',
                  border: 'none',
                  color: activeSection === section.id ? '#fff' : 'inherit',
                  font: 'inherit',
                  cursor: 'pointer',
                  padding: '8px 14px',
                  width: '100%',
                  textAlign: 'left',
                  fontWeight: activeSection === section.id ? 600 : 400,
                  borderRadius: 4,
                  marginBottom: 2,
                  transition: 'background 0.13s, color 0.13s'
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
