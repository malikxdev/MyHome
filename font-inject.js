// Home — force the selected UI font on every website (only when enabled).
(() => {
  "use strict";

  function apply(cfg) {
    if (!cfg || !cfg.enabled || !cfg.family) return;
    let el = document.getElementById("home-font-override");
    if (!el) {
      el = document.createElement("style");
      el.id = "home-font-override";
      (document.head || document.documentElement).appendChild(el);
    }
    let css = (cfg.face || "") + "*{font-family:" + cfg.family + " !important;}";
    if (el.textContent !== css) el.textContent = css;
  }

  function clear() {
    const el = document.getElementById("home-font-override");
    if (el) el.remove();
  }

  try {
    if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
      chrome.storage.local.get({ fontOverride: null }, (r) => {
        if (r && r.fontOverride && r.fontOverride.enabled) apply(r.fontOverride);
        else clear();
      });
      chrome.storage.onChanged.addListener((changes, area) => {
        if (area !== "local" || !changes.fontOverride) return;
        const v = changes.fontOverride.newValue;
        if (v && v.enabled) apply(v);
        else clear();
      });
    }
  } catch (e) {}
})();
