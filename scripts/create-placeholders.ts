import sharp from 'sharp';
import path from 'path';

const dir = path.join(process.cwd(), 'public/posts/sample-project');

const colors = [
  { file: 'cover.jpg', r: 20, g: 20, b: 20 },
  { file: 'detail-1.jpg', r: 40, g: 30, b: 30 },
  { file: 'detail-2.jpg', r: 30, g: 30, b: 40 },
];

async function main() {
  for (const c of colors) {
    await sharp({
      create: { width: 1200, height: 1500, channels: 3, background: { r: c.r, g: c.g, b: c.b } },
    })
      .jpeg()
      .toFile(path.join(dir, c.file));
    console.log('Created', c.file);
  }
}

main();
