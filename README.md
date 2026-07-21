# MoatHero — AI Search Consensus Auditor

MoatHero helps growth teams assess whether their website and public social profiles present a consistent entity signal to AI-assisted search. It combines a Gemini-powered consensus analysis, social-profile alignment checks, browser-local before/after telemetry, and ready-to-copy `sameAs` JSON-LD recommendations.

## Live demo

- App: [moathero.vercel.app](https://moathero.vercel.app)
- Judge access: enter any valid email address and the demo access code `moathero-demo`.

The Build Week demo intentionally uses a browser-local access gate. It does not create accounts, request Google OAuth permissions, or require Firebase configuration.

## What judges can test

1. Open the live demo and enter the judge access code.
2. Enter a domain and a concise description of the business.
3. Run **Audit Moat** to receive:
   - a Consensus Index;
   - citation-density and share-of-voice estimates;
   - social-profile alignment findings and Gemini-generated bio recommendations.
4. Lock the Consensus Index as a baseline, change the input if desired, and run another audit to view the browser-local delta.
5. Select discovered social profiles and use **Generate & Copy Schema** to create an `Organization` + `sameAs` JSON-LD snippet.

## Current feature scope

| Capability | What it does now |
| --- | --- |
| Consensus Index | Uses public search-result snippets plus Gemini analysis to return a live audit score. |
| Social alignment | Audits public social-profile signals and proposes more consistent bios. |
| Telemetry | Stores an audit baseline in the current browser and shows the delta after a later audit. It is not yet cross-device or scheduled historical tracking. |
| Schema recommendations | Validates selected HTTP(S) profile URLs and generates a copyable Schema.org `Organization`/`sameAs` JSON-LD block. It does not yet crawl and validate existing schema on a site. |

## Built with Codex and GPT-5.6

MoatHero was built iteratively in Codex for OpenAI Build Week.

- I started with **GPT-5.6 Terra at Medium reasoning** to turn the product concept into the React/Vite interface, the Vercel API shape, and the first audit experience.
- I switched to **Extra High reasoning** for the deadline-critical pass: tracing runtime failures, updating the Gemini model integration, adding retry handling for temporary model capacity errors, testing the public deployment, simplifying judge access, and tightening the product claims to match the working implementation.
- Codex was also used to inspect the live app, exercise the audit and schema endpoints, and refine the deployment and judge-testing workflow.

Key technical decisions made during this process:

- use Gemini for the semantic-consensus and profile-alignment analysis;
- use public search snippets as an auditable input rather than claim direct access to proprietary AI-search telemetry;
- make the Build Week experience self-contained with browser-local telemetry and a no-configuration demo gate;
- generate copyable JSON-LD rather than claiming automatic modification of a user's site.

## Architecture

```text
React + Vite client
  ├── /api/social_audit          public-profile discovery and analysis input
  ├── /api/align_descriptions    Gemini-powered semantic alignment
  ├── /api/citation_sov          public search snippets + Gemini consensus analysis
  └── /api/inject_social_schema  Organization/sameAs JSON-LD generator
```

## Local setup

### Prerequisites

- Node.js 18 or later
- pnpm
- A Gemini API key for the audit endpoints

### Install and run the interface

```bash
git clone https://github.com/tanDivina/moathero.git
cd moathero
pnpm install
pnpm run dev
```

### Run the full stack locally

The audit endpoints are Vercel serverless functions and require `GEMINI_API_KEY`.

```bash
npm install --global vercel
vercel link
vercel env pull .env.local
vercel dev
```

Alternatively, create `.env.local` with:

```text
GEMINI_API_KEY=your_gemini_api_key
```

Never commit `.env.local` or a real API key.

## Deployment

The project is deployed on Vercel. Configure `GEMINI_API_KEY` in the Vercel project environment for Development, Preview, and Production before deploying.

```bash
vercel --prod
```

## Next steps

- Add authenticated, persistent projects and scheduled Search Console-based telemetry.
- Build a server-side schema crawler and validator with safe URL-fetching controls.
- Add historical charts and exportable audit reports.
