// Ported from "Follow Eyes" by Matthias Ölschlegel (Framer marketplace).
import React, { createRef, useId, useMemo } from 'react';
import { useReducedMotion } from 'motion/react';
import { useFollowEyes } from './useFollowEyes';

const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

// Half width of each eye in SVG units; height follows `ratio`
const RX = 46;
const LID_START_OPEN = 0.05;

const DEFAULT_SETTINGS = {
  followSpeed: 0.16,
  blink: true,
  blinkEvery: 4,
  lookAtLinks: true,
  lookRange: 1,
  scrollReaction: true,
  squashAmount: 1,
  sleepy: true,
  sleepAfter: 4,
  wakeUp: true,
};

const makeEyeRefs = () => ({
  eyes: [createRef(), createRef()],
  svgs: [createRef(), createRef()],
  // sclera, clip rect and outline all share the lid's y/height
  lids: [0, 1].map(() => [createRef(), createRef(), createRef()]),
  pupils: [createRef(), createRef()],
  irises: [createRef(), createRef()],
});

const FollowEyes = ({
  eyeWhite = '#ffffff',
  pupil = '#0e0e10',
  outline = 'transparent',
  eyeSize = 26,
  gap = 5,
  pupilSize = 0.46,
  ratio = 1.17,
  roundness = 100,
  hasHighlight = true,
  winkOnClick = true,
  className,
  ...settingsOverrides
}) => {
  const isReducedMotion = Boolean(useReducedMotion());
  const uid = `fe${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  const refs = useMemo(makeEyeRefs, []);

  const RY = Math.round(RX * clamp(ratio, 0.6, 1.8) * 100) / 100;
  const round = clamp(roundness, 0, 100) / 100;
  const pupilR = Math.min(RX, RY) * clamp(pupilSize, 0.2, 0.7);
  const geometry = useMemo(() => ({ rx: RX, ry: RY, pupilR }), [RY, pupilR]);

  const settings = { ...DEFAULT_SETTINGS, ...settingsOverrides };
  const { rootRef, wink } = useFollowEyes({ geometry, refs, settings, isReducedMotion });

  // Start closed when waking up, so there is no flash of open eyes before the first frame
  const startsClosed = settings.wakeUp && !isReducedMotion;
  const h0 = startsClosed ? 2 * RY * LID_START_OPEN : 2 * RY;
  const y0 = startsClosed ? -RY + (2 * RY - h0) * 0.62 : -RY;
  const eyeH = Math.round((eyeSize * RY) / RX);
  const lidProps = { x: -RX, y: y0, width: RX * 2, height: h0, rx: RX * round, ry: RY * round };

  return (
    <div
      ref={rootRef}
      data-eyes
      aria-hidden="true"
      className={className}
      onClick={winkOnClick ? wink : undefined}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap,
        cursor: winkOnClick ? 'pointer' : 'default',
        userSelect: 'none',
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      {[0, 1].map((i) => (
        <div key={i} ref={refs.eyes[i]} style={{ width: eyeSize, height: eyeH, flexShrink: 0 }}>
          <svg
            ref={refs.svgs[i]}
            viewBox={`${-RX - 2} ${-RY - 2} ${RX * 2 + 4} ${RY * 2 + 4}`}
            width={eyeSize}
            height={eyeH}
            style={{ display: 'block', overflow: 'visible', transformOrigin: '50% 60%' }}
          >
            <defs>
              <clipPath id={`${uid}-clip-${i}`}>
                <rect ref={refs.lids[i][1]} {...lidProps} />
              </clipPath>
            </defs>
            <rect ref={refs.lids[i][0]} {...lidProps} fill={eyeWhite} />
            <g clipPath={`url(#${uid}-clip-${i})`}>
              <g ref={refs.pupils[i]}>
                <circle ref={refs.irises[i]} cx={0} cy={0} r={pupilR} fill={pupil} />
                {hasHighlight && (
                  <circle
                    cx={-pupilR * 0.34}
                    cy={-pupilR * 0.38}
                    r={Math.max(3, pupilR * 0.24)}
                    fill={eyeWhite}
                  />
                )}
              </g>
            </g>
            <rect
              ref={refs.lids[i][2]}
              {...lidProps}
              fill="none"
              stroke={outline}
              strokeWidth={2.5}
            />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default FollowEyes;
