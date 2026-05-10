'use client';

import { useEffect, useRef, useState } from 'react';
import type { PointerEvent } from 'react';

type LiquidMagnifierProps = {
  src: string;
};

type LensState = {
  x: number;
  y: number;
  size: number;
  zoom: number;
};

type NaturalSize = {
  width: number;
  height: number;
};

type DragState =
  | {
      type: 'move';
      pointerId: number;
      startClientX: number;
      startClientY: number;
      startX: number;
      startY: number;
    }
  | {
      type: 'resize';
      pointerId: number;
      startClientX: number;
      startSize: number;
    }
  | {
      type: 'zoom';
      pointerId: number;
      startClientY: number;
      startZoom: number;
    };

const MIN_SIZE = 96;
const DEFAULT_ZOOM = 1.8;
const MAX_ZOOM = 3;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function createInitialState(width: number, height: number): LensState {
  const maxSize = Math.min(width, height);
  const size = clamp(Math.round(maxSize * 0.54), MIN_SIZE, maxSize);

  return {
    x: Math.round((width - size) / 2),
    y: Math.round((height - size) / 2),
    size,
    zoom: DEFAULT_ZOOM,
  };
}

export default function LiquidMagnifier({ src }: LiquidMagnifierProps) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef<DragState | null>(null);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  const [naturalSize, setNaturalSize] = useState<NaturalSize | null>(null);
  const [lens, setLens] = useState<LensState | null>(null);

  useEffect(() => {
    const node = viewportRef.current;
    if (!node) return;

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      const nextViewport = {
        width: Math.round(width),
        height: Math.round(height),
      };

      setViewport(nextViewport);
      setLens((current) => {
        if (!current) return createInitialState(nextViewport.width, nextViewport.height);

        const maxSize = Math.min(nextViewport.width, nextViewport.height);
        const size = clamp(current.size, MIN_SIZE, maxSize);

        return {
          ...current,
          x: clamp(current.x, 0, nextViewport.width - size),
          y: clamp(current.y, 0, nextViewport.height - size),
          size,
        };
      });
    });

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setLens(null);
  }, [src]);

  useEffect(() => {
    let cancelled = false;
    const image = new Image();

    setNaturalSize(null);

    image.onload = () => {
      if (cancelled) return;

      setNaturalSize({
        width: image.naturalWidth,
        height: image.naturalHeight,
      });
    };

    image.src = src;

    return () => {
      cancelled = true;
    };
  }, [src]);

  useEffect(() => {
    if (!lens && viewport.width > 0 && viewport.height > 0) {
      setLens(createInitialState(viewport.width, viewport.height));
    }
  }, [lens, viewport]);

  function finishDrag(event: PointerEvent<HTMLElement>) {
    if (dragRef.current?.pointerId === event.pointerId) {
      event.currentTarget.releasePointerCapture(event.pointerId);
      dragRef.current = null;
    }
  }

  function moveLens(event: PointerEvent<HTMLElement>) {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId || !lens) return;

    event.preventDefault();
    event.stopPropagation();

    if (drag.type === 'move') {
      const nextX = drag.startX + event.clientX - drag.startClientX;
      const nextY = drag.startY + event.clientY - drag.startClientY;

      setLens((current) => {
        if (!current) return current;

        return {
          ...current,
          x: clamp(nextX, 0, viewport.width - current.size),
          y: clamp(nextY, 0, viewport.height - current.size),
        };
      });
      return;
    }

    if (drag.type === 'resize') {
      const maxSize = Math.min(viewport.width - lens.x, viewport.height - lens.y);
      const nextSize = drag.startSize + event.clientX - drag.startClientX;

      setLens((current) => {
        if (!current) return current;

        return {
          ...current,
          size: clamp(nextSize, MIN_SIZE, maxSize),
        };
      });
      return;
    }

    const zoomDelta = (drag.startClientY - event.clientY) / 140;
    setLens((current) => {
      if (!current) return current;

      return {
        ...current,
        zoom: clamp(drag.startZoom + zoomDelta, 1, MAX_ZOOM),
      };
    });
  }

  function startMove(event: PointerEvent<HTMLDivElement>) {
    if (!lens) return;

    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      type: 'move',
      pointerId: event.pointerId,
      startClientX: event.clientX,
      startClientY: event.clientY,
      startX: lens.x,
      startY: lens.y,
    };
  }

  function startResize(event: PointerEvent<HTMLButtonElement>) {
    if (!lens) return;

    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      type: 'resize',
      pointerId: event.pointerId,
      startClientX: event.clientX,
      startSize: lens.size,
    };
  }

  function startZoom(event: PointerEvent<HTMLDivElement>) {
    if (!lens) return;

    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      type: 'zoom',
      pointerId: event.pointerId,
      startClientY: event.clientY,
      startZoom: lens.zoom,
    };
  }

  if (!lens || viewport.width === 0 || viewport.height === 0) {
    return <div ref={viewportRef} className="pointer-events-none absolute inset-0 z-20" />;
  }

  const fillHeight = `${((lens.zoom - 1) / (MAX_ZOOM - 1)) * 100}%`;
  const lensCenterX = lens.x + lens.size / 2;
  const lensCenterY = lens.y + lens.size / 2;
  const imageRatio = naturalSize ? naturalSize.width / naturalSize.height : viewport.width / viewport.height;
  const viewportRatio = viewport.width / viewport.height;
  const renderedImageWidth = imageRatio > viewportRatio ? viewport.height * imageRatio : viewport.width;
  const renderedImageHeight = imageRatio > viewportRatio ? viewport.height : viewport.width / imageRatio;
  const imageOffsetX = (viewport.width - renderedImageWidth) / 2;
  const imageOffsetY = (viewport.height - renderedImageHeight) / 2;
  const backgroundX = lens.size / 2 - (lensCenterX - imageOffsetX) * lens.zoom;
  const backgroundY = lens.size / 2 - (lensCenterY - imageOffsetY) * lens.zoom;

  return (
    <div ref={viewportRef} className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
      <div
        className="liquid-magnifier pointer-events-auto absolute cursor-grab touch-none overflow-hidden rounded-[18px] active:cursor-grabbing"
        style={{
          left: lens.x,
          top: lens.y,
          width: lens.size,
          height: lens.size,
        }}
        onPointerDown={startMove}
        onPointerMove={moveLens}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
      >
        <div
          className="absolute inset-0 rounded-[18px]"
          style={{
            backgroundImage: `url(${src})`,
            backgroundPosition: `${backgroundX}px ${backgroundY}px`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: `${renderedImageWidth * lens.zoom}px ${renderedImageHeight * lens.zoom}px`,
          }}
        />

        <div className="liquid-magnifier__edge" aria-hidden="true" />
        <div className="liquid-magnifier__shine" aria-hidden="true" />

        <div
          aria-label="Adjust magnifier zoom"
          aria-valuemax={MAX_ZOOM}
          aria-valuemin={1}
          aria-valuenow={Number(lens.zoom.toFixed(2))}
          className="absolute bottom-7 left-4 top-7 z-20 flex w-5 cursor-ns-resize touch-none items-center justify-center"
          role="slider"
          tabIndex={0}
          onPointerDown={startZoom}
          onPointerMove={moveLens}
          onPointerUp={finishDrag}
          onPointerCancel={finishDrag}
        >
          <div className="relative h-full w-[5px] overflow-hidden rounded-full bg-white/35 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.18)]">
            <div className="absolute bottom-0 left-0 right-0 rounded-full bg-white" style={{ height: fillHeight }} />
          </div>
        </div>

        <button
          type="button"
          aria-label="Resize magnifier"
          className="absolute bottom-0 right-0 z-20 size-12 cursor-nwse-resize touch-none"
          onPointerDown={startResize}
          onPointerMove={moveLens}
          onPointerUp={finishDrag}
          onPointerCancel={finishDrag}
        >
          <span className="absolute bottom-3 right-3 h-6 w-6 rounded-br-[14px] border-b-4 border-r-4 border-white/55" />
        </button>
      </div>
    </div>
  );
}
