// A precise circular ruler that turns with the scroll: a labelled tick for every
// month, longer ticks each quarter and bold year ticks each January. The month
// under the pointer (3 o'clock) is `month`; the wheel rests on each role's start.
import React from 'react';
import styled from 'styled-components';
import { motion, useTransform } from 'motion/react';

export const DEG_PER_MONTH = 2.4;
const RIM_INSET = 4; // ticks hang just inside the rim
const TICK = { month: 6, quarter: 10, year: 16 };
const LABEL_GAP = 9;
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const toRad = (deg) => (deg * Math.PI) / 180;
const polar = (radius, deg) => ({ x: radius * Math.cos(toRad(deg)), y: radius * Math.sin(toRad(deg)) });

const arcPath = (radius, fromDeg, toDeg) => {
  const a = polar(radius, fromDeg);
  const b = polar(radius, toDeg);
  const large = Math.abs(toDeg - fromDeg) > 180 ? 1 : 0;
  const sweep = toDeg > fromDeg ? 1 : 0;
  return `M ${a.x.toFixed(2)} ${a.y.toFixed(2)} A ${radius} ${radius} 0 ${large} ${sweep} ${b.x.toFixed(2)} ${b.y.toFixed(2)}`;
};


/**
 * @param {{ scale: ReturnType<import('./scale').buildScale>, month: import('motion/react').MotionValue<number>, radius: number }} props
 */
const ExperienceWheel = ({ scale, month, radius }) => {
  const { ticks, totalMonths } = scale;
  // rotated with CSS about the box centre (= the wheel centre)
  const rotate = useTransform(month, (c) => c * DEG_PER_MONTH);
  const fill = useTransform(month, (c) => (totalMonths ? Math.min(1, Math.max(0, c / totalMonths)) : 0));
  const endDeg = -totalMonths * DEG_PER_MONTH;
  const tickOuter = radius - RIM_INSET;
  const labelRadius = tickOuter - TICK.year - LABEL_GAP;

  return (
    <Wheel style={{ '--r': `${radius}px` }}>
      <motion.svg
        viewBox={`${-radius} ${-radius} ${radius * 2} ${radius * 2}`}
        width={radius * 2}
        height={radius * 2}
        aria-hidden="true"
        style={{ rotate }}
      >
        {/* one rim, and the elapsed-time fill along it */}
        <circle r={radius} fill="none" stroke="var(--wheel-line)" strokeWidth="1" />
        <motion.path
          d={arcPath(radius, 0, endDeg)}
          fill="none"
          stroke="var(--color-ink)"
          strokeWidth="2"
          strokeLinecap="round"
          style={{ pathLength: fill }}
        />

        {ticks.map(({ m, year, month: monthOfYear }) => {
          const deg = -m * DEG_PER_MONTH;
          const kind = year ? 'year' : monthOfYear % 3 === 0 ? 'quarter' : 'month';
          const a = polar(tickOuter, deg);
          const b = polar(tickOuter - TICK[kind], deg);
          const label = polar(labelRadius, deg);
          return (
            <g key={m}>
              <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} className={`tick ${kind}`} />
              {/* every month is labelled; January shows the year, the last tick says NOW */}
              <text
                x={label.x}
                y={label.y}
                transform={`rotate(${deg} ${label.x} ${label.y})`}
                textAnchor="end"
                dominantBaseline="middle"
                className={m === totalMonths ? 'now' : year ? 'year' : 'month'}
              >
                {m === totalMonths ? 'NOW' : year ?? MONTHS[monthOfYear]}
              </text>
            </g>
          );
        })}

      </motion.svg>

      {/* fixed pointer at 3 o'clock */}
      <Pointer aria-hidden="true" />

    </Wheel>
  );
};

const Wheel = styled.div`
  position: absolute;
  /* the wheel's centre sits off-screen left; its rim passes through --rim-x */
  left: calc(var(--rim-x) - var(--r) * 2);
  top: calc(50% - var(--r));
  width: calc(var(--r) * 2);
  height: calc(var(--r) * 2);
  --wheel-line: #cfcfcf;

  svg {
    position: absolute;
    inset: 0;
    overflow: visible;
  }

  .tick {
    stroke-linecap: round;
  }

  .tick.month {
    stroke: #c9c9c9;
    stroke-width: 0.75;
  }

  .tick.quarter {
    stroke: #9a9a9a;
    stroke-width: 1;
  }

  .tick.year {
    stroke: var(--color-ink);
    stroke-width: 1.25;
  }

  .year,
  .month,
  .now {
    font-family: var(--font-body);
    font-variant-numeric: tabular-nums;
  }

  .month {
    font-size: 8.5px;
    font-weight: 500;
    letter-spacing: 0.04em;
    fill: #a3a3a3;
  }

  .year {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.04em;
    fill: var(--color-ink);
  }

  .now {
    font-size: 11px;
  }

  .now {
    fill: var(--color-live);
    font-weight: 600;
  }
`;

const Pointer = styled.span`
  position: absolute;
  left: 100%;
  top: 50%;
  width: 18px;
  height: 1px;
  margin-left: 30px;
  background: var(--color-ink);
  transform: translateY(-50%);

  &::before {
    content: '';
    position: absolute;
    left: -6px;
    top: 50%;
    border: 4px solid transparent;
    border-right: 6px solid var(--color-ink);
    transform: translate(-50%, -50%);
  }
`;


export default ExperienceWheel;
