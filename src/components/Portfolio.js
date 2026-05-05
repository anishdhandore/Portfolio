import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaGithub, FaYoutube, FaExternalLinkAlt, FaTrophy, FaCode, FaBrain, FaRocket, FaGamepad } from 'react-icons/fa';
import {
  SiPython, SiReact, SiJavascript, SiDocker, SiDjango, SiCplusplus,
  SiNodedotjs, SiExpress, SiPostgresql, SiMongodb, SiFirebase,
} from 'react-icons/si';
import Soccer from '../images/soccer.jpg';
import Dogs from '../images/dogs.jpg';
import Safespace from '../images/safespace.jpg';
import Gcodes from '../images/gcodes.jpg';
import Zombie from '../images/zombie.jpg';
import Artistic from '../images/artistic.jpg';
import DanceAI from '../images/DanceAI.png';
import { useTheme } from '../context/ThemeContext';

const techIcons = {
  'Python':         { Icon: SiPython,         color: '#3776AB' },
  'React':          { Icon: SiReact,           color: '#61DAFB' },
  'JavaScript':     { Icon: SiJavascript,      color: '#F7DF1E' },
  'TypeScript':     { Icon: SiJavascript,      color: '#3178C6' },
  'Docker':         { Icon: SiDocker,          color: '#2496ED' },
  'Django':         { Icon: SiDjango,          color: '#092E20' },
  'Node.js':        { Icon: SiNodedotjs,       color: '#339933' },
  'Express':        { Icon: SiExpress,         color: '#888' },
  'PostgreSQL':     { Icon: SiPostgresql,      color: '#336791' },
  'MongoDB':        { Icon: SiMongodb,         color: '#47A248' },
  'Firebase':       { Icon: SiFirebase,        color: '#FFCA28' },
  'C++':            { Icon: SiCplusplus,       color: '#00599C' },
  'RoBERTa':        { Icon: FaBrain,           color: '#A78BFA' },
  'FastAPI':        { Icon: SiPython,          color: '#009688' },
  'WebSockets':     { Icon: FaCode,            color: '#60A5FA' },
  'Three.js':       { Icon: FaCode,            color: '#F1EEFF' },
  'NumPy':          { Icon: SiPython,          color: '#013243' },
  'Pandas':         { Icon: SiPython,          color: '#150458' },
  'Scikit-learn':   { Icon: SiPython,          color: '#F7931E' },
  'Matplotlib':     { Icon: SiPython,          color: '#11557C' },
  'Seaborn':        { Icon: SiPython,          color: '#3776AB' },
  'CI/CD':          { Icon: FaCode,            color: '#60A5FA' },
  'Git':            { Icon: FaCode,            color: '#F05032' },
};

const CATEGORY_COLORS = {
  'AI/ML': '#A78BFA',
  'ML':    '#34D399',
  'Web':   '#60A5FA',
  'Game':  '#F87171',
};

