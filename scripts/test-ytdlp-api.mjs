import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import path from 'node:path';

const execFileAsync = promisify(execFile);

async function testDownload() {
  const url = 'https://www.youtube.com/shorts/dQw4w9WgXcQ'; // test short
  console.log('Testing yt-dlp dump-json on URL:', url);
  try {
    const { stdout } = await execFileAsync('python', [
      '-m', 'yt_dlp',
      '--dump-json',
      '--no-playlist',
      url
    ], { timeout: 30000 });
    const meta = JSON.parse(stdout);
    console.log('Title:', meta.title);
    console.log('Duration:', meta.duration);
    console.log('Uploader:', meta.uploader);
    console.log('Thumbnail:', meta.thumbnail);
  } catch (err) {
    console.error('Error:', err.message);
  }
}

testDownload();
