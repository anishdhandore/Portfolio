import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Navbar from './Navbar';
import { NAV_CTA, NAV_LINKS } from './navContent';

describe('Navbar', () => {
  test('renders a labelled main navigation with every link and the CTA', () => {
    render(<Navbar />);

    const nav = screen.getByRole('navigation', { name: /main/i });
    NAV_LINKS.forEach(({ label, href }) => {
      expect(within(nav).getByRole('link', { name: label })).toHaveAttribute('href', href);
    });
    expect(within(nav).getByRole('link', { name: NAV_CTA.label })).toHaveAttribute('href', NAV_CTA.href);
  });

  test('the eyes act as the home link', () => {
    render(<Navbar />);

    const home = screen.getByRole('link', { name: /anish dhandore/i });
    expect(home).toHaveAttribute('href', '/#home');
    expect(home.querySelector('[data-eyes]')).toBeInTheDocument();
  });

  test('hides the decorative eyes from assistive tech', () => {
    const { container } = render(<Navbar />);

    expect(container.querySelector('[data-eyes]')).toHaveAttribute('aria-hidden', 'true');
  });

  test('menu button opens and closes the mobile drawer', async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    const toggle = screen.getByRole('button', { name: /open menu/i });

    await user.click(toggle);

    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('button', { name: /close menu/i })).toBe(toggle);
    expect(document.getElementById('nav-drawer')).toBeInTheDocument();

    await user.click(toggle);

    expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });

  test('Escape closes the open drawer', async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    const toggle = screen.getByRole('button', { name: /open menu/i });
    await user.click(toggle);

    await user.keyboard('{Escape}');

    expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });

  test('choosing a drawer link closes the drawer', async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    const toggle = screen.getByRole('button', { name: /open menu/i });
    await user.click(toggle);

    const drawer = document.getElementById('nav-drawer');
    await user.click(within(drawer).getByRole('link', { name: NAV_LINKS[0].label }));

    expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });
});
