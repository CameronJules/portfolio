'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import LiquidMagnifier from './LiquidMagnifier';

const VIDEO_EXTS = ['.mp4', '.mov', '.webm', '.ogg'];
function isVideo(src: string) {
  return VIDEO_EXTS.some((ext) => src.toLowerCase().endsWith(ext));
}

export default function PostCarousel({ images, magnifierEnabled = false }: { images: string[]; magnifierEnabled?: boolean }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    const next = emblaApi.selectedScrollSnap();
    // pause any playing video that's no longer visible
    videoRefs.current.forEach((v, i) => {
      if (v && i !== next) v.pause();
    });
    setSelectedIndex(next);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  if (images.length === 0) {
    return <div className="w-full h-full bg-black" />;
  }

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div className="h-full overflow-hidden" ref={emblaRef}>
        <div className="flex h-full">
          {images.map((src, i) => (
            <div key={i} className="relative h-full min-w-0 flex-[0_0_100%] overflow-hidden bg-black">
              {isVideo(src) ? (
                <video
                  ref={(el) => { videoRefs.current[i] = el; }}
                  src={src}
                  controls
                  playsInline
                  className="absolute inset-0 h-full w-full object-contain"
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={src}
                  alt=""
                  loading={i === 0 ? 'eager' : 'lazy'}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {magnifierEnabled && !isVideo(images[selectedIndex]) && (
        <LiquidMagnifier src={images[selectedIndex]} />
      )}

      {images.length > 1 && selectedIndex > 0 && (
        <button
          onClick={scrollPrev}
          aria-label="Previous image"
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white bg-white/80 flex items-center justify-center hover:bg-white transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8l5 5" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}

      {images.length > 1 && selectedIndex < images.length - 1 && (
        <button
          onClick={scrollNext}
          aria-label="Next image"
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white bg-white/80 flex items-center justify-center hover:bg-white transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 3l5 5-5 5" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}

      {images.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          <div className="flex items-center gap-2 bg-black/30 rounded-full px-3 py-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => emblaApi?.scrollTo(i)}
                aria-label={`Go to image ${i + 1}`}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === selectedIndex ? 'bg-white' : 'bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
