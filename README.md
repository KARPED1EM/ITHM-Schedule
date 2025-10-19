<div align="center">

  <img width="140" src="favicon.svg" alt="ITHM Schedule icon">

  </br>

  <h1>🕒 ITHM Schedule</h1>
  <p><i>A zero-backend timetable viewer with a live timeline, countdown, and interactive calendar — fully driven by JSON.</i></p>

  [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/KARPED1EM/ITHM-Schedule)

</div>

---

## ✨ Features

- ⏳ **Live rail & countdown** — timeline updates every second, hitting 100% fill when the day ends.  
- 📅 **Interactive calendar** — preview schedules and test “what-if” scenarios.  
- 🕓 **Timezone & clock options** — browser-side persistence for UTC offsets and 12/24-hour formats.  
- 🪶 **Zero backend** — just static assets. Works anywhere you can serve `index.html`.

---

## 🚀 Quick Start

1. Serve the project locally:
```bash
   npx serve .
```

Or just open `index.html` directly in your browser.

2. Edit JSON files under `data/` to match your own schedule. Sample data is included out of the box.

---

## 🗂️ Data Structure

| File                           | Purpose                                                           |
| ------------------------------ | ----------------------------------------------------------------- |
| `data/calendar.json`           | Maps `YYYY-MM-DD` → `type` (`"entry"`, `"rest"`, `"special"`...). |
| `data/schedule/*.json`         | Defines daily blocks (normal schedule types).                     |
| `data/special-schedule/*.json` | Custom timetables for `"special"` days.                           |
| `js/config.js`                 | UI labels, emoji, manual switcher, file aliases.                  |

### 📝 Example — `calendar.json`

```jsonc
{
  "2025-10-12": { "type": "entry" },
  "2025-10-15": { "type": "special", "name": "Campus Festival", "schedule": "festival-day" },
  "2025-10-16": { "type": "rest" }
}
```

---

## 🛠️ Settings & Persistence

Click the ⚙️ icon to:

* Pick a timezone (`UTC+/-hh[:mm]`, `GMT+/-hh`, etc.).
* Switch between 12 h / 24 h display.

Changes save to `localStorage` only after hitting **Save**, so you can play around safely.
Timezone shifts apply globally — timeline, countdown, calendar, greetings all stay in sync.

---

## 🌐 Deployment

* 🏗️ **Static Hosting:** Drop the folder on any CDN (GitHub Pages, Netlify, Cloudflare Pages...).
* ▲ **Vercel:** One-click deploy via the button above.
* 💡 Note: The app fetches JSON with `fetch()`. To enable dynamic updates, host over `http(s)://` instead of `file://`.

---

<div align="center">

  <h3>💬 Built for flexibility — drop in your own timetable and go.</h3>

</div>
