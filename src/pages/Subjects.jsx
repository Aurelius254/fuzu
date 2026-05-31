import { useState } from "react";

function MathVisual() {
  const [colored, setColored] = useState([true, true, false, false]);
  const toggle = (index) =>
    setColored((previous) => previous.map((value, currentIndex) => (currentIndex === index ? !value : value)));
  const coloredCount = colored.filter(Boolean).length;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
      <p style={{ fontSize: 13, color: "#555", margin: 0 }}>Color ½ of the shape</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {colored.map((isColored, index) => (
          <div
            key={index}
            onClick={() => toggle(index)}
            style={{
              width: 56,
              height: 56,
              borderRadius: 10,
              background: isColored ? "#4F6EF7" : "#E0E6FF",
              border: `2px solid ${isColored ? "#3347CC" : "#BCC8FF"}`,
              cursor: "pointer",
              transition: "background 0.2s",
            }}
          />
        ))}
      </div>
      <p style={{ fontSize: 12, color: coloredCount === 2 ? "#1BAD84" : "#aaa", margin: 0, fontWeight: 600 }}>
        {coloredCount}/4 {coloredCount === 2 ? "✓ That's ½!" : "colored"}
      </p>
    </div>
  );
}

function ScienceVisual() {
  const [temperature, setTemperature] = useState(25);
  const icon = temperature < 0 ? "🧊" : temperature < 100 ? "💧" : "♨️";
  const label = temperature < 0 ? "Solid (Ice)" : temperature < 100 ? "Liquid (Water)" : "Gas (Steam)";
  const color = temperature < 0 ? "#5BA3D9" : temperature < 100 ? "#1BAD84" : "#E0602E";

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      <p style={{ fontSize: 13, color: "#555", margin: 0 }}>What state is water in?</p>
      <div style={{ fontSize: 36 }}>{icon}</div>
      <p style={{ fontSize: 13, fontWeight: 700, color, margin: 0 }}>{label}</p>
      <input
        type="range"
        min={-20}
        max={120}
        value={temperature}
        onChange={(event) => setTemperature(Number(event.target.value))}
        style={{ width: "80%", accentColor: color }}
      />
      <p style={{ fontSize: 12, color: "#888", margin: 0 }}>{temperature}°C</p>
    </div>
  );
}

function AIVisual() {
  const [weight1, setWeight1] = useState(0.6);
  const [weight2, setWeight2] = useState(0.4);
  const output = (weight1 * 0.7 + weight2 * 0.3).toFixed(2);
  const fires = Number(output) > 0.5;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      <p style={{ fontSize: 13, color: "#555", margin: 0 }}>Tune the neural weights</p>
      {[
        ["w₁", weight1, setWeight1],
        ["w₂", weight2, setWeight2],
      ].map(([label, value, setValue]) => (
        <div key={label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#E0602E", width: 20 }}>{label}</span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={value}
            onChange={(event) => setValue(Number(event.target.value))}
            style={{ width: 100, accentColor: "#E0602E" }}
          />
          <span style={{ fontSize: 12, color: "#666", width: 28 }}>{value.toFixed(2)}</span>
        </div>
      ))}
      <div
        style={{
          marginTop: 4,
          padding: "6px 14px",
          borderRadius: 20,
          background: fires ? "#FFF2EC" : "#f5f5f5",
          border: `2px solid ${fires ? "#E0602E" : "#ddd"}`,
          fontSize: 12,
          fontWeight: 700,
          color: fires ? "#E0602E" : "#aaa",
          transition: "all 0.3s",
        }}
      >
        Output: {output} {fires ? "— Fires! 🔥" : "— Silent"}
      </div>
    </div>
  );
}

