import fs from 'node:fs';

const data = JSON.parse(fs.readFileSync('scratch/notion_extracted/central-de-midia.raw.json', 'utf8'));

for (const b of Object.values(data)) {
  if (b.type === 'table_row') {
    const rawProps = b.properties || {};
    const cells = [];
    for (const [col, val] of Object.entries(rawProps)) {
      const text = val.map(c => c[0]).join('');
      const link = val.find(c => c[1]?.some(attr => attr[0] === 'a'))?.[1]?.find(attr => attr[0] === 'a')?.[1];
      cells.push({ col, text, link });
    }
    console.log('Row:', JSON.stringify(cells));
  }
}
