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
      if (f === 'node_modules' || f === '.git') return;
      walk(fp, filelist);
    } else {
      filelist.push(fp);
    }
  });
  return filelist;
}

const targets = walk(ROOT).filter((p) => p.includes(path.sep + 'docs' + path.sep) || p.includes(path.sep + 'src' + path.sep));

let changed = 0;
targets.forEach((file) => {
  try {
    const txt = fs.readFileSync(file, 'utf8');
    if (txt.includes('—')) {
      const replaced = txt.split('—').join('-');
      fs.writeFileSync(file, replaced, 'utf8');
      console.log(`Replaced em-dash in ${path.relative(ROOT, file)}`);
      changed++;
    }
  } catch {
    // ignore binary
  }
});

console.log(`Done. Files changed: ${changed}`);
process.exit(0);
