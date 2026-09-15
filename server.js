const fs = require('fs');
const express = require('express');
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '.env') });
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');

const services = require('./data/services');
const tools = require('./data/tools');
const locations = require('./data/locations');
const blogStore = require('./lib/blogStore');
const team = require('./data/team');
const site = require('./data/site');
const { sendContactEmail, smtpConfigured } = require('./lib/mailer');
const { checkLogin, requireAdmin } = require('./lib/adminAuth');
const multer = require('multer');
const rateLimit = require('express-rate-limit');

const BLOG_IMAGES_DIR = path.join(__dirname, 'public', 'images', 'blog');
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, BLOG_IMAGES_DIR),
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase();
      const base = path.basename(file.originalname, ext)
        .toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
      let name = `${base}${ext}`;
      let i = 1;
      while (fs.existsSync(path.join(BLOG_IMAGES_DIR, name))) {
        name = `${base}-${i}${ext}`;
        i++;
      }
      cb(null, name);
    }
  }),
  fileFilter: (req, file, cb) => cb(null, /\.(jpe?g|png|webp|gif|svg)$/i.test(file.originalname)),
  limits: { fileSize: 10 * 1024 * 1024 }
});

// Only render a member's <img> if the photo file actually exists, so a
// missing upload falls back to the initials avatar instead of a broken image.
// Pull the Q&A pairs out of a post's <div class="post-faq"> block so the page can
// emit FAQPage structured data. The FAQ markup lives inside the post content, so
// this parses it back out rather than duplicating the copy in two places.
function extractFaqs(html) {
  const block = html.match(/<div class="post-faq">([\s\S]*?)<\/div>/);
  if (!block) return [];
  const faqs = [];
  const re = /<summary>([\s\S]*?)<\/summary>\s*<p>([\s\S]*?)<\/p>/g;
  let m;
  while ((m = re.exec(block[1])) !== null) {
    const strip = s => s.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    faqs.push({ q: strip(m[1]), a: strip(m[2]) });
  }
  return faqs;
}

function withPhotoCheck(member) {
  return {
    ...member,
    hasPhoto: Boolean(member.photo && fs.existsSync(path.join(__dirname, 'public', member.photo)))
  };
}

const app = express();
const PORT = process.env.PORT || 3000;
const isProd = process.env.NODE_ENV === 'production';

// Hostinger terminates TLS in front of this app — without this, req.secure and
// req.protocol always read "http" even on a real https:// request, which would
// break the https redirect below and mark secure cookies as never-sendable.
app.set('trust proxy', 1);
app.disable('x-powered-by');

// Canonical host + protocol: fold www / http / mixed-case paths onto one
// canonical URL before any route runs, so the site never serves the same
// content at two different addresses (a duplicate-content SEO issue).
app.use((req, res, next) => {
  const host = (req.headers.host || '').toLowerCase();
  const canonicalHost = host.replace(/^www\./, '');
  const wantsHttps = isProd && req.protocol !== 'https';
  const hasUpperPath = req.path !== req.path.toLowerCase() && !req.path.startsWith('/admin');
  const hasTrailingSlash = req.path.length > 1 && req.path.endsWith('/');
  if (host !== canonicalHost || wantsHttps || hasUpperPath || hasTrailingSlash) {
    const targetHost = canonicalHost || host;
    let targetPath = hasUpperPath ? req.path.toLowerCase() : req.path;
    if (hasTrailingSlash) targetPath = targetPath.replace(/\/+$/, '');
    const targetProtocol = isProd ? 'https' : req.protocol;
    const qs = req.url.slice(req.path.length);
    return res.redirect(301, `${targetProtocol}://${targetHost}${targetPath}${qs}`);
  }
  next();
});

