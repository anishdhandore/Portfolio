// A project case study, modelled on milan.us: name and outcome, the facts
// (role, team, timeline), a device lineup, then the story of my work.
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion, useReducedMotion } from 'motion/react';
import { FiArrowLeft, FiArrowUpRight } from 'react-icons/fi';
import { BrowserFrame, PhoneFrame, TabletFrame } from './DeviceFrames';
import { Built, Flow, Learned, NextProject, Problem, Results, Screens } from './CaseSections';
import { findCaseStudy, nextCaseStudy } from './caseStudies';

const EASE = [0.16, 1, 0.3, 1];
const SITE_TITLE = 'Anish Dhandore';

const rise = (delay, isReduced) => ({
  initial: isReduced ? false : { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, ease: EASE, delay },
});

const CaseStudyPage = ({ slug }) => {
  const study = findCaseStudy(slug);
  const isReduced = Boolean(useReducedMotion());

  useEffect(() => {
    document.title = study ? `${study.name} · ${SITE_TITLE}` : SITE_TITLE;
    return () => {
      document.title = SITE_TITLE;
    };
  }, [study]);

  if (!study) {
    return (
      <Page>
        <Header>
          <Back href="/#projects">
            <FiArrowLeft aria-hidden="true" /> All work
          </Back>
          <Title>Project not found</Title>
          <Outcome>That page doesn’t exist. Pick a project from the deck instead.</Outcome>
        </Header>
      </Page>
    );
  }

  const { name, outcome, meta, links, accent, screens } = study;

  return (
    <Page>
      <Header>
        <Back href="/#projects">
          <FiArrowLeft aria-hidden="true" /> All work
        </Back>
        <TitleRow>
          <motion.div {...rise(0, isReduced)}>
            <Title>{name}</Title>
          </motion.div>
          <motion.div {...rise(0.08, isReduced)}>
            <Outcome>{outcome}</Outcome>
            <Meta>
              {meta.map(({ label, value }) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </Meta>
            <Links>
              {links.map(({ label, href }) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer">
                  {label} <FiArrowUpRight aria-hidden="true" />
                </a>
              ))}
            </Links>
          </motion.div>
        </TitleRow>
      </Header>

      <Hero style={{ '--accent': accent }} aria-label={`${name} on desktop, tablet and phone`}>
        <motion.div className="desktop" {...rise(0.15, isReduced)}>
          <BrowserFrame src={screens.desktop} alt={`${name} on desktop`} label={screens.label} />
        </motion.div>
        <motion.div className="tablet" {...rise(0.3, isReduced)}>
          <TabletFrame src={screens.tablet} alt={`${name} on a tablet`} />
        </motion.div>
        <motion.div className="phone" {...rise(0.42, isReduced)}>
          <PhoneFrame src={screens.phones[0]} alt={`${name} on a phone`} />
        </motion.div>
      </Hero>

      <Problem text={study.problem} />
      <Built items={study.built} />
      <Flow steps={study.flow} accent={accent} />
      <Results items={study.results} />
      <Screens name={name} screens={screens} accent={accent} />
      <Learned text={study.learned} />
      <NextProject study={nextCaseStudy(slug)} />
      <Spacer />
    </Page>
  );
};

const Page = styled.main`
  background: var(--color-paper);
  color: var(--color-ink);
  font-family: var(--font-body);
`;

const Header = styled.header`
  max-width: var(--content-max);
  margin: 0 auto;
  padding: calc(var(--nav-offset) + var(--nav-height) + clamp(1.5rem, 1rem + 2vw, 3rem)) var(--space-gutter) 0;
`;

const Back = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--color-ink-soft);
  font-size: var(--text-sm);
  text-decoration: none;
  transition: color var(--duration-fast) ease;

  &:hover {
    color: var(--color-ink);
  }

  &:focus-visible {
    outline: 2px solid var(--color-ink);
    outline-offset: 3px;
    border-radius: 4px;
  }
`;

const TitleRow = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.15fr);
  gap: clamp(1.5rem, 1rem + 3vw, 4rem);
  margin-top: clamp(1.5rem, 1rem + 2vw, 3rem);

  @media (max-width: 899px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const Title = styled.h1`
  font-family: var(--font-display);
  font-size: clamp(3rem, 1.5rem + 5vw, 6.5rem);
  font-weight: 500;
  line-height: 0.95;
  letter-spacing: -0.05em;
`;

const Outcome = styled.p`
  font-family: var(--font-display);
  font-size: clamp(1.4rem, 1.1rem + 1vw, 2rem);
  line-height: 1.2;
  letter-spacing: -0.025em;
  max-width: 28ch;
`;

const Meta = styled.dl`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.25rem 2rem;
  margin-top: clamp(1.5rem, 1rem + 1.5vw, 2.25rem);

  dt {
    font-size: var(--text-sm);
    color: var(--color-ink-soft);
  }

  dd {
    margin-top: 0.25rem;
    line-height: 1.4;
  }

  @media (max-width: 479px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const Links = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 1.75rem;

  a {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.65rem 1rem;
    border-radius: var(--radius-control);
    background: var(--color-ink);
    color: var(--color-paper);
    font-size: var(--text-sm);
    font-weight: 500;
    text-decoration: none;
    transition: background-color var(--duration-fast) ease, transform var(--duration-fast) var(--ease-out-expo);
  }

  a:hover {
    background: #2a2a2a;
  }

  a:active {
    transform: scale(0.97);
  }

  a:focus-visible {
    outline: 2px solid var(--color-ink);
    outline-offset: 3px;
  }
`;

/* device lineup on a dark band: desktop behind, tablet right, phone front-left */
const Hero = styled.section`
  position: relative;
  margin: clamp(2.5rem, 2rem + 3vw, 4.5rem) clamp(8px, 1vw, 16px) 0;
  padding: clamp(2.5rem, 2rem + 4vw, 6rem) var(--space-gutter) clamp(3rem, 2rem + 5vw, 7rem);
  border-radius: 40px;
  overflow: hidden;
  background:
    radial-gradient(ellipse 55% 60% at 50% 35%, color-mix(in srgb, var(--accent) 28%, transparent), transparent 72%),
    #0b0b0d;
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  align-items: end;

  .desktop {
    grid-column: 2 / span 9;
    grid-row: 1;
  }

  .tablet {
    grid-column: 8 / span 5;
    grid-row: 1;
    margin-bottom: -6%;
    transform-origin: bottom right;
  }

  .phone {
    grid-column: 1 / span 3;
    grid-row: 1;
    margin-bottom: -10%;
    max-width: 260px;
    justify-self: end;
    width: 100%;
  }

  @media (max-width: 899px) {
    border-radius: 28px;

    .desktop {
      grid-column: 1 / -1;
    }

    .tablet {
      display: none;
    }

    .phone {
      grid-column: 1 / span 5;
      justify-self: start;
      margin-bottom: -18%;
    }
  }
`;

const Spacer = styled.div`
  height: clamp(3rem, 2rem + 4vw, 6rem);
`;

export default CaseStudyPage;
