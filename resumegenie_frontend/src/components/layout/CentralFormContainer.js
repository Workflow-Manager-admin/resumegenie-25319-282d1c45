import React from 'react';

/**
 * CentralFormContainer for the main form-based UI.
 * Responsive, visually distinct, and accessible.
 * Receives props for current section/label, previewMode, and AI suggest (stub) for future extensibility.
 *
 * PUBLIC_INTERFACE
 */
function CentralFormContainer({ sectionId, sectionLabel, previewMode, onAISuggest }) {
  // AI-powered suggest (stubbed, disables button); future: context for smart suggestions
  // Note: Will lift this logic higher or make contextual in future

  return (
    <section
      className="central-form-container"
      style={{
        flex: '2 1 520px',
        minWidth: 300,
        maxWidth: 700,
        padding: '2rem 1.5rem',
        background: 'rgba(40, 35, 60, 0.98)',
        height: 'calc(100vh - 64px)',
        overflowY: 'auto',
        boxSizing: 'border-box'
      }}
      aria-label="Resume/Cover Letter Form"
      tabIndex={0}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 10, marginLeft: 2 }}>
        <h2 style={{
          color: 'var(--kavia-accent)',
          fontWeight: 700,
          marginTop: 0,
          marginBottom: 0,
          fontSize: 24,
          letterSpacing: 0.015 + 'em'
        }}>
          {sectionLabel ? `${sectionLabel}` : 'Build Your Resume'}
        </h2>
        {/* Preview mode shown inline */}
        <span
          style={{
            fontSize: 14.2,
            color: 'var(--accent)',
            fontWeight: 500,
            marginLeft: 4,
            background: 'rgba(190,115,211,0.12)',
            borderRadius: 7,
            padding: '2.5px 8px',
            letterSpacing: '0.02em'
          }}
        >
          Preview:&nbsp;{previewMode === 'resume' ? 'Resume' : 'Cover Letter'}
        </span>
        {/* AI Suggest button (disabled stub, enable after MVP) */}
        <button
          style={{
            background: 'rgba(190,115,211,0.10)',
            color: 'var(--accent)',
            opacity: 0.45,
            cursor: 'not-allowed',
            border: 'none',
            borderRadius: 5,
            marginLeft: 10,
            fontWeight: 500,
            fontSize: 14.3,
            padding: '4.5px 16px'
          }}
          aria-disabled="true"
          disabled
          title="AI-powered content suggestion (coming soon)"
          tabIndex={-1}
        >
          {/* Sparkle/AI icon for visual cue */}
          <span role="img" aria-label="AI">✨</span> AI Suggest
        </button>
      </div>
      {/* Placeholder: Form fields/components go here */}
      <div style={{ color: 'var(--text-secondary)', marginTop: 12 }}>
        {sectionId
          ? `Form section placeholder for "${sectionLabel}" (${sectionId})`
          : 'Form section stubs will be inserted here...'}
      </div>

      {/* Export controls or analytics stubs can be added here */}
      {/* TODO: Insert step nav, completion bar, analytics stub below form */}
      {/* TODO: Add helper text for each section (future) */}
    </section>
  );
}

export default CentralFormContainer;
