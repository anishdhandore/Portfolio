import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Hero from './Hero';
import { EMAIL, HEADLINE } from './heroContent';

const fullHeadline = HEADLINE.map((part) => part.text).join(' ');

describe('Hero', () => {
  test('renders the full headline as the page h1', () => {
    render(<Hero />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(fullHeadline);
  });

  test('shows local time and availability in the status bar', () => {
    render(<Hero />);

    expect(screen.getByText(/local time/i)).toBeInTheDocument();
    expect(screen.getByText(/open to/i)).toBeInTheDocument();
  });

  test('reserves an image slot with a placeholder when no photo is set', () => {
    render(<Hero />);

    expect(screen.getByRole('img', { name: /portrait placeholder/i })).toBeInTheDocument();
  });

  test('renders the photo instead of the placeholder when one is provided', () => {
    render(<Hero imageSrc="/me.jpg" imageAlt="Anish at his desk" />);

    expect(screen.getByRole('img', { name: 'Anish at his desk' })).toHaveAttribute('src', '/me.jpg');
    expect(screen.queryByRole('img', { name: /portrait placeholder/i })).not.toBeInTheDocument();
  });

  test('copies the email and confirms it', async () => {
    const user = userEvent.setup();
    const writeText = vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue();
    render(<Hero />);

    await user.click(screen.getByRole('button', { name: /copy email/i }));

    expect(writeText).toHaveBeenCalledWith(EMAIL);
    expect(await screen.findByText(/email copied/i)).toBeInTheDocument();
  });

  test('links to LinkedIn, GitHub and the CV', () => {
    render(<Hero />);

    expect(screen.getByRole('link', { name: /linkedin/i })).toHaveAttribute('href', expect.stringContaining('linkedin.com'));
    expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute('href', expect.stringContaining('github.com'));
    expect(screen.getByRole('link', { name: /cv/i })).toHaveAttribute('href', expect.stringMatching(/\.pdf$/));
  });

});

describe('Hero with a frame sequence', () => {
  test('shows the starting pose while the intro plays on a canvas', () => {
    const { container } = render(
      <Hero imageSrc="/rest.jpg" imageAlt="Anish thinking" endImageSrc="/point.jpg" imageFrames={['/f0.webp', '/f1.webp']} />
    );

    expect(container.querySelector('figure')).toHaveAttribute('data-pose', 'intro');
    expect(screen.getByRole('img', { name: 'Anish thinking' })).toHaveAttribute('src', '/rest.jpg');
    expect(container.querySelector('canvas')).toHaveAttribute('aria-hidden', 'true');
  });
});
