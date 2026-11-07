// Ported from "Follow Eyes" by Matthias Ölschlegel (Framer marketplace).
// Drives both eyes from one rAF loop and writes SVG attributes directly,
// so the component never re-renders per frame.
import { useEffect, useRef } from 'react';

const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

const BLINK_MS = 170;
const DOUBLE_BLINK_PAUSE_MS = 90;
const DOUBLE_BLINK_CHANCE = 0.28;
const WINK_MS = 420;
const WAKE_MS = 1300;
const WAKE_LOOK_DOWN_MS = 1100;

/** Tracks pointer, scroll, activity and hovered links inside the surrounding <nav>/<header>. */
const useEyeInputs = (rootRef, live) => {
  useEffect(() => {
    const s = live.current;
    s.lastActivity = performance.now();
    let lastY = window.scrollY;
    const scope = () => rootRef.current?.closest('nav, header') ?? null;

    const onMove = (e) => {
      s.pointerX = e.clientX;
      s.pointerY = e.clientY;
      s.hasPointer = true;
      s.away = false;
      s.lastActivity = performance.now();
    };
    const onOver = (e) => {
      if (e.pointerType !== 'mouse') return;
      const target = e.target instanceof Element ? e.target : null;
      const link = target?.closest('a[href], button');
      const sc = scope();
      const isNavLink = link && sc && sc.contains(link) && !rootRef.current?.contains(link);
      s.lookEl = isNavLink ? link : null;
      // Pupils dilate when looking at the call to action
      s.dilate = Boolean(isNavLink && link.closest('[data-cta]'));
    };
    const onOut = (e) => {
      if (!e.relatedTarget && e.pointerType === 'mouse') {
        s.away = true;
        s.lookEl = null;
        s.dilate = false;
      }
    };
    const onScroll = () => {
      const y = window.scrollY;
      s.scrollDelta += y - lastY;
      lastY = y;
      s.lastActivity = performance.now();
    };
    const onKey = () => {
      s.lastActivity = performance.now();
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onMove, { passive: true });
    document.addEventListener('pointerover', onOver, { passive: true });
    document.addEventListener('pointerout', onOut);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onMove);
      document.removeEventListener('pointerover', onOver);
      document.removeEventListener('pointerout', onOut);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('keydown', onKey);
    };
  }, [rootRef, live]);
};

/** Sine-shaped lid closure for a blink (optionally doubled) starting at `start`. */
const blinkFactor = (elapsed, isDouble) => {
  if (elapsed < BLINK_MS) return 1 - Math.sin((Math.PI * elapsed) / BLINK_MS) * 0.94;
  const second = elapsed - BLINK_MS - DOUBLE_BLINK_PAUSE_MS;
  if (isDouble && second >= 0) return 1 - Math.sin((Math.PI * second) / BLINK_MS) * 0.94;
  return 1;
};

/**
 * @param {object} options
 * @param {{rx: number, ry: number, pupilR: number}} options.geometry eye geometry in SVG units
 * @param {object} options.refs per-eye refs: eyes, svgs, lids (rects to resize), pupils, irises
 */
