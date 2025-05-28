import React from 'react';

/**
 * Styled resume section components for live preview templates
 */

function ModernTemplate({ data, previewMode }) {
  // Modern: colored accent left bar, bold name, 2-col layout, flat cards, color highlights.
  const { personal, education, experience, projects, skills, certifications, achievements } = data;
  return (
    <div className="resume-modern">
      <div className="rm-header">
        <div className="rm-accent-bar"></div>
        <div>
          <div className="rm-name">{personal.fullName || 'Full Name'}</div>
          <div className="rm-contact">
            {(personal.email && <span>{personal.email}</span>)}{personal.email && personal.phone && ' | '}
            {(personal.phone && <span>{personal.phone}</span>)}{(personal.email || personal.phone) && personal.address && ' | '}
            {(personal.address && <span>{personal.address}</span>)}
          </div>
        </div>
      </div>
      {previewMode === 'cover' ? (
        <section className="rm-section">
          <h2>Cover Letter</h2>
          <p style={{ opacity: 0.8 }}>[Replace this placeholder with your cover letter...]</p>
        </section>
      ) : (
        <>
        <section className="rm-section">
          <h2>Education</h2>
          {(education || []).map((ed, i) => (
            (ed.degree || ed.school) && <div className="rm-entry" key={i}>
              <span className="rm-ed-title">{ed.degree || 'Degree'} at {ed.school || 'School'}</span>
              <span className="rm-ed-dates">{ed.startDate} - {ed.endDate}</span>
              <div className="rm-ed-desc">{ed.description}</div>
            </div>
          ))}
        </section>
        <section className="rm-section">
          <h2>Experience</h2>
          {(experience || []).map((ex, i) => (
            (ex.jobTitle || ex.employer) && <div className="rm-entry" key={i}>
              <span className="rm-exp-title">{ex.jobTitle || 'Job Title'} at {ex.employer || 'Employer'}</span>
              <span className="rm-exp-dates">{ex.startDate} - {ex.endDate}</span>
              <div className="rm-exp-desc">{ex.description}</div>
            </div>
          ))}
        </section>
        {!!(projects && projects.length) && (
          <section className="rm-section">
            <h2>Projects</h2>
            {projects.map((pr, i) => (
              pr.title && <div className="rm-entry" key={i}>
                <span className="rm-pr-title">{pr.title}</span>
                {pr.link && <span className="rm-pr-link"><a href={pr.link} rel="noopener noreferrer" target="_blank">{pr.link}</a></span>}
                <div className="rm-pr-desc">{pr.details}</div>
              </div>
            ))}
          </section>
        )}
        {!!(skills && skills.length) && (
          <section className="rm-section">
            <h2>Skills</h2>
            <div className="rm-skill-list">{skills.join(', ')}</div>
          </section>
        )}
        {!!(certifications && certifications.length) && (
          <section className="rm-section">
            <h2>Certifications</h2>
            {certifications.map((c, i) => (
              c.name && <div className="rm-entry" key={i}>
                <span>{c.name}, {c.issuer} {c.date && <>({c.date})</>}</span>
              </div>
            ))}
          </section>
        )}
        {!!(achievements && achievements.length) && (
          <section className="rm-section">
            <h2>Achievements</h2>
            {achievements.map((a, i) => a.title && <div className="rm-entry" key={i}>{a.title}: <span style={{opacity:0.92}}>{a.description}</span></div>)}
          </section>
        )}
        </>
      )}
    </div>
  );
}
function MinimalistTemplate({ data, previewMode }) {
  // Minimalist: lots of whitespace, single accent color, simple underlines, left-aligned.
  const { personal, education, experience, projects, skills, certifications, achievements } = data;
  return (
    <div className="resume-minimalist">
      <div className="min-header">
        <div className="min-name">{personal.fullName || 'Full Name'}</div>
        <div className="min-contact">
          {(personal.email && <span>{personal.email}</span>)}{personal.email && personal.phone && ' | '}
          {(personal.phone && <span>{personal.phone}</span>)}{(personal.email || personal.phone) && personal.address && ' | '}
          {(personal.address && <span>{personal.address}</span>)}
        </div>
      </div>
      <hr className="min-hr"/>
      {previewMode === 'cover' ? (
        <section className="min-section">
          <h2>Cover Letter</h2>
          <p className="min-cover">[Replace this placeholder with your cover letter... Write sincerely.]</p>
        </section>
      ) : (
        <>
        <section className="min-section">
          <h2>Education</h2>
          {(education || []).map((ed, i) => (
            (ed.degree || ed.school) && <div className="min-entry" key={i}>
              <div><b>{ed.degree || 'Degree'}</b> at {ed.school || 'School'}</div>
              <div className="min-dates">{ed.startDate} - {ed.endDate}</div>
              <div className="min-desc">{ed.description}</div>
            </div>
          ))}
        </section>
        <section className="min-section">
          <h2>Experience</h2>
          {(experience || []).map((ex, i) => (
            (ex.jobTitle || ex.employer) && <div className="min-entry" key={i}>
              <div><b>{ex.jobTitle || 'Job Title'}</b> at {ex.employer || 'Employer'}</div>
              <div className="min-dates">{ex.startDate} - {ex.endDate}</div>
              <div className="min-desc">{ex.description}</div>
            </div>
          ))}
        </section>
        {!!(projects && projects.length) && (
          <section className="min-section">
            <h2>Projects</h2>
            {projects.map((pr, i) => (
              pr.title && <div className="min-entry" key={i}>
                <span className="min-pr-title">{pr.title}</span>
                {pr.link && <span className="min-pr-link"><a href={pr.link} rel="noopener noreferrer" target="_blank">{pr.link}</a></span>}
                <div className="min-pr-desc">{pr.details}</div>
              </div>
            ))}
          </section>
        )}
        {!!(skills && skills.length) && (
          <section className="min-section">
            <h2>Skills</h2>
            <div className="min-skill-list">{skills.join(', ')}</div>
          </section>
        )}
        {!!(certifications && certifications.length) && (
          <section className="min-section">
            <h2>Certifications</h2>
            {certifications.map((c, i) => (
              c.name && <div className="min-entry" key={i}>
                <span>{c.name}, {c.issuer} {c.date && <>({c.date})</>}</span>
              </div>
            ))}
          </section>
        )}
        {!!(achievements && achievements.length) && (
          <section className="min-section">
            <h2>Achievements</h2>
            {achievements.map((a, i) => a.title && <div className="min-entry" key={i}>{a.title}: <span>{a.description}</span></div>)}
          </section>
        )}
        </>
      )}
    </div>
  );
}
function TraditionalTemplate({ data, previewMode }) {
  // Traditional: serif font, strong section headers, bordered boxes, black-and-white, justified.
  const { personal, education, experience, projects, skills, certifications, achievements } = data;
  return (
    <div className="resume-traditional">
      <div className="trad-header">
        <div className="trad-name">{personal.fullName || 'Full Name'}</div>
        <div className="trad-contact">
          {(personal.email && <span>{personal.email}</span>)}{personal.email && personal.phone && ' | '}
          {(personal.phone && <span>{personal.phone}</span>)}{(personal.email || personal.phone) && personal.address && ' | '}
          {(personal.address && <span>{personal.address}</span>)}
        </div>
      </div>
      <div className="trad-hr"/>
      {previewMode === 'cover' ? (
        <section className="trad-section">
          <div className="trad-section-title">Cover Letter</div>
          <p className="trad-cover">[Replace this with your cover letter text...]</p>
        </section>
      ) : (
        <>
        <section className="trad-section">
          <div className="trad-section-title">Education</div>
          {(education || []).map((ed, i) => (
            (ed.degree || ed.school) && <div className="trad-entry" key={i}>
              <b>{ed.degree || 'Degree'}</b> at {ed.school || 'School'}
              <span className="trad-dates">{ed.startDate} - {ed.endDate}</span>
              {!!ed.description && <div className="trad-desc">{ed.description}</div>}
            </div>
          ))}
        </section>
        <section className="trad-section">
          <div className="trad-section-title">Experience</div>
          {(experience || []).map((ex, i) => (
            (ex.jobTitle || ex.employer) && <div className="trad-entry" key={i}>
              <b>{ex.jobTitle || 'Job Title'}</b> at {ex.employer || 'Employer'}
              <span className="trad-dates">{ex.startDate} - {ex.endDate}</span>
              {!!ex.description && <div className="trad-desc">{ex.description}</div>}
            </div>
          ))}
        </section>
        {!!(projects && projects.length) && (
          <section className="trad-section">
            <div className="trad-section-title">Projects</div>
            {projects.map((pr, i) => (
              pr.title && <div className="trad-entry" key={i}>
                <span className="trad-pr-title">{pr.title}</span>
                {pr.link && <span className="trad-pr-link"><a href={pr.link} rel="noopener noreferrer" target="_blank">{pr.link}</a></span>}
                <div className="trad-pr-desc">{pr.details}</div>
              </div>
            ))}
          </section>
        )}
        {!!(skills && skills.length) && (
          <section className="trad-section"><div className="trad-section-title">Skills</div>
            <div className="trad-skill-list">{skills.join(', ')}</div>
          </section>
        )}
        {!!(certifications && certifications.length) && (
          <section className="trad-section"><div className="trad-section-title">Certifications</div>
            {certifications.map((c, i) => (
              c.name && <div className="trad-entry" key={i}>
                <span>{c.name}, {c.issuer} {c.date && <>({c.date})</>}</span>
              </div>
            ))}
          </section>
        )}
        {!!(achievements && achievements.length) && (
          <section className="trad-section"><div className="trad-section-title">Achievements</div>
            {achievements.map((a, i) => a.title && <div className="trad-entry" key={i}>{a.title}: <span>{a.description}</span></div>)}
          </section>
        )}
        </>
      )}
    </div>
  );
}


