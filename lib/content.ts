import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkHtml from 'remark-html';
import type { Post } from './types';

type MdastNode = { type: string; children?: MdastNode[]; url?: string };

const postsDir = path.join(process.cwd(), 'content/posts');

function extractImages(tree: MdastNode, slug: string): string[] {
  const images: string[] = [];
  function walk(node: MdastNode) {
    if (node.type === 'image' && node.url) {
      const url = node.url.startsWith('http') ? node.url : `/posts/${slug}/${node.url}`;
      images.push(url);
    }
    if (node.children) {
      for (const child of node.children) walk(child);
    }
  }
  walk(tree);
  return images;
}

async function parsePost(filename: string): Promise<Post> {
  const slug = filename.replace(/\.md$/, '');
  const fullPath = path.join(postsDir, filename);
  const raw = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(raw);

  let images: string[] = [];

  const processor = remark().use(remarkGfm);
  const ast = processor.parse(content) as MdastNode;
  images = extractImages(ast, slug);

  const processed = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(content);

  const contentHtml = processed.toString();

  const titleMatch = content.match(/^#\s+(.+)$/m);
  const title = data.title || titleMatch?.[1] || slug;
  const description = data.description || '';
  const date = data.date ? String(data.date) : '1970-01-01';

  const coverImage = data.cover
    ? `/posts/${slug}/${data.cover}`
    : images[0] || '';

  const cover = coverImage.startsWith('http')
    ? coverImage
    : coverImage.replace(/\.(jpg|jpeg|png|gif|webp)$/, '.thumb.webp');

  return { slug, title, description, date, cover, images, contentHtml };
}

let _cache: Post[] | null = null;

export async function getAllPosts(): Promise<Post[]> {
  if (_cache) return _cache;
  if (!fs.existsSync(postsDir)) return [];

  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith('.md'));
  const posts = await Promise.all(files.map(parsePost));
  posts.sort((a, b) => (a.date < b.date ? 1 : -1));
  _cache = posts;
  return posts;
}

export async function getPost(slug: string): Promise<Post | undefined> {
  const posts = await getAllPosts();
  return posts.find((p) => p.slug === slug);
}
