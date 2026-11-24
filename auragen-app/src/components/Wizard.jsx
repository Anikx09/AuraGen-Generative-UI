import { useState } from "react";
import Field from "./Field";

// Shows the form one section at a time, with Back and Next buttons.
export default function Wizard({ steps, data, onChange, onSubmit, onShowFullForm }) {
  const [step, setStep] = useState(0);
  const current = steps[step];
  const isLast = step === steps.length - 1;

  return (
    <div>
      <p>
        We split the form into {steps.length} short steps. Your answers are kept.{" "}
        <button onClick={onShowFullForm}>Show full form</button>
      </p>
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
