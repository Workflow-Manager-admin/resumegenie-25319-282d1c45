import React from 'react';
import './App.css';

import TopBar from './components/layout/TopBar';
import LeftNavPanel from './components/layout/LeftNavPanel';
import CentralFormContainer from './components/layout/CentralFormContainer';
import RightPreviewPanel from './components/layout/RightPreviewPanel';

/**
 * ResumeGenie Main Container App
 * Lays out the app with TopBar, LeftNavPanel, CentralFormContainer, and RightPreviewPanel.
 */
function App() {
  return (
    <div className="app" tabIndex={-1}>
      <TopBar />
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
        <LeftNavPanel />
        <CentralFormContainer />
        <RightPreviewPanel />
      </main>
    </div>
  );
}

export default App;