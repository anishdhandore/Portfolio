import React from 'react';
import styled from 'styled-components';
import { FaBriefcase, FaProjectDiagram, FaHeadset } from 'react-icons/fa';
import MyPhoto from '../me.jpg'; // Update the path to your photo
import useTypewriterEffect from '../hooks/useTypewriterEffect'; // Import the hook

const About = () => {
  const typedDescription = useTypewriterEffect(
    "👋 Hello! I am a passionate technology developer, with expertise in several areas that come together to create effective and innovative solutions. My professional journey has been focused on driving efficiency and excellence through technology.",
    40 // Typing speed in milliseconds
  );

  return (
    <AboutSection id="about">
      <TitleContainer>
        <AboutMeTitle>About Me</AboutMeTitle>
      </TitleContainer>
      <AboutContent>
        <ImageContainer>
          <ProfileImage src={MyPhoto} alt="My Photo" />
        </ImageContainer>
        <RightContent>
          <ButtonsContainer>
            <ExperienceButton>
              <IconContainer>
                <FaBriefcase size={40} color="#c4babb" /> {/* Experience icon */}
              </IconContainer>
              <ButtonText>Experience</ButtonText>
              <YearsText>4 Years</YearsText>
            </ExperienceButton>
            <ProjectsButton>
              <IconContainer>
                <FaProjectDiagram size={40} color="#c4babb" /> {/* Project icon */}
              </IconContainer>
              <ButtonText>Projects</ButtonText>
              <YearsText>20+ Completed Projects</YearsText>
            </ProjectsButton>
            <SupportButton>
              <IconContainer>
                <FaHeadset size={40} color="#c4babb" /> {/* Support icon */}
              </IconContainer>
              <ButtonText>Support</ButtonText>
              <YearsText>Online 24/7</YearsText>
            </SupportButton>
          </ButtonsContainer>
          <DescriptionText>
            {typedDescription}
          </DescriptionText>
        </RightContent>
      </AboutContent>
    </AboutSection>
  );
};

const AboutSection = styled.section`
  padding: 2rem; /* Space around the section */
  padding-top: 2rem; /* Reduced padding at the top to bring sections closer */
  background-color: #040a1c; /* Background color */
  color: #c4babb; /* Text color */
`;

const TitleContainer = styled.div`
  text-align: center; /* Center align titles */
  margin-bottom: 1.5rem; /* Space below titles */
`;

const AboutMeTitle = styled.h3`
  font-size: 2.5rem; /* Adjust font size for "About Me" */
  margin: 0; /* Remove default margin */
  color: #484691; /* Change font color */
`;

const AboutContent = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const ImageContainer = styled.div`
  flex: 1; /* Take up one part of the flex container */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: 80%; /* Adjust image size to be smaller */
  max-width: 280px; /* Set a max width */
  height: auto; /* Maintain aspect ratio */
  border-radius: 10px; /* Rounded corners for the image */
  margin-top: 0.5rem; /* Adjusted margin to lift the image slightly */
`;

const RightContent = styled.div`
  flex: 1; /* Take up one part of the flex container */
  display: flex;
  flex-direction: column; /* Arrange buttons and description vertically */
  align-items: flex-start; /* Align items to the left */
  padding-top: 50px;
`;

const ButtonsContainer = styled.div`
  display: flex; /* Change to flex to place buttons next to each other */
  gap: 1.5rem; /* Increased space between buttons */
  margin-bottom: 1rem; /* Space below buttons */
`;

const ExperienceButton = styled.div`
  background-color: #241e20; /* Match the background */
  color: #c4babb;
  width: 150px; /* Set fixed width for square shape */
  height: 150px; /* Set fixed height for square shape */
  border: none;
  border-radius: 10px; /* Rounded corners */
  display: flex;
  flex-direction: column; /* Align text and icon vertically */
  align-items: center; /* Center align items */
  justify-content: center; /* Center align items */
  cursor: default; /* Not clickable */
`;

const ProjectsButton = styled.div`
  background-color: #241e20; /* Match the background */
  color: #c4babb;
  width: 150px; /* Set fixed width for square shape */
  height: 150px; /* Set fixed height for square shape */
  border: none;
  border-radius: 10px; /* Rounded corners */
  display: flex;
  flex-direction: column; /* Align text and icon vertically */
  align-items: center; /* Center align items */
  justify-content: center; /* Center align items */
  cursor: default; /* Not clickable */
`;

const SupportButton = styled.div`
  background-color: #241e20; /* Match the background */
  color: #c4babb;
  width: 150px; /* Set fixed width for square shape */
  height: 150px; /* Set fixed height for square shape */
  border: none;
  border-radius: 10px; /* Rounded corners */
  display: flex;
  flex-direction: column; /* Align text and icon vertically */
  align-items: center; /* Center align items */
  justify-content: center; /* Center align items */
  cursor: default; /* Not clickable */
`;

const IconContainer = styled.div`
  margin-bottom: 0.5rem; /* Space between icon and text */
`;

const ButtonText = styled.span`
  font-size: 1rem; /* Adjust font size for button text */
  color: #c4babb; /* Font color */
`;

const YearsText = styled.span`
  font-size: 0.8rem; /* Smaller font size for years */
  color: #c4babb; /* Font color */
  text-align: center; /* Center the text */
`;

const DescriptionText = styled.p`
  text-align: left; /* Align description text to the left */
  color: #c4babb; /* Font color */
  font-size: 1rem; /* Font size for description */
  margin-top: 1rem; /* Space above the description */
`;

export default About;
