import React from 'react';
import styled from 'styled-components';
import { FiImage } from 'react-icons/fi';

// Intrinsic size of the slot (4:5); real photos should be exported at least this large
const SLOT_WIDTH = 960;
const SLOT_HEIGHT = 1200;

const HeroImage = ({ src, alt }) => (
  <Frame>
    {src ? (
      <Photo
        src={src}
        alt={alt}
        width={SLOT_WIDTH}
        height={SLOT_HEIGHT}
        loading="eager"
        fetchpriority="high"
      />
    ) : (
      <Placeholder role="img" aria-label="Portrait placeholder">
        <FiImage aria-hidden="true" />
        <span>Your photo goes here</span>
      </Placeholder>
    )}
  </Frame>
);

const Frame = styled.figure`
  position: relative;
  aspect-ratio: 4 / 5;
  width: 100%;
  border-radius: var(--radius-card);
  overflow: hidden;
  background: var(--color-surface);
`;

const Photo = styled.img`
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
