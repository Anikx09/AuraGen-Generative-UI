import { FIELDS } from "../data/fields";

// PLACEHOLDER for the LLM step (planned, not built yet).
// Groups the fields by section: one wizard step per section.
// Later this will call an LLM and the result will be checked with validateSteps().
export function generateWizardSteps(fields = FIELDS) {
  const steps = [];
  fields.forEach((f) => {
    let step = steps.find((s) => s.title === f[0]);
    if (!step) {
      step = { title: f[0], fields: [] };
      steps.push(step);
    }
    step.fields.push(f);
  });
  return steps;
}

// Safety check: every real field must appear exactly once, and no unknown field may be added.
export function validateSteps(steps, fields = FIELDS) {
  const used = steps.flatMap((s) => s.fields.map((f) => f[1]));
  const keys = fields.map((f) => f[1]);
  return used.length === keys.length && keys.every((k) => used.filter((u) => u === k).length === 1);
}
