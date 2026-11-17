import fs from 'node:fs';

const roteiros = JSON.parse(fs.readFileSync('scratch/notion_full/roteiros.json', 'utf8'));
const toggles = Object.values(roteiros).filter(b => b.format?.toggleable);
console.log('Toggleable blocks in roteiros:', toggles.length);
console.log('Sample toggles:');
toggles.slice(0, 10).forEach(t => {
  console.log(' -', t.id, ':', t.properties?.title?.[0]?.[0]);
});
