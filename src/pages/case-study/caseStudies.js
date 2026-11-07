// Case study content, one entry per project card (same order as the deck).
// Facts come from each project's README, Devpost page and notebook.
// TODO(anish): confirm anything marked "unverified" below.
import danceFront from '../../images/projects/dance-ai-front.webp';
import danceBack from '../../images/projects/dance-ai-back.webp';
import danceM1 from '../../images/projects/dance-ai-mobile-1.webp';
import danceM2 from '../../images/projects/dance-ai-mobile-2.webp';
import soccerFront from '../../images/projects/soccer-front.webp';
import soccerBack from '../../images/projects/soccer-back.webp';
import soccerM1 from '../../images/projects/soccer-mobile-1.webp';
import soccerM2 from '../../images/projects/soccer-mobile-2.webp';
import pawsFront from '../../images/projects/paws-front.webp';
import pawsBack from '../../images/projects/paws-back.webp';
import pawsM1 from '../../images/projects/paws-mobile-1.webp';
import pawsM2 from '../../images/projects/paws-mobile-2.webp';
import safeFront from '../../images/projects/safe-space-front.webp';
import safeBack from '../../images/projects/safe-space-back.webp';
import safeM1 from '../../images/projects/safe-space-mobile-1.webp';
import safeM2 from '../../images/projects/safe-space-mobile-2.webp';
import artFront from '../../images/projects/artistic-front.webp';
import artBack from '../../images/projects/artistic-back.webp';
import artM1 from '../../images/projects/artistic-mobile-1.webp';
import artM2 from '../../images/projects/artistic-mobile-2.webp';

/**
 * @typedef {object} CaseStudy
 * @property {string} slug
 * @property {string} name
 * @property {string} outcome    one sentence, what it does for people
 * @property {{label: string, value: string}[]} meta   role, team, timeline, award…
 * @property {{label: string, href: string}[]} links
 * @property {string} accent     brand colour used for tints on the page
 * @property {{desktop: string, desktopAlt: string, tablet: string, phones: [string, string], label: string}} screens
 * @property {string} problem
 * @property {{title: string, body: string}[]} built   my contributions
 * @property {{label: string, detail: string}[]} flow  how the system fits together
 * @property {{value: string, label: string}[]} results
 * @property {string} learned
 */

