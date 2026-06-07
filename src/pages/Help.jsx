import { useMemo, useState } from "react";
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
  .brill-content { flex: 1; display: flex; flex-direction: column; gap: 24px; min-width: 0; }
  .brill-section-title { font-size: 20px; font-weight: 700; color: #fff; letter-spacing: -0.3px; }
  .brill-section-subtitle { margin-top: 6px; color: #9f9f9f; font-size: 14px; line-height: 1.6; }
  .brill-search { width: 100%; background: #181818; border: 1.5px solid #2a2a2a; border-radius: 14px; padding: 15px 18px; font-size: 15px; font-family: 'DM Sans', sans-serif; color: #e8e8e8; outline: none; }
  .brill-search::placeholder { color: #666; }
  .brill-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
  .brill-card { background: linear-gradient(180deg, #181818 0%, #151515 100%); border: 1px solid #262626; border-radius: 16px; padding: 18px; text-align: left; color: #e8e8e8; cursor: pointer; transition: transform 0.15s, border-color 0.15s; min-height: 120px; width: 100%; }
  .brill-card:hover { transform: translateY(-2px); border-color: #3a3a3a; }
  .brill-card-title { font-size: 16px; font-weight: 700; color: #fff; margin-bottom: 8px; }
  .brill-card-text { color: #9f9f9f; font-size: 14px; line-height: 1.6; }
  .brill-faq { background: #141414; border: 1px solid #232323; border-radius: 16px; padding: 18px; display: flex; flex-direction: column; gap: 12px; }
  .brill-faq-item { padding: 14px 0; border-top: 1px solid #202020; display: flex; justify-content: space-between; align-items: center; color: #ddd; font-size: 15px; }
  .brill-faq-item:first-child { border-top: none; padding-top: 0; }
  .brill-faq-arrow { color: #777; }

  @media (max-width: 640px) {
    .brill-page { flex-direction: column; padding: 16px 14px; gap: 16px; }
    .brill-sidebar { width: 100%; display: flex; flex-direction: row; flex-wrap: wrap; gap: 6px; padding: 10px; }
    .brill-sidebar-item { padding: 8px 14px; font-size: 13px; }
    .brill-grid { grid-template-columns: 1fr; }
    .brill-section-title { font-size: 17px; }
  }
`;

const HelpCard = ({ title, text }) => (
  <button type="button" className="brill-card">
    <div className="brill-card-title">{title}</div>
    <div className="brill-card-text">{text}</div>
  </button>
);

export default function Help() {
  const [activeTab, setActiveTab] = useState("Help center");
  const [searchTerm, setSearchTerm] = useState("");

  const sidebarItems = ["Help center", "Billing", "Technical", "Account"];
  const helpCards = [
    { title: "Getting started", text: "Learn the basics, set up your account, and start with the right first course." },
    { title: "Account and billing", text: "Manage subscriptions, payment methods, and account details." },
    { title: "Course access", text: "See how course unlocks, progress, and recommendations work." },
    { title: "Technical support", text: "Troubleshoot sign-in issues, loading problems, and common browser fixes." },
  ];
  const popularQuestions = [
    "How do I reset my password?",
    "How do I update my email address?",
    "Why can't I access a course?",
  ];

  const filteredCards = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return helpCards.filter((card) => {
      const matchesTab = activeTab === "Help center" || card.title.toLowerCase().includes(activeTab.toLowerCase()) || card.text.toLowerCase().includes(activeTab.toLowerCase());
      const matchesSearch = !q || [card.title, card.text].some((v) => v.toLowerCase().includes(q));
      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchTerm]);

  const filteredQuestions = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return popularQuestions.filter((question) => !q || question.toLowerCase().includes(q));
  }, [searchTerm]);

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

          <div className="brill-content">
            <div>
              <div className="brill-section-title">Help center</div>
              <div className="brill-section-subtitle">Find answers to common questions about Fuzu.</div>
            </div>

            <input className="brill-search" type="text" placeholder="Search for help topics" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

            <div className="brill-grid">
              {filteredCards.map((card) => <HelpCard key={card.title} {...card} />)}
            </div>

            <div className="brill-faq">
              <div className="brill-section-title">Popular questions</div>
              {filteredQuestions.map((q) => (
                <div key={q} className="brill-faq-item">
                  <span>{q}</span>
                  <span className="brill-faq-arrow">›</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}