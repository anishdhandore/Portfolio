import { fireEvent, render, screen, within } from '@testing-library/react';
import ProjectDeck from './ProjectDeck';
import { CardFront } from './CardFaces';
import { PROJECTS } from './projects';

const [first] = PROJECTS;

describe('ProjectDeck', () => {
  test('is a labelled section anchored at #projects', () => {
    const { container } = render(<ProjectDeck />);

    expect(container.querySelector('section#projects')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });

  test('renders one card per project, each named by its heading', () => {
    render(<ProjectDeck />);

    PROJECTS.forEach(({ name }) => {
      expect(screen.getByRole('article', { name })).toBeInTheDocument();
    });
  });

  test('card backs are decorative', () => {
    const { container } = render(<ProjectDeck />);

    const backs = container.querySelectorAll('[data-card-back]');
    expect(backs).toHaveLength(PROJECTS.length);
    backs.forEach((back) => expect(back).toHaveAttribute('aria-hidden', 'true'));
  });

  test('each card is filled by a single screen of the project', () => {
    render(<ProjectDeck />);

    PROJECTS.forEach(({ name, screen: shot }) => {
      const images = screen.getByRole('article', { name }).querySelectorAll('img');
      expect(images).toHaveLength(1);
      expect(images[0]).toHaveAttribute('src', shot);
    });
  });

  test('shows name and year on the face, with the teaser ready to unfold', () => {
    render(<ProjectDeck />);

    PROJECTS.forEach(({ name, year, hook }) => {
      const card = within(screen.getByRole('article', { name }));
      expect(card.getByRole('heading', { level: 3, name })).toBeInTheDocument();
      expect(card.getByText(year)).toBeInTheDocument();
      expect(card.getByText(hook)).toBeInTheDocument();
    });
  });

  test('marks prize winners on their card', () => {
    render(<ProjectDeck />);

    PROJECTS.filter((p) => p.award).forEach(({ name, award }) => {
      const card = within(screen.getByRole('article', { name }));
      expect(card.getByText('★ Winner')).toBeInTheDocument();
      expect(card.getByText(award.replace(/^Winner · /, ''))).toBeInTheDocument();
    });
  });

  test('each card links to its case study, but only once the hand is dealt', () => {
    render(<ProjectDeck />);

    PROJECTS.forEach(({ name, slug }) => {
      const link = screen.getByRole('link', { name: `${name}: view case study` });
      expect(link).toHaveAttribute('href', `/work/${slug}`);
      expect(link).toHaveAttribute('tabindex', '-1');
    });
    const card = screen.getByRole('article', { name: first.name });
    fireEvent.focus(card);
    expect(card).toHaveAttribute('data-active', 'false');
  });
});

describe('CardFront', () => {
  test('unfolds the teaser only while picked', () => {
    const { rerender } = render(<CardFront project={first} headingId="h" isActive={false} />);
    const card = screen.getByRole('article', { name: first.name });
    expect(card).toHaveAttribute('data-active', 'false');

    rerender(<CardFront project={first} headingId="h" isActive />);

    expect(card).toHaveAttribute('data-active', 'true');
  });
});
