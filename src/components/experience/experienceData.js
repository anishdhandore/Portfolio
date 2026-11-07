// Experience, oldest first (the wheel turns forward through time).
// Dates are YYYY-MM; `end: null` means current. Content comes from the resume
// (public/AnishDhandoreResume-8.pdf).
//
// - `summary`: one line on the role
// - `highlights`: what I did
// - `impact`: how it helped the team or company; `metric` is optional
export const ROLES = [
  {
    start: '2021-08',
    end: '2022-12',
    role: 'Computer Engineering Tutor',
    company: 'CSUSM STEM Success Center',
    location: 'San Marcos, CA',
    summary: 'Taught the fundamentals of programming and software design to undergraduate engineers.',
    highlights: [
      'Tutored students in C++ programming, object-oriented design, data structures and algorithmic problem-solving.',
      'Wrote structured reference materials and worked example solutions for core software design and architecture concepts.',
    ],
    impact: 'Gave students reusable study material that reinforced design concepts beyond one-on-one sessions.',
    metric: null,
    tags: ['C++', 'OOP', 'Data structures', 'Algorithms'],
  },
  {
    start: '2022-01',
    end: '2024-08',
    role: 'President',
    company: 'Google Developer Student Clubs',
    location: 'CSUSM',
    summary: 'Led the campus developer community, running technical workshops and student project teams.',
    highlights: [
      'Led technical workshops on Python, C++ and software engineering fundamentals, with a focus on system design and performance.',
      'Coordinated student teams for hackathons and projects, facilitating design discussions, code reviews and collaboration.',
    ],
    impact: 'Gave students practical grounding in software engineering, and helped hackathon teams turn ideas into working projects.',
    metric: { value: '1,000+', label: 'students reached through workshops' },
    tags: ['Leadership', 'Python', 'C++', 'System design'],
  },
  {
    start: '2023-03',
    end: '2023-05',
    role: 'Software Developer',
    company: 'Swift Technologies',
    location: 'Remote',
    summary: 'Shipped front-end features for data-driven internal tools.',
    highlights: [
      'Developed and shipped features in React and TypeScript, integrating REST APIs for workflows used by internal stakeholders.',
      'Designed reusable UI components and service layers with object-oriented patterns (Factory, Strategy).',
      'Added analytics instrumentation and input validation with an observer-style pattern to track feature usage.',
    ],
    impact: 'Made the codebase easier to maintain and gave the team usage data to guide product improvements.',
    metric: { value: '~25%', label: 'less duplicate code' },
    tags: ['React', 'TypeScript', 'REST APIs', 'Design patterns'],
  },
  {
    start: '2025-02',
    end: null,
    role: 'Software Engineer',
    company: 'SGS North America',
    location: 'San Diego, CA',
    summary: 'Building backend automation for production test pipelines at a global testing, inspection and certification company.',
    highlights: [
      'Designed and implemented backend automation services in Python that orchestrate distributed validation workflows.',
      'Built modular, reusable service components and data parsers that standardize measurement ingestion across device configurations and projects.',
      'Applied abstraction, modular design, structured logging and robust error handling throughout.',
    ],
    impact: 'Improved the reliability, maintainability and observability of test systems in a regulated environment, supporting scalable execution of production test pipelines.',
    metric: null,
    tags: ['Python', 'Automation', 'Distributed workflows', 'Observability'],
  },
];
