import { MoreHorizCircle } from 'iconoir-react';

export default function ProfileHeader() {
  return (
    <div className="pt-16 pb-12">
      <div className="flex items-center gap-8 mb-4">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-none">
          Cameron Jules
        </h1>
        <button aria-label="More options" className="flex-shrink-0 mt-4 hover:opacity-60 transition-opacity">
          <MoreHorizCircle width={28} height={28} strokeWidth={1.5} />
        </button>
      </div>
      <p className="text-base text-black max-w-lg leading-snug">
        I want to put a description of interests goals, as statement to capture attention.
        The lead of a print direct response ad. Not stretched long. Not too tight.
      </p>
    </div>
  );
}