const subjects = [
  {
    id: "maths",
    subject: "Mathematics",
    title: "Concepts that click",
    description:
      "Every session is visual and interactive. Instead of just memorizing formulas, you play with numbers and shapes until they truly click — building your intuition step by step.",
    bg: "#EEF1FF",
    accent: "#4F6EF7",
    visual: <MathVisual />,
  },
  {
    id: "science",
    subject: "Science",
    title: "Built to make you think",
    description:
      "Like the best tutors, each lesson asks the right questions and gives you visual guidance. It's the difference between getting the answer and actually understanding it.",
    bg: "#E6FAF5",
    accent: "#1BAD84",
    visual: <ScienceVisual />,
  },
  {
    id: "ai",
    subject: "Artificial Intelligence",
    title: "Adapts to exactly where you are",
    description:
      "The curriculum tracks what you've mastered and where you're stuck, then builds practice around the gaps. It speeds up when you're ready, and slows down when you need it.",
    bg: "#FFF2EC",
    accent: "#E0602E",
    visual: <AIVisual />,
  },
];

export default function Subjects() {
  return (
    <div style={{ minHeight: "100vh", background: "#F7F8FC", fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>
      <div style={{ padding: "10px 10px 0" }}>
        <div
          style={{
            maxWidth: 768,
            margin: "0 auto",
            background: "#fff",
            border: "1px solid #e9e9e9",
            borderRadius: 18,
            boxShadow: "0 1px 0 rgba(0,0,0,0.03), 0 8px 28px rgba(0,0,0,0.04)",
            padding: "10px 14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 14,
          }}
        >
          <div style={{ fontSize: 24, fontWeight: 900, letterSpacing: "-0.8px", color: "#111", lineHeight: 1 }}>
            Brilliant
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button
              type="button"
              style={{
                background: "#fff",
                color: "#111",
                border: "1px solid #e2e2e2",
                borderRadius: 999,
                padding: "8px 16px",
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 1px 0 rgba(0,0,0,0.02)",
              }}
            >
              Sign in
            </button>

            <button
              type="button"
              style={{
                background: "#111",
                color: "#fff",
                border: "1px solid #111",
                borderRadius: 999,
                padding: "8px 16px",
                fontSize: 13,
                fontWeight: 800,
                cursor: "pointer",
                boxShadow: "0 1px 0 rgba(0,0,0,0.08)",
              }}
            >
              Get started
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 480, margin: "0 auto", padding: "26px 0 60px" }}>
        <div style={{ textAlign: "center", padding: "0 24px 28px" }}>
          <h1
            style={{
              fontSize: 28,
              fontWeight: 900,
              color: "#0D0D0D",
              margin: "0 0 10px",
              lineHeight: 1.25,
              fontFamily: "Georgia, serif",
            }}
          >
            Learn by doing,<br />
            <span style={{ color: "#4F6EF7" }}>not memorizing</span>
          </h1>
          <p style={{ fontSize: 14, color: "#666", lineHeight: 1.7, margin: 0 }}>
            Explore Maths, Science, and AI through interactive lessons that build real understanding.
          </p>
        </div>

        {subjects.map((subject) => (
          <div key={subject.id} style={{ marginBottom: 52 }}>
            <div
              style={{
                background: subject.bg,
                margin: "0 16px",
                borderRadius: 20,
                minHeight: 210,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "32px 20px",
              }}
            >
              {subject.visual}
            </div>

            <div style={{ padding: "20px 24px 0" }}>
              <p style={{ fontSize: 11, color: subject.accent, fontWeight: 700, margin: "0 0 6px", letterSpacing: "0.8px", textTransform: "uppercase" }}>
                {subject.subject}
              </p>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111", margin: "0 0 8px", fontFamily: "Georgia, serif", lineHeight: 1.3 }}>
                {subject.title}
              </h2>
              <p style={{ fontSize: 14, color: "#555", lineHeight: 1.7, margin: 0 }}>{subject.description}</p>
            </div>
          </div>
        ))}

        <div style={{ margin: "0 16px" }}>
          <button type="button" data-route="/courses" style={{ background: "#111", color: "#fff", border: "none", borderRadius: 16, padding: "16px", fontSize: 15, fontWeight: 800, cursor: "pointer", width: "100%" }}>
            Start learning for free →
          </button>
        </div>
      </div>
    </div>
  );
}