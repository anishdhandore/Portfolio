import React from 'react';
import styled from 'styled-components';
import { FaGithub, FaYoutube } from 'react-icons/fa'; // Import GitHub and YouTube icons
import Soccer from '../soccer.jpg';
import Dogs from '../dogs.jpg';
import Safespace from '../safespace.jpg'
import Gcodes from '../gcodes.jpg'
import Zombie from '../zombie.jpg'
import Artistic from '../artistic.jpg'

const Portfolio = () => {
  const projects = [
    {
      title: "Soccer Match Predictions",
      image: Soccer,
      link: "https://colab.research.google.com/drive/1xT5S3eeZPcjfPexal9m9Z2PjLedSJ0wA?usp=sharing",
      type: "colab", // Additional property to differentiate
    },
    {
      title: "Preserving Paws",
      image: Dogs,
      github: "https://github.com/anishdhandore/ST-Hacks-2021",
      youtube: "https://www.youtube.com/watch?v=HzcST4-HYKE", // YouTube link
      type: "githubYoutube", // New type for both GitHub and YouTube
    },
    {
      title: "Safe Space",
      image: Safespace,
      link: "https://github.com/kylejava/CatHacks-Winter-Edition-2020", // Link to GitHub
      type: "github", // Property to indicate GitHub type
    },
    {
      title: "Fighting Projectiles",
      image: Gcodes,
      link: "https://github.com/anishdhandore/G-CODES",
      type: "github"
    },
    {
      title: "Zombie Attack",
      image: Zombie,
      link: "https://github.com/anishdhandore/The-Goblin-Game",
      type: "github"
    },
    {
      title: "Our Artistic Space",
      image: Artistic,
      link: "https://github.com/anishdhandore/HacksAndCrafts2020",
      type: "github"
    },
  ];

  return (
    <PortfolioSection id="portfolio">
      <text>My Portfolio</text>
      <h2>My Projects</h2>
      <br />
      <br />
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
                <ProjectLink href={project.youtube} target="_blank" rel="noopener noreferrer" youtube>
                  <FaYoutube style={{ color: '#FF0000' }} /> YouTube
                </ProjectLink>
              </div>
            ) : project.type === "github" ? (
              <ProjectLink href={project.link} target="_blank" rel="noopener noreferrer">
                <FaGithub /> GitHub
              </ProjectLink>
            ) : (
              <ProjectLink href={project.link} target="_blank" rel="noopener noreferrer">
                View Project
              </ProjectLink>
            )}
          </ProjectCard>
        ))}
      </ProjectGrid>
    </PortfolioSection>
  );
};

const PortfolioSection = styled.section`
  padding: 3rem 0; /* Reduced space from top */
  text-align: center;

  h2 {
    font-size: 2.5rem;
    color: #484691; /* Same as About Me */
    margin-bottom: 1.5rem; /* Reduce space below heading */
  }
  
  text{
    color: #c4babb;
    font-size: 1rem;
  }
`;

const ProjectGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between; /* Ensure space between cards */
  align-items: center;
  max-width: 960px; /* Maximum width to fit 3 cards */
  margin: 0 auto; /* Center the grid */
  gap: 2rem; /* Increase space between rows */
`;

const ProjectCard = styled.div`
  background-color: #241e20;
  width: 30%; /* 3 cards in a row */
  height: 350px;
  border-radius: 10px;
  padding: 0.5rem;
  text-align: left; /* Shift title and link to the left */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 2rem; /* Increased space between rows */
`;

const ProjectImageStyled = styled.img`
  width: 90%;
  height: 70%;
  object-fit: cover;
  border-radius: 8px;
  margin: 0 auto 0.5rem auto;
`;

const ProjectTitle = styled.h3`
  font-size: 1.2rem;
  color: #c4babb;
  margin-bottom: 0.3rem;
  padding-left: 0.5rem; /* Shift title to the left */
`;

const ProjectLink = styled.a`
  font-size: 0.9rem;
  color: #c4babb;
  text-decoration: none;
  padding-left: 0.5rem; /* Shift link to the left */
  margin-right: 1rem; /* Add margin between GitHub and YouTube links */

  &:hover {
    text-decoration: underline;
  }

  &[youtube] {
    color: #FF0000; /* Red color for YouTube */
  }
`;

export default Portfolio;
