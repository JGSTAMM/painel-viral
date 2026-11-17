import fs from 'node:fs';
import path from 'node:path';

async function fetchBlockChunk(blockId) {
  try {
    const res = await fetch('https://www.notion.so/api/v3/loadPageChunk', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      },
      body: JSON.stringify({
        pageId: blockId,
        limit: 100,
        cursor: { stack: [] },
        chunkNumber: 0,
        verticalColumns: false
      })
    });
    if (!res.ok) return {};
    const data = await res.json();
    const blocks = {};
    for (const [id, val] of Object.entries(data.recordMap?.block || {})) {
      const b = val?.value?.value || val?.value || val;
      if (b && b.id) {
        blocks[b.id] = b;
      }
    }
    return blocks;
  } catch (e) {
    return {};
  }
}

async function expandAllToggles(jsonFile, outputFile) {
  const data = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));
  const allBlocks = { ...data };
  
  // Find all blocks that have content children not present in allBlocks
  let pass = 0;
  while (pass < 5) {
    const missingParentIds = [];
    for (const b of Object.values(allBlocks)) {
      if (Array.isArray(b?.content)) {
        const hasMissing = b.content.some(cid => !allBlocks[cid]);
        if (hasMissing) {
          missingParentIds.push(b.id);
        }
      }
    }

    if (missingParentIds.length === 0) {
      console.log(`  [${path.basename(jsonFile)}] All blocks resolved in pass ${pass}!`);
      break;
    }

    console.log(`  [${path.basename(jsonFile)}] Pass ${pass + 1}: ${missingParentIds.length} parent blocks have missing children.`);
    
    // Batch fetch in chunks of 8
    const batchSize = 8;
    for (let i = 0; i < missingParentIds.length; i += batchSize) {
      const batch = missingParentIds.slice(i, i + batchSize);
      const results = await Promise.all(batch.map(id => fetchBlockChunk(id)));
      for (const res of results) {
        for (const [bid, bobj] of Object.entries(res)) {
          allBlocks[bid] = bobj;
        }
      }
    }
    pass++;
  }

  fs.writeFileSync(outputFile, JSON.stringify(allBlocks, null, 2));
  console.log(`  -> Saved ${outputFile} with ${Object.keys(allBlocks).length} total blocks.`);
}

async function main() {
  const files = ['roteiros', 'ganchos', 'titulos-legendas', 'calendario', 'mapa', 'central-midia'];
  for (const f of files) {
    const input = path.resolve(`scratch/notion_full/${f}.json`);
    const output = path.resolve(`scratch/notion_full/${f}.expanded.json`);
    await expandAllToggles(input, output);
  }
  console.log('Expansion complete!');
}

main();
