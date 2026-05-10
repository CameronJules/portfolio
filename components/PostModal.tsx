'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import type { Post } from '@/lib/types';
import PostCarousel from './PostCarousel';
import PostBody from './PostBody';
import PostModalControls, { type Tool } from './PostModalControls';

export default function PostModal({ post }: { post: Post }) {
  const router = useRouter();
  const [selectedTool, setSelectedTool] = useState<Tool>('maximize');

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

      <PostModalControls
        selectedTool={selectedTool}
        onToolChange={setSelectedTool}
        onClose={close}
        className="absolute right-4 top-4 z-20 sm:right-6 sm:top-5"
      />

      {/* Modal panel */}
      <motion.div
        className="relative z-10 flex bg-white
          mt-7 w-[84vw] max-h-[87vh] flex-col overflow-visible
          md:mt-0 md:h-[min(84vh,64vw)] md:max-h-none md:w-auto md:flex-row md:overflow-visible
          lg:h-[min(90vh,67vw)]"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.18 }}
      >
        <div className="relative z-20 w-full aspect-[3/4] overflow-visible bg-black flex-shrink-0 shadow-[6px_0_18px_-14px_rgba(0,0,0,0.15)] md:h-full md:w-auto md:aspect-[3/4]">
          <PostCarousel images={post.images} magnifierEnabled={selectedTool === 'zoom'} />
        </div>
        <div className="relative z-10 max-h-[87vh] overflow-y-auto md:h-full md:w-auto md:flex-none md:aspect-[2/3]">
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
