# Cameron Jules — Portfolio

## Adding a post

1. Create `content/posts/my-project.md`
2. Add images to `public/posts/my-project/` (jpg, png, webp)
3. Reference images in your markdown using relative filenames: `![alt](image.jpg)`
4. Push — thumbnails are auto-generated at build time

## Markdown format

```markdown
---
title: My Project          # optional; falls back to first # heading
description: Short blurb   # used for SEO meta description
date: 2025-06-01           # used for sorting (newest first)
---

# My Project

## Section title

Body text with [links](https://example.com) works inline.

![First image becomes grid thumbnail](cover.jpg)
![Second image appears in carousel](detail.jpg)
```

## Running locally

```bash
pnpm install
pnpm dev
```

## Deploy to Vercel

Connect the repo to Vercel. The `prebuild` script generates thumbnails automatically on each deploy.
