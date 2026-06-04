import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import learningRows from "../data/learningRows.jsx";
import TopNav from "../components/TopNav";

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



export default function Courses() {
  const [searchTerm, setSearchTerm] = useState("");

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
      <TopNav />

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

        <div style={{ height: 28 }} />

        {filteredRows.length > 0 ? filteredRows.map((row, index) => (
          <div key={row.title}>
            {index > 0 ? <div style={{ height: 1, background: "#262626", margin: "26px 0 28px" }} /> : null}
            <LearningSection row={row} />
          </div>
        )) : (
          <div style={{ color: "#9a9a9a", fontSize: 14, padding: "24px 0" }}>No matching courses found.</div>
        )}
      </div>
    </div>
  );
}