import React from 'react';
import styled from 'styled-components';
import { FaBriefcase, FaProjectDiagram, FaHeadset } from 'react-icons/fa';
import MyPhoto from '../me.jpg';
import useTypewriterEffect from '../hooks/useTypewriterEffect';

const About = () => {
  const typedDescription = useTypewriterEffect(
    "👋 Hello! I am a passionate technology developer, with expertise in several areas that come together to create effective and innovative solutions. My professional journey has been focused on driving efficiency and excellence through technology.",
    40
  );

  return (
    <div className="responsive-container">
      <AboutSection id="about">
        <TitleContainer>
          <AboutMeTitle>About Me</AboutMeTitle>
        </TitleContainer>

        <TopContent>
          <ImageContainer>
            <ProfileImage src={MyPhoto} alt="My Photo" />
          </ImageContainer>

          <TextAndButtonsWrapper>
            <DescriptionWrapper>
              <DescriptionText>{typedDescription}</DescriptionText>
            </DescriptionWrapper>

            <ButtonsContainer>
              <InfoButton>
                <FaBriefcase size={34} color="#c4babb" />
                <ButtonText>Experience</ButtonText>
                <YearsText>4 Years</YearsText>
              </InfoButton>
              <InfoButton>
                <FaProjectDiagram size={34} color="#c4babb" />
                <ButtonText>Projects</ButtonText>
                <YearsText>20+ Completed Projects</YearsText>
              </InfoButton>
              <InfoButton>
                <FaHeadset size={34} color="#c4babb" />
                <ButtonText>Support</ButtonText>
                <YearsText>Online 24/7</YearsText>
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
  background-color: #040a1c;
  color: #c4babb;
`;

const TitleContainer = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
`;

const AboutMeTitle = styled.h3`
  font-size: 2.5rem;
  margin: 0;
  color: #484691;
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

  @media screen and (max-width: 768px) {
    align-items: center;
    text-align: center;
  }
`;

const DescriptionWrapper = styled.div`
  max-width: 600px;

  @media screen and (max-width: 768px) {
    margin: 0 auto;
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;


const DescriptionText = styled.p`
  font-size: 1rem;
  color: #c4babb;
  line-height: 1.6;
  margin-top: 1rem;
  word-break: break-word;

  @media screen and (max-width: 768px) {
    padding: 0 1rem;
    text-align: center;
    max-width: 100%;
  }
`;


const ButtonsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const InfoButton = styled.div`
  background-color: #241e20;
  color: #c4babb;
  width: 120px;
  height: 120px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px;

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
`;

const YearsText = styled.span`
  font-size: 0.75rem;
  text-align: center;
  margin-top: 0.2rem;
`;

export default About;
