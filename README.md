# ITHM Schedule

A lightweight, client-side timetable application that displays daily schedules with live timeline tracking, progress indicators, and an interactive calendar.

**ITHM** stands for **ITHeiMa** (IT黑马), and the default configuration is based on that institution's curriculum. However, you can easily customize it for your own use by modifying the data files and configuration.

## Features

- **Live Timeline**: Real-time progress tracking for current activities
- **Status Card**: Shows current/next activity with countdown timer
- **Interactive Calendar**: Preview any date by clicking on the calendar
- **Manual Override**: Temporarily switch between different schedule types
- **Flexible Configuration**: Support for normal schedules, rest days, and special events

## Configuration

### 1. Calendar Definition (`data/calendar.json`)

The calendar file maps dates (YYYY-MM-DD format) to schedule types. Each date can be:

**Normal Day** - Uses a predefined schedule type:
```json
{
  "2025-10-12": { "type": "entry" },
  "2025-10-13": { "type": "advanced" }
}
```

**Rest Day** - No schedule for the day:
```json
{
  "2025-10-14": { "type": "rest" }
}
```

**Special Day** - Custom event or arrangement:

Special days can exist with just a name (no detailed timetable):
```json
{
  "2025-10-15": { 
    "type": "special", 
    "name": "考试" 
  }
}
```

Or with a detailed timetable file reference:
```json
{
  "2025-10-16": { 
    "type": "special", 
    "name": "Holiday", 
    "schedule": "holiday-2025-10-16" 
  }
}
```

When the `schedule` field is provided, it should point to a JSON file (without extension) in the `data/special-schedule/` directory.

### 2. Normal Schedule Files (`data/schedule/*.json`)

Each normal schedule type needs a corresponding JSON file. For example:
- `entry.json` for `"type": "entry"`
- `advanced.json` for `"type": "advanced"`
- `self-study.json` for `"type": "self-study"`

**File Format**: Each schedule file is an array of time blocks:

```json
[
  {
    "name": "Math Class",
    "kind": "class",
    "period": "morning",
    "start": "09:00",
    "end": "09:45"
  },
  {
    "name": "Break",
    "kind": "activity",
    "period": "morning",
    "start": "09:45",
    "end": "10:00"
  }
]
```

**Field Descriptions**:
- `name` (string): Display name for the activity
- `kind` (string): Activity type - see config.js `kinds` section for available types (e.g., `class`, `self`, `duty`, `leave`, `activity`)
- `period` (string): Time of day - `morning`, `afternoon`, or `evening`
- `start` (string): Start time in HH:MM format
- `end` (string): End time in HH:MM format

### 3. Special Schedule Files (`data/special-schedule/*.json`)

For special days that have a detailed timetable, create a JSON file in the `data/special-schedule/` directory. The file format is identical to normal schedule files (same array structure with time blocks).

**Note**: This directory and files are optional. Special days can simply have a `name` without any timetable file.

### 4. Application Configuration (`js/config.js`)

The `window.SCHEDULE_CONFIG` object in `js/config.js` controls the application behavior and UI text.

**Essential Settings**:

```javascript
window.SCHEDULE_CONFIG = {
  // File paths
  paths: {
    calendar: 'data/calendar.json',
    scheduleDir: 'data/schedule',
    scheduleExtension: '.json',
    specialScheduleDir: 'data/special-schedule',
    specialScheduleExtension: '.json'
  },

  // Schedule type definitions
  scheduleTypes: {
    entry: { name: '入门课', emoji: '📅' },
    advanced: { name: '进阶课', emoji: '🚀' },
    'self-study': { name: '自习日', emoji: '📚' },
    special: { name: '特殊安排', emoji: '⭐' }
  },

  // Manual switcher options (which types can users manually select)
  switcher: {
    types: ['entry', 'advanced', 'self-study']
  }
}
```

**Advanced Options**:

- **`scheduleFiles`**: Map schedule types to custom file names if they don't match
  ```javascript
  scheduleFiles: {
    'entry': 'beginner-schedule',  // Uses beginner-schedule.json instead of entry.json
  }
  ```

- **`specialScheduleFiles`**: Map special schedule keys to custom file names
  ```javascript
  specialScheduleFiles: {
    'holiday-2025-10-16': 'custom-holiday-schedule'
  }
  ```

- **`kinds`**: Define labels for activity types
- **`periods`**: Customize period labels with HTML/emoji
- **`calendar`**: Calendar display settings (days before/after, labels)
- **Other sections**: Various UI text strings and messages

**Tip**: For basic usage, you only need to adjust `paths`, `scheduleTypes`, and `switcher.types`. Everything else controls UI text and can be left as default.

## Limitations

- **Time Zone**: Uses the browser's local time zone; no timezone conversion
- **Data Updates**: Requires page refresh to load updated JSON files (no auto-refresh)
- **View Scope**: Displays one day at a time with a limited calendar preview window
- **Data Validation**: Assumes JSON files are well-formed; minimal error handling for malformed data
- **Network**: All schedule data must be accessible via HTTP(S); no offline support