const Portfolio = () => {
  const { isDarkMode } = useTheme();
  const [hoveredProject, setHoveredProject] = useState(null);
  const [visibleCards, setVisibleCards] = useState([]);
  const sectionRef = useRef(null);

  const projects = [
    {
      title: 'Dance AI',
      image: DanceAI,
      github: 'https://github.com/anishdhandore',
      description: 'AI-Driven Software System',
      year: '2025',
      achievement: 'Prize Winner',
      hackathon: "World's Largest Hackathon",
      tech: ['React', 'Three.js', 'Python', 'Docker', 'RoBERTa', 'FastAPI', 'WebSockets'],
      icon: FaBrain,
      category: 'AI/ML',
    },
    {
      title: 'Soccer Match Predictions',
      image: Soccer,
      link: 'https://colab.research.google.com/drive/1xT5S3eeZPcjfPexal9m9Z2PjLedSJ0wA?usp=sharing',
      description: 'Machine Learning & Data Modeling',
      year: '2022',
      tech: ['Python', 'NumPy', 'Pandas', 'Scikit-learn', 'Matplotlib', 'Seaborn'],
      icon: FaRocket,
      category: 'ML',
    },
    {
      title: 'Preserving Paws',
      image: Dogs,
      github: 'https://github.com/anishdhandore/ST-Hacks-2021',
      youtube: 'https://www.youtube.com/watch?v=HzcST4-HYKE',
      description: 'Django-Based Software Platform',
      year: '2021',
      achievement: 'Prize Winner',
      hackathon: 'ST Hacks 2021',
      tech: ['Django', 'Python', 'PostgreSQL', 'CI/CD', 'Git'],
      icon: FaTrophy,
      category: 'Web',
    },
    {
      title: 'Safe Space',
      image: Safespace,
      github: 'https://github.com/kylejava/CatHacks-Winter-Edition-2020',
      description: 'Community Platform',
      year: '2020',
      tech: ['React', 'Node.js', 'Express', 'MongoDB'],
      icon: FaCode,
      category: 'Web',
    },
    {
      title: 'Fighting Projectiles',
      image: Gcodes,
      github: 'https://github.com/anishdhandore/G-CODES',
      description: 'Game Development',
      year: '2020',
      tech: ['C++'],
      icon: FaGamepad,
      category: 'Game',
    },
    {
      title: 'Zombie Attack',
      image: Zombie,
      github: 'https://github.com/anishdhandore/The-Goblin-Game',
      description: 'Game Development',
      year: '2020',
      tech: ['C++'],
      icon: FaGamepad,
      category: 'Game',
    },
    {
      title: 'Our Artistic Space',
      image: Artistic,
      github: 'https://github.com/anishdhandore/HacksAndCrafts2020',
      description: 'Creative Platform',
      year: '2020',
      achievement: 'Prize Winner',
      tech: ['React', 'JavaScript', 'Firebase'],
      icon: FaCode,
      category: 'Web',
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            projects.forEach((_, i) => {
              setTimeout(() => setVisibleCards(prev => [...prev, i]), i * 70);
            });
          }
        });
      },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, []);

  return (
    <div className="responsive-container">
      <PortfolioSection id="portfolio" isDarkMode={isDarkMode} ref={sectionRef}>
        <SectionHeader>
          <SectionLabel isDarkMode={isDarkMode}>Selected Work</SectionLabel>
          <SectionTitle isDarkMode={isDarkMode}>Projects</SectionTitle>
          <SectionSub isDarkMode={isDarkMode}>Things I've built along the way</SectionSub>
        </SectionHeader>

        <Grid>
          {projects.map((project, i) => {
            const catColor = CATEGORY_COLORS[project.category] || '#8B5CF6';
            const isHovered = hoveredProject === i;

            return (
              <ProjectCard
                key={project.title}
                isDarkMode={isDarkMode}
                visible={visibleCards.includes(i)}
                delay={i * 60}
                onMouseEnter={() => setHoveredProject(i)}
                onMouseLeave={() => setHoveredProject(null)}
                large={i === 0}
              >
                <ImgWrap>
                  <ProjectImg src={project.image} alt={project.title} />
                  <ImgOverlay visible={isHovered} isDarkMode={isDarkMode}>
                    <OverlayContent>
                      <TechGrid>
                        {project.tech.slice(0, 6).map(t => {
                          const tech = techIcons[t];
                          if (!tech) return <TechChip key={t} isDarkMode={isDarkMode}>{t}</TechChip>;
                          const { Icon: TIcon, color } = tech;
                          return (
                            <TechChip key={t} isDarkMode={isDarkMode} accentColor={color}>
                              <TIcon size={12} color={color} />
                              {t}
                            </TechChip>
                          );
                        })}
                      </TechGrid>
                      <LinkRow>
                        {project.github && (
                          <IconLink href={project.github} target="_blank" rel="noopener noreferrer" isDarkMode={isDarkMode}>
                            <FaGithub size={18} />
                          </IconLink>
                        )}
                        {project.youtube && (
                          <IconLink href={project.youtube} target="_blank" rel="noopener noreferrer" isDarkMode={isDarkMode}>
                            <FaYoutube size={18} />
                          </IconLink>
                        )}
                        {project.link && (
                          <IconLink href={project.link} target="_blank" rel="noopener noreferrer" isDarkMode={isDarkMode}>
                            <FaExternalLinkAlt size={16} />
                          </IconLink>
                        )}
                      </LinkRow>
                    </OverlayContent>
                  </ImgOverlay>
                </ImgWrap>

                <CardBody>
                  <CardRow>
                    <CategoryTag accentColor={catColor}>{project.category}</CategoryTag>
                    <Year isDarkMode={isDarkMode}>{project.year}</Year>
                  </CardRow>
                  <ProjectTitle isDarkMode={isDarkMode}>{project.title}</ProjectTitle>
                  <ProjectDesc isDarkMode={isDarkMode}>{project.description}</ProjectDesc>
                  {project.achievement && (
                    <AchievRow accentColor={catColor}>
                      <FaTrophy size={11} />
                      {project.achievement}
                      {project.hackathon && ` · ${project.hackathon}`}
                    </AchievRow>
                  )}
                </CardBody>
              </ProjectCard>
            );
          })}
        </Grid>
      </PortfolioSection>
    </div>
  );
};

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const PortfolioSection = styled.section`
  padding: 5rem 1rem 4rem;
  overflow: hidden;
  background: ${props => props.isDarkMode
    ? 'linear-gradient(180deg, #0A0814 0%, #06050A 100%)'
    : 'linear-gradient(180deg, #F3EEFF 0%, #FDFCFF 100%)'};
  position: relative;
  z-index: 1;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  animation: ${fadeUp} 0.6s ease-out both;
`;

