import { useState } from "react";
import Form from "./components/Form";

export default function App() {
  const [data, setData] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const setValue = (key, value) => setData((d) => ({ ...d, [key]: value }));

  return (
    <main style={{ maxWidth: 640, margin: "0 auto", padding: 24, textAlign: "left" }}>
      <h1>Personal loan application</h1>
      {submitted ? (
        <p>Application submitted (demo).</p>
      ) : (
        <Form data={data} onChange={setValue} onSubmit={() => setSubmitted(true)} />
      )}
    </main>
  );
}
