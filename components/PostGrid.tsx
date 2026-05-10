'use client';

import type { CSSProperties } from 'react';
import { useEffect, useState } from 'react';
import type { Post } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import PostThumb from './PostThumb';

export default function PostGrid({ posts }: { posts: Post[] }) {
  const coverPosts = posts.filter((post) => post.cover);
  const [isMounted, setIsMounted] = useState(false);
  const [loadedCovers, setLoadedCovers] = useState<Set<string>>(() => new Set());
  const isReady = isMounted && loadedCovers.size >= coverPosts.length;

  useEffect(() => {
    setIsMounted(true);
    setLoadedCovers(new Set());
  }, [posts]);

  function handleImageReady(slug: string) {
    setLoadedCovers((current) => {
      if (current.has(slug)) return current;

      const next = new Set(current);
      next.add(slug);
      return next;
    });
  }

  function renderPost(post: Post, index: number) {
    const itemStyle = {
      '--post-delay': `${index * 110}ms`,
      ...(!isReady ? { opacity: 0, transform: 'translateY(10px)' } : {}),
    } as CSSProperties;

    return (
      <div
        key={post.slug}
        className="post-grid-item"
        style={itemStyle}
      >
        <PostThumb post={post} onImageReady={() => handleImageReady(post.slug)} />
      </div>
    );
  }

  function renderSkeleton(post: Post) {
    return (
      <Skeleton
        key={post.slug}
        className="aspect-[3/4] rounded-none"
      />
    );
  }

  const gridClassName = '-mx-4 sm:mx-0 grid grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-[2px]';

  return (
    <div>
      <div className="mb-4 border-b border-black pb-1 inline-block">
        <GridIcon />
      </div>
      <div className="relative">
        {!isReady && (
          <div className={gridClassName} aria-hidden="true">
            {posts.map(renderSkeleton)}
          </div>
        )}
        <div
          className={`${gridClassName} post-grid ${!isReady ? 'absolute inset-0 pointer-events-none' : ''}`}
          data-ready={isReady}
          aria-hidden={!isReady}
        >
          {posts.map(renderPost)}
        </div>
      </div>
    </div>
  );
}

function GridIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-label="Grid view">
      <rect x="1" y="1" width="7" height="7" stroke="black" strokeWidth="1.5" />
      <rect x="12" y="1" width="7" height="7" stroke="black" strokeWidth="1.5" />
      <rect x="1" y="12" width="7" height="7" stroke="black" strokeWidth="1.5" />
      <rect x="12" y="12" width="7" height="7" stroke="black" strokeWidth="1.5" />
    </svg>
  );
}
