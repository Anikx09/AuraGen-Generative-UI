// One form field: a dropdown for "select" fields, otherwise a normal input.
export default function Field({ field, value, onChange }) {
  const [, key, label, type, options] = field;
  return (
    <div className="field">
      <label htmlFor={key}>{label}</label>
      {type === "select" ? (
        <select id={key} value={value || ""} onChange={(e) => onChange(key, e.target.value)}>
          <option value="">Select…</option>
          {options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      ) : (
        <input id={key} type={type} value={value || ""} onChange={(e) => onChange(key, e.target.value)} />
      )}
    </div>
  );
}