// Security headers (no extra dependency needed for a handful of static values).
app.use((req, res, next) => {
  if (isProd) res.setHeader('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  next();
});

// None of the public pages are personalized (no per-visitor content), so a
// short, CDN-cacheable window is safe. Admin (session-gated) and every
// non-GET request (the /contact submit handler) are excluded — those must
// never be served from a shared cache.
app.use((req, res, next) => {
  if (req.method === 'GET' && !req.path.startsWith('/admin')) {
    res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=600, stale-while-revalidate=86400');
  }
  next();
});

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'partials/layout');

// Static assets
app.use(express.static(path.join(__dirname, 'public'), {
  // Images, SVGs and other static assets change rarely and are referenced by
  // stable URLs — a 30-day cache keeps repeat views fast (flagged by PSI).
  maxAge: '30d',
  setHeaders: (res, filePath) => {
    // Some hosting/CDN layers drop the charset param from static responses,
    // which can make browsers mis-decode non-ASCII bytes (e.g. em-dashes in
    // CSS comments) and silently break CSS parsing. Force it explicitly.
    if (filePath.endsWith('.css')) res.setHeader('Content-Type', 'text/css; charset=utf-8');
    if (filePath.endsWith('.js')) res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
    // Every CSS/JS request already carries a ?v=<assetVersion> query string
    // (see data/site.js), bumped on every edit, so a long cache is normally
    // safe — the URL itself changes on deploy. Deliberately NOT `immutable`
    // and capped at a week rather than a year: a transient host/CDN hiccup
    // (seen once already) can get a bad response cached under this exact
    // versioned URL, and a shorter, revalidatable cache limits how long that
    // stays stuck before self-healing, instead of locking it in for a year.
    if (filePath.endsWith('.css') || filePath.endsWith('.js')) res.setHeader('Cache-Control', 'public, max-age=604800');
  }
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// A missing SESSION_SECRET in production should never take the whole site
// down — but a fresh random secret on every restart logs every admin session
// out each time the process restarts. Persist a generated one to a local,
// gitignored file instead, so it only changes if that file is ever removed.
// Adding a real SESSION_SECRET to the host's env vars is still preferable —
// this is just a safety net for when that hasn't been done.
function getOrCreateSessionSecret() {
  if (process.env.SESSION_SECRET) return process.env.SESSION_SECRET;
  if (!isProd) return 'dev-only-insecure-secret';
  const secretFile = path.join(__dirname, '.session-secret');
  try {
    return fs.readFileSync(secretFile, 'utf8').trim();
  } catch {
    const generated = require('crypto').randomBytes(32).toString('hex');
    try {
      fs.writeFileSync(secretFile, generated, { mode: 0o600 });
    } catch (err) {
      console.warn('[server] Could not persist a generated SESSION_SECRET to disk — a new one will be generated on every restart:', err.message);
    }
    console.warn('[server] SESSION_SECRET is not set — generated and saved one to .session-secret. Set a real SESSION_SECRET in the environment when convenient.');
    return generated;
  }
}
const sessionSecret = getOrCreateSessionSecret();
app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 8 // 8 hours
  }
}));

// Helper: pass common data to every view
app.use((req, res, next) => {
  res.locals.services = services;
  res.locals.tools = tools;
  res.locals.currentPath = req.path;
  res.locals.siteName = 'Contomatix';
  res.locals.site = site;
  // Fallbacks so views that don't pass these (e.g. 404) still render.
  res.locals.description = 'Contomatix — link building and SEO services.';
  next();
});

// ---------- Routes ----------

