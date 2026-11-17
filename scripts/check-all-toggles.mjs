import fs from 'node:fs';

['ganchos', 'titulos-legendas', 'calendario', 'mapa', 'central-midia', 'guia-arsenal'].forEach(name => {
  const data = JSON.parse(fs.readFileSync(`scratch/notion_full/${name}.json`, 'utf8'));
  const toggles = Object.values(data).filter(b => b.format?.toggleable || b.type === 'toggle');
  console.log(`${name}: ${toggles.length} toggles`);
  if (toggles.length > 0) {
    console.log(' Sample toggles:');
    toggles.slice(0, 5).forEach(t => console.log('  -', t.id, ':', t.properties?.title?.[0]?.[0]));
  }
});
