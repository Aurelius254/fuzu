import { useEffect, useRef, useState } from "react";
import { Menu, UserCircle2, Settings, HelpCircle, LogOut } from "lucide-react";
import TopNav from "../components/TopNav";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const GearLightbulbIcon = () => (
  <svg viewBox="0 0 120 120" width="130" height="130" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="bulbGlow" cx="50%" cy="50%" r="60%">
        <stop offset="0%" stopColor="#ffe066" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#a259ff" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="gearGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffe066" />
        <stop offset="100%" stopColor="#f5a623" />
      </linearGradient>
      <linearGradient id="gearGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#b97aff" />
        <stop offset="100%" stopColor="#7c3aed" />
      </linearGradient>
      <linearGradient id="bulbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffe066" />
        <stop offset="100%" stopColor="#f0c040" />
      </linearGradient>
    </defs>

    <circle cx="60" cy="55" r="50" fill="url(#bulbGlow)" />

    <g transform="translate(14, 30) scale(0.55)">
      <GearShape fill="url(#gearGrad2)" teeth={8} r={20} />
    </g>

    <g transform="translate(72, 10) scale(0.7)">
      <GearShape fill="url(#gearGrad2)" teeth={10} r={24} />
    </g>

    <g transform="translate(5, 45) scale(0.8)">
      <GearShape fill="url(#gearGrad1)" teeth={10} r={24} />
    </g>

    <g transform="translate(33, 18)">
      <ellipse cx="27" cy="30" rx="20" ry="22" fill="url(#bulbGrad)" opacity="0.95" />
      <ellipse cx="27" cy="30" rx="14" ry="15" fill="#fff9d6" opacity="0.4" />
      <path d="M21 42 Q27 36 33 42" stroke="#b97a00" strokeWidth="1.5" fill="none" />
      <rect x="21" y="50" width="12" height="5" rx="2" fill="#b97a00" />
      <rect x="22" y="55" width="10" height="3" rx="1" fill="#a06800" />
      <ellipse cx="20" cy="22" rx="5" ry="7" fill="white" opacity="0.25" transform="rotate(-20,20,22)" />
      <ellipse cx="27" cy="55" rx="10" ry="3" fill="#a259ff" opacity="0.35" />
    </g>
  </svg>
);

function GearShape({ fill, teeth, r }) {
  const cx = r + 8;
  const cy = r + 8;
  const innerR = r * 0.65;
  const toothH = r * 0.32;
  const toothW = (2 * Math.PI * r) / teeth / 2.5;
  const points = [];

  for (let i = 0; i < teeth; i++) {
    const angle1 = (i / teeth) * 2 * Math.PI - Math.PI / 2;
    const angle2 = ((i + 0.35) / teeth) * 2 * Math.PI - Math.PI / 2;
    const angle3 = ((i + 0.65) / teeth) * 2 * Math.PI - Math.PI / 2;
    const angle4 = ((i + 1) / teeth) * 2 * Math.PI - Math.PI / 2;
    points.push(`${cx + r * Math.cos(angle1)},${cy + r * Math.sin(angle1)}`);
    points.push(`${cx + (r + toothH) * Math.cos(angle2)},${cy + (r + toothH) * Math.sin(angle2)}`);
    points.push(`${cx + (r + toothH) * Math.cos(angle3)},${cy + (r + toothH) * Math.sin(angle3)}`);
    points.push(`${cx + r * Math.cos(angle4)},${cy + r * Math.sin(angle4)}`);
  }

  return (
    <g>
      <polygon points={points.join(" ")} fill={fill} />
      <circle cx={cx} cy={cy} r={innerR} fill={fill} />
      <circle cx={cx} cy={cy} r={innerR * 0.45} fill="rgba(0,0,0,0.3)" />
    </g>
  );
}

