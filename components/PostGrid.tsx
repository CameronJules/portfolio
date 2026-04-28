import type { Post } from '@/lib/types';
import PostThumb from './PostThumb';

export default function PostGrid({ posts }: { posts: Post[] }) {
  return (
    <div>
      <div className="mb-4 border-b border-black pb-1 inline-block">
        <GridIcon />
      </div>
      <div className="grid grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-[2px]">
        {posts.map((post) => (
          <PostThumb key={post.slug} post={post} />
        ))}
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
