/* Premium layer: header state only. Scroll reveals, gutters and pointer effects were removed (28 Nov 2026) so scrolling stays light. */
(function () {
  document.body.classList.add('is-ready');
  var h = document.querySelector('.site-header');
  if (h) { var on = false; addEventListener('scroll', function () { var s = scrollY > 24; if (s !== on) { on = s; h.classList.toggle('is-scrolled', s); } }, { passive: true }); }
})();
