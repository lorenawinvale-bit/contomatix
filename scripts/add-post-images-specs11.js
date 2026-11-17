// Image specs, set 11 (17 Nov 2026): brand-appears-in-chatgpt-ai-search-2026 had no content images. Facts come from the post and our own check on 17 Nov 2026.
module.exports = D => [
  {
    slug: 'brand-appears-in-chatgpt-ai-search-2026',
    images: [
      { name: 'twelve-prompt-test', afterH2: 'The 12-Prompt Test', alt: 'The 12-prompt test: write prompts, run each more than once, log the result, repeat',
        svg: D.flow({ w: 1200, h: 440, title: 'The 12-prompt test in four moves', steps: [
          { t: 'Write 12 prompts', s: 'What a customer would ask', c: 'Not your brand name' }, { t: 'Run each twice or more', s: 'Answers change between runs', c: 'Note the range' }, { t: 'Log the result', s: 'Prompt, assistant, date', c: 'In a simple sheet' }, { t: 'Repeat monthly', s: 'Same prompts every time', c: 'Compare trends' }] }) },
      { name: 'three-levels', afterH2: 'Mentioned, Named, or Linked: Why the Distinction Matters', alt: 'Three levels of AI visibility: mentioned, named and linked',
        svg: D.cards({ w: 1200, h: 520, title: 'Three levels of showing up', qLabel: 'Worth', items: [
          { big: 'Mentioned', t: 'The answer refers to your category or idea', d: 'No brand name', q: 'Lowest' },
          { big: 'Named', t: 'The answer says your brand name', d: 'No link attached', q: 'Medium' },
          { big: 'Linked', t: 'The answer cites a link to your page', d: 'Readers can click through', q: 'Highest' }] }) },
      { name: 'our-own-check', afterH2: 'What Google\'s AI Said About Us, 17 November 2026', alt: 'Our own check on 17 November 2026: two searches, one accurate answer, one answer citing others',
        svg: D.stats({ cols: 2, title: 'Our own check, one day', items: [
          { big: '2', t: 'searches run: our brand name and "is contomatix worth it"' }, { big: 'Accurate', t: 'the brand answer matched our services', color: '#F5A623' },
          { big: '2', t: 'sources cited: our site and a directory listing' }, { big: 'Not ours', t: 'a competitor article also shaped the second answer', color: '#F5A623' }] }) }
    ]
  }
];