app.get('/sitemap.xml', (req, res) => {
  const today = new Date().toISOString().slice(0, 10);
  const staticPaths = ['/', '/about', '/team', '/contact', '/blog', '/services', '/privacy-policy', '/terms', '/tools', '/tools/llms-txt-generator', '/tools/schema-markup-generator', '/tools/serp-snippet-preview', '/tools/readability-checker', '/tools/robots-txt-generator', '/tools/utm-builder', '/tools/og-preview-generator', '/tools/meta-tag-generator', '/tools/sitemap-generator', '/tools/hreflang-generator', '/tools/invoice-generator'];
  const urls = [
    ...staticPaths.map(u => ({ loc: u, lastmod: today })),
    ...services.map(s => ({ loc: `/services/${s.slug}`, lastmod: today })),
    ...locations.map(l => ({ loc: `/services/${l.slug}`, lastmod: today })),
    ...blogStore.getPublished().map(p => ({ loc: `/blog/${p.slug}`, lastmod: p.date }))
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url><loc>${site.baseUrl}${u.loc}</loc><lastmod>${u.lastmod}</lastmod></url>`).join('\n')}
</urlset>`;

  res.type('application/xml').send(xml);
});

app.get('/robots.txt', (req, res) => {
  res.type('text/plain').send(`User-agent: *
Allow: /
Disallow: /admin

Sitemap: ${site.baseUrl}/sitemap.xml`);
});

// llms.txt: a plain-language summary for AI assistants and LLM crawlers,
// separate from robots.txt (which only governs crawl permissions). Purely
// additive/descriptive — doesn't change what's crawled or indexed.
app.get('/llms.txt', (req, res) => {
  const serviceLines = services.map(s => `- [${s.title}](${site.baseUrl}/services/${s.slug}): ${s.summary}`).join('\n');
  res.type('text/plain').send(`# Contomatix

> Contomatix is a white-hat link building and SEO agency. We help brands grow organic traffic through link building, guest posting, on-page SEO, off-page SEO, and keyword research.

## Services
${serviceLines}

## Company
- [About](${site.baseUrl}/about)
- [Team](${site.baseUrl}/team)
- [Contact](${site.baseUrl}/contact)

## Content
- [Blog](${site.baseUrl}/blog): SEO strategy, link building tactics, and hand-verified local-agency guides.
- [Sitemap](${site.baseUrl}/sitemap.xml)
`);
});

app.get('/', (req, res) => {
  const allPosts = blogStore.getPublished();
  const latestPosts = [...allPosts]
    .reverse()
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
    .slice(0, 6);
  res.render('pages/home', {
    title: 'Contomatix — Link Building & SEO Services',
    description: 'Contomatix helps brands grow organic traffic and AI search visibility through link building, technical & on-page SEO, and AI SEO.',
    pageClass: 'page-home',
    postCount: allPosts.length,
    marketCount: allPosts.filter(p => p.slug.startsWith('best-seo-companies-in-')).length,
    latestPosts
  });
});

app.get('/services', (req, res) => {
  res.render('pages/services', {
    title: 'SEO & Link Building Services — Contomatix',
    description: 'Link building, guest posting, on-page, off-page, technical, and AI SEO, white-label SEO, and keyword research — one connected strategy.',
    pageClass: 'page-services'
  });
});

app.get('/services/:slug', (req, res) => {
  const loc = locations.find(l => l.slug === req.params.slug);
  if (loc) {
    return res.render('pages/service-location', {
      title: `${loc.title} — Contomatix`,
      description: loc.summary,
      pageClass: 'page-service',
      loc
    });
  }
  const service = services.find(s => s.slug === req.params.slug);
  if (!service) return res.status(404).render('pages/404', { title: 'Page not found', pageClass: 'page-404' });
  res.render('pages/service', {
    title: `${service.title} Services — Contomatix`,
    description: service.summary,
    pageClass: 'page-service',
    service
  });
});

app.get('/tools', (req, res) => {
  res.render('pages/tools', {
    title: 'Free SEO Tools & Generators — Contomatix',
    description: 'Free, no-signup SEO and AI-search tools from Contomatix — starting with a free llms.txt generator, with more tools on the way.',
    pageClass: 'page-tools'
  });
});

app.get('/tools/llms-txt-generator', (req, res) => {
  res.render('pages/llms-txt-generator', {
    title: 'Free llms.txt Generator | Contomatix',
    description: 'Generate a valid llms.txt file for free in seconds — a plain-language site summary that helps AI assistants understand and cite your business.',
    pageClass: 'page-tool'
  });
});

app.get('/tools/schema-markup-generator', (req, res) => {
  res.render('pages/schema-markup-generator', {
    title: 'Free Schema Markup Generator | Contomatix',
    description: 'Generate valid FAQ, HowTo, Local Business, or Article JSON-LD schema markup for free — ready to paste into your site, no signup required.',
    pageClass: 'page-tool'
  });
});

app.get('/tools/serp-snippet-preview', (req, res) => {
  res.render('pages/serp-snippet-preview', {
    title: 'Free SERP Snippet Checker & Preview Tool | Contomatix',
    description: 'See exactly how your title and meta description will look in Google search results, with live character-count warnings, for free.',
    pageClass: 'page-tool'
  });
});

app.get('/tools/readability-checker', (req, res) => {
  res.render('pages/readability-checker', {
    title: 'Free Readability & Content Score Checker | Contomatix',
    description: 'Check your content\'s Flesch Reading Ease score, word/sentence counts, keyword density, and passive voice usage for free, instantly.',
    pageClass: 'page-tool'
  });
});

app.get('/tools/robots-txt-generator', (req, res) => {
  res.render('pages/robots-txt-generator', {
    title: 'Free Robots.txt Generator | Contomatix',
    description: 'Generate a valid robots.txt file for free — control crawler access, block AI bots, and reference your sitemap, all in your browser.',
    pageClass: 'page-tool'
  });
});

app.get('/tools/utm-builder', (req, res) => {
  res.render('pages/utm-builder', {
    title: 'Free UTM Tag Generator & Campaign URL Builder | Contomatix',
    description: 'Build properly tagged UTM campaign URLs for Google Analytics in seconds, for free — no more guessing parameter names.',
    pageClass: 'page-tool'
  });
});

app.get('/tools/og-preview-generator', (req, res) => {
  res.render('pages/og-preview-generator', {
    title: 'Free Social Share Preview Generator — OG Tags | Contomatix',
    description: 'See how your link looks on Facebook, LinkedIn, and X, and generate the Open Graph tags to fix it, for free.',
    pageClass: 'page-tool'
  });
});

app.get('/tools/meta-tag-generator', (req, res) => {
  res.render('pages/meta-tag-generator', {
    title: 'Free Meta Tag Generator | Contomatix',
    description: 'Generate a complete, ready-to-paste HTML head block of meta tags — title, description, canonical, robots, and more — for free.',
    pageClass: 'page-tool'
  });
});

app.get('/tools/sitemap-generator', (req, res) => {
  res.render('pages/sitemap-generator', {
    title: 'Free XML Sitemap Generator — From a URL List | Contomatix',
    description: 'Turn a plain list of URLs into a valid sitemap.xml file in seconds, for free — no crawler or software needed.',
    pageClass: 'page-tool'
  });
});

app.get('/tools/hreflang-generator', (req, res) => {
  res.render('pages/hreflang-generator', {
    title: 'Free Hreflang Generator — International SEO Tags | Contomatix',
    description: 'Generate correct, reciprocal hreflang tags for multi-language and multi-region sites, for free, in seconds.',
    pageClass: 'page-tool'
  });
});

app.get('/tools/invoice-generator', (req, res) => {
  res.render('pages/invoice-generator', {
    title: 'Free Invoice Generator — Download PDF | Contomatix',
    description: 'Create a professional, itemized invoice and download it as a PDF in seconds. Free invoice generator, no signup, nothing leaves your browser.',
    pageClass: 'page-tool'
  });
});

app.get('/blog', (req, res) => {
  const blogPosts = blogStore.getPublished();
  const categoryNames = [...new Set(blogPosts.map(p => p.category))];
  const categoryBySlug = new Map(categoryNames.map(c => [blogStore.slugify(c), c]));
  const requestedSlug = (req.query.category || 'all').toLowerCase();
  const category = requestedSlug === 'all' ? 'All' : (categoryBySlug.get(requestedSlug) || 'All');
  const activeCategorySlug = category === 'All' ? 'all' : requestedSlug;
  const search = (req.query.q || '').trim();
  const categories = ['All', ...categoryNames].map(name => ({
    name,
    slug: name === 'All' ? 'all' : blogStore.slugify(name)
  }));
  // Newest first. Posts are appended to data/blog.js as they're written, so
  // without this the most recent work ends up on the last page of the listing.
  const byNewest = [...blogPosts].reverse().sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  let filtered = category === 'All' ? byNewest : byNewest.filter(p => p.category === category);
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(p => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q));
  }
  const perPage = 12;
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));

  const rawPage = req.query.page;
  const parsedPage = parseInt(rawPage, 10);
  if (rawPage !== undefined && (!Number.isInteger(parsedPage) || parsedPage < 1 || parsedPage > totalPages)) {
    return res.status(404).render('pages/404', { title: 'Page not found', pageClass: 'page-404' });
  }
  const page = parsedPage || 1;
  // Filtered/searched views are combinatorial and not meant to be indexed
  // individually; a bare paginated page (no filter) is real, unique content
  // and gets its own self-referencing canonical instead of pointing at page 1.
  const isFiltered = category !== 'All' || Boolean(search);
  const noIndex = isFiltered;
  const canonicalPath = page > 1 ? `/blog?page=${page}` : '/blog';
  const posts = filtered.slice((page - 1) * perPage, page * perPage).map(p => {
    const wordCount = p.content.replace(/<[^>]+>/g, ' ').trim().split(/\s+/).length;
    const authorMember = team.find(m => m.name === p.author);
    return {
      ...p,
      readMinutes: Math.max(1, Math.round(wordCount / 200)),
      authorInfo: authorMember ? withPhotoCheck(authorMember) : { name: p.author, hasPhoto: false }
    };
  });
  res.render('pages/blog', {
    title: page > 1 ? `Blog — Page ${page} — Contomatix` : 'Blog — SEO & Link Building Insights | Contomatix',
    description: 'SEO strategy, link building tactics, and content marketing insights from Contomatix.',
    pageClass: 'page-blog',
    posts,
    categories,
    activeCategory: category,
    activeCategorySlug,
    search,
    page,
    totalPages,
    noIndex,
    canonicalPath
  });
});

