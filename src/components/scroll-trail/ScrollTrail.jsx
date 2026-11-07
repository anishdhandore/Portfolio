import React, { useEffect, useId, useState } from 'react';
import styled from 'styled-components';
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import { pointOnTrail, sectionFraction, trailPoints } from './trail';
import { TRAIL_SECTIONS } from './trailSections';

const WIDTH = 16;
const GEOMETRY = { height: 220, centerX: WIDTH / 2, amplitude: 3.5 };
const DOT_COUNT = 23;
const DOT_RADIUS = 1.6;
const STOP_RADIUS = 3.25;
const STOP_REACHED_EPSILON = 0.002;
const PROGRESS_SPRING = { stiffness: 140, damping: 26, restDelta: 0.0005 };
const DOTS = trailPoints(DOT_COUNT, GEOMETRY);

// The trail lives in the empty margin left of the content column. The margin is
// max(gutter, (100vw - content) / 2); from 1120px it is >= 40px, enough for the
// 16px trail with 12px of clear space on each side.
const ROOMY_QUERY = '(min-width: 1120px)';
const CRAMPED_QUERY = '(max-width: 1119px)';

/** Section stops as { id, label, fraction }, recomputed when the page reflows. */
const useSectionStops = () => {
  const [stops, setStops] = useState([]);

  useEffect(() => {
    const measure = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const next = TRAIL_SECTIONS.flatMap(({ id, label }) => {
        const el = document.getElementById(id);
        if (!el) return [];
        const top = el.getBoundingClientRect().top + window.scrollY;
        return [{ id, label, fraction: sectionFraction(top, maxScroll) }];
      });
      setStops([...next].sort((a, b) => a.fraction - b.fraction));
    };

    measure();
    window.addEventListener('resize', measure);
    window.addEventListener('load', measure);
    const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    observer?.observe(document.body);
    return () => {
      window.removeEventListener('resize', measure);
      window.removeEventListener('load', measure);
      observer?.disconnect();
    };
  }, []);

  return stops;
};

/** True while any [data-hide-trail] section is on screen. */
const useHiddenBySection = () => {
  const [isHidden, setIsHidden] = useState(false);
  useEffect(() => {
    const targets = document.querySelectorAll('[data-hide-trail]');
    if (!targets.length || typeof IntersectionObserver === 'undefined') return undefined;
    const visible = new Set();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
        setIsHidden(visible.size > 0);
      },
      { threshold: 0.25 }
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);
  return isHidden;
};

const ScrollTrail = () => {
  const isHiddenBySection = useHiddenBySection();
  const clipId = `trail-${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, PROGRESS_SPRING);
  // The spring can overshoot slightly past 0 and 1; keep everything in range
  const progress = useTransform(shouldReduceMotion ? scrollYProgress : smoothProgress, (p) =>
    Math.min(1, Math.max(0, p))
  );

  const stops = useSectionStops();
  // Only re-render when another stop is passed, not on every scroll frame
  const [reachedCount, setReachedCount] = useState(0);
  const countReached = (p) => stops.filter((s) => p + STOP_REACHED_EPSILON >= s.fraction).length;
  useMotionValueEvent(progress, 'change', (p) => setReachedCount(countReached(p)));
  useEffect(() => {
    setReachedCount(countReached(progress.get()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stops]);

  const fillHeight = useTransform(progress, (p) => p * GEOMETRY.height);
  const markerX = useTransform(progress, (p) => pointOnTrail(p, GEOMETRY).x);
  const markerY = useTransform(progress, (p) => pointOnTrail(p, GEOMETRY).y);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: shouldReduceMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  };

  return (
    <>
      <Trail $isHidden={isHiddenBySection}>
        <svg
          aria-hidden="true"
          width={WIDTH}
          height={GEOMETRY.height}
          viewBox={`0 0 ${WIDTH} ${GEOMETRY.height}`}
          overflow="visible"
        >
          <defs>
            <clipPath id={clipId}>
              <motion.rect x={-8} y={0} width={WIDTH + 16} height={fillHeight} />
            </clipPath>
          </defs>
          <g fill="var(--t-idle)">
            {DOTS.map(({ x, y }) => (
              <circle key={y} data-trail="dot" cx={x} cy={y} r={DOT_RADIUS} />
            ))}
          </g>
          <g fill="var(--t-done)" clipPath={`url(#${clipId})`}>
            {DOTS.map(({ x, y }) => (
              <circle key={y} cx={x} cy={y} r={DOT_RADIUS} />
            ))}
          </g>
          <Marker cx={markerX} cy={markerY} r={4} />
        </svg>

        {stops.map(({ id, label, fraction }, index) => {
          const { x, y } = pointOnTrail(fraction, GEOMETRY);
          return (
            <Stop
              key={id}
              type="button"
              aria-label={`Go to ${label}`}
              style={{ left: x, top: y }}
              $isReached={index < reachedCount}
              onClick={() => scrollToSection(id)}
            >
              <StopLabel aria-hidden="true">{label}</StopLabel>
            </Stop>
          );
        })}
      </Trail>
      <TopBar aria-hidden="true" style={{ scaleX: progress }} />
    </>
  );
};

