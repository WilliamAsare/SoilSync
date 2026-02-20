# 🌱 SoilSync — AI Soil Intelligence for African Farmers

> Built for the MIT Africa Hackathon 2025

SoilSync solves a critical problem: African smallholder farmers make planting and logistics decisions without accurate soil data, leading to low yields, wasted inputs, post-harvest losses, and unstable income.

**Our solution:** Snap a photo of soil → AI delivers instant soil intelligence, crop planning, shelf-life prediction, and transport coordination.

---

## The Problem

- 600M+ smallholder farmers lack access to affordable soil testing
- Up to 40% of harvests are lost post-harvest due to poor planning
- Farmers sell at harvest-time price lows, missing 30–50% potential income
- Wrong crop choices for soil type lead to systematically low yields

## The Solution

| Feature | What it does |
|---|---|
| 📸 Soil Analysis | Camera/upload photo → AI detects pH, nutrients (N, P, K), soil type, moisture |
| 🌾 Crop Planning | Top 5 crop recommendations ranked by soil suitability with yield estimates |
| ⏱ Shelf-Life Prediction | Per-crop storage duration, methods, and urgency flags |
| 🚛 Transport Coordination | Market timing, transport methods, and income-maximizing sell-time advice |

---

## Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment
```bash
cp .env.example .env.local
# Add your Anthropic API key to .env.local
```

### 3. Run development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

> **Demo mode:** The app works fully without an API key using realistic demo data.

---

## Tech Stack

- **Framework:** Next.js 16 (App Router) + TypeScript
- **Styling:** Tailwind CSS v4
- **AI:** Claude Sonnet 4 (Anthropic) via `@anthropic-ai/sdk`
- **Icons:** Lucide React

## App Structure

```
src/
├── app/
│   ├── page.tsx           # Landing page
│   ├── analyze/page.tsx   # Camera capture + upload
│   ├── results/page.tsx   # Full analysis results
│   ├── dashboard/page.tsx # Farm dashboard + history
│   └── api/analyze/       # AI analysis endpoint
├── components/
│   └── Navigation.tsx
├── lib/
│   ├── anthropic.ts       # Claude AI integration
│   └── demo-data.ts       # Demo/fallback data
└── types/
    └── soil.ts            # TypeScript interfaces
```

## How the AI Works

The app sends soil photos to Claude's vision API with a detailed prompt instructing it to analyze:

- **Color** → organic matter, iron content, salinity indicators
- **Texture** → sandy/clay/loam classification
- **Moisture** → visual moisture level detection
- **Structure** → compaction, drainage, soil health

Claude returns structured JSON with soil health scores, nutrient estimates, crop recommendations with shelf-life data, and transport/logistics advice.

---

## Deployment

Deploy to Vercel:

```bash
npx vercel
```

Set `ANTHROPIC_API_KEY` in your Vercel environment variables.

---

*SoilSync — Empowering African farmers with AI intelligence, one soil photo at a time.*
