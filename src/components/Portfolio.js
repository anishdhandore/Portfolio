import React from 'react';
import styled from 'styled-components';
import { FaGithub, FaYoutube } from 'react-icons/fa';
import Soccer from '../soccer.jpg';
import Dogs from '../dogs.jpg';
import Safespace from '../safespace.jpg';
import Gcodes from '../gcodes.jpg';
import Zombie from '../zombie.jpg';
import Artistic from '../artistic.jpg';
import { useTheme } from '../context/ThemeContext';

const Portfolio = () => {
  const { isDarkMode } = useTheme();
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
      <Subtitle isDarkMode={isDarkMode}>My Portfolio</Subtitle>
      <Heading isDarkMode={isDarkMode}>My Projects</Heading>
      <ProjectGrid>
        {projects.map((project, index) => (
          <ProjectCard key={index} isDarkMode={isDarkMode}>
            <ProjectImageStyled src={project.image} alt={`Project ${index + 1}`} />
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
          </ProjectCard>
        ))}
      </ProjectGrid>
    </PortfolioSection>
  );
};

const PortfolioSection = styled.section`
  padding: 3rem 1rem;
  text-align: center;
  background-color: ${props => props.isDarkMode ? '#040a1c' : '#ffffff'};
  transition: background-color 0.3s ease;
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
  margin-bottom: 2rem;
  transition: color 0.3s ease;
`;

const ProjectGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  max-width: 960px;
  margin: 0 auto;
  gap: 2rem;

  @media screen and (max-width: 768px) {
    justify-content: center;
  }
`;

const ProjectCard = styled.div`
  background-color: ${props => props.isDarkMode ? '#241e20' : '#f8f9fa'};
  width: 30%;
  height: 350px;
  border-radius: 10px;
  padding: 0.5rem;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 2rem;
  transition: background-color 0.3s ease;

  @media screen and (max-width: 768px) {
    width: 90%;
    height: auto;
    text-align: center;
    align-items: center;
  }
`;

const ProjectImageStyled = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin: 0 auto 0.5rem auto;

  @media screen and (max-width: 768px) {
    height: 180px;
  }
`;

const ProjectTitle = styled.h3`
  font-size: 1.2rem;
  color: ${props => props.isDarkMode ? '#c4babb' : '#2c3e50'};
  margin-bottom: 0.3rem;
  padding-left: 0.5rem;
  transition: color 0.3s ease;

  @media screen and (max-width: 768px) {
    text-align: center;
    padding-left: 0;
  }
`;

const ProjectLink = styled.a`
  font-size: 0.9rem;
  color: ${props => props.isDarkMode ? '#c4babb' : '#2c3e50'};
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