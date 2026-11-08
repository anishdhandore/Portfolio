// Intro portrait: once the page has loaded, plays an image sequence on a canvas
// (the character turns to the camera and points), blending neighbouring
// frames so the motion stays smooth, then holds on the last frame.
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { animate } from 'motion/react';
import { frameAt } from './frameAt';

// let the hero's headline finish rising before the portrait moves
const START_DELAY_S = 0.6;
const DURATION_S = 1.8;
const EASE = [0.65, 0, 0.35, 1]; // ease in-out: settles into the point

/** Loads every frame in the background; resolves to HTMLImageElements in order. */
const useFrames = (urls) => {
  const [images, setImages] = useState(null);
  useEffect(() => {
    let isCancelled = false;
    const load = () =>
      Promise.all(
        urls.map(
          (url) =>
            new Promise((resolve, reject) => {
              const img = new Image();
              img.decoding = 'async';
              img.onload = () => resolve(img);
              img.onerror = () => reject(new Error(`Failed to load frame ${url}`));
              img.src = url;
            })
        )
      )
        .then((loaded) => !isCancelled && setImages(loaded))
        // a missing frame isn't fatal: the poster image stays in place
        .catch((error) => console.warn(error.message)); // eslint-disable-line no-console

    // let the page paint first, then fetch the sequence
    const idle = window.requestIdleCallback ?? ((cb) => window.setTimeout(cb, 300));
    const id = idle(load);
    return () => {
      isCancelled = true;
      (window.cancelIdleCallback ?? window.clearTimeout)(id);
    };
  }, [urls]);
  return images;
};

/** Draw `img` to fill the canvas like object-fit: cover. */
const drawCover = (ctx, img, w, h) => {
  const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight);
  const dw = img.naturalWidth * scale;
  const dh = img.naturalHeight * scale;
  ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
};

const IntroPortrait = ({ frames, poster, alt, endAlt }) => {
  const canvasRef = useRef(null);
  const images = useFrames(frames);
  const [isEnd, setIsEnd] = useState(false);
  const progress = useRef(0);

  const draw = (p) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext?.('2d');
    if (!ctx || !images) return;
    const { width, height } = canvas;
    const { index, next, mix } = frameAt(p, images.length);
    ctx.globalAlpha = 1;
    drawCover(ctx, images[index], width, height);
    if (mix > 0) {
      ctx.globalAlpha = mix;
      drawCover(ctx, images[next], width, height);
    }
  };

  // size the canvas to its box at device resolution, and redraw on resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !images) return undefined;
    const fit = () => {
      const { width, height } = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      draw(progress.current);
    };
    fit();
    const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(fit) : null;
    observer?.observe(canvas);
    return () => observer?.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);

  // play once, as soon as every frame is ready
  useEffect(() => {
    if (!images) return undefined;
    const controls = animate(0, 1, {
      delay: START_DELAY_S,
      duration: DURATION_S,
      ease: EASE,
      onUpdate: (p) => {
        progress.current = p;
        draw(p);
      },
      onComplete: () => setIsEnd(true),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);

  return (
    <>
      {/* the poster shows until the sequence has loaded, and carries the alt text */}
      <Poster src={poster} alt={isEnd ? endAlt : alt} width={960} height={1200} loading="eager" fetchpriority="high" />
      <Canvas ref={canvasRef} aria-hidden="true" $isReady={Boolean(images)} />
    </>
  );
};

const fill = `
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
`;

const Poster = styled.img`
  ${fill}
  object-fit: cover;
`;

const Canvas = styled.canvas`
  ${fill}
  opacity: ${({ $isReady }) => ($isReady ? 1 : 0)};
  transition: opacity 0.3s ease;
`;

export default IntroPortrait;
