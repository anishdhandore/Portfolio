import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from 'motion/react';
import { FiArrowUpRight } from 'react-icons/fi';
import TabletScene, { SHOTS_RANGE } from './TabletScene';
import { chapterIndexAt } from './chapters';
import { BRIDGED, CHAPTERS } from './bridgedContent';

const SCROLL_SPRING = { stiffness: 120, damping: 28, restDelta: 0.0005 };
const MOBILE_QUERY = '(max-width: 899px)';

const useActiveChapter = (progress) => {
  const [active, setActive] = useState(0);
  // re-renders only when the chapter changes, not on every frame
  useMotionValueEvent(progress, 'change', (p) => setActive(chapterIndexAt(p, CHAPTERS.length, SHOTS_RANGE)));
  return active;
};

const BridgedShowcase = () => {
  const sectionRef = useRef(null);
  const isReducedMotion = Boolean(useReducedMotion());
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const smooth = useSpring(scrollYProgress, SCROLL_SPRING);
  const progress = isReducedMotion ? scrollYProgress : smooth;
  const active = useActiveChapter(progress);

  const meta = [
    ['Role', BRIDGED.role],
    ['Timeline', BRIDGED.timeline],
  ].filter(([, value]) => value);

  return (
    <Section id="work" ref={sectionRef} aria-labelledby="bridged-heading">
      <Sticky>
        <TabletScene progress={progress} isReducedMotion={isReducedMotion} />

        <Copy>
          <Kicker>Featured work</Kicker>
          <Title id="bridged-heading">{BRIDGED.name}</Title>
          <Summary>{BRIDGED.summary}</Summary>

          {meta.length > 0 && (
            <Meta>
              {meta.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </Meta>
          )}

          <MobileCaption aria-hidden="true">{CHAPTERS[active].title}</MobileCaption>

          <Chapters>
            {CHAPTERS.map(({ title, body }, i) => (
              <Chapter key={title} aria-current={i === active ? 'step' : undefined} $isActive={i === active}>
                <ChapterTitle>{title}</ChapterTitle>
                <ChapterBody
                  initial={false}
                  animate={i === active ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
                  transition={{ duration: isReducedMotion ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  {body}
                </ChapterBody>
              </Chapter>
            ))}
          </Chapters>

          <VisitLink href={BRIDGED.url} target="_blank" rel="noopener noreferrer">
            Visit {BRIDGED.urlLabel} <FiArrowUpRight aria-hidden="true" />
          </VisitLink>
        </Copy>
      </Sticky>
    </Section>
  );
};

const Section = styled.section`
  position: relative;
  /* about 70vh of scroll per shot */
  height: 400vh;
  background: var(--color-paper);
  color: var(--color-ink);
  font-family: var(--font-body);
  /* clip, not hidden: hidden would break position: sticky */
  overflow: clip;
  /* The pinned captions resize as chapters change; without this the browser's
     scroll anchoring "corrects" for that and yanks the page back up */
  overflow-anchor: none;

  @media ${MOBILE_QUERY} {
    height: 340vh;
  }
`;

const Sticky = styled.div`
  position: sticky;
  top: 0;
  height: 100svh;
  /* tablet sits in the right two thirds; copy owns the left third */
  --tablet-width: min(46vw, 760px);
  --stage-left: 30%;

  @media ${MOBILE_QUERY} {
    --tablet-width: 86vw;
    --stage-left: 0;
    --stage-top: 38%;
  }
`;

const Copy = styled.div`
  position: absolute;
  z-index: 1;
  top: calc(var(--nav-offset) + var(--nav-height) + clamp(1.5rem, 4vh, 3rem));
  bottom: clamp(1.5rem, 5vh, 3.5rem);
  /* line up with the hero's content column (and stay clear of the scroll trail) */
  left: max(var(--space-gutter), (100vw - var(--content-max)) / 2);
  width: min(30%, 24rem);
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  @media ${MOBILE_QUERY} {
    right: var(--space-gutter);
    left: var(--space-gutter);
    bottom: auto;
    width: auto;
    gap: 0.75rem;
  }
`;

const Kicker = styled.p`
  font-size: var(--text-sm);
  color: var(--color-ink-soft);
`;

const Title = styled.h2`
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 1.5rem + 2.6vw, 4rem);
  font-weight: 500;
  line-height: 0.95;
  letter-spacing: -0.045em;
`;

const Summary = styled.p`
  max-width: 34ch;
  font-size: var(--text-base);
  line-height: 1.5;
  color: var(--color-ink-soft);

  @media ${MOBILE_QUERY} {
    font-size: var(--text-sm);
  }
`;

const Meta = styled.dl`
  display: flex;
  gap: 2rem;
  font-size: var(--text-sm);

  dt { color: var(--color-ink-soft); }
  dd { margin-top: 0.25rem; }
`;

const Chapters = styled.ol`
  list-style: none;
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  padding-left: 1rem;
  border-left: 1px solid var(--color-surface-strong);

  @media ${MOBILE_QUERY} {
    display: none;
  }
`;

const Chapter = styled.li`
  position: relative;
  color: ${({ $isActive }) => ($isActive ? 'var(--color-ink)' : 'var(--color-ink-muted)')};
  transition: color var(--duration-normal) ease;

  /* active marker sits on the rail */
  &::before {
    content: '';
    position: absolute;
    left: calc(-1rem - 1px);
    top: 0;
    bottom: 0;
    width: 1px;
    background: var(--color-ink);
    transform: scaleY(${({ $isActive }) => ($isActive ? 1 : 0)});
    transform-origin: top;
    transition: transform var(--duration-normal) var(--ease-out-expo);
  }
`;

const ChapterTitle = styled.p`
  font-size: var(--text-base);
  font-weight: 500;
`;

const ChapterBody = styled(motion.p)`
  overflow: hidden;
  font-size: var(--text-sm);
  line-height: 1.5;
  color: var(--color-ink-soft);
  padding-top: 0.25rem;
`;

const VisitLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  align-self: flex-start;
  padding: 0.7rem 1rem;
  border-radius: var(--radius-control);
  background: var(--color-ink);
  color: var(--color-paper);
  font-size: var(--text-sm);
  font-weight: 500;
  text-decoration: none;
  transition: background-color var(--duration-fast) ease, transform var(--duration-fast) var(--ease-out-expo);

  &:hover { background: #2a2a2a; }
  &:active { transform: scale(0.97); }
  &:focus-visible {
    outline: 2px solid var(--color-ink);
    outline-offset: 3px;
  }
`;

const MobileCaption = styled.p`
  display: none;
  font-size: var(--text-sm);
  font-weight: 500;

  @media ${MOBILE_QUERY} {
    display: block;
  }
`;

export default BridgedShowcase;
