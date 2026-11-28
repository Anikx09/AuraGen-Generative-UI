# How to run AuraGen

## What you need
- Node.js (LTS) from https://nodejs.org
- Git from https://git-scm.com
- A GitHub account that has been added to the repo

## Steps
1. Download the project:
```
git clone https://github.com/Anikx09/AuraGen-Generative-UI.git
cd AuraGen-Generative-UI
```
2. Create your own branch (use your name):
```
git checkout -b yourname-aura-gen
```
3. Install and start the app:
```
cd auragen-app
npm install
npm run dev
```
4. Open http://localhost:5173/ in Chrome.

## What you should see
A long loan form. Click "Simulate struggle" three times (or click one spot quickly, or stay on one field for 6 seconds). The form changes into a step-by-step wizard and keeps your answers.

## If something goes wrong
- "npm is not recognized": install Node.js and open a new terminal.
- Red error on the page: run `git pull origin yourname-aura-gen` or `git status` and check that all files are present.
- Backup: open `auragen-prototype.html` in Chrome (needs internet). It shows the same flow in one file.

## Working rules
- Commit only to your own branch (`yourname-aura-gen`), never to `main`.
- Commit real work on different days. The Team Lead merges branches into `main`.
- Before committing run `git branch` and check the `*` is on your branch.

## Project files
See README.md for the structure, architecture.md for the plan and learning-notes.md for the class notes.
