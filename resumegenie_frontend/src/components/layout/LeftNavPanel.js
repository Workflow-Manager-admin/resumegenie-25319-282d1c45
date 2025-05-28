import React from 'react';

/**
 * LeftNavPanel for section navigation (Personal Info, Education, etc).
 * Visibly distinct, accessible and collapsible for small screens.
 *
 * PUBLIC_INTERFACE
 */
function LeftNavPanel() {
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
      {/* Placeholder: Will contain nav links for form sections */}
      <nav>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          <li><button style={{ background: 'none', border: 'none', color: 'inherit', font: 'inherit', cursor: 'pointer', padding: '8px 0', width: '100%', textAlign: 'left'}}>Personal Info</button></li>
          <li><button style={{ background: 'none', border: 'none', color: 'inherit', font: 'inherit', cursor: 'pointer', padding: '8px 0', width: '100%', textAlign: 'left'}}>Education</button></li>
          <li><button style={{ background: 'none', border: 'none', color: 'inherit', font: 'inherit', cursor: 'pointer', padding: '8px 0', width: '100%', textAlign: 'left'}}>Experience</button></li>
          {/* More sections to come */}
        </ul>
      </nav>
    </aside>
  );
}

export default LeftNavPanel;
