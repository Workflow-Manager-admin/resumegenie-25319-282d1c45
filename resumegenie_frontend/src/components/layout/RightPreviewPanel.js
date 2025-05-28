import React from 'react';

/**
 * RightPreviewPanel for live document preview.
 * Contrasted, accessible, and responsive preview area.
 * Accepts previewMode and selectedTemplate, displays current mode and stubs for future document rendering.
 *
 * PUBLIC_INTERFACE
 */
function RightPreviewPanel({ activeSection, selectedTemplate, previewMode, formData }) {
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
    </aside>
  );
}

export default RightPreviewPanel;
