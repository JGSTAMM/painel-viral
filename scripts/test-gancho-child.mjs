import fs from 'node:fs';

const ganchos = JSON.parse(fs.readFileSync('scratch/notion_full/ganchos.json', 'utf8'));
const toggles = Object.values(ganchos).filter(b => b.format?.toggleable || b.type === 'toggle');
console.log('Sample toggle:', toggles[0].id, toggles[0].properties?.title?.[0]?.[0]);
console.log('Its content:', toggles[0].content);

async function test(childId) {
  const res = await fetch('https://www.notion.so/api/v3/loadPageChunk', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
    },
    body: JSON.stringify({
      pageId: childId,
      limit: 100,
      cursor: { stack: [] },
      chunkNumber: 0,
      verticalColumns: false
    })
  });
  console.log('Status:', res.status);
  if (res.ok) {
    const data = await res.json();
    const blocks = Object.values(data.recordMap?.block || {});
    console.log('Fetched blocks:', blocks.length);
    blocks.forEach(b => {
      const v = b.value?.value || b.value;
      console.log('  -', v?.type, v?.properties?.title?.[0]?.[0]);
    });
  }
}

if (toggles[0].content?.[0]) {
  test(toggles[0].content[0]);
}
