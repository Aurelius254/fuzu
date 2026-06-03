import { useState } from "react";
import TopNav from "../components/TopNav";

// ── Lesson data ───────────────────────────────────────────────────────────────
const LESSONS = [
  {
    id: 1,
    title: "What does half mean?",
    explanation: "Finding half of something means splitting it into two equal parts. Each part is exactly the same size. Half of 8 is 4 because 4 + 4 = 8.",
    visual: "split",
    question: "What is half of 8?",
    options: [2, 3, 4, 5],
    answer: 4,
    hint: "Think: what number plus itself equals 8?",
  },
  {
    id: 2,
    title: "Half on a number line",
    explanation: "On a number line, half sits exactly in the middle between 0 and the number. Half of 10 is 5 — it's right in the center between 0 and 10.",
    visual: "numberline",
    visualNumber: 10,
    question: "What is half of 10?",
    options: [3, 4, 5, 6],
    answer: 5,
    hint: "Find the middle point between 0 and 10.",
  },
  {
    id: 3,
    title: "Half of even numbers",
    explanation: "Every even number has a clean half — no fractions needed. Half of 12 is 6. Half of 20 is 10. The pattern: divide by 2.",
    visual: "dots",
    visualNumber: 12,
    question: "What is half of 12?",
    options: [5, 6, 7, 8],
    answer: 6,
    hint: "12 dots split into 2 equal groups — how many in each?",
  },
  {
    id: 4,
    title: "Half in your head",
    explanation: "Mental trick: to halve a large even number, halve the tens digit and halve the units digit separately. Half of 46 → half of 40 is 20, half of 6 is 3, so half of 46 is 23.",
    visual: "split",
    visualNumber: 46,
    question: "What is half of 46?",
    options: [21, 22, 23, 24],
    answer: 23,
    hint: "Half of 40 + half of 6 = ?",
  },
  {
    id: 5,
    title: "Put it all together",
    explanation: "You've learned that half means equal splitting, that it lives in the middle of a number line, and that you can split numbers mentally. Now try this final one.",
    visual: "dots",
    visualNumber: 18,
    question: "What is half of 18?",
    options: [7, 8, 9, 10],
    answer: 9,
    hint: "Half of 10 is 5, half of 8 is 4 — what's 5 + 4?",
  },
];

// ── Visuals ───────────────────────────────────────────────────────────────────
function SplitVisual({ number = 8, revealed }) {
  const half = number / 2;
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, padding: "20px 0" }}>
      <div style={{
        background: "linear-gradient(135deg, #1e3a5f, #2563eb)",
        border: "1px solid #3b82f6",
        borderRadius: 14, padding: "18px 28px",
        textAlign: "center", minWidth: 80,
      }}>
        <div style={{ color: "#93c5fd", fontSize: 11, fontWeight: 700, marginBottom: 4 }}>Group A</div>
        <div style={{ color: "#fff", fontWeight: 900, fontSize: 36 }}>{revealed ? half : "?"}</div>
      </div>

      <div style={{ textAlign: "center" }}>
        <div style={{ color: "#666", fontSize: 28, fontWeight: 300 }}>+</div>
        <div style={{ color: "#7dd3fc", fontSize: 12, fontWeight: 700, marginTop: 4 }}>{number} total</div>
      </div>

      <div style={{
        background: "linear-gradient(135deg, #1e3a5f, #2563eb)",
        border: "1px solid #3b82f6",
        borderRadius: 14, padding: "18px 28px",
        textAlign: "center", minWidth: 80,
      }}>
        <div style={{ color: "#93c5fd", fontSize: 11, fontWeight: 700, marginBottom: 4 }}>Group B</div>
        <div style={{ color: "#fff", fontWeight: 900, fontSize: 36 }}>{revealed ? half : "?"}</div>
      </div>
    </div>
  );
}

