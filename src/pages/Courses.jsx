import { useMemo, useState } from "react";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import learningRows from "../data/learningRows.jsx";
import MenuButton from "../components/MenuButton";

const topNavStyle = {
  maxWidth: 768,
  margin: "0 auto",
  padding: "14px 18px 9px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

function PathCard({ title, tag, icon, summary, cardId }) {
  return (
    <button
      type="button"
      onClick={() => {
        window.history.pushState({}, "", `/courses/${cardId}`);
        window.dispatchEvent(new PopStateEvent("popstate"));
      }}
      style={{ width: "100%", minWidth: 0, textAlign: "left", background: "none", border: "none", padding: 0, cursor: "pointer" }}
    >
      <div
        style={{
          width: "100%",
          minHeight: 160,
          borderRadius: 16,
          border: "1px solid #3b3b3b",
          background: "#181818",
          boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.02)",
          position: "relative",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          overflow: "hidden",
          flexDirection: "column",
          padding: 14,
          gap: 10,
          transition: "transform 0.15s, border-color 0.15s, background 0.15s",
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
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
          <div style={{ fontSize: 30, transform: "translateY(2px)" }}>{icon}</div>
          <div style={{ color: "#8f8f8f", fontSize: 12, fontWeight: 700 }}>View</div>
        </div>
        <div style={{ textAlign: "left" }}>
          <div style={{ color: "#d6d6d6", fontSize: 12.5, lineHeight: 1.25, marginTop: 11, whiteSpace: "pre-line", fontWeight: 700 }}>{title}</div>
          <div style={{ color: "#9f9f9f", fontSize: 12, lineHeight: 1.55, marginTop: 8 }}>{summary}</div>
        </div>
      </div>
    </button>
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
          <PathCard key={card.id} title={card.title} tag={card.tag} icon={card.icon} summary={card.summary} cardId={card.id} />
        ))}
      </div>
    </section>
  );
}

function ProgressPanel({ open }) {
  if (!open) return null;

  return (
    <div
      style={{
        marginTop: 14,
        border: "1px solid #2d2d2d",
        borderRadius: 16,
        background: "#141414",
        padding: 18,
        color: "#d7d7d7",
      }}
    >
      <div style={{ fontSize: 16, fontWeight: 800, color: "#fff", marginBottom: 10 }}>The progress will be seen here</div>
      <div style={{ display: "grid", gap: 12 }}>
        {[
          { label: "Arithmetic Thinking", value: 42 },
          { label: "Solving Equations", value: 18 },
          { label: "Trigonometry", value: 5 },
        ].map((item) => (
          <div key={item.label}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 13, color: "#bcbcbc" }}>
              <span>{item.label}</span>
              <span>{item.value}%</span>
            </div>
            <div style={{ height: 8, borderRadius: 999, background: "#242424", overflow: "hidden" }}>
              <div style={{ width: `${item.value}%`, height: "100%", background: "linear-gradient(90deg, #f6d86a 0%, #c84bff 100%)" }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Courses() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showProgress, setShowProgress] = useState(false);

  const filteredRows = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    if (!normalizedSearch) return learningRows;

    return learningRows
      .map((row) => {
        const rowMatches = row.title.toLowerCase().includes(normalizedSearch) || row.subtitle.toLowerCase().includes(normalizedSearch);
        const matchingCards = row.cards.filter((card) => [card.title, card.summary, card.tag ?? ""].some((value) => value.toLowerCase().includes(normalizedSearch)));

        if (!rowMatches && matchingCards.length === 0) return null;

        return { ...row, cards: matchingCards.length > 0 ? matchingCards : row.cards };
      })
      .filter(Boolean);
  }, [searchTerm]);

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
              <button type="button" data-route="/courses" style={{ background: "none", border: "none", color: "#fff", padding: 0, display: "flex", alignItems: "center", gap: 6, position: "relative" }}>
                <span style={{ fontSize: 12 }}>▢</span>
                <span>Courses</span>
                <div style={{ position: "absolute", left: 0, right: 0, bottom: -15, height: 2, background: "#fff" }} />
              </button>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#d8d8d8" }}>
            <button type="button" style={{ background: "linear-gradient(90deg, rgba(138,115,255,0.25), rgba(255,159,90,0.25))", border: "1px solid #4d4d4d", color: "#fff", borderRadius: 999, padding: "7px 14px", fontSize: 12, fontWeight: 700 }}>
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
            <MenuButton />
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 768, margin: "0 auto", padding: "32px 18px 40px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 14 }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Courses</div>
            <div style={{ color: "#8f8f8f", fontSize: 13.5 }}>All of your learning paths now live here</div>
          </div>

          <div style={{ width: 270, marginTop: 8 }}>
            <label style={{ display: "block", position: "relative" }}>
              <Search size={14} style={{ position: "absolute", left: 12, top: 15, color: "#888" }} />
              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="What do you want to learn?"
                aria-label="Search courses"
                style={{
                  width: "100%",
                  background: "#141414",
                  border: "1px solid #373737",
                  borderRadius: 999,
                  padding: "11px 56px 11px 34px",
                  color: "#f1f1f1",
                  fontSize: 12.5,
                  outline: "none",
                }}
              />
              <div style={{ position: "absolute", right: 10, top: 8, background: "#1d1d1d", border: "1px solid #343434", borderRadius: 999, padding: "4px 10px", fontSize: 11, color: "#757575", fontWeight: 700 }}>Ask</div>
            </label>
          </div>
        </div>

        <div style={{ marginTop: 22 }}>
          <button
            type="button"
            onClick={() => setShowProgress((value) => !value)}
            style={{
              width: "100%",
              textAlign: "left",
              background: "linear-gradient(135deg, rgba(124,58,237,0.22) 0%, rgba(246,216,106,0.22) 100%)",
              border: "1px solid rgba(246,216,106,0.28)",
              borderRadius: 16,
              padding: "16px 18px",
              color: "#fff",
              fontSize: 18,
              fontWeight: 800,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
            }}
          >
            <span>Courses currently learning</span>
            <span style={{ display: "inline-flex", alignItems: "center", color: "#f6d86a" }}>
              {showProgress ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </span>
          </button>
          <ProgressPanel open={showProgress} />
        </div>

        {!showProgress ? (
          <>
            <div style={{ height: 28 }} />

            {filteredRows.length > 0 ? filteredRows.map((row, index) => (
              <div key={row.title}>
                {index > 0 ? <div style={{ height: 1, background: "#262626", margin: "26px 0 28px" }} /> : null}
                <LearningSection row={row} />
              </div>
            )) : (
              <div style={{ color: "#9a9a9a", fontSize: 14, padding: "24px 0" }}>No matching courses found.</div>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
}
