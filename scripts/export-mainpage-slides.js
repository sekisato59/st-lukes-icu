const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const deckPath = path.join(root, 'docs', 'mainpage-public-slide-deck.html');
const outDir = path.join(root, 'docs', 'slide-exports');
const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const baseUrl = process.env.SLIDE_BASE_URL || 'http://[::1]:3001/docs/mainpage-public-slide-deck.html';

if (!fs.existsSync(chrome)) {
  throw new Error(`Google Chrome not found at ${chrome}`);
}
if (!fs.existsSync(deckPath)) {
  throw new Error(`Deck not found at ${deckPath}`);
}
fs.mkdirSync(outDir, { recursive: true });

const html = fs.readFileSync(deckPath, 'utf8');
const slideCount = (html.match(/<section class="slide/g) || []).length;
if (!slideCount) throw new Error('No slides found.');

for (let i = 1; i <= slideCount; i += 1) {
  const out = path.join(outDir, `mainpage-public-slide-${String(i).padStart(2, '0')}.png`);
  const url = `${baseUrl}?slide=${i}`;
  const userDataDir = path.join('/tmp', `stlukes-slide-chrome-${process.pid}-${i}`);
  const args = [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-background-networking',
    '--disable-sync',
    '--font-render-hinting=medium',
    '--window-size=1280,720',
    '--force-device-scale-factor=2',
    `--user-data-dir=${userDataDir}`,
    `--screenshot=${out}`,
    '--virtual-time-budget=4000',
    url,
  ];
  console.log(`Exporting ${i}/${slideCount}: ${path.relative(root, out)}`);
  const result = spawnSync(chrome, args, { stdio: 'inherit', timeout: 20000 });
  if (result.error && result.error.code !== 'ETIMEDOUT') {
    throw result.error;
  }
  if (!fs.existsSync(out)) {
    throw new Error(`Chrome did not create ${out}`);
  }
  if (result.status && result.status !== 0 && result.error?.code !== 'ETIMEDOUT') {
    throw new Error(`Chrome exited with status ${result.status}`);
  }
  fs.rmSync(userDataDir, { recursive: true, force: true });
}

console.log(`Done. Exported ${slideCount} slides to ${path.relative(root, outDir)}`);
