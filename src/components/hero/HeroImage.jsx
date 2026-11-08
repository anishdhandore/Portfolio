import React from 'react';
import styled from 'styled-components';
import { motion, useReducedMotion } from 'motion/react';
import { FiImage } from 'react-icons/fi';
import IntroPortrait from './IntroPortrait';

// Intrinsic size of the slot (4:5); real photos should be exported at least this large
const SLOT_WIDTH = 960;
const SLOT_HEIGHT = 1200;
const FADE = { duration: 0.55, ease: [0.16, 1, 0.3, 1] };

/**
 * Hero portrait.
 * - `frames`: an image sequence played once on load (the character turns and
 *   points); ends on the `endSrc` pose
 * - with reduced motion, the `endSrc` pose is shown without animating
 */
const HeroImage = ({ src, alt, endSrc, endAlt, frames }) => {
  const isReduced = Boolean(useReducedMotion());

  if (!src) {
    return (
      <Frame>
        <Placeholder role="img" aria-label="Portrait placeholder">
          <FiImage aria-hidden="true" />
          <span>Your photo goes here</span>
        </Placeholder>
      </Frame>
    );
  }

  if (frames?.length && !isReduced) {
    return (
      <Frame data-pose="intro">
        <IntroPortrait frames={frames} poster={src} alt={alt} endAlt={endAlt ?? alt} />
      </Frame>
    );
  }

  const still = isReduced && endSrc ? { src: endSrc, alt: endAlt ?? alt } : { src, alt };
  return (
    <Frame data-pose="still">
      <Still
        src={still.src}
        alt={still.alt}
        width={SLOT_WIDTH}
        height={SLOT_HEIGHT}
        loading="eager"
        fetchpriority="high"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={FADE}
      />
    </Frame>
  );
};

const Frame = styled.figure`
  position: relative;
  aspect-ratio: 4 / 5;
  width: 100%;
  border-radius: var(--radius-card);
  overflow: hidden;
  background: var(--color-surface);
`;

const Still = styled(motion.img)`
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Placeholder = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  color: var(--color-ink-soft);
  font-size: var(--text-sm);
  background:
    radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.9), transparent 55%),
    var(--color-surface);

  svg {
    width: 28px;
    height: 28px;
    stroke-width: 1.5;
  }
`;

export default HeroImage;
