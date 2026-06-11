import { useState } from "react";
import TopNav from "../components/TopNav";

// ── Explanation slides ─────────────────────────────────────────────────────────

function Slide1() {
  const [revealed, setRevealed] = useState(false);
  const [step, setStep] = useState(0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ background: "#111", border: "1px solid #222", borderRadius: 12, padding: "16px 20px", color: "#ccc", fontSize: 14, lineHeight: 1.8 }}>
        <strong style={{ color: "#fff" }}>Half</strong> means splitting something into two <em>exactly equal</em> parts.
        If you have 12 apples and split them equally between two people, each gets half — 6 apples each.
        <br /><br />
        The key test: <strong style={{ color: "#7dd3fc" }}>both parts must be identical.</strong>
      </div>

      <div style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 16, padding: "24px", textAlign: "center" }}>
        <div style={{ color: "#666", fontSize: 13, marginBottom: 16 }}>Tap to split 12 into two equal halves</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
          <div style={{ background: "linear-gradient(135deg,#1e3a5f,#2563eb)", border: "1px solid #3b82f6", borderRadius: 14, padding: "20px 32px", minWidth: 90, textAlign: "center" }}>
            <div style={{ color: "#93c5fd", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>Group A</div>
            <div style={{ color: "#fff", fontWeight: 900, fontSize: 42, transition: "all 0.4s" }}>{revealed ? 6 : "?"}</div>
          </div>
          <div>
            <div style={{ color: "#555", fontSize: 24 }}>+</div>
            <div style={{ color: "#7dd3fc", fontSize: 12, fontWeight: 700, marginTop: 4 }}>= 12</div>
          </div>
          <div style={{ background: "linear-gradient(135deg,#1e3a5f,#2563eb)", border: "1px solid #3b82f6", borderRadius: 14, padding: "20px 32px", minWidth: 90, textAlign: "center" }}>
            <div style={{ color: "#93c5fd", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>Group B</div>
            <div style={{ color: "#fff", fontWeight: 900, fontSize: 42, transition: "all 0.4s" }}>{revealed ? 6 : "?"}</div>
          </div>
        </div>
        <button type="button" onClick={() => setRevealed(true)}
          style={{ marginTop: 20, background: revealed ? "#1e293b" : "#2563eb", border: "none", borderRadius: 999, color: "#fff", fontWeight: 700, fontSize: 14, padding: "10px 28px", cursor: revealed ? "default" : "pointer", transition: "all 0.3s" }}>
          {revealed ? "✓ Each group gets 6" : "Reveal the split"}
        </button>
      </div>

      {revealed && (
        <div style={{ background: "#0f2a1a", border: "1px solid #16a34a", borderRadius: 12, padding: "12px 16px", color: "#4ade80", fontSize: 14 }}>
          Half of 12 = 6. Both groups are equal — that's what makes it half.
        </div>
      )}
    </div>
  );
}

function Slide2() {
  const [markerPlaced, setMarkerPlaced] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ background: "#111", border: "1px solid #222", borderRadius: 12, padding: "16px 20px", color: "#ccc", fontSize: 14, lineHeight: 1.8 }}>
        On a number line, half sits <strong style={{ color: "#f5c518" }}>exactly in the middle</strong> between 0 and the number.
        It's equidistant from both ends — the same distance from 0 as from the number itself.
      </div>

      <div style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 16, padding: "28px 24px" }}>
        <div style={{ color: "#666", fontSize: 13, marginBottom: 20, textAlign: "center" }}>Tap to place the halfway point on the number line</div>

        <div style={{ position: "relative", height: 70, margin: "0 16px" }}>
          <div style={{ position: "absolute", top: 28, left: 0, right: 0, height: 3, background: "#2a2a2a", borderRadius: 2 }} />

          {/* 0 marker */}
          <div style={{ position: "absolute", left: 0, top: 14, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#444", marginTop: 9 }} />
            <div style={{ color: "#666", fontSize: 13, fontWeight: 600, marginTop: 2 }}>0</div>
          </div>

          {/* half marker */}
          <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", top: 7, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, transition: "all 0.4s" }}>
            <div style={{ width: markerPlaced ? 16 : 10, height: markerPlaced ? 16 : 10, borderRadius: "50%", background: markerPlaced ? "linear-gradient(135deg,#f5c518,#c84bff)" : "#2a2a2a", border: markerPlaced ? "2px solid #f5c518" : "2px solid #444", marginTop: markerPlaced ? 6 : 9, boxShadow: markerPlaced ? "0 0 16px rgba(245,197,24,0.6)" : "none", transition: "all 0.4s" }} />
            <div style={{ color: markerPlaced ? "#f5c518" : "#333", fontSize: 15, fontWeight: 900, marginTop: 2, transition: "all 0.4s" }}>{markerPlaced ? "10" : "?"}</div>
          </div>

          {/* 20 marker */}
          <div style={{ position: "absolute", right: 0, top: 14, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#444", marginTop: 9 }} />
            <div style={{ color: "#666", fontSize: 13, fontWeight: 600, marginTop: 2 }}>20</div>
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: 8 }}>
          <button type="button" onClick={() => setMarkerPlaced(true)}
            style={{ background: markerPlaced ? "#1e293b" : "#f5c518", border: "none", borderRadius: 999, color: markerPlaced ? "#fff" : "#111", fontWeight: 700, fontSize: 14, padding: "10px 28px", cursor: markerPlaced ? "default" : "pointer", transition: "all 0.3s" }}>
            {markerPlaced ? "✓ Halfway point is 10" : "Place the halfway point"}
          </button>
        </div>
      </div>

      {markerPlaced && (
        <div style={{ background: "#0f2a1a", border: "1px solid #16a34a", borderRadius: 12, padding: "12px 16px", color: "#4ade80", fontSize: 14 }}>
          Half of 20 = 10. It's 10 steps from 0 and 10 steps from 20 — perfectly in the middle.
        </div>
      )}
    </div>
  );
}