export const useFollowEyes = ({ geometry, refs, settings, isReducedMotion }) => {
  const rootRef = useRef(null);
  const live = useRef({
    pointerX: 0,
    pointerY: 0,
    hasPointer: false,
    away: false,
    lookEl: null,
    dilate: false,
    lastActivity: 0,
    scrollDelta: 0,
    winkStart: [-1, -1],
  });

  useEyeInputs(rootRef, live);

  const { rx: RX, ry: RY, pupilR } = geometry;
  const {
    followSpeed,
    blink,
    blinkEvery,
    lookAtLinks,
    lookRange,
    scrollReaction,
    squashAmount,
    sleepy,
    sleepAfter,
    wakeUp,
  } = settings;

  useEffect(() => {
    const s = live.current;
    const pos = [{ x: 0, y: 0 }, { x: 0, y: 0 }];
    let dil = 1;
    let squash = 0;
    let squashV = 0;
    let scrollV = 0;
    let scrollLook = 0;
    const mountAt = performance.now();
    const isWaking = wakeUp && !isReducedMotion;
    let open = isWaking ? 0.05 : 1;
    const every = clamp(blinkEvery, 1, 20) * 1000;
    let nextBlink = isWaking ? mountAt + 1500 : mountAt + every * (0.5 + Math.random() * 0.6);
    let blinkStart = -1;
    let isDoubleBlink = false;
    let last = performance.now();
    let raf = 0;

    const tick = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const f = dt * 60;
      const k = 1 - Math.pow(1 - clamp(followSpeed, 0.02, 0.6), f);

      const d = s.scrollDelta;
      s.scrollDelta = 0;
      scrollV += (d / Math.max(f, 0.001) - scrollV) * (1 - Math.pow(0.75, f));
      const isScrollOn = scrollReaction && !isReducedMotion;
      const lookEl = s.lookEl?.isConnected ? s.lookEl : null;
      const isIdle = sleepy && !lookEl && now - s.lastActivity > sleepAfter * 1000;
      const lr = clamp(lookRange, 0.1, 1);
      const range = (RX - pupilR - 4) * lr;
      const rangeY = (RY - pupilR * 1.05 - 4) * lr;

      const lookTarget = isScrollOn ? clamp(scrollV * 1.6, -1, 1) : 0;
      scrollLook += (lookTarget - scrollLook) * (1 - Math.pow(0.82, f));
      const squashTarget = isScrollOn
        ? clamp(Math.abs(scrollV) / 55, 0, 1) * 0.2 * clamp(squashAmount, 0, 2)
        : 0;
      squashV += (-(squash - squashTarget) * 0.22 - squashV * 0.28) * f;
      squash += squashV * f;
      dil += ((s.dilate && lookAtLinks ? 1.28 : isIdle ? 0.9 : 1) - dil) * (1 - Math.pow(0.85, f));

      const sinceMount = now - mountAt;
      if (isWaking && sinceMount < WAKE_MS) {
        // Wake up: closed, then slowly open with a sleepy ease
        const t = clamp((sinceMount - 350) / 950, 0, 1);
        open = 0.05 + 0.95 * t * t * (3 - 2 * t);
      } else {
        open += ((isIdle ? 0.34 : 1) - open) * (1 - Math.pow(isIdle ? 0.97 : 0.8, f));
      }

      let blinkF = 1;
      if (blink && !isReducedMotion && !isIdle) {
        if (blinkStart < 0 && now >= nextBlink) {
          blinkStart = now;
          isDoubleBlink = Math.random() < DOUBLE_BLINK_CHANCE;
        }
        if (blinkStart >= 0) {
          const elapsed = now - blinkStart;
          const total = isDoubleBlink ? BLINK_MS * 2 + DOUBLE_BLINK_PAUSE_MS : BLINK_MS;
          if (elapsed >= total) {
            blinkStart = -1;
            nextBlink = now + every * (0.6 + Math.random() * 0.8);
          } else {
            blinkF = blinkFactor(elapsed, isDoubleBlink);
          }
        }
      }

      let tx = s.pointerX;
      let ty = s.pointerY;
      let hasTarget = s.hasPointer && !s.away;
      if (lookEl && lookAtLinks) {
        const r = lookEl.getBoundingClientRect();
        tx = r.left + r.width / 2;
        ty = r.top + r.height / 2;
        hasTarget = true;
      }

      for (let i = 0; i < 2; i++) {
        const eye = refs.eyes[i].current;
        if (!eye) continue;

        let gx = 0;
        let gy = 0;
        if (isWaking && sinceMount < WAKE_LOOK_DOWN_MS) {
          gy = rangeY * 0.35;
        } else if (isIdle) {
          gx = Math.sin(now / 2600 + i * 0.3) * range * 0.18;
          gy = rangeY * 0.55;
        } else if (hasTarget) {
          const r = eye.getBoundingClientRect();
          const dx = tx - (r.left + r.width / 2);
          const dy = ty - (r.top + r.height / 2);
          const dist = Math.hypot(dx, dy) || 1;
          const m = 1 - Math.exp(-dist / Math.max(40, r.width * 2.4));
          gx = (dx / dist) * m * range;
          gy = (dy / dist) * m * rangeY;
        } else if (!isReducedMotion) {
          gx = Math.sin(now / 900) * range * 0.75;
          gy = Math.sin(now / 1400 + 1) * rangeY * 0.35;
        }

        if (Math.abs(scrollLook) > 0.02 && !lookEl) {
          const w = Math.min(1, Math.abs(scrollLook) * 1.4);
          gx *= 1 - w;
          gy = gy * (1 - w) + scrollLook * rangeY * w;
        }
        const len = Math.hypot(gx / range, gy / rangeY);
        if (len > 1) {
          gx /= len;
          gy /= len;
        }
        pos[i].x += (gx - pos[i].x) * k;
        pos[i].y += (gy - pos[i].y) * k;

        let winkF = 1;
        const ws = s.winkStart[i];
        if (ws >= 0) {
          const t = now - ws;
          if (t >= WINK_MS) s.winkStart[i] = -1;
          else winkF = 1 - Math.sin((Math.PI * t) / WINK_MS) * 0.95;
        }

        // Lid closes mostly from the top
        const h = 2 * RY * clamp(open * blinkF * winkF, 0.05, 1);
        const y = (-RY + (2 * RY - h) * 0.62).toFixed(2);
        const hs = h.toFixed(2);
        refs.lids[i].forEach((ref) => {
          ref.current?.setAttribute('y', y);
          ref.current?.setAttribute('height', hs);
        });
        refs.pupils[i].current?.setAttribute(
          'transform',
          `translate(${pos[i].x.toFixed(2)} ${pos[i].y.toFixed(2)})`
        );
        refs.irises[i].current?.setAttribute('r', (pupilR * dil).toFixed(2));
        const svg = refs.svgs[i].current;
        if (svg) {
          svg.style.transform = `scale(${(1 + squash * 0.45).toFixed(4)}, ${(1 - squash).toFixed(4)})`;
        }
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [
    RX, RY, pupilR, refs, isReducedMotion,
    followSpeed, blink, blinkEvery, lookAtLinks, lookRange,
    scrollReaction, squashAmount, sleepy, sleepAfter, wakeUp,
  ]);

  const wink = () => {
    const now = performance.now();
    live.current.lastActivity = now;
    live.current.winkStart[Math.random() < 0.5 ? 0 : 1] = now;
  };

  return { rootRef, wink };
};
