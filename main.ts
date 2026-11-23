// Entry program for post-tiktok-day-one-day-seven-20261123-0327 (Node 22, standard
// library only). The entry is the TikTok video itself: a 24-second vertical clip
// about "Ghost Hop", a tiny agent-built platformer, on the day it was made and
// after a week of daily updates. This program only hands the house the video's
// address, by copying VIDEO.json from the repository root to /output, where the
// gate reads it. Nothing it writes about the video is scored.
//
// VIDEO.json still holds the starter placeholder until the video is posted on
// TikTok; this program refuses to copy a placeholder, so a forgotten update
// fails loudly here instead of at the gate.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR stand
// in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const raw = readFileSync(join(BOT_DIR, 'VIDEO.json'), 'utf8');
const video = JSON.parse(raw) as { url?: unknown };

if (
  typeof video.url !== 'string' ||
  !video.url.startsWith('https://www.tiktok.com/') ||
  video.url.includes('<') ||
  video.url.includes('>')
) {
  console.error(
    `VIDEO.json does not name a real TikTok video URL yet (got: ${String(video.url).slice(0, 80)}) — post the video first, then update it.`,
  );
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(join(OUTPUT_DIR, 'VIDEO.json'), JSON.stringify(video));
console.log(`VIDEO.json copied to ${OUTPUT_DIR}: ${video.url}`);
