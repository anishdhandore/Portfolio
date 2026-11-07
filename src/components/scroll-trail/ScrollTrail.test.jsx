import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ScrollTrail from './ScrollTrail';
import { TRAIL_SECTIONS } from './trailSections';

const addSection = (id) => {
  const el = document.createElement('section');
  el.id = id;
  el.scrollIntoView = vi.fn();
  document.body.appendChild(el);
  return el;
};

describe('ScrollTrail', () => {
  afterEach(() => {
    document.querySelectorAll('section').forEach((el) => el.remove());
  });

  test('draws the dotted trail as decoration', () => {
    const { container } = render(<ScrollTrail />);

    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('aria-hidden', 'true');
    expect(container.querySelectorAll('[data-trail="dot"]').length).toBeGreaterThan(10);
  });

  test('adds a stop only for sections that exist on the page', () => {
    addSection(TRAIL_SECTIONS[0].id);

    render(<ScrollTrail />);

    expect(screen.getByRole('button', { name: `Go to ${TRAIL_SECTIONS[0].label}` })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: `Go to ${TRAIL_SECTIONS[1].label}` })).not.toBeInTheDocument();
  });

  test('clicking a stop scrolls to its section', async () => {
    const user = userEvent.setup();
    const section = addSection(TRAIL_SECTIONS[0].id);
    render(<ScrollTrail />);

    await user.click(screen.getByRole('button', { name: `Go to ${TRAIL_SECTIONS[0].label}` }));

    expect(section.scrollIntoView).toHaveBeenCalled();
  });
});
