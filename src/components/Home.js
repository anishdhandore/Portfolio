// src/components/Home.js
import React from 'react';
import styled from 'styled-components';
import NarutoImage from '../naruto_processed.jpg';

const Home = () => {
    const scrollToAbout = () => {
        const aboutSection = document.getElementById("about");
        if (aboutSection) {
          aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };
  return (
    <div className='responsive-container'>
    <HeroSection id="home">
      <HeroContent>
        <text>Hello, I am</text>
        <h1>Anish Dhandore</h1>
        <text>Software Engineer</text>
        <br></br>
        <Image src={NarutoImage} alt="Naruto" />

        {/* New buttons */}
        <ButtonContainer>
          {/* <DownloadButton href="/AnishDhandoreResume.pdf" target="_blank" download>
            Download CV
          </DownloadButton> */}
          <OpenButton
            href="https://anishdhandore.github.io/Portfolio/AnishDhandoreResume.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            View CV
          </OpenButton>

          <AboutButton id="about" onClick={scrollToAbout}>
            About Me
          </AboutButton >
        </ButtonContainer>

      </HeroContent>
    </HeroSection>
    </div>
  );
};

const HeroSection = styled.section`
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  text-align: center;
  text-color: #c4babb;
`;

const HeroContent = styled.div`
  
  h1 {
    font-size: 3.0rem;  /* Reduced font size */
    color: #c4babb;  /* Light and skinny font color */
    font-weight: 300;  /* Light weight for skinny text */
  }

  p {
    font-size: 1.2rem;  /* Reduced font size for paragraph */
    color: #c4babb;  /* Light font color */
    font-weight: 300;  /* Light weight */
    margin-bottom: 2rem;
  }

  text{
    color: #c4babb;
  }
`;

const Image = styled.img`
  width: 30%;  /* Reduced width */
  max-width: 200px;  /* Set a smaller max width */
  height: auto;  /* Keep the aspect ratio */
  margin: 1rem 0;  /* Margin around the image */
`;

const ButtonContainer = styled.div`
  margin-top: 1rem; /* Space above the buttons */
  display: flex;
  justify-content: center;
  gap: 1rem; /* Space between buttons */
`;

const DownloadButton = styled.a`
  background-color: transparent; /* Ghost button background */
  color: #484691; /* Text color */
  padding: 0.75rem 1.5rem;
  border: 2px solid #0c0b24; /* Match the background color */
  cursor: pointer;
  text-decoration: none;
  font-size: 1rem;
  border-radius: 5px; /* Rounded corners */
  box-shadow: 0 0 0 2px #484691; /* Margin effect using box-shadow */
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    
    color: #0a091c; /* Hover text color */
  }
`;

const OpenButton = styled.a`
  background-color: transparent; /* Ghost button background */
  color: #484691; /* Text color */
  padding: 0.75rem 1.5rem;
  border: 2px solid #0c0b24; /* Match the background color */
  cursor: pointer;
  text-decoration: none;
  font-size: 1rem;
  border-radius: 5px; /* Rounded corners */
  box-shadow: 0 0 0 2px #484691; /* Margin effect using box-shadow */
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    
    color: #0a091c; /* Hover text color */
  }
`;

const AboutButton = styled.a`
  background-color: #484691; /* Button color */
  color: #0a091c;
  padding: 0.75rem 1.5rem;
  border: none;
  cursor: pointer;
  text-decoration: none;
  font-size: 1rem;
  border-radius: 5px; /* Rounded corners */
  transition: background-color 0.3s;

  &:hover {
    background-color: #0a091c; /* Hover color */
  }
`;

export default Home;
