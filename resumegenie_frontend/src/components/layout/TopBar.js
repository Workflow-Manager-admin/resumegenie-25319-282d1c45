import React from 'react';

/**
 * TopBar container for navigation, app branding, and controls.
 * Brand-aligned color, sticky positioning, and accessible structure.
 * Adds template selector, export button (stub), resume/cover toggle, and AI (disabled) controls.
 * 
 * PUBLIC_INTERFACE
 */
function TopBar({ selectedTemplate, onTemplateChange, onExport, previewMode, onTogglePreviewMode, previewOpen, onTogglePreviewPanel }) {
  // Available template choices
  const templates = ['Modern', 'Minimalist', 'Traditional'];

  // Icon for preview toggle - simple chevron right/left
  const previewPanelIcon = previewOpen
    ? (
      <svg width="23" height="23" style={{ verticalAlign: 'middle', marginRight: 3 }} aria-hidden="true">
        <polyline points="8,5 15,11.5 8,18" stroke="#be73d3" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </svg>
    )
    : (
      <svg width="23" height="23" style={{ verticalAlign: 'middle', marginRight: 2 }} aria-hidden="true">
        <polyline points="15,5 8,11.5 15,18" stroke="#be73d3" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </svg>
    );

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
          {/* Template Selector with toggle immediately after */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <label htmlFor="template-selector" style={{ color: 'var(--text-secondary)', marginRight: 6, fontSize: 14.2 }}>
              Template:
            </label>
            <select
              id="template-selector"
              value={selectedTemplate}
              // PUBLIC_INTERFACE: Template selection propagates template change instantly upward to App
              onChange={e => onTemplateChange && onTemplateChange(e.target.value)}
              style={{
                background: 'var(--panel-bg)',
                border: '1.5px solid var(--accent)',
                borderRadius: 5,
                color: 'var(--accent)',
                fontWeight: 600,
                fontSize: 15.2,
                padding: '7px 13px',
                marginRight: 2
              }}
              aria-label="Select Template"
            >
              {templates.map(template => (
                <option key={template} value={template}>{template}</option>
              ))}
            </select>
            {/* Compact Hide/Show Preview toggle button */}
            <button
              className="preview-toggle-compact"
              aria-label={previewOpen ? "Hide preview panel" : "Show preview panel"}
              onClick={onTogglePreviewPanel}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'none',
                border: 'none',
                outline: 'none',
                padding: '4px 5px',
                borderRadius: '5px',
                marginLeft: '1px',
                marginRight: '8px',
                minWidth: '1.7em',
                minHeight: '1.7em',
                color: 'var(--accent)',
                transition: 'background 0.12s, box-shadow 0.11s',
                boxShadow: previewOpen ? '0 1.5px 8px 0 rgba(190,115,211,.10)' : 'none',
                backgroundColor: previewOpen ? 'rgba(190,115,211,0.09)' : 'rgba(138,138,138,0.06)'
              }}
              tabIndex={0}
              title={previewOpen ? "Hide preview panel" : "Show preview panel"}
            >
              {previewPanelIcon}
              <span className="sr-only">{previewOpen ? 'Hide preview' : 'Show preview'}</span>
            </button>
          </div>

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

          {/* 
            === AI-powered Suggest Button ===
            Disabled, visual-only stub; when enabled, will apply AI grammar/spell/tone improvements to whole document.
            Implementation: Connect to future /ai/suggest endpoint with all form data as payload.
          */}
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
          {/* 
            === AI-powered Grammar/Spell/Tone Feedback Icon (stub) ===
            Serves as explainer/control placeholder for global AI in TopBar.
            In the future, clicking this will open an insights panel or show feedback on writing quality, spelling, and tone.
          */}
          <button
            style={{
              marginLeft: 6,
              background: 'rgba(115,211,190,0.10)',
              border: 'none',
              borderRadius: 6,
              color: 'var(--accent)',
              fontWeight: 500,
              fontSize: 15,
              opacity: 0.34,
              cursor: 'not-allowed',
              minWidth: 46,
              padding: '0.5em 1em'
            }}
            disabled
            aria-disabled="true"
            tabIndex={-1}
            title="AI-powered grammar & tone insights (coming soon)"
          >
            <span role="img" aria-label="AI Grammar/Tone">📝</span>
          </button>

          {/* === Export Download Buttons (PDF & Word) === */}
          <button
            className="btn"
            style={{
              marginLeft: 4,
              minWidth: 50,
              background: 'linear-gradient(90deg, var(--secondary-bg) 70%, var(--accent) 120%)',
              color: '#fff',
              border: '1.5px solid var(--accent)',
              opacity: 1,
              cursor: 'pointer',
            }}
            type="button"
            title="Export to PDF"
            onClick={() => onExport('pdf')}
          >
            PDF
          </button>
          <button
            className="btn"
            style={{
              marginLeft: 2,
              minWidth: 56,
              background: 'linear-gradient(90deg, var(--secondary-bg) 60%, var(--accent) 100%)',
              color: '#fff',
              border: '1.5px solid var(--accent)',
              opacity: 1,
              cursor: 'pointer',
            }}
            type="button"
            title="Export to Word (.docx)"
            onClick={() => onExport('docx')}
          >
            DOCX
          </button>
        </div>
      </div>
    </nav>
  );
}

export default TopBar;
