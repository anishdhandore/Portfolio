// src/components/Experience.js
import React from 'react';
import styled from 'styled-components';
import Swift from '../swift.jpg';
import GDSC from '../gdsc.jpg';
import CSUSM from '../csusm.jpg';
import SGS from '../sgs.jpg';

const Experience = () => {
  return (
    <ExperienceSection id="experience">
      <text>My Work</text>
      <h2>My Experience</h2>
      <br></br>
      <ExperienceContainer>
      <ExperienceItem>
          <Logo src={SGS} alt="Company Logo" />
          <ExperienceDetails>
            <h3>Wireless Engineer</h3>
            <CompanyName>SGS North America</CompanyName>
            <Duration>02/2025 - Present</Duration>
            <Description>
            Conducted RF testing and compliance verification on various electronic devices, ensuring adherence to regulatory standards such as FCC, CE, and industry-specific requirements. Operated and calibrated advanced RF test equipment including spectrum analyzers, signal generators, and network analyzers. Performed EMI/EMC tests, analyzed results, and supported documentation for technical reports. Collaborated with engineering teams to troubleshoot performance issues, optimize test procedures, and assist in device certification processes.            </Description>
          </ExperienceDetails>
        </ExperienceItem>
        <ExperienceItem>
          <Logo src={Swift} alt="Company Logo" />
          <ExperienceDetails>
            <h3>Developer</h3>
            <CompanyName>Swift Technologies</CompanyName>
            <Duration>03/2023 - 05/2023</Duration>
            <Description>
              Drove innovation on the front end of the company website by architecting a robust system to generate raffles for giveaways using React, Chakra UI, and Figma, enhancing user engagement and interaction. Orchestrated weekly team meetings to strategize and discuss the implementation of various tools, ensuring alignment with project timelines and objectives.
            </Description>
          </ExperienceDetails>
        </ExperienceItem>
        <ExperienceItem>
          <Logo src={GDSC} alt="Company Logo" />
          <ExperienceDetails>
            <h3>President</h3>
            <CompanyName>Google Developer Student Clubs</CompanyName>
            <Duration>01/2022 - 08/2024</Duration>
            <Description>
              Pioneered the introduction of students to Python GUI development, utilizing the Tkinter library, cultivating a hands-on learning environment. Facilitated and hosted dynamic workshops on foundational HTML and CSS properties, as well as web development frameworks like Flask and Django, empowering students to acquire practical skills for the evolving tech landscape.
            </Description>
          </ExperienceDetails>
        </ExperienceItem>
        <ExperienceItem>
          <Logo src={CSUSM} alt="Company Logo" />
          <ExperienceDetails>
            <h3>STEM Tutor</h3>
            <CompanyName>CSUSM STEM Success Center</CompanyName>
            <Duration>08/2021 - 12/2022</Duration>
            <Description>
              Mentored students in the fundamentals of programming and object-oriented programming in C++, elevating their understanding and proficiency in coding practices. Guided students in developing a diverse problem-solving mindset, encouraging critical thinking and reasoning approaches when tackling complex problem statements.
            </Description>
          </ExperienceDetails>
        </ExperienceItem>
      </ExperienceContainer>
    </ExperienceSection>
  );
};

const ExperienceSection = styled.section`
  background-color: #040a1c; /* Background color matching Home and About */
  padding: 5rem 0;
  text-align: center;

  h2 {
    font-size: 2.5rem;
    color: #484691; 
    margin-bottom: 2rem; /* Space below the heading */
  }
  
  text{
    color: #c4babb;
    font-size: 1rem;
  }
`;

const ExperienceContainer = styled.div`
  display: flex;
  flex-direction: column; /* Stack items vertically */
  align-items: center; /* Center align items */
  gap: 4rem; /* Space between items */
`;

const ExperienceItem = styled.div`
  display: flex; /* Use flexbox for item layout */
  align-items: center; /* Align logo and details */
  width: 80%; /* Adjust width as needed */
  max-width: 900px; /* Increased max width */
`;

const Logo = styled.img`
  width: 200px; /* Increased logo size */
  height: auto; /* Maintain aspect ratio */
  margin-right: 2rem; /* Increased space between logo and text */
`;

const ExperienceDetails = styled.div`
  text-align: left; /* Align text to the left */
  // color: #c4babb; /* Text color */
  color: #6e7280;
  
  h3 {
    font-size: 2.0rem; /* Increased font size for the job title */
    margin: 0; /* Remove default margin */
  }

  p {
    font-size: 1rem; /* Reduced font size for description text */
    margin: 0.5rem 0; /* Space between paragraphs */
  }
`;

const CompanyName = styled.p`
  font-weight: bold; /* Bold for company name */
  margin: 0.5rem 0; /* Space between paragraphs */
  font-size: 4rem; /* Larger size for company name */
`;

const Duration = styled.p`
  font-style: italic; /* Italic for duration */
  font-size: 1rem; /* Smaller font size for duration */
  margin: 0.5rem 0; /* Space between paragraphs */
`;

const Description = styled.p`
  font-size: 1rem; /* Reduced font size for description */
  margin: 0.5rem 0; /* Space between paragraphs */
  font-family: 'Poppins', sans-serif; /* Use Poppins font for job description */
`;

export default Experience;