app.get('/blog/:slug', (req, res) => {
  const post = blogStore.getBySlug(req.params.slug);
  if (!post) return res.status(404).render('pages/404', { title: 'Page not found', pageClass: 'page-404' });
  // A scheduled (future-dated) post stays 404 for the public until its date
  // arrives; an admin can still open the link directly to preview it.
  if (!blogStore.isPublished(post) && !(req.session && req.session.isAdmin)) {
    return res.status(404).render('pages/404', { title: 'Page not found', pageClass: 'page-404' });
  }
  const author = post.author ? team.find(m => m.name === post.author) : null;
  const wordCount = post.content.replace(/<[^>]+>/g, ' ').trim().split(/\s+/).length;
  const readMinutes = Math.max(1, Math.round(wordCount / 200));
  res.render('pages/blog-post', {
    title: post.title,
    description: post.excerpt,
    pageClass: 'page-blog-post',
    image: post.image,
    ogType: 'article',
    articlePublishedTime: post.date + 'T00:00:00Z',
    post,
    categorySlug: blogStore.slugify(post.category),
    author: author ? withPhotoCheck(author) : null,
    readMinutes,
    faqs: extractFaqs(post.content),
    relatedPosts: blogStore.getRelated(post.slug, 3)
  });
});

app.get('/team', (req, res) => {
  res.render('pages/team', {
    title: 'Meet the Contomatix Team — SEO & Link Building Experts',
    description: 'Meet the SEO strategists and link building specialists behind Contomatix — the people who plan and run every campaign.',
    pageClass: 'page-team',
    team: team.map(withPhotoCheck)
  });
});

