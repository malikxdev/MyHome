// Home — service worker.

chrome.runtime.onInstalled.addListener(() => {});

// Clicking the toolbar icon reloads the extension.
chrome.action.onClicked.addListener(() => {
  // Open Home in a new tab, then reload the extension (keeps it enabled).
  chrome.tabs.create({ url: chrome.runtime.getURL("index.html") }, () => {
    chrome.runtime.reload();
  });
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
async function enforceSingleHome() {
  const { singleHome } = await chrome.storage.local.get({ singleHome: true });
  if (!singleHome) return;
  try {
    const tabs = await chrome.tabs.query({});
    const homes = tabs.filter((t) => t.url && (t.url.startsWith("chrome://newtab") || t.url.includes("index.html")));
    if (homes.length <= 1) return;
    homes.sort((a, b) => a.id - b.id);
    const existing = homes[0];
    for (const t of homes.slice(1)) {
      if (!t.pinned) { try { await chrome.tabs.remove(t.id); } catch (e) {} }
    }
    if (existing) {
      try { await chrome.tabs.update(existing.id, { active: true }); } catch (e) {}
      try { await chrome.windows.update(existing.windowId, { focused: true }); } catch (e) {}
    }
  } catch (e) {}
}

chrome.tabs.onCreated.addListener((tab) => {
  setTimeout(() => enforceSingleHome(), 450);
});
