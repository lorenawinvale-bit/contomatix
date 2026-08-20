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

module.exports = { getAll, getBySlug, create, update, remove, slugify };
