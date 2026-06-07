import { useState } from "react";
import TopNav from "../components/TopNav";

const LESSONS = [
  {
    id: 1,
    type: "worked_example",
    title: "Worked Example — Counting in 30s",
    explanation: "The numbers in this sequence increase by 30 each time: 10, 40, 70, ...\n\nTo find which number is closest to 200, we continue the sequence:\n10 → 40 → 70 → 100 → 130 → 160 → 190 → 220\n\nNow we compare: 190 is 10 away from 200. 220 is 20 away from 200.\n\nSo 190 is closest to 200.",
    visual: "numberline_sequence",
    sequence: [10, 40, 70, 100, 130, 160, 190, 220],
    target: 200,
    question: "Which number in the sequence 10, 40, 70, ... is closest to 200?",
    options: [160, 190, 200, 220],
    answer: 190,
    hint: "Continue adding 30 until you pass 200, then compare the numbers either side.",
  },
  {
    id: 2,
    type: "question",
    title: "Finding the Pattern",
    explanation: "A sequence follows a rule — the same number is added or subtracted each time. Look at the differences between terms to find the rule.",
    visual: "grid",
    question: "The sequence 10, 16, 22, ... continues the same way. What is the next number?",
    options: [26, 28, 30, 32],
    answer: 28,
    hint: "What is the difference between 10 and 16? Apply the same rule.",
  },
  {
    id: 3,
    type: "question",
    title: "Sequences with a Rule",
    explanation: "A sequence has the first term 3 and the term-to-term rule is 'add 11'. Each term is found by adding 11 to the one before it.",
    visual: "chain",
    sequence: [3, 14, 25, 36, 47],
    question: "A sequence starts at 3 with rule 'add 11'. What is the 4th term?",
    options: [33, 36, 39, 42],
    answer: 36,
    hint: "Start at 3, then add 11 three times to reach the 4th term.",
  },
  {
    id: 4,
    type: "question",
    title: "Spotting What's In the Sequence",
    explanation: "The rule for a sequence is 'add 3' each time: 1, 4, 7, 10, 13, ...\n\nTo check if a number is in this sequence, keep adding 3 from 1 and see if you land on it.",
    visual: "highlight",
    options_label: "Which of these numbers is NOT in the sequence 1, 4, 7, 10, 13, ... ?",
    question: "Which number is NOT in the sequence 1, 4, 7, 10, 13, ... (add 3 each time)?",
    options: [22, 28, 33, 40],
    answer: 28,
    hint: "Check each: 22 = 1 + 3×7 ✓, 28 = 1 + 3×9 = 28 ✓ or not? 33 = 1 + 3×... keep checking.",
  },
  {
    id: 5,
    type: "question",
    title: "Continuing a Decreasing Sequence",
    explanation: "Sequences can also decrease. The sequence 10, 7, 4, ... decreases by 3 each time. We can continue it: 4, 1, −2, −5, ...",
    visual: "numberline_neg",
    question: "The sequence 10, 7, 4, ... decreases by 3. What is the next term after 4?",
    options: [0, 1, 2, 3],
    answer: 1,
    hint: "Subtract 3 from 4.",
  },
];

// ── Visuals ────────────────────────────────────────────────────────────────────

function SequenceNumberLine({ sequence, target, revealed }) {
  return (
    <div style={{ padding: "16px 0 8px" }}>
      <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 2, justifyContent: "center" }}>
        {sequence.map((n, i) => {
          const isClose = Math.abs(n - target) === Math.min(...sequence.map(x => Math.abs(x - target)));
          const isTarget = n === target;
          return (
            <div key={n} style={{ display: "flex", alignItems: "center", gap: 2 }}>
              <div style={{
                background: isClose && revealed ? "linear-gradient(135deg, #f5c518, #c84bff)" : isTarget ? "#2563eb" : "#1e293b",
                border: `1px solid ${isClose && revealed ? "#f5c518" : "#334155"}`,
                borderRadius: 8, padding: "6px 10px",
                color: isClose && revealed ? "#111" : "#fff",
                fontWeight: isClose ? 900 : 600, fontSize: 13,
                transition: "all 0.3s",
              }}>{n}</div>
              {i < sequence.length - 1 && (
                <div style={{ color: "#7dd3fc", fontSize: 10, fontWeight: 700 }}>+30→</div>
              )}
            </div>
          );
        })}
      </div>
      {revealed && (
        <div style={{ textAlign: "center", marginTop: 10, color: "#f5c518", fontSize: 12, fontWeight: 700 }}>
          190 is 10 away · 220 is 20 away · 190 wins ✓
        </div>
      )}
    </div>
  );
}

