import { useState } from "react";
import Field from "./Field";

// Shows the form one section at a time, with a progress bar and Back/Next buttons.
export default function Wizard({ steps, data, onChange, onSubmit, onShowFullForm }) {
  const [step, setStep] = useState(0);
  const current = steps[step];
  const isLast = step === steps.length - 1;
  const percent = Math.round(((step + 1) / steps.length) * 100);

  return (
    <div>
      <p>
        We split the form into {steps.length} short steps. Your answers are kept.{" "}
        <button onClick={onShowFullForm}>Show full form</button>
      </p>

      <div
        style={{
          background: "#e5e7eb",
          borderRadius: 999,
          height: 10,
          overflow: "hidden",
          margin: "12px 0",
        }}
      >
        <div
          style={{
            width: `${percent}%`,
            height: "100%",
            background: "#4f46e5",
            transition: "width 0.3s",
          }}
        />
      </div>
      <small>{percent}% complete</small>

      <h2>
        Step {step + 1} of {steps.length}: {current.title}
      </h2>
      {current.fields.map((f) => (
        <Field key={f[1]} field={f} value={data[f[1]]} onChange={onChange} />
      ))}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16 }}>
        <button disabled={step === 0} onClick={() => setStep(step - 1)}>Back</button>
        {isLast ? (
          <button onClick={onSubmit}>Submit application</button>
        ) : (
          <button onClick={() => setStep(step + 1)}>Next</button>
        )}
      </div>
    </div>
  );
}
