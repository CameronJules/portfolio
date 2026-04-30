'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Copy, MoreHorizCircle, OpenNewWindow } from 'iconoir-react';

const EMAIL = 'cpjules@gmail.com';
const LINKEDIN_URL = 'https://www.linkedin.com/in/cameron-jules/';
const X_URL = 'https://x.com/cpierrej';
const CALENDLY_URL = 'https://calendly.com/cpjules';

export default function ProfileHeader() {
  const [open, setOpen] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  function handleEmail() {
    navigator.clipboard.writeText(EMAIL);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  }

  return (
    <div className="pt-16 pb-12">
      <div className="flex items-center gap-8 mb-4">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-none">
          Cameron Jules
        </h1>
        <button
          aria-label="More options"
          className="flex-shrink-0 mt-4 hover:opacity-60 transition-opacity"
          onClick={() => setOpen(true)}
        >
          <MoreHorizCircle width={28} height={28} strokeWidth={1.5} />
        </button>
      </div>
      <p className="text-base text-black max-w-lg leading-snug">
        I enjoy blending software & design to create new and unique experiences.
        Here's an Instagram style collection of my work.
      </p>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop — click to dismiss */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
            />

            {/* Centered modal card */}
            <motion.div
              className="fixed left-4 right-4 z-50 mx-auto max-w-sm top-1/4 -translate-y-1/4 rounded-2xl bg-white overflow-hidden divide-y divide-black/10"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <button
                onClick={handleEmail}
                className="w-full py-4 text-[15px] transition-colors active:bg-black/5 hover:bg-black/5 flex items-center justify-center gap-2"
              >
                <span className="relative flex items-center justify-center">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={emailCopied ? 'copied' : 'email'}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.18 }}
                    >
                      {emailCopied ? 'Email Copied!' : 'Email'}
                    </motion.span>
                  </AnimatePresence>
                </span>
                <Copy width={15} height={15} className="text-black/35 flex-shrink-0" strokeWidth={1.75} />
              </button>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 text-[15px] flex items-center justify-center gap-2 transition-colors active:bg-black/5 hover:bg-black/5"
                onClick={() => setOpen(false)}
              >
                LinkedIn
                <OpenNewWindow width={15} height={15} className="text-black/35 flex-shrink-0" strokeWidth={1.75} />
              </a>
              <a
                href={X_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 text-[15px] flex items-center justify-center gap-2 transition-colors active:bg-black/5 hover:bg-black/5"
                onClick={() => setOpen(false)}
              >
                X
                <OpenNewWindow width={15} height={15} className="text-black/35 flex-shrink-0" strokeWidth={1.75} />
              </a>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 text-[15px] flex items-center justify-center gap-2 transition-colors active:bg-black/5 hover:bg-black/5"
                onClick={() => setOpen(false)}
              >
                Schedule a Call
                <OpenNewWindow width={15} height={15} className="text-black/35 flex-shrink-0" strokeWidth={1.75} />
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