function ChainVisual({ sequence, revealed }) {
  return (
    <div style={{ padding: "16px 0 8px", overflowX: "auto" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 4, minWidth: "max-content", margin: "0 auto", justifyContent: "center" }}>
        {sequence.map((n, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <div style={{
              background: i === 3 && revealed ? "linear-gradient(135deg, #f5c518, #c84bff)" : "#1e293b",
              border: `1px solid ${i === 3 && revealed ? "#f5c518" : "#334155"}`,
              borderRadius: 10, padding: "10px 14px",
              color: i === 3 && revealed ? "#111" : i === 3 ? "#555" : "#fff",
              fontWeight: 900, fontSize: 16,
            }}>
              {i === 3 && !revealed ? "?" : n}
            </div>
            {i < sequence.length - 1 && (
              <div style={{ color: "#7dd3fc", fontSize: 11, fontWeight: 700 }}>+11→</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function HighlightVisual({ revealed }) {
  const nums = [22, 25, 28, 31, 34];
  return (
    <div style={{ padding: "16px 0 8px" }}>
      <div style={{ color: "#9ca3af", fontSize: 12, marginBottom: 8, textAlign: "center" }}>Sequence: 1, 4, 7, 10, 13, 16, 19, 22, 25, ...</div>
      <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
        {nums.map((n) => {
          const inSeq = (n - 1) % 3 === 0;
          return (
            <div key={n} style={{
              background: revealed ? (inSeq ? "#052e16" : "#1c0a0a") : "#1e293b",
              border: `1px solid ${revealed ? (inSeq ? "#16a34a" : "#dc2626") : "#334155"}`,
              borderRadius: 8, padding: "8px 14px",
              color: revealed ? (inSeq ? "#4ade80" : "#f87171") : "#fff",
              fontWeight: 700, fontSize: 15, transition: "all 0.3s",
            }}>{n}</div>
          );
        })}
      </div>
      {revealed && <div style={{ textAlign: "center", marginTop: 8, color: "#f87171", fontSize: 12 }}>28 breaks the pattern</div>}
    </div>
  );
}

function NegNumberLine({ revealed }) {
  const nums = [10, 7, 4, 1, -2];
  return (
    <div style={{ padding: "16px 0 8px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 4, justifyContent: "center", flexWrap: "wrap" }}>
        {nums.map((n, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <div style={{
              background: i === 3 && revealed ? "linear-gradient(135deg, #f5c518, #c84bff)" : i === 3 ? "#1e293b" : "#1e293b",
              border: `1px solid ${i === 3 && revealed ? "#f5c518" : "#334155"}`,
              borderRadius: 8, padding: "8px 12px",
              color: i === 3 && revealed ? "#111" : i >= 3 && !revealed ? "#555" : "#fff",
              fontWeight: 800, fontSize: 15,
            }}>
              {i >= 3 && !revealed ? "?" : n}
            </div>
            {i < nums.length - 1 && (
              <div style={{ color: "#f87171", fontSize: 10, fontWeight: 700 }}>−3→</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function GridVisual() {
  const highlighted = [11, 22, 33, 44, 55, 66, 77, 88, 99];
  return (
    <div style={{ padding: "12px 0" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(10, 1fr)", gap: 2, maxWidth: 280, margin: "0 auto" }}>
        {Array.from({ length: 100 }, (_, i) => i + 1).map((n) => (
          <div key={n} style={{
            background: highlighted.includes(n) ? "#2563eb" : "#1e293b",
            borderRadius: 3, padding: "2px 0",
            textAlign: "center", fontSize: 9, color: highlighted.includes(n) ? "#fff" : "#555",
            fontWeight: highlighted.includes(n) ? 700 : 400,
          }}>{n}</div>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: 8, color: "#7dd3fc", fontSize: 11 }}>Diagonal pattern: +11 each time</div>
    </div>
  );
}

// ── Lesson Step ────────────────────────────────────────────────────────────────
function LessonStep({ lesson, stepIndex, total, onNext, onFinish }) {
  const [selected, setSelected] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const isCorrect = selected === lesson.answer;
  const isLast = stepIndex === total - 1;

  return (
    <div style={{ maxWidth: 580, margin: "0 auto" }}>
      {/* progress */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} style={{ flex: 1, height: 4, borderRadius: 999, background: i < stepIndex ? "linear-gradient(90deg, #f5c518, #c84bff)" : i === stepIndex ? "#3b82f6" : "#2a2a2a" }} />
        ))}
        <span style={{ color: "#666", fontSize: 12, whiteSpace: "nowrap" }}>{stepIndex + 1} / {total}</span>
      </div>

      <div style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 20, overflow: "hidden" }}>
        <div style={{ padding: "24px 28px 0" }}>
          {lesson.type === "worked_example" && (
            <div style={{ background: "#1e293b", border: "1px solid #3b82f6", borderRadius: 8, padding: "6px 12px", marginBottom: 12, display: "inline-block" }}>
              <span style={{ color: "#7dd3fc", fontSize: 11, fontWeight: 800, letterSpacing: 1 }}>WORKED EXAMPLE</span>
            </div>
          )}
          <div style={{ color: "#7dd3fc", fontSize: 11, fontWeight: 800, letterSpacing: 1, marginBottom: 6 }}>STEP {stepIndex + 1}</div>
          <div style={{ color: "#fff", fontWeight: 900, fontSize: 20, marginBottom: 14 }}>{lesson.title}</div>
          <div style={{ background: "#111", border: "1px solid #222", borderRadius: 12, padding: "14px 18px", color: "#ccc", fontSize: 13, lineHeight: 1.8, whiteSpace: "pre-line" }}>
            {lesson.explanation}
          </div>
        </div>

        {/* visual */}
        <div style={{ padding: "0 28px" }}>
          {lesson.visual === "numberline_sequence" && <SequenceNumberLine sequence={lesson.sequence} target={lesson.target} revealed={selected !== null} />}
          {lesson.visual === "chain" && <ChainVisual sequence={lesson.sequence} revealed={selected !== null} />}
          {lesson.visual === "highlight" && <HighlightVisual revealed={selected !== null} />}
          {lesson.visual === "numberline_neg" && <NegNumberLine revealed={selected !== null} />}
          {lesson.visual === "grid" && <GridVisual />}
        </div>

        <div style={{ padding: "0 28px 28px" }}>
          <div style={{ color: "#fff", fontWeight: 800, fontSize: 16, marginBottom: 14 }}>{lesson.question}</div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
            {lesson.options.map((opt) => {
              const isPicked = selected === opt;
              const isRight = opt === lesson.answer;
              let bg = "#111", border = "1px solid #2a2a2a", color = "#ccc";
              if (selected !== null) {
                if (isRight) { bg = "#052e16"; border = "1px solid #16a34a"; color = "#4ade80"; }
                else if (isPicked) { bg = "#1c0a0a"; border = "1px solid #dc2626"; color = "#f87171"; }
              }
              return (
                <button key={opt} type="button" onClick={() => { if (selected === null) setSelected(opt); }}
                  style={{ background: bg, border, borderRadius: 12, padding: "14px 0", color, fontWeight: 800, fontSize: 20, cursor: selected !== null ? "default" : "pointer", transition: "all 0.15s" }}>
                  {opt}
                </button>
              );
            })}
          </div>

          {selected !== null && (
            <div style={{ background: isCorrect ? "#052e16" : "#1c0a0a", border: `1px solid ${isCorrect ? "#16a34a" : "#dc2626"}`, borderRadius: 12, padding: "12px 16px", color: isCorrect ? "#4ade80" : "#f87171", fontSize: 14, fontWeight: 700, marginBottom: 14 }}>
              {isCorrect ? "✓ Correct! Well done." : `✗ Not quite — the answer is ${lesson.answer}.`}
            </div>
          )}

          {selected === null && (
            <button type="button" onClick={() => setShowHint(v => !v)} style={{ background: "none", border: "none", color: "#666", fontSize: 13, cursor: "pointer", marginBottom: showHint ? 8 : 0 }}>
              {showHint ? "Hide hint ▲" : "Need a hint? ▼"}
            </button>
          )}
          {showHint && selected === null && <div style={{ color: "#f5c518", fontSize: 13, marginBottom: 12 }}>💡 {lesson.hint}</div>}

          {selected !== null && (
            <button type="button" onClick={() => isLast ? onFinish(selected === lesson.answer) : onNext(selected === lesson.answer)}
              style={{ width: "100%", background: "linear-gradient(90deg, #f5c518 0%, #c84bff 100%)", border: "none", borderRadius: 50, color: "#111", fontWeight: 800, fontSize: 15, padding: "13px 0", cursor: "pointer" }}>
              {isLast ? "Finish Lesson 🎉" : "Next →"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function CompletionScreen({ score, total }) {
  const pct = Math.round((score / total) * 100);
  return (
    <div style={{ maxWidth: 480, margin: "0 auto", textAlign: "center", padding: "40px 20px" }}>
      <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
      <div style={{ color: "#fff", fontWeight: 900, fontSize: 28, marginBottom: 8 }}>Lesson Complete!</div>
      <div style={{ color: "#9ca3af", fontSize: 15, marginBottom: 28 }}>You scored {score} out of {total} — {pct}%</div>
      <div style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 16, padding: "20px 28px", marginBottom: 28 }}>
        <div style={{ color: "#7dd3fc", fontSize: 13, marginBottom: 10 }}>What you learned</div>
        <div style={{ color: "#ccc", fontSize: 14, lineHeight: 1.7, textAlign: "left" }}>
          • Sequences follow a rule — the same number is added or subtracted each time<br />
          • You can find any term by continuing the pattern<br />
          • Comparing terms helps find which is closest to a target<br />
          • Sequences can go into negative numbers
        </div>
      </div>
      <button type="button" data-route="/dashboard" style={{ background: "linear-gradient(90deg, #f5c518 0%, #c84bff 100%)", border: "none", borderRadius: 50, color: "#111", fontWeight: 800, fontSize: 15, padding: "13px 40px", cursor: "pointer" }}>
        Back to Dashboard
      </button>
    </div>
  );
}

export default function CountingSequences() {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const handleNext = (wasCorrect) => {
    if (wasCorrect) setScore(s => s + 1);
    setStep(s => s + 1);
  };

  const handleFinish = (wasCorrect) => {
    if (wasCorrect) setScore(s => s + 1);
    setDone(true);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#111", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <TopNav />
      <div style={{ maxWidth: 768, margin: "0 auto", padding: "32px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 28, color: "#555", fontSize: 13 }}>
          <button type="button" data-route="/dashboard" style={{ background: "none", border: "none", color: "#555", cursor: "pointer", fontSize: 13 }}>Home</button>
          <span>›</span>
          <button type="button" data-route="/courses" style={{ background: "none", border: "none", color: "#555", cursor: "pointer", fontSize: 13 }}>Courses</button>
          <span>›</span>
          <span style={{ color: "#fff" }}>Counting and Sequences</span>
        </div>

        {done ? (
          <CompletionScreen score={score} total={LESSONS.length} />
        ) : (
          <LessonStep key={step} lesson={LESSONS[step]} stepIndex={step} total={LESSONS.length} onNext={handleNext} onFinish={handleFinish} />
        )}
      </div>
    </div>
  );
}