<div align="center">
  <img src="public/brand/logo-navbar-dark.png" alt="Outpost" width="220" />

  <h1>Outpost</h1>
  <p><strong>An AI-native collaborative workspace where ideas become structured specifications, system architectures, and entity-relationship diagrams.</strong></p>
  <p>Chat with an autonomous agent that writes directly into your BlockNote document and builds on your infinite tldraw canvas in real time.</p>

  <p>
    <a href="https://outpost-seven-xi.vercel.app"><strong>🚀 Launch Live App</strong></a> ·
    <a href="#-problems-solved--key-benefits">Problems Solved</a> ·
    <a href="#-core-features">Features</a> ·
    <a href="#-architecture--tech-stack">Tech Stack</a> ·
    <a href="#-getting-started">Getting Started</a>
  </p>

  <p>
    <img alt="Next.js" src="https://img.shields.io/badge/Next.js-16-black?logo=next.js" />
    <img alt="React" src="https://img.shields.io/badge/React-19-149eca?logo=react&logoColor=white" />
    <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white" />
    <img alt="Prisma" src="https://img.shields.io/badge/Prisma-7-2d3748?logo=prisma&logoColor=white" />
    <img alt="Supabase" src="https://img.shields.io/badge/Supabase-Realtime-3ecf8e?logo=supabase&logoColor=white" />
    <img alt="Vercel AI SDK" src="https://img.shields.io/badge/Vercel_AI_SDK-7-black?logo=vercel" />
    <img alt="Google Gemini" src="https://img.shields.io/badge/Google-Gemini-4285f4?logo=google&logoColor=white" />
    <img alt="tldraw" src="https://img.shields.io/badge/tldraw-5-black" />
  </p>
</div>

---

## 🌐 Live Deployment

