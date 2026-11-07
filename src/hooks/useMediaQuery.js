import { useEffect, useState } from 'react';

const getMatch = (query) => typeof window !== 'undefined' && window.matchMedia(query).matches;

/** Live boolean for a CSS media query. */
export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(() => getMatch(query));

  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, [query]);

  return matches;
};
