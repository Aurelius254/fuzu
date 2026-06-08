import { useEffect, useState } from "react";
import TopNav from "../components/TopNav";
import { auth } from "../firebase";

function getStreakData() {
  try {
    const raw = localStorage.getItem("fuzu_streak");
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function getCompleted() {
  try {
    return JSON.parse(localStorage.getItem("fuzu_completed") || "[]");
  } catch { return []; }
}

function getFirstName() {
  const user = auth.currentUser;
  if (!user) return "back";
  if (user.displayName) return user.displayName.split(" ")[0];
  // email/password fallback — capitalise first letter of email prefix
  const prefix = user.email.split("@")[0];
  return prefix.charAt(0).toUpperCase() + prefix.slice(1);
}

function recordTodayLogin() {
  const today = new Date().toISOString().slice(0, 10);
  const days = getStreakData();
  if (!days.includes(today)) {
    days.push(today);
    localStorage.setItem("fuzu_streak", JSON.stringify(days.slice(-30)));
  }
}

function getLast5Days() {
  const result = [];
  for (let i = 4; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    result.push(d.toISOString().slice(0, 10));
  }
  return result;
}

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function WeeklyStreakCalendar() {
  const [activeDays, setActiveDays] = useState([]);
  const last5 = getLast5Days();
  const today = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    recordTodayLogin();
    setActiveDays(getStreakData());
  }, []);

  let streakCount = 0;
  for (let i = 0; i < last5.length; i++) {
    const day = last5[last5.length - 1 - i];
    if (activeDays.includes(day)) streakCount++;
    else break;
  }

  return (
    <div style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 16, padding: "18px 20px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div style={{ color: "#fff", fontWeight: 800, fontSize: 15 }}>Your streak</div>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ color: "#f4e05d", fontSize: 18 }}>⚡</span>
          <span style={{ color: "#fff", fontWeight: 900, fontSize: 18 }}>{streakCount}</span>
          <span style={{ color: "#666", fontSize: 12 }}>days</span>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: 6 }}>
        {last5.map((dateStr) => {
          const isActive = activeDays.includes(dateStr);
          const isToday = dateStr === today;
          const dow = new Date(dateStr + "T00:00:00").getDay();
          const dayNum = parseInt(dateStr.slice(8), 10);
          return (
            <div key={dateStr} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, flex: 1 }}>
              <div style={{ color: "#555", fontSize: 10, fontWeight: 700 }}>{DAY_LABELS[dow].slice(0, 1)}</div>
              <div style={{
                width: 34, height: 34, borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                background: isActive ? "linear-gradient(135deg, #f5c518 0%, #c84bff 100%)" : isToday ? "#2a2a2a" : "transparent",
                border: isToday && !isActive ? "2px solid #444" : "2px solid transparent",
                fontWeight: 800, fontSize: 12,
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
        {streakCount === 0 ? "Start your streak — log in every day!" : streakCount === 5 ? "🔥 Perfect 5 days! Keep it going." : `${5 - streakCount} more day${5 - streakCount !== 1 ? "s" : ""} for a perfect streak`}
      </div>
    </div>
  );
}

// ── Course cards data ──────────────────────────────────────────────────────────
const COURSE_DATA = [
  {
    id: "arithmetic-thinking",
    route: "/courses/arithmetic-thinking",
    icon: "🔢",
    iconBg: "linear-gradient(135deg, #f5c518, #f59e0b)",
    tag: "NEW",
    category: "MATH FOUNDATIONS",
    title: "Arithmetic Thinking",
    description: "Build confidence with number patterns, operations, and mental math.",
    glow: "rgba(245,197,24,0.12)",
  },
  {
    id: "counting-sequences",
    route: "/courses/counting-sequences",
    icon: "🔢",
    iconBg: "linear-gradient(135deg, #7dd3fc, #2563eb)",
    tag: "NEW",
    category: "MATH FOUNDATIONS",
    title: "Counting and Sequences",
    description: "Discover patterns in number sequences and learn rules for counting systematically.",
    glow: "rgba(125,211,252,0.12)",
  },
];

function CourseCard({ course }) {
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
      minHeight: 380,
      width: "100%",
      boxSizing: "border-box",
    }}>
      <div style={{ position: "absolute", top: -40, left: "50%", transform: "translateX(-50%)", width: 200, height: 200, borderRadius: "50%", background: `radial-gradient(circle, ${course.glow} 0%, transparent 70%)`, pointerEvents: "none" }} />

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ width: 48, height: 48, borderRadius: 12, background: course.iconBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>{course.icon}</div>
        <div style={{ background: "#10b981", color: "#fff", fontSize: 10, fontWeight: 800, padding: "3px 8px", borderRadius: 999, letterSpacing: 1 }}>{course.tag}</div>
      </div>

      <div>
        <div style={{ color: "#7dd3fc", fontSize: 11, fontWeight: 800, letterSpacing: 1, marginBottom: 4 }}>{course.category}</div>
        <div style={{ color: "#fff", fontWeight: 900, fontSize: 20, marginBottom: 6 }}>{course.title}</div>
        <div style={{ color: "#9ca3af", fontSize: 13, lineHeight: 1.6 }}>{course.description}</div>
      </div>

      <div style={{ flex: 1 }} />

      <div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ color: "#666", fontSize: 12 }}>Progress</span>
          <span style={{ color: "#7dd3fc", fontSize: 12, fontWeight: 700 }}>{course.progress}%</span>
        </div>
        <div style={{ background: "#2a2a2a", borderRadius: 999, height: 4 }}>
          <div style={{ width: `${course.progress}%`, height: 4, borderRadius: 999, background: "linear-gradient(90deg, #f5c518, #c84bff)" }} />
        </div>
      </div>

      <button
        type="button"
        data-route={course.route}
        style={{ background: course.progress === 100 ? "#1e293b" : "linear-gradient(90deg, #f5c518 0%, #c84bff 100%)", border: course.progress === 100 ? "1px solid #334155" : "none", borderRadius: 50, color: course.progress === 100 ? "#fff" : "#111", fontWeight: 800, fontSize: 15, padding: "13px 0", width: "100%", cursor: "pointer", letterSpacing: 0.2, boxShadow: course.progress === 100 ? "none" : "0 4px 24px rgba(162,89,255,0.25)", marginTop: 4 }}
      >
        {course.progress === 100 ? "Review ✓" : "Start Learning"}
      </button>
    </div>
  );
}

