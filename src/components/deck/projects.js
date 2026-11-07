import danceScreen from '../../images/projects/dance-ai-mobile-1.webp';
import soccerScreen from '../../images/projects/soccer-mobile-1.webp';
import pawsScreen from '../../images/projects/paws-mobile-1.webp';
import safeScreen from '../../images/projects/safe-space-mobile-1.webp';
import artisticScreen from '../../images/projects/artistic-mobile-1.webp';

/**
 * A royal flush of spades, best card first.
 * - `screen`: one designed screen of the product (sources in docs/card-mockups), filling the card
 * - `hook`: one line revealed on hover, written to make people want to open it
 * - `summary`: the longer description, kept for the click view
 * Facts come from each project's README, Devpost page and notebook.
 */
export const PROJECTS = [
  {
    rank: 'A',
    slug: 'dance-ai',
    name: 'Dance AI',
    year: '2025',
    hook: 'Type how you feel. A 3D dancer moves to match it.',
    summary:
      'Reads the emotion in any sentence with a fine-tuned RoBERTa model (86.6% accuracy) and an SVR intensity model, then animates a 3D character to dance it out in real time.',
    award: 'Winner · World’s Largest Hackathon',
    tech: ['React', 'Three.js', 'RoBERTa', 'Flask'],
    screen: danceScreen,
    links: [{ label: 'GitHub', href: 'https://github.com/anishdhandore/Dance_AI_Cleanup' }],
  },
  {
    rank: 'K',
    slug: 'soccer-predictions',
    name: 'Soccer Match Predictions',
    year: '2022',
    hook: 'Two decades of Premier League results, one question: who dominates next?',
    summary:
      'Explores Premier League match data since 2000 and models which clubs are most likely to dominate upcoming seasons from their win/loss history.',
    award: null,
    tech: ['Python', 'Pandas', 'scikit-learn', 'Seaborn'],
    screen: soccerScreen,
    links: [
      {
        label: 'Notebook',
        href: 'https://colab.research.google.com/drive/1xT5S3eeZPcjfPexal9m9Z2PjLedSJ0wA?usp=sharing',
      },
    ],
  },
  {
    rank: 'Q',
    slug: 'preserving-paws',
    name: 'Preserving Paws',
    year: '2021',
    hook: 'Look up any breed, find a shelter nearby, or report a dog in danger.',
    summary:
      'A solo-built Django app: a breed encyclopedia scraped with Beautiful Soup and Wolfram Alpha, shelter search through the Petfinder API, and abuse reports routed to the nearest World Animal Protection office.',
    award: 'Best Community Project · ST Hacks 2021',
    tech: ['Django', 'Petfinder API', 'Beautiful Soup', 'SQLite'],
    screen: pawsScreen,
    links: [
      { label: 'GitHub', href: 'https://github.com/anishdhandore/ST-Hacks-2021' },
      { label: 'Demo', href: 'https://www.youtube.com/watch?v=HzcST4-HYKE' },
    ],
  },
  {
    rank: 'J',
    slug: 'safe-space',
    name: 'Safe Space',
    year: '2020',
    hook: 'Paste any link and find out if it’s safe for kids.',
    summary:
      'Scrapes a webpage, counts any profanity it finds and tells you whether it’s suitable for children, caching every verdict in MongoDB so repeat checks are instant.',
    award: null,
    tech: ['Flask', 'Beautiful Soup', 'MongoDB'],
    screen: safeScreen,
    links: [{ label: 'GitHub', href: 'https://github.com/kylejava/CatHacks-Winter-Edition-2020' }],
  },
  {
    rank: '10',
    slug: 'our-artistic-space',
    name: 'Our Artistic Space',
    year: '2020',
    hook: 'Every museum, gallery and art store near you, in one search.',
    summary:
      'Finds local art museums, galleries, schools and supply stores for any city through the Yelp API, with directions one tap away. Deployed on Google App Engine.',
    award: 'Best Beginner Hack · Hacks and Crafts 2020',
    tech: ['Flask', 'Yelp API', 'Google App Engine'],
    screen: artisticScreen,
    links: [{ label: 'GitHub', href: 'https://github.com/anishdhandore/HacksAndCrafts2020' }],
  },
];
