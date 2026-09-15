const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '..', 'data', 'blog.json');

// Reads fresh from disk every call (no require() caching) so admin edits
// show up immediately without restarting the server.
function getAll() {
  return JSON.parse(fs.readFileSync(FILE, 'utf8'));
}

function saveAll(posts) {
  fs.writeFileSync(FILE, JSON.stringify(posts, null, 2), 'utf8');
}

function getBySlug(slug) {
  return getAll().find(p => p.slug === slug);
}

function slugify(str) {
  return String(str)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function create(post) {
  const posts = getAll();
  if (posts.some(p => p.slug === post.slug)) {
    throw new Error('A post with this slug already exists.');
  }
  posts.unshift(post);
  saveAll(posts);
}

function update(originalSlug, updates) {
  const posts = getAll();
  const idx = posts.findIndex(p => p.slug === originalSlug);
  if (idx === -1) throw new Error('Post not found.');
  if (updates.slug !== originalSlug && posts.some(p => p.slug === updates.slug)) {
    throw new Error('Another post already uses that slug.');
  }
  posts[idx] = { ...posts[idx], ...updates };
  saveAll(posts);
}

function remove(slug) {
  const posts = getAll();
  const filtered = posts.filter(p => p.slug !== slug);
  if (filtered.length === posts.length) throw new Error('Post not found.');
  saveAll(filtered);
}

// Deterministic "related guides" picker: every post is assigned exactly 3
// outgoing links to the next 3 posts (by slug) in its own category, cyclically.
// Because it's cyclic, every post also *receives* exactly 3 incoming links —
// from the 3 posts immediately before it in that same cycle — which is what
// fixes the "zero/one incoming internal link" gap sitewide, permanently, for
// current and future posts alike (no per-post hand-editing needed).
// Categories too small for 3 distinct same-category posts fall back to the
// same cyclic trick over the full site, sorted by slug, so every post still
// gets 3 related links either way.
function getRelated(slug, count) {
  count = count || 3;
  const all = getAll();
  const post = all.find(p => p.slug === slug);
  if (!post) return [];

  function cyclicNext(pool) {
    const sorted = [...pool].sort((a, b) => a.slug.localeCompare(b.slug));
    const idx = sorted.findIndex(p => p.slug === slug);
    if (idx === -1 || sorted.length < 2) return [];
    const picks = [];
    for (let i = 1; i <= count && picks.length < count; i++) {
      const candidate = sorted[(idx + i) % sorted.length];
      if (candidate.slug !== slug) picks.push(candidate);
    }
    return picks;
  }

  const sameCategory = all.filter(p => p.category === post.category);
  if (sameCategory.length > count) return cyclicNext(sameCategory);

  // Categories too small to self-supply 3 related posts (a handful of
  // one-off categories) are pooled together into their own closed cycle
  // instead of falling back to the full site — the full-site fallback would
  // only ever point OUT to a big-category post (which never links back),
  // leaving these posts permanently stuck at 0 incoming links.
  const smallCategoryPool = all.filter(p => all.filter(q => q.category === p.category).length <= count);
  return cyclicNext(smallCategoryPool);
}

module.exports = { getAll, getBySlug, create, update, remove, slugify, getRelated };
