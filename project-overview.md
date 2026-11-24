# AuraGen – Project Overview and Plan

> **Status: Planning phase.** No features are built yet. This file explains the problem, the idea and the plan.

## Problem
Long financial forms (loan, KYC, insurance) confuse people. Many users stop before finishing, and the form cannot tell they are struggling.

## Our Idea
1. **Watch** how the user behaves on the form:
   - Mouse movement
   - Hesitation (long pauses)
   - Rage clicks (many fast clicks)
2. **Detect** when the user is struggling.
3. **Generate** a simple step-by-step wizard of the same form using an LLM.
4. **Show** the wizard in React, so the form fixes itself.

## Planned Tech
| Part | Technology |
|---|---|
| Frontend | React.js, JavaScript, HTML, CSS |
| Live communication | WebSockets |
| AI | LLMs, Generative AI |

## Planned Flow
User behaviour → Event tracker (React) → WebSocket → Struggle detector → LLM wizard generator → React wizard

## Roadmap
- [ ] Set up React project
- [ ] Build a sample long financial form
- [ ] Track mouse, hesitation and rage clicks
- [ ] Set up WebSockets
- [ ] Write the struggle-detection logic
- [ ] Connect the LLM to generate wizard steps
- [ ] Show the wizard in React
- [ ] Testing and documentation

## Team Work Rule
Each member works on their own branch (example: `anika-aura-gen`). The Team Lead merges branches into `main`.

## Internship
Made as part of the internship at **Infotact Solutions**.
