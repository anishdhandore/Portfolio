import React from 'react';
import styled from 'styled-components';
import Swift from '../swift.jpg';
import GDSC from '../gdsc.jpg';
import CSUSM from '../csusm.jpg';
import SGS from '../sgs.jpg';
import { useTheme } from '../context/ThemeContext';

const experiences = [
  {
    logo: SGS,
    role: 'Wireless Engineer',
    company: 'SGS North America',
    duration: '02/2025 - Present',
    description:
      'Conducted RF testing and compliance verification on various electronic devices, ensuring adherence to regulatory standards such as FCC, CE, and industry-specific requirements. Operated and calibrated advanced RF test equipment including spectrum analyzers, signal generators, and network analyzers. Performed EMI/EMC tests, analyzed results, and supported documentation for technical reports. Collaborated with engineering teams to troubleshoot performance issues, optimize test procedures, and assist in device certification processes.',
  },
  {
    logo: Swift,
    role: 'Developer',
    company: 'Swift Technologies',
    duration: '03/2023 - 05/2023',
    description:
      'Drove innovation on the front end of the company website by architecting a robust system to generate raffles for giveaways using React, Chakra UI, and Figma, enhancing user engagement and interaction. Orchestrated weekly team meetings to strategize and discuss the implementation of various tools, ensuring alignment with project timelines and objectives.',
  },
  {
    logo: GDSC,
    role: 'President',
    company: 'Google Developer Student Clubs',
    duration: '01/2022 - 08/2024',
    description:
      'Pioneered the introduction of students to Python GUI development, utilizing the Tkinter library. Facilitated dynamic workshops on foundational HTML/CSS as well as frameworks like Flask and Django.',
  },
  {
    logo: CSUSM,
    role: 'STEM Tutor',
    company: 'CSUSM STEM Success Center',
    duration: '08/2021 - 12/2022',
    description:
      'Mentored students in programming and OOP in C++. Guided them in developing critical problem-solving skills and debugging techniques through collaborative learning.',
  },
];

const Experience = () => {
  const { isDarkMode } = useTheme();
  return (
    <ExperienceSection id="experience" isDarkMode={isDarkMode}>
      <Subtitle isDarkMode={isDarkMode}>My Work</Subtitle>
      <Heading isDarkMode={isDarkMode}>My Experience</Heading>

      <ExperienceContainer>
        {experiences.map((exp, index) => (
          <ExperienceItem key={index} isDarkMode={isDarkMode}>
            <Logo src={exp.logo} alt="Company Logo" />
            <Details isDarkMode={isDarkMode}>
              <Role isDarkMode={isDarkMode}>{exp.role}</Role>
              <Company isDarkMode={isDarkMode}>{exp.company}</Company>
              <Duration isDarkMode={isDarkMode}>{exp.duration}</Duration>
              <Description isDarkMode={isDarkMode}>{exp.description}</Description>
            </Details>
          </ExperienceItem>
        ))}
      </ExperienceContainer>
    </ExperienceSection>
  );
};

const ExperienceSection = styled.section`
  background-color: ${props => props.isDarkMode ? '#040a1c' : '#ffffff'};
  padding: 5rem 1rem;
  text-align: center;
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
  margin-bottom: 3rem;
  transition: color 0.3s ease;
`;

const ExperienceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rem;
`;

const ExperienceItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  max-width: 900px;
  padding: 1.5rem;
  gap: 2rem;
  background-color: ${props => props.isDarkMode ? 'transparent' : '#f8f9fa'};
  border-radius: 10px;
  transition: background-color 0.3s ease;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    align-items: center;
  }
`;

const Logo = styled.img`
  width: 180px;
  max-width: 100%;
  max-height: 140px;
  object-fit: contain;
  border-radius: 8px;

  @media screen and (max-width: 768px) {
    max-height: 120px;
  }
`;

const Details = styled.div`
  flex: 1;
  color: ${props => props.isDarkMode ? '#c4babb' : '#2c3e50'};
  text-align: left;
  transition: color 0.3s ease;

  @media screen and (max-width: 768px) {
    text-align: center;
  }
`;

const Role = styled.h3`
  font-size: 1.5rem;
  margin: 0.5rem 0;
  color: ${props => props.isDarkMode ? '#c4babb' : '#2c3e50'};
  transition: color 0.3s ease;
`;

const Company = styled.p`
  font-weight: bold;
  font-size: 1.1rem;
  margin: 0.3rem 0;
  color: ${props => props.isDarkMode ? '#c4babb' : '#2c3e50'};
  transition: color 0.3s ease;
`;

const Duration = styled.p`
  font-style: italic;
  font-size: 0.9rem;
  margin-bottom: 0.8rem;
  color: ${props => props.isDarkMode ? '#c4babb' : '#2c3e50'};
  transition: color 0.3s ease;
`;

const Description = styled.p`
  font-size: 0.95rem;
  line-height: 1.5;
  color: ${props => props.isDarkMode ? '#c4babb' : '#2c3e50'};
  transition: color 0.3s ease;
`;

export default Experience;