
(function () {
  var done = null;
  setInterval(function () {
    var p = window.__deckYT;
    if (!p || !p.getPlayerState) { done = null; return; }
    if (done === p) return;
    try {
      if (p.getPlayerState() === 1) {
        try { p.unloadModule('captions'); } catch (e) {}
        try { p.unloadModule('cc'); } catch (e) {}
        done = p;
      }
    } catch (e) {}
  }, 400);
})();
