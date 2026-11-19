# Prompt Engineering Notes (Session 2)

Notes from "Advanced Prompt Engineering and Structuring" and how they apply to AuraGen.

## Why prompt structure matters
LLMs are probabilistic, so the same prompt can give different results. A well-structured prompt gives more reliable and predictable output.

## The 5 parts of a good prompt
| Part | Meaning |
|---|---|
| Role | Who the AI is |
| Task | What it must do |
| Context | Relevant background |
| Format | The output structure |
| Constraints | The limits |

## Prompting styles
- Zero-shot: no examples in the prompt. Quick and simple, but less consistent on complex tasks.
- One-shot: one example of the expected output.
- Few-shot: a few examples. Most consistent, but the prompt is longer.

## System prompts
Rules given before the user speaks: AI role, tone and style, restrictions and output format.

## Structured output with JSON
JSON is easy for software to read, has a predictable structure and makes automation reliable.

## Planned AuraGen prompt (not implemented yet)
```
Role: You are a UX assistant for financial forms.
Task: Split the form fields below into 3 to 5 short wizard steps.
Context: Users are struggling with a long loan form.
Format: Return only JSON like {"steps":[{"title":"...","fields":["..."]}]}.
Constraints: Use only the fields I give you. Every field appears exactly once. Do not add new fields.
```

## Plan to handle hallucination
1. Validate the JSON returned by the model.
2. Check that every real field appears exactly once and no invented field appears.
3. If the check fails, fall back to the rule-based wizard from the prototype.
4. Start with zero-shot and move to few-shot if the output is inconsistent.
