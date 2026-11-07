import React from 'react';
import styled from 'styled-components';
import { motion, useTransform } from 'motion/react';
import { screenKeyframes } from './chapters';
import { poseKeyframes, shotBounds, spotlightKeyframes, titleKeyframes } from './timeline';
import { CHAPTERS } from './bridgedContent';

export const SHOTS_RANGE = [0.07, 0.95];
const TRANSITION = 0.24; // share of each shot spent whipping into it
const SCREEN_ASPECT = '1180 / 820';
const SCREEN_BLUR_PX = 12;
const ZOOM = 0.08; // gentle push-in toward the highlight
const LIFT_Z_PX = 90; // how far the highlight rises off the glass
const LIFT_SCALE = 0.06;
const DIM = 0.55; // how dark the rest of the screen goes while a card is lifted

// Camera path. Each shot drifts from `from` to `to`; the moves between shots
// are quick whips. The tablet starts and ends lying almost flat.
const INTRO = { rotateX: 58, rotateY: 0, rotateZ: -32, scale: 0.8 };
const OUTRO = { rotateX: 40, rotateY: 2, rotateZ: -18, scale: 0.9 };
const POSES = [
  { from: { rotateX: 14, rotateY: 10, rotateZ: -8, scale: 0.98 }, to: { rotateX: 10, rotateY: 6, rotateZ: -6, scale: 1 } },
  { from: { rotateX: 20, rotateY: -16, rotateZ: 6, scale: 1 }, to: { rotateX: 16, rotateY: -11, rotateZ: 4, scale: 1 } },
  { from: { rotateX: 8, rotateY: 18, rotateZ: -4, scale: 1 }, to: { rotateX: 6, rotateY: 13, rotateZ: -3, scale: 1 } },
  { from: { rotateX: 24, rotateY: -6, rotateZ: -10, scale: 1 }, to: { rotateX: 20, rotateY: -3, rotateZ: -8, scale: 1 } },
  { from: { rotateX: 12, rotateY: 2, rotateZ: -3, scale: 1 }, to: { rotateX: 9, rotateY: 0, rotateZ: -2, scale: 1 } },
];
const RESTING = { rotateX: 10, rotateY: -2, rotateZ: -5, scale: 1 };

const COUNT = CHAPTERS.length;
const percent = (n) => `${(n * 100).toFixed(3)}%`;
const focusCenter = ({ x, y, w, h }) => `${percent(x + w / 2)} ${percent(y + h / 2)}`;

/** Screen + lifted card for one shot; both are driven by the same `lift` value. */
const ShotLayers = ({ index, progress, isReducedMotion }) => {
  const { screen, alt, focus } = CHAPTERS[index];
  const { x, y, w, h } = focus;
  const { length } = shotBounds(index, COUNT, SHOTS_RANGE);

  // crossfade (with a whip blur) into this shot's screen
  const fade = screenKeyframes(index, COUNT, SHOTS_RANGE, (TRANSITION / 2) * length);
  const screenOpacity = useTransform(progress, fade.input, fade.opacity);
  const screenFilter = useTransform(screenOpacity, (o) =>
    isReducedMotion || o >= 0.999 ? 'none' : `blur(${((1 - o) * SCREEN_BLUR_PX).toFixed(2)}px)`
  );

  // lift: 0 → 1 → 0 as the highlight rises off the glass and settles back
  const spot = spotlightKeyframes(index, COUNT, SHOTS_RANGE);
  const lift = useTransform(progress, spot.input, spot.lift);
  const zoom = useTransform(lift, (l) => (isReducedMotion ? 1 : 1 + ZOOM * l));
  const dim = useTransform(lift, (l) => l * DIM);

  const cardZ = useTransform(lift, (l) => (isReducedMotion ? 0 : l * LIFT_Z_PX));
  const cardScale = useTransform(lift, (l) => (isReducedMotion ? 1 : (1 + ZOOM * l) * (1 + LIFT_SCALE * l)));
  const cardOpacity = useTransform(lift, [0, 0.15, 1], [0, 1, 1]);
  const cardShadow = useTransform(
    lift,
    (l) => `0 ${(l * 36).toFixed(1)}px ${(l * 60).toFixed(1)}px -12px rgba(0, 0, 0, ${(l * 0.55).toFixed(3)})`
  );

  return (
    <>
      <ScreenSlot>
        <ScreenLayer
          style={{ opacity: screenOpacity, filter: screenFilter, scale: zoom, transformOrigin: focusCenter(focus) }}
        >
          <ScreenImage src={screen} alt={alt} width={2360} height={1640} loading="lazy" decoding="async" />
          <Dim aria-hidden="true" style={{ opacity: dim }} />
          {/* the empty slot the card leaves behind when it lifts */}
          <Slot
            aria-hidden="true"
            style={{ left: percent(x), top: percent(y), width: percent(w), height: percent(h), opacity: lift }}
          />
        </ScreenLayer>
      </ScreenSlot>

      {/* The card is cut from the same screenshot and scales around its own centre,
          which is also the zoom origin, so it stays registered with the screen. */}
      <PopLayer aria-hidden="true">
        <Card
          style={{
            left: percent(x),
            top: percent(y),
            width: percent(w),
            height: percent(h),
            backgroundImage: `url(${screen})`,
            backgroundSize: `${percent(1 / w)} ${percent(1 / h)}`,
            backgroundPosition: `${percent(x / (1 - w))} ${percent(y / (1 - h))}`,
            z: cardZ,
            scale: cardScale,
            opacity: cardOpacity,
            boxShadow: cardShadow,
          }}
        />
      </PopLayer>
    </>
  );
};

