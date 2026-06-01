import learningRows from "../data/learningRows.jsx";
import TopNav from "../components/TopNav";

function findCardById(cardId) {
  for (const row of learningRows) {
    const found = row.cards.find((c) => c.id === cardId);
    if (found) return { row, card: found };
  }
  return null;
}

export default function PathDetail({ params } = {}) {
  const cardId = params?.cardId ?? window.location.pathname.split("/").pop();
  const found = findCardById(cardId);

  if (!found) {
    return (
      <div style={{ padding: 40, fontFamily: "Arial, Helvetica, sans-serif" }}>
        <h2>Path not found</h2>
        <p>We couldn't find that learning path.</p>
      </div>
    );
  }

  const { row, card } = found;

  return (
    <div style={{ minHeight: "100vh", background: "#0b0b0b", color: "#fff", fontFamily: "Arial, Helvetica, sans-serif" }}>
      <TopNav />

      <div style={{ maxWidth: 880, margin: "40px auto", padding: 20 }}>
        <div style={{ display: "flex", gap: 18, alignItems: "center" }}>
          <div style={{ width: 64, height: 64 }}>{row.icon}</div>
          <div>
            <div style={{ fontSize: 28, fontWeight: 800 }}>{card.title.replace(/\n/g, " ")}</div>
            <div style={{ color: "#9f9f9f", marginTop: 6 }}>{row.title} — {row.subtitle}</div>
          </div>
        </div>

        <div style={{ marginTop: 22, background: "#141414", padding: 18, borderRadius: 12 }}>
          <p style={{ color: "#e7e7e7", fontSize: 15 }}>{card.content.intro}</p>
          <p style={{ color: "#c9c9c9", fontSize: 14 }}>{card.content.practice}</p>
          <p style={{ color: "#9f9f9f", fontSize: 13 }}>{card.content.challenge}</p>

          <h4 style={{ marginTop: 18, color: "#fff" }}>Lessons</h4>
          <ul style={{ color: "#d6d6d6" }}>
            {card.lessons.map((l) => (
              <li key={l} style={{ margin: "8px 0" }}>{l}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