/**
 * PUBLIC_INTERFACE: RightPreviewPanel for live document preview with multiple visual templates.
 */
function RightPreviewPanel({ activeSection, selectedTemplate, previewMode, formData, previewOpen, onTogglePreviewPanel }) {
  const panelClass = previewOpen ? "right-preview-panel" : "right-preview-panel slide-collapsed";

  // Template switcher logic
  let RenderComponent;
  if (selectedTemplate === 'Minimalist') RenderComponent = MinimalistTemplate;
  else if (selectedTemplate === 'Traditional') RenderComponent = TraditionalTemplate;
  else RenderComponent = ModernTemplate;

  return (
    <aside
      className={panelClass}
      aria-label="Live Preview Panel"
      tabIndex={0}
    >
      {/* Show collapsed/reopen button (desktop) */}
      {!previewOpen && (
        <button
          aria-label="Open preview panel"
          onClick={() => onTogglePreviewPanel && onTogglePreviewPanel()}
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
            display: 'block',
          }}
          className="right-preview-reopen"
        >
          <svg width="18" height="28" aria-hidden="true">
            <polyline points="3,5 13,14 3,23" stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </svg>
        </button>
      )}
      {/* Only render content if panel is open */}
      {previewOpen && (
        <div style={{
          background: 'linear-gradient(104deg,rgba(34,20,50,0.92) 80%, var(--accent) 180%)',
          borderRadius: 11,
          padding: '1.2em 1.6em 2.5em 1.6em',
          color: 'var(--text-color)',
          minHeight: 350,
          marginTop: '1rem',
          boxShadow: '0 2px 14px 0 rgba(34,20,50,0.13)',
          position: 'relative',
          overflowY: 'auto',
          maxHeight: 'calc(100vh - 110px)'
        }}>
          <div style={{ position: 'sticky', top: 0, zIndex: 9, background: "transparent" }}>
            <div style={{
              color: 'var(--accent)',
              fontWeight: 600,
              letterSpacing: '0.01em',
              fontSize: 21,
              marginTop: 0,
              marginBottom: 12
            }}>
              Live Preview {previewMode === 'cover' ? '— Cover Letter' : '— Resume'}
            </div>
          </div>
          {/* Main resume template preview */}
          <RenderComponent data={formData} previewMode={previewMode} />
        </div>
      )}
    </aside>
  );
}

