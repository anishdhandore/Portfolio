import React, { useEffect, useId } from 'react';
import styled from 'styled-components';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { CardBack, CardFront, CARD_RED } from './CardFaces';
import { dealWindow, deckPose } from './dealLayout';

const LIFT_PX = 70; // how high a card rises mid-flight
const MAX_TILT_DEG = 6;
const TILT_SPRING = { stiffness: 220, damping: 20 };
const PICK_SPRING = { type: 'spring', stiffness: 320, damping: 26 };
const PICK_RISE_PX = 34; // a picked card rises out of the hand…
const PICK_SCALE = 1.08;
const MAKE_ROOM_PX = 26; // …and its neighbours slide aside

const clamp01 = (v) => Math.min(1, Math.max(0, v));
const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
const lerp = (a, b, t) => a + (b - a) * t;

/** Gentle 3D tilt toward the pointer while a card is picked. */
const usePointerTilt = (isActive) => {
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [MAX_TILT_DEG, -MAX_TILT_DEG]), TILT_SPRING);
  const rotateY = useSpring(useTransform(px, [0, 1], [-MAX_TILT_DEG, MAX_TILT_DEG]), TILT_SPRING);

  useEffect(() => {
    if (isActive) return;
    px.set(0.5);
    py.set(0.5);
  }, [isActive, px, py]);

  const onPointerMove = (e) => {
    if (!isActive || e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };

  return { rotateX, rotateY, onPointerMove };
};

/**
 * @param {'none' | 'picked' | 'other'} pick  this card's role while a card is hovered
 * @param {-1 | 0 | 1} side  which side of the picked card this card sits on
 */
const DeckCard = ({ project, index, count, progress, spot, dealRange, isDealt, pick, side, onPick }) => {
  const headingId = `card-${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  const { start, end } = dealWindow(index, count, dealRange);
  const from = deckPose(index, count);
  const isPicked = pick === 'picked';
  const picked = useMotionValue(isPicked ? 1 : 0);
  useEffect(() => picked.set(isPicked ? 1 : 0), [isPicked, picked]);

  // 0 → 1 over this card's flight, eased
  const t = useTransform(progress, (p) => easeInOutCubic(clamp01((p - start) / (end - start))));
  const x = useTransform(t, (v) => lerp(from.x, spot.x, v));
  const y = useTransform(t, (v) => lerp(from.y, spot.y, v) - Math.sin(Math.PI * v) * LIFT_PX);
  const rotate = useTransform(t, (v) => lerp(from.rotate, spot.rotate, v) - Math.sin(Math.PI * v) * 6);
  const scale = useTransform(t, (v) => 1 + Math.sin(Math.PI * v) * 0.08);
  // face down (180°) in the deck; flips over during the middle of the flight
  const rotateY = useTransform(t, [0, 0.25, 0.8, 1], [180, 180, 0, 0]);
  // deck: top card on top; in flight: above everything; dealt: left to right; picked: on top
  const zIndex = useTransform([t, picked], ([v, p]) => {
    if (v <= 0) return count - index;
    if (v < 1) return 100 + index;
    return p ? 60 : 10 + index;
  });
  // deep shadows: the cards sit on a black table
  const shadowOpacity = useTransform(t, (v) => 0.55 + Math.sin(Math.PI * v) * 0.25);
  const shadowBlur = useTransform([t, picked], ([v, p]) => (p ? 60 : 18 + Math.sin(Math.PI * v) * 30));
  const boxShadow = useTransform(
    [shadowOpacity, shadowBlur],
    ([o, b]) => `0 ${(b / 2).toFixed(1)}px ${b.toFixed(1)}px -8px rgba(0, 0, 0, ${o.toFixed(3)})`
  );

  const tilt = usePointerTilt(isPicked);

  const pickHandlers = isDealt
    ? {
        onPointerEnter: (e) => e.pointerType === 'mouse' && onPick(index),
        onPointerLeave: (e) => e.pointerType === 'mouse' && onPick(null),
        onFocus: () => onPick(index),
        onBlur: () => onPick(null),
      }
    : {};

  return (
    <Slot style={{ x, y, rotate, scale, zIndex }}>
      <Pick
        animate={{
          // straighten out of the fan, rise, and push the neighbours aside
          rotate: isPicked ? -spot.rotate : 0,
          y: isPicked ? -PICK_RISE_PX : 0,
          x: pick === 'other' ? side * MAKE_ROOM_PX : 0,
          scale: isPicked ? PICK_SCALE : 1,
        }}
        transition={PICK_SPRING}
        {...pickHandlers}
      >
        <Tilt style={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY }} onPointerMove={tilt.onPointerMove}>
          <Flipper style={{ rotateY, boxShadow }}>
            <CardFront project={project} headingId={headingId} isActive={isPicked} isDimmed={pick === 'other'} />
            <CardBack />
          </Flipper>
        </Tilt>
        {/* Outside the tilted layer: in 3D the tilt would otherwise push the
            screen in front of the link near the card's lower edge. */}
        <CardLink
          href={`/work/${project.slug}`}
          aria-label={`${project.name}: view case study`}
          tabIndex={isDealt ? 0 : -1}
          $isEnabled={isDealt}
        />
      </Pick>
    </Slot>
  );
};

const Slot = styled(motion.div)`
  position: absolute;
  left: calc(50% - var(--card-width) / 2);
  top: calc(50% - var(--card-height) / 2);
  width: var(--card-width);
  height: var(--card-height);
  perspective: 1200px;
`;

const Pick = styled(motion.div)`
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
`;

const CardLink = styled.a`
  position: absolute;
  inset: 0;
  border-radius: var(--card-radius);
  /* in front of the card even at full tilt */
  transform: translateZ(40px);
  pointer-events: ${({ $isEnabled }) => ($isEnabled ? 'auto' : 'none')};
  cursor: pointer;

  &:focus-visible {
    outline: 3px solid ${CARD_RED};
    outline-offset: 3px;
  }
`;

const Tilt = styled(motion.div)`
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
`;

const Flipper = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: var(--card-radius);
  transform-style: preserve-3d;
`;

export default DeckCard;
