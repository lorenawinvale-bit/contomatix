const fs=require('fs');
const blog=require('../data/blog.json');const tools=require('../data/tools.js');const services=require('../data/services.js');
const rows=fs.readFileSync(__dirname+'/../../keyword-research/niche-pool-2026-10-14.csv','utf8').trim().split('\n').slice(1).map(l=>{const m=l.match(/^(\d+),"([^"]*)",(\d+),(\d+),(\d+),"([^"]*)",([^,]*),([^,]*),/);return {rank:+m[1],k:m[2],v:+m[3],total:+m[4],kd:+m[5],variants:m[6],cluster:m[7],asset:m[8]}});
const stop=new Set(['for','the','a','an','of','to','in','and','on','is','my','your','how','what','are','do','vs','with','free','online','best','top']);
const st=t=>t.replace(/(ing|es|s)$/,'');
const toks=k=>[...new Set(k.toLowerCase().replace(/-/g,' ').split(/[^a-z0-9]+/).filter(t=>t&&!stop.has(t)).map(st))];
const hay=blog.map(p=>({slug:p.slug,t:toks(p.slug+' '+p.title),body:p.content.toLowerCase()}));
const extra=[...tools.map(t=>({slug:'tool:'+t.slug,t:toks(t.slug+' '+t.title+' '+t.summary),body:''})),...services.map(s=>({slug:'service:'+s.slug,t:toks(s.slug+' '+s.title),body:''}))];
const out=[];
for(const r of rows){
  const kt=toks(r.k).filter(t=>!['seo'].includes(t));
  const all=[...hay,...extra];
  const full=all.filter(h=>kt.length>=2&&kt.every(t=>h.t.includes(t))).map(h=>h.slug);
  const body=hay.filter(h=>h.body.includes(r.k.toLowerCase())).map(h=>h.slug);
  const vt=r.variants?r.variants.split('; ').filter(Boolean):[];
  const vbody=vt.filter(v=>hay.some(h=>h.body.includes(v.toLowerCase())));
  out.push({rank:r.rank,k:r.k,titleSlugHit:full.slice(0,3),bodyHits:body.length,bodySample:body.slice(0,2),variantsInBody:vbody});
}
const flagged=out.filter(o=>o.titleSlugHit.length||o.bodyHits>=2);
console.log('flagged',flagged.length,'of',out.length);
flagged.forEach(o=>console.log(o.rank,o.k,'| slug/title:',o.titleSlugHit.join(','),'| body:',o.bodyHits,o.bodySample.join(',')));
fs.writeFileSync(__dirname+'/dup.tmp.json',JSON.stringify(out));
