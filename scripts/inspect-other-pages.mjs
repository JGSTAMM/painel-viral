import fs from 'node:fs';

['titulos-legendas', 'calendario', 'mapa'].forEach(name => {
  const data = JSON.parse(fs.readFileSync(`scratch/notion_full/${name}.json`, 'utf8'));
  console.log(`=== ${name} ===`);
  for (const b of Object.values(data)) {
    if (b.type === 'sub_header' || b.type === 'header' || (b.content && b.content.length > 0)) {
      const title = b.properties?.title ? b.properties.title.map(c => c[0]).join('') : '';
      if (title) {
        console.log(`[${b.type}] "${title}" (id: ${b.id}, children: ${b.content?.length || 0})`);
      }
    }
  }
});
