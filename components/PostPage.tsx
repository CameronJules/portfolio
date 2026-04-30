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
        <div className="flex flex-col gap-8 md:flex-row md:items-start" style={{ minHeight: '70vh' }}>
          <div className="w-full bg-black aspect-[4/5] flex-shrink-0 md:h-[70vh] md:w-auto md:aspect-[3/4]">
            <PostCarousel images={post.images} />
          </div>
          <div className="md:h-[70vh] md:w-auto md:flex-none md:aspect-[5/8]">
            <PostBody
              title={post.title}
              description={post.description}
              date={post.date}
              contentHtml={post.contentHtml}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
