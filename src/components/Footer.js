import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';

const Footer = () => {
  const { isDarkMode } = useTheme();
  return (
    <FooterContainer isDarkMode={isDarkMode}>
      <Text isDarkMode={isDarkMode}>
        © {new Date().getFullYear()} Anish Dhandore. All rights reserved.
      </Text>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  padding: 1.75rem 2rem;
  text-align: center;
  border-top: 1px solid ${props => props.isDarkMode
    ? 'rgba(139,92,246,0.12)'
    : 'rgba(124,58,237,0.08)'};
  background: ${props => props.isDarkMode ? '#06050A' : '#FDFCFF'};
  transition: all 0.3s ease;
`;

const Text = styled.p`
  font-size: 0.82rem;
  font-weight: 400;
  color: ${props => props.isDarkMode ? '#5C5470' : '#9D97B8'};
  letter-spacing: 0.02em;
`;

export default Footer;
