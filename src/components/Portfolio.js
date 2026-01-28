import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaGithub, FaYoutube } from 'react-icons/fa';
import Soccer from '../images/soccer.jpg';
import Dogs from '../images/dogs.jpg';
import Safespace from '../images/safespace.jpg';
import Gcodes from '../images/gcodes.jpg';
import Zombie from '../images/zombie.jpg';
import Artistic from '../images/artistic.jpg';
import { useTheme } from '../context/ThemeContext';

const Portfolio = () => {
  const { isDarkMode } = useTheme();
  const [hoveredProject, setHoveredProject] = useState(null);
  const [touchedProject, setTouchedProject] = useState(null);

  const handleProjectInteraction = (index) => {
    setHoveredProject(index);
    setTouchedProject(index);
  };

  const handleProjectLeave = () => {
    setHoveredProject(null);
    setTouchedProject(null);
  };

  const projects = [
    {
      title: "Soccer Match Predictions",
      image: Soccer,
      link: "https://colab.research.google.com/drive/1xT5S3eeZPcjfPexal9m9Z2PjLedSJ0wA?usp=sharing",
      type: "colab",
    },
    {
      title: "Preserving Paws",
      image: Dogs,
      github: "https://github.com/anishdhandore/ST-Hacks-2021",
      youtube: "https://www.youtube.com/watch?v=HzcST4-HYKE",
      type: "githubYoutube",
    },
    {
      title: "Safe Space",
      image: Safespace,
      link: "https://github.com/kylejava/CatHacks-Winter-Edition-2020",
      type: "github",
    },
    {
      title: "Fighting Projectiles",
      image: Gcodes,
      link: "https://github.com/anishdhandore/G-CODES",
      type: "github",
    },
    {
      title: "Zombie Attack",
      image: Zombie,
      link: "https://github.com/anishdhandore/The-Goblin-Game",
      type: "github",
    },
    {
      title: "Our Artistic Space",
      image: Artistic,
      link: "https://github.com/anishdhandore/HacksAndCrafts2020",
      type: "github",
    },
  ];

  return (
    <PortfolioSection id="portfolio" isDarkMode={isDarkMode}>
      <Subtitle isDarkMode={isDarkMode}>My Work</Subtitle>
      <Heading isDarkMode={isDarkMode}>My Projects</Heading>
      <ProjectGrid>
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            isDarkMode={isDarkMode}
            onMouseEnter={() => handleProjectInteraction(index)}
            onMouseLeave={handleProjectLeave}
            onTouchStart={() => handleProjectInteraction(index)}
            onTouchEnd={handleProjectLeave}
            isHovered={hoveredProject === index || touchedProject === index}
          >
            <ProjectImageStyled src={project.image} alt={`Project ${index + 1}`} />
            <ProjectOverlay isHovered={hoveredProject === index || touchedProject === index}>
              <ProjectTitle isDarkMode={isDarkMode}>{project.title}</ProjectTitle>
              {project.type === "colab" ? (
                <ProjectLink href={project.link} target="_blank" rel="noopener noreferrer" isDarkMode={isDarkMode}>
                  <span role="img" aria-label="Link">🔗</span> Google Colab
                </ProjectLink>
              ) : project.type === "githubYoutube" ? (
                <div>
                  <ProjectLink href={project.github} target="_blank" rel="noopener noreferrer" isDarkMode={isDarkMode}>
                    <FaGithub /> GitHub
                  </ProjectLink>
                  <ProjectLink href={project.youtube} target="_blank" rel="noopener noreferrer" isDarkMode={isDarkMode}>
                    <YouTubeIcon /> YouTube
                  </ProjectLink>
                </div>
              ) : (
                <ProjectLink href={project.link} target="_blank" rel="noopener noreferrer" isDarkMode={isDarkMode}>
                  <FaGithub /> GitHub
                </ProjectLink>
              )}
            </ProjectOverlay>
          </ProjectCard>
        ))}
      </ProjectGrid>
    </PortfolioSection>
  );
};

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Styled Components

const PortfolioSection = styled.section`
  background-color: ${props => props.isDarkMode ? '#040a1c' : '#ffffff'};
  padding: 5rem 1rem;
  text-align: center;
  transition: background-color 0.3s ease;
  position: relative;
  z-index: 1;
  margin-top: 0;
  border-top: none;
  box-shadow: none;
`;

const Subtitle = styled.p`
  color: ${props => props.isDarkMode ? '#c4babb' : '#2c3e50'};
  font-size: 1rem;
  margin-bottom: 0.5rem;
  transition: color 0.3s ease;
`;

const Heading = styled.h2`
  font-size: 2.5rem;
  color: ${props => props.isDarkMode ? '#484691' : '#2c3e50'};
  margin-bottom: 3rem;
  transition: color 0.3s ease;
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const ProjectCard = styled.div`
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  cursor: pointer;
  aspect-ratio: 16/9;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    transform: translateY(-10px);
  }

  @media (hover: none) {
    &:active {
      transform: translateY(-10px);
    }
  }
`;

const ProjectImageStyled = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
`;

const ProjectOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${props => props.isDarkMode ? 'rgba(10, 9, 28, 0.9)' : 'rgba(44, 62, 80, 0.9)'};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  opacity: ${props => props.isHovered ? 1 : 0};
  transition: opacity 0.3s ease;
  touch-action: manipulation;
`;

const ProjectTitle = styled.h3`
  color: ${props => props.isDarkMode ? '#c4babb' : '#ffffff'};
  font-size: 1.5rem;
  margin-bottom: 1rem;
  text-align: center;
`;

const ProjectLink = styled.a`
  font-size: 0.9rem;
  color: ${props => props.isDarkMode ? '#c4babb' : '#ffffff'};
  text-decoration: none;
  padding-left: 0.5rem;
  margin-right: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  transition: color 0.3s ease;

  &:hover {
    text-decoration: underline;
  }

  &[youtube] {
    color: #FF0000;
  }

  @media screen and (max-width: 768px) {
    text-align: center;
    padding-left: 0;
  }
`;

const YouTubeIcon = styled(FaYoutube)`
  color: #FF0000;
`;

export default Portfolio;
