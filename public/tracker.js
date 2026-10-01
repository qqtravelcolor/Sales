/* PartnerFlow attribution tracker — include with: <script src="https://your-app.com/tracker.js" defer></script> */
(function () {
  var key = "partner_source";
  var match = new URLSearchParams(window.location.search).get("utm_source");
  if (match) {
    var value = String(match).trim();
    document.cookie = key + "=" + encodeURIComponent(value) + "; max-age=" + (60 * 60 * 24 * 30) + "; path=/; SameSite=Lax";
    try { window.localStorage.setItem(key, value); } catch (_) {}
  }
  function cookieValue() { var item = document.cookie.split("; ").find(function (row) { return row.indexOf(key + "=") === 0; }); return item ? decodeURIComponent(item.split("=").slice(1).join("=")) : ""; }
  function source() { try { return window.localStorage.getItem(key) || cookieValue(); } catch (_) { return cookieValue(); } }
  function fill() { var value = source(); if (!value) return; document.querySelectorAll('input[type="hidden"][name="partner_source"]').forEach(function (input) { input.value = value; }); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fill); else fill();
  new MutationObserver(fill).observe(document.documentElement, { childList: true, subtree: true });
}());
