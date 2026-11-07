import { render, screen, within } from '@testing-library/react';
import Experience from './Experience';
import { ROLES } from './experienceData';

const NOW = new Date(2026, 10, 6);

describe('Experience', () => {
  test('is a labelled section anchored at #experience', () => {
    const { container } = render(<Experience now={NOW} />);

    expect(container.querySelector('section#experience')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Experience' })).toBeInTheDocument();
  });

  test('starts on the earliest role', () => {
    render(<Experience now={NOW} />);
    const [first] = ROLES;

    const article = screen.getByRole('article');
    expect(within(article).getByRole('heading', { level: 3, name: first.role })).toBeInTheDocument();
    expect(within(article).getByText(first.company)).toBeInTheDocument();
    first.tags.forEach((t) => expect(within(article).getByText(t)).toBeInTheDocument());
  });

  test('lists every role for assistive tech', () => {
    render(<Experience now={NOW} />);

    ROLES.forEach(({ role, company }) => {
      expect(screen.getByText(new RegExp(`${role}, ${company}`))).toBeInTheDocument();
    });
  });

  test('labels every month on the wheel, with the year each January', () => {
    const { container } = render(<Experience now={NOW} />);

    expect(container.querySelectorAll('svg text.year')).toHaveLength(5); // 2022–2026
    expect(container.querySelectorAll('svg text.month').length).toBeGreaterThan(50);
    expect(container.querySelector('svg text.now')).toHaveTextContent('NOW');
  });
});
