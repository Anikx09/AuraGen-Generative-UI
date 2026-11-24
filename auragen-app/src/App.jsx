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
  const { score, log, simulate } = useTracker(mode === "form" && !submitted);
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

  const level = score >= STRUGGLE_THRESHOLD ? "hot" : score >= 30 ? "warm" : "";

  return (
    <main className="app">
      <h1>Personal loan application</h1>
      <p className="subtitle">
        Fill in the details below. AuraGen watches for signs of struggle and can switch to a step-by-step view.
      </p>

      <div className="monitor">
        <div className="monitor-head">
          <strong>Live struggle monitor (demo): {score} / 100</strong>
          <button className="ghost" onClick={simulate}>Simulate struggle</button>
        </div>
        <div className="meter">
          <i className={level} style={{ width: `${score}%` }} />
        </div>
        <small className="hint">The wizard starts at {STRUGGLE_THRESHOLD}</small>
        <ul className="log">
          {log.length === 0 && <li>No events yet.</li>}
          {log.map((e, i) => (
            <li key={i}>{e.time} {e.message}</li>
          ))}
        </ul>
      </div>

      {submitted ? (
        <div className="card"><p>Application submitted (demo).</p></div>
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
