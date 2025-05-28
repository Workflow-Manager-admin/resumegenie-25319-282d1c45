import React, { useState } from 'react';
import './App.css';

import TopBar from './components/layout/TopBar';
import LeftNavPanel from './components/layout/LeftNavPanel';
import CentralFormContainer from './components/layout/CentralFormContainer';
import RightPreviewPanel from './components/layout/RightPreviewPanel';

/**
 * ResumeGenie Main Container App
 * Lays out the app with TopBar, LeftNavPanel, CentralFormContainer, and RightPreviewPanel.
 *
 * Manages main app navigation section state and passes handlers to nav and form containers.
 *
 * PUBLIC_INTERFACE
 */
function App() {
  // Define canonical section IDs for navigation/app steps
  const sections = [
    { id: 'personal', label: 'Personal Info' },
    { id: 'education', label: 'Education' },
    { id: 'experience', label: 'Experience' },
    // Add further sections as needed, e.g. skills, projects etc
  ];

  // Maintain active section as state
  const [activeSection, setActiveSection] = useState(sections[0].id);

  // Optionally: pass template & export handlers to TopBar
  const [selectedTemplate, setSelectedTemplate] = useState('Modern');

  // Placeholder for TopBar export option (no-op for now)
  const handleExport = () => {
    // Placeholder action for export
    alert('Export function is not yet implemented.');
  };

  // Central container stub props: Which section to show
  return (
    <div className="app" tabIndex={-1}>
      <TopBar
        selectedTemplate={selectedTemplate}
        onTemplateChange={setSelectedTemplate}
        onExport={handleExport}
      />
      <main
        className="main-container"
        style={{
          display: 'flex',
          flex: 1,
          minHeight: '100vh',
          marginTop: 64, // height of TopBar (for fixed position)
        }}
        aria-label="Main content area"
      >
        <LeftNavPanel
          sections={sections}
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
        <CentralFormContainer
          sectionId={activeSection}
          sectionLabel={sections.find(s => s.id === activeSection)?.label || ''}
        />
        <RightPreviewPanel activeSection={activeSection} selectedTemplate={selectedTemplate} />
      </main>
    </div>
  );
}

export default App;