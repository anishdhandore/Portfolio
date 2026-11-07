import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { formatLocalTime } from '../../lib/formatLocalTime';
import { AVAILABILITY, TIME_ZONE } from './heroContent';

const TICK_MS = 15_000;

export const useLocalTime = (timeZone) => {
  const [time, setTime] = useState(() => formatLocalTime(new Date(), timeZone));

  useEffect(() => {
    const id = setInterval(() => setTime(formatLocalTime(new Date(), timeZone)), TICK_MS);
    return () => clearInterval(id);
  }, [timeZone]);

  return time;
};

const StatusBar = () => {
  const time = useLocalTime(TIME_ZONE);

  return (
    <Bar>
      <Item>
        <Label>Local time</Label>
        <time>{time}</time>
      </Item>
      <Item>
        <LiveDot aria-hidden="true" />
        {AVAILABILITY}
      </Item>
    </Bar>
  );
};

const Bar = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  font-size: var(--text-sm);
  color: var(--color-ink);
`;

const Item = styled.p`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-variant-numeric: tabular-nums;
`;

const Label = styled.span`
  color: var(--color-ink-soft);
`;

const LiveDot = styled.span`
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
    animation: live-pulse 2.4s var(--ease-out-expo) infinite;
  }

  @keyframes live-pulse {
    0% { transform: scale(1); opacity: 0.6; }
    70%, 100% { transform: scale(2.6); opacity: 0; }
  }

  @media (prefers-reduced-motion: reduce) {
    &::after { animation: none; }
  }
`;

export default StatusBar;
