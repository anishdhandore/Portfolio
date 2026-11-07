import { render, screen } from '@testing-library/react';
import BridgedShowcase from './BridgedShowcase';
import { BRIDGED, CHAPTERS } from './bridgedContent';

describe('BridgedShowcase', () => {
  test('is a labelled section anchored at #work', () => {
    const { container } = render(<BridgedShowcase />);

    expect(container.querySelector('section#work')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: BRIDGED.name })).toBeInTheDocument();
  });

  test('shows every Bridged screen on the tablet with alt text', () => {
    render(<BridgedShowcase />);

    CHAPTERS.forEach(({ alt }) => {
      expect(screen.getByRole('img', { name: alt })).toBeInTheDocument();
    });
  });

  test('lists every chapter and marks the first one as current', () => {
    render(<BridgedShowcase />);

    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(CHAPTERS.length);
    expect(items[0]).toHaveAttribute('aria-current', 'step');
    expect(items[1]).not.toHaveAttribute('aria-current');
  });

  test('links out to the live site in a new tab', () => {
    render(<BridgedShowcase />);

    const link = screen.getByRole('link', { name: /bridgedplatform\.com/i });
    expect(link).toHaveAttribute('href', BRIDGED.url);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'));
  });

  test('hides role and timeline rows until they are filled in', () => {
    render(<BridgedShowcase />);

    if (!BRIDGED.role) expect(screen.queryByText('Role')).not.toBeInTheDocument();
    if (!BRIDGED.timeline) expect(screen.queryByText('Timeline')).not.toBeInTheDocument();
  });
});
