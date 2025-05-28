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
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid var(--border-color)',
              borderRadius: 5,
              color: 'var(--text-color)',
              fontSize: 15,
              padding: '6px 13px',
              fontWeight: 500,
              marginRight: 12,
              cursor: 'pointer',
              outlineOffset: '1px'
            }}
            onClick={onTogglePreviewMode}
            aria-label="Toggle between Resume and Cover Letter preview mode"
          >
            {previewMode === 'resume'
              ? <>Resume <span style={{ color: '#be73d3', marginLeft: 2 }}>/ Cover Letter</span></>
              : <>Cover Letter <span style={{ color: '#be73d3', marginLeft: 2 }}>/ Resume</span></>
            }
          </button>

          {/* Template Selector */}
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

          {/* Export button (functional stub) */}
          <button
            className="btn"
            style={{ fontWeight: 500, marginLeft: 10, minWidth: 88 }}
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
              background: 'rgba(220, 144, 208, 0.13)',
              color: '#be73d3',
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
              background: 'rgba(255,255,255,0.07)',
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
              background: 'rgba(255,255,255,0.07)',
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