app.get('/about', (req, res) => {
  const blogPosts = blogStore.getPublished();
  res.render('pages/about', {
    title: 'About Contomatix — White-Hat SEO & Link Building Agency',
    description: 'Learn what Contomatix does, how the team works, and how we help brands rank higher through white-hat SEO.',
    pageClass: 'page-about',
    team: team.map(withPhotoCheck),
    services,
    postCount: blogPosts.length,
    marketCount: blogPosts.filter(p => p.slug.startsWith('best-seo-companies-in-')).length
  });
});

app.get('/privacy-policy', (req, res) => {
  res.render('pages/privacy', {
    title: 'Privacy Policy | Contomatix.com SEO Agency',
    description: 'How Contomatix collects, uses, and protects your information across our website and services.',
    pageClass: 'page-legal'
  });
});

app.get('/terms', (req, res) => {
  res.render('pages/terms', {
    title: 'Terms of Service — Contomatix.com',
    description: 'The terms governing use of contomatix.com and Contomatix\'s link building and SEO services.',
    pageClass: 'page-legal'
  });
});

app.get('/contact', (req, res) => {
  res.render('pages/contact', {
    title: 'Contact Contomatix — Get a Free SEO Audit',
    description: 'Get in touch with Contomatix for link building and SEO services — free audit, reply within 24 hours.',
    pageClass: 'page-contact',
    submitted: false,
    error: null,
    form: {}
  });
});