👉 **[Open Outpost Live (`outpost-seven-xi.vercel.app`)](https://outpost-seven-xi.vercel.app)**

---

## ✨ Overview

**Outpost** unifies an **agentic AI copilot**, a **CRDT-backed collaborative document editor**, and a **multiplayer infinite canvas** into a single split-pane environment. Instead of jumping between scattered Markdown editors, whiteboarding tools, and disconnected AI chat windows, teams describe what they are building and let the agent manipulate both surfaces simultaneously—drafting technical specifications in the document while generating system diagrams and custom ERD database tables on the canvas.

---

## 💡 Problems Solved & Key Benefits

| The Problem | How Outpost Solves It | Key Benefit |
| :--- | :--- | :--- |
| **Context fragmentation** across docs, whiteboards, and AI chatbots | Co-locates rich-text documentation (`BlockNote`) and visual diagramming (`tldraw`) side-by-side with a shared AI agent | **Zero context switching**—specs and diagrams evolve together in one workspace |
| **Copy-paste friction** from text-only AI assistants | Uses **Vercel AI SDK** tool-calling with **Google Gemini** (`includeThoughts`) to execute live mutations directly against both editors | **Instant visual & written output**—generate ERDs, architecture flows, and PRDs in one prompt |
| **Manual database schema diagramming** | Implements custom `entity-table` tldraw shapes with PK/FK badges, inline row editing, and row-level arrow snapping | **Production-ready ERDs** created via AI tools (`createEntityTable`, `connectRelationship`) or one-click UI |
| **State conflicts & data loss** in multiplayer editing | Combines **Yjs CRDTs** over **Supabase Realtime** for docs, `@tldraw/sync` for canvas multiplayer, and debounced **Prisma** persistence | **Conflict-free real-time collaboration** with durable PostgreSQL snapshots |
| **Race conditions in usage & billing enforcement** | Uses atomic **Prisma database transactions** (`$transaction`) integrated with **Clerk Billing** entitlements | **Strict, race-free quota enforcement** for monthly AI prompt limits and workspace tiers |
| **Sharing & offline handoff bottlenecks** | Provides token-based public read-only links plus client-side PDF generation via `@blocknote/xl-pdf-exporter` and `jsPDF` | **One-click stakeholder sharing** without requiring recipients to create an account |

---

## 🚀 Core Features

- **Autonomous Dual-Surface AI Agent:** Powered by **Google Gemini** via **Vercel AI SDK v7**, featuring real-time reasoning streams and client-executed tools that create, update, connect, and delete shapes, ERD tables, and document blocks.
- **Collaborative Rich-Text Documents:** Built on **BlockNote** with **Yjs** (`y-prosemirror`) and **Supabase Realtime** channels for live multi-cursor editing, slash commands, and structured technical writing.
- **Infinite Canvas & Custom ERD Engine:** Powered by **tldraw v5** and `@tldraw/sync`, featuring custom `entity-table` shapes with primary/foreign key indicators, dynamic row management, and automatic row-snapping connectors.
- **Flexible Workspace Views:** Seamlessly toggle between **Document**, **Both** (resizable split-pane via `react-resizable-panels`), and **Canvas** modes, plus drag-and-drop workspace organization (`@hello-pangea/dnd`).
- **Transactional Usage Metering & Auth:** Complete authentication, organization multi-tenancy, and subscription tier gating via **Clerk**, backed by atomic **Prisma 7** transactions (`@prisma/adapter-pg`) to track prompt allowances accurately.
- **Public Read-Only Links & PDF Export:** Generate revocable shareable URLs (`/shared/[token]`) or export crisp multi-page document PDFs and high-DPI canvas snapshots.
- **Voice-to-Prompt Dictation:** Built-in microphone dictation right inside the dashboard and workspace agent composer.

---

## 🖼️ Screenshots

<div align="center">
  <h3>Landing Page</h3>
  <img src="screenshots/Screenshot%20%282080%29.png" alt="Outpost landing page" width="100%" />
</div>

<br />

<div align="center">
  <h3>Dashboard & Prompt Composer</h3>
  <img src="screenshots/Screenshot%20%282082%29.png" alt="Outpost dashboard with the prompt composer and recent workspaces" width="100%" />
</div>

<br />

<div align="center">
  <h3>AI Agent Working Across Document & Canvas</h3>
  <img src="screenshots/Screenshot%20%282083%29.png" alt="Outpost workspace showing a document, generated workflow diagram, and agent chat" width="100%" />
</div>

<details>
  <summary><strong>View More Screenshots (Auth & Billing Plans)</strong></summary>
  <br />
  <p align="center"><strong>Account Creation & Onboarding</strong></p>
  <p align="center"><img src="screenshots/Screenshot%20%282081%29.png" alt="Outpost account creation screen" width="85%" /></p>
  <p align="center"><strong>Plans & Subscription Tiers</strong></p>
  <p align="center"><img src="screenshots/Screenshot%20%282084%29.png" alt="Outpost plans and pricing" width="85%" /></p>
</details>

---

## 🧰 Architecture & Tech Stack

| Layer | Technologies & Libraries | Role in Outpost |
| :--- | :--- | :--- |
| **Framework & Language** | **Next.js 16** (App Router), **React 19**, **TypeScript 5** | Server Components, Server Actions, streaming API routes, and end-to-end type safety |
| **AI & Streaming** | **Vercel AI SDK (`ai` v7)**, **`@ai-sdk/google` (Gemini)**, **Zod 4** | Streaming UI messages, chain-of-thought reasoning, and schema-validated client tool execution |
| **Infinite Canvas** | **tldraw v5**, **`@tldraw/sync`** | Multiplayer spatial canvas, custom `EntityTableShapeUtil`, and row-binding arrow snapping |
| **Collaborative Docs** | **BlockNote v0.57**, **Yjs**, **`y-prosemirror`**, **`y-protocols`** | Block-based rich text editor synchronized via conflict-free CRDT state updates |
| **Backend & Realtime** | **Supabase (`@supabase/supabase-js`)**, **PostgreSQL** | Realtime broadcast channels for Yjs document sync and persistent cloud database storage |
| **ORM & Transactions** | **Prisma 7**, **`@prisma/adapter-pg`** | Type-safe database queries, schema migrations, and atomic `$transaction` usage/quota accounting |
| **Auth & Billing** | **Clerk (`@clerk/nextjs` v7)** | User authentication, organization workspaces, and plan entitlement enforcement |
| **UI & Styling** | **Tailwind CSS 4**, **Radix UI**, **shadcn/ui**, **Lucide React**, **`react-resizable-panels`** | Responsive split-pane workspace, dark mode (`next-themes`), toast notifications (`sonner`), and DnD (`@hello-pangea/dnd`) |
| **Export Engine** | **`@blocknote/xl-pdf-exporter`**, **`jsPDF`** | High-resolution canvas-to-PDF rendering and structured Typst-backed document PDF exports |

---

## 🏁 Getting Started

### Prerequisites

- **Node.js** 20+ and **npm**
- **PostgreSQL** database (e.g., Supabase, Neon, or local Postgres)
- Configured accounts for **Clerk**, **Google AI Studio (Gemini)**, and **Supabase**

### 1. Clone & Install

```bash
git clone [https://github.com/PiyushKumar888/outpost.git](https://github.com/PiyushKumar888/outpost.git)
cd outpost
npm install