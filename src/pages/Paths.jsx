import { Menu, Search } from "lucide-react";

const learningRows = [
  {
    title: "Math Foundations",
    subtitle: "Strengthen your math fundamentals",
    icon: (
      <svg viewBox="0 0 64 64" width="44" height="44" fill="none">
        <path d="M14 42L34 22" stroke="#4260ff" strokeWidth="9" strokeLinecap="round" />
        <circle cx="20" cy="20" r="8" fill="#6b8bff" />
        <rect x="30" y="10" width="18" height="18" rx="4" fill="#2747cc" transform="rotate(45 39 19)" />
        <rect x="28" y="32" width="22" height="12" rx="3" fill="#5b72ff" />
        <rect x="12" y="35" width="16" height="16" rx="4" fill="#3049c7" transform="rotate(45 20 43)" />
      </svg>
    ),
    cards: [
      { title: "Arithmetic Thinking", tag: "NEW", icon: "🧮" },
      { title: "Coordinate Plane", icon: "📐" },
      { title: "Proportional Reasoning", icon: "🎨" },
      { title: "Visual Algebra", icon: "🧱" },
    ],
  },
  {
    title: "Algebra Fundamentals",
    subtitle: "Start developing your algebra toolkit",
    icon: (
      <svg viewBox="0 0 64 64" width="44" height="44" fill="none">
        <rect x="8" y="10" width="18" height="18" rx="4" fill="#6b8bff" transform="rotate(45 17 19)" />
        <rect x="24" y="18" width="18" height="18" rx="4" fill="#2747cc" />
        <rect x="35" y="30" width="18" height="18" rx="4" fill="#5b72ff" transform="rotate(45 44 39)" />
      </svg>
    ),
    cards: [
      { title: "Solving Equations", icon: "⚖️" },
      { title: "Linear Equations", tag: "NEW", icon: "π" },
      { title: "Linear Relationships", tag: "NEW", icon: "📈" },
      { title: "Exponents and\nRadicals", tag: "NEW", icon: "🟡" },
      { title: "Coordinate\nGeometry", icon: "📊" },
    ],
  },
  {
    title: "Intermediate Algebra",
    subtitle: "Master problem solving essentials in algebra",
    icon: (
      <svg viewBox="0 0 64 64" width="44" height="44" fill="none">
        <rect x="6" y="22" width="18" height="18" rx="4" fill="#5b72ff" transform="rotate(45 15 31)" />
        <rect x="26" y="10" width="18" height="18" rx="4" fill="#2747cc" />
        <rect x="35" y="32" width="18" height="18" rx="4" fill="#6b8bff" transform="rotate(45 44 41)" />
      </svg>
    ),
    cards: [
      { title: "Introduction to\nFunctions", tag: "NEW", icon: "↗" },
      { title: "Quadratics", tag: "NEW", icon: "▦" },
      { title: "Linear Systems", tag: "NEW", icon: "🕷️" },
      { title: "Coordinate\nTransformations", tag: "NEW", icon: "⧉" },
      { title: "Exponentials and\nLogarithms", tag: "NEW", icon: "◔" },
    ],
  },
  {
    title: "Advanced Math",
    subtitle: "Take your abilities to the next level",
    icon: (
      <svg viewBox="0 0 64 64" width="44" height="44" fill="none">
        <rect x="8" y="8" width="18" height="18" rx="4" fill="#2747cc" transform="rotate(45 17 17)" />
        <rect x="30" y="10" width="16" height="16" rx="3" fill="#5b72ff" />
        <rect x="24" y="26" width="18" height="18" rx="4" fill="#6b8bff" transform="rotate(45 33 35)" />
      </svg>
    ),
    cards: [
      { title: "Trigonometry", tag: "NEW", icon: "△" },
      { title: "Statistics", tag: "NEW", icon: "◫" },
      { title: "Calculus", tag: "NEW", icon: "∫" },
      { title: "Vectors", tag: "NEW", icon: "↗" },
      { title: "Complex Numbers", tag: "NEW", icon: "◉" },
    ],
  },
];