const SectionLabel = styled.div`
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: ${props => props.isDarkMode ? '#8B5CF6' : '#7C3AED'};
  margin-bottom: 0.6rem;
`;

const SectionTitle = styled.h2`
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: ${props => props.isDarkMode ? '#F1EEFF' : '#1C1528'};
  margin-bottom: 0.5rem;
`;

const SectionSub = styled.p`
  font-size: 0.95rem;
  color: ${props => props.isDarkMode ? '#9D97B8' : '#5C5470'};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.1rem;
  max-width: 1300px;
  margin: 0 auto;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled.div`
  background: ${props => props.isDarkMode
    ? 'rgba(14,12,21,0.75)'
    : 'rgba(255,255,255,0.85)'};
  border: 1px solid ${props => props.isDarkMode
    ? 'rgba(139,92,246,0.15)'
    : 'rgba(124,58,237,0.1)'};
  border-radius: 18px;
  overflow: hidden;
  backdrop-filter: blur(12px);
  box-shadow: 0 4px 20px ${props => props.isDarkMode ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.06)'};
  opacity: ${props => props.visible ? 1 : 0};
  animation: ${props => props.visible ? fadeUp : 'none'} 0.5s ${props => props.delay}ms ease-out both;
  transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.25s ease;
  ${props => props.large ? 'grid-column: span 2;' : ''}

  &:hover {
    border-color: ${props => props.isDarkMode
      ? 'rgba(139,92,246,0.4)'
      : 'rgba(124,58,237,0.28)'};
    box-shadow: 0 12px 40px ${props => props.isDarkMode ? 'rgba(139,92,246,0.15)' : 'rgba(124,58,237,0.1)'};
    transform: translateY(-4px);
  }

  @media (max-width: 800px) {
    grid-column: span 1 !important;
  }
`;

const ImgWrap = styled.div`
  position: relative;
  height: 200px;
  overflow: hidden;
`;

const ProjectImg = styled.img`
  width: 100%; height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;

  ${ProjectCard}:hover & { transform: scale(1.05); }
`;

const ImgOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: ${props => props.isDarkMode
    ? 'rgba(6,5,10,0.88)'
    : 'rgba(28,21,40,0.82)'};
  display: flex;
  align-items: flex-end;
  padding: 1.25rem;
  opacity: ${props => props.visible ? 1 : 0};
  transition: opacity 0.25s ease;
`;

const OverlayContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const TechGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
`;

const TechChip = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.25rem 0.55rem;
  border-radius: 8px;
  font-size: 0.68rem;
  font-weight: 600;
  background: rgba(255,255,255,0.1);
  color: ${props => props.accentColor || '#F1EEFF'};
  border: 1px solid ${props => props.accentColor ? `${props.accentColor}40` : 'rgba(255,255,255,0.15)'};
  backdrop-filter: blur(4px);
`;

const LinkRow = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const IconLink = styled.a`
  width: 36px; height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255,255,255,0.12);
  color: #F1EEFF;
  text-decoration: none;
  border: 1px solid rgba(255,255,255,0.18);
  transition: background 0.2s ease, transform 0.2s ease;

  &:hover {
    background: rgba(139,92,246,0.35);
    transform: translateY(-2px);
  }
`;

const CardBody = styled.div`
  padding: 1.25rem;
`;

const CardRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.6rem;
`;

const CategoryTag = styled.div`
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.2rem 0.55rem;
  border-radius: 7px;
  background: ${props => `${props.accentColor}18`};
  color: ${props => props.accentColor};
  border: 1px solid ${props => `${props.accentColor}30`};
`;

const Year = styled.span`
  font-size: 0.75rem;
  font-weight: 500;
  color: ${props => props.isDarkMode ? '#5C5470' : '#9D97B8'};
`;

const ProjectTitle = styled.h3`
  font-size: 1.05rem;
  font-weight: 700;
  color: ${props => props.isDarkMode ? '#F1EEFF' : '#1C1528'};
  margin-bottom: 0.3rem;
`;

const ProjectDesc = styled.p`
  font-size: 0.82rem;
  color: ${props => props.isDarkMode ? '#9D97B8' : '#5C5470'};
  margin-bottom: 0.6rem;
`;

const AchievRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.72rem;
  font-weight: 600;
  color: ${props => props.accentColor};
`;

export default Portfolio;
