# ITHM Schedule

Lightweight, client-only timetable. Feeds on JSON, renders a live timeline, status card, and a scrollable calendar.

- Today’s type comes from data/calendar.json: normal | rest | special
- Loads the matching schedule and shows:
  - Timeline with progress
  - Current/Next card with countdown
  - Calendar strip for date preview
- One-day manual override via the Switch button
- Preview any date by clicking it in the calendar

## Data Layout (the only part you must plan)

- data/calendar.json
  - Map YYYY-MM-DD to a day type:
    - Normal: { "2025-10-12": { "type": "entry" } }
    - Rest: { "2025-10-13": { "type": "rest" } }
    - Special: { "2025-10-14": { "type": "special", "name": "Holiday", "schedule": "holiday-2025-10-14" } }
  - For special days, schedule points to a file in data/special-schedule (without extension).

- data/schedule/*.json (normal schedules)
  - One file per schedule type (e.g., entry.json, advanced.json, self-study.json), unless you remap file names via config.
  - File is an array of items:
    [
      { "name": "Math", "kind": "class", "period": "morning", "start": "09:00", "end": "09:45" }
    ]

- data/special-schedule/*.json (special schedules)
  - One file per special day pattern (e.g., holiday-2025-10-14.json).
  - Same array format as normal schedules.
  - Used only when calendar.json marks a day as "special".

Tip: Keep type keys in calendar.json aligned with file names in data/schedule for zero-config usage.

## Minimal Config (js/config.js)

- paths: where your JSON lives (calendar, scheduleDir, specialScheduleDir)
- scheduleTypes: display names/emojis per type (entry, advanced, self-study, special)
- switcher.types: which normal types users can manually choose

Optional:
- scheduleFiles/specialScheduleFiles mappings if your file names don’t match type/keys.

If you’re unsure, only adjust paths and switcher.types. Everything else is UI copy.

## Limitations

- Uses browser local time
- Static fetch of JSON (refresh to update)
- Single-day view + short preview window
- Assumes valid JSON structure
