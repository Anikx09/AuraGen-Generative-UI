import { useState } from "react";
import Form from "./components/Form";
import useTracker from "./hooks/useTracker";
import { STRUGGLE_THRESHOLD } from "./data/fields";

export default function App() {
  const [data, setData] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const { score, log, simulate } = useTracker(!submitted);
  const setValue = (key, value) => setData((d) => ({ ...d, [key]: value }));

  return (
    <main style={{ maxWidth: 640, margin: "0 auto", padding: 24, textAlign: "left" }}>
      <h1>Personal loan application</h1>
      <div style={{ border: "1px solid #888", borderRadius: 8, padding: 12, marginBottom: 16 }}>
        <strong>Struggle score: {score} / 100</strong> (wizard threshold: {STRUGGLE_THRESHOLD}, wizard not built in this app yet)
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
      ) : (
        <Form data={data} onChange={setValue} onSubmit={() => setSubmitted(true)} />
      )}
    </main>
  );
}