// ── Carousel ───────────────────────────────────────────────────────────────────
function CourseCarousel() {
  const [active, setActive] = useState(0);
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    setCompleted(getCompleted());
  }, []);

  const COURSES = COURSE_DATA.map(c => ({ ...c, progress: completed.includes(c.id) ? 100 : 0 }));

  const prev = () => setActive(i => (i - 1 + COURSES.length) % COURSES.length);
  const next = () => setActive(i => (i + 1) % COURSES.length);

  return (
    <div>
      {/* card */}
      <div style={{ position: "relative" }}>
        <CourseCard course={COURSES[active]} />

        {/* arrow buttons */}
        <button
          type="button"
          onClick={prev}
          style={{
            position: "absolute", left: -16, top: "50%", transform: "translateY(-50%)",
            width: 32, height: 32, borderRadius: "50%",
            background: "#1e293b", border: "1px solid #334155",
            color: "#fff", fontSize: 16, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 2, boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
          }}
        >‹</button>

        <button
          type="button"
          onClick={next}
          style={{
            position: "absolute", right: -16, top: "50%", transform: "translateY(-50%)",
            width: 32, height: 32, borderRadius: "50%",
            background: "#1e293b", border: "1px solid #334155",
            color: "#fff", fontSize: 16, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 2, boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
          }}
        >›</button>
      </div>

      {/* dots */}
      <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 16 }}>
        {COURSES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            style={{
              width: i === active ? 20 : 8,
              height: 8,
              borderRadius: 999,
              background: i === active ? "linear-gradient(90deg, #f5c518, #c84bff)" : "#2a2a2a",
              border: "none",
              cursor: "pointer",
              padding: 0,
              transition: "all 0.2s",
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ── Dashboard ──────────────────────────────────────────────────────────────────
export default function Dashboard() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#111", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <TopNav />
      <div style={{ maxWidth: 768, margin: "0 auto", padding: "32px 20px" }}>

        <div style={{ marginBottom: 28 }}>
          <div style={{ color: "#fff", fontWeight: 900, fontSize: 26, marginBottom: 4 }}>Welcome back, {getFirstName()} 👋</div>
          <div style={{ color: "#666", fontSize: 14 }}>Pick up where you left off.</div>
        </div>

        {isMobile ? (
          // Mobile — carousel full width only
          <CourseCarousel />
        ) : (
          // Desktop — carousel left, streak right
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, alignItems: "start" }}>
            <CourseCarousel />
            <WeeklyStreakCalendar />
          </div>
        )}

      </div>
    </div>
  );
}