function NumberLineVisual({ number = 10, revealed }) {
  const half = number / 2;
  const markers = [0, half, number];
  return (
    <div style={{ padding: "24px 16px" }}>
      <div style={{ position: "relative", height: 60 }}>
        {/* line */}
        <div style={{
          position: "absolute", top: 28, left: 20, right: 20,
          height: 3, background: "#2a2a2a", borderRadius: 2,
        }} />
        {markers.map((val, i) => {
          const pct = (val / number) * 100;
          const isHalf = i === 1;
          return (
            <div key={val} style={{
              position: "absolute",
              left: `calc(${pct}% - ${i === 0 ? 10 : i === 2 ? 30 : 20}px)`,
              top: 0,
              display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
            }}>
              <div style={{
                width: isHalf ? 14 : 10,
                height: isHalf ? 14 : 10,
                borderRadius: "50%",
                background: isHalf
                  ? "linear-gradient(135deg, #f5c518, #c84bff)"
                  : "#444",
                border: isHalf ? "2px solid #f5c518" : "none",
                marginTop: isHalf ? 21 : 23,
                boxShadow: isHalf ? "0 0 12px rgba(245,197,24,0.5)" : "none",
              }} />
              <div style={{
                color: isHalf ? "#f5c518" : "#666",
                fontSize: isHalf ? 15 : 12,
                fontWeight: isHalf ? 900 : 600,
                marginTop: 2,
              }}>
                {isHalf ? (revealed ? half : "?") : val}
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ textAlign: "center", color: "#555", fontSize: 12, marginTop: 8 }}>
        Half is exactly in the middle
      </div>
    </div>
  );
}

function DotsVisual({ number = 12, revealed }) {
  const half = number / 2;
  const dots = Array.from({ length: number }, (_, i) => i);
  return (
    <div style={{ padding: "16px 0" }}>
      <div style={{ display: "flex", gap: 20, justifyContent: "center", alignItems: "flex-start" }}>
        {[0, 1].map((group) => (
          <div key={group} style={{ textAlign: "center" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center", maxWidth: 120, marginBottom: 10 }}>
              {dots.slice(group * half, group * half + half).map((i) => (
                <div key={i} style={{
                  width: 18, height: 18, borderRadius: "50%",
                  background: group === 0
                    ? "linear-gradient(135deg, #f5c518, #f59e0b)"
                    : "linear-gradient(135deg, #c84bff, #7c3aed)",
                }} />
              ))}
            </div>
            <div style={{ color: "#666", fontSize: 12 }}>Group {group + 1}</div>
            <div style={{ color: "#fff", fontWeight: 900, fontSize: 22, marginTop: 2 }}>
              {revealed ? half : "?"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Single step ───────────────────────────────────────────────────────────────
function LessonStep({ lesson, stepIndex, total, onNext, onFinish }) {
  const [selected, setSelected] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const isCorrect = selected === lesson.answer;
  const isLast = stepIndex === total - 1;

  const handleSelect = (val) => {
    if (selected !== null) return;
    setSelected(val);
  };

  return (
    <div style={{ maxWidth: 580, margin: "0 auto" }}>
      {/* progress bar */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} style={{
            flex: 1, height: 4, borderRadius: 999,
            background: i < stepIndex
              ? "linear-gradient(90deg, #f5c518, #c84bff)"
              : i === stepIndex
              ? "#3b82f6"
              : "#2a2a2a",
          }} />
        ))}
        <span style={{ color: "#666", fontSize: 12, whiteSpace: "nowrap" }}>{stepIndex + 1} / {total}</span>
      </div>

      {/* card */}
      <div style={{
        background: "#1a1a1a", border: "1px solid #2a2a2a",
        borderRadius: 20, overflow: "hidden",
      }}>
        {/* header */}
        <div style={{ padding: "24px 28px 0" }}>
          <div style={{ color: "#7dd3fc", fontSize: 11, fontWeight: 800, letterSpacing: 1, marginBottom: 6 }}>
            STEP {stepIndex + 1}
          </div>
          <div style={{ color: "#fff", fontWeight: 900, fontSize: 22, marginBottom: 14 }}>
            {lesson.title}
          </div>
          <div style={{
            background: "#111", border: "1px solid #222",
            borderRadius: 12, padding: "14px 18px",
            color: "#ccc", fontSize: 14, lineHeight: 1.7,
          }}>
            {lesson.explanation}
          </div>
        </div>

        {/* visual */}
        <div style={{ padding: "0 28px" }}>
          {lesson.visual === "split" && <SplitVisual number={lesson.visualNumber || 8} revealed={selected !== null} />}
          {lesson.visual === "numberline" && <NumberLineVisual number={lesson.visualNumber || 10} revealed={selected !== null} />}
          {lesson.visual === "dots" && <DotsVisual number={lesson.visualNumber || 12} revealed={selected !== null} />}
        </div>

        {/* question */}
        <div style={{ padding: "0 28px 28px" }}>
          <div style={{ color: "#fff", fontWeight: 800, fontSize: 17, marginBottom: 14 }}>
            {lesson.question}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
            {lesson.options.map((opt) => {
              const isPicked = selected === opt;
              const isRight = opt === lesson.answer;
              let bg = "#111";
              let border = "1px solid #2a2a2a";
              let color = "#ccc";
              if (selected !== null) {
                if (isRight) { bg = "#052e16"; border = "1px solid #16a34a"; color = "#4ade80"; }
                else if (isPicked && !isRight) { bg = "#1c0a0a"; border = "1px solid #dc2626"; color = "#f87171"; }
              } else if (isPicked) {
                bg = "#1e3a5f"; border = "1px solid #3b82f6"; color = "#93c5fd";
              }

              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => handleSelect(opt)}
                  style={{
                    background: bg, border, borderRadius: 12,
                    padding: "14px 0", color, fontWeight: 800,
                    fontSize: 20, cursor: selected !== null ? "default" : "pointer",
                    transition: "all 0.15s",
                  }}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {/* feedback */}
          {selected !== null && (
            <div style={{
              background: isCorrect ? "#052e16" : "#1c0a0a",
              border: `1px solid ${isCorrect ? "#16a34a" : "#dc2626"}`,
              borderRadius: 12, padding: "12px 16px",
              color: isCorrect ? "#4ade80" : "#f87171",
              fontSize: 14, fontWeight: 700, marginBottom: 14,
            }}>
              {isCorrect ? "✓ Correct! Well done." : `✗ Not quite — the answer is ${lesson.answer}.`}
            </div>
          )}

          {/* hint */}
          {selected === null && (
            <button
              type="button"
              onClick={() => setShowHint((v) => !v)}
              style={{ background: "none", border: "none", color: "#666", fontSize: 13, cursor: "pointer", marginBottom: showHint ? 8 : 0 }}
            >
              {showHint ? "Hide hint ▲" : "Need a hint? ▼"}
            </button>
          )}
          {showHint && selected === null && (
            <div style={{ color: "#f5c518", fontSize: 13, marginBottom: 12 }}>💡 {lesson.hint}</div>
          )}

          {/* next */}
          {selected !== null && (
            <button
              type="button"
              onClick={isLast ? onFinish : onNext}
              style={{
                width: "100%",
                background: "linear-gradient(90deg, #f5c518 0%, #c84bff 100%)",
                border: "none", borderRadius: 50,
                color: "#111", fontWeight: 800, fontSize: 15,
                padding: "13px 0", cursor: "pointer",
              }}
            >
              {isLast ? "Finish Lesson 🎉" : "Next →"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Completion screen ─────────────────────────────────────────────────────────
function CompletionScreen({ score, total }) {
  const pct = Math.round((score / total) * 100);
  return (
    <div style={{ maxWidth: 480, margin: "0 auto", textAlign: "center", padding: "40px 20px" }}>
      <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
      <div style={{ color: "#fff", fontWeight: 900, fontSize: 28, marginBottom: 8 }}>Lesson Complete!</div>
      <div style={{ color: "#9ca3af", fontSize: 15, marginBottom: 28 }}>
        You scored {score} out of {total} — {pct}%
      </div>
      <div style={{
        background: "#1a1a1a", border: "1px solid #2a2a2a",
        borderRadius: 16, padding: "20px 28px", marginBottom: 28,
      }}>
        <div style={{ color: "#7dd3fc", fontSize: 13, marginBottom: 6 }}>What you learned</div>
        <div style={{ color: "#ccc", fontSize: 14, lineHeight: 1.7, textAlign: "left" }}>
          • Half means splitting into two equal parts<br />
          • Half lives exactly in the middle of a number line<br />
          • Even numbers always have a clean half<br />
          • You can halve large numbers mentally by splitting them
        </div>
      </div>
      <button
        type="button"
        data-route="/dashboard"
        style={{
          background: "linear-gradient(90deg, #f5c518 0%, #c84bff 100%)",
          border: "none", borderRadius: 50,
          color: "#111", fontWeight: 800, fontSize: 15,
          padding: "13px 40px", cursor: "pointer",
        }}
      >
        Back to Dashboard
      </button>
    </div>
  );
}

// ── Main lesson page ──────────────────────────────────────────────────────────
export default function ArithmeticLesson() {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleNext = (wasCorrect) => {
    if (wasCorrect) setScore((s) => s + 1);
    setStep((s) => s + 1);
  };

  const handleFinish = (wasCorrect) => {
    if (wasCorrect) setScore((s) => s + 1);
    setDone(true);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#111",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
    }}>
      <TopNav />
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "32px 20px" }}>
        {/* breadcrumb */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 28, color: "#555", fontSize: 13 }}>
          <button type="button" data-route="/dashboard" style={{ background: "none", border: "none", color: "#555", cursor: "pointer", fontSize: 13 }}>
            Home
          </button>
          <span>›</span>
          <button type="button" data-route="/courses" style={{ background: "none", border: "none", color: "#555", cursor: "pointer", fontSize: 13 }}>
            Courses
          </button>
          <span>›</span>
          <span style={{ color: "#fff" }}>Arithmetic Thinking — Finding Half</span>
        </div>

        {done ? (
          <CompletionScreen score={score} total={LESSONS.length} />
        ) : (
          <LessonStep
            key={step}
            lesson={LESSONS[step]}
            stepIndex={step}
            total={LESSONS.length}
            onNext={() => handleNext(selectedAnswer === LESSONS[step].answer)}
            onFinish={() => handleFinish(selectedAnswer === LESSONS[step].answer)}
          />
        )}
      </div>
    </div>
  );
}