async function testBlockDetail(id) {
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
  if (res.ok) {
    const data = await res.json();
    console.log(JSON.stringify(data.recordMap?.block, null, 2));
  }
}

testBlockDetail('ca9e0e30-4c47-42ab-bb2b-7a65c1acc04c').catch(console.error);
