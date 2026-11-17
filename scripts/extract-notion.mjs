import fs from 'node:fs';
import path from 'node:path';

const PAGES = [
  { id: '3d1198ad3dea81958048c8373683e68a', name: 'central-de-midia' },
  { id: '3d1198ad3dea81c389d9df4769ea8cf0', name: 'biblioteca-de-roteiros' },
  { id: '3d1198ad3dea81fb8216d6c0eae606fe', name: 'como-usar-o-arsenal' },
  { id: '3d1198ad3dea81479128c08000458973', name: 'arsenal-de-ganchos' },
  { id: '3d1198ad3dea81db9770c7de67a1d528', name: 'cofre-titulos-legendas' },
  { id: '3d1198ad3dea814b9fd9d0c65ca401b8', name: 'calendario-30-dias' },
  { id: '3d1198ad3dea817e9676c27cac842ea9', name: 'mapa-de-oportunidades' }
];

function formatId(id) {
  return id.replace(/(.{8})(.{4})(.{4})(.{4})(.{12})/, '$1-$2-$3-$4-$5');
}

async function fetchPageBlocks(pageId) {
  const formattedId = formatId(pageId);
  const blockMap = {};
  
  let chunkNumber = 0;
  let cursor = { stack: [] };
  
  while (true) {
    const res = await fetch('https://www.notion.so/api/v3/loadPageChunk', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      },
      body: JSON.stringify({
        pageId: formattedId,
        limit: 100,
        cursor,
        chunkNumber,
        verticalColumns: false
      })
    });
    
    if (!res.ok) {
      console.error(`Failed to load chunk ${chunkNumber} for ${pageId}: ${res.status}`);
      break;
    }
    
    const data = await res.json();
    const rawBlocks = data.recordMap?.block || {};
    let added = 0;
    for (const [id, val] of Object.entries(rawBlocks)) {
      const blockObj = val?.value?.value || val?.value || val;
      if (blockObj && blockObj.id) {
        if (!blockMap[blockObj.id]) added++;
        blockMap[blockObj.id] = blockObj;
      }
    }
    
    const nextCursor = data.cursor;
    if (!nextCursor || !nextCursor.stack || nextCursor.stack.length === 0) {
      break;
    }
    cursor = nextCursor;
    chunkNumber++;
    if (chunkNumber > 20) break; // safety
  }

  // Also fetch missing blocks if any in content arrays
  const missingIds = [];
  for (const b of Object.values(blockMap)) {
    if (Array.isArray(b.content)) {
      for (const cid of b.content) {
        if (!blockMap[cid]) missingIds.push(cid);
      }
    }
  }

  if (missingIds.length > 0) {
    // Fetch in batches of 50 via getRecordValues
    for (let i = 0; i < missingIds.length; i += 50) {
      const batch = missingIds.slice(i, i + 50);
      try {
        const res = await fetch('https://www.notion.so/api/v3/getRecordValues', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
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
        }
      } catch (e) {
        console.error('Error fetching missing records batch:', e.message);
      }
    }
  }

  return blockMap;
}

function renderBlockText(b) {
  if (!b || !b.properties) return '';
  const title = b.properties.title;
  if (!title || !Array.isArray(title)) return '';
  return title.map(chunk => chunk[0]).join('');
}

function blocksToMarkdown(rootId, blockMap, indent = 0) {
  const root = blockMap[formatId(rootId)] || blockMap[rootId];
  if (!root) return '';
  
  let md = '';
  const rootTitle = renderBlockText(root);
  if (rootTitle && indent === 0) {
    md += `# ${rootTitle}\n\n`;
  }
  
  const content = root.content || [];
  for (const childId of content) {
    const child = blockMap[childId];
    if (!child) continue;
    
    const text = renderBlockText(child);
    const prefix = '  '.repeat(indent);
    
    switch (child.type) {
      case 'header':
        md += `\n${prefix}## ${text}\n\n`;
        break;
      case 'sub_header':
        md += `\n${prefix}### ${text}\n\n`;
        break;
      case 'sub_sub_header':
        md += `\n${prefix}#### ${text}\n\n`;
        break;
      case 'text':
        if (text.trim()) md += `${prefix}${text}\n\n`;
        break;
      case 'bulleted_list':
        md += `${prefix}- ${text}\n`;
        break;
      case 'numbered_list':
        md += `${prefix}1. ${text}\n`;
        break;
      case 'to_do':
        const checked = child.properties?.checked?.[0]?.[0] === 'Yes' ? '[x]' : '[ ]';
        md += `${prefix}- ${checked} ${text}\n`;
        break;
      case 'toggle':
        md += `\n<details><summary>${text}</summary>\n\n`;
        if (child.content && child.content.length > 0) {
          md += blocksToMarkdown(childId, blockMap, indent + 1);
        }
        md += `\n</details>\n\n`;
        continue;
      case 'callout':
        const icon = child.format?.page_icon || '💡';
        md += `\n> ${icon} **${text}**\n\n`;
        break;
      case 'divider':
        md += `\n---\n\n`;
        break;
      case 'quote':
        md += `> ${text}\n\n`;
        break;
      case 'page':
        md += `\n[📄 ${text}](notion://${childId})\n\n`;
        break;
      default:
        if (text) md += `${prefix}${text}\n\n`;
        break;
    }
    
    if (child.content && child.content.length > 0 && child.type !== 'toggle') {
      md += blocksToMarkdown(childId, blockMap, indent + 1);
    }
  }
  
  return md;
}

async function main() {
  const outDir = path.resolve('scratch/notion_extracted');
  fs.mkdirSync(outDir, { recursive: true });
  
  for (const p of PAGES) {
    console.log(`Extracting ${p.name} (${p.id})...`);
    try {
      const blockMap = await fetchPageBlocks(p.id);
      console.log(`  Fetched ${Object.keys(blockMap).length} blocks`);
      fs.writeFileSync(path.join(outDir, `${p.name}.raw.json`), JSON.stringify(blockMap, null, 2));
      const md = blocksToMarkdown(p.id, blockMap);
      fs.writeFileSync(path.join(outDir, `${p.name}.md`), md);
      console.log(`  Saved markdown (${md.length} chars)`);
    } catch (err) {
      console.error(`  Error extracting ${p.name}:`, err.message);
    }
  }
  console.log('Finished extraction!');
}

main();
