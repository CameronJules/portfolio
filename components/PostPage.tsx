import type { Post } from '@/lib/types';
import PostCarousel from './PostCarousel';
import PostBody from './PostBody';
import Link from 'next/link';

export default function PostPage({ post }: { post: Post }) {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/" className="text-sm text-black/50 hover:text-black transition-colors mb-8 inline-block">
          ← Back
        </Link>
        <div className="flex flex-col md:flex-row gap-8" style={{ minHeight: '70vh' }}>
          <div className="w-full md:w-[55%] bg-black aspect-[4/5] md:aspect-auto flex-shrink-0">
            <PostCarousel images={post.images} />
          </div>
          <div className="flex-1">
            <PostBody title={post.title} contentHtml={post.contentHtml} />
          </div>
        </div>
      </div>
    </div>
  );
}
