import React from 'react';
import styled from 'styled-components';
import { FaGithub, FaYoutube } from 'react-icons/fa';
import Soccer from '../soccer.jpg';
import Dogs from '../dogs.jpg';
import Safespace from '../safespace.jpg';
import Gcodes from '../gcodes.jpg';
import Zombie from '../zombie.jpg';
import Artistic from '../artistic.jpg';

const Portfolio = () => {
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
    <PortfolioSection id="portfolio">
      <Subtitle>My Portfolio</Subtitle>
      <Heading>My Projects</Heading>
      <ProjectGrid>
        {projects.map((project, index) => (
          <ProjectCard key={index}>
            <ProjectImageStyled src={project.image} alt={`Project ${index + 1}`} />
            <ProjectTitle>{project.title}</ProjectTitle>

            {project.type === "colab" ? (
              <ProjectLink href={project.link} target="_blank" rel="noopener noreferrer">
                <span role="img" aria-label="Link">🔗</span> Google Colab
              </ProjectLink>
            ) : project.type === "githubYoutube" ? (
              <div>
                <ProjectLink href={project.github} target="_blank" rel="noopener noreferrer">
                  <FaGithub /> GitHub
                </ProjectLink>
                <ProjectLink href={project.youtube} target="_blank" rel="noopener noreferrer">
                  <YouTubeIcon /> YouTube
                </ProjectLink>

              </div>
            ) : (
              <ProjectLink href={project.link} target="_blank" rel="noopener noreferrer">
                <FaGithub /> GitHub
              </ProjectLink>
            )}
          </ProjectCard>
        ))}
      </ProjectGrid>
    </PortfolioSection>
  );
};

// Styled Components

const PortfolioSection = styled.section`
  padding: 3rem 1rem;
  text-align: center;
  background-color: #040a1c;
`;

const Subtitle = styled.p`
  color: #c4babb;
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

const Heading = styled.h2`
  font-size: 2.5rem;
  color: #484691;
  margin-bottom: 2rem;
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
  background-color: #241e20;
  width: 30%;
  height: 350px;
  border-radius: 10px;
  padding: 0.5rem;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 2rem;

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
  color: #c4babb;
  margin-bottom: 0.3rem;
  padding-left: 0.5rem;

  @media screen and (max-width: 768px) {
    text-align: center;
    padding-left: 0;
  }
`;

const ProjectLink = styled.a`
  font-size: 0.9rem;
  color: #c4babb;
  text-decoration: none;
  padding-left: 0.5rem;
  margin-right: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;

  &:hover {
    text-decoration: underline;
  }

  &[youtube] {
    color: #FF0000; /* Make the whole link red */
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
