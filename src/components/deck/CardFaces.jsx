import React, { useId } from 'react';
import styled from 'styled-components';

// Classic casino deck palette
export const CARD_RED = '#b3132b';
const CARD_INK = '#121212';
const CARD_STOCK = '#fbfaf6';
const SUIT = { symbol: '♠', color: CARD_INK };

/**
 * Casino-style back: white border, red field with a fine diamond lattice,
 * double inner frame, and a medallion carrying the navbar's eyes.
 */
export const CardBack = () => {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const lattice = `lattice-${uid}`;
  return (
    <Face $isBack aria-hidden="true" data-card-back>
      <svg viewBox="0 0 100 140" preserveAspectRatio="none" width="100%" height="100%">
        <defs>
          <pattern id={lattice} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45 50 70)">
            <rect width="6" height="6" fill={CARD_RED} />
            <path d="M0 0H6M0 0V6" stroke="#ffffff" strokeWidth="0.45" opacity="0.85" />
            <circle cx="3" cy="3" r="0.75" fill="#ffffff" opacity="0.9" />
          </pattern>
        </defs>
        {/* red field inside the white border */}
        <rect x="6" y="6" width="88" height="128" rx="3.5" fill={`url(#${lattice})`} />
        {/* double frame */}
        <rect x="9" y="9" width="82" height="122" rx="2.5" fill="none" stroke="#ffffff" strokeWidth="0.9" />
        <rect x="11" y="11" width="78" height="118" rx="1.8" fill="none" stroke="#ffffff" strokeWidth="0.4" />
        {/* corner flourishes */}
        {[
          [11, 11, 0],
          [89, 11, 90],
          [89, 129, 180],
          [11, 129, 270],
        ].map(([cx, cy, r]) => (
          <path
            key={`${cx}-${cy}`}
            d="M0 7 Q0 0 7 0"
            transform={`translate(${cx} ${cy}) rotate(${r})`}
            fill="none"
            stroke="#ffffff"
            strokeWidth="0.6"
          />
        ))}
        {/* medallion */}
        <ellipse cx="50" cy="70" rx="22" ry="16" fill={CARD_RED} stroke="#ffffff" strokeWidth="1.2" />
        <ellipse cx="50" cy="70" rx="19" ry="13" fill="#ffffff" />
        <ellipse cx="43" cy="70" rx="4.6" ry="5.6" fill={CARD_RED} />
        <ellipse cx="57" cy="70" rx="4.6" ry="5.6" fill={CARD_RED} />
        <circle cx="44.1" cy="71.4" r="2.2" fill="#ffffff" />
        <circle cx="58.1" cy="71.4" r="2.2" fill="#ffffff" />
        <circle cx="44.7" cy="72" r="1" fill={CARD_RED} />
        <circle cx="58.7" cy="72" r="1" fill={CARD_RED} />
      </svg>
    </Face>
  );
};

/**
 * Front: one screen of the project fills the whole card under a glossy
 * finish — the UI is the hero. The name is a slim frosted caption along the
 * bottom; when the card is picked (`isActive`) it grows into a teaser.
 */
export const CardFront = ({ project, headingId, isActive, isDimmed }) => {
  const { rank, name, year, hook, award, screen } = project;
  return (
    <Face as="article" aria-labelledby={headingId} data-active={isActive} $isFront>
      <Screen src={screen} alt="" loading="lazy" decoding="async" aria-hidden="true" />
      <Tint aria-hidden="true" />
      <Sheen aria-hidden="true" />

      <Index aria-hidden="true">
        <Rank>{rank}</Rank>
        <Pip>{SUIT.symbol}</Pip>
      </Index>
      <Index aria-hidden="true" $isFlipped>
        <Rank>{rank}</Rank>
        <Pip>{SUIT.symbol}</Pip>
      </Index>
      {award && <Award>★ Winner</Award>}

      <Glass>
        <Name id={headingId}>{name}</Name>
        <Year>{year}</Year>
        <Reveal>
          <RevealInner>
            {/* the badge already says "Winner", so the line only names the prize */}
            {award && <AwardLine>{award.replace(/^Winner · /, '')}</AwardLine>}
            <Hook>{hook}</Hook>
            <Cue aria-hidden="true">
              View project <Arrow>→</Arrow>
            </Cue>
          </RevealInner>
        </Reveal>
      </Glass>

      <Shade aria-hidden="true" $isOn={isDimmed} />
    </Face>
  );
};

const SERIF = "'Iowan Old Style', 'Palatino Linotype', Palatino, Georgia, 'Times New Roman', serif";
const GLASS_INK = '#f4f4f2';
const ACTIVE = "[data-active='true'] &";
const EASE_OUT = 'var(--ease-out-expo)';

const Face = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  border-radius: var(--card-radius);
  background: ${({ $isFront }) => ($isFront ? '#0c0c0e' : CARD_STOCK)};
  /* thin card edge + faint paper tone toward the rim (backs) */
  box-shadow: ${({ $isFront }) =>
    $isFront
      ? 'inset 0 0 0 1px rgba(255, 255, 255, 0.14)'
      : 'inset 0 0 0 1px rgba(0, 0, 0, 0.1), inset 0 0 calc(var(--card-width) * 0.08) rgba(120, 100, 60, 0.07)'};
  color: ${({ $isFront }) => ($isFront ? GLASS_INK : CARD_INK)};
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  transform: ${({ $isBack }) => ($isBack ? 'rotateY(180deg)' : 'none')};
`;

/* the project screen, edge to edge */
const Screen = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 18%;
  transform: scale(1.02);
  transition: transform 0.9s ${EASE_OUT};

  ${ACTIVE} {
    transform: scale(1.07);
  }
`;

