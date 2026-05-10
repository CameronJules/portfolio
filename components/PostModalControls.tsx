'use client';

import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { motion } from 'framer-motion';
import { Maximize, X, ZoomIn } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

type PostModalControlsProps = {
  onClose: () => void;
  className?: string;
};

type Tool = 'zoom' | 'maximize';

const TOOLS: Record<Tool, { x: number; width: number }> = {
  zoom: { x: 0, width: 48 },
  maximize: { x: 52, width: 40 },
};

const ACTIVE_PILL_TRANSITION = {
  type: 'spring',
  stiffness: 180,
  damping: 22,
  mass: 0.8,
} as const;

export default function PostModalControls({ onClose, className }: PostModalControlsProps) {
  const [selectedTool, setSelectedTool] = useState<Tool>('maximize');
  const activeTool = TOOLS[selectedTool];

  function selectTool(value: string) {
    if (!value || value === selectedTool) return;

    setSelectedTool(value as Tool);
  }

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <ToggleGroup.Root
        type="single"
        value={selectedTool}
        onValueChange={selectTool}
        aria-label="Post view controls"
        className="relative flex h-10 items-center gap-1 overflow-hidden rounded-full border border-white bg-white/80 p-1 text-black shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-md"
      >
        <motion.span
          layoutId="post-modal-active-pill"
          aria-hidden="true"
          className="pointer-events-none absolute bottom-1 left-1 top-1 z-0 rounded-full bg-black"
          initial={false}
          animate={{
            x: activeTool.x,
            width: activeTool.width,
            scaleX: [1, 1.08, 0.98, 1],
            scaleY: [1, 0.92, 1.04, 1],
          }}
          transition={{
            x: ACTIVE_PILL_TRANSITION,
            width: ACTIVE_PILL_TRANSITION,
            scaleX: { duration: 0.34, times: [0, 0.42, 0.78, 1], ease: [0.3, 0, 0.15, 1] },
            scaleY: { duration: 0.34, times: [0, 0.42, 0.78, 1], ease: [0.3, 0, 0.15, 1] },
          }}
        />

        <ToggleGroup.Item
          value="zoom"
          aria-label="Zoom in"
          className="relative isolate flex h-8 w-12 items-center justify-center rounded-full text-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/70"
        >
          <ZoomIn
            aria-hidden="true"
            className={cn('relative z-20 size-5 transition-colors duration-200', selectedTool === 'zoom' && 'text-white')}
            strokeWidth={2.25}
          />
        </ToggleGroup.Item>
        <ToggleGroup.Item
          value="maximize"
          aria-label="Maximize"
          className="relative isolate flex h-8 w-10 items-center justify-center rounded-full text-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/70"
        >
          <Maximize
            aria-hidden="true"
            className={cn('relative z-20 size-[18px] transition-colors duration-200', selectedTool === 'maximize' && 'text-white')}
            strokeWidth={2.1}
          />
        </ToggleGroup.Item>
      </ToggleGroup.Root>

      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="flex size-10 items-center justify-center rounded-full border border-white bg-white/80 text-black shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-md transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/70"
      >
        <X aria-hidden="true" className="size-5" strokeWidth={2} />
      </button>
    </div>
  );
}
