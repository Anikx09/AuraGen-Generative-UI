import { useEffect, useState } from "react";
import Form from "./components/Form";
import Wizard from "./components/Wizard";
import useTracker from "./hooks/useTracker";
import { STRUGGLE_THRESHOLD } from "./data/fields";
import { generateWizardSteps } from "./utils/wizard";

export default function App() {
  const [data, setData] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [mode, setMode] = useState("form");
  const [dismissed, setDismissed] = useState(false);
  const { score, log, counts, history, simulate, reset } = useTracker(mode === "form" && !submitted);
  const setValue = (key, value) => setData((d) => ({ ...d, [key]: value }));

  // Self-healing: switch to the wizard when the struggle score is high.
  useEffect(() => {
    if (!submitted && mode === "form" && !dismissed && score >= STRUGGLE_THRESHOLD) {
      setMode("wizard");
    }
  }, [score, mode, dismissed, submitted]);

  const showFullForm = () => {
    setDismissed(true);
    setMode("form");
  };

  // Demo helper: go back to a clean start.
  const resetDemo = () => {
    reset();
    setData({});
    setSubmitted(false);
    setDismissed(false);
    setMode("form");
  };

  // Download the filled form as a JSON file.
  const downloadJson = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "auragen-application.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const level = score >= STRUGGLE_THRESHOLD ? "hot" : score >= 30 ? "warm" : "";
  const points = history
    .map((v, i) => `${(i * 200) / 29},${50 - v * 0.5}`)
    .join(" ");

  return (
    <main className="app">
      <h1>Personal loan application</h1>
      <p className="subtitle">
        Fill in the details below. AuraGen watches for signs of struggle and can switch to a step-by-step view.
      </p>

      <div className="monitor">
        <div className="monitor-head">
          <strong>Live struggle monitor (demo): {score} / 100</strong>
          <span>
            <button className="ghost" onClick={simulate}>Simulate struggle</button>{" "}
            <button className="ghost" onClick={resetDemo}>Reset demo</button>
          </span>
        </div>
        <div className="meter">
          <i className={level} style={{ width: `${score}%` }} />
        </div>
        <small className="hint">The wizard starts at {STRUGGLE_THRESHOLD}</small>

        <p>
          <small>
            Erratic moves: <b>{counts.erratic}</b> | Rage clicks: <b>{counts.rage}</b> | Hesitations:{" "}
            <b>{counts.hesitation}</b>
          </small>
        </p>

        <svg viewBox="0 0 200 50" style={{ width: "100%", height: 70 }}>
          <line x1="0" y1={50 - STRUGGLE_THRESHOLD * 0.5} x2="200" y2={50 - STRUGGLE_THRESHOLD * 0.5}
            stroke="red" strokeDasharray="3" strokeWidth="0.5" />
          <polyline points={points} fill="none" stroke="#4f46e5" strokeWidth="1.5" />
        </svg>
        <small className="hint">Score over the last 30 seconds (red line = wizard threshold)</small>

        <ul className="log">
          {log.length === 0 && <li>No events yet.</li>}
          {log.map((e, i) => (
            <li key={i}>{e.time} {e.message}</li>
          ))}
        </ul>
      </div>

      {submitted ? (
        <div className="card">
          <p>Application submitted (demo).</p>
          <button onClick={downloadJson}>Download form data (JSON)</button>
        </div>
      ) : mode === "wizard" ? (
        <div className="card">
          <Wizard
            steps={generateWizardSteps()}
            data={data}
            onChange={setValue}
            onSubmit={() => setSubmitted(true)}
            onShowFullForm={showFullForm}
          />
        </div>
      ) : (
        <Form data={data} onChange={setValue} onSubmit={() => setSubmitted(true)} />
      )}
    </main>
  );
}
