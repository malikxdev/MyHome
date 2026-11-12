# My Home

My Home is a fast, private, and gorgeous new-tab page for Chrome. No ads, no news feed, no forced sign-ups — just your links, a live clock, and the widgets you actually use. Everything you save lives locally on your device.

Built because every other start page was either too noisy or wanted your data. This one is yours — fork it, tweak it, make it your own.

---

## Features

### 📌 Pins & tabs
- Organize links in a grid of named tabs (Dev, Research, Entertainment…) with `Alt+N` for a new pin and `Alt+T` for a new tab.
- Right-click any pin to edit or resize it.
- Your browser bookmark bar is imported automatically on first launch, and you can re-import anytime.

### 🔍 Search
- One box, your engine. Press `/` to jump in.
- Configure or add engines in Settings → Search, and pick from 25 bar styles.
- Results open in a new tab by default (configurable).

### 🎨 Theming
- 32 built-in wallpapers that auto-match a color scheme, or use your own image/video.
- 26 UI fonts (plus upload of your own `.ttf` / `.otf` / `.woff` / `.woff2`).
- 25 clock styles, plus blur, brightness, and readability controls.

### 🧩 Widgets
- Weather, a daily quote, a notebook-style todo list, a focus timer, and animated particles — all toggleable in Settings → Widgets.
- The timer supports milliseconds and multiple formats (`mm:ss.mmm`, `mm:ss`, `h:mm:ss`).

### 🖱 Move mode (free layout)
- Press `Ctrl+Shift+M` to arrange every component on the page — drag to move, grab any corner or edge to resize in all 8 directions.
- The **Layers** panel (`Ctrl+Shift+L`) lists every element and pin, so you can bring anything forward or select it even when cards overlap.
- Overlapping elements show a small picker on click so you can always reach what's underneath.
- The properties and layers panels are draggable and auto-flip sides while you drag so they never block your work.

### 🔒 Private by design
- All data stays in `localStorage` / `chrome.storage.local`. The only network requests are favicons, media you add, and the default wallpaper.
- Export and re-import your entire config as JSON anytime.

---

## Keyboard shortcuts

| Keys | Action |
| --- | --- |
| `/` | Focus search |
| `Alt+N` | Add a pin |
| `Alt+T` | Add a tab |
| `Ctrl+,` | Open/close settings |
| `Ctrl+Shift+M` | Toggle move mode |
| `Ctrl+Shift+L` | Open/close layers |
| `← → ↑ ↓` | Nudge the selected element |
| `Esc` | Deselect / close / exit |
| `Ctrl+Shift+/` | About page |

---

## Install

1. Open `chrome://extensions` in Chrome.
2. Turn on **Developer mode** (top-right).
3. Click **Load unpacked** and select this folder.
4. Open a new tab.

The first launch shows a quick tour — skip it if you like, and you can replay it anytime from the About page.

---

## Project layout

```
my-home/
├── manifest.json      # Chrome extension manifest (MV3)
├── background.js      # service worker: single-Home-window behavior
├── index.html         # the new-tab page
├── styles.css         # themes, grid, panels, style classes
├── app.js             # all application logic
├── font-inject.js     # applies your chosen font across sites
└── icons/             # extension icons
```

---

## Developing

- Feature definitions (clock styles, search styles, fonts, wallpapers) live as arrays near the top of `app.js`.
- Pins live per-tab in `state.tabs[].pins`; widget state lives in `state.widgets`.
- The weather widget ships with an embedded weatherapi.com key. Swap `WEATHER_KEY` at the top of `app.js` for your own if you'd prefer.

Want to help? Read **[CONTRIBUTING.md](CONTRIBUTING.md)** first — we'd love to have you.

---

## License

MIT. Use it, break it, fix it, share it.
