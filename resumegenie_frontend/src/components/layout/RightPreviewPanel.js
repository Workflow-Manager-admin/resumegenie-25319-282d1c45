import React from 'react';

/**
 * RightPreviewPanel for live document preview.
 * Contrasted, accessible, and responsive preview area.
 * Accepts previewMode and selectedTemplate, displays current mode and stubs for future document rendering.
 *
 * PUBLIC_INTERFACE
 */
function RightPreviewPanel({ activeSection, selectedTemplate, previewMode }) {
  // Accept props for live preview - will render real docs in future
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
      <h3 style={{ color: 'var(--kavia-orange)', fontWeight: 500, marginTop: 0 }}>
        Live Preview {previewMode === 'cover' ? '— Cover Letter' : '— Resume'}
      </h3>
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
          {selectedTemplate} template &mdash; {previewMode === 'cover' ? 'Cover Letter' : 'Resume'}<br />
          {activeSection ? `Section: ${activeSection}` : 'No section selected'}
        </div>
        {/* TODO: Live rendered resume/cover doc here */}
        Preview will appear here...
      </section>
      {/* TODO: Insert analytics, download shortcut, or view switcher as needed */}
    </aside>
  );
}

export default RightPreviewPanel;
