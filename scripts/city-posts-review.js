// Lists every city/local list post with its size and Search Console numbers, and a suggested action. Review only, changes nothing. node scripts/city-posts-review.js
const fs=require('fs');const path=require('path');const posts=require('../data/blog.json');
const gsc=path.join(__dirname,'..','..','gsc-exports');const latest=fs.readdirSync(gsc).filter(d=>/^performance-/.test(d)).sort().pop();
const pg={};for(const l of fs.readFileSync(path.join(gsc,latest,'Pages.csv'),'utf8').split(/\r?\n/).slice(1)){const m=l.match(/^(.*),(\d+),(\d+),([\d.]+)%,([\d.]+)$/);if(m)pg[m[1].replace('https://contomatix.com','')]={c:+m[2],i:+m[3],p:+m[5]}}
const isCity=(s,cat)=>/(top-|best-).*(compan|agenc|expert)|seo-compan|digital-marketing-|graphic-design|web-design|recruit|email-marketing|marketing-agenc|-sea|local-seo|-seo-(in|for)-|search-engine-optimization-/.test(s)||['Local SEO','Recruiting & Staffing'].includes(cat);
const rows=[];for(const p of posts){if(!isCity(p.slug,p.category))continue;const g=pg['/blog/'+p.slug]||{c:0,i:0,p:0};const words=p.content.replace(/<[^>]+>/g,' ').split(/\s+/).length;const imgs=(p.content.match(/<img /g)||[]).length;
let act;if(g.c>0||g.i>=300)act='KEEP and improve (has traction)';else if(words<1800&&g.i<60)act='REVIEW: thin and almost no impressions (merge or noindex candidate)';else if(g.i<60)act='REVIEW: almost no impressions';else act='KEEP, lower priority';
rows.push({slug:p.slug,words,imgs,imp:g.i,clicks:g.c,pos:g.p,act})}
rows.sort((a,b)=>b.imp-a.imp);
fs.writeFileSync(path.join(__dirname,'..','docs','city-posts-review-2026-11-11.csv'),'slug,words,images,impressions_3mo,clicks,avg_position,suggested_action\n'+rows.map(r=>[r.slug,r.words,r.imgs,r.imp,r.clicks,r.pos,'"'+r.act+'"'].join(',')).join('\n'));
const cnt=k=>rows.filter(r=>r.act.startsWith(k)).length;
console.log('city/local posts:',rows.length,'| KEEP and improve:',cnt('KEEP and'),'| KEEP lower priority:',cnt('KEEP, lower'),'| REVIEW almost no impressions:',cnt('REVIEW: almost'),'| REVIEW thin and no impressions:',cnt('REVIEW: thin'));
console.log('words <1800:',rows.filter(r=>r.words<1800).length,'| words <2200:',rows.filter(r=>r.words<2200).length,'| zero impressions:',rows.filter(r=>r.imp===0).length);
console.log('impressions held by the REVIEW groups:',rows.filter(r=>r.act.startsWith('REVIEW')).reduce((a,r)=>a+r.imp,0),'of',rows.reduce((a,r)=>a+r.imp,0));
console.log('\ntop 8 by impressions:\n'+rows.slice(0,8).map(r=>`  ${r.slug} ${r.imp} imp, ${r.clicks} clicks, pos ${r.pos}, ${r.words} words`).join('\n'));
