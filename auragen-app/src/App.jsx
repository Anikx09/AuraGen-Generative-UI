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

  return (
    <main style={{ maxWidth: 640, margin: "0 auto", padding: 24, textAlign: "left" }}>
      <h1>Personal loan application</h1>
      <div style={{ border: "1px solid #888", borderRadius: 8, padding: 12, marginBottom: 16 }}>
        <strong>Struggle score: {score} / 100</strong> (wizard at {STRUGGLE_THRESHOLD})
        <button onClick={simulate} style={{ marginLeft: 12 }}>Simulate struggle</button>
        <ul>
          {log.length === 0 && <li>No events yet.</li>}
          {log.map((e, i) => (
            <li key={i}>{e.time} {e.message}</li>
          ))}
        </ul>
      </div>
      {submitted ? (
        <p>Application submitted (demo).</p>
      ) : mode === "wizard" ? (
        <Wizard
          steps={generateWizardSteps()}
          data={data}
          onChange={setValue}
          onSubmit={() => setSubmitted(true)}
          onShowFullForm={showFullForm}
        />
      ) : (
        <Form data={data} onChange={setValue} onSubmit={() => setSubmitted(true)} />
      )}
    </main>
  );
}
