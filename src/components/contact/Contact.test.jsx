import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Contact from './Contact';

describe('Contact', () => {
  test('is the #contact section the navbar CTA points to', () => {
    const { container } = render(<Contact />);

    expect(container.querySelector('section#contact')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Let’s build something people actually use.');
  });

  test('lists every way to get in touch', () => {
    render(<Contact />);

    expect(screen.getByRole('link', { name: /^email:/i })).toHaveAttribute('href', 'mailto:anish.dhandore@gmail.com');
    expect(screen.getByRole('link', { name: /^linkedin:/i })).toHaveAttribute('href', expect.stringContaining('linkedin.com'));
    expect(screen.getByRole('link', { name: /^github:/i })).toHaveAttribute('href', expect.stringContaining('github.com'));
    expect(screen.queryByRole('link', { name: /résumé|cv/i })).not.toBeInTheDocument();
  });

  test('external links open safely in a new tab', () => {
    render(<Contact />);

    ['linkedin', 'github'].forEach((name) => {
      const link = screen.getByRole('link', { name: new RegExp(`^${name}:`, 'i') });
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'));
    });
  });

  test('copies the email address', async () => {
    const user = userEvent.setup();
    const writeText = vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue();
    render(<Contact />);

    await user.click(screen.getByRole('button', { name: /copy email/i }));

    expect(writeText).toHaveBeenCalledWith('anish.dhandore@gmail.com');
  });

  test('footer shows the year and a way back to the top', () => {
    render(<Contact />);

    expect(screen.getByText(`© ${new Date().getFullYear()} Anish Dhandore`)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /back to top/i })).toHaveAttribute('href', '/#home');
  });
});
