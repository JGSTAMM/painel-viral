import fs from 'node:fs';

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function loadChunk(id) {
  for (let attempt = 1; attempt <= 4; attempt++) {
    try {
      const res = await fetch('https://www.notion.so/api/v3/loadPageChunk', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'user-agent': 'Mozilla/5.0'
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
        await sleep(attempt * 2000);
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
    } catch (e) {
      await sleep(1000);
    }
  }
  return {};
}

function getText(b) {
  if (!b || !b.properties?.title) return '';
  return b.properties.title.map(c => c[0]).join('');
}

async function extractAllTables() {
  // 1. Ganchos
  const ganchosRaw = JSON.parse(fs.readFileSync('scratch/notion_full/ganchos.json', 'utf8'));
  const ganchoCats = Object.values(ganchosRaw).filter(b => b.type === 'sub_header' && /^\d+\.\s/.test(getText(b)));
  console.log('Extracting 10 Gancho categories...');
  const ganchosOut = [];
  for (const gc of ganchoCats) {
    const title = getText(gc);
    const childId = gc.content?.[0];
    const catObj = { id: gc.id, category: title, hooks: [] };
    if (childId) {
      const bmap = await loadChunk(childId);
      const rows = Object.values(bmap).filter(b => b.type === 'table_row');
      for (const r of rows) {
        const props = r.properties || {};
        // find gancho text
        const ganchoText = Object.values(props).map(v => v?.[0]?.[0] || '').find(t => t.length > 25);
        const num = Object.values(props).map(v => v?.[0]?.[0] || '').find(t => /^\d{3}$/.test(t));
        if (ganchoText) {
          catObj.hooks.push({ number: num || '', hook: ganchoText, properties: props });
        }
      }
      await sleep(400);
    }
    console.log(`  -> ${title}: ${catObj.hooks.length} hooks`);
    ganchosOut.push(catObj);
  }
  fs.writeFileSync('scratch/notion_full/all_ganchos_parsed.json', JSON.stringify(ganchosOut, null, 2));

  // 2. Titles & Captions
  const tlRaw = JSON.parse(fs.readFileSync('scratch/notion_full/titulos-legendas.json', 'utf8'));
  const titleCats = Object.values(tlRaw).filter(b => b.type === 'sub_header' && /^\d+\.\s/.test(getText(b)));
  console.log('Extracting 10 Title categories...');
  const titlesOut = [];
  for (const tc of titleCats) {
    const title = getText(tc);
    const childId = tc.content?.[0];
    const tObj = { id: tc.id, category: title, titles: [] };
    if (childId) {
      const bmap = await loadChunk(childId);
      const rows = Object.values(bmap).filter(b => b.type === 'table_row');
      for (const r of rows) {
        const props = r.properties || {};
        const titleText = Object.values(props).map(v => v?.[0]?.[0] || '').find(t => t.includes('[') || (t.length > 15 && !t.includes('Capturar') && !t.includes('Responder') && !t.includes('Atrair') && !t.includes('Reunir') && !t.includes('Posicionar')));
        const num = Object.values(props).map(v => v?.[0]?.[0] || '').find(t => /^\d{3}$/.test(t));
        if (titleText && titleText !== 'Título') {
          tObj.titles.push({ number: num || '', title: titleText, properties: props });
        }
      }
      await sleep(400);
    }
    console.log(`  -> ${title}: ${tObj.titles.length} titles`);
    titlesOut.push(tObj);
  }

  const captionCats = Object.values(tlRaw).filter(b => b.type === 'sub_sub_header' && /^\d+\.\s/.test(getText(b)));
  console.log('Extracting 6 Caption categories...');
  const captionsOut = [];
  for (const cc of captionCats) {
    const title = getText(cc);
    const childId = cc.content?.[0];
    const cObj = { id: cc.id, category: title, captions: [] };
    if (childId) {
      const bmap = await loadChunk(childId);
      const rows = Object.values(bmap).filter(b => b.type === 'table_row');
      for (const r of rows) {
        const props = r.properties || {};
        const capText = Object.values(props).map(v => v?.[0]?.[0] || '').find(t => t.length > 25);
        const num = Object.values(props).map(v => v?.[0]?.[0] || '').find(t => /^\d{2}$/.test(t));
        if (capText && capText !== 'Modelo de legenda') {
          cObj.captions.push({ number: num || '', caption: capText });
        }
      }
      await sleep(400);
    }
    console.log(`  -> ${title}: ${cObj.captions.length} captions`);
    captionsOut.push(cObj);
  }
  fs.writeFileSync('scratch/notion_full/all_titulos_legendas_parsed.json', JSON.stringify({ titles: titlesOut, captions: captionsOut }, null, 2));

  // 3. Calendario (30 days)
  const calRaw = JSON.parse(fs.readFileSync('scratch/notion_full/calendario.json', 'utf8'));
  const days = Object.values(calRaw).filter(b => b.type === 'sub_header' && getText(b).startsWith('Dia '));
  console.log(`Extracting ${days.length} days of calendar...`);
  const daysOut = [];
  for (const d of days) {
    const title = getText(d);
    const childId = d.content?.[0];
    let fullText = '';
    if (childId) {
      const bmap = await loadChunk(childId);
      const child = bmap[childId];
      fullText = getText(child);
      await sleep(400);
    }
    daysOut.push({ id: d.id, title, text: fullText });
  }
  fs.writeFileSync('scratch/notion_full/all_calendario_parsed.json', JSON.stringify(daysOut, null, 2));

  // 4. Mapa (40 subnichos)
  const mapaRaw = JSON.parse(fs.readFileSync('scratch/notion_full/mapa.json', 'utf8'));
  const subnichos = Object.values(mapaRaw).filter(b => b.type === 'sub_header' && /^\d{2}\.\s/.test(getText(b)));
  console.log(`Extracting ${subnichos.length} subnichos of mapa...`);
  const mapaOut = [];
  for (const s of subnichos) {
    const title = getText(s);
    const childId = s.content?.[0];
    let fullText = '';
    if (childId) {
      const bmap = await loadChunk(childId);
      const child = bmap[childId];
      fullText = getText(child);
      await sleep(400);
    }
    mapaOut.push({ id: s.id, title, text: fullText });
  }
  fs.writeFileSync('scratch/notion_full/all_mapa_parsed.json', JSON.stringify(mapaOut, null, 2));

  console.log('Done extracting all parsed databases!');
}

extractAllTables().catch(console.error);
