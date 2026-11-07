// Body sections of a case study: problem, what I built, how it works,
// results, screens, what I learned and the next project.
import React from 'react';
import styled from 'styled-components';
import { motion, useReducedMotion } from 'motion/react';
import { BrowserFrame, PhoneFrame } from './DeviceFrames';

const EASE = [0.16, 1, 0.3, 1];

/** Fade + rise once when scrolled into view (instant with reduced motion). */
export const Reveal = ({ children, delay = 0, as = 'div', ...rest }) => {
  const isReduced = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      initial={isReduced ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px' }}
      transition={{ duration: 0.8, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export const Problem = ({ text }) => (
  <Block aria-labelledby="cs-problem">
    <Reveal>
      <H2 id="cs-problem">The problem</H2>
      <Lead>{text}</Lead>
    </Reveal>
  </Block>
);

export const Built = ({ items }) => (
  <Block aria-labelledby="cs-built">
    <Reveal>
      <H2 id="cs-built">What I built</H2>
    </Reveal>
    <BuiltList>
      {items.map(({ title, body }, i) => (
        <Reveal as="li" key={title} delay={i * 0.06}>
          <h3>{title}</h3>
          <p>{body}</p>
        </Reveal>
      ))}
    </BuiltList>
  </Block>
);

export const Flow = ({ steps, accent }) => (
  <Block aria-labelledby="cs-flow" $wide>
    <Reveal>
      <H2 id="cs-flow">How it works</H2>
    </Reveal>
    <FlowRow style={{ '--accent': accent }}>
      {steps.map(({ label, detail }, i) => (
        <Reveal as="li" key={label} delay={i * 0.08}>
          <span className="step">{String(i + 1).padStart(2, '0')}</span>
          <strong>{label}</strong>
          <span className="detail">{detail}</span>
        </Reveal>
      ))}
    </FlowRow>
  </Block>
);

export const Results = ({ items }) => (
  <Block aria-labelledby="cs-results" $wide>
    <Reveal>
      <H2 id="cs-results">Results</H2>
    </Reveal>
    <ResultGrid>
      {items.map(({ value, label }, i) => (
        <Reveal as="li" key={label} delay={i * 0.06}>
          <b>{value}</b>
          <span>{label}</span>
        </Reveal>
      ))}
    </ResultGrid>
  </Block>
);

export const Screens = ({ name, screens, accent }) => (
  <ScreensBand aria-labelledby="cs-screens" style={{ '--accent': accent }}>
    <Reveal>
      <H2 id="cs-screens" $onDark>
        On every screen
      </H2>
    </Reveal>
    <PhonePair>
      <Reveal>
        <PhoneFrame src={screens.phones[0]} alt={`${name} on a phone, main screen`} />
      </Reveal>
      <Reveal delay={0.12}>
        <PhoneFrame src={screens.phones[1]} alt={`${name} on a phone, second screen`} />
      </Reveal>
    </PhonePair>
    <Reveal>
      <BrowserFrame src={screens.desktopAlt} alt={`${name} on desktop, second screen`} label={screens.label} />
    </Reveal>
  </ScreensBand>
);

export const Learned = ({ text }) => (
  <Block aria-labelledby="cs-learned">
    <Reveal>
      <H2 id="cs-learned">What I learned</H2>
      <Lead>{text}</Lead>
    </Reveal>
  </Block>
);

export const NextProject = ({ study }) => (
  <Next href={`/work/${study.slug}`} aria-label={`Next project: ${study.name}`}>
    <span className="label">Next project</span>
    <span className="name">
      {study.name} <span aria-hidden="true">→</span>
    </span>
    <span className="shot" aria-hidden="true">
      <img src={study.screens.desktop} alt="" width={1400} height={875} loading="lazy" />
    </span>
  </Next>
);

/* ---------- styles ---------- */

const READING = '44rem';

const Block = styled.section`
  max-width: ${({ $wide }) => ($wide ? 'var(--content-max)' : READING)};
  margin: 0 auto;
  padding: clamp(3rem, 2rem + 4vw, 6rem) var(--space-gutter) 0;
`;

const H2 = styled.h2`
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 1.3rem + 1.4vw, 2.5rem);
  font-weight: 500;
  letter-spacing: -0.03em;
  color: ${({ $onDark }) => ($onDark ? '#f4f4f2' : 'var(--color-ink)')};
  margin-bottom: 1.25rem;
`;

const Lead = styled.p`
  font-size: var(--text-lead);
  line-height: 1.55;
  color: #3d3d3d;
  max-width: 62ch;
`;

const BuiltList = styled.ol`
  list-style: none;
  display: grid;
  gap: 1.75rem;
  counter-reset: built;

  li {
    position: relative;
    padding-left: 2.75rem;
    counter-increment: built;
  }

  li::before {
    content: counter(built);
    position: absolute;
    left: 0;
    top: 0.1rem;
    width: 1.9rem;
    height: 1.9rem;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: var(--color-ink);
    color: #ffffff;
    font-size: 0.8rem;
    font-weight: 600;
  }

  h3 {
    font-size: 1.15rem;
    font-weight: 600;
    letter-spacing: -0.01em;
  }

  p {
    margin-top: 0.35rem;
    color: #4a4a4a;
    line-height: 1.6;
  }
`;

const FlowRow = styled.ol`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;

  li {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    padding: 1.25rem;
    border-radius: 18px;
    background: var(--color-surface);
    border: 1px solid #e6e6e6;
  }

  /* connector arrows between steps */
  li:not(:last-child)::after {
    content: '';
    position: absolute;
    right: -11px;
    top: 50%;
    width: 8px;
    height: 8px;
    border-top: 2px solid var(--color-ink);
    border-right: 2px solid var(--color-ink);
    transform: translateY(-50%) rotate(45deg);
    z-index: 1;
  }

  .step {
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--accent);
    filter: saturate(1.2) brightness(0.8);
  }

  strong {
    font-size: 1.1rem;
    letter-spacing: -0.01em;
  }

  .detail {
    font-size: var(--text-sm);
    color: var(--color-ink-soft);
  }

  @media (max-width: 899px) {
    grid-template-columns: minmax(0, 1fr);

    li:not(:last-child)::after {
      right: auto;
      left: 50%;
      top: auto;
      bottom: -11px;
      transform: translateX(-50%) rotate(135deg);
    }
  }
`;

const ResultGrid = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
  border-top: 1px solid #e6e6e6;

  li {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    padding: 1.75rem 1.5rem 1.75rem 0;
    border-bottom: 1px solid #e6e6e6;
  }

  b {
    font-family: var(--font-display);
    font-size: clamp(2.25rem, 1.6rem + 2vw, 3.5rem);
    font-weight: 500;
    letter-spacing: -0.045em;
    line-height: 1;
  }

  span {
    color: var(--color-ink-soft);
    font-size: var(--text-sm);
  }
`;

const ScreensBand = styled.section`
  margin: clamp(3rem, 2rem + 4vw, 6rem) clamp(8px, 1vw, 16px) 0;
  padding: clamp(3rem, 2rem + 4vw, 6rem) var(--space-gutter);
  border-radius: 40px;
  background:
    radial-gradient(ellipse 60% 50% at 50% 30%, color-mix(in srgb, var(--accent) 22%, transparent), transparent 70%),
    #0b0b0d;
  text-align: center;

  @media (max-width: 899px) {
    border-radius: 28px;
  }

  & > div:last-child {
    max-width: 62rem;
    margin: clamp(2.5rem, 2rem + 3vw, 4.5rem) auto 0;
    text-align: left;
  }
`;

const PhonePair = styled.div`
  display: flex;
  justify-content: center;
  gap: clamp(1rem, 0.5rem + 3vw, 3.5rem);

  & > div {
    width: min(42vw, 300px);
  }

  & > div:last-child {
    margin-top: clamp(2rem, 1rem + 4vw, 5rem);
  }
`;

const Next = styled.a`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr);
  align-items: center;
  gap: 2rem;
  max-width: var(--content-max);
  margin: clamp(4rem, 3rem + 4vw, 8rem) auto 0;
  padding: clamp(1.5rem, 1rem + 2vw, 2.5rem);
  border-radius: 32px;
  background: var(--color-surface);
  color: var(--color-ink);
  text-decoration: none;
  overflow: hidden;

  .label {
    grid-column: 1;
    align-self: end;
    font-size: var(--text-sm);
    color: var(--color-ink-soft);
  }

  .name {
    grid-column: 1;
    font-family: var(--font-display);
    font-size: clamp(2.25rem, 1.5rem + 3vw, 4.5rem);
    font-weight: 500;
    letter-spacing: -0.045em;
    line-height: 1;
  }

  .name span {
    display: inline-block;
    transition: transform var(--duration-normal) var(--ease-out-expo);
  }

  .shot {
    grid-column: 2;
    grid-row: 1 / span 2;
    border-radius: 14px;
    overflow: hidden;
    box-shadow: 0 30px 60px -30px rgba(0, 0, 0, 0.45);
    transition: transform 0.7s var(--ease-out-expo);
  }

  .shot img {
    display: block;
    width: 100%;
    height: auto;
  }

  &:hover .name span {
    transform: translateX(0.3em);
  }

  &:hover .shot {
    transform: translateY(-6px) scale(1.02);
  }

  &:focus-visible {
    outline: 2px solid var(--color-ink);
    outline-offset: 4px;
  }

  @media (max-width: 899px) {
    grid-template-columns: minmax(0, 1fr);

    .shot {
      grid-column: 1;
      grid-row: auto;
    }
  }
`;
