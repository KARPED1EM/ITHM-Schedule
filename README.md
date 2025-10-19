# ITHM Schedule

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/KARPED1EM/ITHM-Schedule)

A zero-backend timetable viewer with a live timeline, countdown card, and interactive calendar. It ships with the ITHeiMa curriculum, but every screen is driven by JSON so you can swap in your own plan quickly.

## Highlights
- Live rail and status card that tick every second, including a 100% rail fill once the day is done
- Calendar preview plus a manual schedule switcher for quick what-if checks
- Browser-side persistence for timezone (UTC offsets) and 12/24 hour display
- Pure static assets - drop the folder on any static host or open `index.html`

## Quick Start
1. Serve the directory with any static server (`npx serve .`) or open `index.html` directly.
2. Edit the JSON files under `data/` to match your timetable; sample data is included.

## Data Files at a Glance
- `data/calendar.json` - map `YYYY-MM-DD` to a schedule `type`, `"rest"`, or `"special"`. Omit a date to treat it as rest without showing a badge.
- `data/schedule/*.json` - arrays of blocks with `name`, `kind`, `period`, `start`, `end`. Used by normal schedule types (`entry`, `advanced`, `self-study`, ...).
- `data/special-schedule/*.json` - optional detailed timetables for `"special"` days; reference them from the calendar via the `schedule` or `scheduleKey` field (filename without `.json`).
- `js/config.js` - tweak labels, emoji, manual switcher options, and file aliases without touching the core logic.

```jsonc
{
  "2025-10-12": { "type": "entry" },
  "2025-10-15": { "type": "special", "name": "Campus Festival", "schedule": "festival-day" },
  "2025-10-16": { "type": "rest" }
}
```

## Settings & Persistence
Open the gear button next to GitHub to pick a timezone (`UTC+/-hh[:mm]`, `GMT+/-hh`, etc.) and choose 12 h or 24 h clocks. Changes are written to `localStorage` only when you hit **Save**, so you can experiment freely before committing.

Timezone adjustments are applied on top of the real UTC clock, so every component (timeline, countdowns, calendar, greetings) stays in sync regardless of the browser's locale.

## Deployment
- Static: upload the folder to any CDN (GitHub Pages, Netlify, Cloudflare Pages, etc.).
- Vercel: use the one-click button above; no build step is required.

The app fetches JSON with `fetch()`, so host it over HTTP(S) rather than the `file://` protocol if you want dynamic updates. JSON changes take effect after a refresh.
