/* Premium layer behaviour: header state, masked word reveals, staggered rises, magnetic buttons, hero parallax. No dependencies. */
(function () {
  (function ready() { var go = function () { document.body.classList.add("is-ready"); }; var run = function () { (window.requestIdleCallback || function (f) { setTimeout(f, 200); })(go, { timeout: 1500 }); }; if (document.readyState === "complete") run(); else addEventListener("load", run, { once: true }); })();
  var d = document, reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia && matchMedia('(pointer: fine)').matches;

  /* background field + scroll progress for every width */
  (function () {
    var f = d.createElement('div'); f.className = 'px-field'; f.setAttribute('aria-hidden', 'true'); d.body.appendChild(f);
    /* scroll-driven reveals (CSS view timelines; browsers without support simply show everything) */
    var m = function (sel, cls) { d.querySelectorAll(sel).forEach(function (e) { e.classList.add('sd'); if (cls) e.classList.add(cls); }); };
    m('.px .ld-card:nth-child(odd)', 'sd-l'); m('.px .ld-card:nth-child(even)', 'sd-r');
    m('.px .tv-frame', 'sd-l'); m('.px .tv-copy', 'sd-r'); m('.px .db-win', 'sd-z'); m('.px .gx-card'); m('.px .svc-card'); m('.px .lab-try-grid > *', 'sd-z');
    d.querySelectorAll('.px .gx-cover').forEach(function (e) { e.classList.add('sd-par'); });
  })();

  /* gutters v2: blueprint rails, section index, scroll meter, circuit traces, aurora and pixels (wide screens) */
  if (window.innerWidth >= 1240) {
    var r = d.createElement('div'); r.className = 'px-rails'; r.setAttribute('aria-hidden', 'true');
    var cols = ['#14B8A6', '#F5A623', '#F472B6', '#0EA5A0'], px = '', tr = '';
    for (var q = 0; q < 18; q++) { var left = q % 2 ? 'calc(50% + ' + (650 + Math.random() * 240).toFixed(0) + 'px)' : 'calc(50% - ' + (650 + Math.random() * 240).toFixed(0) + 'px)'; px += '<i class="px-pix" style="left:' + left + ';top:' + (40 + Math.random() * 60).toFixed(0) + '%;--s:' + (4 + Math.random() * 6).toFixed(0) + 'px;--c:' + cols[q % 4] + ';--d:' + (9 + Math.random() * 9).toFixed(1) + 's;--w:-' + (Math.random() * 14).toFixed(1) + 's;--dx:' + ((Math.random() - .5) * 60).toFixed(0) + 'px"></i>'; }
    [[14, 150, 'l'], [31, 96, 'l'], [58, 170, 'l'], [78, 120, 'l'], [22, 110, 'r'], [44, 170, 'r'], [67, 100, 'r'], [86, 150, 'r']].forEach(function (t, n) { tr += '<span class="px-tr ' + t[2] + '" style="top:' + t[0] + '%;--w:' + t[1] + 'px;--dl:-' + (n * 1.3).toFixed(1) + 's"><i></i></span>'; });
    var ticks = ''; for (var k = 0; k <= 10; k++) { ticks += '<b style="top:' + (k * 10) + '%">' + (k * 10) + '</b>'; }
    var secs = [['.lab-hero', 'Start'], ['#link-building-and-insertion', 'Two ways'], ['#watch-the-tools', 'Tools'], ['.db', 'Backlinks'], ['.latest-guides', 'Guides'], ['.faq', 'FAQ'], ['.bl-hero', 'Blog'], ['.bl-grid', 'Guides'], ['.newsletter-block', 'Newsletter'], ['.post-hero', 'Intro'], ['.post-content, .post-body-wrap, article', 'Article']].filter(function (s) { return d.querySelector(s[0]); });
    var idx = '<nav class="px-ind" aria-label="Page sections">' + secs.map(function (s, n) { return '<a href="#" data-s="' + n + '"><span>' + s[1] + '</span><i>0' + (n + 1) + '</i></a>'; }).join('') + '</nav>';
    r.innerHTML = '<span class="px-aur a1"></span><span class="px-aur a2"></span><span class="px-aur a3"></span><span class="px-rail l"><i></i><em class="px-tk">' + ticks + '</em></span><span class="px-rail r"><i></i></span>' + tr
      + '<div class="px-meter"><em>SCROLL</em><span class="trk"><i></i></span><b data-pct>0%</b></div>' + idx + px;
    d.body.appendChild(r);
    var fill = r.querySelector('.px-meter .trk i'), pct = r.querySelector('[data-pct]'), links = r.querySelectorAll('.px-ind a');
    var upd = function () { var m = d.documentElement.scrollHeight - innerHeight, p = m > 0 ? Math.min(1, scrollY / m) : 0; fill.style.transform = 'scaleY(' + p.toFixed(4) + ')'; pct.textContent = Math.round(p * 100) + '%'; };
    var t2 = 0; addEventListener('scroll', function () { if (!t2) t2 = requestAnimationFrame(function () { t2 = 0; upd(); }); }, { passive: true }); upd();
    links.forEach(function (a2) { a2.addEventListener('click', function (e) { e.preventDefault(); var el = d.querySelector(secs[+a2.dataset.s][0]); if (el) scrollTo({ top: el.getBoundingClientRect().top + scrollY - 70, behavior: 'smooth' }); }); });
    if ('IntersectionObserver' in window) { var vis = {}; var io2 = new IntersectionObserver(function (es) { es.forEach(function (e) { vis[e.target.dataset.pxi] = e.isIntersecting ? e.intersectionRatio : 0; }); var best = 0, bv = -1; Object.keys(vis).forEach(function (k2) { if (vis[k2] > bv) { bv = vis[k2]; best = +k2; } }); links.forEach(function (l2, n) { l2.classList.toggle('a', n === best); }); }, { threshold: [0, .15, .3, .5, .7] }); secs.forEach(function (s, n) { var el = d.querySelector(s[0]); el.dataset.pxi = n; io2.observe(el); }); }
  }

  var h = d.querySelector('.site-header');
  if (h) { var on = false; addEventListener('scroll', function () { var s = scrollY > 24; if (s !== on) { on = s; h.classList.toggle('is-scrolled', s); } }, { passive: true }); }

  d.querySelectorAll('.px .section-head h2, .px .page-hero h1').forEach(function (e) { e.setAttribute('data-split', ''); });
  d.querySelectorAll('.px .section-head p, .px .svc-card, .px .compare, .px .step, .px .faq-item, .px .guide-card').forEach(function (e, k) { e.setAttribute('data-rise', ''); e.style.setProperty('--i', k % 4); });

  d.querySelectorAll('[data-split]').forEach(function (el) {
    var n = 0;
    (function walk(node) {
      [].slice.call(node.childNodes).forEach(function (c) {
        if (c.nodeType === 3) {
          var f = d.createDocumentFragment();
          c.textContent.split(/(\s+)/).forEach(function (t) {
            if (!t) return;
            if (/^\s+$/.test(t)) { f.appendChild(d.createTextNode(t)); return; }
            var w = d.createElement('span'); w.className = 'w';
            var i = d.createElement('i'); i.textContent = t; i.style.setProperty('--i', n++);
            w.appendChild(i); f.appendChild(w);
          });
          node.replaceChild(f, c);
        } else if (c.nodeType === 1 && c.tagName !== 'BR') { walk(c); }
      });
    })(el);
  });

  var els = [].slice.call(d.querySelectorAll('[data-split],[data-rise]'));
  if (!('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('is-in'); }); }
  else {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }); }, { threshold: 0.15, rootMargin: '0px 0px -5% 0px' });
    els.forEach(function (e) { io.observe(e); });
  }

  if (!reduce && fine) {
    d.querySelectorAll('.px .btn-primary, .px .btn-outline').forEach(function (b) {
      var raf = 0;
      b.addEventListener('pointermove', function (e) {
        if (raf) return;
        raf = requestAnimationFrame(function () {
          raf = 0; var r = b.getBoundingClientRect();
          b.style.setProperty('--tx', ((e.clientX - r.left - r.width / 2) * 0.16).toFixed(1) + 'px');
          b.style.setProperty('--ty', ((e.clientY - r.top - r.height / 2) * 0.26).toFixed(1) + 'px');
        });
      }, { passive: true });
      b.addEventListener('pointerleave', function () { b.style.setProperty('--tx', '0px'); b.style.setProperty('--ty', '0px'); });
    });
    var lab = d.querySelector('[data-parallax]');
    if (lab) {
      var host = lab.closest('.lab-hero') || lab.parentElement, raf2 = 0;
      host.addEventListener('pointermove', function (e) {
        if (raf2) return;
        raf2 = requestAnimationFrame(function () {
          raf2 = 0; var r = host.getBoundingClientRect();
          lab.style.setProperty('--mx', (((e.clientX - r.left) / r.width) - 0.5).toFixed(3));
          lab.style.setProperty('--my', (((e.clientY - r.top) / r.height) - 0.5).toFixed(3));
        });
      }, { passive: true });
      host.addEventListener('pointerleave', function () { lab.style.setProperty('--mx', 0); lab.style.setProperty('--my', 0); });
    }
  }
})();
