# AuraGen Prototype Guide

File: `auragen-prototype.html` (React 18, runs in the browser, no install needed).

## How to run
1. Download `auragen-prototype.html`.
2. Open it in Chrome (internet is needed because React loads from a CDN).

## What it does
1. Shows a long loan application form (18 fields in 5 sections).
2. Watches how the user behaves while filling the form.
3. Calculates a live struggle score from 0 to 100.
4. When the score reaches 60, the form turns into a step-by-step wizard and keeps the user's answers.

## Behaviour tracker
| Signal | How it is detected | Score added |
|---|---|---|
| Erratic mouse movement | 6 quick left-right direction changes | +10 |
| Rage click | 4 clicks within 1.5 seconds | +25 |
| Hesitation | 6 seconds on one field without typing | +15 |

The score goes down by 2 every second, so a calm user is not penalised for long.

## Wizard
Steps are created by `generateWizardSteps()`. Right now it groups the fields by section (5 steps). This is a rule-based placeholder.

## What is not built yet
- WebSocket connection between browser and server
- Struggle score calculated on a backend
- Real LLM call to generate the wizard steps
- Database and deployment

## Next steps
1. Move the code into a Vite React project with separate components.
2. Build a Node.js WebSocket server.
3. Connect an LLM API to replace the placeholder.
