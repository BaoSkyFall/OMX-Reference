# OMX Reference

> Interactive reference guide to all **33 Agent Prompts** and **36 Workflow Skills** in [oh-my-codex](https://github.com/chriscarrollsmith/oh-my-codex) (OMX).

Built with **React + Vite + Lucide Icons**, bundled into a single portable HTML file.

## What Is This?

[oh-my-codex](https://github.com/chriscarrollsmith/oh-my-codex) is a multi-agent orchestration layer for Codex CLI. It ships with **33 specialized agent prompts** (analyst, architect, executor, debugger, etc.) and **36 workflow skills** (autopilot, ralph, team, tdd, etc.).

This app consolidates all of them into a single searchable, filterable, interactive reference so you can quickly find the right prompt or skill for any task.

## Features

| Feature | Description |
|---------|-------------|
| **Full-text Search** | Search across names, descriptions, purposes, aliases, and usage guides |
| **Type Filter** | Toggle between All / Prompts / Skills |
| **9 Category Filters** | Planning, Review, Execution, Testing, Research, Product, Workflow, Utility, Git |
| **Expandable Cards** | Click any card to see purpose, mode, when to use, and use cases |
| **Lucide SVG Icons** | Proper vector icons for every category, prompt, and skill |
| **Single HTML Build** | Portable `dist/index.html` — works offline in any browser |

## Categories

| Category | Prompts | Skills |
|----------|---------|--------|
| Planning & Analysis | analyst, architect, critic, planner | analyze, deep-interview, plan, ralplan |
| Code Review & Quality | api-reviewer, code-reviewer, performance-reviewer, quality-reviewer, security-reviewer, style-reviewer | code-review, review, security-review |
| Execution & Implementation | build-fixer, code-simplifier, debugger, designer, executor, sisyphus-lite | ai-slop-cleaner, build-fix, frontend-ui-ux, web-clone |
| Testing & Verification | qa-tester, quality-strategist, test-engineer, verifier | tdd, ultraqa, visual-verdict |
| Research & Documentation | dependency-expert, explore, researcher, writer | deepsearch |
| Product & UX | information-architect, product-analyst, product-manager, ux-researcher | — |
| Workflow & Orchestration | team-executor, team-orchestrator | autopilot, pipeline, ralph, ralph-init, swarm, team, ultrawork, worker |
| Utility & Configuration | explore-harness, vision | ask-claude, ask-gemini, cancel, configure-notifications, doctor, ecomode, help, hud, note, omx-setup, skill, trace |
| Git & Version Control | git-master | git-master |

## Quick Start

```bash
# Install dependencies
npm install

# Dev server
npm run dev
# → http://localhost:5173

# Build single HTML file
npm run build
# → dist/index.html (246 KB)
```

## Tech Stack

- **React** — UI components
- **Vite** — Build tooling
- **Lucide React** — SVG icon library
- **vite-plugin-singlefile** — Bundles everything into one HTML file

## License

MIT