function Slide3() {
  const [revealStep, setRevealStep] = useState(0);

  const steps = [
    { label: "Split 68 into tens and units", tens: "60", units: "8" },
    { label: "Halve each part separately", tensHalf: "30", unitsHalf: "4" },
    { label: "Add the halves together", result: "34" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ background: "#111", border: "1px solid #222", borderRadius: 12, padding: "16px 20px", color: "#ccc", fontSize: 14, lineHeight: 1.8 }}>
        To halve large even numbers <strong style={{ color: "#fff" }}>mentally</strong>, split them into tens and units, halve each part, then add back together.
        <br /><br />
        This works because halving is <strong style={{ color: "#7dd3fc" }}>distributive</strong> — half of (60 + 8) = half of 60 + half of 8.
      </div>

      <div style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 16, padding: "24px" }}>
        <div style={{ color: "#fff", fontWeight: 800, fontSize: 18, marginBottom: 20, textAlign: "center" }}>
          What is half of <span style={{ color: "#f5c518" }}>68</span>?
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {/* Step 1 */}
          <div style={{ background: revealStep >= 1 ? "#0f1f3a" : "#111", border: `1px solid ${revealStep >= 1 ? "#2563eb" : "#222"}`, borderRadius: 12, padding: "14px 18px", transition: "all 0.3s" }}>
            <div style={{ color: "#7dd3fc", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>STEP 1</div>
            <div style={{ color: "#ccc", fontSize: 13 }}>Split into tens and units</div>
            {revealStep >= 1 && (
              <div style={{ display: "flex", gap: 12, marginTop: 10 }}>
                <div style={{ background: "#1e3a5f", borderRadius: 8, padding: "8px 16px", color: "#7dd3fc", fontWeight: 800, fontSize: 18 }}>60</div>
                <div style={{ color: "#555", alignSelf: "center" }}>+</div>
                <div style={{ background: "#1e3a5f", borderRadius: 8, padding: "8px 16px", color: "#7dd3fc", fontWeight: 800, fontSize: 18 }}>8</div>
              </div>
            )}
          </div>

          {/* Step 2 */}
          <div style={{ background: revealStep >= 2 ? "#1a1a0a" : "#111", border: `1px solid ${revealStep >= 2 ? "#f5c518" : "#222"}`, borderRadius: 12, padding: "14px 18px", transition: "all 0.3s" }}>
            <div style={{ color: "#f5c518", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>STEP 2</div>
            <div style={{ color: "#ccc", fontSize: 13 }}>Halve each part</div>
            {revealStep >= 2 && (
              <div style={{ display: "flex", gap: 12, marginTop: 10 }}>
                <div style={{ background: "#2a1a00", borderRadius: 8, padding: "8px 16px", color: "#f5c518", fontWeight: 800, fontSize: 18 }}>30</div>
                <div style={{ color: "#555", alignSelf: "center" }}>+</div>
                <div style={{ background: "#2a1a00", borderRadius: 8, padding: "8px 16px", color: "#f5c518", fontWeight: 800, fontSize: 18 }}>4</div>
              </div>
            )}
          </div>

          {/* Step 3 */}
          <div style={{ background: revealStep >= 3 ? "#0f2a1a" : "#111", border: `1px solid ${revealStep >= 3 ? "#16a34a" : "#222"}`, borderRadius: 12, padding: "14px 18px", transition: "all 0.3s" }}>
            <div style={{ color: "#4ade80", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>STEP 3</div>
            <div style={{ color: "#ccc", fontSize: 13 }}>Add the halves</div>
            {revealStep >= 3 && (
              <div style={{ marginTop: 10 }}>
                <div style={{ background: "#052e16", borderRadius: 8, padding: "10px 16px", color: "#4ade80", fontWeight: 900, fontSize: 22, display: "inline-block" }}>30 + 4 = 34</div>
              </div>
            )}
          </div>
        </div>

        {revealStep < 3 && (
          <button type="button" onClick={() => setRevealStep(s => Math.min(s + 1, 3))}
            style={{ width: "100%", marginTop: 16, background: "#2563eb", border: "none", borderRadius: 999, color: "#fff", fontWeight: 700, fontSize: 14, padding: "12px 0", cursor: "pointer" }}>
            {revealStep === 0 ? "Start walkthrough" : `Reveal step ${revealStep + 1}`}
          </button>
        )}
        {revealStep === 3 && (
          <div style={{ marginTop: 16, textAlign: "center", color: "#4ade80", fontWeight: 700, fontSize: 15 }}>
            ✓ Half of 68 = 34
          </div>
        )}
      </div>
    </div>
  );
}

// ── Quiz questions ─────────────────────────────────────────────────────────────
const QUIZ = [
  { question: "What is half of 94?", options: [44, 46, 47, 48], answer: 47 },
  { question: "What is half of 150?", options: [70, 72, 75, 80], answer: 75 },
  { question: "Which number is exactly halfway between 60 and 80?", options: [65, 68, 70, 72], answer: 70 },
  { question: "A piece of rope is 86 cm long. It is cut exactly in half. How long is each piece?", options: [40, 41, 43, 45], answer: 43 },
  { question: "Half of a number is 39. What is the number?", options: [68, 72, 78, 80], answer: 78 },
];

function QuizQuestion({ q, index, total, onNext, onFinish }) {
  const [selected, setSelected] = useState(null);
  const isCorrect = selected === q.answer;
  const isLast = index === total - 1;

  return (
    <div style={{ background: "#1a1a1a", border: "1px solid #f59e0b33", borderRadius: 20, padding: "28px 24px" }}>
      <div style={{ background: "#f59e0b22", border: "1px solid #f59e0b55", borderRadius: 8, padding: "5px 12px", marginBottom: 16, display: "inline-block" }}>
        <span style={{ color: "#f59e0b", fontSize: 11, fontWeight: 800, letterSpacing: 1 }}>QUIZ · {index + 1} OF {total}</span>
      </div>
      <div style={{ color: "#fff", fontWeight: 900, fontSize: 18, marginBottom: 24, lineHeight: 1.5 }}>{q.question}</div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
        {q.options.map((opt) => {
          const isPicked = selected === opt;
          const isRight = opt === q.answer;
          let bg = "#111", border = "1px solid #2a2a2a", color = "#ccc";
          if (selected !== null) {
            if (isRight) { bg = "#052e16"; border = "1px solid #16a34a"; color = "#4ade80"; }
            else if (isPicked) { bg = "#1c0a0a"; border = "1px solid #dc2626"; color = "#f87171"; }
          }
          return (
            <button key={opt} type="button" onClick={() => { if (!selected) setSelected(opt); }}
              style={{ background: bg, border, borderRadius: 12, padding: "16px 0", color, fontWeight: 800, fontSize: 22, cursor: selected ? "default" : "pointer", transition: "all 0.15s" }}>
              {opt}
            </button>
          );
        })}
      </div>

      {selected && (
        <>
          <div style={{ background: isCorrect ? "#052e16" : "#1c0a0a", border: `1px solid ${isCorrect ? "#16a34a" : "#dc2626"}`, borderRadius: 12, padding: "12px 16px", color: isCorrect ? "#4ade80" : "#f87171", fontSize: 14, fontWeight: 700, marginBottom: 14 }}>
            {isCorrect ? "✓ Correct!" : `✗ The answer is ${q.answer}.`}
          </div>
          <button type="button" onClick={() => isLast ? onFinish(isCorrect) : onNext(isCorrect)}
            style={{ width: "100%", background: "linear-gradient(90deg,#f5c518,#c84bff)", border: "none", borderRadius: 50, color: "#111", fontWeight: 800, fontSize: 15, padding: "13px 0", cursor: "pointer" }}>
            {isLast ? "Finish 🎉" : "Next →"}
          </button>
        </>
      )}
    </div>
  );
}

// ── Completion ─────────────────────────────────────────────────────────────────
function CompletionScreen({ score }) {
  const total = QUIZ.length;
  const pct = Math.round((score / total) * 100);

  useEffect(() => {
    try {
      const completed = JSON.parse(localStorage.getItem("fuzu_completed") || "[]");
      if (!completed.includes("arithmetic-thinking")) {
        completed.push("arithmetic-thinking");
        localStorage.setItem("fuzu_completed", JSON.stringify(completed));
      }
    } catch (e) {}
  }, []);

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", textAlign: "center", padding: "40px 20px" }}>
      <div style={{ fontSize: 64, marginBottom: 16 }}>{pct === 100 ? "🏆" : pct >= 60 ? "🎉" : "📚"}</div>
      <div style={{ color: "#fff", fontWeight: 900, fontSize: 28, marginBottom: 8 }}>All done!</div>
      <div style={{ color: "#9ca3af", fontSize: 15, marginBottom: 28 }}>Quiz score: {score} / {total} — {pct}%</div>
      <div style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 16, padding: "20px 28px", marginBottom: 28 }}>
        <div style={{ color: "#7dd3fc", fontSize: 13, marginBottom: 8 }}>What you learned</div>
        <div style={{ color: "#ccc", fontSize: 14, lineHeight: 1.8, textAlign: "left" }}>
          • Half means two exactly equal parts<br />
          • Half sits in the middle of a number line<br />
          • Split large numbers into tens + units to halve mentally<br />
          • If half of X is Y, then the original number is Y × 2
        </div>
      </div>
      <button type="button" data-route="/dashboard"
        style={{ background: "linear-gradient(90deg,#f5c518,#c84bff)", border: "none", borderRadius: 50, color: "#111", fontWeight: 800, fontSize: 15, padding: "13px 40px", cursor: "pointer" }}>
        Back to Dashboard
      </button>
    </div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────────
const SLIDES = [
  { type: "slide", component: Slide1, title: "What is Half?" },
  { type: "slide", component: Slide2, title: "Half on a Number Line" },
  { type: "slide", component: Slide3, title: "Halving Large Numbers" },
];
const TOTAL_STEPS = SLIDES.length + QUIZ.length;

import { useEffect } from "react";

export default function ArithmeticLesson() {
  const [step, setStep] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [done, setDone] = useState(false);

  const isSlide = step < SLIDES.length;
  const isQuiz = !isSlide && !done;
  const quizIndex = step - SLIDES.length;

  const handleNext = (wasCorrect) => {
    if (!isSlide && wasCorrect) setQuizScore(s => s + 1);
    setStep(s => s + 1);
  };

  const handleFinish = (wasCorrect) => {
    if (wasCorrect) setQuizScore(s => s + 1);
    setDone(true);
  };

  const CurrentSlide = isSlide ? SLIDES[step].component : null;

  return (
    <div style={{ minHeight: "100vh", background: "#111", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <TopNav />
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "32px 20px" }}>
        {/* breadcrumb */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24, color: "#555", fontSize: 13 }}>
          <button type="button" data-route="/dashboard" style={{ background: "none", border: "none", color: "#555", cursor: "pointer", fontSize: 13 }}>Home</button>
          <span>›</span>
          <span style={{ color: "#fff" }}>Arithmetic Thinking</span>
        </div>

        {done ? <CompletionScreen score={quizScore} /> : (
          <>
            {/* progress */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
              {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                <div key={i} style={{ flex: 1, height: 4, borderRadius: 999, background: i < step ? "linear-gradient(90deg,#f5c518,#c84bff)" : i === step ? (i >= SLIDES.length ? "#f59e0b" : "#3b82f6") : "#2a2a2a" }} />
              ))}
              <span style={{ color: "#555", fontSize: 11, whiteSpace: "nowrap" }}>
                {isSlide ? `Lesson ${step + 1}/${SLIDES.length}` : `Quiz ${quizIndex + 1}/${QUIZ.length}`}
              </span>
            </div>

            {/* slide transition banner */}
            {step === SLIDES.length && (
              <div style={{ background: "#f59e0b11", border: "1px solid #f59e0b44", borderRadius: 12, padding: "10px 16px", color: "#f59e0b", fontSize: 13, textAlign: "center", marginBottom: 20 }}>
                🧠 Lesson complete — time for the quiz. No hints from here.
              </div>
            )}

            {isSlide && (
              <div style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 20, overflow: "hidden" }}>
                <div style={{ padding: "24px 28px 0" }}>
                  <div style={{ color: "#7dd3fc", fontSize: 11, fontWeight: 800, letterSpacing: 1, marginBottom: 6 }}>LESSON {step + 1} OF {SLIDES.length}</div>
                  <div style={{ color: "#fff", fontWeight: 900, fontSize: 22, marginBottom: 20 }}>{SLIDES[step].title}</div>
                  <CurrentSlide />
                </div>
                <div style={{ padding: "24px 28px 28px" }}>
                  <button type="button" onClick={() => setStep(s => s + 1)}
                    style={{ width: "100%", background: step === SLIDES.length - 1 ? "linear-gradient(90deg,#f5c518,#c84bff)" : "#2563eb", border: "none", borderRadius: 50, color: step === SLIDES.length - 1 ? "#111" : "#fff", fontWeight: 800, fontSize: 15, padding: "13px 0", cursor: "pointer" }}>
                    {step === SLIDES.length - 1 ? "Start Quiz →" : "Next →"}
                  </button>
                </div>
              </div>
            )}

            {isQuiz && (
              <QuizQuestion key={quizIndex} q={QUIZ[quizIndex]} index={quizIndex} total={QUIZ.length}
                onNext={handleNext} onFinish={handleFinish} />
            )}
          </>
        )}
      </div>
    </div>
  );
}