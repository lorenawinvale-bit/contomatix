const fs = require('fs');
const express = require('express');
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '.env') });
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');

const services = require('./data/services');
const locations = require('./data/locations');
const blogStore = require('./lib/blogStore');
const team = require('./data/team');
const site = require('./data/site');
const { sendContactEmail, smtpConfigured } = require('./lib/mailer');
const { checkLogin, requireAdmin } = require('./lib/adminAuth');
const multer = require('multer');

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
app.use(session({
  secret: process.env.SESSION_SECRET || 'dev-only-insecure-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, maxAge: 1000 * 60 * 60 * 8 } // 8 hours
}));

// Helper: pass common data to every view
app.use((req, res, next) => {
  res.locals.services = services;
  res.locals.currentPath = req.path;
  res.locals.siteName = 'Contomatix';
  res.locals.site = site;
  // Fallbacks so views that don't pass these (e.g. 404) still render.
  res.locals.description = 'Contomatix — link building and SEO services.';
  next();
});

// ---------- Routes ----------

app.get('/sitemap.xml', (req, res) => {
  const staticPaths = ['/', '/about', '/team', '/contact', '/blog', '/privacy-policy', '/terms'];
  const servicePaths = services.map(s => `/services/${s.slug}`);
  const locationPaths = locations.map(l => `/services/${l.slug}`);
  const blogPaths = blogStore.getAll().map(p => `/blog/${p.slug}`);
  const urls = [...staticPaths, ...servicePaths, ...locationPaths, ...blogPaths];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url><loc>${site.baseUrl}${u}</loc></url>`).join('\n')}
</urlset>`;

  res.type('application/xml').send(xml);
});

app.get('/robots.txt', (req, res) => {
  res.type('text/plain').send(`User-agent: *
Allow: /
Disallow: /admin

Sitemap: ${site.baseUrl}/sitemap.xml`);
});

app.get('/', (req, res) => {
  const allPosts = blogStore.getAll();
  const latestPosts = [...allPosts]
    .reverse()
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
    .slice(0, 6);
  res.render('pages/home', {
    title: 'Contomatix — Link Building & SEO Services',
    description: 'Contomatix helps brands grow organic traffic through link building, guest posting, on-page & off-page SEO, and keyword research.',
    pageClass: 'page-home',
    postCount: allPosts.length,
    marketCount: allPosts.filter(p => p.slug.startsWith('best-seo-companies-in-')).length,
    latestPosts
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

app.get('/blog', (req, res) => {
  const blogPosts = blogStore.getAll();
  const category = req.query.category || 'All';
  const search = (req.query.q || '').trim();
  const categories = ['All', ...new Set(blogPosts.map(p => p.category))];
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
  const page = Math.min(totalPages, Math.max(1, parseInt(req.query.page, 10) || 1));
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
    title: 'Blog — Contomatix',
    description: 'SEO strategy, link building tactics, and content marketing insights from Contomatix.',
    pageClass: 'page-blog',
    posts,
    categories,
    activeCategory: category,
    search,
    page,
    totalPages
  });
});

app.get('/blog/:slug', (req, res) => {
  const post = blogStore.getBySlug(req.params.slug);
  if (!post) return res.status(404).render('pages/404', { title: 'Page not found', pageClass: 'page-404' });
  const author = post.author ? team.find(m => m.name === post.author) : null;
  const wordCount = post.content.replace(/<[^>]+>/g, ' ').trim().split(/\s+/).length;
  const readMinutes = Math.max(1, Math.round(wordCount / 200));
  res.render('pages/blog-post', {
    title: post.title,
    description: post.excerpt,
    pageClass: 'page-blog-post',
    post,
    author: author ? withPhotoCheck(author) : null,
    readMinutes,
    faqs: extractFaqs(post.content)
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
  const blogPosts = blogStore.getAll();
  res.render('pages/about', {
    title: 'About Contomatix — White-Hat SEO & Link Building Agency',
    description: 'Learn what Contomatix does and how we help brands rank higher.',
    pageClass: 'page-about',
    team: team.map(withPhotoCheck),
    services,
    postCount: blogPosts.length,
    marketCount: blogPosts.filter(p => p.slug.startsWith('best-seo-companies-in-')).length
  });
});

app.get('/privacy-policy', (req, res) => {
  res.render('pages/privacy', {
    title: 'Privacy Policy — Contomatix',
    description: 'How Contomatix collects, uses, and protects your information.',
    pageClass: 'page-legal'
  });
});

app.get('/terms', (req, res) => {
  res.render('pages/terms', {
    title: 'Terms of Service — Contomatix',
    description: 'The terms governing use of contomatix.com and Contomatix services.',
    pageClass: 'page-legal'
  });
});

app.get('/contact', (req, res) => {
  res.render('pages/contact', {
    title: 'Contact Us — Contomatix',
    description: 'Get in touch with Contomatix for link building and SEO services.',
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

  const renderContact = (state) => res.render('pages/contact', {
    title: 'Contact Us — Contomatix',
    description: 'Get in touch with Contomatix for link building and SEO services.',
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

app.get('/admin/login', (req, res) => {
  if (req.session.isAdmin) return res.redirect('/admin');
  res.render('admin/login', { title: 'Log in', layout: 'admin/layout', hideNav: true, error: null });
});

app.post('/admin/login', (req, res) => {
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
    res.redirect('/admin?success=' + encodeURIComponent('Post published.'));
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
    res.redirect('/admin?success=' + encodeURIComponent('Changes saved.'));
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
