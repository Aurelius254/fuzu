import { useEffect, useRef, useState } from "react";
import TopNav from "../components/TopNav";

// ── 7-day streak tracker using localStorage ──────────────────────────────────
function getStreakData() {
  try {
    const raw = localStorage.getItem("fuzu_streak");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function recordTodayLogin() {
  const today = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
  const days = getStreakData();
  if (!days.includes(today)) {
    days.push(today);
    // keep only last 30 days max
    const trimmed = days.slice(-30);
    localStorage.setItem("fuzu_streak", JSON.stringify(trimmed));
  }
}

function getLast7Days() {
  const result = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    result.push(d.toISOString().slice(0, 10));
  }
  return result;
}

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function WeeklyStreakCalendar() {
  const [activeDays, setActiveDays] = useState([]);
  const last7 = getLast7Days();

  useEffect(() => {
    recordTodayLogin();
    setActiveDays(getStreakData());
  }, []);

  const today = new Date().toISOString().slice(0, 10);

  // count current streak (consecutive days ending today)
  let streakCount = 0;
  for (let i = 0; i < last7.length; i++) {
    const day = last7[last7.length - 1 - i];
    if (activeDays.includes(day)) streakCount++;
    else break;
  }

  return (
    <div style={{
      background: "#1a1a1a",
      border: "1px solid #2a2a2a",
      borderRadius: 16,
      padding: "18px 20px",
      minWidth: 280,
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div style={{ color: "#fff", fontWeight: 800, fontSize: 15 }}>Your streak</div>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ color: "#f4e05d", fontSize: 18 }}>⚡</span>
          <span style={{ color: "#fff", fontWeight: 900, fontSize: 18 }}>{streakCount}</span>
          <span style={{ color: "#666", fontSize: 12 }}>days</span>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 6 }}>
        {last7.map((dateStr) => {
          const isActive = activeDays.includes(dateStr);
          const isToday = dateStr === today;
          const dow = new Date(dateStr + "T00:00:00").getDay();
          const dayNum = parseInt(dateStr.slice(8), 10);

          return (
            <div key={dateStr} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
              <div style={{ color: "#555", fontSize: 10, fontWeight: 700 }}>{DAY_LABELS[dow].slice(0, 1)}</div>
              <div style={{
                width: 34,
                height: 34,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: isActive
                  ? "linear-gradient(135deg, #f5c518 0%, #c84bff 100%)"
                  : isToday
                  ? "#2a2a2a"
                  : "transparent",
                border: isToday && !isActive ? "2px solid #444" : "2px solid transparent",
                fontWeight: 800,
                fontSize: 12,
                color: isActive ? "#111" : isToday ? "#fff" : "#444",
                boxShadow: isActive ? "0 0 10px rgba(200,75,255,0.3)" : "none",
              }}>
                {dayNum}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 14, color: "#555", fontSize: 12, textAlign: "center" }}>
        {streakCount === 0
          ? "Start your streak — log in every day!"
          : streakCount === 7
          ? "🔥 Perfect week! Keep it going."
          : `${7 - streakCount} more day${7 - streakCount !== 1 ? "s" : ""} for a perfect week`}
      </div>
    </div>
  );
}

// ── Arithmetic Thinking card ──────────────────────────────────────────────────
function ArithmeticCard() {
  return (
    <div style={{
      background: "linear-gradient(160deg, #1e1e2e 60%, #2a1a3e 100%)",
      border: "1px solid #2d2d2d",
      borderRadius: 16,
      padding: "28px 24px",
      display: "flex",
      flexDirection: "column",
      gap: 16,
      position: "relative",
      overflow: "hidden",
    }}>
      {/* glow */}
      <div style={{
        position: "absolute", top: -40, left: "50%", transform: "translateX(-50%)",
        width: 200, height: 200, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(245,197,24,0.12) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* icon + tag */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{
          width: 48, height: 48, borderRadius: 12,
          background: "linear-gradient(135deg, #f5c518, #f59e0b)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 24,
        }}>
          🔢
        </div>
        <div style={{
          background: "#10b981", color: "#fff",
          fontSize: 10, fontWeight: 800, padding: "3px 8px",
          borderRadius: 999, letterSpacing: 1,
        }}>NEW</div>
      </div>

      {/* text */}
      <div>
        <div style={{ color: "#7dd3fc", fontSize: 11, fontWeight: 800, letterSpacing: 1, marginBottom: 4 }}>MATH FOUNDATIONS</div>
        <div style={{ color: "#fff", fontWeight: 900, fontSize: 20, marginBottom: 6 }}>Arithmetic Thinking</div>
        <div style={{ color: "#9ca3af", fontSize: 13, lineHeight: 1.6 }}>
          Build confidence with number patterns, operations, and mental math.
        </div>
      </div>

      {/* progress */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ color: "#666", fontSize: 12 }}>Progress</span>
          <span style={{ color: "#7dd3fc", fontSize: 12, fontWeight: 700 }}>0%</span>
        </div>
        <div style={{ background: "#2a2a2a", borderRadius: 999, height: 4 }}>
          <div style={{ width: "0%", height: 4, borderRadius: 999, background: "linear-gradient(90deg, #f5c518, #c84bff)" }} />
        </div>
      </div>

      {/* button */}
      <button
        type="button"
        data-route="/courses/arithmetic-thinking"
        style={{
          background: "linear-gradient(90deg, #f5c518 0%, #c84bff 100%)",
          border: "none", borderRadius: 50,
          color: "#111", fontWeight: 800, fontSize: 15,
          padding: "13px 0", width: "100%",
          cursor: "pointer", letterSpacing: 0.2,
          boxShadow: "0 4px 24px rgba(162,89,255,0.25)",
          marginTop: 4,
        }}
      >
        Start Learning
      </button>
    </div>
  );
}

// ── Dashboard ─────────────────────────────────────────────────────────────────
export default function Dashboard() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#111",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
    }}>
      <TopNav />

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "32px 20px" }}>

        {/* greeting */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ color: "#fff", fontWeight: 900, fontSize: 26, marginBottom: 4 }}>Welcome back 👋</div>
          <div style={{ color: "#666", fontSize: 14 }}>Pick up where you left off.</div>
        </div>

        {/* main grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 18 }}>
          <ArithmeticCard />
          <WeeklyStreakCalendar />
        </div>

      </div>
    </div>
  );
}