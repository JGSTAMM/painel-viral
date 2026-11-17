async function checkFile(id) {
  const url = `https://drive.google.com/file/d/${id}/view`;
  const res = await fetch(url);
  const text = await res.text();
  const title = text.match(/<title>([^<]+)<\/title>/)?.[1];
  console.log(`File ${id}: "${title}"`);
}

async function run() {
  await checkFile('1_sQdMJVF511OZk2faDEhBlIjq2IR7b_h');
  await checkFile('19MzRZ514vDcT2IWNfojswKDX_bPCWDDs');
}

run();
