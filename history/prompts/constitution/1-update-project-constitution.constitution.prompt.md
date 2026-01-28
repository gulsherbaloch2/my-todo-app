---
id: 1
title: Update Project Constitution
stage: constitution
date: 2026-01-27
surface: agent
model: Qwen
feature: none
branch: main
user: user
command: /sp.constitution
labels: ["constitution", "setup", "full-stack"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - .specify/memory/constitution.md
 - .specify/templates/plan-template.md
 - .specify/templates/spec-template.md
 - .specify/templates/tasks-template.md
tests:
 - none
---

## Prompt

$ARGUMENTS

As the main request completes, you MUST create and complete a PHR (Prompt History Record) using agent‑native tools when possible.

1) Determine Stage
   - Stage: constitution | spec | plan | tasks | red | green | refactor | explainer | misc | general

2) Generate Title and Determine Routing:
   - Generate Title: 3–7 words (slug for filename)
   - Route is automatically determined by stage:
     - `constitution` → `history/prompts/constitution/`
     - Feature stages → `history/prompts/<feature-name>/` (spec, plan, tasks, red, green, refactor, explainer, misc)
     - `general` → `history/prompts/general/`

3) Create and Fill PHR (Shell first; fallback agent‑native)
   - Run: `.specify/scripts/bash/create-phr.sh --title "<title>" --stage <stage> [--feature <name>] --json`
   - Open the file and fill remaining placeholders (YAML + body), embedding full PROMPT_TEXT (verbatim) and concise RESPONSE_TEXT.
   - If the script fails:
     - Read `.specify/templates/phr-template.prompt.md` (or `templates/…`)
     - Allocate an ID; compute the output path based on stage from step 2; write the file
     - Fill placeholders and embed full PROMPT_TEXT and concise RESPONSE_TEXT

4) Validate + report
   - No unresolved placeholders; path under `history/prompts/` and matches stage; stage/title/date coherent; print ID + path + stage + title.
   - On failure: warn, don't block. Skip only for `/sp.phr`.

/sp.constitution

You are an expert Spec-Kit Plus consultant and full-stack software architect. Define the **Constitution for all specifications** for the "Hackathon To-Do Full-Stack Web Application" project. Follow these rules strictly:

1. **Project Context**
   - Phase II: Full-Stack Web Application
   - Stack: Next.js 16+ (App Router, TypeScript, Tailwind CSS), FastAPI, SQLModel, Neon PostgreSQL
   - Authentication: Better Auth with JWT
   - Features: Basic Level Task CRUD, User Authentication
   - Specs written must be **fully aligned with this project**.

2. **Spec Structure**
   - Every spec must include:
     - Title
     - Purpose
     - Scope / In-Scope
     - Out-of-Scope / Boundaries
     - User Stories
     - Acceptance Criteria
     - Dependencies
     - References using `@specs/...` format
   - Use proper Markdown formatting.
   - Include all necessary implementation details for Qwen Code to generate code accurately.

3. **Standards & Consistency**
   - Follow Spec-Kit Plus conventions.
   - Professional, clear, concise, unambiguous language.
   - Include validation rules, edge cases, and stack-specific details (FastAPI models, Next.js App Router patterns, Tailwind CSS classes).
   - Include API headers, JWT auth, and user filtering where relevant.

4. **Error-Free Implementation**
   - Specs must be implementation-ready.
   - No assumptions; all requirements explicitly stated.
   - Task ownership enforced in all specs referencing tasks.

5. **Cross-Referencing**
   - Reference related specs accurately: database (`users`, `tasks`), API (`/api/{user_id}/tasks`), frontend components (`/components`, `/app`).

6. **Output Format**
   - Return Constitution in Markdown.
   - Include table of sections for navigation.
   - Professional tone suitable for hackathon full-stack project.

**Goal:** This Constitution serves as the foundation for all project specs. All future Qwen Code CLI implementations must follow it strictly.

## Response snapshot

I've successfully updated the constitution and aligned the dependent templates. Here's a summary of what was accomplished:

1. Created a comprehensive constitution for the "Hackathon To-Do Full-Stack Web Application" project
2. Updated the constitution to include project-specific details:
   - Full-stack architecture with Next.js 16+, FastAPI, SQLModel, and Neon PostgreSQL
   - Type safety and validation requirements
   - Test-first development approach
   - Authentication-first design with Better Auth and JWT
   - Responsive and accessible UI requirements
   - API-first development practices
   - Security and performance standards

3. Updated dependent templates to align with the new constitution:
   - Modified the plan template with project-specific tech stack details
   - Updated the spec template with functional requirements aligned to the stack
   - Enhanced the tasks template with technology-specific implementation tasks

The constitution is now version 1.0.0 and all templates have been updated to reflect the project's technology stack and requirements. The constitution will serve as the foundation for all future specifications and implementations in the project.

## Outcome

- ✅ Impact: Created comprehensive project constitution and aligned templates
- 🧪 Tests: none
- 📁 Files: Updated constitution.md and 3 template files
- 🔁 Next prompts: Ready for feature specification work
- 🧠 Reflection: Successfully established foundational governance for the project

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Begin feature specification work