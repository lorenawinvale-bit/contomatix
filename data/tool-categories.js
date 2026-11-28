// Tool categories: used by the /tools directory (filters, icons) and by each tool page (sister-tool tabs, related cards).
const categories = [
  { id: 'links', name: 'Link building', c: '#0B807C', bg: '#E3F5F2', icon: '<path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/>', slugs: ['link-prospect-scorer', 'outreach-email-generator', 'link-building-cost-calculator', 'dofollow-link-checker', 'anchor-text-checker', 'outbound-link-checker', 'internal-link-checker', 'backlink-monitor-tool', 'link-building-management-tool'] },
  { id: 'tech', name: 'Technical SEO', c: '#334155', bg: '#E7ECF3', icon: '<path d="M8 6l-6 6 6 6M16 6l6 6-6 6M14 4l-4 16"/>', slugs: ['robots-txt-generator', 'robots-txt-tester', 'sitemap-generator', 'sitemap-validator', 'sitemap-finder', 'sitemap-url-extractor', 'html-sitemap-generator', 'hreflang-generator', 'hreflang-sitemap-validator', 'canonical-tag-checker', 'schema-markup-generator', 'schema-markup-validator', 'technical-seo-audit-tool', 'log-file-analyzer', 'redirect-mapper', 'slug-generator'] },
  { id: 'onpage', name: 'On-page and content', c: '#9A4E06', bg: '#FBEBD3', icon: '<path d="M6 3h9l4 4v14H6zM9 12h7M9 16h7M9 8h3"/>', slugs: ['serp-snippet-preview', 'meta-description-checker', 'meta-tag-generator', 'og-preview-generator', 'heading-checker', 'readability-checker', 'content-brief-generator'] },
  { id: 'research', name: 'Keywords and local', c: '#BE185D', bg: '#FCE8F1', icon: '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.5-4.5"/>', slugs: ['keyword-grouping-tool', 'keyword-mapping-tool', 'geo-grid-rank-planner'] },
  { id: 'ai', name: 'AI search', c: '#6D28D9', bg: '#EFE9FD', icon: '<path d="M12 3l2.2 6.8L21 12l-6.8 2.2L12 21l-2.2-6.8L3 12l6.8-2.2z"/>', slugs: ['llm-seo-checker', 'llms-txt-generator'] },
  { id: 'biz', name: 'Reporting and business', c: '#0E7490', bg: '#E1F3F7', icon: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>', slugs: ['utm-builder', 'seo-report-generator', 'seo-proposal-generator', 'content-marketing-roi-calculator', 'invoice-generator'] }
];
const more = { id: 'more', name: 'More', c: '#0B807C', bg: '#E3F5F2', icon: '<circle cx="12" cy="12" r="8"/>', slugs: [] };
const categoryOf = (slug) => categories.find((c) => c.slugs.includes(slug)) || more;
module.exports = { categories, categoryOf };
