<div align="center">

# today.

### Plan your day. Make progress one small step at a time.

A calm, lightweight daily planner for tasks, habits, and quick notes — right in your browser.

**No setup · No dependencies · No account · Your data stays on your device**

</div>

---

## Contents

- [Overview](#overview)
- [Features](#features)
- [Get started](#get-started)
- [How to use](#how-to-use)
- [Privacy and data](#privacy-and-data)
- [Project structure](#project-structure)
- [Accessibility and browser support](#accessibility-and-browser-support)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## Overview

**today.** brings your to-do list, daily habits, and quick notes together in one focused dashboard. It is built with plain HTML, CSS, and JavaScript, so there is no package manager, build step, backend, or third-party service to set up.

The app is designed for anyone who wants a simple way to plan the day while keeping personal data in their own browser.

## Features

### Tasks

- Add, edit, complete, and delete tasks
- Set low, medium, or high priority
- Add an optional due date
- Filter tasks by **Today**, **Upcoming**, and **Completed**
- See daily completion progress at a glance
- Clear completed tasks in one action

### Habits

- Check off daily habits with one click
- Add and remove your own habits
- Track today's completion count

### Quick notes

- Notes save automatically as you type
- 2,000-character limit with a live character count

### Experience

- Responsive layout for phones, tablets, and desktops
- Keyboard-friendly controls with visible focus states
- Respects the reduced-motion preference
- English date and time formatting
- No external fonts, images, or JavaScript libraries

## Get started

### Requirements

- A modern web browser
- Python 3 for the optional local server

### Option 1: Open the file

Open `index.html` in your browser. The app works in most modern browsers without a server.

### Option 2: Run a local web server

Open a terminal in the project directory and run:

```bash
python3 -m http.server 4173
```

Then visit [http://localhost:4173](http://localhost:4173). Press `Ctrl+C` in the terminal to stop the server.

> If you prefer Node.js, you can run `npx serve .`. This option may download the `serve` package and require an internet connection.

## How to use

1. Select **Add task** to create a task.
2. Optionally set its priority and due date.
3. Check tasks off as you complete them; daily progress updates automatically.
4. Track your routines in **Small habits**.
5. Write ideas in **Quick notes**; changes are saved shortly after you stop typing.

## Privacy and data

Tasks, habits, and notes are stored in your browser's `localStorage` under the `bugun-panel-v1` key.

- This app does not send your content to a server.
- It does not include analytics, advertising, or tracking services.
- Data stays in the same browser and on the same device; it is not synced across devices.
- Clearing browser or site data also removes this app's saved data.
- Private browsing and strict storage settings may affect how long data persists.

**Backups:** The app does not currently include import or export. Keep in mind that browser storage can be removed when clearing site data.

## Project structure

| File | Purpose |
| --- | --- |
| `index.html` | Page structure, task form, and dashboard sections |
| `style.css` | Visual design, responsive layout, and motion preferences |
| `app.js` | App state, interactions, rendering, and `localStorage` persistence |

The app has no framework. It builds interface elements with the DOM API and renders user-provided text as text content.

## Accessibility and browser support

The interface uses semantic HTML, labeled form controls, keyboard focus states, live status announcements, and reduced-motion preferences. It targets current browsers with support for native `<dialog>`, `localStorage`, CSS Grid, and `conic-gradient`.

## Troubleshooting

**My tasks are missing.** Make sure you are using the same browser profile and device. Local data may have been removed if browser or site data was cleared.

**Changes are not being saved.** Check that your browser allows site storage and has available space. If opening the app with `file://` does not work, try the local server instructions above.

**The page has no styling.** Keep `index.html`, `style.css`, and `app.js` in the same project directory, and start the server from that directory.

## Contributing

There is no build or test command. You can review changes by opening the app in a browser with the local server. Please keep contributions focused and consider small screens, keyboard navigation, and clear English interface copy.

For ideas or bug reports, open a [GitHub issue](../../issues).

## License

This repository does not include a license file yet. Until a license is added, no permission to use, modify, or distribute this software should be assumed.
