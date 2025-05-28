import React from 'react';

/**
 * TopBar container for navigation, app branding, and controls.
 * Brand-aligned color, sticky positioning, and accessible structure.
 * Adds template selector, export button (stub), resume/cover toggle, and AI (disabled) controls.
 * 
 * PUBLIC_INTERFACE
 */
function TopBar({ selectedTemplate, onTemplateChange, onExport, previewMode, onTogglePreviewMode }) {
  // Available template choices
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
        {/* Controls section */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          {/* Preview toggle button */}
          <button
            style={{
              background: 'linear-gradient(93deg, var(--accent) 17%, var(--secondary-bg) 95%)',
              border: '1.5px solid var(--accent)',
              borderRadius: 7,
              color: '#fff',
              fontSize: 15.3,
              padding: '7px 17px',
              fontWeight: 600,
              marginRight: 12,
              cursor: 'pointer',
              outlineOffset: '2px',
              boxShadow: '0 1px 7px 0 rgba(190,115,211,0.09)'
            }}
            onClick={onTogglePreviewMode}
            aria-label="Toggle between Resume and Cover Letter preview mode"
          >
            {previewMode === 'resume'
              ? <>Resume <span style={{ color: 'var(--accent)', marginLeft: 2 }}>/ Cover Letter</span></>
              : <>Cover Letter <span style={{ color: 'var(--accent)', marginLeft: 2 }}>/ Resume</span></>
            }
          </button>

          {/* Template Selector */}
          <label htmlFor="template-selector" style={{ color: 'var(--text-secondary)', marginRight: 6, fontSize: 14.2 }}>
            Template:
          </label>
          <select
            id="template-selector"
            value={selectedTemplate}
            onChange={e => onTemplateChange && onTemplateChange(e.target.value)}
            style={{
              background: 'var(--panel-bg)',
              border: '1.5px solid var(--accent)',
              borderRadius: 5,
              color: 'var(--accent)',
              fontWeight: 600,
              fontSize: 15.2,
              padding: '7px 13px',
              marginRight: 4
            }}
            aria-label="Select Template"
          >
            {templates.map(template => (
              <option key={template} value={template}>{template}</option>
            ))}
          </select>

          {/* Export button (functional stub) */}
          <button
            className="btn"
            style={{
              fontWeight: 600,
              marginLeft: 10,
              minWidth: 88,
              background: 'linear-gradient(90deg, var(--secondary-bg) 70%, var(--accent) 120%)',
              border: '1.5px solid var(--accent)'
            }}
            onClick={onExport}
            aria-label="Export current document (Resume/Cover Letter)"
          >
            Export
          </button>

          {/* AI-powered suggest button (disabled stub) */}
          <button
            className="btn"
            style={{
              marginLeft: 8,
              minWidth: 120,
              background: 'rgba(190,115,211,0.11)',
              color: 'var(--accent)',
              opacity: 0.45,
              cursor: 'not-allowed'
            }}
            title="Coming soon: AI-powered resume suggestions"
            disabled
            aria-disabled="true"
          >
            {/* UFO/AI Sparkle Emoji for stub effect */}
            <span style={{ marginRight: 6 }}>✨</span>
            AI Suggest
          </button>

          {/* Export as PDF/Docx direct selectors (future, stub & disabled) */}
          <button
            className="btn"
            style={{
              marginLeft: 4,
              minWidth: 50,
              background: 'rgba(190,115,211,0.07)',
              color: '#fff',
              opacity: 0.48,
              cursor: 'not-allowed',
              border: 'none'
            }}
            title="Export to PDF (coming soon)"
            disabled
            aria-disabled="true"
          >
            PDF
          </button>
          <button
            className="btn"
            style={{
              marginLeft: 2,
              minWidth: 56,
              background: 'rgba(190,115,211,0.07)',
              color: '#fff',
              opacity: 0.48,
              cursor: 'not-allowed',
              border: 'none'
            }}
            title="Export to Word (.docx) (coming soon)"
            disabled
            aria-disabled="true"
          >
            DOCX
          </button>
        </div>
      </div>
    </nav>
  );
}

export default TopBar;
