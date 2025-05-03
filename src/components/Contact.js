// src/components/Contact.js
import React from 'react';
import styled from 'styled-components';
import { FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa'; // Importing icons

const Contact = () => {
  return (
    <ContactSection id="contact">
      <h2>Connect With Me!</h2>
      <ContactLinks>
        <Pill>
          <FaEnvelope />
          <a href="mailto:anish.dhandore@gmail.com">anish.dhandore@gmail.com</a>
        </Pill>
        <Pill>
          <FaLinkedin style={{ color: '#0e76a8' }} />
          <a href="https://www.linkedin.com/in/anish-dhandore/" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </Pill>
        <Pill>
          <FaGithub />
          <a href="https://github.com/anishdhandore" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </Pill>
      </ContactLinks>
    </ContactSection>
  );
};

const ContactSection = styled.section`
  padding: 5rem 0;
  text-align: center;

  h2 {
    font-size: 1.5rem;  /* Reduced font size */
    color: #c4babb;  /* Light and skinny font color */
    font-weight: 300;  /* Light weight for skinny text */
  }
`;

const ContactLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem; /* Spacing between pill buttons */
  margin-top: 2rem;
`;

const Pill = styled.div`
  display: flex;
  align-items: center;
  background-color: #1b1f2e; /* Button background color */
  padding: 0.8rem 1.5rem;
  border-radius: 50px; /* Pill shape */
  color: #ffffff;
  font-size: 1rem;
  font-family: 'Poppins', sans-serif; /* Using Poppins for nice fonts */
  transition: background-color 0.3s ease;
  
  a {
    margin-left: 0.5rem; /* Space between icon and text */
    color: #ffffff; /* Link text color */
    text-decoration: none;
  }

  &:hover {
    background-color: #3b3771; /* Darker color on hover */
  }

  svg {
    font-size: 1.3rem; /* Icon size */
  }
`;

export default Contact;
