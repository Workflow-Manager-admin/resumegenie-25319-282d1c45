import React from 'react';

/**
 * RightPreviewPanel for live document preview.
 * Contrasted, accessible, and responsive preview area.
 * Accepts previewMode and selectedTemplate, displays current mode and stubs for future document rendering.
 *
 * PUBLIC_INTERFACE
 */
function RightPreviewPanel({ activeSection, selectedTemplate, previewMode, formData, previewOpen, onTogglePreviewPanel }) {
  // Accept props for live preview - will render real docs in future

  // Responsive: If on mobile (or <1050px), handled by CSS not to display. Otherwise allow slide/hidden.
  // Add a sliding panel class if not open.
  const panelClass = previewOpen ? "right-preview-panel" : "right-preview-panel slide-collapsed";

  return (
    <aside
      className={panelClass}
      aria-label="Live Preview Panel"
      tabIndex={0}
    >
      {/* Show a collapsed/reopen button on the panel edge for desktop (visible only when closed on larger screens),
          optionally as a vertical tab - can be improved with more CSS if needed */}
      {!previewOpen && (
        <button
          aria-label="Open preview panel"
          onClick={onTogglePreviewPanel}
          style={{
            position: 'fixed',
            right: 0,
            top: '45%',
            zIndex: 130,
            background: 'var(--accent)',
            color: '#fff',
            border: 'none',
            borderRadius: '16px 0 0 16px',
            minWidth: 30,
            padding: '13px 7px 15px 2px',
            fontWeight: 700,
            boxShadow: '0 1.5px 10px 0 rgba(190,115,211,0.21)',
            display: 'none'
          }}
          className="right-preview-reopen"
        >
          {/* Simple icon/arrow */}
          <svg width="18" height="28" aria-hidden="true">
            <polyline points="3,5 13,14 3,23" stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </svg>
        </button>
      )}
      {/* Only render content if panel is open */}
      {previewOpen &&
        <>
        <h3 style={{ 
          color: 'var(--accent)', 
          fontWeight: 600, 
          marginTop: 0, 
          fontSize: 21, 
          letterSpacing: '0.01em' 
        }}>
          Live Preview {previewMode === 'cover' ? '— Cover Letter' : '— Resume'}
        </h3>
        {/* Placeholder for real-time preview */}
        <section
          style={{
            background: 'linear-gradient(104deg,rgba(34,20,50,0.94) 80%, var(--accent) 180%)',
            borderRadius: 11,
            padding: '1.5rem',
            color: 'var(--text-color)',
            minHeight: 280,
            marginTop: '1rem',
            boxShadow: '0 2px 12px 0 rgba(34,20,50,0.15)'
          }}
          aria-live="polite"
        >
          {/* Displays info about section/template as stub */}
          <div style={{ fontWeight: 500, color: 'var(--accent)', fontSize: 15.8, marginBottom: 4 }}>
            {selectedTemplate} template &mdash; {previewMode === 'cover' ? 'Cover Letter' : 'Resume'}<br />
            {activeSection ? `Section: ${activeSection}` : 'No section selected'}
          </div>
          {/* Real-time preview data */}
          <div style={{ color: '#fff', opacity: 0.9, marginTop: 12, fontSize: 14 }}>
            {/* Simple structured preview - update/extend in future! */}
            <span style={{ color: "var(--kavia-orange)", fontWeight: 700 }}>Live Form Data:</span>
            <pre style={{
              fontSize: 13.5,
              background: "rgba(190,115,211,0.06)",
              padding: '12px 16px',
              borderRadius: 7,
              maxWidth: 330,
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              color: "#e0e0ef",
              marginTop: 6,
            }}>
              {JSON.stringify(formData, null, 2)}
            </pre>
          </div>
        </section>
        {/* TODO: Insert analytics, download shortcut, or view switcher as needed */}
        </>
      }
    </aside>
  );
}

export default RightPreviewPanel;
