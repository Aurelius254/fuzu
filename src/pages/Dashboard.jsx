import { useState } from "react";

// ── Gear path helper ──────────────────────────────────────────────
function gearPoints(cx, cy, r, teeth = 16) {
  const toothH = r * 0.32;
  const pts = [];
  for (let i = 0; i < teeth; i++) {
    const a1 = (i / teeth) * 2 * Math.PI - Math.PI / 2;
    const a2 = ((i + 0.35) / teeth) * 2 * Math.PI - Math.PI / 2;
    const a3 = ((i + 0.65) / teeth) * 2 * Math.PI - Math.PI / 2;
    const a4 = ((i + 1) / teeth) * 2 * Math.PI - Math.PI / 2;
    pts.push(`${cx + r * Math.cos(a1)},${cy + r * Math.sin(a1)}`);
    pts.push(`${cx + (r + toothH) * Math.cos(a2)},${cy + (r + toothH) * Math.sin(a2)}`);
    pts.push(`${cx + (r + toothH) * Math.cos(a3)},${cy + (r + toothH) * Math.sin(a3)}`);
    pts.push(`${cx + r * Math.cos(a4)},${cy + r * Math.sin(a4)}`);
  }
  return pts.join(" ");
}

function Gear({ cx, cy, r, fill, teeth = 16, opacity = 1 }) {
  const inner = r * 0.55;
  return (
    <g opacity={opacity}>
      <polygon points={gearPoints(cx, cy, r, teeth)} fill={fill} />
      <circle cx={cx} cy={cy} r={inner} fill={fill} />
      <circle cx={cx} cy={cy} r={inner * 0.38} fill="rgba(0,0,0,0.35)" />
    </g>
  );
}

// ── Dashboard icon — gear + lightbulb ────────────────────────────
function DashboardIcon() {
  return (
    <svg viewBox="0 0 120 120" width="130" height="130">
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

      <g transform="translate(72, 8) scale(0.7)">
        <Gear cx={24} cy={24} r={20} fill="url(#gearGrad2)" teeth={10} />
      </g>

      <g transform="translate(4, 38) scale(0.6)">
        <Gear cx={24} cy={24} r={22} fill="url(#gearGrad2)" teeth={9} />
      </g>

      <g transform="translate(2, 52) scale(0.75)">
        <Gear cx={26} cy={26} r={24} fill="url(#gearGrad1)" teeth={12} />
      </g>

      <g transform="translate(34, 14)">
        <ellipse cx="26" cy="28" rx="19" ry="21" fill="url(#bulbGrad)" opacity="0.97" />
        <ellipse cx="26" cy="28" rx="13" ry="14" fill="#fff9d6" opacity="0.35" />
        <path d="M20 40 Q26 35 32 40" stroke="#b97a00" strokeWidth="1.5" fill="none" />
        <rect x="20" y="48" width="12" height="5" rx="2" fill="#b97a00" />
        <rect x="21" y="53" width="10" height="3" rx="1.5" fill="#a06800" />
        <ellipse cx="19" cy="20" rx="5" ry="7" fill="white" opacity="0.22" transform="rotate(-20,19,20)" />
        <ellipse cx="26" cy="54" rx="10" ry="3" fill="#a259ff" opacity="0.3" />
      </g>
    </svg>
  );
}

// ── Calendar ──────────────────────────────────────────────────────
const PIN_DAYS = [13, 15];
const STREAK_DAYS = new Set([3, 4, 5, 6, 7, 8, 9, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27]);
const TODAY = 28;
const CELL = 36, GAP = 5;
const DOW = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function PinMarker() {
  return (
    <svg width="30" height="36" viewBox="0 0 30 36"
      style={{ position: "absolute", top: -4, left: "50%", transform: "translateX(-50%)", zIndex: 2, pointerEvents: "none" }}>
      <defs>
        <radialGradient id="pg" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#e9d5ff" />
          <stop offset="100%" stopColor="#a259ff" />
        </radialGradient>
      </defs>
      <ellipse cx="15" cy="15" rx="13" ry="13" fill="url(#pg)" />
      <path d="M9 25 Q15 36 21 25" fill="#a259ff" opacity="0.85" />
      <circle cx="15" cy="14" r="4" fill="rgba(255,255,255,0.35)" />
    </svg>
  );
}

