import { act, render, screen } from '@testing-library/react';
import { matchCaseStudy, navigate, useRoute } from './router';

const Probe = () => {
  const { pathname } = useRoute();
  return <p>path:{pathname}</p>;
};

describe('matchCaseStudy', () => {
  test('extracts the slug from a case study path', () => {
    expect(matchCaseStudy('/work/dance-ai')).toBe('dance-ai');
    expect(matchCaseStudy('/work/dance-ai/')).toBe('dance-ai');
  });

  test('returns null for any other path', () => {
    expect(matchCaseStudy('/')).toBeNull();
    expect(matchCaseStudy('/work/')).toBeNull();
    expect(matchCaseStudy('/about')).toBeNull();
  });
});

describe('navigate', () => {
  afterEach(() => window.history.replaceState(null, '', '/'));

  test('pushes the path and updates subscribed components', () => {
    render(<Probe />);
    expect(screen.getByText('path:/')).toBeInTheDocument();

    act(() => navigate('/work/safe-space'));

    expect(window.location.pathname).toBe('/work/safe-space');
    expect(screen.getByText('path:/work/safe-space')).toBeInTheDocument();
  });

  test('follows browser back/forward', () => {
    render(<Probe />);
    act(() => navigate('/work/safe-space'));

    act(() => {
      window.history.replaceState(null, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));
    });

    expect(screen.getByText('path:/')).toBeInTheDocument();
  });
});