const PIN_DAYS = [13, 15];
const STREAK_DAYS = new Set([3, 4, 5, 6, 7, 8, 9, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27]);
const TODAY = 28;

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year, month) {
  return new Date(year, month, 1).getDay();
}

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function PinMarker() {
  return (
    <svg
      width="38"
      height="46"
      viewBox="0 0 38 46"
      style={{ position: "absolute", top: -6, left: "50%", transform: "translateX(-50%)", zIndex: 2, pointerEvents: "none" }}
    >
      <defs>
        <radialGradient id="pinGradPurple" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#e9d5ff" />
          <stop offset="100%" stopColor="#a259ff" />
        </radialGradient>
      </defs>
      <ellipse cx="19" cy="20" rx="16" ry="16" fill="url(#pinGradPurple)" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
      <path d="M12 32 Q19 46 26 32" fill="#a259ff" opacity="0.85" />
      <circle cx="19" cy="19" r="5" fill="rgba(255,255,255,0.35)" />
    </svg>
  );
}

function MonthlyStreakCalendar({ forcedHeight, outerRef }) {
  const [viewYear, setViewYear] = useState(2026);
  const [viewMonth, setViewMonth] = useState(4);

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDow = getFirstDayOfWeek(viewYear, viewMonth);

  const cells = [];
  for (let i = 0; i < firstDow; i += 1) cells.push(null);
  for (let d = 1; d <= daysInMonth; d += 1) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((year) => year - 1);
    } else {
      setViewMonth((month) => month - 1);
    }
  };

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((year) => year + 1);
    } else {
      setViewMonth((month) => month + 1);
    }
  };

  const DOW = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const CELL = 36; // wider cells for more breathing room
  const GAP = 6;
  const totalVerticalSpace = forcedHeight ? Math.max(0, forcedHeight - 42 - 28 - 32) : null;
  const rowHeight = totalVerticalSpace ? Math.max(18, Math.floor((totalVerticalSpace - 10) / weeks.length)) : CELL + 10;
  const rowInnerSize = Math.max(16, Math.min(CELL - 6, rowHeight - 4));
  const compactGap = totalVerticalSpace ? Math.max(2, Math.floor((rowHeight - rowInnerSize) / 2)) : 6;
  const headerPadding = totalVerticalSpace ? "3px 0" : "6px 0";
  const headerMarginBottom = totalVerticalSpace ? 4 : 8;

  return (
    <div data-calendar="monthly" ref={outerRef} style={{ background: "#232323", borderRadius: 18, padding: "14px 10px", width: 320, flexShrink: 0, height: forcedHeight ? forcedHeight : 'auto', overflow: 'hidden' }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <button onClick={prevMonth} style={{ background: "none", border: "none", color: "#ccc", fontSize: 18, cursor: "pointer", padding: "0 8px" }}>‹</button>
        <span style={{ color: "#fff", fontWeight: 800, fontSize: 16 }}>{MONTH_NAMES[viewMonth]} {viewYear}</span>
        <button onClick={nextMonth} style={{ background: "none", border: "none", color: "#ccc", fontSize: 18, cursor: "pointer", padding: "0 8px" }}>›</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: `repeat(7, ${CELL}px)`, gap: GAP, marginBottom: headerMarginBottom }}>
        {DOW.map((d) => (
          <div key={d} style={{ textAlign: "center", color: "#666", fontWeight: 800, fontSize: 13, padding: headerPadding, lineHeight: 1 }}>{d}</div>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: compactGap }}>
        {weeks.map((week, wi) => {
          const streakIndices = week.map((day, index) => (day && STREAK_DAYS.has(day) ? index : -1)).filter((index) => index >= 0);
          const hasStreak = streakIndices.length > 0;
          const streakStart = hasStreak ? Math.min(...streakIndices) : -1;
          const streakEnd = hasStreak ? Math.max(...streakIndices) : -1;

          return (
            <div key={wi} style={{ position: "relative", height: rowHeight }}>
              {hasStreak && (
                <div style={{
                  position: "absolute",
                  top: Math.max(2, Math.floor((rowHeight - 18) / 2)),
                  left: streakStart * (CELL + GAP),
                  width: (streakEnd - streakStart + 1) * (CELL + GAP) - GAP,
                  height: Math.max(10, rowInnerSize),
                  borderRadius: 999,
                  background: "linear-gradient(90deg, #f5c518 0%, #c84bff 100%)",
                  border: "2px solid #f5c518",
                  zIndex: 0,
                }} />
              )}

              <div style={{ display: "grid", gridTemplateColumns: `repeat(7, ${CELL}px)`, gap: GAP, position: "relative", zIndex: 1 }}>
                {week.map((day, di) => {
                  const isStreak = day && STREAK_DAYS.has(day);
                  const isToday = day === TODAY;
                  const isPin = day && PIN_DAYS.includes(day);
                  const isEmpty = !day;

                  return (
                    <div key={di} style={{ position: "relative", height: rowHeight, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {isPin && <PinMarker />}
                      <div style={{
                        width: CELL - 6,
                        height: rowInnerSize,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: isToday ? "#4a4a4a" : "transparent",
                        position: "relative",
                        zIndex: 1,
                      }}>
                        <span style={{
                          fontWeight: 800,
                          fontSize: totalVerticalSpace ? 13 : 14,
                          color: isEmpty ? "transparent" : isToday ? "#fff" : isStreak ? "#1a0020" : day > TODAY ? "#555" : "#888",
                          lineHeight: 1,
                        }}>
                          {day || ""}
                        </span>
                        {day && [4, 7, 18, 21, 24].includes(day) && (
                          <div style={{
                            position: "absolute",
                            bottom: 2,
                            right: 6,
                            width: 5,
                            height: 5,
                            borderRadius: "50%",
                            background: isStreak ? "#5b1fa0" : "#555",
                          }} />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}


function CourseCard({ title, tag, progress, description }) {
  return (
    <button
      type="button"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 10,
        background: "#0f1720",
        border: "1px solid #222",
        borderRadius: 12,
        padding: 14,
        width: "100%",
        textAlign: "left",
        cursor: "pointer",
      }}
    >
      <div>
        <div style={{ fontSize: 12, color: "#7dd3fc", fontWeight: 800, marginBottom: 6 }}>{tag}</div>
        <div style={{ fontSize: 16, fontWeight: 900, color: "#fff", marginBottom: 6 }}>{title}</div>
        <div style={{ fontSize: 13, color: "#9ca3af" }}>{description}</div>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 8 }}>
        <div style={{ fontSize: 13, color: "#cbd5e1", fontWeight: 700 }}>{progress}%</div>
        <div style={{ background: "#f59e0b", color: "#07101a", padding: "6px 10px", borderRadius: 999, fontSize: 12, fontWeight: 800 }}>Resume</div>
      </div>
    </button>
  );
}

function Courses() {
  const courseData = [
    { title: "Scientific Thinking", tag: "Fundamentals", progress: 42, description: "Connect ideas, solve puzzles and build intuition." },
    { title: "Algebra Essentials", tag: "Math", progress: 18, description: "Master algebraic manipulation and problem solving." },
    { title: "Intro to AI", tag: "AI", progress: 72, description: "Foundations of machine learning and neural nets." },
    { title: "Physics Basics", tag: "Science", progress: 5, description: "Core physics concepts explained visually." },
  ];

  return (
    <div style={{ padding: 22 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <div style={{ color: "#fff", fontSize: 20, fontWeight: 900 }}>Courses</div>
        <div style={{ color: "#9ca3af", fontSize: 13 }}>Explore curated learning paths</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
        {courseData.map((c) => (
          <CourseCard key={c.title} title={c.title} tag={c.tag} progress={c.progress} description={c.description} />
        ))}
      </div>
    </div>
  );
}

export default function Dashboard({ onLogout }) {
  const [activeNav, setActiveNav] = useState("Home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const leftCardRef = useRef(null);
  const level1Ref = useRef(null);
  const calendarOuterRef = useRef(null);
  const [calendarHeightPx, setCalendarHeightPx] = useState(null);

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    function measure() {
      if (!level1Ref.current || !calendarOuterRef.current) return;
      const lvl = level1Ref.current.getBoundingClientRect();
      const calTop = calendarOuterRef.current.getBoundingClientRect().top;
      const desired = Math.max(100, Math.round(lvl.top - calTop));
      setCalendarHeightPx(desired);
    }

    // measure after paint
    requestAnimationFrame(measure);
    window.addEventListener("resize", measure);
    const mo = new MutationObserver(measure);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      window.removeEventListener("resize", measure);
      mo.disconnect();
    };
  }, []);

  const menuItems = [
    { label: "Settings", icon: UserCircle2, route: "/accountsettings" },
    { label: "Help", icon: HelpCircle, route: "/help" },
    { label: "Log out", icon: LogOut, action: onLogout },
  ];

  return (
    <div style={{
      minHeight: "50vh",
      background: "#111",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      paddingTop: 24,
      fontFamily: "'Segoe UI', system-ui, sans-serif",
    }}>
      <div style={{
        width: 860,
        background: "#1a1a1a",
        borderRadius: 20,
        overflow: "hidden",
        boxShadow: "0 8px 60px rgba(0,0,0,0.7)",
      }}>
        <TopNav />

        <div style={{ display: "flex", gap: 18, padding: "22px 22px 28px", alignItems: 'flex-start' }}>
          <div ref={leftCardRef} style={{
            flex: 1,
            background: "linear-gradient(160deg, #1e1e2e 60%, #2a1a3e 100%)",
            borderRadius: 16,
            padding: "36px 28px 28px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: "0 0 60px rgba(162,89,255,0.08)",
            position: "relative",
            overflow: "hidden",
          }}>
            <div style={{
              position: "absolute",
              top: 20,
              left: "50%",
              transform: "translateX(-50%)",
              width: 200,
              height: 200,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(255,220,80,0.18) 0%, transparent 70%)",
              pointerEvents: "none",
            }} />
            <GearLightbulbIcon />
            <div style={{ height: 18 }} />
            <div style={{ textAlign: "center" }}>
              <div style={{ color: "#fff", fontWeight: 800, fontSize: 24, marginBottom: 6 }}>
                Scientific Thinking
              </div>
                <div ref={level1Ref} style={{ color: "#aaa", fontSize: 14, marginBottom: 10 }}>Level 1</div>
              <div style={{ color: "#bbb", fontSize: 14, lineHeight: 1.5, maxWidth: 280 }}>
                Connect ideas, solve puzzles, and build your knowledge.
              </div>
            </div>
            <div style={{ height: 28 }} />
            <button
              type="button"
              style={{
                background: "linear-gradient(90deg, #f5c518 0%, #c84bff 100%)",
                border: "none",
                borderRadius: 50,
                color: "#111",
                fontWeight: 800,
                fontSize: 16,
                padding: "14px 0",
                width: "100%",
                maxWidth: 320,
                cursor: "pointer",
                letterSpacing: 0.2,
                boxShadow: "0 4px 24px rgba(162,89,255,0.25)",
              }}
            >
              Continue Learning
            </button>

            <div style={{ display: "flex", gap: 8, marginTop: 22 }}>
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  style={{
                    width: i === 1 ? 10 : 8,
                    height: i === 1 ? 10 : 8,
                    borderRadius: "50%",
                    background: i === 1 ? "#fff" : "#555",
                    marginTop: i === 1 ? 0 : 1,
                  }}
                />
              ))}
            </div>
          </div>

          <MonthlyStreakCalendar forcedHeight={calendarHeightPx} outerRef={calendarOuterRef} />
        </div>
      </div>
    </div>
  );
}
