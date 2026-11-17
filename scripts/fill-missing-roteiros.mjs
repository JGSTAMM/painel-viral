import fs from 'node:fs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function loadChunkWithRetry(id, maxRetries = 5) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
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

      if (res.status === 429) {
        const wait = attempt * 2000;
        console.log(`    [429] Waiting ${wait}ms before retry ${attempt}...`);
        await sleep(wait);
        continue;
      }

      if (!res.ok) {
        console.error(`    Error ${res.status}`);
        return {};
      }

      const data = await res.json();
      const blocks = {};
      for (const [bid, val] of Object.entries(data.recordMap?.block || {})) {
        const b = val?.value?.value || val?.value || val;
        if (b && b.id) blocks[b.id] = b;
      }
      return blocks;
    } catch (err) {
      console.error(`    Attempt ${attempt} failed: ${err.message}`);
      await sleep(1500);
    }
  }
  return {};
}

async function fillMissingRoteiros() {
  const scripts = JSON.parse(fs.readFileSync('scratch/notion_full/all_roteiros.json', 'utf8'));
  const roteirosRaw = JSON.parse(fs.readFileSync('scratch/notion_full/roteiros.json', 'utf8'));
  const toggleHeaders = Object.values(roteirosRaw).filter(b => b.format?.toggleable);

  const missing = scripts.filter(s => !s.text || s.text.length === 0);
  console.log(`Found ${missing.length} missing scripts to fill.`);

  for (let i = 0; i < scripts.length; i++) {
    const s = scripts[i];
    if (s.text && s.text.length > 0) continue;

    const th = toggleHeaders.find(h => h.id === s.id);
    const childId = th?.content?.[0];
    if (!childId) continue;

    console.log(`Fetching [${i + 1}/${scripts.length}] ${s.title}...`);
    const blocks = await loadChunkWithRetry(childId);
    const childBlock = blocks[childId];
    if (childBlock && childBlock.properties?.title) {
      s.text = childBlock.properties.title.map(c => c[0]).join('');
      console.log(`  -> Got ${s.text.length} chars`);
    } else {
      console.log('  -> No title property found');
    }
    await sleep(800);
  }

  fs.writeFileSync('scratch/notion_full/all_roteiros.json', JSON.stringify(scripts, null, 2));
  const stillMissing = scripts.filter(s => !s.text || s.text.length === 0);
  console.log(`Done! Still missing: ${stillMissing.length} of ${scripts.length}`);
}

fillMissingRoteiros();
