import fs from 'node:fs';

const data = JSON.parse(fs.readFileSync('scratch/notion_extracted/central-de-midia.raw.json', 'utf8'));

for (const b of Object.values(data)) {
  const str = JSON.stringify(b);
  if (str.includes('drive.google.com')) {
    const title = b.properties?.title ? b.properties.title.map(c => c[0]).join('') : '';
    const urls = str.match(/https:\/\/drive\.google\.com\/[^"]+/g) || [];
    console.log(`[${b.type}] Title: "${title}"`);
    urls.forEach(u => console.log('  ->', u));
  }
}
