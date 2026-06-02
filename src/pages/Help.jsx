import { useMemo, useState } from "react";
import MenuButton from "../components/MenuButton";
import TopNav from "../components/TopNav";

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

  .brill-content { flex: 1; display: flex; flex-direction: column; gap: 24px; }
  .brill-section-title {
    font-size: 22px;
    font-weight: 700;
    color: #fff;
    letter-spacing: -0.3px;
  }
  .brill-section-subtitle {
    margin-top: 6px;
    color: #9f9f9f;
    font-size: 14px;
    line-height: 1.6;
  }
  .brill-search {
    width: 100%;
    background: #181818;
    border: 1.5px solid #2a2a2a;
    border-radius: 14px;
    padding: 15px 18px;
    font-size: 15px;
    font-family: 'DM Sans', sans-serif;
    color: #e8e8e8;
    outline: none;
  }
  .brill-search::placeholder { color: #666; }
  .brill-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;
  }
  .brill-card {
    background: linear-gradient(180deg, #181818 0%, #151515 100%);
    border: 1px solid #262626;
    border-radius: 16px;
    padding: 18px;
    text-align: left;
    color: #e8e8e8;
    cursor: pointer;
    transition: transform 0.15s, border-color 0.15s, background 0.15s;
    min-height: 138px;
  }
  .brill-card:hover {
    transform: translateY(-2px);
    border-color: #3a3a3a;
    background: linear-gradient(180deg, #1b1b1b 0%, #161616 100%);
  }
  .brill-card-title {
    font-size: 17px;
    font-weight: 700;
    color: #fff;
    margin-bottom: 8px;
  }
  .brill-card-text {
    color: #9f9f9f;
    font-size: 14px;
    line-height: 1.6;
  }
  .brill-faq {
    background: #141414;
    border: 1px solid #232323;
    border-radius: 16px;
    padding: 18px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .brill-faq-item {
    padding: 14px 0;
    border-top: 1px solid #202020;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #ddd;
    font-size: 15px;
  }
  .brill-faq-item:first-child { border-top: none; padding-top: 0; }
  .brill-faq-arrow { color: #777; }
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
    {
      title: "Getting started",
      text: "Learn the basics, set up your account, and start with the right first course.",
    },
    {
      title: "Account and billing",
      text: "Manage subscriptions, payment methods, and account details.",
    },
    {
      title: "Course access",
      text: "See how course unlocks, progress, and recommendations work.",
    },
    {
      title: "Technical support",
      text: "Troubleshoot sign-in issues, loading problems, and common browser fixes.",
    },
  ];
  const popularQuestions = [
    "How do I reset my password?",
    "How do I update my email address?",
    "Why can’t I access a course?",
  ];

  const filteredCards = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    return helpCards.filter((card) => {
      const matchesTab = activeTab === "Help center" || card.title.toLowerCase().includes(activeTab.toLowerCase()) || card.text.toLowerCase().includes(activeTab.toLowerCase());
      const matchesSearch =
        normalizedSearch.length === 0 ||
        [card.title, card.text].some((value) => value.toLowerCase().includes(normalizedSearch));

      return matchesTab && matchesSearch;
    });
  }, [activeTab, helpCards, searchTerm]);

  const filteredQuestions = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    return popularQuestions.filter((question) => normalizedSearch.length === 0 || question.toLowerCase().includes(normalizedSearch));
  }, [popularQuestions, searchTerm]);

  return (
    <>
      <style>{css}</style>
      <div className="brilliant-root">
        <TopNav />

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
              <div className="brill-section-title">Help center</div>
              <div className="brill-section-subtitle">
                Find answers fast with a layout inspired by Fuzu&apos;s clean support pages.
              </div>
            </div>

            <input
              className="brill-search"
              type="text"
              placeholder="Search for help topics"
              aria-label="Search for help topics"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />

            <div className="brill-grid">
              {filteredCards.map((card) => (
                <HelpCard key={card.title} {...card} />
              ))}
            </div>

            <div className="brill-faq">
              <div className="brill-section-title">Popular questions</div>
              {filteredQuestions.map((question) => (
                <div key={question} className="brill-faq-item">
                  <span>{question}</span>
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
