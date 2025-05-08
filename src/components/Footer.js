// src/components/Footer.js
import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';

const Footer = () => {
  const { isDarkMode } = useTheme();
  return (
    <FooterContainer isDarkMode={isDarkMode}>
      <CopyrightText isDarkMode={isDarkMode}>© {new Date().getFullYear()} Anish Dhandore. All rights reserved.</CopyrightText>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  color: ${props => props.isDarkMode ? '#c4babb' : '#2c3e50'};
  padding: 1.5rem 0;
  text-align: center;
  font-size: 0.9rem;
  border-top: 1px solid ${props => props.isDarkMode ? '#3e4252' : '#e9ecef'};
  background-color: ${props => props.isDarkMode ? '#040a1c' : '#ffffff'};
  transition: all 0.3s ease;
`;

const CopyrightText = styled.p`
  margin: 0;
  font-weight: 300;
  color: ${props => props.isDarkMode ? '#c4babb' : '#2c3e50'};
  transition: color 0.3s ease;
`;

export default Footer;
