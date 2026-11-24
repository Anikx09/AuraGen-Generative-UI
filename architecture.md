# AuraGen Architecture (Planned)

Status: the frontend prototype exists. The backend, WebSocket and LLM parts are planned and not built yet.

## Flow
User fills the long form -> Tracker records behaviour -> Events go to the server over WebSocket -> Server calculates the struggle score -> If the score is high, the LLM creates wizard steps -> Frontend shows the step-by-step wizard

## Components
| Part | Technology | Status |
|---|---|---|
| Form and wizard UI | React | Prototype done (auragen-prototype.html) |
| Behaviour tracker | JavaScript event listeners | Prototype done |
| Struggle score | Runs in the browser | Prototype done, to move to the server |
| WebSocket server | Node.js | Planned (Week 3) |
| LLM wizard generator | LLM API | Planned (Week 4) |
| Session storage | SQLite or MongoDB | Planned (Week 4) |
| Deployment | Vercel and Render | Planned (Week 4) |

## Data sent by the tracker (planned)
- Event type: mouse, hesitation or rage click
- Field name where it happened
- Timestamp
- Session ID

## Wizard step format (planned, JSON)
Each step has a title and a list of field names, for example: a step called "Personal Details" with the fields fullName, dob and mobile.

## Design decisions
- Answers typed by the user are kept when the form changes into the wizard.
- The user can always return to the full form.
- The score cools down over time, so a short problem does not trigger the wizard.
