import { useState, useEffect } from "react";
import TopNav from "../components/TopNav";

// ── Slide 1: What is a sequence rule ──────────────────────────────────────────
function Slide1() {
  const [revealed, setRevealed] = useState(0);
  const sequence = [3, 6, 9, 12, 15, 18];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ background: "#111", border: "1px solid #222", borderRadius: 12, padding: "16px 20px", color: "#ccc", fontSize: 14, lineHeight: 1.8 }}>
        A <strong style={{ color: "#fff" }}>sequence</strong> is an ordered list of numbers that follows a rule.
        The rule tells you how to get from one term to the next — it could be adding, subtracting, multiplying.
        <br /><br />
        Tap to reveal the terms one by one and spot the rule.
      </div>

      <div style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 16, padding: "24px", textAlign: "center" }}>
        <div style={{ color: "#9ca3af", fontSize: 13, marginBottom: 16 }}>Sequence: add 3 each time</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, flexWrap: "wrap" }}>
          {sequence.map((n, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{
                width: 44, height: 44, borderRadius: "50%",
                background: i < revealed ? "linear-gradient(135deg,#7dd3fc,#2563eb)" : "#1e293b",
                border: `2px solid ${i < revealed ? "#7dd3fc" : "#334155"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: i < revealed ? "#fff" : "#334155",
                fontWeight: 900, fontSize: 16, transition: "all 0.3s",
              }}>{i < revealed ? n : "?"}</div>
              {i < sequence.length - 1 && (
                <div style={{ color: i < revealed - 1 ? "#7dd3fc" : "#2a2a2a", fontSize: 11, fontWeight: 700, transition: "color 0.3s" }}>+3</div>
              )}
            </div>
          ))}
        </div>

        <button type="button" onClick={() => setRevealed(r => Math.min(r + 1, sequence.length))}
          style={{ marginTop: 20, background: revealed === sequence.length ? "#1e293b" : "#2563eb", border: "none", borderRadius: 999, color: "#fff", fontWeight: 700, fontSize: 14, padding: "10px 28px", cursor: revealed === sequence.length ? "default" : "pointer", transition: "all 0.3s" }}>
          {revealed === 0 ? "Reveal first term" : revealed === sequence.length ? "✓ Full sequence revealed" : `Reveal next term (${revealed + 1}/${sequence.length})`}
        </button>
      </div>

      {revealed === sequence.length && (
        <div style={{ background: "#0f2a1a", border: "1px solid #16a34a", borderRadius: 12, padding: "12px 16px", color: "#4ade80", fontSize: 14 }}>
          Rule: <strong>+3 each time</strong>. Starting from 3, every term is 3 more than the one before it.
        </div>
      )}
    </div>
  );
}

// ── Slide 2: Building terms using a rule ──────────────────────────────────────
function Slide2() {
  const [step, setStep] = useState(0);
  const chain = [7, 14, 21, 28, 35];
  const labels = ["1st", "2nd", "3rd", "4th", "5th"];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ background: "#111", border: "1px solid #222", borderRadius: 12, padding: "16px 20px", color: "#ccc", fontSize: 14, lineHeight: 1.8 }}>
        Given a <strong style={{ color: "#fff" }}>first term</strong> and a rule, you can build any term in the sequence.
        Each step applies the rule once. To find the 5th term, apply the rule 4 times from the start.
      </div>

      <div style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 16, padding: "24px" }}>
        <div style={{ color: "#fff", fontWeight: 800, fontSize: 16, marginBottom: 4, textAlign: "center" }}>First term: 7 · Rule: add 7</div>
        <div style={{ color: "#666", fontSize: 13, textAlign: "center", marginBottom: 20 }}>Tap to build the sequence step by step</div>

        <div style={{ overflowX: "auto", paddingBottom: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: "max-content", margin: "0 auto", justifyContent: "center" }}>
            {chain.map((n, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ color: "#555", fontSize: 10, marginBottom: 4 }}>{labels[i]}</div>
                  <div style={{
                    width: 50, height: 50, borderRadius: 12,
                    background: i <= step ? "linear-gradient(135deg,#f5c518,#f59e0b)" : "#1e293b",
                    border: `2px solid ${i <= step ? "#f5c518" : "#334155"}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: i <= step ? "#111" : "#334155",
                    fontWeight: 900, fontSize: 18, transition: "all 0.35s",
                  }}>{i <= step ? n : "?"}</div>
                </div>
                {i < chain.length - 1 && (
                  <div style={{ color: i < step ? "#f5c518" : "#2a2a2a", fontSize: 12, fontWeight: 700, marginTop: 14, transition: "color 0.3s" }}>+7→</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {step < chain.length - 1 ? (
          <button type="button" onClick={() => setStep(s => s + 1)}
            style={{ width: "100%", marginTop: 20, background: "#f5c518", border: "none", borderRadius: 999, color: "#111", fontWeight: 700, fontSize: 14, padding: "11px 0", cursor: "pointer" }}>
            Add next term (+7)
          </button>
        ) : (
          <div style={{ marginTop: 20, textAlign: "center", color: "#4ade80", fontWeight: 700, fontSize: 15 }}>
            ✓ 5th term = 35
          </div>
        )}
      </div>

      {step === chain.length - 1 && (
        <div style={{ background: "#0f2a1a", border: "1px solid #16a34a", borderRadius: 12, padding: "12px 16px", color: "#4ade80", fontSize: 14 }}>
          To find the nth term, apply the rule (n−1) times. For the 5th term: 7 + (4 × 7) = 35.
        </div>
      )}
    </div>
  );
}

// ── Slide 3: Checking if a number is in a sequence ────────────────────────────
function Slide3() {
  const [testNum, setTestNum] = useState(null);
  const candidates = [14, 20, 25, 32, 35];

  const inSeq = (n) => (n - 2) % 3 === 0; // sequence: 2, 5, 8, 11, ... (start 2, add 3)

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ background: "#111", border: "1px solid #222", borderRadius: 12, padding: "16px 20px", color: "#ccc", fontSize: 14, lineHeight: 1.8 }}>
        To check if a number belongs to a sequence, use the rule in reverse.
        For the sequence <strong style={{ color: "#7dd3fc" }}>2, 5, 8, 11, ...</strong> (start 2, add 3):
        <br /><br />
        Subtract the first term, then check if the result divides evenly by 3.
        If <strong style={{ color: "#f5c518" }}>(number − 2) ÷ 3</strong> is a whole number → it's in the sequence.
      </div>

      <div style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 16, padding: "24px" }}>
        <div style={{ color: "#9ca3af", fontSize: 13, marginBottom: 16, textAlign: "center" }}>Tap a number to test if it's in the sequence 2, 5, 8, 11, ...</div>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
          {candidates.map((n) => {
            const tested = testNum === n;
            const inS = inSeq(n);
            return (
              <button key={n} type="button" onClick={() => setTestNum(n)}
                style={{
                  width: 54, height: 54, borderRadius: 12,
                  background: tested ? (inS ? "#052e16" : "#1c0a0a") : "#1e293b",
                  border: `2px solid ${tested ? (inS ? "#16a34a" : "#dc2626") : "#334155"}`,
                  color: tested ? (inS ? "#4ade80" : "#f87171") : "#ccc",
                  fontWeight: 800, fontSize: 17, cursor: "pointer", transition: "all 0.2s",
                }}>{n}</button>
            );
          })}
        </div>

        {testNum && (
          <div style={{ marginTop: 16, background: inSeq(testNum) ? "#052e16" : "#1c0a0a", border: `1px solid ${inSeq(testNum) ? "#16a34a" : "#dc2626"}`, borderRadius: 12, padding: "14px 18px", color: inSeq(testNum) ? "#4ade80" : "#f87171", fontSize: 14 }}>
            <strong>{testNum}</strong>: ({testNum} − 2) ÷ 3 = {((testNum - 2) / 3).toFixed(2)} →{" "}
            {inSeq(testNum) ? "✓ whole number — IN the sequence" : "✗ not a whole number — NOT in the sequence"}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Quiz ───────────────────────────────────────────────────────────────────────
const QUIZ = [
  { question: "The sequence 5, 10, 15, 20, ... continues the same way. What is the next term?", options: [22, 23, 24, 25], answer: 25 },
  { question: "A sequence starts at 2 with the rule 'add 7'. What is the 3rd term?", options: [14, 16, 18, 21], answer: 16 },
  { question: "Which number IS in the sequence 3, 6, 9, 12, ... (add 3 each time)?", options: [25, 28, 31, 36], answer: 36 },
  { question: "The sequence 100, 93, 86, 79, ... decreases by the same amount each time. What is the next term?", options: [70, 71, 72, 73], answer: 72 },
  { question: "A sequence has the rule 'add 8'. The 4th term is 37. What is the 1st term?", options: [11, 13, 15, 17], answer: 13 },
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
          if (selected) {
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

function CompletionScreen({ score }) {
  const total = QUIZ.length;
  const pct = Math.round((score / total) * 100);

  useEffect(() => {
    try {
      const completed = JSON.parse(localStorage.getItem("fuzu_completed") || "[]");
      if (!completed.includes("counting-sequences")) {
        completed.push("counting-sequences");
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
          • A sequence follows a consistent rule between every term<br />
          • You can build any term by applying the rule from the start<br />
          • To check membership: subtract the first term, divide by the step<br />
          • Sequences can go forwards, backwards, and into negatives
        </div>
      </div>
      <button type="button" data-route="/dashboard"
        style={{ background: "linear-gradient(90deg,#f5c518,#c84bff)", border: "none", borderRadius: 50, color: "#111", fontWeight: 800, fontSize: 15, padding: "13px 40px", cursor: "pointer" }}>
        Back to Dashboard
      </button>
    </div>
  );
}

const SLIDES = [
  { component: Slide1, title: "What is a Sequence?" },
  { component: Slide2, title: "Building Terms from a Rule" },
  { component: Slide3, title: "Is a Number in the Sequence?" },
];
const TOTAL_STEPS = SLIDES.length + QUIZ.length;

export default function CountingSequences() {
  const [step, setStep] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [done, setDone] = useState(false);

  const isSlide = step < SLIDES.length;
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
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24, color: "#555", fontSize: 13 }}>
          <button type="button" data-route="/dashboard" style={{ background: "none", border: "none", color: "#555", cursor: "pointer", fontSize: 13 }}>Home</button>
          <span>›</span>
          <span style={{ color: "#fff" }}>Counting and Sequences</span>
        </div>

        {done ? <CompletionScreen score={quizScore} /> : (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
              {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                <div key={i} style={{ flex: 1, height: 4, borderRadius: 999, background: i < step ? "linear-gradient(90deg,#f5c518,#c84bff)" : i === step ? (i >= SLIDES.length ? "#f59e0b" : "#3b82f6") : "#2a2a2a" }} />
              ))}
              <span style={{ color: "#555", fontSize: 11, whiteSpace: "nowrap" }}>
                {isSlide ? `Lesson ${step + 1}/${SLIDES.length}` : `Quiz ${quizIndex + 1}/${QUIZ.length}`}
              </span>
            </div>

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

            {!isSlide && (
              <QuizQuestion key={quizIndex} q={QUIZ[quizIndex]} index={quizIndex} total={QUIZ.length}
                onNext={handleNext} onFinish={handleFinish} />
            )}
          </>
        )}
      </div>
    </div>
  );
}