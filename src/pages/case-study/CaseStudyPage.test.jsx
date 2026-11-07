import { render, screen, within } from '@testing-library/react';
import CaseStudyPage from './CaseStudyPage';
import { CASE_STUDIES, nextCaseStudy } from './caseStudies';
import { PROJECTS } from '../../components/deck/projects';

describe('case study content', () => {
  test('every card in the deck has a case study', () => {
    PROJECTS.forEach(({ slug }) => {
      expect(CASE_STUDIES.find((c) => c.slug === slug)).toBeDefined();
    });
  });

  test('next project wraps around to the first', () => {
    const last = CASE_STUDIES[CASE_STUDIES.length - 1];
    expect(nextCaseStudy(last.slug)).toBe(CASE_STUDIES[0]);
  });
});

describe('CaseStudyPage', () => {
  test.each(CASE_STUDIES.map((c) => [c.slug, c]))('%s shows the story of the work', (slug, study) => {
    render(<CaseStudyPage slug={slug} />);

    expect(screen.getByRole('heading', { level: 1, name: study.name })).toBeInTheDocument();
    expect(screen.getByText(study.outcome)).toBeInTheDocument();
    study.meta.forEach(({ label, value }) => {
      expect(screen.getByText(label)).toBeInTheDocument();
      expect(screen.getAllByText(value).length).toBeGreaterThan(0);
    });
    ['The problem', 'What I built', 'How it works', 'Results', 'What I learned'].forEach((title) => {
      expect(screen.getByRole('heading', { level: 2, name: title })).toBeInTheDocument();
    });
    study.built.forEach(({ title }) => expect(screen.getByRole('heading', { level: 3, name: title })).toBeInTheDocument());
  });

  test('shows the project on desktop, tablet and phone', () => {
    const [study] = CASE_STUDIES;
    render(<CaseStudyPage slug={study.slug} />);

    const hero = screen.getByRole('region', { name: `${study.name} on desktop, tablet and phone` });
    expect(within(hero).getAllByRole('img')).toHaveLength(3);
  });

  test('external links open safely in a new tab', () => {
    const [study] = CASE_STUDIES;
    render(<CaseStudyPage slug={study.slug} />);

    study.links.forEach(({ label, href }) => {
      const link = screen.getByRole('link', { name: label });
      expect(link).toHaveAttribute('href', href);
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'));
    });
  });

  test('links back to all work and on to the next project', () => {
    const [study] = CASE_STUDIES;
    render(<CaseStudyPage slug={study.slug} />);

    expect(screen.getByRole('link', { name: /all work/i })).toHaveAttribute('href', '/#projects');
    const next = nextCaseStudy(study.slug);
    expect(screen.getByRole('link', { name: `Next project: ${next.name}` })).toHaveAttribute('href', `/work/${next.slug}`);
  });

  test('sets the document title', () => {
    const [study] = CASE_STUDIES;
    render(<CaseStudyPage slug={study.slug} />);

    expect(document.title).toBe(`${study.name} · Anish Dhandore`);
  });

  test('handles an unknown project', () => {
    render(<CaseStudyPage slug="nope" />);

    expect(screen.getByRole('heading', { level: 1, name: /not found/i })).toBeInTheDocument();
  });
});