const topNavStyle = {
  maxWidth: 768,
  margin: "0 auto",
  padding: "14px 18px 9px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

function PathCard({ title, tag, icon }) {
  return (
    <div style={{ width: "100%", minWidth: 0, textAlign: "center" }}>
      <div
        style={{
          width: "100%",
          aspectRatio: "1 / 1",
          borderRadius: 16,
          border: "1px solid #3b3b3b",
          background: "#181818",
          boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.02)",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {tag ? (
          <div
            style={{
              position: "absolute",
              top: 8,
              right: 8,
              background: "#27c55a",
              color: "#fff",
              borderRadius: 999,
              padding: "3px 8px",
              fontSize: 10,
              lineHeight: 1,
              fontWeight: 800,
            }}
          >
            {tag}
          </div>
        ) : null}
        <div style={{ fontSize: 34, transform: "translateY(2px)" }}>{icon}</div>
      </div>
      <div style={{ color: "#d6d6d6", fontSize: 12.5, lineHeight: 1.25, marginTop: 11, whiteSpace: "pre-line" }}>{title}</div>
    </div>
  );
}

function LearningSection({ row }) {
  return (
    <section style={{ padding: "0 0 10px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "4px 0 18px" }}>
        <div style={{ width: 56, height: 56, display: "flex", alignItems: "center", justifyContent: "center" }}>{row.icon}</div>
        <div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 14, flexWrap: "wrap" }}>
            <div style={{ color: "#fff", fontSize: 18, fontWeight: 800 }}>{row.title}</div>
            <div style={{ color: "#8c8c8c", fontSize: 12.5 }}>{row.subtitle}</div>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${row.cards.length}, minmax(0, 1fr))`,
          gap: 12,
          width: "100%",
          paddingBottom: 4,
        }}
      >
        {row.cards.map((card) => (
          <PathCard key={card.title} title={card.title} tag={card.tag} icon={card.icon} />
        ))}
      </div>
    </section>
  );
}

export default function Paths() {
  return (
    <div style={{ minHeight: "100vh", background: "#0b0b0b", color: "#fff", fontFamily: "Arial, Helvetica, sans-serif" }}>
      <div style={{ background: "#111111", borderBottom: "1px solid #2a2a2a" }}>
        <div style={topNavStyle}>
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <div style={{ fontSize: 18, fontWeight: 900, letterSpacing: "-0.5px" }}>Brilliant</div>
            <div style={{ display: "flex", alignItems: "center", gap: 18, color: "#b6b6b6", fontSize: 13 }}>
              <button type="button" data-route="/dashboard" style={{ background: "none", border: "none", color: "#b6b6b6", padding: 0, display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 13 }}>⌂</span>
                <span>Home</span>
              </button>
              <button type="button" data-route="/paths" style={{ background: "none", border: "none", color: "#fff", padding: 0, display: "flex", alignItems: "center", gap: 6, position: "relative" }}>
                <span style={{ fontSize: 12 }}>▢</span>
                <span>Courses</span>
                <div style={{ position: "absolute", left: 0, right: 0, bottom: -15, height: 2, background: "#fff" }} />
              </button>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#d8d8d8" }}>
            <button
              type="button"
              style={{
                background: "linear-gradient(90deg, rgba(138,115,255,0.25), rgba(255,159,90,0.25))",
                border: "1px solid #4d4d4d",
                color: "#fff",
                borderRadius: 999,
                padding: "7px 14px",
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              Start trial
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: 6, background: "#191919", border: "1px solid #333", borderRadius: 999, padding: "5px 10px", fontSize: 12 }}>
              <span>0</span>
              <span style={{ opacity: 0.7 }}>🔑</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 700 }}>
              <span>1</span>
              <span style={{ color: "#f4e05d" }}>⚡</span>
            </div>
            <Menu size={18} />
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 768, margin: "0 auto", padding: "32px 18px 40px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 14 }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Learning Paths</div>
            <div style={{ color: "#8f8f8f", fontSize: 13.5 }}>Step-by-step paths to mastery</div>
          </div>

          <div style={{ width: 270, marginTop: 8 }}>
            <div
              style={{
                background: "#141414",
                border: "1px solid #373737",
                borderRadius: 999,
                padding: "10px 12px",
                display: "flex",
                alignItems: "center",
                gap: 8,
                color: "#888",
              }}
            >
              <Search size={14} />
              <span style={{ fontSize: 12.5, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>What do you want to learn?</span>
              <div style={{ marginLeft: "auto", background: "#1d1d1d", border: "1px solid #343434", borderRadius: 999, padding: "4px 10px", fontSize: 11, color: "#757575", fontWeight: 700 }}>Ask</div>
            </div>
          </div>
        </div>

        <div style={{ height: 44 }} />

        {learningRows.map((row, index) => (
          <div key={row.title}>
            {index > 0 ? <div style={{ height: 1, background: "#262626", margin: "26px 0 28px" }} /> : null}
            <LearningSection row={row} />
          </div>
        ))}
      </div>
    </div>
  );
}
