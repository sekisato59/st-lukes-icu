#!/usr/bin/env node
/* Build index of which site pages contain textbox mentions of each bacterium.
 * Output: pages/bacteria/related-index.js  (window.BACTERIA_BOX_INDEX)
 * Runtime loader fetches the listed pages and extracts matching .card boxes. */
const fs=require('fs'), path=require('path'), cp=require('child_process');
const ROOT=process.cwd();
const BACT_DIR=path.join(ROOT,'pages/bacteria');

// 1) derive search terms per bacterium from its page
function termsFor(key, html){
  const sci=(html.match(/<h1 class="bp-name-sci">([^<]*)<\/h1>/)||[])[1]||'';
  const terms=new Set();
  // clean binomial: "Genus species"
  const bino=sci.match(/^([A-Z][a-z]+)\s+([a-z]+)$/);
  if(bino){ terms.add(bino[1]+' '+bino[2]); terms.add(bino[1][0]+'. '+bino[2]); }
  // also collect any italic binomials in the page hero/meta as fallback
  return {sci, terms:[...terms]};
}

// 2) curated alias terms (Japanese names / abbreviations) for better recall
const ALIASES = {
  saureus:['Staphylococcus aureus','S. aureus','黄色ブドウ球菌','MRSA','MSSA'],
  sepi:['Staphylococcus epidermidis','S. epidermidis','表皮ブドウ球菌','MRSE','CoNS'],
  ecoli:['Escherichia coli','E. coli','大腸菌','ESBL'],
  kpneu:['Klebsiella pneumoniae','K. pneumoniae','肺炎桿菌','肺炎桿菌'],
  paeruginosa:['Pseudomonas aeruginosa','P. aeruginosa','緑膿菌'],
  efaecalis:['Enterococcus faecalis','E. faecalis','腸球菌'],
  efaecium:['Enterococcus faecium','E. faecium','腸球菌','VRE'],
  listeria:['Listeria monocytogenes','L. monocytogenes','リステリア'],
  cdiff:['Clostridioides difficile','Clostridium difficile','C. difficile','CD腸炎'],
};

const bactFiles=fs.readdirSync(BACT_DIR).filter(f=>/^[a-z0-9_-]+\.html$/.test(f)&&!/related-/.test(f));
const bacteria={};
for(const f of bactFiles){
  const key=f.replace('.html','');
  const html=fs.readFileSync(path.join(BACT_DIR,f),'utf8');
  const t=termsFor(key,html);
  let terms=new Set([...t.terms, ...(ALIASES[key]||[])]);
  bacteria[key]={sci:t.sci, terms:[...terms].filter(Boolean)};
}

// 3) scan content pages
const allHtml=cp.execSync("git ls-files 'pages/**/*.html' 'pages/*.html'",{cwd:ROOT,encoding:'utf8'}).split('\n').filter(Boolean);
const skip=/\/bacteria\/|articles-guidelines\.html|articles-outpatient\.html|disease-topics\.html$|recent-all\.html|\/index\.html$/;
const pages=allHtml.filter(p=>!skip.test(p));

const index={};
let stats=[];
for(const key in bacteria){
  const terms=bacteria[key].terms;
  if(!terms.length){ index[key]={terms:[],pages:[]}; continue; }
  const hits=[];
  for(const p of pages){
    let html;try{html=fs.readFileSync(path.join(ROOT,p),'utf8');}catch(e){continue;}
    if(terms.some(t=>html.includes(t))) hits.push('../'+p.replace(/^pages\//,''));
  }
  index[key]={terms, pages:hits};
  stats.push([key, terms.length, hits.length]);
}
stats.sort((a,b)=>b[2]-a[2]);
console.log('bacteria:',Object.keys(bacteria).length);
console.log('top by page-hits:'); stats.slice(0,12).forEach(s=>console.log('  '+s[0]+': '+s[2]+' pages ('+s[1]+' terms)'));
console.log('zero-hit bacteria:', stats.filter(s=>s[2]===0).length);
