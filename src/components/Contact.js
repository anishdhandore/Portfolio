// src/components/Contact.js
import React from 'react';
import styled from 'styled-components';
import { FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa';

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
          <a
            href="https://www.linkedin.com/in/anish-dhandore/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </Pill>
        <Pill>
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

  h2 {
    font-size: 1.5rem;
    color: #c4babb;
    font-weight: 300;
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
  background-color: #1b1f2e;
  padding: 0.8rem 1.5rem;
  border-radius: 50px;
  color: #ffffff;
  font-size: 1rem;
  font-family: 'Poppins', sans-serif;
  transition: background-color 0.3s ease;

  a {
    margin-left: 0.5rem;
    color: #ffffff;
    text-decoration: none;
  }

  &:hover {
    background-color: #3b3771;
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
