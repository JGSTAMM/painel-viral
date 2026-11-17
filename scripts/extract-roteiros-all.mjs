import fs from 'node:fs';
import path from 'node:path';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function loadChunk(id) {
  const res = await fetch('https://www.notion.so/api/v3/loadPageChunk', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
    },
    body: JSON.stringify({
      pageId: id,
      limit: 100,
      cursor: { stack: [] },
      chunkNumber: 0,
      verticalColumns: false
    })
  });
  if (!res.ok) {
    console.error(`Error loading chunk for ${id}: ${res.status}`);
    return {};
  }
  const data = await res.json();
  const blocks = {};
  for (const [bid, val] of Object.entries(data.recordMap?.block || {})) {
    const b = val?.value?.value || val?.value || val;
    if (b && b.id) blocks[b.id] = b;
  }
  return blocks;
}

async function fetchRoteiros() {
  const roteirosRaw = JSON.parse(fs.readFileSync('scratch/notion_full/roteiros.json', 'utf8'));
  const toggleHeaders = Object.values(roteirosRaw).filter(b => b.format?.toggleable);
  console.log(`Found ${toggleHeaders.length} roteiro toggle headers.`);

  const scripts = [];
  let idx = 0;

  for (const th of toggleHeaders) {
    idx++;
    const title = th.properties?.title?.[0]?.[0] || `Script ${idx}`;
    const childId = th.content?.[0];
    
    let text = '';
    if (childId) {
      const childBlocks = await loadChunk(childId);
      const childBlock = childBlocks[childId];
      if (childBlock && childBlock.properties?.title) {
        text = childBlock.properties.title.map(c => c[0]).join('');
      }
      await sleep(250);
    }

    console.log(`[${idx}/${toggleHeaders.length}] ${title} (${text.length} chars)`);
    scripts.push({
      id: th.id,
      title,
      text
    });
  }

  fs.writeFileSync('scratch/notion_full/all_roteiros.json', JSON.stringify(scripts, null, 2));
  console.log(`Saved ${scripts.length} scripts to scratch/notion_full/all_roteiros.json`);
}

fetchRoteiros().catch(console.error);
