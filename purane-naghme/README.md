# Purane Naghme — Old Songs Radio

A single-page nostalgia music site built with Next.js (App Router) + TypeScript + Tailwind v4.

## Run it

```bash
npm install
npm run dev
```

Build note: `next/font` fetches Baloo 2 / Inter from Google Fonts at build time, so the
build machine needs normal internet access (it will fail in network-locked sandboxes).

## What's real vs. placeholder

- **`public/bg/scene-wide.png`** — the landscape scene you supplied, wired up as the
  desktop/landscape hero background.
- **`public/bg/scene-tall.png`** — a **temporary center-crop stand-in** for the portrait
  background. Your spec calls for a separately composed portrait piece, not a crop — swap
  this file out with the real one whenever it's ready; no code changes needed.
- **Songs** — pulled straight from your song list PDF (40 tracks, grouped by key). Since no
  audio or cover art was supplied, each song points to a predictable placeholder path:
  - `public/audio/<slug>.mp3` — drop matching files in and playback works immediately.
  - `public/covers/<slug>.jpg` — not wired to an `<img>` yet; the vinyl currently renders a
    tinted disc with the song's initials so the UI never shows a broken image. Swap in real
    cover art by pointing `Vinyl`'s background onto `song.cover` in `components/Player.tsx`.
  - The `key` (D Major, A Major, C Major, F Major) is shown where an artist name would go —
    replace `lib/songs.ts`'s `key` usage with real artist data whenever you have it.
- Listener count is a gently drifting ambient number, not a real metric.
- Social links point at placeholder profile URLs — update `components/SocialLinks.tsx`.

## Structure

```
app/
  layout.tsx      — fonts, metadata, viewport-fit: cover, Analytics + Speed Insights
  page.tsx         — server component: background, grain, top row, player
  globals.css      — Tailwind v4 @theme tokens, hero-bg, grain, glass/seek utilities
components/
  Player.tsx       — client component: desktop pill + mobile stacked card
  Clock.tsx        — client component: live clock
  ListenerCount.tsx — client component: ambient listener count
  SocialLinks.tsx  — server component: icon links
lib/
  songs.ts         — song data derived from the provided PDF
public/bg/         — hero background art
```
