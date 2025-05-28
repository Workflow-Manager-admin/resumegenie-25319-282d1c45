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
 * Adds preview mode toggle (Resume vs Cover Letter), disabled stubs for AI/export.
 * 
 * PUBLIC_INTERFACE
 */
function App() {
  // Canonical section IDs for navigation/app steps
  const sections = [
    { id: 'personal', label: 'Personal Info' },
    { id: 'education', label: 'Education' },
    { id: 'experience', label: 'Experience' },
    // Add further sections as needed, e.g. skills, projects etc
    { id: 'projects', label: 'Projects (optional)', optional: true },
    { id: 'skills', label: 'Skills' },
    { id: 'certifications', label: 'Certifications (optional)', optional: true },
    { id: 'achievements', label: 'Achievements (optional)', optional: true }
  ];

  // Maintain active section as state
  const [activeSection, setActiveSection] = useState(sections[0].id);

  // Selected template for preview/export
  const [selectedTemplate, setSelectedTemplate] = useState('Modern');

  // Preview mode: 'resume' or 'cover'
  const [previewMode, setPreviewMode] = useState('resume');

  // LIFTED form data/state for real-time preview (formerly in CentralFormContainer)
  const [formData, setFormData] = useState({
    personal: {
      fullName: '', email: '', phone: '', address: ''
    },
    education: [{
      school: '', degree: '', startDate: '', endDate: '', description: ''
    }],
    experience: [{
      jobTitle: '', employer: '', startDate: '', endDate: '', description: ''
    }],
    projects: [],
    skills: [],
    certifications: [],
    achievements: [],
  });

  // Placeholder: Export (PDF/Docx) - currently alerts
  const handleExport = type => {
    // Stub only; will trigger actual export later
    alert(`Export (${type}) function is not yet implemented.`);
  };

  // Placeholder: AI content enhancement (future)
  const handleAISuggest = () => {
    alert('AI-powered suggestions will be available soon.');
  };

  // Optionally pass more feature flags for future toggling
  return (
    <div className="app" tabIndex={-1}>
      <TopBar
        selectedTemplate={selectedTemplate}
        onTemplateChange={setSelectedTemplate}
        onExport={() => handleExport(previewMode === 'resume' ? 'Resume' : 'Cover Letter')}
        previewMode={previewMode}
        onTogglePreviewMode={() => setPreviewMode(m => (m === 'resume' ? 'cover' : 'resume'))}
        // Future props for AI/export/menu controls
      />
      <main
        className="main-container"
        style={{
          display: 'flex',
          flex: 1,
          minHeight: '100vh',
          marginTop: 64 // height of TopBar (fixed)
        }}
        aria-label="Main content area"
      >
        <LeftNavPanel
          sections={sections}
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          // Future: Props for analytics, section-completion etc
        />
        <CentralFormContainer
          sectionId={activeSection}
          sectionLabel={sections.find(s => s.id === activeSection)?.label || ''}
          previewMode={previewMode}
          onAISuggest={handleAISuggest}
          // Pass formData and updater as CONTROLLED PROPS
          formData={formData}
          setFormData={setFormData}
        />
        <RightPreviewPanel
          activeSection={activeSection}
          selectedTemplate={selectedTemplate}
          previewMode={previewMode}
          formData={formData}
        />
      </main>
    </div>
  );
}

export default App;