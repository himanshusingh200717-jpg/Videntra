# VIDENTRA

## Surveillance Evidence Intelligence

**From DVR Data to Court-Ready Evidence.**

A multi-vendor DVR/NVR forensic analysis platform for standardized acquisition, recovery, and analysis of surveillance evidence.

## Problem Statement

Development of a Multi-Vendor DVR/NVR Forensic Analysis Tool for Standardized Acquisition, Recovery and Analysis of Surveillance Evidence.## 🌐 Live Demo

### VIDENTRA — Surveillance Evidence Intelligence

🔗 **[Launch VIDENTRA](https://videntra.vercel.app/)**

Explore the interactive forensic investigation workflow, including:

- 📹 Multi-vendor DVR/NVR acquisition
- 🔐 SHA-256 evidence verification
- ♻️ Deleted & corrupted footage recovery
- 🧠 Video intelligence and event detection
- 🕒 Investigation timeline reconstruction
- ⛓️ Chain of custody & audit trail
- 📑 Forensic report generation

> **Note:** This hackathon prototype uses simulated forensic data in Demo Mode to demonstrate the end-to-end workflow.

## Features

- **Multi-vendor acquisition** — Hikvision, Dahua, CP Plus, Uniview, Axis, and generic DVR/NVR systems
- **Evidence verification** — SHA-256 cryptographic hashing for every evidence item
- **Forensic recovery** — Deleted video, fragment, corrupted index, raw stream, metadata, and file carving recovery methods
- **Video intelligence** — Motion, person, vehicle, face, and object detection
- **Timeline reconstruction** — Chronological event visualization across cameras
- **Chain of custody** — Tamper-evident audit trail with full integrity verification
- **Forensic reporting** — Court-ready report generation with customizable sections
- **Investigation management** — Case tracking with pipeline visualization
- **Interactive demo mode** — Full forensic workflow demonstration without external APIs

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Lucide React

## Installation

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Output is generated in the `dist/` directory.

## Deployment

### GitHub

1. Push the repository to GitHub
2. Ensure `npm run build` succeeds locally

### Vercel

1. Import the repository into Vercel
2. Framework preset: Vite
3. Build command: `npm run build`
4. Output directory: `dist`
5. The included `vercel.json` configures SPA routing so all routes work on refresh

## Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/dashboard` | Forensic command center |
| `/investigations` | All cases |
| `/investigations/:id` | Case detail |
| `/evidence` | Evidence explorer |
| `/evidence/:id` | Forensic video viewer |
| `/acquisition` | Acquisition wizard |
| `/recovery` | Recovery lab |
| `/analysis` | Analysis workspace |
| `/timeline` | Investigation timeline |
| `/devices` | DVR/NVR devices |
| `/reports` | Report generation |
| `/audit` | Chain of custody |
| `/settings` | Platform settings |

## License

This is a hackathon prototype. All data is mock/demo data.
