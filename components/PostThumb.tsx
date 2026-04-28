import Link from 'next/link';
import Image from 'next/image';
import type { Post } from '@/lib/types';

export default function PostThumb({ post }: { post: Post }) {
  return (
    <Link href={`/${post.slug}`} className="block aspect-[3/4] overflow-hidden bg-black relative group">
      {post.cover ? (
        <Image
          src={post.cover}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 33vw, (max-width: 1280px) 25vw, 20vw"
          className="object-cover group-hover:opacity-90 transition-opacity"
        />
      ) : (
        <div className="w-full h-full bg-black" />
      )}
    </Link>
  );
}
