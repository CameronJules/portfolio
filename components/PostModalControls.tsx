'use client';

import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { Maximize, X, ZoomIn } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

type PostModalControlsProps = {
  onClose: () => void;
  className?: string;
};

export default function PostModalControls({ onClose, className }: PostModalControlsProps) {
  const [selectedTool, setSelectedTool] = useState('maximize');

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <ToggleGroup.Root
        type="single"
        value={selectedTool}
        onValueChange={(value) => {
          if (value) setSelectedTool(value);
        }}
        aria-label="Post view controls"
        className="flex h-10 items-center gap-1 rounded-full border border-white bg-white/80 p-1.5 text-black shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-md"
      >
        <ToggleGroup.Item
          value="zoom"
          aria-label="Zoom in"
          className="flex h-7 w-12 items-center justify-center rounded-full text-black transition-colors hover:bg-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/70 data-[state=on]:bg-black data-[state=on]:text-white"
        >
          <ZoomIn aria-hidden="true" className="size-5" strokeWidth={2.25} />
        </ToggleGroup.Item>
        <ToggleGroup.Item
          value="maximize"
          aria-label="Maximize"
          className="flex h-7 w-10 items-center justify-center rounded-full text-black transition-colors hover:bg-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/70 data-[state=on]:bg-black data-[state=on]:text-white"
        >
          <Maximize aria-hidden="true" className="size-5" strokeWidth={2.1} />
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
