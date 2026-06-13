#!/usr/bin/env node
/* TOOL (not shipped): for a bacterium key, extract the actual textbox contents
 * across the site that mention it, with source page + nearest section anchor.
 * Usage: node scripts/extract-bacteria-context.js <key>
 * Gives the raw source material to synthesize resident-oriented related-data. */
const fs=require('fs'),path=require('path'),cp=require('child_process');
const ROOT=process.cwd();
const key=process.argv[2];
if(!key){console.error('usage: node scripts/extract-bacteria-context.js <key>');process.exit(1);}

// terms (same logic as index): sci name + aliases
const ALIASES={
  saureus:['Staphylococcus aureus','S. aureus','黄色ブドウ球菌','MRSA','MSSA'],
  sepi:['Staphylococcus epidermidis','S. epidermidis','表皮ブドウ球菌','MRSE'],
  ecoli:['Escherichia coli','E. coli','大腸菌'],
  kpneu:['Klebsiella pneumoniae','K. pneumoniae','肺炎桿菌'],
  paerug:['Pseudomonas aeruginosa','P. aeruginosa','緑膿菌'],
  listeria:['Listeria monocytogenes','L. monocytogenes','リステリア'],
  cdiff:['Clostridioides difficile','Clostridium difficile','C. difficile'],
};
const bhtml=fs.readFileSync(path.join(ROOT,'pages/bacteria',key+'.html'),'utf8');
const sci=(bhtml.match(/<h1 class="bp-name-sci">([^<]*)<\/h1>/)||[])[1]||'';
let terms=new Set(ALIASES[key]||[]);
const bino=sci.match(/^([A-Z][a-z]+)\s+([a-z]+)$/);
if(bino){terms.add(bino[1]+' '+bino[2]);terms.add(bino[1][0]+'. '+bino[2]);}
terms=[...terms].filter(Boolean);

function stripTags(s){return s.replace(/<sup>.*?<\/sup>/g,'').replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim();}
function pageTitle(h){return ((h.match(/<title>([^<]*)<\/title>/)||[])[1]||'').split('|')[0].trim();}

// find balanced <div class="card"...> blocks
function cards(h){
  const res=[];const re=/<div class="card\b[^"]*"/g;let m;
  while((m=re.exec(h))){
    let i=m.index,depth=0,end=-1;const dre=/<div\b|<\/div>/g;dre.lastIndex=i;let d;
    while((d=dre.exec(h))){if(d[0]==='</div>'){depth--;if(depth===0){end=d.index+6;break;}}else depth++;}
    if(end>0){res.push([i,end,h.slice(i,end)]);re.lastIndex=end;}
  }
  return res;
}
function nearestAnchor(h,pos){
  const pre=h.slice(0,pos);
  // nearest preceding id="..." on a heading
  const ids=[...pre.matchAll(/<h[1-4][^>]*\bid="([^"]+)"[^>]*>([\s\S]*?)<\/h[1-4]>/g)];
  if(ids.length){const last=ids[ids.length-1];return {id:last[1],title:stripTags(last[2]).slice(0,60)};}
  return {id:'',title:''};
}

const allHtml=cp.execSync("git ls-files 'pages/**/*.html' 'pages/*.html'",{cwd:ROOT,encoding:'utf8'}).split('\n').filter(Boolean);
const skip=/\/bacteria\/|articles-guidelines\.html|articles-outpatient\.html|disease-topics\.html$|recent-all\.html|\/index\.html$/;
const pages=allHtml.filter(p=>!skip.test(p));

let count=0;
for(const p of pages){
  let h;try{h=fs.readFileSync(path.join(ROOT,p),'utf8');}catch(e){continue;}
  if(!terms.some(t=>h.includes(t)))continue;
  const pt=pageTitle(h);const url='../'+p.replace(/^pages\//,'');
  for(const [s,e,block] of cards(h)){
    if(!terms.some(t=>block.includes(t)))continue;
    const txt=stripTags(block);
    if(txt.length<20)continue;
    const a=nearestAnchor(h,s);
    count++;
    console.log('\n### ['+pt+'] '+(a.title||'(no section)')+'  '+url+(a.id?'#'+a.id:''));
    console.log(txt.slice(0,700));
  }
}
console.error('\n['+key+'] terms='+JSON.stringify(terms)+'  matched boxes='+count);