export default RightPreviewPanel;

/*
 * === Add Template Styles (can be moved to its own CSS file if needed for isolation). ===
 * Styles are injected here for simplicity.
 */

const previewPanelStyles = `
/* Modern Template Styles */
.resume-modern {
  font-family: 'Inter','Arial',sans-serif;
  background: #221c31;
  color: #fff;
  border-radius: 9px;
  padding: 0.8em 2em 2.2em 0.7em;
  max-width: 540px;
  min-width: 320px;
  box-shadow: 0 3.5px 21px 0 rgba(190,115,211,0.11);
}
.rm-header {
  display: flex; align-items: center; margin-bottom: 14px; margin-top: 2px;
}
.rm-accent-bar {
  width: 7px; height: 55px; background: linear-gradient(93deg,#be73d3 62%,#8f60af 112%); margin-right: 15px; border-radius: 15px;
}
.rm-name {
  font-size: 1.75em; font-weight: 800; letter-spacing: 0.018em; color: var(--kavia-accent);
}
.rm-contact { color: var(--text-secondary); font-size: 1.04em; margin-top: 2px }
.rm-section { margin-bottom: 18px; }
.rm-section:last-child { margin-bottom: 0; }
.rm-section > h2 {
  color: var(--kavia-accent); font-size: 1.17em; border-bottom: 2px solid var(--kavia-accent); margin-bottom: 9px; font-weight: 700; padding-bottom: 2.5px;
}
.rm-entry {
  background: rgba(190,115,211,0.07);
  margin-bottom: 9px;
  padding: 7px 11px; border-radius: 7px;
}
.rm-ed-title, .rm-exp-title, .rm-pr-title { font-weight: 600; color: var(--accent); }
.rm-ed-dates, .rm-exp-dates, .rm-pr-link { float: right; color: var(--kavia-orange); font-size: 0.97em; margin-left: 10px;}
.rm-ed-desc, .rm-exp-desc, .rm-pr-desc { font-size: 0.96em; color: #e7e6f1; margin-top: 2px;}
.rm-pr-link a { color: var(--kavia-orange);}
.rm-skill-list { color: #fee4a6; font-weight: 500; font-size: 1.03em; }
@media (max-width:600px){.resume-modern{padding:0.7em 0.2em 1em 0.1em;}}
/* Minimalist Template Styles */
.resume-minimalist {
  font-family: 'Roboto','Arial',sans-serif; background: #241f38; color: #fcfcfc;
  border-radius: 8px; max-width: 520px; padding: 1.2em 2em 2em 1.2em; margin-bottom: 0.8em;
}
.min-header { margin-bottom: 7px; }
.min-name { font-size: 1.24em; font-weight: 700; letter-spacing: 0.025em;}
.min-contact { color: var(--text-secondary); font-size: 1.01em; margin-bottom: 2px;}
.min-section { margin-bottom: 10px;}
.min-section > h2 { color: var(--accent); font-size: 1.10em; font-weight: 600; border-bottom: 1.6px solid var(--accent); margin-bottom: 8px; padding-bottom: 1px;}
.min-entry { margin-bottom: 8px; padding-bottom: 2px;}
.min-dates { font-size: 0.995em; color: var(--kavia-orange);}
.min-pr-link a { color: var(--kavia-orange);}
.min-skill-list { font-weight: 500; color: #dfffd6;}
.min-hr { border: none; border-bottom: 2.5px solid var(--border-color); margin-bottom: 8px; margin-top: 0;}
@media (max-width:600px){.resume-minimalist{padding:0.9em 0.2em 1em 0.2em;}}
/* Traditional Template Styles */
.resume-traditional {
  font-family: 'Georgia','Times New Roman',serif; background: #fffef9; color: #202032;
  border-radius: 8px; max-width: 550px; min-width: 310px; padding: 1.25em 2em 1.8em 2em; border:2.5px solid #ebeace;
  margin-bottom: 1em; box-shadow: 0 2.5px 18px 0 rgba(255,255,255,0.13);
}
.trad-header { margin-bottom: 2px;}
.trad-name { font-size: 1.65em; font-weight: bold; color: #673f8f; letter-spacing: 0.012em;}
.trad-contact { font-size: 1.01em; color: #4f4970;}
.trad-section { border-top: 1.2px solid #b3aaee; margin-top: 1.1em; padding-top: 0.7em; margin-bottom: 0.8em;}
.trad-section-title { color: #1a1a2e; font-size: 1.13em; font-weight: 700; border-bottom: 1.2px solid #b3aaee; padding-bottom: 2px; margin-bottom: 7px;}
.trad-entry { margin-bottom: 8px; }
.trad-desc, .trad-pr-desc { font-size: 0.95em; color: #222032; margin-top: 1px; }
.trad-pr-link a { color: #e87a41; text-decoration: underline;}
.trad-hr {border-bottom:2px solid #ccb6e0; margin: 7px 0;}
.trad-dates { float: right; color:#a05200; font-size: 0.98em; margin-left:8px;}
.trad-skill-list { font-weight: 500; color: #384b38;}
@media (max-width:600px){.resume-traditional{padding:0.7em 0.2em 1em 0.2em;}}
`;
// Only inject styles once per page
if (typeof window !== "undefined" && !window._resumePreviewPanelStyles) {
  const st = document.createElement("style");
  st.innerHTML = previewPanelStyles;
  document.head.appendChild(st);
  window._resumePreviewPanelStyles = true;
}
