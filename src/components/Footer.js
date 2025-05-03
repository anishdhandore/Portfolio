// src/components/Footer.js
import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterContainer>
      <CopyrightText>© {new Date().getFullYear()} Anish Dhandore. All rights reserved.</CopyrightText>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  color: #c4babb; /* Subtle text color to match overall font style */
  padding: 1.5rem 0; /* Adds vertical space */
  text-align: center;
  font-size: 0.9rem; /* Slightly smaller text for a clean look */
  border-top: 1px solid #3e4252; /* Adds a subtle border for separation */
`;

const CopyrightText = styled.p`
  margin: 0;
  font-weight: 300; /* Light font weight to match the skinny look */
`;

export default Footer;
