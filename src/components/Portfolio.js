import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaGithub, FaYoutube, FaTrophy, FaCode, FaBrain, FaRocket, FaGamepad, FaStar } from 'react-icons/fa';
import {
  SiPython,
  SiReact,
  SiJavascript,
  SiDocker,
  SiDjango,
  SiCplusplus,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiRedis,
  SiFirebase,
  SiGit,
  SiGithubactions,
} from 'react-icons/si';
import Soccer from '../images/soccer.jpg';
import Dogs from '../images/dogs.jpg';
import Safespace from '../images/safespace.jpg';
import Gcodes from '../images/gcodes.jpg';
import Zombie from '../images/zombie.jpg';
import Artistic from '../images/artistic.jpg';
import DanceAI from '../images/DanceAI.png';
import { useTheme } from '../context/ThemeContext';

// Tech icon mapping with brand colors
const techIcons = {
  'Python': { Icon: SiPython, color: '#3776AB' },
  'React': { Icon: SiReact, color: '#61DAFB' },
  'JavaScript': { Icon: SiJavascript, color: '#F7DF1E' },
  'TypeScript': { Icon: SiJavascript, color: '#3178C6' },
  'Docker': { Icon: SiDocker, color: '#2496ED' },
  'Three.js': { Icon: FaCode, color: '#000000' },
  'Django': { Icon: SiDjango, color: '#092E20' },
  'Node.js': { Icon: SiNodedotjs, color: '#339933' },
  'Express': { Icon: SiExpress, color: '#000000' },
  'PostgreSQL': { Icon: SiPostgresql, color: '#336791' },
  'MySQL': { Icon: SiMysql, color: '#4479A1' },
  'MongoDB': { Icon: SiMongodb, color: '#47A248' },
  'Redis': { Icon: SiRedis, color: '#DC382D' },
  'Firebase': { Icon: SiFirebase, color: '#FFCA28' },
  'Git': { Icon: SiGit, color: '#F05032' },
  'GitHub Actions': { Icon: SiGithubactions, color: '#2088FF' },
  'NumPy': { Icon: SiPython, color: '#013243' },
  'Pandas': { Icon: SiPython, color: '#150458' },
  'Scikit-learn': { Icon: SiPython, color: '#F7931E' },
  'Matplotlib': { Icon: SiPython, color: '#11557C' },
  'Seaborn': { Icon: SiPython, color: '#3776AB' },
  'C++': { Icon: SiCplusplus, color: '#00599C' },
  'RoBERTa': { Icon: FaBrain, color: '#FF6B6B' },
  'FastAPI': { Icon: SiPython, color: '#009688' },
  'Flask': { Icon: SiPython, color: '#000000' },
  'CI/CD': { Icon: SiGithubactions, color: '#2088FF' },
  'WebSockets': { Icon: FaCode, color: '#4ECDC4' },
};

