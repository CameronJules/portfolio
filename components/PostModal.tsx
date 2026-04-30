'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Post } from '@/lib/types';
import PostCarousel from './PostCarousel';
import PostBody from './PostBody';

export default function PostModal({ post }: { post: Post }) {
  const router = useRouter();

  const close = () => router.back();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Blurred + tinted backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={close}
      />

      {/* Close button — top-right of screen, outside the modal panel */}
      <button
        onClick={close}
        aria-label="Close"
        className="absolute top-5 right-6 z-20 text-black hover:opacity-60 transition-opacity"
      >
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M20 2L2 20M2 2l18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {/* Modal panel */}
      <motion.div
        className="relative z-10 flex bg-white
          w-[84vw] max-h-[94vh] flex-col overflow-y-auto
          md:h-[min(84vh,64vw)] md:max-h-none md:w-auto md:flex-row md:overflow-hidden
          lg:h-[min(90vh,67vw)]"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.18 }}
      >
        <div className="w-full aspect-[3/4] bg-black flex-shrink-0 shadow-[6px_0_18px_-14px_rgba(0,0,0,0.15)] md:h-full md:w-auto md:aspect-[3/4]">
          <PostCarousel images={post.images} />
        </div>
        <div className="md:h-full md:w-auto md:flex-none md:aspect-[2/3] md:overflow-y-auto">
          <PostBody
            title={post.title}
            description={post.description}
            date={post.date}
            contentHtml={post.contentHtml}
          />
        </div>
      </motion.div>
    </div>
  );
}
