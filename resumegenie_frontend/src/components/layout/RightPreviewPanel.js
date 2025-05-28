import React from 'react';

/**
 * RightPreviewPanel for live document preview.
 * Contrasted, accessible, and responsive preview area.
 *
 * PUBLIC_INTERFACE
 */
function RightPreviewPanel({ activeSection, selectedTemplate }) {
  // Accept props for live preview (not yet implemented)
  return (
    <aside
      className="right-preview-panel"
      style={{
        background: 'var(--kavia-dark)',
        borderLeft: '1px solid var(--border-color)',
        minWidth: 250,
        maxWidth: 360,
        flex: '0 0 320px',
        padding: '1.5rem 0.7rem',
        color: 'var(--text-secondary)',
        height: 'calc(100vh - 64px)',
        overflowY: 'auto',
        boxSizing: 'border-box',
        position: 'sticky',
        top: 64
      }}
      aria-label="Live Preview Panel"
      tabIndex={0}
    >
      <h3 style={{ color: 'var(--kavia-orange)', fontWeight: 500, marginTop: 0 }}>Live Preview</h3>
      {/* Placeholder for real-time preview */}
      <section
        style={{
          background: 'rgba(34,20,50,0.94)',
          borderRadius: 8,
          padding: '1.5rem',
          color: 'var(--text-color)',
          minHeight: 300,
          marginTop: '1rem'
        }}
        aria-live="polite"
      >
        {/* Displays info about section/template as stub */}
        <div style={{ fontWeight: 400, color: '#be73d3', fontSize: 16, marginBottom: 4 }}>
          {selectedTemplate} template &mdash; {activeSection ? `Section: ${activeSection}` : 'No section selected'}
        </div>
        Preview will appear here...
      </section>
    </aside>
  );
}

export default RightPreviewPanel;
