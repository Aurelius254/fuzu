import { useState, useEffect } from "react";
import TopNav from "../components/TopNav";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  .brilliant-root { font-family: 'DM Sans', sans-serif; background: #0e0e0e; color: #e8e8e8; min-height: 100vh; }
  .brill-page { max-width: 768px; margin: 0 auto; padding: 32px 20px; display: flex; gap: 24px; }
  .brill-sidebar { width: 160px; flex-shrink: 0; background: #141414; border: 1px solid #222; border-radius: 14px; padding: 12px; height: fit-content; }
  .brill-sidebar-item { padding: 10px 14px; border-radius: 10px; font-size: 14px; font-weight: 500; cursor: pointer; transition: all 0.15s; color: #888; user-select: none; }
  .brill-sidebar-item:hover { background: #1e1e1e; color: #e8e8e8; }
  .brill-sidebar-item.active { background: #1e1e1e; color: #fff; font-weight: 600; }
  .brill-content { flex: 1; display: flex; flex-direction: column; gap: 32px; min-width: 0; }
  .brill-section-title { font-size: 20px; font-weight: 700; color: #fff; margin-bottom: 16px; letter-spacing: -0.3px; }
  .brill-section { display: flex; flex-direction: column; gap: 14px; }
  .brill-label { font-size: 14px; font-weight: 500; color: #ccc; display: block; margin-bottom: 6px; }
  .brill-input { width: 100%; background: #181818; border: 1.5px solid #2a2a2a; border-radius: 10px; padding: 13px 16px; font-size: 15px; font-family: 'DM Sans', sans-serif; color: #e8e8e8; outline: none; transition: border-color 0.15s; }
  .brill-input:focus { border-color: #444; }
  .brill-field { display: flex; flex-direction: column; }
  .brill-btn-update { background: linear-gradient(90deg, #2f2f2f 0%, #242424 100%); border: none; border-radius: 10px; padding: 13px; font-size: 15px; font-weight: 500; font-family: 'DM Sans', sans-serif; color: #f0f0f0; cursor: pointer; width: 100%; margin-top: 4px; transition: transform 0.15s; }
  .brill-btn-update:hover { transform: translateY(-1px); }
  .brill-divider { border: none; border-top: 1px solid #1e1e1e; }
  .brill-email-row { display: flex; align-items: center; justify-content: space-between; background: #181818; border: 1.5px solid #2a2a2a; border-radius: 10px; padding: 13px 16px; flex-wrap: wrap; gap: 8px; }
  .brill-email-text { font-size: 14px; color: #e8e8e8; word-break: break-all; }
  .brill-badges { display: flex; gap: 8px; flex-shrink: 0; }
  .brill-badge { font-size: 11px; font-weight: 700; letter-spacing: 0.5px; padding: 3px 8px; border-radius: 6px; }
  .brill-badge-verified { color: #2ecc71; }
  .brill-badge-primary { color: #2b6be6; }
  .brill-btn-add-email { width: 100%; background: #181818; border: 1.5px solid #2a2a2a; border-radius: 10px; padding: 13px; font-size: 15px; font-weight: 500; font-family: 'DM Sans', sans-serif; color: #e8e8e8; cursor: pointer; transition: background 0.15s; text-align: center; }
  .brill-btn-add-email:hover { background: #222; }
  .brill-info-box { display: flex; align-items: flex-start; gap: 14px; background: #1a2440; border: 1px solid #263060; border-radius: 10px; padding: 18px; font-size: 14px; color: #a8b8e0; line-height: 1.6; }
  .brill-info-icon { color: #5b8af0; font-size: 18px; flex-shrink: 0; margin-top: 1px; }
  .brill-news { display: flex; flex-direction: column; gap: 20px; }
  .brill-seg { display: inline-flex; background: #161616; border: 1.5px solid #2b2b2b; border-radius: 999px; padding: 6px; gap: 6px; }
  .brill-seg-button { font-size: 14px; padding: 8px 16px; border-radius: 999px; background: transparent; color: #bdbdbd; border: none; cursor: pointer; font-weight: 600; }
  .brill-seg-button.active { background: #efefef; color: #111; box-shadow: 0 2px 6px rgba(0,0,0,0.25); }
  .brill-subheading { font-size: 15px; color: #d0d0d0; margin-bottom: 8px; }
  .brill-news-title { font-size: 18px; font-weight: 700; color: #fff; margin-bottom: 4px; letter-spacing: -0.3px; }
  .brill-news-label { font-size: 15px; font-weight: 600; color: #f3f3f3; line-height: 1.4; text-align: left; }
  .brill-switch { width: 56px; height: 30px; border-radius: 999px; padding: 3px; display: flex; align-items: center; flex-shrink: 0; }
  .brill-switch-knob { width: 24px; height: 24px; border-radius: 50%; background: #fff; box-shadow: 0 3px 8px rgba(0,0,0,0.18); }

  @media (max-width: 640px) {
    .brill-page { flex-direction: column; padding: 16px 14px; gap: 16px; }
    .brill-sidebar { width: 100%; display: flex; flex-direction: row; flex-wrap: wrap; gap: 6px; padding: 10px; }
    .brill-sidebar-item { padding: 8px 14px; font-size: 13px; }
    .brill-section-title { font-size: 17px; }
    .brill-seg { flex-wrap: wrap; }
  }
`;

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
  const [announcementPrefs, setAnnouncementPrefs] = useState({ newsletters: true, launches: true, promotions: true });
  const [appearanceMode, setAppearanceMode] = useState("Auto");
  const [emailPrefs, setEmailPrefs] = useState({ reminders: true, alerts: true });
  const [learningReminders, setLearningReminders] = useState({ dailyPractice: true, personalized: true });

  useEffect(() => {
    try { const saved = localStorage.getItem("appearanceMode"); if (saved) setAppearanceMode(saved); } catch (e) {}
  }, []);

  useEffect(() => {
    const applyForMode = (mode) => {
      if (mode === "Auto") {
        const mq = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)");
        document.documentElement.dataset.theme = (mq ? mq.matches : true) ? "dark" : "light";
      } else {
        document.documentElement.dataset.theme = mode.toLowerCase();
      }
    };
    applyForMode(appearanceMode);
    try { localStorage.setItem("appearanceMode", appearanceMode); } catch (e) {}
  }, [appearanceMode]);

  const sidebarItems = ["Account", "Premium", "Preferences"];

  const ToggleRow = ({ label, value, onToggle }) => (
    <button
      type="button"
      onClick={onToggle}
      style={{ width: "100%", background: "#171717", border: "1.5px solid #383838", borderRadius: 14, padding: "16px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, cursor: "pointer" }}
    >
      <div className="brill-news-label">{label}</div>
      <div className="brill-switch" style={{ justifyContent: value ? "flex-end" : "flex-start", background: value ? "#4a72ff" : "#3a3a3a" }}>
        <div className="brill-switch-knob" />
      </div>
    </button>
  );

  const renderActiveSection = () => {
    if (activeTab === "Premium") {
      return (
        <div>
          <div className="brill-section-title">Premium</div>
          <div className="brill-info-box">
            <span className="brill-info-icon"><InfoIcon /></span>
            <div>Upgrade to get access to premium learning paths, extra practice, and advanced progress tracking.</div>
          </div>
        </div>
      );
    }

    if (activeTab === "Preferences") {
      return (
        <div className="brill-news">
          <div>
            <div className="brill-news-title">Appearance</div>
            <div className="brill-subheading">Choose your preferred color mode</div>
            <div style={{ marginTop: 12 }}>
              <div className="brill-seg">
                {["Light", "Dark", "Auto"].map((mode) => (
                  <button key={mode} type="button" className={`brill-seg-button${appearanceMode === mode ? " active" : ""}`} onClick={() => setAppearanceMode(mode)}>{mode}</button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="brill-news-title">Email notifications</div>
            <div className="brill-subheading">Streaks</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 8 }}>
              <ToggleRow label="Reminders (during the day)" value={emailPrefs.reminders} onToggle={() => setEmailPrefs((p) => ({ ...p, reminders: !p.reminders }))} />
              <ToggleRow label="Alerts (warnings when your streak is about to expire)" value={emailPrefs.alerts} onToggle={() => setEmailPrefs((p) => ({ ...p, alerts: !p.alerts }))} />
            </div>
          </div>

          <div>
            <div className="brill-news-title">Learning Reminders</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 8 }}>
              <ToggleRow label="Daily practice" value={learningReminders.dailyPractice} onToggle={() => setLearningReminders((p) => ({ ...p, dailyPractice: !p.dailyPractice }))} />
              <ToggleRow label="Personalized course recommendations" value={learningReminders.personalized} onToggle={() => setLearningReminders((p) => ({ ...p, personalized: !p.personalized }))} />
            </div>
          </div>

          <div>
            <div className="brill-news-title">News and Announcements</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 8 }}>
              {[{ key: "newsletters", label: "Monthly newsletters" }, { key: "launches", label: "Content launches" }, { key: "promotions", label: "Promotions" }].map((item) => (
                <ToggleRow key={item.key} label={item.label} value={announcementPrefs[item.key]} onToggle={() => setAnnouncementPrefs((p) => ({ ...p, [item.key]: !p[item.key] }))} />
              ))}
            </div>
          </div>
        </div>
      );
    }

    return (
      <>
        <div>
          <div className="brill-section-title">Personal info</div>
          <div className="brill-section">
            <div className="brill-field">
              <label className="brill-label">First name</label>
              <input className="brill-input" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </div>
            <div className="brill-field">
              <label className="brill-label">Last name</label>
              <input className="brill-input" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
            <button className="brill-btn-update" type="button">Update personal info</button>
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
            <div>Your account doesn't have a password set. You sign in using social authentication.</div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <style>{css}</style>
      <div className="brilliant-root">
        <TopNav />
        <div className="brill-page">
          <div className="brill-sidebar">
            {sidebarItems.map((item) => (
              <div key={item} className={`brill-sidebar-item${activeTab === item ? " active" : ""}`} onClick={() => setActiveTab(item)}>{item}</div>
            ))}
          </div>
          <div className="brill-content">{renderActiveSection()}</div>
        </div>
      </div>
    </>
  );
}