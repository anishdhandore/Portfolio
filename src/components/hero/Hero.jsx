import React from 'react';
import styled from 'styled-components';
import { motion, useReducedMotion } from 'motion/react';
import StatusBar from './StatusBar';
import HeroImage from './HeroImage';
import CopyEmailButton from './CopyEmailButton';
import { EMAIL, FOCUS, HEADLINE, NAME, RESUME_URL, SOCIALS } from './heroContent';

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1];
const HEADLINE_START = 0.15;
const WORD_STAGGER = 0.045;

const words = HEADLINE.flatMap((part) =>
  part.text.split(' ').map((word) => ({ word, strong: part.strong }))
);
const headlineEnd = HEADLINE_START + words.length * WORD_STAGGER;

const fadeUp = (delay) => ({
  hidden: { opacity: 0, y: 16 },
  shown: { opacity: 1, y: 0, transition: { delay, duration: 0.8, ease: EASE_OUT_EXPO } },
});

const wordRise = (index) => ({
  hidden: { y: '105%' },
  shown: {
    y: '0%',
    transition: { delay: HEADLINE_START + index * WORD_STAGGER, duration: 0.9, ease: EASE_OUT_EXPO },
  },
});

const imageReveal = {
  hidden: { clipPath: 'inset(100% 0% 0% 0% round 28px)' },
  shown: {
    clipPath: 'inset(0% 0% 0% 0% round 28px)',
    transition: { delay: 0.25, duration: 1.2, ease: EASE_OUT_EXPO },
  },
};

const Hero = ({ imageSrc, imageAlt = '' }) => {
  const shouldReduceMotion = useReducedMotion();
  const initial = shouldReduceMotion ? false : 'hidden';

  return (
    <Section id="home" aria-labelledby="hero-heading">
      <Inner initial={initial} animate="shown">
        <motion.div variants={fadeUp(0)}>
          <StatusBar />
        </motion.div>

        <Grid>
          <Copy>
            <Greeting variants={fadeUp(0.05)}>
              Hi there, I’m <strong>{NAME}</strong>
            </Greeting>

            <Headline id="hero-heading">
              {words.map(({ word, strong }, index) => (
                <React.Fragment key={`${word}-${index}`}>
                  <WordMask>
                    <Word variants={wordRise(index)} $strong={strong}>
                      {word}
                    </Word>
                  </WordMask>{' '}
                </React.Fragment>
              ))}
            </Headline>

            <Details variants={fadeUp(headlineEnd)}>
              <Column>
                <ColumnLabel>Socials</ColumnLabel>
                <List>
                  {SOCIALS.map(({ label, href }) => (
                    <li key={label}>
                      <TextLink href={href} target="_blank" rel="noopener noreferrer">
                        {label}
                      </TextLink>
                    </li>
                  ))}
                </List>
              </Column>

              <Column>
                <ColumnLabel>Focus</ColumnLabel>
                <List>
                  {FOCUS.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </List>
              </Column>

              <Column>
                <ColumnLabel>Get in touch</ColumnLabel>
                <Actions>
                  <CopyEmailButton email={EMAIL} />
                  <TextLink href={RESUME_URL} target="_blank" rel="noopener noreferrer">
                    View CV
                  </TextLink>
                </Actions>
              </Column>
            </Details>
          </Copy>

          <ImageSlot variants={imageReveal}>
            <HeroImage src={imageSrc} alt={imageAlt} />
          </ImageSlot>
        </Grid>
      </Inner>
    </Section>
  );
};

const Section = styled.section`
  position: relative;
  z-index: 1;
  min-height: 100svh;
  padding: calc(var(--nav-offset) + var(--nav-height) + clamp(1.25rem, 1rem + 1.5vw, 2.5rem))
    var(--space-gutter) var(--space-section);
  background: var(--color-paper);
  color: var(--color-ink);
  font-family: var(--font-body);
`;

const Inner = styled(motion.div)`
  max-width: var(--content-max);
  margin: 0 auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 8fr) minmax(0, 4fr);
  gap: clamp(2rem, 1rem + 4vw, 5rem);
  align-items: end;
  margin-top: clamp(3rem, 1.5rem + 7vw, 8rem);

  @media (max-width: 900px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const Copy = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(1.5rem, 1rem + 1.5vw, 2.25rem);

  @media (max-width: 900px) {
    display: contents;
  }
`;

const Greeting = styled(motion.p)`
  font-size: var(--text-lead);
  color: var(--color-ink-muted);

  strong {
    font-weight: 400;
    color: var(--color-ink);
  }
`;

const Headline = styled.h1`
  font-family: var(--font-display);
  font-size: var(--text-hero);
  font-weight: 500;
  line-height: 1.02;
  letter-spacing: -0.04em;
  max-width: 18ch;
  text-wrap: balance;
`;

const WordMask = styled.span`
  display: inline-block;
  overflow: hidden;
  /* room for descenders inside the mask */
  padding-bottom: 0.08em;
  margin-bottom: -0.08em;
  vertical-align: top;
`;

const Word = styled(motion.span)`
  display: inline-block;
  color: ${({ $strong }) => ($strong ? 'var(--color-ink)' : 'var(--color-ink-muted)')};
`;

const Details = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, auto));
  justify-content: start;
  gap: 1.5rem clamp(2rem, 1rem + 3vw, 4rem);
  padding-top: clamp(1rem, 0.5rem + 2vw, 2.5rem);

  @media (max-width: 900px) {
    order: 3;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 480px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  font-size: var(--text-base);
`;

const ColumnLabel = styled.h2`
  font-size: var(--text-sm);
  font-weight: 400;
  color: var(--color-ink-soft);
`;

const List = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.875rem;
`;

const TextLink = styled.a`
  position: relative;
  color: var(--color-ink);
  text-decoration: none;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: -2px;
    height: 1px;
    background: currentColor;
    transform: scaleX(0);
    transform-origin: right;
    transition: transform var(--duration-normal) var(--ease-out-expo);
  }

  &:hover::after,
  &:focus-visible::after {
    transform: scaleX(1);
    transform-origin: left;
  }

  &:focus-visible {
    outline: 2px solid var(--color-ink);
    outline-offset: 4px;
    border-radius: 2px;
  }
`;

const ImageSlot = styled(motion.div)`
  @media (max-width: 900px) {
    order: 2;
    width: min(100%, 26rem);
  }
`;

export default Hero;
