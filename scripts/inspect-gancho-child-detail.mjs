import fs from 'node:fs';

async function inspect(pageId, name) {
  const res = await fetch('https://www.notion.so/api/v3/loadPageChunk', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'user-agent': 'Mozilla/5.0' },
    body: JSON.stringify({ pageId, limit: 100, cursor: { stack: [] }, chunkNumber: 0, verticalColumns: false })
  });
  const data = await res.json();
  console.log(`=== ${name} (${pageId}) ===`);
  for (const b of Object.values(data.recordMap?.block || {})) {
    const val = b.value?.value || b.value;
    const title = val?.properties?.title ? val.properties.title.map(c => c[0]).join('') : '';
    console.log(' -', val?.type, title || JSON.stringify(val?.properties || {}));
  }
}

async function run() {
  await inspect('0ae4935d-79f9-49ce-b001-d8966b7c0000', 'Dia 01'); // wait, let's find exact content id
  const calRaw = JSON.parse(fs.readFileSync('scratch/notion_full/calendario.json', 'utf8'));
  const d1 = Object.values(calRaw).find(b => b.properties?.title?.[0]?.[0]?.includes('Dia 01'));
  if (d1?.content?.[0]) {
    await inspect(d1.content[0], 'Dia 01 Content');
  }

  const mapaRaw = JSON.parse(fs.readFileSync('scratch/notion_full/mapa.json', 'utf8'));
  const m1 = Object.values(mapaRaw).find(b => b.properties?.title?.[0]?.[0]?.includes('01. Boletim'));
  if (m1?.content?.[0]) {
    await inspect(m1.content[0], 'Subnicho 01 Content');
  }
}

run();
