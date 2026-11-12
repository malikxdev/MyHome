# My Home

My Home is a new-tab start page for Chrome that you actually want to look at. No ads, no news feed, no branding stuffed in your face — just your links, a clock, and the widgets you choose. Everything is stored locally on your machine.

I started this because every start page I tried was either too busy or wanted me to sign up for something. This one is mine, and it's yours too — fork it, poke around, make it yours.

## What it does

- **Pins & tabs** — a grid of your favorite links in named tabs (Dev, Anime, AI, whatever). Add pins with `Alt+N`, tabs with `Alt+T`, right-click any pin to edit or resize it. Your bookmark bar is imported automatically on first launch, and you can re-import anytime.
- **Search** — one box, your engine. `Search` to drop into it. Configure or add engines in Settings → Search, and pick from 25 different bar styles. Results open in a new tab by default (configurable).
- **Theming** — 32 built-in wallpapers that auto-pick a matching color scheme, or use your own image/video. 26 UI fonts (upload your own `.ttf`/`.otf`/`.woff`/`.woff2`), 25 clock styles, and controls for blur, brightness, and readability overlay.
- **Widgets** — weather, a daily quote, a notebook-style todo list, a focus timer, and animated particles. Turn them on in Settings → Widgets; right-click any of them to tweak or hide it.
- **Everything local** — data lives in `localStorage` / `chrome.storage.local`. The only network requests are favicons, media you add, and the default wallpaper. Export and re-import your whole config as JSON anytime.

### Handy shortcuts

| Keys | Action |
| --- | --- |
| `/` | focus search |
| `Alt+N` | add a pin |
| `Alt+T` | add a tab |
| `Ctrl+,` | open/close settings |
| `Esc` | close any panel |
| `Ctrl+Shift+/` | about page |

## Install

1. Open `chrome://extensions` in Chrome.
2. Turn on **Developer mode** (top-right corner).
3. Click **Load unpacked** and select this folder.
4. Open a new tab.

That's it. The first time it opens, a short tour walks you through the basics — skip it if you don't need it; you can replay it from the About page.

## Project layout

```
my-home/
├── manifest.json      # Chrome extension manifest (MV3)
├── background.js      # service worker: single-Home-window behavior
├── index.html         # the new-tab page
├── styles.css         # themes, grid, panels, style classes
├── app.js             # all the logic lives here
├── font-inject.js     # applies your chosen font across websites
└── icons/             # extension icons
```

## Making changes

- Clock styles, search styles, fonts, and wallpapers are arrays near the top of `app.js`. Add yours there.
- Pins live per-tab in `state.tabs[].pins`; widget state lives in `state.widgets`.
- The weather widget uses an embedded weatherapi.com key — swap `WEATHER_KEY` at the top of `app.js` for the own key if you'd rather.

## License

MIT. Use it, break it, fix it, share it.
