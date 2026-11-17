/* Service page and homepage interactions (17 Nov 2026): the 4-point link check widget and count-up numbers.
   No dependencies. Respects prefers-reduced-motion. */
(function () {
  'use strict';
  document.documentElement.classList.add('sv-js');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 4-point link check
  var VERDICTS = [
    ['We would walk away', 'None of the checks pass. A link here would add risk, not authority.', '#E5484D'],
    ['We would walk away', 'Only one check passes. That is not enough to put our name on an outreach email.', '#E5484D'],
    ['We would look closer', 'Two checks pass. We would ask what is missing before sending a pitch.', '#F59E0B'],
    ['Promising, with one gap', 'Three checks pass. We would find out about the fourth before placing anything.', '#14B8A6'],
    ['We would place it', 'All four pass: real readers, a relevant topic, a clean history and a placement inside the content.', '#0EA5A0']
  ];
  document.querySelectorAll('[data-vet]').forEach(function (root) {
    var checks = root.querySelectorAll('[data-vet-check]');
    var ring = root.querySelector('[data-vet-ring]');
    var score = root.querySelector('[data-vet-score]');
    var verdict = root.querySelector('[data-vet-verdict]');
    var note = root.querySelector('[data-vet-note]');
    function update() {
      var n = 0; checks.forEach(function (c) { if (c.checked) n++; });
      var v = VERDICTS[n];
      score.textContent = n + '/4';
      verdict.textContent = v[0]; note.textContent = v[1];
      ring.style.setProperty('--p', (n / 4 * 100) + '%');
      ring.style.setProperty('--c', v[2]);
    }
    checks.forEach(function (c) { c.addEventListener('change', update); });
    update();
  });

  // section reveal (own observer, so content stays visible if this script never runs)
  var rv = document.querySelectorAll('.sv-r');
  if ('IntersectionObserver' in window && !reduce) {
    var vh = window.innerHeight;
    var io2 = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io2.unobserve(en.target); } });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
    rv.forEach(function (el) { if (el.getBoundingClientRect().top < vh) el.classList.add('in'); else io2.observe(el); });
  } else { rv.forEach(function (el) { el.classList.add('in'); }); }

  // count-up numbers
  var nums = document.querySelectorAll('[data-count]');
  function run(el) {
    var end = parseInt(el.getAttribute('data-count'), 10); if (isNaN(end)) return;
    if (reduce) { el.textContent = end.toLocaleString('en-US'); return; }
    var t0 = null, dur = 1100;
    function step(ts) {
      if (!t0) t0 = ts; var p = Math.min((ts - t0) / dur, 1); var e = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(end * e).toLocaleString('en-US');
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { run(en.target); io.unobserve(en.target); } });
    }, { threshold: 0.4 });
    nums.forEach(function (n) { io.observe(n); });
  } else { nums.forEach(run); }
})();
