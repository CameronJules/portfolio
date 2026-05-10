'use client';

import type { CSSProperties } from 'react';
import { useEffect, useState } from 'react';
import type { Post } from '@/lib/types';
import PostThumb from './PostThumb';

export default function PostGrid({ posts }: { posts: Post[] }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  return (
    <div>
      <div className="mb-4 border-b border-black pb-1 inline-block">
        <GridIcon />
      </div>
      <div
        className="-mx-4 sm:mx-0 post-grid grid grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-[2px]"
        data-ready={isReady}
      >
        {posts.map((post, index) => {
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
              <PostThumb post={post} />
            </div>
          );
        })}
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
