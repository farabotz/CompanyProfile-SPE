import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

function walk(dir, filelist = []) {
  const files = fs.readdirSync(dir);
  files.forEach((f) => {
    const fp = path.join(dir, f);
    const stat = fs.statSync(fp);
    if (stat.isDirectory()) {
      // skip node_modules and .git
      if (f === 'node_modules' || f === '.git') return;
      walk(fp, filelist);
    } else {
      filelist.push(fp);
    }
  });
  return filelist;
}

const banned = [
  { key: 'EM_DASH', pattern: /—/g, message: 'Em-dash (—) found. Taste Skill bans em-dashes; replace with hyphen (-).' },
  { key: 'H_SCREEN', pattern: /h-screen/g, message: 'Use min-h-[100dvh] instead of h-screen for viewport stability.' },
  { key: 'SCROLL_LISTENER', pattern: /window\.addEventListener\((?:'|")scroll(?:'|")/g, message: 'window.scroll listeners are banned; use Motion useScroll or IntersectionObserver.' },
];

const files = walk(ROOT).filter((p) => {
  const normalized = p.split(path.sep).join('/');
  return normalized.includes('/src/') || normalized.includes('/docs/') || normalized.includes('/public/');
});

const results = [];

files.forEach((file) => {
  try {
    const txt = fs.readFileSync(file, 'utf8');
    banned.forEach((b) => {
      const m = txt.match(b.pattern);
      if (m && m.length > 0) {
        results.push({ file: path.relative(ROOT, file), key: b.key, count: m.length, message: b.message });
      }
    });
  } catch {
    // ignore binary
  }
});

if (results.length === 0) {
  console.log('TASTE PREFLIGHT: OK — no obvious banned patterns found.');
  process.exit(0);
}

console.log('TASTE PREFLIGHT: Issues found:');
results.forEach((r) => {
  console.log(`- ${r.file}: [${r.key}] ${r.count} occurrence(s) — ${r.message}`);
});
process.exit(2);
