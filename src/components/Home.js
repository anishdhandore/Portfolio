import React from 'react';
import styled from 'styled-components';
import NarutoImage from '../naruto_processed.jpg';
import { useTheme } from '../context/ThemeContext';

const Home = () => {
    const { isDarkMode } = useTheme();
    const scrollToAbout = () => {
        const aboutSection = document.getElementById("about");
        if (aboutSection) {
          aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };
  return (
    <div className='responsive-container'>
    <HeroSection id="home" isDarkMode={isDarkMode}>
      <HeroContent isDarkMode={isDarkMode}>
        <text>Hello, I am</text>
        <h1>Anish Dhandore</h1>
        <text>Software Engineer</text>
        <br></br>
        <Image src={NarutoImage} alt="Naruto" />

        <ButtonContainer>
          <OpenButton
            href="https://anishdhandore.github.io/Portfolio/AnishDhandoreResumeCopy.pdf"
            target="_blank"
            rel="noopener noreferrer"
            isDarkMode={isDarkMode}
          >
            View CV
          </OpenButton>

          <AboutButton id="about" onClick={scrollToAbout} isDarkMode={isDarkMode}>
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
  text-color: ${props => props.isDarkMode ? '#c4babb' : '#2c3e50'};
`;

const HeroContent = styled.div`
  h1 {
    font-size: 3.0rem;
    color: ${props => props.isDarkMode ? '#c4babb' : '#2c3e50'};
    font-weight: 300;
  }

  p {
    font-size: 1.2rem;
    color: ${props => props.isDarkMode ? '#c4babb' : '#2c3e50'};
    font-weight: 300;
    margin-bottom: 2rem;
  }

  text {
    color: ${props => props.isDarkMode ? '#c4babb' : '#2c3e50'};
  }
`;

const Image = styled.img`
  width: 30%;
  max-width: 200px;
  height: auto;
  margin: 1rem 0;
`;

const ButtonContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const OpenButton = styled.a`
  background-color: transparent;
  color: ${props => props.isDarkMode ? '#484691' : '#2c3e50'};
  padding: 0.75rem 1.5rem;
  border: 2px solid ${props => props.isDarkMode ? '#0c0b24' : '#ecf0f1'};
  cursor: pointer;
  text-decoration: none;
  font-size: 1rem;
  border-radius: 5px;
  box-shadow: 0 0 0 2px ${props => props.isDarkMode ? '#484691' : '#95a5a6'};
  transition: all 0.3s ease;

  &:hover {
    color: ${props => props.isDarkMode ? '#0a091c' : '#34495e'};
  }
`;

const AboutButton = styled.a`
  background-color: ${props => props.isDarkMode ? '#484691' : '#3498db'};
  color: ${props => props.isDarkMode ? '#0a091c' : '#ffffff'};
  padding: 0.75rem 1.5rem;
  border: none;
  cursor: pointer;
  text-decoration: none;
  font-size: 1rem;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${props => props.isDarkMode ? '#0a091c' : '#2980b9'};
  }
`;

export default Home;