app.post('/contact', async (req, res) => {
  const name = (req.body.name || '').trim();
  const email = (req.body.email || '').trim();
  const message = (req.body.message || '').trim();

  // Honeypot: a real visitor never sees or fills this field (hidden off-screen).
  // A bot that fills every input trips it — pretend success without sending.
  if ((req.body.website || '').trim()) {
    return res.render('pages/contact', {
      title: 'Contact Contomatix — Get a Free SEO Audit',
      description: 'Get in touch with Contomatix for link building and SEO services — free audit, reply within 24 hours.',
      pageClass: 'page-contact',
      submitted: true,
      error: null,
      form: {}
    });
  }

  const renderContact = (state) => res.render('pages/contact', {
    title: 'Contact Contomatix — Get a Free SEO Audit',
    description: 'Get in touch with Contomatix for link building and SEO services — free audit, reply within 24 hours.',
    pageClass: 'page-contact',
    submitted: false,
    error: null,
    form: { name, email, message },
    ...state
  });

  if (!name || !email || !message) {
    return renderContact({ error: 'Please fill in your name, email, and message.' });
  }

  try {
    const result = await sendContactEmail({ name, email, message });
    if (!result.sent) {
      // SMTP not configured — keep the lead in the server log rather than losing it.
      console.warn('[contact] SMTP not configured — submission logged only:', { name, email, message });
    }
    return renderContact({ submitted: true, form: {} });
  } catch (err) {
    console.error('[contact] Failed to send email:', err);
    return renderContact({ error: 'Sorry — something went wrong sending your message. Please try again, or reach us on WhatsApp or email instead.' });
  }
});

// ---------- Admin dashboard ----------

const adminLoginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many login attempts. Please try again in 15 minutes.',
  handler: (req, res) => res.status(429).render('admin/login', {
    title: 'Log in', layout: 'admin/layout', hideNav: true,
    error: 'Too many login attempts. Please try again in 15 minutes.'
  })
});

app.get('/admin/login', (req, res) => {
  if (req.session.isAdmin) return res.redirect('/admin');
  res.render('admin/login', { title: 'Log in', layout: 'admin/layout', hideNav: true, error: null });
});

app.post('/admin/login', adminLoginLimiter, (req, res) => {
  const { username, password } = req.body;
  if (checkLogin(username, password)) {
    req.session.isAdmin = true;
    return res.redirect('/admin');
  }
  res.render('admin/login', { title: 'Log in', layout: 'admin/layout', hideNav: true, error: 'Incorrect username or password.' });
});

