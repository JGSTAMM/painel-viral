import fs from 'node:fs';
import path from 'node:path';

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
        console.log(`    [429] Waiting ${wait}ms...`);
        await sleep(wait);
        continue;
      }

      if (!res.ok) return {};

      const data = await res.json();
      const blocks = {};
      for (const [bid, val] of Object.entries(data.recordMap?.block || {})) {
        const b = val?.value?.value || val?.value || val;
        if (b && b.id) blocks[b.id] = b;
      }
      return blocks;
    } catch (err) {
      await sleep(1500);
    }
  }
  return {};
}

function getText(b) {
  if (!b || !b.properties?.title) return '';
  return b.properties.title.map(c => c[0]).join('');
}

async function extractGanchos() {
  const ganchosRaw = JSON.parse(fs.readFileSync('scratch/notion_full/ganchos.json', 'utf8'));
  const catBlocks = Object.values(ganchosRaw).filter(b => b.type === 'sub_header' && /^\d+\.\s/.test(getText(b)));
  console.log(`Ganchos categories found: ${catBlocks.length}`);

  const categories = [];
  for (const cb of catBlocks) {
    const title = getText(cb);
    const childId = cb.content?.[0];
    let items = [];
    if (childId) {
      const blocks = await loadChunkWithRetry(childId);
      const child = blocks[childId];
      const text = getText(child);
      if (text) {
        items = text.split('\n').map(s => s.trim()).filter(Boolean);
      }
      await sleep(500);
    }
    console.log(`  - ${title}: ${items.length} items`);
    categories.push({ id: cb.id, title, items });
  }
  fs.writeFileSync('scratch/notion_full/all_ganchos.json', JSON.stringify(categories, null, 2));
}

async function extractTitulosLegendas() {
  const tlRaw = JSON.parse(fs.readFileSync('scratch/notion_full/titulos-legendas.json', 'utf8'));
  const blocks = Object.values(tlRaw);
  
  // Titles: sub_headers with numbers 1 to 10
  const titleCats = blocks.filter(b => b.type === 'sub_header' && /^\d+\.\s/.test(getText(b)));
  console.log(`Title categories found: ${titleCats.length}`);
  const titles = [];
  for (const tb of titleCats) {
    const title = getText(tb);
    const childId = tb.content?.[0];
    let items = [];
    if (childId) {
      const bmap = await loadChunkWithRetry(childId);
      const child = bmap[childId];
      const text = getText(child);
      if (text) {
        items = text.split('\n').map(s => s.trim()).filter(Boolean);
      }
      await sleep(500);
    }
    console.log(`  - Title: ${title}: ${items.length} items`);
    titles.push({ id: tb.id, title, items });
  }

  // Captions: sub_sub_headers with numbers 1 to 6
  const capCats = blocks.filter(b => b.type === 'sub_sub_header' && /^\d+\.\s/.test(getText(b)));
  console.log(`Caption categories found: ${capCats.length}`);
  const captions = [];
  for (const cb of capCats) {
    const title = getText(cb);
    const childId = cb.content?.[0];
    let items = [];
    if (childId) {
      const bmap = await loadChunkWithRetry(childId);
      const child = bmap[childId];
      const text = getText(child);
      if (text) {
        items = text.split('\n\n').map(s => s.trim()).filter(Boolean);
      }
      await sleep(500);
    }
    console.log(`  - Caption: ${title}: ${items.length} items`);
    captions.push({ id: cb.id, title, items });
  }

  fs.writeFileSync('scratch/notion_full/all_titulos_legendas.json', JSON.stringify({ titles, captions }, null, 2));
}

async function extractCalendario() {
  const calRaw = JSON.parse(fs.readFileSync('scratch/notion_full/calendario.json', 'utf8'));
  const days = Object.values(calRaw).filter(b => b.type === 'sub_header' && getText(b).startsWith('Dia '));
  console.log(`Calendario days found: ${days.length}`);
  const daysData = [];
  for (const db of days) {
    const title = getText(db);
    const childId = db.content?.[0];
    let text = '';
    if (childId) {
      const bmap = await loadChunkWithRetry(childId);
      const child = bmap[childId];
      text = getText(child);
      await sleep(500);
    }
    console.log(`  - ${title} (${text.length} chars)`);
    daysData.push({ id: db.id, title, text });
  }
  fs.writeFileSync('scratch/notion_full/all_calendario.json', JSON.stringify(daysData, null, 2));
}

async function extractMapa() {
  const mapaRaw = JSON.parse(fs.readFileSync('scratch/notion_full/mapa.json', 'utf8'));
  const subnichos = Object.values(mapaRaw).filter(b => b.type === 'sub_header' && /^\d{2}\.\s/.test(getText(b)));
  console.log(`Mapa subnichos found: ${subnichos.length}`);
  const subData = [];
  for (const sb of subnichos) {
    const title = getText(sb);
    const childId = sb.content?.[0];
    let text = '';
    if (childId) {
      const bmap = await loadChunkWithRetry(childId);
      const child = bmap[childId];
      text = getText(child);
      await sleep(500);
    }
    console.log(`  - ${title} (${text.length} chars)`);
    subData.push({ id: sb.id, title, text });
  }
  fs.writeFileSync('scratch/notion_full/all_mapa.json', JSON.stringify(subData, null, 2));
}

async function run() {
  await extractGanchos();
  await extractTitulosLegendas();
  await extractCalendario();
  await extractMapa();
  console.log('Finished extracting rest of arsenal!');
}

run().catch(console.error);
