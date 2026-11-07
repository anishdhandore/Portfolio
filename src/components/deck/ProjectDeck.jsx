import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import DeckCard from './DeckCard';
import { dealLayout } from './dealLayout';
import { PROJECTS } from './projects';

const DEAL_RANGE = [0.14, 0.72];
const SCROLL_SPRING = { stiffness: 120, damping: 26, restDelta: 0.0005 };
const CARD_RATIO = 7 / 5; // playing card
const NARROW_STAGE_PX = 640;
const FALLBACK_STAGE = { width: 1200, height: 600 };

/** Card size that fits the stage: ~15% of a wide stage, two columns on a narrow one. */
const cardSizeFor = ({ width, height }) => {
  const isNarrow = width < NARROW_STAGE_PX;
  const byWidth = isNarrow ? (width - 16) / 2 : width * 0.172;
  const byHeight = isNarrow ? (height - 32) / 3 / CARD_RATIO : (height * 0.78) / CARD_RATIO;
  const cardWidth = Math.round(Math.max(120, Math.min(230, byWidth, byHeight)));
  return { cardWidth, cardHeight: Math.round(cardWidth * CARD_RATIO) };
};

const useStageSize = (ref) => {
  const [size, setSize] = useState(FALLBACK_STAGE);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof ResizeObserver === 'undefined') return undefined;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (width > 0 && height > 0) setSize({ width, height });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
  return size;
};

const ProjectDeck = () => {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const isReducedMotion = Boolean(useReducedMotion());
  const stage = useStageSize(stageRef);
  const { cardWidth, cardHeight } = cardSizeFor(stage);
  const spots = dealLayout({ count: PROJECTS.length, stageWidth: stage.width, cardWidth, cardHeight });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const smooth = useSpring(scrollYProgress, SCROLL_SPRING);
  const dealtForever = useMotionValue(1);
  const progress = isReducedMotion ? dealtForever : smooth;

  // re-render only when the whole hand has landed (enables hover + links)
  const [isDealt, setIsDealt] = useState(isReducedMotion);
  useMotionValueEvent(progress, 'change', (p) => setIsDealt(p >= DEAL_RANGE[1]));

  // the card being "picked" from the hand (hover or keyboard focus)
  const [pickedIndex, setPickedIndex] = useState(null);
  useEffect(() => {
    if (!isDealt) setPickedIndex(null);
  }, [isDealt]);
  const hintOpacity = useTransform(progress, [0, DEAL_RANGE[0] * 0.6, DEAL_RANGE[0]], [1, 1, 0]);

  return (
    <Section id="projects" ref={sectionRef} aria-labelledby="projects-heading" data-scroll-to="end">
      <Sticky>
        <Header>
          <Kicker>More work</Kicker>
          <Title id="projects-heading">A winning hand</Title>
          <Lede>Hackathon wins and side projects, dealt face up.</Lede>
        </Header>

        <Stage
          ref={stageRef}
          style={{
            '--card-width': `${cardWidth}px`,
            '--card-height': `${cardHeight}px`,
            '--card-radius': `${Math.round(cardWidth * 0.07)}px`,
          }}
        >
          {PROJECTS.map((project, i) => (
            <DeckCard
              key={project.name}
              project={project}
              index={i}
              count={PROJECTS.length}
              progress={progress}
              spot={spots[i]}
              dealRange={DEAL_RANGE}
              isDealt={isDealt}
              pick={pickedIndex === null ? 'none' : pickedIndex === i ? 'picked' : 'other'}
              side={pickedIndex === null ? 0 : Math.sign(i - pickedIndex)}
              onPick={setPickedIndex}
            />
          ))}
          {!isReducedMotion && <Hint style={{ opacity: hintOpacity }}>Scroll to deal</Hint>}
        </Stage>
      </Sticky>
    </Section>
  );
};

const MOBILE_QUERY = '(max-width: 899px)';
const PANEL_INSET = 'clamp(8px, 1vw, 16px)';
const TABLE_INK = '#f4f4f2';

// Fine felt grain, generated once (SVG turbulence)
const FELT = `url("data:image/svg+xml;utf8,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160"><filter id="f"><feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="2" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.5 0"/></filter><rect width="100%" height="100%" filter="url(#f)"/></svg>'
)}")`;

const Section = styled.section`
  position: relative;
  height: 260vh;
  margin: 0 ${PANEL_INSET};
  border-radius: 40px;
  background: #0a0a0b;
  color: ${TABLE_INK};
  font-family: var(--font-body);
  overflow: clip;
  overflow-anchor: none;

  @media ${MOBILE_QUERY} {
    border-radius: 28px;
  }
`;

const Sticky = styled.div`
  position: sticky;
  top: 0;
  height: 100svh;
  display: flex;
  flex-direction: column;
  padding: calc(var(--nav-offset) + var(--nav-height) + clamp(1rem, 3vh, 2.5rem))
    calc(max(var(--space-gutter), (100vw - var(--content-max)) / 2) - ${PANEL_INSET})
    clamp(1.5rem, 5vh, 3rem);

  /* overhead lamp on the table, plus felt grain */
  &::before,
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  &::before {
    background: radial-gradient(ellipse 55% 50% at 50% 58%, rgba(255, 255, 255, 0.09), transparent 70%);
  }

  &::after {
    background-image: ${FELT};
    opacity: 0.06;
    mix-blend-mode: overlay;
  }

  & > * {
    position: relative;
    z-index: 1;
  }
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const Kicker = styled.p`
  font-size: var(--text-sm);
  color: rgba(244, 244, 242, 0.55);
`;

const Title = styled.h2`
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 1.5rem + 2.6vw, 4rem);
  font-weight: 500;
  line-height: 0.95;
  letter-spacing: -0.045em;
`;

const Lede = styled.p`
  color: rgba(244, 244, 242, 0.62);

  @media ${MOBILE_QUERY} {
    font-size: var(--text-sm);
  }
`;

const Stage = styled.div`
  position: relative;
  flex: 1;
  min-height: 0;
  margin-top: clamp(1rem, 3vh, 2rem);
`;

const Hint = styled(motion.p)`
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  font-size: var(--text-sm);
  color: rgba(244, 244, 242, 0.55);
  pointer-events: none;
`;

export default ProjectDeck;