function Calendar() {
  const year = 2026, month = 4;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDow = new Date(year, month, 1).getDay();
  const cells = [];
  for (let i = 0; i < firstDow; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

  return (
    <div style={{
      background: "#1e1e26",
      borderRadius: 16,
      padding: "16px 14px",
      width: 308,
      flexShrink: 0,
      alignSelf: "flex-start",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <button style={{ background: "none", border: "none", color: "#aaa", fontSize: 18, cursor: "pointer", padding: "0 6px" }}>‹</button>
        <span style={{ color: "#fff", fontWeight: 800, fontSize: 15 }}>May 2026</span>
        <button style={{ background: "none", border: "none", color: "#aaa", fontSize: 18, cursor: "pointer", padding: "0 6px" }}>›</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(7,${CELL}px)`, gap: GAP, marginBottom: 6 }}>
        {DOW.map(d => (
          <div key={d} style={{ textAlign: "center", color: "#666", fontWeight: 700, fontSize: 12 }}>{d}</div>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {weeks.map((week, wi) => {
          const streakIdx = week.map((d, i) => d && STREAK_DAYS.has(d) ? i : -1).filter(i => i >= 0);
          const hasStreak = streakIdx.length > 0;
          const sStart = hasStreak ? Math.min(...streakIdx) : -1;
          const sEnd = hasStreak ? Math.max(...streakIdx) : -1;
          return (
            <div key={wi} style={{ position: "relative", height: 40 }}>
              {hasStreak && (
                <div style={{
                  position: "absolute",
                  top: 9,
                  left: sStart * (CELL + GAP),
                  width: (sEnd - sStart + 1) * (CELL + GAP) - GAP,
                  height: 22,
                  borderRadius: 999,
                  background: "linear-gradient(90deg,#f5c518 0%,#c84bff 100%)",
                  border: "2px solid #f5c518",
                  zIndex: 0,
                }} />
              )}
              <div style={{ display: "grid", gridTemplateColumns: `repeat(7,${CELL}px)`, gap: GAP, position: "relative", zIndex: 1, height: 40 }}>
                {week.map((day, di) => {
                  const isStreak = day && STREAK_DAYS.has(day);
                  const isToday = day === TODAY;
                  const isPin = day && PIN_DAYS.includes(day);
                  let color = day ? (isToday ? "#fff" : isStreak ? "#1a0020" : day > TODAY ? "#555" : "#888") : "transparent";
                  return (
                    <div key={di} style={{ position: "relative", height: 40, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {isPin && <PinMarker />}
                      <div style={{
                        width: 30, height: 30, borderRadius: "50%",
                        background: isToday ? "#4a4a4a" : "transparent",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        zIndex: 1, position: "relative",
                      }}>
                        <span style={{ fontWeight: 800, fontSize: 13, color }}>{day || ""}</span>
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

// ── Lesson list screen ────────────────────────────────────────────
function LessonList({ onStart }) {
  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ color: "#fff", fontWeight: 900, fontSize: 22, marginBottom: 4, textAlign: "center" }}>Scientific Thinking</div>
      <div style={{ color: "#f5c518", fontWeight: 800, fontSize: 12, letterSpacing: 1, marginBottom: 16 }}>LEVEL 1</div>
      <svg viewBox="0 0 90 90" width="90" height="90" style={{ marginBottom: 16 }}>
        <defs>
          <linearGradient id="yg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffe066" /><stop offset="100%" stopColor="#f5a623" />
          </linearGradient>
          <linearGradient id="bg2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" /><stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
        <Gear cx="42" cy="52" r="26" fill="url(#yg)" teeth={16} />
        <Gear cx="68" cy="28" r="14" fill="url(#bg2)" teeth={10} />
        <path d="M60 18 A 18 18 0 0 1 78 28" fill="none" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" />
        <polygon points="76,20 80,28 72,27" fill="#60a5fa" />
        <ellipse cx="42" cy="48" rx="11" ry="13" fill="#fff9d0" opacity="0.9" />
        <path d="M37 57 Q42 53 47 57" stroke="#c8900a" strokeWidth="1.2" fill="none" />
        <rect x="38" y="61" width="8" height="3" rx="1.5" fill="#c8900a" />
      </svg>
      <div style={{ width: "100%", marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 4px", borderBottom: "1px solid #2a2a2a" }}>
          <div style={{
            width: 44, height: 44, borderRadius: "50%",
            background: "linear-gradient(135deg,#22c55e,#15803d)",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            border: "2px solid #f5c518",
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24">
              <Gear cx="12" cy="12" r="8" fill="#888" teeth={10} />
            </svg>
          </div>
          <span style={{ color: "#fff", fontWeight: 700, fontSize: 15, flex: 1 }}>Warm Up</span>
          <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#444" }} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 4px" }}>
          <div style={{
            width: 44, height: 44, borderRadius: "50%",
            background: "#2a2a2a",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24">
              <Gear cx="12" cy="12" r="8" fill="#555" teeth={10} />
            </svg>
          </div>
          <span style={{ color: "#666", fontWeight: 500, fontSize: 15, flex: 1 }}>Gears Changing Speeds</span>
          <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#444" }} />
        </div>
      </div>
      <button onClick={onStart} style={{
        width: "100%",
        padding: "14px 0",
        borderRadius: 50,
        background: "#f5c518",
        border: "none",
        color: "#111",
        fontWeight: 800,
        fontSize: 16,
        cursor: "pointer",
      }}>Start</button>
      <div style={{ display: "flex", gap: 8, marginTop: 18 }}>
        {[0, 1, 2, 3, 4].map(i => (
          <div key={i} style={{
            width: i === 1 ? 10 : 8, height: i === 1 ? 10 : 8,
            borderRadius: "50%",
            background: i === 1 ? "#f5c518" : "#555",
            marginTop: i === 1 ? 0 : 1,
          }} />
        ))}
      </div>
    </div>
  );
}

// ── Quiz steps ────────────────────────────────────────────────────
function QuizModule({ onCancel }) {
  const [step, setStep] = useState(1);
  const [selMC, setSelMC] = useState(null);
  const [selGears, setSelGears] = useState([]);
  const [checked, setChecked] = useState(false);
  const [showWhy, setShowWhy] = useState(false);

  const toggleGear = (id) => {
    if (checked) return;
    setSelGears(g => g.includes(id) ? g.filter(x => x !== id) : [...g, id]);
  };

  const canCheck = () => {
    if (step === 1) return selMC !== null;
    if (step === 4) return selGears.length > 0;
    return true;
  };

  const handleCheck = () => {
    if (!canCheck()) return;
    if (step === 1 || step === 4) { setChecked(true); return; }
    advance();
  };

  const advance = () => {
    setChecked(false); setShowWhy(false); setSelMC(null); setSelGears([]);
    if (step >= 5) { onCancel(); return; }
    setStep(s => s + 1);
  };

  const pct = (step / 5) * 100;

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", minHeight: 420, position: "relative" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
        <button onClick={onCancel} style={{ background: "none", border: "none", color: "#888", fontSize: 20, cursor: "pointer", lineHeight: 1 }}>×</button>
        <div style={{ flex: 1, height: 6, background: "#2a2a2a", borderRadius: 3, overflow: "hidden" }}>
          <div style={{ width: `${pct}%`, height: "100%", background: "#22c55e", transition: "width .3s" }} />
        </div>
        <span style={{ color: "#ffd700", fontSize: 15 }}>⚡</span>
      </div>

      {step === 1 && (
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <div style={{ color: "#fff", fontWeight: 700, fontSize: 15, marginBottom: 10, lineHeight: 1.4 }}>
            When the yellow gear is turned, which direction does the blue gear rotate?
          </div>
          <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <svg width="240" height="170" viewBox="0 0 240 170">
              <Gear cx={36} cy={60} r={22} fill="#f5c518" teeth={14} />
              <Gear cx={80} cy={46} r={22} fill="#888" teeth={14} />
              <Gear cx={124} cy={58} r={22} fill="#888" teeth={14} />
              <Gear cx={160} cy={82} r={22} fill="#888" teeth={14} />
              <Gear cx={160} cy={128} r={22} fill="#888" teeth={14} />
              <Gear cx={112} cy={146} r={22} fill="#3b82f6" teeth={14} />
              <Gear cx={72} cy={140} r={22} fill="#888" teeth={14} />
              <path d="M20 38 A22 22 0 0 1 52 38" fill="none" stroke="#fff" strokeWidth="2" />
              <polygon points="18,38 22,30 26,38" fill="#fff" transform="rotate(-30 20 38)" />
            </svg>
          </div>
          <div style={{ marginBottom: checked ? 88 : 12 }}>
            {["In the same direction.", "In the opposite direction."].map((opt, i) => {
              let bg = "transparent", border = "1px solid #333", icon = null;
              if (checked && i === 0) { bg = "rgba(34,197,94,0.12)"; border = "2px solid #22c55e"; icon = <span style={{ color: "#22c55e", fontWeight: 900 }}>✓</span>; }
              else if (selMC === i) { bg = "#0c1524"; border = "2px solid #1d4ed8"; icon = <span style={{ color: "#3b82f6" }}>●</span>; }
              return (
                <button key={i} disabled={checked} onClick={() => setSelMC(i)} style={{
                  width: "100%", textAlign: "left", padding: "13px 16px", borderRadius: 12,
                  background: bg, border, color: "#fff", fontSize: 14,
                  cursor: checked ? "default" : "pointer", display: "flex", justifyContent: "space-between",
                  alignItems: "center", marginBottom: 8,
                }}>
                  <span>{opt}</span>{icon}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {step === 2 && (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: 15, marginBottom: 6 }}>
              Adjacent gears in a chain rotate in opposite directions.
            </div>
            <div style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
              <svg width="220" height="110" viewBox="0 0 220 110">
                <Gear cx={55} cy={55} r={34} fill="#b5d914" teeth={18} />
                <Gear cx={115} cy={55} r={34} fill="#3bbfb0" teeth={18} />
                <path d="M38 22 A34 34 0 0 0 72 22" fill="none" stroke="white" strokeWidth="2" />
                <polygon points="36,22 40,14 44,22" fill="white" transform="rotate(-30 38 22)" />
                <path d="M98 90 A34 34 0 0 0 132 90" fill="none" stroke="white" strokeWidth="2" />
                <polygon points="134,90 130,98 126,90" fill="white" transform="rotate(30 132 90)" />
              </svg>
            </div>
          </div>
          <button onClick={advance} style={{ width: "100%", padding: "13px 0", borderRadius: 50, background: "#fff", border: "none", color: "#111", fontWeight: 800, fontSize: 15, cursor: "pointer" }}>Continue</button>
        </div>
      )}

      {step === 3 && (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: 15, marginBottom: 6 }}>
              In any system of gears, each one spins opposite its neighbors.
            </div>
            <div style={{ color: "#888", fontSize: 13, marginBottom: 12 }}>Let's see how this extends to systems with more gears.</div>
            <div style={{ display: "flex", justifyContent: "center", margin: "16px 0" }}>
              <svg width="240" height="110" viewBox="0 0 240 110">
                <Gear cx={44} cy={55} r={32} fill="#b5d914" teeth={18} />
                <Gear cx={108} cy={55} r={32} fill="#3bbfb0" teeth={18} />
                <Gear cx={172} cy={55} r={32} fill="#b5d914" teeth={18} />
                <path d="M28 20 A32 32 0 0 0 60 20" fill="none" stroke="white" strokeWidth="2" />
                <polygon points="26,20 30,12 34,20" fill="white" transform="rotate(-30 28 20)" />
                <path d="M92 92 A32 32 0 0 0 124 92" fill="none" stroke="white" strokeWidth="2" />
                <polygon points="126,92 122,100 118,92" fill="white" transform="rotate(25 124 92)" />
                <path d="M156 20 A32 32 0 0 0 188 20" fill="none" stroke="white" strokeWidth="2" />
                <polygon points="154,20 158,12 162,20" fill="white" transform="rotate(-30 156 20)" />
              </svg>
            </div>
          </div>
          <button onClick={advance} style={{ width: "100%", padding: "13px 0", borderRadius: 50, background: "#fff", border: "none", color: "#111", fontWeight: 800, fontSize: 15, cursor: "pointer" }}>Continue</button>
        </div>
      )}

      {step === 4 && (
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <div style={{ color: "#fff", fontWeight: 700, fontSize: 15, marginBottom: 4 }}>
            Which gears turn in the same direction as the yellow gear?
          </div>
          <div style={{ color: "#888", fontSize: 13, marginBottom: 12 }}>Tap a gear to select it.</div>
          <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", gap: 4, marginBottom: checked ? 88 : 10, flexWrap: "nowrap" }}>
            <svg width="52" height="52" viewBox="0 0 52 52" style={{ flexShrink: 0 }}>
              <Gear cx={26} cy={26} r={22} fill="#f5c518" teeth={14} />
            </svg>
            {[1, 2, 3, 4].map(id => {
              const isSel = selGears.includes(id);
              const isCorrect = id === 2 || id === 4;
              let fill = "#888";
              if (checked && isCorrect) fill = "#22c55e";
              else if (isSel) fill = "#3b82f6";
              return (
                <button key={id} onClick={() => toggleGear(id)} disabled={checked} style={{
                  background: "transparent", border: isSel && !checked ? "2px solid #3b82f6" : checked && isCorrect ? "2px solid #22c55e" : "none",
                  borderRadius: "50%", padding: 2, cursor: checked ? "default" : "pointer", flexShrink: 0,
                }}>
                  <svg width="52" height="52" viewBox="0 0 52 52">
                    <Gear cx={26} cy={26} r={22} fill={fill} teeth={14} />
                  </svg>
                </button>
              );
            })}
          </div>
          {!checked && (
            <button onClick={() => setSelGears([])} style={{ background: "none", border: "none", color: "#666", cursor: "pointer", fontSize: 13, marginBottom: 10, alignSelf: "center" }}>
              🔄 Start over
            </button>
          )}
        </div>
      )}

      {step === 5 && (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: 15, marginBottom: 6 }}>
              If you know how one gear in a system rotates, you can predict how any other gear will rotate.
            </div>
            <div style={{ color: "#888", fontSize: 13, marginBottom: 10 }}>
              Sometimes simple rules can be used to predict the behavior of more complex systems.
            </div>
            <div style={{ display: "flex", justifyContent: "center", margin: "12px 0" }}>
              <svg width="240" height="160" viewBox="20 10 200 150">
                {[
                  { cx: 110, cy: 80, f: "#b5d914" }, { cx: 110, cy: 44, f: "#3bbfb0" }, { cx: 110, cy: 116, f: "#3bbfb0" },
                  { cx: 74, cy: 80, f: "#3bbfb0" }, { cx: 146, cy: 80, f: "#3bbfb0" },
                  { cx: 146, cy: 44, f: "#b5d914" }, { cx: 74, cy: 116, f: "#b5d914" },
                  { cx: 146, cy: 116, f: "#b5d914" }, { cx: 74, cy: 44, f: "#b5d914" },
                ].map((n, i) => <Gear key={i} cx={n.cx} cy={n.cy} r={16} fill={n.f} teeth={12} />)}
              </svg>
            </div>
          </div>
          <button onClick={advance} style={{ width: "100%", padding: "13px 0", borderRadius: 50, background: "#fff", border: "none", color: "#111", fontWeight: 800, fontSize: 15, cursor: "pointer" }}>Continue</button>
        </div>
      )}

      {(step === 1 || step === 4) && !checked && (
        <button onClick={handleCheck} disabled={!canCheck()} style={{
          width: "100%", padding: "13px 0", borderRadius: 50,
          background: canCheck() ? "#fff" : "#2a2a2a",
          color: canCheck() ? "#111" : "#555",
          fontWeight: 800, fontSize: 15, border: "none",
          cursor: canCheck() ? "pointer" : "not-allowed", marginTop: "auto",
        }}>Check</button>
      )}

      {checked && (
        <div style={{
          position: "absolute", bottom: -20, left: -20, right: -20,
          background: "#064e3b", borderTopLeftRadius: 16, borderTopRightRadius: 16,
          padding: "14px 18px", zIndex: 10,
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 20 }}>🎉</span>
              <div>
                <div style={{ color: "#fff", fontWeight: 900, fontSize: 15 }}>Correct!</div>
                <div style={{ color: "#34d399", fontWeight: 700, fontSize: 12 }}>+15 XP Earned</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => setShowWhy(!showWhy)} style={{ background: "rgba(255,255,255,0.08)", border: "none", borderRadius: 20, color: "#fff", padding: "7px 14px", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>Why?</button>
              <button onClick={advance} style={{ background: "#10b981", border: "none", borderRadius: 20, color: "#fff", padding: "7px 20px", fontWeight: 800, fontSize: 13, cursor: "pointer" }}>Continue</button>
            </div>
          </div>
          {showWhy && (
            <div style={{ background: "rgba(0,0,0,0.2)", borderRadius: 8, padding: 10, color: "#d1fae5", fontSize: 12, lineHeight: 1.4, marginTop: 10 }}>
              Interlocking gears rotate in opposing sequences — every other gear in a chain turns the same direction.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── TOP NAV ───────────────────────────────────────────────────────
function TopNav() {
  return (
    <div style={{
      background: "#111", borderBottom: "1px solid #222",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 28px", height:56,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
        <span style={{ color: "#fff", fontWeight: 900, fontSize: 20, letterSpacing: -0.5 }}>Fuzu</span>
        <nav style={{ display: "flex", gap: 22 }}>
          <button style={{ background: "none", border: "none", color: "#ccc", fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 12 }}>△</span> Home
          </button>
          <button style={{ background: "none", border: "none", color: "#ccc", fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 11 }}>□</span> Courses
          </button>
        </nav>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button style={{ background: "#a259ff", border: "none", borderRadius: 20, color: "#fff", padding: "7px 18px", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>Start trial</button>
        <div style={{ display: "flex", alignItems: "center", gap: 5, background: "#222", borderRadius: 20, padding: "5px 12px", color: "#ccc", fontSize: 13 }}>
          <span>0</span><span>🔑</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5, background: "#222", borderRadius: 20, padding: "5px 12px", color: "#ccc", fontSize: 13 }}>
          <span>1</span><span style={{ color: "#ffd700" }}>⚡</span>
        </div>
        <button style={{ background: "#2a2a2a", border: "none", borderRadius: "50%", width: 36, height: 36, color: "#fff", fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>☰</button>
      </div>
    </div>
  );
}

// ── MAIN DASHBOARD ────────────────────────────────────────────────
export default function Dashboard() {
  const [view, setView] = useState("dashboard");

  return (
    <div style={{ minHeight: "100vh", background: "#111", fontFamily: "'Segoe UI',system-ui,sans-serif" }}>
      <TopNav />

      <div style={{ padding: "28px 32px", display: "flex", gap: 20, alignItems: "flex-start" }}>
        {/* LEFT CARD */}
        <div style={{
          flex: 1,
          background: "linear-gradient(160deg,#1e1e2e 60%,#2a1a3e 100%)",
          borderRadius: 18,
          padding: "24px 20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow: "0 0 60px rgba(162,89,255,0.08)",
          position: "relative",
          overflow: "hidden",
          minHeight: view === "quiz" ? 480 : "auto",
        }}>
          <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle,rgba(255,220,80,0.15) 0%,transparent 70%)", pointerEvents: "none" }} />

          {view === "dashboard" && (
            <>
              <DashboardIcon />
              <div style={{ height: 16 }} />
              <div style={{ color: "#fff", fontWeight: 800, fontSize: 22, marginBottom: 4, textAlign: "center" }}>Scientific Thinking</div>
              <div style={{ color: "#aaa", fontSize: 13, marginBottom: 8 }}>Level 1</div>
              <div style={{ color: "#bbb", fontSize: 13, lineHeight: 1.5, maxWidth: 280, textAlign: "center", marginBottom: 24 }}>
                Connect ideas, solve puzzles, and build your knowledge.
              </div>
              <button onClick={() => setView("lessons")} style={{
                background: "linear-gradient(90deg,#f5c518 0%,#c84bff 100%)",
                border: "none", borderRadius: 50, color: "#111",
                fontWeight: 800, fontSize: 15, padding: "13px 0",
                width: "100%", maxWidth: 300, cursor: "pointer",
                boxShadow: "0 4px 24px rgba(162,89,255,0.25)",
              }}>
                Continue Learning
              </button>
              <div style={{ display: "flex", gap: 8, marginTop: 18 }}>
                {[0, 1, 2, 3, 4, 5].map(i => (
                  <div key={i} style={{ width: i === 1 ? 10 : 8, height: i === 1 ? 10 : 8, borderRadius: "50%", background: i === 1 ? "#fff" : "#555", marginTop: i === 1 ? 0 : 1 }} />
                ))}
              </div>
            </>
          )}

          {view === "lessons" && (
            <LessonList onStart={() => setView("quiz")} />
          )}

          {view === "quiz" && (
            <QuizModule onCancel={() => setView("dashboard")} />
          )}
        </div>

        {/* CALENDAR */}
        <Calendar />
      </div>
    </div>
  );
}