import React, { useState, useMemo } from 'react';

/**
 * CentralFormContainer: Step-based, in-memory stateful form container.
 * Displays dynamic section forms, navigation controls, and handles validation.
 *
 * PUBLIC_INTERFACE
 */
function CentralFormContainer({ sectionId, sectionLabel, previewMode, onAISuggest, formData, setFormData, previewOpen, onTogglePreviewPanel }) {
  // Canonical steps (should match main sections for navigation)
  const sections = useMemo(() => [
    { id: 'personal', label: 'Personal Info' },
    { id: 'education', label: 'Education' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects (optional)', optional: true },
    { id: 'skills', label: 'Skills' },
    { id: 'certifications', label: 'Certifications (optional)', optional: true },
    { id: 'achievements', label: 'Achievements (optional)', optional: true }
  ], []);

  // Determine numerical step index
  const stepIndex = Math.max(0, sections.findIndex(s => s.id === sectionId));
  const lastStep = sections.length - 1;

  // REMOVED formData local state; now controlled from parent (App)
  // Local error state for validation
  const [errors, setErrors] = useState({});

  // Utility: handle field input change (supports nested sections)
  const handleInputChange = (section, idx, field, value) => {
    setFormData(prev => {
      const sectionValue = prev[section];
      let updated;
      if (Array.isArray(sectionValue)) {
        updated = sectionValue.map((item, i) =>
          i === idx ? { ...item, [field]: value } : item
        );
      } else {
        updated = { ...sectionValue, [field]: value };
      }
      return { ...prev, [section]: updated };
    });
  };

  // Utility: add new item to array section
  const handleAddItem = section => {
    let template;
    switch (section) {
      case 'education':
        template = { school: '', degree: '', startDate: '', endDate: '', description: '' }; break;
      case 'experience':
        template = { jobTitle: '', employer: '', startDate: '', endDate: '', description: '' }; break;
      case 'projects':
        template = { title: '', details: '', link: '' }; break;
      case 'certifications':
        template = { name: '', issuer: '', date: '' }; break;
      case 'achievements':
        template = { title: '', description: '' }; break;
      case 'skills':
        template = ''; break;
      default:
        template = {};
    }
    setFormData(prev => ({
      ...prev,
      [section]: [...(prev[section] || []), template]
    }));
  };

  // Utility: remove item from array section
  const handleRemoveItem = (section, idx) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== idx)
    }));
  };

  // Input validation by section
  const validateSection = sectionId => {
    let sectionErrors = {};
    const val = formData[sectionId];

    if (sectionId === 'personal') {
      // Required: fullName, email
      if (!val.fullName || val.fullName.trim().length < 2)
        sectionErrors.fullName = 'Full name is required';
      if (!val.email || !/^[^@]+@[^@]+\.[^@]+/.test(val.email))
        sectionErrors.email = 'Valid email required';
      // Optional: phone, address (warn if empty)
    }
    if (sectionId === 'education') {
      // Must have at least one education entry filled with school and degree
      sectionErrors = val.map((ed, idx) => {
        const subErrors = {};
        if (!ed.school) subErrors.school = 'Required';
        if (!ed.degree) subErrors.degree = 'Required';
        return subErrors;
      });
    }
    if (sectionId === 'experience') {
      // Must have at least one experience entry with jobTitle and employer
      sectionErrors = val.map((exp, idx) => {
        const subErrors = {};
        if (!exp.jobTitle) subErrors.jobTitle = 'Required';
        if (!exp.employer) subErrors.employer = 'Required';
        return subErrors;
      });
    }
    if (sectionId === 'skills') {
      // Array of skills; not strictly required
      // At least suggest one skill
      if (!val.length) sectionErrors._self = 'Add at least one skill for a stronger resume';
    }
    // Optional sections do not block navigation

    return sectionErrors;
  };

  // Navigation
  const handlePrevious = () => {
    if (stepIndex > 0)
      window.dispatchEvent(new CustomEvent('navSection', { detail: sections[stepIndex - 1].id }));
  };

  const handleNext = () => {
    // Validate current section before moving on
    const section = sections[stepIndex].id;
    const validation = validateSection(section);
    // If main sections and error exist, block advancement
    let hasError = false;
    if (section === 'personal') hasError = Object.keys(validation).length > 0;
    if (section === 'education' || section === 'experience')
      hasError = validation.some(obj => Object.keys(obj).length > 0);
    if (section === 'skills') hasError = validation._self;

    setErrors(prev => ({ ...prev, [section]: validation }));
    if (!hasError && stepIndex < lastStep) {
      window.dispatchEvent(new CustomEvent('navSection', { detail: sections[stepIndex + 1].id }));
    }
  };

  // Listen to nav changes (simulate parent sectionId change for step nav)
  React.useEffect(() => {
    const listener = e => {
      // Here we use the section navigation event to update navigation.
      // In this container, 'navSection' triggers a parent sectionId change.
      // The real integration is via prop 'sectionId', so don't duplicate logic.
    };
    window.addEventListener('navSection', listener);
    return () => window.removeEventListener('navSection', listener);
  }, []);

  // Field Renders per Section
  function renderSectionFields() {
    // Simple field + validation input builder
    const inputStyle = {
      marginBottom: 15, display: 'block', fontSize: 16, background: 'var(--panel-bg)', color: 'var(--text-color)', borderColor: 'var(--border-color)', borderRadius: 4, padding: '7px 10px', width: '98%'
    };
    const labelStyle = { fontWeight: 500, color: 'var(--accent)', marginBottom: 4, display: 'block' };
    const errStyle = { color: '#FB6565', fontSize: 13, margin: '2px 0 7px 2px' };

    // PERSONAL
    if (sectionId === 'personal') {
      const data = formData.personal;
      const errs = errors.personal || {};
      return (
        <form autoComplete="off" style={{ marginBottom: 18 }}>
          <div>
            <label style={labelStyle}>Full Name<span style={{ color: '#FB6565' }}> *</span></label>
            <input
              type="text"
              required
              value={data.fullName}
              style={inputStyle}
              onChange={e => handleInputChange('personal', undefined, 'fullName', e.target.value)}
            />
            {errs.fullName && <div style={errStyle}>{errs.fullName}</div>}
          </div>
          <div>
            <label style={labelStyle}>Email<span style={{ color: '#FB6565' }}> *</span></label>
            <input
              type="email"
              required
              value={data.email}
              style={inputStyle}
              onChange={e => handleInputChange('personal', undefined, 'email', e.target.value)}
            />
            {errs.email && <div style={errStyle}>{errs.email}</div>}
          </div>
          <div>
            <label style={labelStyle}>Phone Number</label>
            <input
              type="text"
              value={data.phone}
              style={inputStyle}
              onChange={e => handleInputChange('personal', undefined, 'phone', e.target.value)}
            />
          </div>
          <div>
            <label style={labelStyle}>Address</label>
            <input
              type="text"
              value={data.address}
              style={inputStyle}
              onChange={e => handleInputChange('personal', undefined, 'address', e.target.value)}
            />
          </div>
        </form>
      );
    }

    // EDUCATION
    if (sectionId === 'education') {
      const arr = formData.education;
      const arrErrs = errors.education || [];
      return (
        <div>
          {arr.map((ed, i) => (
            <div key={i} style={{ background: 'rgba(190,115,211,0.05)', borderRadius: 8, padding: 12, marginBottom: 10 }}>
              <div>
                <label style={labelStyle}>School / University<span style={{ color: '#FB6565' }}> *</span></label>
                <input
                  type="text"
                  required
                  value={ed.school}
                  style={inputStyle}
                  onChange={e => handleInputChange('education', i, 'school', e.target.value)}
                />
                {arrErrs[i]?.school && <div style={errStyle}>{arrErrs[i].school}</div>}
              </div>
              <div>
                <label style={labelStyle}>Degree<span style={{ color: '#FB6565' }}> *</span></label>
                <input
                  type="text"
                  required
                  value={ed.degree}
                  style={inputStyle}
                  onChange={e => handleInputChange('education', i, 'degree', e.target.value)}
                />
                {arrErrs[i]?.degree && <div style={errStyle}>{arrErrs[i].degree}</div>}
              </div>
              <div>
                <label style={labelStyle}>Start Date</label>
                <input
                  type="text"
                  value={ed.startDate}
                  style={inputStyle}
                  placeholder="e.g. 09/2020"
                  onChange={e => handleInputChange('education', i, 'startDate', e.target.value)}
                />
              </div>
              <div>
                <label style={labelStyle}>End Date</label>
                <input
                  type="text"
                  value={ed.endDate}
                  style={inputStyle}
                  placeholder="e.g. 06/2024"
                  onChange={e => handleInputChange('education', i, 'endDate', e.target.value)}
                />
              </div>
              <div>
                <label style={labelStyle}>Description</label>
                <input
                  type="text"
                  value={ed.description}
                  style={inputStyle}
                  placeholder="(optional) Description / highlights"
                  onChange={e => handleInputChange('education', i, 'description', e.target.value)}
                />
              </div>
              {arr.length > 1 && (
                <button
                  type="button"
                  style={{ ...inputStyle, width: 'auto', background: 'rgba(255,115,141,0.12)', color: '#FB6565', marginTop: 6, marginRight: 6 }}
                  onClick={() => handleRemoveItem('education', i)}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button type="button" className="btn" onClick={() => handleAddItem('education')}>
            + Add Education Entry
          </button>
        </div>
      );
    }

    // EXPERIENCE
    if (sectionId === 'experience') {
      const arr = formData.experience;
      const arrErrs = errors.experience || [];
      return (
        <div>
          {arr.map((exp, i) => (
            <div key={i} style={{ background: 'rgba(190,115,211,0.06)', borderRadius: 8, padding: 12, marginBottom: 10 }}>
              <div>
                <label style={labelStyle}>Job Title<span style={{ color: '#FB6565' }}> *</span></label>
                <input
                  type="text"
                  required
                  value={exp.jobTitle}
                  style={inputStyle}
                  onChange={e => handleInputChange('experience', i, 'jobTitle', e.target.value)}
                />
                {arrErrs[i]?.jobTitle && <div style={errStyle}>{arrErrs[i].jobTitle}</div>}
              </div>
              <div>
                <label style={labelStyle}>Employer<span style={{ color: '#FB6565' }}> *</span></label>
                <input
                  type="text"
                  required
                  value={exp.employer}
                  style={inputStyle}
                  onChange={e => handleInputChange('experience', i, 'employer', e.target.value)}
                />
                {arrErrs[i]?.employer && <div style={errStyle}>{arrErrs[i].employer}</div>}
              </div>
              <div>
                <label style={labelStyle}>Start Date</label>
                <input
                  type="text"
                  value={exp.startDate}
                  style={inputStyle}
                  placeholder="e.g. 03/2022"
                  onChange={e => handleInputChange('experience', i, 'startDate', e.target.value)}
                />
              </div>
              <div>
                <label style={labelStyle}>End Date</label>
                <input
                  type="text"
                  value={exp.endDate}
                  style={inputStyle}
                  placeholder="e.g. 04/2024"
                  onChange={e => handleInputChange('experience', i, 'endDate', e.target.value)}
                />
              </div>
              <div>
                <label style={labelStyle}>Description</label>
                <input
                  type="text"
                  value={exp.description}
                  style={inputStyle}
                  placeholder="(optional) Brief description of role"
                  onChange={e => handleInputChange('experience', i, 'description', e.target.value)}
                />
              </div>
              {arr.length > 1 && (
                <button
                  type="button"
                  style={{ ...inputStyle, width: 'auto', background: 'rgba(255,115,141,0.12)', color: '#FB6565', marginTop: 6, marginRight: 6 }}
                  onClick={() => handleRemoveItem('experience', i)}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button type="button" className="btn" onClick={() => handleAddItem('experience')}>
            + Add Experience Entry
          </button>
        </div>
      );
    }

    // PROJECTS (optional)
    if (sectionId === 'projects') {
      const arr = formData.projects;
      return (
        <div>
          {arr.map((proj, i) => (
            <div key={i} style={{ background: 'rgba(115,211,190,0.07)', borderRadius: 8, padding: 12, marginBottom: 10 }}>
              <div>
                <label style={labelStyle}>Project Title</label>
                <input
                  type="text"
                  value={proj.title}
                  style={inputStyle}
                  onChange={e => handleInputChange('projects', i, 'title', e.target.value)}
                />
              </div>
              <div>
                <label style={labelStyle}>Details</label>
                <input
                  type="text"
                  value={proj.details}
                  style={inputStyle}
                  onChange={e => handleInputChange('projects', i, 'details', e.target.value)}
                />
              </div>
              <div>
                <label style={labelStyle}>Link</label>
                <input
                  type="text"
                  value={proj.link}
                  style={inputStyle}
                  onChange={e => handleInputChange('projects', i, 'link', e.target.value)}
                />
              </div>
              <button
                type="button"
                style={{ ...inputStyle, width: 'auto', background: 'rgba(255,115,141,0.11)', color: '#FB6565', marginTop: 6, marginRight: 6 }}
                onClick={() => handleRemoveItem('projects', i)}
              >
                Remove
              </button>
            </div>
          ))}
          <button type="button" className="btn" onClick={() => handleAddItem('projects')}>
            + Add Project
          </button>
        </div>
      );
    }

    // SKILLS (as array of chips/tags, minimalistic)
    if (sectionId === 'skills') {
      const arr = formData.skills;
      const errorMsg = errors.skills?._self;
      let newSkill = '';
      return (
        <div>
          <div style={{ marginBottom: 14 }}>
            <label style={labelStyle}>Skills</label>
            <div style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 6 }}>
              List your top skills as keywords (e.g., "JavaScript", "Teamwork"). Hit Enter or click "Add".
            </div>
            <SkillInput
              skills={arr}
              onAdd={skill => {
                if (skill && !arr.some(s => s.toLowerCase() === skill.toLowerCase()))
                  setFormData(prev => ({ ...prev, skills: [...prev.skills, skill] }));
              }}
              onRemove={i => handleRemoveItem('skills', i)}
              />
            {errorMsg && <div style={errStyle}>{errorMsg}</div>}
          </div>
        </div>
      );
    }

    // CERTIFICATIONS (optional)
    if (sectionId === 'certifications') {
      const arr = formData.certifications;
      return (
        <div>
          {arr.map((cert, i) => (
            <div key={i} style={{ background: 'rgba(115,211,190,0.06)', borderRadius: 8, padding: 12, marginBottom: 10 }}>
              <div>
                <label style={labelStyle}>Certification Name</label>
                <input
                  type="text"
                  value={cert.name}
                  style={inputStyle}
                  onChange={e => handleInputChange('certifications', i, 'name', e.target.value)}
                />
              </div>
              <div>
                <label style={labelStyle}>Issuer</label>
                <input
                  type="text"
                  value={cert.issuer}
                  style={inputStyle}
                  onChange={e => handleInputChange('certifications', i, 'issuer', e.target.value)}
                />
              </div>
              <div>
                <label style={labelStyle}>Date</label>
                <input
                  type="text"
                  value={cert.date}
                  style={inputStyle}
                  onChange={e => handleInputChange('certifications', i, 'date', e.target.value)}
                />
              </div>
              <button
                type="button"
                style={{ ...inputStyle, width: 'auto', background: 'rgba(255,115,141,0.12)', color: '#FB6565', marginTop: 6, marginRight: 6 }}
                onClick={() => handleRemoveItem('certifications', i)}
              >
                Remove
              </button>
            </div>
          ))}
          <button type="button" className="btn" onClick={() => handleAddItem('certifications')}>
            + Add Certification
          </button>
        </div>
      );
    }

    // ACHIEVEMENTS (optional)
    if (sectionId === 'achievements') {
      const arr = formData.achievements;
      return (
        <div>
          {arr.map((ach, i) => (
            <div key={i} style={{ background: 'rgba(210,211,115,0.07)', borderRadius: 8, padding: 12, marginBottom: 10 }}>
              <div>
                <label style={labelStyle}>Title</label>
                <input
                  type="text"
                  value={ach.title}
                  style={inputStyle}
                  onChange={e => handleInputChange('achievements', i, 'title', e.target.value)}
                />
              </div>
              <div>
                <label style={labelStyle}>Description</label>
                <input
                  type="text"
                  value={ach.description}
                  style={inputStyle}
                  onChange={e => handleInputChange('achievements', i, 'description', e.target.value)}
                />
              </div>
              <button
                type="button"
                style={{ ...inputStyle, width: 'auto', background: 'rgba(255,115,141,0.13)', color: '#FB6565', marginTop: 6, marginRight: 6 }}
                onClick={() => handleRemoveItem('achievements', i)}
              >
                Remove
              </button>
            </div>
          ))}
          <button type="button" className="btn" onClick={() => handleAddItem('achievements')}>
            + Add Achievement
          </button>
        </div>
      );
    }

    // Fallback placeholder
    return (
      <div style={{ color: 'var(--text-secondary)', marginTop: 12 }}>
        {'Section not implemented yet / invalid.'}
      </div>
    );
  }

  // Main JSX rendering
  return (
    <>
      <section
        className="central-form-container"
        style={{
          flex: previewOpen ? '2 1 520px' : '3 1 950px',
          minWidth: 300,
          maxWidth: previewOpen ? 700 : 1150,
          padding: '2rem 1.5rem',
          background: 'rgba(40, 35, 60, 0.98)',
          height: 'calc(100vh - 64px)',
          overflowY: 'auto',
          boxSizing: 'border-box',
          transition: 'all 0.2s cubic-bezier(.5,.21,.17,.98)'
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
        {/* Mobile: floating preview panel toggle (only show when panel is hidden or on small screens) */}
        <span className="central-preview-fab" style={{
          display: 'none'
        }}>
          {/* Set by CSS media query; or forcibly display if previewOpen is false */}
        </span>
        {/* 
          === AI Content Controls Placeholder Area ===
          "AI Suggest" button is disabled, serves as stub for future AI-powered suggestions (grammar, spelling, tone, pre-fill).
          When implemented, this will invoke an API that analyzes section fields or full document and provides recommended edits/content.
          This button is duplicated in TopBar for global AI actions; instance here provides section-level recommendations.
        */}
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
          <span role="img" aria-label="AI">✨</span> AI Suggest
        </button>
        {/* 
          === AI-powered grammar, spell, and tone indicators (planned) ===
          Add future icons/labels for:
            - Spell Check
            - Grammar Check
            - Tone/Style Feedback 
            These will be used to show suggestions or highlight issues; UI as icons or notification chips.
        */}
        <div
          style={{
            display: 'flex', alignItems: 'center', marginLeft: 8, gap: 8, opacity: 0.36
          }}
          aria-label="AI grammar and tone suggestion placeholders"
        >
          <span title="Grammar Helper (coming soon)" role="img" aria-label="Grammar">📝</span>
          <span title="Spell Check (coming soon)" role="img" aria-label="Spell-Check">🔤</span>
          <span title="Tone Suggestion (coming soon)" role="img" aria-label="Tone">🎤</span>
        </div>
        {/* 
          === Pre-fill Content Stub UI (disabled) ===
          This will allow future users to auto-populate form with role/industry-based example data using AI.
        */}
        <button
          style={{
            marginLeft: 8,
            opacity: 0.35,
            background: 'rgba(115,211,190,0.08)',
            color: 'var(--accent)',
            border: 'none',
            borderRadius: 5,
            fontWeight: 500,
            fontSize: 14.1,
            padding: '3px 14px',
            cursor: 'not-allowed'
          }}
          title="Pre-fill example content (AI, coming soon)"
          aria-disabled="true"
          disabled
          tabIndex={-1}
        >
          <span role="img" aria-label="Prefill">🤖</span> Pre-fill Section
        </button>
      </div>

      {/* SECTION FIELDS */}
      <div style={{ marginTop: 12 }}>
        {renderSectionFields()}
      </div>

      {/* Navigation controls */}
      <div style={{ display: 'flex', flexDirection: 'row', gap: 16, marginTop: 30 }}>
        <button
          className="btn"
          style={{
            background: 'linear-gradient(91deg, var(--kavia-purple) 87%, var(--kavia-accent) 115%)',
            minWidth: 90, fontWeight: 600, opacity: stepIndex > 0 ? 1 : 0.6
          }}
          onClick={handlePrevious}
          disabled={stepIndex === 0}
        >
          ← Previous
        </button>
        <button
          className="btn btn-large"
          style={{
            minWidth: 120,
            background: 'linear-gradient(93deg,var(--kavia-accent) 77%, var(--kavia-purple) 125%)',
            fontWeight: 700
          }}
          onClick={handleNext}
          disabled={stepIndex === lastStep}
        >
          {stepIndex === lastStep ? 'Done' : 'Next →'}
        </button>
      </div>
      {/* Completion Progress */}
      <div style={{
        marginTop: 18,
        fontSize: 14,
        color: 'var(--accent)',
        letterSpacing: '0.015em'
      }}>
        Step {stepIndex + 1} of {sections.length}
        {sections[stepIndex]?.optional && (
          <span style={{ color: 'var(--text-secondary)', marginLeft: 6 }}>(Optional)</span>
        )}
      </div>
    </section>
  );
}

// Simple tag system for entering and displaying skills
function SkillInput({ skills, onAdd, onRemove }) {
  const [input, setInput] = useState('');
  const handleKeyDown = e => {
    if ((e.key === 'Enter' || e.key === ',') && input.trim()) {
      e.preventDefault();
      onAdd(input.trim());
      setInput('');
    }
  };
  return (
    <div>
      <input
        style={{
          background: 'var(--panel-bg)',
          color: 'var(--text-color)',
          border: '1px solid var(--border-color)',
          borderRadius: '4px',
          padding: '7px 10px',
          fontSize: 15,
          marginBottom: 10,
          marginRight: 10,
          minWidth: 180
        }}
        type="text"
        value={input}
        placeholder="Add a skill and press Enter"
        onChange={e => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        className="btn"
        type="button"
        style={{ fontSize: 14, padding: '5px 12px', marginLeft: 4 }}
        onClick={() => {
          if (input.trim()) {
            onAdd(input.trim());
            setInput('');
          }
        }}
      >
        Add
      </button>
      <div style={{ marginTop: 4, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {skills.map((skill, i) => (
          <span
            key={i}
            style={{
              background: 'linear-gradient(90deg,var(--accent) 43%, var(--secondary-bg) 120%)',
              color: '#fff',
              borderRadius: '6px',
              padding: '3.5px 10px',
              fontWeight: 600,
              fontSize: 14.5,
              display: 'flex',
              alignItems: 'center',
              gap: 4
            }}
          >
            {skill}
            <button
              type="button"
              aria-label={`Remove skill "${skill}"`}
              style={{
                marginLeft: 2,
                background: 'none',
                color: '#ffb6b6',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: 15,
                padding: 0
              }}
              onClick={() => onRemove(i)}
            >×</button>
          </span>
        ))}
      </div>
    </div>
  );
}

export default CentralFormContainer;
