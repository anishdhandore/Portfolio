import heroShot from '../../images/bridged/hero.jpg';
import jobsShot from '../../images/bridged/jobs.jpg';
import athletesShot from '../../images/bridged/athletes.jpg';
import earningsShot from '../../images/bridged/earnings.jpg';
import partnersShot from '../../images/bridged/partners.jpg';

export const BRIDGED = {
  name: 'Bridged',
  url: 'https://www.bridgedplatform.com',
  urlLabel: 'bridgedplatform.com',
  summary:
    'A career marketplace that connects college athletes with companies hiring for internships, jobs and brand partnerships.',
  // TODO(anish): fill these in; rows with a null value are not shown
  role: null,
  timeline: null,
};

/**
 * One shot per screen, in scroll order. `focus` is the card that lifts off the
 * screen, as fractions of the 1180×820 capture (x, y = top-left corner).
 * `word` is the oversized title behind the tablet.
 */
export const CHAPTERS = [
  {
    title: 'Two-sided marketplace',
    body: 'Athletes get paid work. Companies get disciplined, coachable hires.',
    word: 'Bridged',
    screen: heroShot,
    alt: 'Bridged home page with athlete earnings cards',
    focus: { x: 0.59, y: 0.32, w: 0.405, h: 0.47 },
  },
  {
    title: 'Opportunity board',
    body: 'Companies post paid internships, jobs and projects with clear stipends and workload.',
    word: 'Jobs',
    screen: jobsShot,
    alt: 'Bridged opportunity board listing paid internships and jobs',
    focus: { x: 0.0275, y: 0.217, w: 0.3055, h: 0.282 },
  },
  {
    title: 'Verified athlete profiles',
    body: 'Every athlete is verified and searchable by sport, major, region and availability.',
    word: 'Athletes',
    screen: athletesShot,
    alt: 'Bridged athlete directory with verified athlete cards',
    focus: { x: 0.0275, y: 0.09, w: 0.3055, h: 0.463 },
  },
  {
    title: 'Real earnings',
    body: 'Athletes track their deals and get paid out automatically through Stripe.',
    word: 'Earnings',
    screen: earningsShot,
    alt: 'Bridged success story showing an athlete’s total earnings',
    focus: { x: 0.225, y: 0.655, w: 0.25, h: 0.19 },
  },
  {
    title: 'Partner network',
    body: '29 companies across 12 industries are hiring athletes on Bridged.',
    word: 'Partners',
    screen: partnersShot,
    alt: 'Bridged partners page: 29 companies, 12 industries, 29 hiring now',
    focus: { x: 0.0275, y: 0.617, w: 0.65, h: 0.158 },
  },
];
