// src/components/Contact.js
import React from 'react';
import styled from 'styled-components';
import { FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const Contact = () => {
  const { isDarkMode } = useTheme();
  return (
    <ContactSection id="contact" isDarkMode={isDarkMode}>
      <h2>Connect With Me!</h2>
      <ContactLinks>
        <Pill isDarkMode={isDarkMode}>
          <FaEnvelope />
          <a href="mailto:anish.dhandore@gmail.com">anish.dhandore@gmail.com</a>
        </Pill>
        <Pill isDarkMode={isDarkMode}>
          <FaLinkedin style={{ color: '#0e76a8' }} />
          <a
            href="https://www.linkedin.com/in/anish-dhandore/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </Pill>
        <Pill isDarkMode={isDarkMode}>
          <FaGithub />
          <a
            href="https://github.com/anishdhandore"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </Pill>
      </ContactLinks>
    </ContactSection>
  );
};

const ContactSection = styled.section`
  padding: 5rem 1rem;
  text-align: center;
  background-color: ${props => props.isDarkMode ? '#040a1c' : '#ffffff'};
  transition: background-color 0.3s ease;

  h2 {
    font-size: 1.5rem;
    color: ${props => props.isDarkMode ? '#c4babb' : '#2c3e50'};
    font-weight: 300;
    transition: color 0.3s ease;
  }
`;

const ContactLinks = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 2rem;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Pill = styled.div`
  display: flex;
  align-items: center;
  background-color: ${props => props.isDarkMode ? '#1b1f2e' : '#f8f9fa'};
  padding: 0.8rem 1.5rem;
  border-radius: 50px;
  color: ${props => props.isDarkMode ? '#ffffff' : '#2c3e50'};
  font-size: 1rem;
  font-family: 'Poppins', sans-serif;
  transition: all 0.3s ease;

  a {
    margin-left: 0.5rem;
    color: ${props => props.isDarkMode ? '#ffffff' : '#2c3e50'};
    text-decoration: none;
    transition: color 0.3s ease;
  }

  &:hover {
    background-color: ${props => props.isDarkMode ? '#3b3771' : '#e9ecef'};
  }

  svg {
    font-size: 1.3rem;
  }

  @media screen and (max-width: 768px) {
    width: 90%;
    justify-content: center;
  }
`;

export default Contact;