const TitleWord = ({ index, progress, isReducedMotion }) => {
  const { word } = CHAPTERS[index];
  const { start, end } = shotBounds(index, COUNT, SHOTS_RANGE);
  const fade = titleKeyframes(index, COUNT, SHOTS_RANGE);
  const opacity = useTransform(progress, fade.input, fade.opacity);
  const x = useTransform(progress, [start, end], isReducedMotion ? ['0%', '0%'] : ['8%', '-8%']);
  return (
    <Word aria-hidden="true" style={{ opacity, x }}>
      {word}
    </Word>
  );
};

const POSE_KEYS = poseKeyframes({ poses: POSES, intro: INTRO, outro: OUTRO, range: SHOTS_RANGE, transition: TRANSITION });

const useCamera = (progress, isReducedMotion) => {
  const { input, values } = POSE_KEYS;
  const rotateX = useTransform(progress, input, values.rotateX);
  const rotateY = useTransform(progress, input, values.rotateY);
  const rotateZ = useTransform(progress, input, values.rotateZ);
  const scale = useTransform(progress, input, values.scale);
  return isReducedMotion ? RESTING : { rotateX, rotateY, rotateZ, scale };
};

const TabletScene = ({ progress, isReducedMotion }) => {
  const camera = useCamera(progress, isReducedMotion);
  const glareX = useTransform(progress, [0, 1], ['-60%', '60%']);

  return (
    <Scene>
      <Words>
        {CHAPTERS.map((chapter, i) => (
          <TitleWord key={chapter.word} index={i} progress={progress} isReducedMotion={isReducedMotion} />
        ))}
      </Words>

      <Stage>
        <Tablet style={camera}>
          {CHAPTERS.map((chapter, i) => (
            <ShotLayers key={chapter.title} index={i} progress={progress} isReducedMotion={isReducedMotion} />
          ))}
          <GlassSlot aria-hidden="true">
            <Glare style={{ x: glareX }} />
          </GlassSlot>
          <Camera aria-hidden="true" />
        </Tablet>
      </Stage>
    </Scene>
  );
};

const Scene = styled.div`
  position: absolute;
  inset: 0;
  overflow: clip;
`;

/* the title words and the tablet share the same box */
const stageBox = `
  position: absolute;
  /* parents position the tablet with --stage-top / --stage-left */
  inset: var(--stage-top, 0) 0 0 var(--stage-left, 0);
  display: grid;
  place-items: center;
`;

const Words = styled.div`
  ${stageBox}
  pointer-events: none;
`;

const Word = styled(motion.span)`
  grid-area: 1 / 1;
  font-family: var(--font-display);
  font-size: clamp(5rem, 2rem + 14vw, 17rem);
  font-weight: 600;
  letter-spacing: -0.06em;
  line-height: 1;
  color: var(--color-surface);
  white-space: nowrap;
  user-select: none;
`;

const Stage = styled.div`
  ${stageBox}
  perspective: 1800px;
`;

const BEZEL = 'clamp(8px, 1.1vw, 14px)';

const Tablet = styled(motion.div)`
  position: relative;
  width: var(--tablet-width, min(46vw, 760px));
  aspect-ratio: ${SCREEN_ASPECT};
  box-sizing: content-box;
  padding: ${BEZEL};
  border-radius: clamp(20px, 2.6vw, 36px);
  background: linear-gradient(145deg, #2e2e34 0%, #0d0d10 38%, #060607 100%);
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.2),
    0 50px 80px -34px rgba(0, 0, 0, 0.38),
    0 22px 34px -22px rgba(0, 0, 0, 0.3);
  transform-style: preserve-3d;
  will-change: transform;
`;

/* screens, pop cards and glass all share the screen rectangle inside the bezel */
const screenRect = `
  position: absolute;
  inset: ${BEZEL};
  border-radius: clamp(12px, 1.6vw, 22px);
`;

const ScreenSlot = styled.div`
  ${screenRect}
  overflow: hidden;
`;

const ScreenLayer = styled(motion.div)`
  position: absolute;
  inset: 0;
  background: #0a0a0a;
`;

const ScreenImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
`;

const Dim = styled(motion.div)`
  position: absolute;
  inset: 0;
  background: #000;
  pointer-events: none;
`;

const Slot = styled(motion.div)`
  position: absolute;
  border-radius: clamp(6px, 0.9vw, 12px);
  background: #050506;
  box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.8), inset 0 0 0 1px rgba(255, 255, 255, 0.05);
`;

const PopLayer = styled.div`
  ${screenRect}
  transform-style: preserve-3d;
  pointer-events: none;
`;

const Card = styled(motion.div)`
  position: absolute;
  border-radius: clamp(6px, 0.9vw, 12px);
  background-repeat: no-repeat;
  outline: 1px solid rgba(255, 255, 255, 0.14);
  outline-offset: -1px;
`;

const GlassSlot = styled.div`
  ${screenRect}
  overflow: hidden;
  pointer-events: none;
`;

const Glare = styled(motion.div)`
  position: absolute;
  inset: -20% -40%;
  background: linear-gradient(
    115deg,
    transparent 35%,
    rgba(255, 255, 255, 0.07) 45%,
    rgba(255, 255, 255, 0.02) 55%,
    transparent 65%
  );
`;

const Camera = styled.span`
  position: absolute;
  top: 50%;
  left: clamp(3px, 0.45vw, 6px);
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #1c1c22;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.06);
  transform: translateY(-50%);
`;

export default TabletScene;
