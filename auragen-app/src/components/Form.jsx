import Field from "./Field";
import { FIELDS } from "../data/fields";

// Shows the long loan form, one section at a time.
export default function Form({ data, onChange, onSubmit }) {
  const sections = [...new Set(FIELDS.map((f) => f[0]))];
  return (
    <div>
      {sections.map((title) => (
        <section key={title}>
          <h2>{title}</h2>
          {FIELDS.filter((f) => f[0] === title).map((f) => (
            <Field key={f[1]} field={f} value={data[f[1]]} onChange={onChange} />
          ))}
        </section>
      ))}
      <button onClick={onSubmit}>Submit application</button>
    </div>
  );
}
