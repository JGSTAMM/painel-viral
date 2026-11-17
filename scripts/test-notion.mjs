async function inspectBlocks(pageId) {
  const formattedId = pageId.replace(/(.{8})(.{4})(.{4})(.{4})(.{12})/, '$1-$2-$3-$4-$5');

  const res = await fetch('https://www.notion.so/api/v3/loadPageChunk', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
    },
    body: JSON.stringify({
      pageId: formattedId,
      limit: 100,
      cursor: { stack: [] },
      chunkNumber: 0,
      verticalColumns: false
    })
  });

  const data = await res.json();
  const rawBlocks = Object.entries(data.recordMap?.block || {});
  console.log('Sample raw block item:', JSON.stringify(rawBlocks[0]));
}

inspectBlocks('3d1198ad3dea81958048c8373683e68a').catch(console.error);
