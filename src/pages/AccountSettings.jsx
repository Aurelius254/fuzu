import { useState } from "react";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .brilliant-root {
    font-family: 'DM Sans', sans-serif;
    background: #0e0e0e;
    color: #e8e8e8;
    min-height: 100vh;
  }

  .brill-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px;
    height: 56px;
    background: #111;
    border-bottom: 1px solid #222;
  }
  .brill-nav-left { display: flex; align-items: center; gap: 28px; }
  .brill-logo { font-size: 20px; font-weight: 700; color: #fff; letter-spacing: -0.5px; }
  .brill-nav-links { display: flex; gap: 4px; }
  .brill-nav-link {
    display: flex; align-items: center; gap: 6px;
    padding: 6px 12px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    color: #aaa;
    cursor: pointer;
    background: none;
    border: none;
    font-family: 'DM Sans', sans-serif;
    transition: all 0.15s;
  }
  .brill-nav-link:hover { background: #1e1e1e; color: #e8e8e8; }
  .brill-nav-right { display: flex; align-items: center; gap: 10px; }
  .brill-btn-premium {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background: linear-gradient(90deg, #f6d86a 0%, #c84bff 100%);
    color: #111;
    border: 1px solid #4d3b7a;
    border-radius: 999px;
    padding: 9px 18px;
    min-width: 150px;
    font-size: 14px;
    font-weight: 800;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    box-shadow: 0 2px 0 rgba(0,0,0,0.08);
    transition: transform 0.15s;
  }
  .brill-btn-premium:hover { transform: scale(1.02); }
  .brill-pill {
    display: flex; align-items: center; gap: 6px;
    background: #1a1a1a;
    border: 1px solid #2a2a2a;
    border-radius: 20px;
    padding: 6px 14px;
    font-size: 14px;
    font-weight: 600;
    color: #e8e8e8;
  }
  .brill-hamburger {
    background: none; border: none; cursor: pointer;
    color: #aaa; padding: 6px; border-radius: 6px;
  }

  .brill-page {
    max-width: 1080px;
    margin: 0 auto;
    padding: 40px 24px;
    display: flex;
    gap: 24px;
  }

  .brill-sidebar {
    width: 192px;
    flex-shrink: 0;
    background: #141414;
    border: 1px solid #222;
    border-radius: 14px;
    padding: 12px;
    height: fit-content;
  }
  .brill-sidebar-item {
    padding: 10px 14px;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.15s;
    color: #888;
    user-select: none;
  }
  .brill-sidebar-item:hover { background: #1e1e1e; color: #e8e8e8; }
  .brill-sidebar-item.active { background: #1e1e1e; color: #fff; font-weight: 600; }

  .brill-content { flex: 1; display: flex; flex-direction: column; gap: 32px; }
  .brill-section-title {
    font-size: 22px;
    font-weight: 700;
    color: #fff;
    margin-bottom: 20px;
    letter-spacing: -0.3px;
  }
  .brill-section { display: flex; flex-direction: column; gap: 14px; }
  .brill-label {
    font-size: 14px;
    font-weight: 500;
    color: #ccc;
    display: block;
    margin-bottom: 6px;
  }
  .brill-input {
    width: 100%;
    background: #181818;
    border: 1.5px solid #2a2a2a;
    border-radius: 10px;
    padding: 13px 16px;
    font-size: 15px;
    font-family: 'DM Sans', sans-serif;
    color: #e8e8e8;
    outline: none;
    transition: border-color 0.15s;
  }
  .brill-input:focus { border-color: #444; }
  .brill-field { display: flex; flex-direction: column; }
  .brill-btn-update {
    background: #2a2a2a;
    border: none;
    border-radius: 10px;
    padding: 13px;
    font-size: 15px;
    font-weight: 500;
    font-family: 'DM Sans', sans-serif;
    color: #777;
    cursor: not-allowed;
    width: 100%;
    margin-top: 4px;
  }
  .brill-divider { border: none; border-top: 1px solid #1e1e1e; }

  .brill-email-row {
    display: flex; align-items: center; justify-content: space-between;
    background: #181818;
    border: 1.5px solid #2a2a2a;
    border-radius: 10px;
    padding: 13px 16px;
  }
  .brill-email-text { font-size: 15px; color: #e8e8e8; }
  .brill-badges { display: flex; gap: 8px; }
  .brill-badge { font-size: 11px; font-weight: 700; letter-spacing: 0.5px; padding: 3px 8px; border-radius: 6px; }
  .brill-badge-verified { color: #2ecc71; }
  .brill-badge-primary { color: #2b6be6; }
  .brill-btn-add-email {
    width: 100%;
    background: #181818;
    border: 1.5px solid #2a2a2a;
    border-radius: 10px;
    padding: 13px;
    font-size: 15px;
    font-weight: 500;
    font-family: 'DM Sans', sans-serif;
    color: #e8e8e8;
    cursor: pointer;
    transition: background 0.15s, border-color 0.15s;
    text-align: center;
  }
  .brill-btn-add-email:hover { background: #222; border-color: #3a3a3a; }

  .brill-info-box {
    display: flex; align-items: flex-start; gap: 14px;
    background: #1a2440;
    border: 1px solid #263060;
    border-radius: 10px;
    padding: 18px;
    font-size: 14px;
    color: #a8b8e0;
    line-height: 1.6;
  }
  .brill-info-icon { color: #5b8af0; font-size: 18px; flex-shrink: 0; margin-top: 1px; }
`;

const HomeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const CoursesIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <path d="M8 21h8M12 17v4" />
  </svg>
);

const HamburgerIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const InfoIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="8" strokeLinecap="round" strokeWidth="3" />
    <line x1="12" y1="12" x2="12" y2="16" />
  </svg>
);

export default function AccountSettings() {
  const [activeTab, setActiveTab] = useState("Account");
  const [firstName, setFirstName] = useState("Aurelius");
  const [lastName, setLastName] = useState("Macharia");

  const sidebarItems = ["Account", "Premium", "Preferences"];

  return (
    <>
      <style>{css}</style>
      <div className="brilliant-root">
        <nav className="brill-nav">
          <div className="brill-nav-left">
            <span className="brill-logo">Brilliant</span>
            <div className="brill-nav-links">
              <button className="brill-nav-link" type="button" data-route="/"> <HomeIcon /> Home </button>
              <button className="brill-nav-link" type="button" data-route="/accountsettings"> <CoursesIcon /> Courses </button>
            </div>
          </div>
          <div className="brill-nav-right">
            <button className="brill-btn-premium" type="button">Go Premium</button>
            <div className="brill-pill">0 ⚡</div>
            <button className="brill-hamburger" type="button"><HamburgerIcon /></button>
          </div>
        </nav>

        <div className="brill-page">
          <div className="brill-sidebar">
            {sidebarItems.map((item) => (
              <div
                key={item}
                className={`brill-sidebar-item${activeTab === item ? " active" : ""}`}
                onClick={() => setActiveTab(item)}
              >
                {item}
              </div>
            ))}
          </div>

          <div className="brill-content">
            <div>
              <div className="brill-section-title">Personal info</div>
              <div className="brill-section">
                <div className="brill-field">
                  <label className="brill-label">First name</label>
                  <input
                    className="brill-input"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="brill-field">
                  <label className="brill-label">Last name</label>
                  <input
                    className="brill-input"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <button className="brill-btn-update" type="button" disabled>
                  Update personal info
                </button>
              </div>
            </div>

            <hr className="brill-divider" />

            <div>
              <div className="brill-section-title">Email address</div>
              <div className="brill-section">
                <div className="brill-email-row">
                  <span className="brill-email-text">machariaaurelius@gmail.com</span>
                  <div className="brill-badges">
                    <span className="brill-badge brill-badge-verified">VERIFIED</span>
                    <span className="brill-badge brill-badge-primary">PRIMARY</span>
                  </div>
                </div>
                <button className="brill-btn-add-email" type="button">Add another email</button>
              </div>
            </div>

            <hr className="brill-divider" />

            <div>
              <div className="brill-section-title">Password</div>
              <div className="brill-info-box">
                <span className="brill-info-icon"><InfoIcon /></span>
                <div>
                  Your account doesn't have a password set. You sign in using social authentication.
                  <br />
                  <br />
                  If you'd like to set a password, you can do so from your social connections page.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
