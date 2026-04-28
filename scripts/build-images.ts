import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const postsPublicDir = path.join(process.cwd(), 'public/posts');

async function processImage(imgPath: string) {
  const thumbPath = imgPath.replace(/\.(jpg|jpeg|png|gif|webp)$/i, '.thumb.webp');

  if (fs.existsSync(thumbPath)) {
    const orig = fs.statSync(imgPath).mtimeMs;
    const thumb = fs.statSync(thumbPath).mtimeMs;
    if (thumb >= orig) return;
  }

  await sharp(imgPath)
    .resize(600, 800, { fit: 'cover', position: 'centre' })
    .webp({ quality: 85 })
    .toFile(thumbPath);

  console.log(`  → ${path.relative(process.cwd(), thumbPath)}`);
}

async function main() {
  if (!fs.existsSync(postsPublicDir)) return;

  const slugDirs = fs.readdirSync(postsPublicDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => path.join(postsPublicDir, d.name));

  const imageExts = /\.(jpg|jpeg|png|gif|webp)$/i;
  const tasks: Promise<void>[] = [];

  for (const dir of slugDirs) {
    const files = fs.readdirSync(dir).filter((f) => imageExts.test(f) && !f.includes('.thumb.'));
    for (const file of files) {
      tasks.push(processImage(path.join(dir, file)));
    }
  }

  if (tasks.length > 0) {
    console.log(`Building image thumbnails...`);
    await Promise.all(tasks);
    console.log('Done.');
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
