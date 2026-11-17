import fs from 'node:fs';

const ganchosRaw = JSON.parse(fs.readFileSync('scratch/notion_full/ganchos.json', 'utf8'));
console.log('Total blocks in ganchos:', Object.keys(ganchosRaw).length);

for (const b of Object.values(ganchosRaw)) {
  const title = b.properties?.title ? b.properties.title.map(c => c[0]).join('') : '';
  if (b.type === 'sub_header' || b.type === 'header' || b.type === 'table') {
    console.log(`[${b.type}] "${title}" (id: ${b.id}, children: ${b.content?.length || 0})`);
  }
}
