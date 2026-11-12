// Home — service worker.

chrome.runtime.onInstalled.addListener(() => {});

// Clicking the toolbar icon reloads the extension.
chrome.action.onClicked.addListener(async () => {
  try {
    const pinned = await chrome.tabs.query({ pinned: true });
    const index = pinned.length;
    await chrome.tabs.create({ url: chrome.runtime.getURL("index.html"), index });
  } catch (e) {
    await chrome.tabs.create({ url: chrome.runtime.getURL("index.html") });
  }
  chrome.runtime.reload();
});

// Weather fetch from the service worker (avoids page CORS restrictions).
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg && msg.type === "weather" && msg.url) {
    fetch(msg.url)
      .then((r) => r.json())
      .then((d) => sendResponse(d))
      .catch(() => sendResponse({ error: "network" }));
    return true; // keep channel open for async response
  }
});

// Single-home-window behavior: if a new tab opens while a Home tab already
// exists, focus the existing one and close the duplicate (unless disabled).
// The Home tab is also kept at the first position in its window.
async function enforceSingleHome() {
  const { singleHome } = await chrome.storage.local.get({ singleHome: true });
  if (!singleHome) return;
  try {
    const tabs = await chrome.tabs.query({});
    const homes = tabs.filter((t) => t.url && (t.url.startsWith("chrome://newtab") || t.url.includes("index.html")));
    if (homes.length <= 1) {
      // Still keep a lone Home tab pinned to the first position.
      if (homes.length === 1) await moveHomeFirst(homes[0]);
      return;
    }
    homes.sort((a, b) => a.id - b.id);
    const existing = homes[0];
    for (const t of homes.slice(1)) {
      if (!t.pinned) { try { await chrome.tabs.remove(t.id); } catch (e) {} }
    }
    if (existing) {
      try { await chrome.tabs.update(existing.id, { active: true }); } catch (e) {}
      try { await chrome.windows.update(existing.windowId, { focused: true }); } catch (e) {}
      await moveHomeFirst(existing);
    }
  } catch (e) {}
}

// Move a Home tab to the first slot after any pinned tabs in its window.
async function moveHomeFirst(homeTab) {
  try {
    const pinned = await chrome.tabs.query({ windowId: homeTab.windowId, pinned: true });
    await chrome.tabs.move(homeTab.id, { index: pinned.length });
  } catch (e) {}
}

chrome.tabs.onCreated.addListener((tab) => {
  setTimeout(() => enforceSingleHome(), 450);
});
