import fs from 'node:fs';
import path from 'node:path';

async function fetchBlocksRecursive(initialBlockMap) {
  const blockMap = { ...initialBlockMap };
  let rounds = 0;

  while (rounds < 15) {
    const missingIds = new Set();
    for (const b of Object.values(blockMap)) {
      if (Array.isArray(b?.content)) {
        for (const cid of b.content) {
          if (!blockMap[cid]) {
            missingIds.add(cid);
          }
        }
      }
    }

    if (missingIds.size === 0) {
      console.log(`  All child blocks resolved after ${rounds} rounds.`);
      break;
    }

    console.log(`  Round ${rounds + 1}: fetching ${missingIds.size} missing child blocks...`);
    const idArray = Array.from(missingIds);
    for (let i = 0; i < idArray.length; i += 100) {
      const batch = idArray.slice(i, i + 100);
      try {
        const res = await fetch('https://www.notion.so/api/v3/getRecordValues', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
          },
          body: JSON.stringify({
            requests: batch.map(id => ({ table: 'block', id }))
          })
        });

        if (res.ok) {
          const rdata = await res.json();
          for (const resItem of (rdata.results || [])) {
            const b = resItem?.value?.value || resItem?.value;
            if (b && b.id) {
              blockMap[b.id] = b;
            }
          }
        } else {
          console.error(`    Batch error: ${res.status}`);
        }
      } catch (err) {
        console.error('    Error in getRecordValues:', err.message);
      }
    }

    rounds++;
  }

  return blockMap;
}

async function testFetchScript01() {
  const initial = JSON.parse(fs.readFileSync('scratch/notion_extracted/biblioteca-de-roteiros.raw.json', 'utf8'));
  const full = await fetchBlocksRecursive(initial);
  console.log('Total blocks now:', Object.keys(full).length);
  
  const script01 = Object.values(full).find(b => b.properties?.title?.[0]?.[0]?.includes('01. A novidade oficial'));
  console.log('Script 01 title:', script01?.properties?.title?.[0]?.[0]);
  if (script01?.content) {
    for (const cid of script01.content) {
      const child = full[cid];
      console.log('  Child:', child?.type, child?.properties?.title?.[0]?.[0] || child?.properties);
      if (child?.content) {
        for (const gcid of child.content) {
          const grandChild = full[gcid];
          console.log('    GrandChild:', grandChild?.type, grandChild?.properties?.title?.[0]?.[0]);
        }
      }
    }
  }
}

testFetchScript01();
