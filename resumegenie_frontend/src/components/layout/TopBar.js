import React from 'react';

/**
 * TopBar container for navigation, app branding, and controls.
 * Brand-aligned color, sticky positioning, and accessible structure.
 * PUBLIC_INTERFACE
 */
function TopBar({ selectedTemplate, onTemplateChange, onExport }) {
  // Available templates (stub)
  const templates = ['Modern', 'Minimalist', 'Traditional'];

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
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <div className="logo" style={{ fontWeight: 700, fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="logo-symbol" style={{ color: 'var(--kavia-orange)', fontSize: '1.4em', fontWeight: 800 }}>*</span>
          ResumeGenie
        </div>
        {/* Template selector and Export controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <label htmlFor="template-selector" style={{ color: 'var(--text-secondary)', marginRight: 6, fontSize: 14 }}>
            Template:
          </label>
          <select
            id="template-selector"
            value={selectedTemplate}
            onChange={e => onTemplateChange && onTemplateChange(e.target.value)}
            style={{
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid var(--border-color)',
              borderRadius: 4,
              color: 'var(--text-color)',
              fontSize: 15,
              padding: '5px 10px',
            }}
            aria-label="Select Template"
          >
            {templates.map(template => (
              <option key={template} value={template}>{template}</option>
            ))}
          </select>
          <button
            className="btn"
            style={{ fontWeight: 500, marginLeft: 10, minWidth: 88 }}
            onClick={onExport}
            aria-label="Export Resume/Cover Letter"
          >
            Export
          </button>
        </div>
      </div>
    </nav>
  );
}

export default TopBar;
