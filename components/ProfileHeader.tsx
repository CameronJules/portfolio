export default function ProfileHeader() {
  return (
    <div className="pt-16 pb-12">
      <div className="flex items-start gap-6 mb-4">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-none">
          Cameron Jules
        </h1>
        <button
          aria-label="More options"
          className="mt-3 w-8 h-8 rounded-full border border-black flex items-center justify-center flex-shrink-0 hover:bg-black hover:text-white transition-colors"
        >
          <span className="text-xs tracking-widest">···</span>
        </button>
      </div>
      <p className="text-base text-black max-w-lg leading-snug">
        I want to put a description of interests goals, as statement to capture attention.
        The lead of a print direct response ad. Not stretched long. Not too tight.
      </p>
    </div>
  );
}