app.get('/admin/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/admin/login'));
});

app.get('/admin', requireAdmin, (req, res) => {
  const posts = [...blogStore.getAll()].reverse().sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  res.render('admin/dashboard', {
    title: 'Posts',
    layout: 'admin/layout',
    posts,
    today: new Date().toISOString().slice(0, 10),
    success: req.query.success || null,
    error: req.query.error || null
  });
});

app.get('/admin/posts/new', requireAdmin, (req, res) => {
  const posts = blogStore.getAll();
  res.render('admin/post-form', {
    title: 'New Post',
    layout: 'admin/layout',
    isEdit: false,
    post: {},
    categories: [...new Set(posts.map(p => p.category))].sort(),
    authors: [...new Set(posts.map(p => p.author))].sort(),
    error: null
  });
});

app.post('/admin/posts/new', requireAdmin, (req, res) => {
  const { title, slug, category, author, date, image, excerpt, content } = req.body;
  const cleanSlug = blogStore.slugify(slug);
  const posts = blogStore.getAll();
  try {
    blogStore.create({ slug: cleanSlug, title, category, excerpt, date, author, image: image || '', content });
    const msg = blogStore.isPublished({ date }) ? 'Post published.' : `Post scheduled — goes live automatically on ${date}.`;
    res.redirect('/admin?success=' + encodeURIComponent(msg));
  } catch (err) {
    res.render('admin/post-form', {
      title: 'New Post',
      layout: 'admin/layout',
      isEdit: false,
      post: { title, slug: cleanSlug, category, author, date, image, excerpt, content },
      categories: [...new Set(posts.map(p => p.category))].sort(),
      authors: [...new Set(posts.map(p => p.author))].sort(),
      error: err.message
    });
  }
});

app.get('/admin/posts/:slug/edit', requireAdmin, (req, res) => {
  const post = blogStore.getBySlug(req.params.slug);
  if (!post) return res.redirect('/admin?error=' + encodeURIComponent('Post not found.'));
  const posts = blogStore.getAll();
  res.render('admin/post-form', {
    title: 'Edit Post',
    layout: 'admin/layout',
    isEdit: true,
    post,
    categories: [...new Set(posts.map(p => p.category))].sort(),
    authors: [...new Set(posts.map(p => p.author))].sort(),
    error: null
  });
});

app.post('/admin/posts/:slug/edit', requireAdmin, (req, res) => {
  const { title, slug, category, author, date, image, excerpt, content } = req.body;
  const cleanSlug = blogStore.slugify(slug);
  const posts = blogStore.getAll();
  try {
    blogStore.update(req.params.slug, { slug: cleanSlug, title, category, excerpt, date, author, image: image || '', content });
    const msg = blogStore.isPublished({ date }) ? 'Changes saved.' : `Changes saved — scheduled to go live automatically on ${date}.`;
    res.redirect('/admin?success=' + encodeURIComponent(msg));
  } catch (err) {
    res.render('admin/post-form', {
      title: 'Edit Post',
      layout: 'admin/layout',
      isEdit: true,
      post: { title, slug: cleanSlug, category, author, date, image, excerpt, content },
      categories: [...new Set(posts.map(p => p.category))].sort(),
      authors: [...new Set(posts.map(p => p.author))].sort(),
      error: err.message
    });
  }
});

app.post('/admin/posts/:slug/delete', requireAdmin, (req, res) => {
  try {
    blogStore.remove(req.params.slug);
    res.redirect('/admin?success=' + encodeURIComponent('Post deleted.'));
  } catch (err) {
    res.redirect('/admin?error=' + encodeURIComponent(err.message));
  }
});

// 404
app.use((req, res) => {
  res.status(404).render('pages/404', { title: 'Page not found', pageClass: 'page-404' });
});

app.listen(PORT, () => {
  console.log(`Contomatix site running at http://localhost:${PORT}`);
});