const Portfolio = () => {
  const { isDarkMode } = useTheme();
  const [hoveredProject, setHoveredProject] = useState(null);
  const [visibleCards, setVisibleCards] = useState([]);
  const sectionRef = useRef(null);

  const projects = [
    {
      title: "Dance AI",
      image: DanceAI,
      github: "https://github.com/anishdhandore",
      description: "AI-Driven Software System",
      year: "2025",
      achievement: "Prize Winner",
      hackathon: "World's Largest Hackathon",
      tech: ["React", "Three.js", "Python", "Docker", "RoBERTa", "FastAPI", "WebSockets"],
      icon: FaBrain,
      category: "AI/ML",
    },
    {
      title: "Soccer Match Predictions",
      image: Soccer,
      link: "https://colab.research.google.com/drive/1xT5S3eeZPcjfPexal9m9Z2PjLedSJ0wA?usp=sharing",
      description: "Machine Learning & Data Modeling",
      year: "2022",
      tech: ["Python", "NumPy", "Pandas", "Scikit-learn", "Matplotlib", "Seaborn"],
      icon: FaRocket,
      category: "ML",
    },
    {
      title: "Preserving Paws",
      image: Dogs,
      github: "https://github.com/anishdhandore/ST-Hacks-2021",
      youtube: "https://www.youtube.com/watch?v=HzcST4-HYKE",
      description: "Django-Based Software Platform",
      year: "2021",
      achievement: "Prize Winner",
      hackathon: "ST Hacks 2021",
      tech: ["Django", "Python", "PostgreSQL", "CI/CD", "Git"],
      icon: FaTrophy,
      category: "Web",
    },
    {
      title: "Safe Space",
      image: Safespace,
      github: "https://github.com/kylejava/CatHacks-Winter-Edition-2020",
      description: "Community Platform",
      year: "2020",
      tech: ["React", "Node.js", "Express", "MongoDB"],
      icon: FaCode,
      category: "Web",
    },
    {
      title: "Fighting Projectiles",
      image: Gcodes,
      github: "https://github.com/anishdhandore/G-CODES",
      description: "Game Development",
      year: "2020",
      tech: ["C++"],
      icon: FaGamepad,
      category: "Game",
    },
    {
      title: "Zombie Attack",
      image: Zombie,
      github: "https://github.com/anishdhandore/The-Goblin-Game",
      description: "Game Development",
      year: "2020",
      tech: ["C++"],
      icon: FaGamepad,
      category: "Game",
    },
    {
      title: "Our Artistic Space",
      image: Artistic,
      github: "https://github.com/anishdhandore/HacksAndCrafts2020",
      description: "Creative Platform",
      year: "2020",
      achievement: "Prize Winner",
      tech: ["React", "JavaScript", "Firebase"],
      icon: FaCode,
      category: "Web",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            projects.forEach((_, index) => {
              setTimeout(() => {
                setVisibleCards((prev) => [...prev, index]);
              }, index * 80);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <PortfolioSection id="portfolio" isDarkMode={isDarkMode} ref={sectionRef}>
      <TitleContainer>
        <Subtitle isDarkMode={isDarkMode}>Project Showcase</Subtitle>
        <Heading isDarkMode={isDarkMode}>
          <TitleIcon>🎯</TitleIcon>
          My Projects
        </Heading>
        <CollectionStats isDarkMode={isDarkMode}>
          <StatBadge isDarkMode={isDarkMode}>
            <FaTrophy /> {projects.filter(p => p.achievement).length} Awards
          </StatBadge>
          <StatBadge isDarkMode={isDarkMode}>
            <FaCode /> {projects.length} Projects
          </StatBadge>
          <StatBadge isDarkMode={isDarkMode}>
            <FaStar /> {new Set(projects.flatMap(p => p.tech)).size} Tech Used
          </StatBadge>
        </CollectionStats>
      </TitleContainer>

      <ProjectGrid>
        {projects.map((project, index) => {
          const Icon = project.icon;
          const isVisible = visibleCards.includes(index);
          const isHovered = hoveredProject === index;

          return (
            <ProjectCardWrapper
              key={index}
              isVisible={isVisible}
              delay={index * 80}
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <ProjectCard isDarkMode={isDarkMode} isHovered={isHovered}>
                <CardHeader>
                  <ProjectImage src={project.image} alt={project.title} />
                  {project.achievement && (
                    <AchievementBadge>
                      <FaTrophy size={12} />
                    </AchievementBadge>
                  )}
                </CardHeader>

                <CardBody isDarkMode={isDarkMode}>
                  <CategoryTag isDarkMode={isDarkMode}>
                    <Icon size={14} />
                    {project.category}
                  </CategoryTag>
                  
                  <ProjectTitle isDarkMode={isDarkMode}>{project.title}</ProjectTitle>
                  <ProjectDescription isDarkMode={isDarkMode}>{project.description}</ProjectDescription>
                  
                  <YearBadge isDarkMode={isDarkMode}>{project.year}</YearBadge>

                  <TechStackSection>
                    <TechLabel isDarkMode={isDarkMode}>Tech Stack:</TechLabel>
                    <TechIcons>
                      {project.tech.slice(0, 6).map((techName, techIndex) => {
                        const tech = techIcons[techName] || { Icon: FaCode, color: '#6c757d' };
                        const TechIcon = tech.Icon;
                        return (
                          <TechIconWrapper key={techIndex}>
                            <TechIconItem
                              color={tech.color}
                              title={techName}
                            >
                              <TechIcon size={18} />
                            </TechIconItem>
                            <TechTooltip isDarkMode={isDarkMode}>{techName}</TechTooltip>
                          </TechIconWrapper>
                        );
                      })}
                      {project.tech.length > 6 && (
                        <MoreTech>+{project.tech.length - 6}</MoreTech>
                      )}
                    </TechIcons>
                  </TechStackSection>

                  <LinkButtons>
                    {project.github && (
                      <LinkButton
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        isDarkMode={isDarkMode}
                      >
                        <FaGithub size={14} /> Code
                      </LinkButton>
                    )}
                    {project.youtube && (
                      <LinkButton
                        href={project.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        isDarkMode={isDarkMode}
                        youtube
                      >
                        <FaYoutube size={14} /> Demo
                      </LinkButton>
                    )}
                    {project.link && (
                      <LinkButton
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        isDarkMode={isDarkMode}
                      >
                        🔗 View
                      </LinkButton>
                    )}
                  </LinkButtons>
                </CardBody>
              </ProjectCard>
            </ProjectCardWrapper>
          );
        })}
      </ProjectGrid>
    </PortfolioSection>
  );
};

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-8px);
  }
`;

const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
`;

const glow = keyframes`
  0%, 100% {
    box-shadow: 0 0 15px rgba(72, 70, 145, 0.3);
  }
  50% {
    box-shadow: 0 0 25px rgba(72, 70, 145, 0.5);
  }
`;

const PortfolioSection = styled.section`
  background: ${props => props.isDarkMode 
    ? 'linear-gradient(180deg, #040a1c 0%, #0a0f1f 100%)' 
    : 'linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%)'};
  padding: 3rem 2rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 30% 30%, ${props => props.isDarkMode ? 'rgba(72, 70, 145, 0.05)' : 'rgba(52, 152, 219, 0.03)'}, transparent 60%);
    pointer-events: none;
  }

  @media screen and (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const TitleContainer = styled.div`
  text-align: center;
  margin-bottom: 2.5rem;
  position: relative;
  z-index: 2;
`;

const Subtitle = styled.p`
  color: ${props => props.isDarkMode ? '#c4babb' : '#7f8c8d'};
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const TitleIcon = styled.span`
  font-size: 2rem;
  display: inline-block;
  margin-right: 0.5rem;
  animation: ${float} 3s ease-in-out infinite;
`;

const Heading = styled.h2`
  font-size: 2.5rem;
  background: linear-gradient(45deg, ${props => props.isDarkMode ? '#484691' : '#3498db'}, ${props => props.isDarkMode ? '#c4babb' : '#2c3e50'});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
  margin: 0.5rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;

  @media screen and (max-width: 768px) {
    font-size: 2rem;
  }
`;

const CollectionStats = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1.5rem;
  flex-wrap: wrap;
`;

const StatBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: ${props => props.isDarkMode 
    ? 'linear-gradient(135deg, rgba(72, 70, 145, 0.2), rgba(90, 86, 179, 0.2))' 
    : 'linear-gradient(135deg, rgba(52, 152, 219, 0.1), rgba(41, 128, 185, 0.1))'};
  border: 1px solid ${props => props.isDarkMode ? '#484691' : '#3498db'}40;
  border-radius: 15px;
  color: ${props => props.isDarkMode ? '#c4babb' : '#2c3e50'};
  font-size: 0.85rem;
  font-weight: 600;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 2;

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.25rem;
  }
`;

const ProjectCardWrapper = styled.div`
  opacity: ${props => props.isVisible ? 1 : 0};
  animation: ${props => props.isVisible ? scaleIn : 'none'} 0.5s ease-out;
  animation-delay: ${props => props.delay}ms;
  animation-fill-mode: both;
`;

const ProjectCard = styled.div`
  background: ${props => props.isDarkMode 
    ? 'linear-gradient(135deg, rgba(36, 30, 32, 0.9) 0%, rgba(26, 20, 22, 0.9) 100%)' 
    : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 249, 250, 0.95) 100%)'};
  border-radius: 16px;
  overflow: hidden;
  border: 2px solid ${props => props.isDarkMode ? '#484691' : '#3498db'}30;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-8px);
    border-color: ${props => props.isDarkMode ? '#484691' : '#3498db'};
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3),
                0 0 20px ${props => props.isDarkMode ? 'rgba(72, 70, 145, 0.3)' : 'rgba(52, 152, 219, 0.3)'};
  }
`;

const CardHeader = styled.div`
  position: relative;
  width: 100%;
  height: 160px;
  overflow: hidden;
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  background: ${props => props.isDarkMode ? '#1a1416' : '#f8f9fa'};
  transition: transform 0.3s ease;

  ${ProjectCard}:hover & {
    transform: scale(1.05);
  }
`;

const AchievementBadge = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #ffd700, #ffed4e);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  box-shadow: 0 3px 10px rgba(255, 215, 0, 0.5);
  animation: ${glow} 2s ease-in-out infinite;
`;

const CardBody = styled.div`
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 0.75rem;
`;

const CategoryTag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.7rem;
  background: ${props => props.isDarkMode ? 'rgba(72, 70, 145, 0.2)' : 'rgba(52, 152, 219, 0.1)'};
  border: 1px solid ${props => props.isDarkMode ? '#484691' : '#3498db'}40;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  color: ${props => props.isDarkMode ? '#484691' : '#3498db'};
  width: fit-content;
`;

const ProjectTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  color: ${props => props.isDarkMode ? '#c4babb' : '#2c3e50'};
  margin: 0;
  line-height: 1.3;
`;

const ProjectDescription = styled.p`
  font-size: 0.85rem;
  color: ${props => props.isDarkMode ? '#7f8c8d' : '#7f8c8d'};
  margin: 0;
  line-height: 1.5;
  flex: 1;
`;

const YearBadge = styled.span`
  display: inline-block;
  padding: 0.3rem 0.6rem;
  background: ${props => props.isDarkMode ? 'rgba(72, 70, 145, 0.15)' : 'rgba(52, 152, 219, 0.1)'};
  border: 1px solid ${props => props.isDarkMode ? '#484691' : '#3498db'}30;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 600;
  color: ${props => props.isDarkMode ? '#484691' : '#3498db'};
  width: fit-content;
`;

const TechStackSection = styled.div`
  margin-top: 0.5rem;
`;

const TechLabel = styled.div`
  font-size: 0.7rem;
  color: ${props => props.isDarkMode ? '#7f8c8d' : '#95a5a6'};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const TechIcons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
`;

const TechTooltip = styled.div`
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%) translateY(0);
  background: ${props => props.isDarkMode 
    ? 'linear-gradient(135deg, #241e20 0%, #1a1416 100%)' 
    : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)'};
  padding: 0.4rem 0.7rem;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 600;
  color: ${props => props.isDarkMode ? '#c4babb' : '#2c3e50'};
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s ease;
  pointer-events: none;
  z-index: 100;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  border: 1px solid ${props => props.isDarkMode ? '#484691' : '#3498db'}40;

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 6px solid transparent;
    border-top-color: ${props => props.isDarkMode ? '#241e20' : '#ffffff'};
  }
`;

const TechIconWrapper = styled.div`
  position: relative;
  
  &:hover ${TechTooltip} {
    opacity: 1;
    visibility: visible;
    transform: translateX(-50%) translateY(-5px);
  }
`;

const TechIconItem = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: ${props => props.color}15;
  border: 1.5px solid ${props => props.color}40;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.color};
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.15) translateY(-2px);
    background: ${props => props.color}25;
    box-shadow: 0 3px 10px ${props => props.color}40;
  }
`;

const MoreTech = styled.span`
  font-size: 0.75rem;
  color: ${props => props.isDarkMode ? '#7f8c8d' : '#95a5a6'};
  font-weight: 600;
`;

const LinkButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: auto;
  flex-wrap: wrap;
`;

const LinkButton = styled.a`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 0.9rem;
  background: ${props => props.youtube 
    ? 'linear-gradient(135deg, #ff0000, #cc0000)'
    : (props.isDarkMode ? 'linear-gradient(135deg, #484691, #5a56b3)' : 'linear-gradient(135deg, #3498db, #2980b9)')};
  color: white;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.8rem;
  transition: all 0.3s ease;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }
`;

export default Portfolio;
