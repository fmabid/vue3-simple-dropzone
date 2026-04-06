import { readFileSync, writeFileSync, copyFileSync, existsSync, readdirSync, statSync, unlinkSync, rmdirSync } from 'fs';
import { resolve, dirname, extname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const distDir = resolve(__dirname, '../dist');

// --- 1. Clean up .d.ts files and their directories from dist ---
function cleanDeclarationFiles(dir) {
  for (const entry of readdirSync(dir)) {
    const fullPath = resolve(dir, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      cleanDeclarationFiles(fullPath);
      // Remove empty directories left behind
      if (readdirSync(fullPath).length === 0) {
        rmdirSync(fullPath);
      }
    } else if (entry.endsWith('.d.ts')) {
      unlinkSync(fullPath);
    }
  }
}

cleanDeclarationFiles(distDir);

// --- 2. Generate a clean package.json for dist ---
const packageJson = JSON.parse(
  readFileSync(resolve(__dirname, '../package.json'), 'utf-8')
);

delete packageJson.scripts;
delete packageJson.devDependencies;
delete packageJson.packageManager;

packageJson.files = ['*.js', '*.css', 'package.json', 'LICENSE', 'README.md'];

packageJson.main = './vue3-simple-dropzone.umd.js';
packageJson.module = './vue3-simple-dropzone.es.js';

packageJson.exports = {
  '.': {
    import: './vue3-simple-dropzone.es.js',
    require: './vue3-simple-dropzone.umd.js',
  },
  './style.css': './style.css'
};

writeFileSync(
  resolve(distDir, 'package.json'),
  JSON.stringify(packageJson, null, 2),
  'utf-8'
);

// --- 3. LICENSE and README into dist ---
for (const file of ['LICENSE', 'README.md']) {
  const src = resolve(__dirname, '..', file);
  if (existsSync(src)) {
    copyFileSync(src, resolve(distDir, file));
    console.log(`  ✓ Copied ${file}`);
  }
}

console.log('✓ Package prepared for publishing');
console.log(`  Name: ${packageJson.name}`);
console.log(`  Version: ${packageJson.version}`);
