# MISSION CONTROL MD6

> Tactical mission & event management interface. Unit MD6, operational.

Single-page web app with a military/tactical aesthetic (black + red, stencil typography) featuring a dynamic mission list and integrated calendar.

---

## Features

### Missions (To-do)
- 19 pre-loaded missions seeded on first run
- Sequential mission IDs (`M-001`, `M-002`, ...)
- Assignee tracking with per-person color coding (João, Nuno, Paulo, Miguel, Todos)
- 4 priority levels: **CODE BLACK** / **CRÍTICA** / **MÉDIA** / **BAIXA**
- Due dates with automatic overdue highlighting
- Filters: All / Active / Code Black / Critical / Done
- Bulk clear of completed missions
- Click-to-edit, checkbox to toggle completion

### Calendar
- Monthly view, Monday-first week (PT standard)
- Mission due dates auto-display on the calendar
- Manual event creation with title, date, time, and location
- Today highlighted with red corner marker
- Click a day to add an event, click an event to edit

### System
- Live operational clock (HH:MM:SS) in the header
- Auto-generated operation code (`OP-YYYYMMDD`)
- Dashboard stats: Active / High Priority / Completed / Total
- Keyboard shortcuts: `Esc` closes modals, `Ctrl/Cmd+N` creates new item
- Fully responsive (desktop / tablet / mobile)

---

## Tech Stack

- **Frontend**: Single-file HTML + CSS + vanilla JS. Zero framework dependencies.
- **Persistence**: Browser `localStorage` (scoped per device).
- **Server**: Express serving `/public` as static assets + `/healthz` endpoint for monitoring.
- **Fonts**: Black Ops One, Stardos Stencil, JetBrains Mono, Oswald (Google Fonts).

### Repo structure

```
.
├── public/
│   └── index.html       # Full app — CSS + JS inline
├── server.js            # Express static server + health check
├── package.json
├── render.yaml          # Render.com deployment config
├── .gitignore
└── README.md
```

---

## Local Development

Requires Node.js 18+.

```bash
# Install dependencies
npm install

# Start the server
npm start

# App runs at http://localhost:3000
```

The app can also be opened directly without Node by double-clicking `public/index.html` — the Express server only serves it over HTTP for production.

---

## Deployment

### Render.com (recommended, one-click)

1. Push this repo to GitHub.
2. In Render, create a new **Blueprint** from the repo.
3. Render auto-detects `render.yaml` and provisions the service.
4. Service goes live at `https://mission-control-md6.onrender.com` (free tier, Frankfurt region).

Manual setup alternative:
- Runtime: Node
- Build command: `npm install`
- Start command: `npm start`
- Health check path: `/healthz`

### Other hosts

- **Netlify / Vercel / GitHub Pages**: upload only the `public/` folder — the app is fully static and needs no server for these.
- **Custom**: serve `public/` with any static file server (nginx, Caddy, Python `http.server`, etc.).

---

## Data & Privacy

All mission and event data lives exclusively in the user's browser `localStorage`. No server-side storage, no tracking, no analytics, no authentication. Clearing browser data resets the app.

### Storage keys

- `md6_missions` — JSON array of missions
- `md6_events` — JSON array of calendar events
- `md6_version` — schema version (currently `"1"`)

To reset the app to the initial 19-mission seed, clear the `md6_version` key and reload.

---

## Roadmap (suggestions)

- [ ] Multi-user sync via Firebase/Supabase backend
- [ ] Push notifications for overdue missions
- [ ] Export to CSV / PDF briefing
- [ ] Recurring missions
- [ ] Mission dependencies / blockers
- [ ] Team dashboard with per-assignee load
- [ ] Dark/light theme toggle (currently dark only by design)

---

## License

Proprietary. Internal use only.
