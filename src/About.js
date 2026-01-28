import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FaBriefcase, FaProjectDiagram, FaHeadset } from 'react-icons/fa';
import MyPhoto from './images/me.jpg';
import useTypewriterEffect from '../hooks/useTypewriterEffect';
import { useTheme } from '../context/ThemeContext';

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

const About = () => {
  const { isDarkMode } = useTheme();
  const typedDescription = useTypewriterEffect(
    "👋 Hello! I am a passionate technology developer, with expertise in several areas that come together to create effective and innovative solutions. My professional journey has been focused on driving efficiency and excellence through technology.",
    20
  );

  return (
    <div className="responsive-container">
      <AboutSection id="about" isDarkMode={isDarkMode}>
        <TitleContainer>
          <AboutMeTitle isDarkMode={isDarkMode}>About Me</AboutMeTitle>
        </TitleContainer>

        <TopContent>
          <ImageContainer>
            <ProfileImage src={MyPhoto} alt="My Photo" />
          </ImageContainer>

          <TextAndButtonsWrapper>
            <DescriptionWrapper>
              <DescriptionText isDarkMode={isDarkMode}>{typedDescription}</DescriptionText>
            </DescriptionWrapper>

            <ButtonsContainer>
              <InfoButton isDarkMode={isDarkMode}>
                <FaBriefcase size={34} color={isDarkMode ? "#c4babb" : "#2c3e50"} />
                <ButtonText isDarkMode={isDarkMode}>Experience</ButtonText>
                <YearsText isDarkMode={isDarkMode}>4 Years</YearsText>
              </InfoButton>
              <InfoButton isDarkMode={isDarkMode}>
                <FaProjectDiagram size={34} color={isDarkMode ? "#c4babb" : "#2c3e50"} />
                <ButtonText isDarkMode={isDarkMode}>Projects</ButtonText>
                <YearsText isDarkMode={isDarkMode}>20+ Completed Projects</YearsText>
              </InfoButton>
              <InfoButton isDarkMode={isDarkMode}>
                <FaHeadset size={34} color={isDarkMode ? "#c4babb" : "#2c3e50"} />
                <ButtonText isDarkMode={isDarkMode}>Support</ButtonText>
                <YearsText isDarkMode={isDarkMode}>Online 24/7</YearsText>
              </InfoButton>
            </ButtonsContainer>
          </TextAndButtonsWrapper>
        </TopContent>
      </AboutSection>
    </div>
  );
};

const AboutSection = styled.section`
  padding: 2rem;
  background-color: ${props => props.isDarkMode ? '#040a1c' : '#ffffff'};
  color: ${props => props.isDarkMode ? '#c4babb' : '#2c3e50'};
  transition: background-color 0.3s ease, color 0.3s ease;
  position: relative;
  z-index: 1;
  margin-bottom: 0;
  border-bottom: none;
  box-shadow: none;
`;

const TitleContainer = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
  animation: ${fadeIn} 0.3s ease-out;
`;

const AboutMeTitle = styled.h3`
  font-size: 2.5rem;
  margin: 0;
  color: ${props => props.isDarkMode ? '#484691' : '#2c3e50'};
  transition: color 0.3s ease;
`;

const DescriptionWrapper = styled.div`
  max-width: 600px;
  animation: ${fadeIn} 0.3s ease-out;

  @media screen and (max-width: 768px) {
    margin: 0 auto;
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;

const DescriptionText = styled.p`
  font-size: 1rem;
  color: ${props => props.isDarkMode ? '#c4babb' : '#2c3e50'};
  line-height: 1.6;
  margin-top: 1rem;
  word-break: break-word;
  transition: color 0.5s ease;

  @media screen and (max-width: 768px) {
    padding: 0 1rem;
    text-align: center;
    max-width: 100%;
  }
`;

const TopContent = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const ProfileImage = styled.img`
  width: 100%;
  max-width: 250px;
  height: auto;
  border-radius: 10px;
`;

const TextAndButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;

  @media screen and (max-width: 768px) {
    align-items: center;
    text-align: center;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-top: 1.5rem;
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
`;

const InfoButton = styled.div`
  background-color: ${props => props.isDarkMode ? '#241e20' : '#f8f9fa'};
  color: ${props => props.isDarkMode ? '#c4babb' : '#2c3e50'};
  width: 120px;
  height: 120px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px;
  transition: background-color 0.3s ease, color 0.3s ease;
  border: none;
  box-shadow: none;

  @media screen and (max-width: 480px) {
    width: 95px;
    height: 95px;
    padding: 6px;
  }
`;

const ButtonText = styled.span`
  font-size: 0.9rem;
  margin-top: 0.4rem;
  text-align: center;
  color: ${props => props.isDarkMode ? '#c4babb' : '#2c3e50'};
  transition: color 0.3s ease;
`;

const YearsText = styled.span`
  font-size: 0.8rem;
  color: ${props => props.isDarkMode ? '#c4babb' : '#2c3e50'};
  transition: color 0.3s ease;
`;

export default About;
