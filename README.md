# AuraGen – Self-Healing Generative UI from Cognitive Load

AuraGen is a Generative AI project that watches how users interact with a long financial form (mouse movement, hesitation and rage clicks), detects when they are struggling, and turns the form into a short step-by-step wizard.

Built during the internship at **Infotact Solutions** (Generative AI domain).

## Problem
Long financial forms (loan, KYC, insurance) confuse people. Many users give up before finishing, and the form cannot tell they are struggling.

## Current status
| Part | Status |
|---|---|
| Loan form (18 fields, 5 sections) as React components | Done |
| Behaviour tracker (mouse, rage clicks, hesitation) | Done |
| Struggle score and live event log | Done |
| Switch from form to wizard when the score passes 60 | Done |
| Wizard steps | Rule-based placeholder (one step per section) |
| WebSocket server | Planned (Week 3) |
| LLM-generated wizard steps with output validation | Planned (Week 4) |
| Session storage and deployment | Planned (Week 4) |

## How it works
1. The user fills the long form.
2. `useTracker` watches mouse movement, rage clicks (4 clicks in 1.5 s) and hesitation (6 s on a field without typing) and adds to a struggle score from 0 to 100. The score cools down over time.
3. At a score of 60 the app switches to the wizard, and the user's answers are kept.
4. The user can go back to the full form at any time.

## Run the project
Requires Node.js.

```
git clone https://github.com/Anikx09/AuraGen-Generative-UI.git
cd AuraGen-Generative-UI/auragen-app
npm install
npm run dev
```

Open http://localhost:5173/. Click "Simulate struggle" a few times to see the wizard.

## Project structure
```
auragen-app/src
  App.jsx               main screen, switches between form and wizard
  components/Field.jsx  one input or dropdown
  components/Form.jsx   full form, grouped by section
  components/Wizard.jsx step-by-step view
  hooks/useTracker.js   behaviour tracking and struggle score
  data/fields.js        form field definitions and threshold
  utils/wizard.js       step generator (placeholder) and validator
```

## Documentation
- `project-overview.md`, `architecture.md`, `work-distribution.md`
- `learning-notes.md`, `prompt-engineering-notes.md`, `prototype-guide.md`

## Planned LLM approach
The LLM will receive the form fields and return wizard steps as JSON. The code will check that every real field appears exactly once and no new field is added. If the check fails, the rule-based wizard is used instead.

## Team and workflow
Each member works on their own branch (`name-aura-gen`), and the Team Lead merges into `main`.
