// Experience as a scroll-turned wheel: the ruler on the left rotates through
// time and the role under the pointer is described on the right.
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import ExperienceWheel from './ExperienceWheel';
import { activeIndexAt, buildScale, formatSpan, rotationKeyframes } from './scale';
import { ROLES } from './experienceData';
import { useMediaQuery } from '../../hooks/useMediaQuery';

const RANGE = [0.06, 0.94];
// soft spring: the wheel eases into each stop instead of snapping
const SCROLL_SPRING = { stiffness: 55, damping: 20, mass: 0.9, restDelta: 0.0005 };
const MOBILE_QUERY = '(max-width: 899px)';
const EASE = [0.16, 1, 0.3, 1];

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const formatMonth = (ym) => {
  const [y, m] = ym.split('-');
  return `${MONTHS[Number(m) - 1]} ${y}`;
};

const Experience = ({ now = new Date() }) => {
  const sectionRef = useRef(null);
  const isReduced = Boolean(useReducedMotion());
  const isMobile = useMediaQuery(MOBILE_QUERY);
  const scale = buildScale(ROLES, now);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const smooth = useSpring(scrollYProgress, SCROLL_SPRING);
  const progress = isReduced ? scrollYProgress : smooth;
  const { input, output } = rotationKeyframes(scale.nodes, RANGE);
  const month = useTransform(progress, input, output);

  const [active, setActive] = useState(0);
  useMotionValueEvent(progress, 'change', (p) => setActive(activeIndexAt(p, ROLES.length, RANGE)));

  const role = ROLES[active];
  const isCurrent = role.end === null;

  return (
    <Section id="experience" ref={sectionRef} aria-labelledby="experience-heading" $count={ROLES.length} data-hide-trail>
      <Sticky>
        <ExperienceWheel scale={scale} month={month} radius={isMobile ? 380 : 560} />

        <Column>
          <Header>
            <h2 id="experience-heading">Experience</h2>
          </Header>

          <Content>

          <AnimatePresence mode="wait" initial={false}>
            <motion.article
              key={role.company}
              initial={isReduced ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={isReduced ? { opacity: 0 } : { opacity: 0, y: -18 }}
              transition={{ duration: 0.45, ease: EASE }}
              aria-live="polite"
            >
              <Kicker>
                {isCurrent && <Live aria-hidden="true" />}
                {formatMonth(role.start)} — {isCurrent ? 'Present' : formatMonth(role.end)}
                <span> · {formatSpan(role.start, role.end, now)}</span>
              </Kicker>
              <Role>{role.role}</Role>
              <Company>
                {role.company}
                <span> · {role.location}</span>
              </Company>
              <Summary>{role.summary}</Summary>
              {role.highlights.length > 0 && (
                <Highlights>
                  {role.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </Highlights>
              )}
              <Impact>
                {role.metric && (
                  <Metric>
                    <b>{role.metric.value}</b>
                    <span>{role.metric.label}</span>
                  </Metric>
                )}
                <div>
                  <ImpactLabel>Impact</ImpactLabel>
                  <p>{role.impact}</p>
                </div>
              </Impact>
              <Tags>
                {role.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </Tags>
            </motion.article>
          </AnimatePresence>
          </Content>
        </Column>

        {/* the full list, for screen readers and anyone skimming */}
        <VisuallyHidden as="ol">
          {ROLES.map((r) => (
            <li key={r.company}>
              {r.role}, {r.company}, {formatMonth(r.start)} to {r.end ? formatMonth(r.end) : 'present'}
            </li>
          ))}
        </VisuallyHidden>
      </Sticky>
    </Section>
  );
};

const Section = styled.section`
  position: relative;
  height: ${({ $count }) => $count * 80 + 40}vh;
  background: var(--color-paper);
  color: var(--color-ink);
  font-family: var(--font-body);
  overflow: clip;
  overflow-anchor: none;
`;

const Sticky = styled.div`
  position: sticky;
  top: 0;
  height: 100svh;
  overflow: hidden;
  --rim-x: clamp(150px, 24vw, 360px);

  @media ${MOBILE_QUERY} {
    --rim-x: 64px;
  }
`;

const CONTENT_LEFT = 'calc(var(--rim-x) + clamp(5.5rem, 3.5rem + 5vw, 9rem))';

/* heading and role details share one column, so the details always start a
   fixed gap below the heading, whatever the role's length */
const Column = styled.div`
  position: absolute;
  z-index: 1;
  left: ${CONTENT_LEFT};
  right: var(--space-gutter);
  top: calc(var(--nav-offset) + var(--nav-height) + clamp(1rem, 3vh, 2rem));
  bottom: clamp(1.5rem, 4vh, 3rem);
  display: flex;
  flex-direction: column;
  gap: clamp(1.5rem, 5vh, 3.5rem);
  max-width: 40rem;

  @media ${MOBILE_QUERY} {
    left: calc(var(--rim-x) + 2.75rem);
  }
`;

const Content = styled.div`
  flex: 1;
  min-height: 0;
`;

const Header = styled.header`
  flex-shrink: 0;

  h2 {
    font-family: var(--font-display);
    font-size: clamp(1.75rem, 1.3rem + 1.2vw, 2.5rem);
    font-weight: 500;
    letter-spacing: -0.04em;
  }
`;

const Kicker = styled.p`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: var(--text-sm);
  font-weight: 500;
  font-variant-numeric: tabular-nums;

  span {
    color: var(--color-ink-soft);
    font-weight: 400;
  }
`;

const Live = styled.i`
  position: relative;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-live);

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: inherit;
    animation: exp-pulse 2.4s var(--ease-out-expo) infinite;
  }

  @keyframes exp-pulse {
    0% { transform: scale(1); opacity: 0.6; }
    70%, 100% { transform: scale(2.6); opacity: 0; }
  }

  @media (prefers-reduced-motion: reduce) {
    &::after { animation: none; }
  }
`;

const Role = styled.h3`
  margin-top: 0.9rem;
  font-family: 'Iowan Old Style', 'Palatino Linotype', Palatino, Georgia, serif;
  font-size: clamp(2rem, 1.4rem + 2vw, 3.25rem);
  font-weight: 500;
  line-height: 1.02;
  letter-spacing: -0.02em;

  @media (max-height: 780px) {
    margin-top: 0.6rem;
    font-size: clamp(1.8rem, 1.3rem + 1.6vw, 2.6rem);
  }

  @media ${MOBILE_QUERY} {
    font-size: 1.6rem;
  }
`;

const Company = styled.p`
  margin-top: 0.6rem;
  font-size: 1.125rem;
  font-weight: 500;
  letter-spacing: -0.01em;

  span {
    color: var(--color-ink-soft);
    font-weight: 400;
  }

  @media ${MOBILE_QUERY} {
    font-size: 1rem;
  }
`;

const Summary = styled.p`
  margin-top: 1rem;
  max-width: 52ch;
  line-height: 1.55;
  color: var(--color-ink);

  @media ${MOBILE_QUERY} {
    font-size: var(--text-sm);
  }
`;

/* short windows (e.g. 1280×720 laptops): tighter type and spacing */
const SHORT_QUERY = '(max-height: 780px)';

const Highlights = styled.ul`
  list-style: none;
  margin-top: 1.1rem;
  display: grid;
  gap: 0.55rem;
  max-width: 60ch;
  color: #4a4a4a;
  font-size: var(--text-sm);
  line-height: 1.55;

  li {
    position: relative;
    padding-left: 1.1rem;
  }

  /* hairline dash instead of a bullet */
  @media ${SHORT_QUERY} {
    margin-top: 0.8rem;
    gap: 0.35rem;
    line-height: 1.45;
  }

  li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.78em;
    width: 0.55rem;
    height: 1px;
    background: var(--color-ink);
  }

  /* too long for a narrow column: phones get the summary and impact instead */
  @media ${MOBILE_QUERY} {
    display: none;
  }
`;

const Impact = styled.div`
  display: flex;
  align-items: stretch;
  gap: 1.25rem;
  margin-top: 1.4rem;
  padding-top: 1.1rem;
  border-top: 1px solid #e6e6e6;
  max-width: 60ch;

  @media ${SHORT_QUERY} {
    margin-top: 1rem;
    padding-top: 0.8rem;
  }

  p {
    margin-top: 0.25rem;
    font-size: var(--text-sm);
    line-height: 1.55;
  }

  @media ${MOBILE_QUERY} {
    flex-direction: column;
    gap: 0.75rem;
  }
`;

const ImpactLabel = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-ink-soft);
`;

const Metric = styled.div`
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-right: 1.25rem;
  border-right: 1px solid #e6e6e6;

  b {
    font-family: var(--font-display);
    font-size: clamp(1.75rem, 1.4rem + 1vw, 2.25rem);
    font-weight: 500;
    letter-spacing: -0.04em;
    line-height: 1;
  }

  span {
    margin-top: 0.3rem;
    font-size: 0.75rem;
    color: var(--color-ink-soft);
  }

  @media ${MOBILE_QUERY} {
    padding-right: 0;
    border-right: 0;
  }
`;

const Tags = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1.25rem;

  li {
    padding: 0.3rem 0.7rem;
    border-radius: 999px;
    border: 1px solid #dddddd;
    font-size: 0.8125rem;
    color: #3d3d3d;
  }

  /* very short windows: tags are the first thing to go */
  @media (max-height: 680px) {
    display: none;
  }
`;


const VisuallyHidden = styled.div`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
`;

export default Experience;