const Trail = styled.nav.attrs({ 'aria-label': 'Page sections' })`
  position: fixed;
  z-index: 40;
  top: 50%;
  /* centre of the empty margin left of the content column */
  left: calc(
    (max(var(--space-gutter), (100vw - var(--content-max)) / 2) - ${WIDTH}px) / 2
  );
  width: ${WIDTH}px;
  height: ${GEOMETRY.height}px;
  transform: translateY(-50%);

  /* Difference blending inverts the trail against whatever is behind it, so it
     reads dark on light sections and light on dark ones. Colours below are
     therefore authored inverted: white renders as ink on a white page. */
  mix-blend-mode: difference;
  opacity: ${({ $isHidden }) => ($isHidden ? 0 : 1)};
  visibility: ${({ $isHidden }) => ($isHidden ? 'hidden' : 'visible')};
  transition: opacity 0.4s ease, visibility 0.4s;
  --t-done: #ffffff;
  --t-idle: #393939;
  --t-idle-strong: #616161;
  --t-hole: #000000;

  @media ${CRAMPED_QUERY} {
    display: none;
  }
`;

const Marker = styled(motion.circle)`
  fill: var(--t-done);
  stroke: var(--t-hole);
  stroke-width: 2;
`;

const Stop = styled.button`
  position: absolute;
  width: 20px;
  height: 20px;
  margin: -10px 0 0 -10px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: transparent;
  cursor: pointer;

  /* visible dot */
  &::before {
    content: '';
    position: absolute;
    inset: calc(50% - ${STOP_RADIUS}px);
    border-radius: 50%;
    background: var(--t-hole);
    box-shadow: inset 0 0 0 1.5px
      ${({ $isReached }) => ($isReached ? 'var(--t-done)' : 'var(--t-idle-strong)')};
    transition: transform var(--duration-fast) var(--ease-out-expo), box-shadow var(--duration-normal) ease;
  }

  &:hover::before,
  &:focus-visible::before {
    transform: scale(1.5);
  }

  &:focus-visible {
    outline: 2px solid var(--t-done);
    outline-offset: 1px;
  }
`;

const StopLabel = styled.span`
  position: absolute;
  top: 50%;
  left: calc(100% + 6px);
  padding: 4px 8px;
  border-radius: 6px;
  background: var(--t-done);
  color: var(--t-hole);
  font: 500 12px / 1 var(--font-body);
  white-space: nowrap;
  opacity: 0;
  transform: translate(-4px, -50%);
  transition: opacity var(--duration-fast) ease, transform var(--duration-normal) var(--ease-out-expo);
  pointer-events: none;

  ${Stop}:hover &,
  ${Stop}:focus-visible & {
    opacity: 1;
    transform: translate(0, -50%);
  }
`;

const TopBar = styled(motion.div)`
  position: fixed;
  z-index: 60;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: #ffffff;
  mix-blend-mode: difference;
  opacity: ${({ $isHidden }) => ($isHidden ? 0 : 1)};
  visibility: ${({ $isHidden }) => ($isHidden ? 'hidden' : 'visible')};
  transition: opacity 0.4s ease, visibility 0.4s;
  transform-origin: 0 50%;
  pointer-events: none;

  @media ${ROOMY_QUERY} {
    display: none;
  }
`;

export default ScrollTrail;
