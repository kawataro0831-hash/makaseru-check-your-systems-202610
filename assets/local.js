
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


(function () {
  var cur = null;
  function reset() {
    if (!cur) return;
    cur.el.innerHTML = cur.html; cur.el.classList.remove('loaded'); cur = null;
  }
  document.addEventListener('click', function (e) {
    var el = e.target.closest && e.target.closest('.embed.clickload');
    if (!el || el.classList.contains('loaded') || document.body.classList.contains('sheet')) return;
    reset();
    cur = { el: el, html: el.innerHTML };
    var f = document.createElement('iframe');
    f.src = el.getAttribute('data-src'); f.title = el.getAttribute('data-title') || '';
    f.setAttribute('allow', 'autoplay; fullscreen; encrypted-media'); f.setAttribute('allowfullscreen', '');
    var off = el.querySelector('.embed-off');
    el.innerHTML = ''; el.appendChild(f); if (off) el.appendChild(off);
    el.classList.add('loaded');
  });
  document.addEventListener('deck:slide', reset);
})();
