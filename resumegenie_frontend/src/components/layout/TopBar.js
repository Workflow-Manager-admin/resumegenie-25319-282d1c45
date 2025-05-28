import React from 'react';

/**
 * TopBar container for navigation and app branding.
 * Brand-aligned color, sticky positioning, and accessible structure.
 *
 * PUBLIC_INTERFACE
 */
function TopBar() {
  return (
    <nav
      className="navbar"
      style={{
        background: 'var(--kavia-dark)',
        borderBottom: '1px solid var(--border-color)',
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 100,
        height: 64,
        display: 'flex',
        alignItems: 'center',
      }}
      aria-label="Primary"
      tabIndex={0}
    >
      <div className="container" style={{display:'flex', justifyContent: 'space-between', width: '100%'}}>
        <div className="logo" style={{ fontWeight: 700, fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="logo-symbol" style={{color:'var(--kavia-orange)', fontSize: '1.4em', fontWeight: 800}}>*</span>
          ResumeGenie
        </div>
        <button className="btn" style={{fontWeight: 500}}>Options</button>
      </div>
    </nav>
  );
}

export default TopBar;
