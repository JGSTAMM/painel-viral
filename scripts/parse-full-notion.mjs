import fs from 'node:fs';
import path from 'node:path';

const PAGES = [
  { id: '3d1198ad-3dea-81c3-89d9-df4769ea8cf0', name: 'roteiros' },
  { id: '3d1198ad-3dea-8147-9128-c08000458973', name: 'ganchos' },
  { id: '3d1198ad-3dea-81db-9770-c7de67a1d528', name: 'titulos-legendas' },
  { id: '3d1198ad-3dea-814b-9fd9-d0c65ca401b8', name: 'calendario' },
  { id: '3d1198ad-3dea-817e-9676-c27cac842ea9', name: 'mapa' },
  { id: '3d1198ad-3dea-8195-8048-c8373683e68a', name: 'central-midia' },
  { id: '3d1198ad-3dea-81fb-8216-d6c0eae606fe', name: 'guia-arsenal' }
];

async function fetchFullPage(pageId) {
  const blockMap = {};
  let chunkNumber = 0;
  let cursor = { stack: [] };

  while (chunkNumber < 15) {
    const res = await fetch('https://www.notion.so/api/v3/loadPageChunk', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      },
      body: JSON.stringify({
        pageId,
        limit: 100,
        cursor,
        chunkNumber,
        verticalColumns: false
      })
    });

    if (!res.ok) {
      console.error(`Error loading chunk ${chunkNumber}: ${res.status}`);
      break;
    }

    const data = await res.json();
    const rawBlocks = data.recordMap?.block || {};
    let newBlocks = 0;
    for (const [id, val] of Object.entries(rawBlocks)) {
      const b = val?.value?.value || val?.value || val;
      if (b && b.id && !blockMap[b.id]) {
        blockMap[b.id] = b;
        newBlocks++;
      }
    }

    console.log(`  Chunk ${chunkNumber}: loaded ${newBlocks} new blocks (total ${Object.keys(blockMap).length})`);

    const nextCursor = data.cursor;
    if (!nextCursor || !nextCursor.stack || nextCursor.stack.length === 0) {
      break;
    }
    cursor = nextCursor;
    chunkNumber++;
  }

  return blockMap;
}

async function run() {
  const outDir = path.resolve('scratch/notion_full');
  fs.mkdirSync(outDir, { recursive: true });

  for (const p of PAGES) {
    console.log(`Fetching ${p.name} (${p.id})...`);
    const blocks = await fetchFullPage(p.id);
    fs.writeFileSync(path.join(outDir, `${p.name}.json`), JSON.stringify(blocks, null, 2));
    console.log(`Saved ${p.name}.json with ${Object.keys(blocks).length} blocks.`);
  }
}

run();