/* a faint vignette keeps the edges dark and glossy without hiding the UI */
const Tint = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(130% 100% at 50% 40%, transparent 60%, rgba(10, 10, 12, 0.45));
`;

/* glossy highlight: a diagonal specular streak and a lit rim, like lacquer */
const Sheen = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  border-radius: inherit;
  pointer-events: none;
  background:
    linear-gradient(125deg, rgba(255, 255, 255, 0.26) 0%, rgba(255, 255, 255, 0.07) 22%, transparent 38%),
    linear-gradient(305deg, rgba(255, 255, 255, 0.08) 0%, transparent 25%);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.35),
    inset 0 0 0 1px rgba(255, 255, 255, 0.1);
  transition: transform 0.9s ${EASE_OUT};

  ${ACTIVE} {
    transform: translate(4%, 3%);
  }
`;

const Index = styled.div`
  position: absolute;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* a small dark glass chip, so it never collides with the app's own header */
  padding: 0.3em 0.4em 0.35em;
  border-radius: calc(var(--card-radius) * 0.55);
  background: linear-gradient(180deg, rgba(40, 40, 46, 0.95), rgba(16, 16, 18, 0.96));
  border: 1px solid rgba(255, 255, 255, 0.14);
  color: ${GLASS_INK};
  ${({ $isFlipped }) => ($isFlipped ? 'display: none;' : 'left: 5%; top: 4%;')}
`;

const Rank = styled.span`
  font-family: ${SERIF};
  font-size: max(calc(var(--card-width) * 0.085), 12px);
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.04em;
`;

const Pip = styled.span`
  font-size: max(calc(var(--card-width) * 0.065), 10px);
  line-height: 1;
`;

const Award = styled.span`
  position: absolute;
  z-index: 2;
  right: 5%;
  top: 4%;
  padding: 3px 7px;
  border-radius: 999px;
  background: ${CARD_RED};
  color: #ffffff;
  font-size: max(calc(var(--card-width) * 0.042), 8px);
  font-weight: 600;
  letter-spacing: 0.01em;
  box-shadow: 0 4px 12px rgba(179, 19, 43, 0.45);
`;

/* slim frosted caption along the bottom edge; grows into a teaser when picked */
const Glass = styled.div`
  position: absolute;
  z-index: 2;
  left: 5%;
  right: 5%;
  bottom: 4%;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: baseline;
  column-gap: 0.6em;
  padding: 5.5% 7%;
  border-radius: calc(var(--card-radius) * 0.7);
  /* near-solid dark glass: backdrop-filter doesn't render inside the 3D card flip */
  background: linear-gradient(180deg, rgba(40, 40, 46, 0.96), rgba(16, 16, 18, 0.97));
  border: 1px solid rgba(255, 255, 255, 0.14);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.18), 0 10px 24px rgba(0, 0, 0, 0.35);
  /* floor keeps names readable on small phone cards */
  font-size: max(calc(var(--card-width) * 0.048), 9.5px);
  transition: background-color 0.5s ease;


`;

const Name = styled.h3`
  min-width: 0;
  font-family: ${SERIF};
  font-size: 1.15em;
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.01em;
  text-wrap: balance;
`;

const Year = styled.p`
  color: rgba(244, 244, 242, 0.6);
  font-size: 0.9em;
  font-variant-numeric: tabular-nums;

  /* phone cards are small; the name gets the room (the year is on the case study) */
  @media (max-width: 639px) {
    display: none;
  }
`;

/* collapsed to zero height until the card is picked, then unfolds */
const Reveal = styled.div`
  grid-column: 1 / -1;
  display: grid;
  grid-template-rows: 0fr;
  opacity: 0;
  transition: grid-template-rows 0.5s ${EASE_OUT}, opacity 0.3s ease;

  ${ACTIVE} {
    grid-template-rows: 1fr;
    opacity: 1;
  }
`;

const RevealInner = styled.div`
  min-height: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.4em;
  padding-top: 0.7em;
  margin-top: 0.7em;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
`;

const AwardLine = styled.p`
  color: #ff7a8c;
  font-weight: 600;
`;

const Hook = styled.p`
  line-height: 1.4;
  color: rgba(244, 244, 242, 0.88);
`;

const Cue = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.4em;
  margin-top: 0.35em;
  padding: 0.45em 0.9em;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.92);
  color: ${CARD_INK};
  font-weight: 600;
`;

const Arrow = styled.span`
  display: inline-block;
  color: ${CARD_RED};
  transform: translateX(-0.3em);
  transition: transform 0.6s ${EASE_OUT} 0.1s;

  ${ACTIVE} {
    transform: translateX(0.15em);
  }
`;


/* dims the cards that aren't picked */
const Shade = styled.div`
  position: absolute;
  inset: 0;
  z-index: 4;
  border-radius: inherit;
  background: #000000;
  opacity: ${({ $isOn }) => ($isOn ? 0.5 : 0)};
  transition: opacity 0.35s ease;
  pointer-events: none;
`;