/** @type {CaseStudy[]} */
export const CASE_STUDIES = [
  {
    slug: 'dance-ai',
    name: 'Dance AI',
    outcome: 'Type how you feel, and a 3D character dances it out in real time.',
    meta: [
      { label: 'Role', value: 'ML engineer & full-stack developer' }, // unverified
      { label: 'Timeline', value: '2025' },
      { label: 'Award', value: 'Winner, World’s Largest Hackathon' },
      { label: 'Stack', value: 'React, Three.js, Flask, RoBERTa, SVR' },
    ],
    links: [{ label: 'GitHub', href: 'https://github.com/anishdhandore/Dance_AI_Cleanup' }],
    accent: '#7C5CFF',
    screens: {
      label: 'Dance AI',
      desktop: danceFront,
      desktopAlt: danceBack,
      tablet: danceFront,
      phones: [danceM1, danceM2],
    },
    problem:
      'Most text tools stop at a label: “positive”, “negative”. I wanted emotion to become something you can see, so a sentence like “I just got the job!” turns into movement with the right energy, not just a tag.',
    built: [
      {
        title: 'Fine-tuned the emotion model',
        body: 'Trained a multi-label RoBERTa classifier (roberta-base, 125M parameters) on GoEmotions, grouped into 6 macro emotions. It reaches 86.6% accuracy with a Hamming loss of 0.134.',
      },
      {
        title: 'Predicted how strongly you feel it',
        body: 'Added an SVR model that scores emotion intensity (MAE 0.155), so a mild “that’s nice” and an all-caps “I WON” move the dancer differently.',
      },
      {
        title: 'Built the inference API',
        body: 'A Flask API loads both models straight from the Hugging Face Hub at startup, so nothing heavy ships with the code, and serves predictions to the front end.',
      },
      {
        title: 'Made the 3D stage',
        body: 'React with React Three Fiber renders the character and maps each detected emotion to a dance, with every user getting their own isolated session.',
      },
    ],
    flow: [
      { label: 'Prompt', detail: 'React front end' },
      { label: 'Flask API', detail: 'Hosted on Render' },
      { label: 'RoBERTa + SVR', detail: 'Loaded from Hugging Face' },
      { label: '3D dance', detail: 'React Three Fiber' },
    ],
    results: [
      { value: '86.6%', label: 'Emotion accuracy' },
      { value: '6', label: 'Emotions recognised' },
      { value: '~1.5 h', label: 'Total training time' },
      { value: '1st', label: 'World’s Largest Hackathon' },
    ],
    learned:
      'Shipping a model is a different job from training one. Keeping the models on Hugging Face and loading them at runtime kept deploys small and let the front end and API live on separate hosts.',
  },
  {
    slug: 'soccer-predictions',
    name: 'Soccer Match Predictions',
    outcome: 'Two decades of Premier League results, turned into a forecast of who dominates next.',
    meta: [
      { label: 'Role', value: 'Data scientist' }, // unverified
      { label: 'Timeline', value: '2022' },
      { label: 'Type', value: 'Data science project' },
      { label: 'Stack', value: 'Python, Pandas, scikit-learn, Seaborn' },
    ],
    links: [
      {
        label: 'Notebook',
        href: 'https://colab.research.google.com/drive/1xT5S3eeZPcjfPexal9m9Z2PjLedSJ0wA?usp=sharing',
      },
    ],
    accent: '#8DB516',
    screens: {
      label: 'Matchday',
      desktop: soccerFront,
      desktopAlt: soccerBack,
      tablet: soccerFront,
      phones: [soccerM1, soccerM2],
    },
    problem:
      'Pundits argue about which clubs are on the rise, but rarely with numbers. I set out to answer two questions from the data: which clubs have been the best and worst so far, and which will improve the most next.',
    built: [
      {
        title: 'Cleaned the match history',
        body: 'Loaded and inspected a Premier League dataset going back to the 2000/01 season, then encoded clubs and results so they could be modelled.',
      },
      {
        title: 'Measured every club',
        body: 'Counted matches won and lost for every club, home and away, and derived a win ratio. Chelsea leads with 411 wins and a 1.53 ratio; Liverpool follows at 1.42.',
      },
      {
        title: 'Modelled future form',
        body: 'Split each club’s history into a first and second half to measure improvement, then fit a linear regression (MAE 31.97, RMSE 39.72 on a held-out test set).',
      },
      {
        title: 'Picked the model that held up',
        body: 'Tried logistic regression too, but it overfit the small dataset, so I kept the simpler linear model and explained the trade-off.',
      },
    ],
    flow: [
      { label: 'Match data', detail: 'Premier League since 2000' },
      { label: 'Pandas', detail: 'Wins, losses, ratios' },
      { label: 'scikit-learn', detail: 'Linear regression' },
      { label: 'Forecast', detail: 'Seaborn charts' },
    ],
    results: [
      { value: '1.53', label: 'Top win ratio (Chelsea)' },
      { value: '411', label: 'Most matches won' },
      { value: '31.97', label: 'Test MAE' },
      { value: '44', label: 'Clubs analysed' },
    ],
    learned:
      'A more complex model isn’t automatically better. With 44 clubs, the honest answer came from a simple model, clear charts and a careful train/test split.',
  },
  {
    slug: 'preserving-paws',
    name: 'Preserving Paws',
    outcome: 'Look up any breed, find a shelter nearby, or report a dog in danger.',
    meta: [
      { label: 'Role', value: 'Solo: design, back end, data and automation' },
      { label: 'Timeline', value: 'Jan 2021, one weekend' },
      { label: 'Award', value: 'Best Community Project, ST Hacks 2021' },
      { label: 'Stack', value: 'Django, Petfinder API, Wolfram Alpha, SQLite' },
    ],
    links: [
      { label: 'GitHub', href: 'https://github.com/anishdhandore/ST-Hacks-2021' },
      { label: 'Demo video', href: 'https://www.youtube.com/watch?v=HzcST4-HYKE' },
      { label: 'Devpost', href: 'https://devpost.com/software/preserving-paws' },
    ],
    accent: '#F5B800',
    screens: {
      label: 'Preserving Paws',
      desktop: pawsFront,
      desktopAlt: pawsBack,
      tablet: pawsFront,
      phones: [pawsM1, pawsM2],
    },
    problem:
      'People who want to help dogs hit three walls: they don’t know which breed fits them, they can’t find shelters nearby, and when they see abuse they don’t know who to tell. I wanted one place that handles all three.',
    built: [
      {
        title: 'Built a breed encyclopedia',
        body: 'Scraped breed details with Beautiful Soup and enriched them with the Wolfram Alpha API, so “Dogopedia” covers temperament, size and care for any breed.',
      },
      {
        title: 'Connected real shelters',
        body: 'Used the Petfinder API to list adoption organisations and shelters near the user, with contact details and a link to each one.',
      },
      {
        title: 'Automated emergency reports',
        body: 'Wrote the flow that takes an abuse report, stores it in SQLite and automatically emails the user their nearest World Animal Protection office through Gmail.',
      },
      {
        title: 'Shipped it alone in a weekend',
        body: 'My first Django project and my first solo hackathon, including Django’s authentication system for user accounts.',
      },
    ],
    flow: [
      { label: 'Django app', detail: 'Auth, pages, forms' },
      { label: 'Breed data', detail: 'Beautiful Soup + Wolfram Alpha' },
      { label: 'Shelters', detail: 'Petfinder API' },
      { label: 'Reports', detail: 'SQLite + automated Gmail' },
    ],
    results: [
      { value: '1st', label: 'Best Community Project' },
      { value: '3', label: 'Tools in one app' },
      { value: 'Solo', label: 'Designed and built alone' },
      { value: 'Django', label: 'First project in it' },
    ],
    learned:
      'Doing a hackathon solo forced me to prioritise ruthlessly. I learned Django’s auth system, how to model data in SQLite, and how to send automated, relevant emails to users.',
  },
  {
    slug: 'safe-space',
    name: 'Safe Space',
    outcome: 'Paste any link and find out, in seconds, whether it’s safe for kids.',
    meta: [
      { label: 'Role', value: 'Front-end & back-end developer' },
      { label: 'Team', value: 'With Kyle Java and Neala Mendoza' },
      { label: 'Timeline', value: 'Dec 2020, CatHacks Winter' },
      { label: 'Stack', value: 'Flask, Beautiful Soup, MongoDB' },
    ],
    links: [{ label: 'GitHub', href: 'https://github.com/kylejava/CatHacks-Winter-Edition-2020' }],
    accent: '#12A9D6',
    screens: {
      label: 'SafeSpace',
      desktop: safeFront,
      desktopAlt: safeBack,
      tablet: safeFront,
      phones: [safeM1, safeM2],
    },
    problem:
      'The internet is a great place for kids to learn, but plenty of pages are full of language they shouldn’t see. Parents and teachers needed a quick way to check a page before handing it over.',
    built: [
      {
        title: 'Wrote the page scanner',
        body: 'A Beautiful Soup scraper that reads every word on a page, counts any profanity it finds and returns a clear verdict.',
      },
      {
        title: 'Made repeat checks instant',
        body: 'Scraping took a few seconds, so we store each verdict in MongoDB and check the database first. Pages we’ve seen before return immediately.',
      },
      {
        title: 'Built the Flask app',
        body: 'Worked across the Flask back end and the Bootstrap front end: the scan form, the results page and the routes between them.',
      },
      {
        title: 'Switched databases mid-hackathon',
        body: 'We started on Redis after a workshop, couldn’t get it working in time, and moved to MongoDB, learning it from the docs as we went.',
      },
    ],
    flow: [
      { label: 'URL', detail: 'Scan form' },
      { label: 'Cache check', detail: 'MongoDB' },
      { label: 'Scraper', detail: 'Beautiful Soup' },
      { label: 'Verdict', detail: 'Saved for next time' },
    ],
    results: [
      { value: 'Instant', label: 'Repeat checks, cached' },
      { value: '3', label: 'Person team' },
      { value: '1', label: 'Database swap, on the clock' },
    ],
    learned:
      'Caching changed the product more than any algorithm tweak. I also learned MongoDB from scratch and got much stronger with Flask and web scraping.',
  },
  {
    slug: 'our-artistic-space',
    name: 'Our Artistic Space',
    outcome: 'Every museum, gallery, art school and supply store near you, in one search.',
    meta: [
      { label: 'Role', value: 'Full-stack developer' }, // unverified
      { label: 'Team', value: 'With Michael Larkin and Kyle Java' },
      { label: 'Timeline', value: 'Nov 2020, Hacks and Crafts (MLH)' },
      { label: 'Award', value: 'Best Beginner Hack' },
    ],
    links: [
      { label: 'GitHub', href: 'https://github.com/anishdhandore/HacksAndCrafts2020' },
      { label: 'Devpost', href: 'https://devpost.com/software/our-artistic-space' },
    ],
    accent: '#E9B872',
    screens: {
      label: 'Our Artistic Space',
      desktop: artFront,
      desktopAlt: artBack,
      tablet: artFront,
      phones: [artM1, artM2],
    },
    problem:
      'Local art scenes are easy to miss. Many people don’t know which museums, galleries, schools or supply stores are in their own city, and the businesses miss out on visitors.',
    built: [
      {
        title: 'Search by city and category',
        body: 'Pick a city or zip code and a category, and the Flask back end queries the Yelp API for up to ten matching places.',
      },
      {
        title: 'Turned results into actions',
        body: 'Each result shows the name, address and phone number, with a button that opens directions in Google Maps.',
      },
      {
        title: 'Deployed it for real',
        body: 'Shipped the app on Google App Engine and connected a custom domain, ourartistic.space, during the hackathon.',
      },
      {
        title: 'Learned to work as a team',
        body: 'Our first collaborative GitHub project: branches, pull requests and sorting out merge conflicts under time pressure.',
      },
    ],
    flow: [
      { label: 'City + category', detail: 'Bootstrap UI' },
      { label: 'Flask', detail: 'Python back end' },
      { label: 'Yelp API', detail: 'Local businesses' },
      { label: 'Google App Engine', detail: 'ourartistic.space' },
    ],
    results: [
      { value: '1st', label: 'Best Beginner Hack' },
      { value: '4', label: 'Art categories' },
      { value: 'Live', label: 'Custom domain, deployed' },
      { value: '3', label: 'Person team' },
    ],
    learned:
      'Deploying is part of building. Getting the app onto Google Cloud and wiring up a custom domain took a whole day, and taught me more than the code did.',
  },
];

export const findCaseStudy = (slug) => CASE_STUDIES.find((c) => c.slug === slug) ?? null;

/** The next case study in deck order (wraps around). */
export const nextCaseStudy = (slug) => {
  const i = CASE_STUDIES.findIndex((c) => c.slug === slug);
  return CASE_STUDIES[(i + 1) % CASE_STUDIES.length];
};
