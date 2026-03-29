# ContentFlow AI - Multi-Agent Enterprise Content Automation System

Problem Statement - 1: AI for Enterprise Content Operations
ContentFlow AI is an agent-based system that automates the complete lifecycle of enterprise content - from creation to compliance validation and multi-channel distribution.

The system is designed to simulate real-world enterprise workflows by coordinating multiple specialized AI agents that collaborate to generate, review, and transform content with minimal human intervention.

---

## What the Project Does

ContentFlow AI takes a topic or product description as input and processes it through a structured multi-agent pipeline:

1. **Drafter Agent**
   - Generates a professional blog-style draft based on the input
   - Ensures structured and audience-relevant content creation

2. **Compliance Review Agent**
   - Validates content against predefined compliance rules
   - Detects risky or non-compliant claims (e.g., "guaranteed returns", "no risk")
   - Flags issues and automatically rewrites content to ensure safe and professional tone

3. **Publisher / Output Agent**
   - Transforms the validated content into platform-specific formats:
     - LinkedIn post (professional tone)
     - Twitter/X post (concise and engaging)
     - FAQ section (user-focused clarity)

---

## Key Features

- **Multi-Agent Architecture**
  - Clear separation of responsibilities across agents
  - Sequential handoff between agents with structured outputs

- **Compliance Guardrails**
  - Rule-based detection of unsafe or misleading claims
  - Automatic correction and safer content generation

- **Multi-Channel Content Generation**
  - Adapts a single input into multiple content formats
  - Tailors tone and structure based on platform

- **Agent Execution Logs**
  - Step-by-step trace of agent actions
  - Improves transparency and auditability

---

## Problem Solved

Enterprise content creation is often slow, inconsistent, and requires multiple teams for drafting, review, and publishing. ContentFlow AI reduces this overhead by automating the workflow and ensuring:

- Faster content turnaround
- Consistent tone and compliance
- Scalable multi-platform content generation

---

## Why This Stands Out

Unlike simple AI text generators, this system demonstrates:

- Multi-step agent coordination
- Decision-making with compliance enforcement
- Structured workflow automation

It aligns with real enterprise requirements by combining generation, validation, and transformation into a single intelligent pipeline.

---

## Tech Stack

- Frontend: React + TypeScript + Vite
- Backend: Node.js + Express
- Styling: Tailwind CSS

---

## Project Structure

```text
project/
  server/               # Express backend API
  src/                  # React frontend
  package.json          # Scripts + dependencies
  .gitignore
```

---

## Prerequisites

Install these on the target machine:

- Node.js 18+ (recommended: Node.js 20 LTS)
- npm 9+ (comes with Node.js)
- Git

Check versions:

```bash
node -v
npm -v
git --version
```

---

## Setup on a New System

1. **Clone the repository**

```bash
git clone <your-repo-url>
cd <repo-folder>/project
```

2. **Install dependencies**

```bash
npm install
```

3. **(Optional) Create environment file**

If your future version uses environment variables, create:

```bash
.env
```

Current version runs without additional required env configuration.

---

## Run the Project Locally

Open two terminals in the `project` folder.

### Terminal 1: Start backend

```bash
npm run server
```

Backend URL: `http://localhost:3001`

### Terminal 2: Start frontend

```bash
npm run dev
```

Frontend URL: `http://localhost:5173`

Open `http://localhost:5173` in your browser.

---

## Available Scripts

From the `project` directory:

- `npm run dev` - Start frontend dev server
- `npm run server` - Start backend server
- `npm run build` - Build frontend for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type-check

---

## API Overview

### `POST /runPipeline`

Request body:

```json
{
  "topic": "AI-powered productivity tools for remote teams"
}
```

Response shape:

```json
{
  "draft": "...",
  "compliance": {
    "issues": [],
    "fixedContent": "..."
  },
  "outputs": {
    "linkedin": "...",
    "twitter": "...",
    "faq": "..."
  },
  "logs": []
}
```

---

## Troubleshooting

- **`vite is not recognized`**
  - Run `npm install` in the `project` folder.

- **Type errors on startup**
  - Run `npm run typecheck` and fix reported issues.

- **Port already in use**
  - Change ports in frontend/backend config or stop conflicting processes.

---

## Hackathon Submission Notes

- `.gitignore` is configured to keep repository clean (dependencies, env files, build outputs, logs, editor files are ignored).
- Make sure you commit:
  - Source code
  - `package.json`
  - `package-lock.json`
- Do not commit:
  - `node_modules/`
  - `.env` files
  - `dist/` and other generated artifacts

