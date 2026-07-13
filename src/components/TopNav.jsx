import { useEffect, useRef, useState } from "react";
import MenuButton from "./MenuButton";
import { Browser } from '@capacitor/browser';


const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getStreakData() {
  try {
    const raw = localStorage.getItem("fuzu_streak");
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
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

function computeStreak(activeDays, last5) {
  let count = 0;
  for (let i = 0; i < last5.length; i++) {
    const day = last5[last5.length - 1 - i];
    if (activeDays.includes(day)) count++;
    else break;
  }
  return count;
}

function StreakPanel({ onClose }) {
  const [activeDays, setActiveDays] = useState([]);
  const last5 = getLast5Days();
  const today = new Date().toISOString().slice(0, 10);
  const panelRef = useRef(null);

  useEffect(() => {
    setActiveDays(getStreakData());
  }, []);

  useEffect(() => {
    function handleClick(e) {
      if (panelRef.current && !panelRef.current.contains(e.target)) onClose();
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClose]);

  const streakCount = computeStreak(activeDays, last5);

  return (
    <div ref={panelRef} style={{
      ...(window.innerWidth < 640 ? {
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        top: "auto",
        width: "100%",
        borderRadius: "16px 16px 0 0",
        borderBottom: "none",
      } : {
        position: "absolute",
        top: "calc(100% + 8px)",
        right: 0,
        width: 260,
        borderRadius: 16,
      }),
      background: "#1a1a1a",
      border: "1px solid #2a2a2a",
      padding: "18px 20px",
      zIndex: 100,
      boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div style={{ color: "#fff", fontWeight: 800, fontSize: 14 }}>Your streak</div>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ color: "#f4e05d", fontSize: 16 }}>⚡</span>
          <span style={{ color: "#fff", fontWeight: 900, fontSize: 16 }}>{streakCount}</span>
          <span style={{ color: "#666", fontSize: 11 }}>days</span>
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
              <div style={{ color: "#555", fontSize: 9, fontWeight: 700 }}>{DAY_LABELS[dow].slice(0, 1)}</div>
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

      <div style={{ marginTop: 12, color: "#555", fontSize: 11, textAlign: "center" }}>
        {streakCount === 0 ? "Log in daily to build your streak!" : streakCount === 5 ? "🔥 5-day streak! Keep it up." : `${5 - streakCount} more day${5 - streakCount !== 1 ? "s" : ""} for a perfect streak`}
      </div>
    </div>
  );
}

export default function TopNav() {
  const pathname = typeof window !== "undefined" ? window.location.pathname : "/";
  const isCourses = pathname.startsWith("/courses");
  const [streakCount, setStreakCount] = useState(0);
  const [showStreakPanel, setShowStreakPanel] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const days = getStreakData();
    const last5 = getLast5Days();
    setStreakCount(computeStreak(days, last5));
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [isApp, setIsApp] = useState(false);

  useEffect(() => {
    setIsApp(!!window.Capacitor);
  }, []); 


  return (
    <div style={{ 
      background: "#111111", 
      borderBottom: "1px solid #2a2a2a",
      paddingTop: isApp ? "35px" : "0px"
    }}>      <div style={{ maxWidth: 768, margin: "0 auto", padding: "14px 20px 9px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

        {/* Left — logo + nav links */}
        <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 10 : 18, color: "#b6b6b6", fontSize: 13 }}>
          <button
            type="button"
            data-route="/dashboard"
            style={{ background: "none", border: "none", color: pathname === "/dashboard" ? "#fff" : "#b6b6b6", padding: 0, display: "flex", alignItems: "center", gap: 4, cursor: "pointer", fontSize: isMobile ? 12 : 13 }}
          >
            <span>⌂</span>
            <span>Home</span>
          </button>

          <button
            type="button"
            data-route="/courses"
            style={{ background: "none", border: "none", color: isCourses ? "#fff" : "#b6b6b6", padding: 0, display: "flex", alignItems: "center", gap: 4, position: "relative", cursor: "pointer", fontSize: isMobile ? 12 : 13 }}
          >
            <span style={{ fontSize: 11 }}>▢</span>
            <span>Courses</span>
            {isCourses && (
              <div style={{ position: "absolute", left: 0, right: 0, bottom: -15, height: 2, background: "#fff" }} />
            )}
          </button>

          {/* NEW: Lego link - opens in new tab */}
          <button
            type="button"
            data-route="/lego-simulator"
            style={{ 
              background: "none", 
              border: "none", 
              color: "#b6b6b6", 
              padding: 0, 
              display: "flex", 
              alignItems: "center", 
              gap: 4, 
              cursor: "pointer", 
              fontSize: isMobile ? 12 : 13,
            }}
          >
            <span style={{ fontSize: 13 }}>🧱</span>
            <span>STEM</span>
          </button>
        </div>

        {/* Right — actions */}
        <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 6 : 10, color: "#d8d8d8" }}>

          {/* Hide "Start trial" on mobile */}
          {!isMobile && (
            <button
              type="button"
              style={{ background: "linear-gradient(90deg, rgba(138,115,255,0.25), rgba(255,159,90,0.25))", border: "1px solid #4d4d4d", color: "#fff", borderRadius: 999, padding: "7px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}
            >
              Start trial
            </button>
          )}

          {/* Hide keys on mobile */}
          {!isMobile && (
            <div style={{ display: "flex", alignItems: "center", gap: 6, background: "#191919", border: "1px solid #333", borderRadius: 999, padding: "5px 10px", fontSize: 12 }}>
              <span>0</span>
              <span style={{ opacity: 0.7 }}>🔑</span>
            </div>
          )}

          {/* Streak — always visible, clickable */}
          <div style={{ position: "relative" }}>
            <button
              type="button"
              onClick={() => setShowStreakPanel((v) => !v)}
              style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 700, background: "none", border: "none", cursor: "pointer", color: "#d8d8d8", padding: 0 }}
            >
              <span>{streakCount}</span>
              <span style={{ color: "#f4e05d" }}>⚡</span>
            </button>
            {showStreakPanel && <StreakPanel onClose={() => setShowStreakPanel(false)} />}
          </div>

          <MenuButton />
        </div>
      </div>
    </div>
  );
}