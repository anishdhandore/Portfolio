import React, { useState } from 'react';
import styled from 'styled-components';

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(true); // Default is dark mode

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Add logic here to toggle the theme throughout the website
  };

  return (
    <Nav>
      <Name
        href="https://github.com/anishdhandore"
        target="_blank"
        rel="noopener noreferrer"
      >
        Anish Dhandore
      </Name>
      <ToggleContainer>
        <ToggleSwitch onClick={toggleDarkMode} isDarkMode={isDarkMode}>
          <Slider isDarkMode={isDarkMode}></Slider>
        </ToggleSwitch>
      </ToggleContainer>
    </Nav>
  );
};

// ========== Styled Components ==========

const Nav = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  background: #040a1c;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 10rem;
  z-index: 1000;

  @media screen and (max-width: 768px) {
    padding: 1rem 1.5rem; /* Reduce horizontal padding on mobile */
  }
`;

const Name = styled.a`
  font-size: 1rem;
  color: #484691;
  font-weight: bold;
  text-decoration: none;

  &:hover {
    color: #c4babb;
  }
`;

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ToggleSwitch = styled.div`
  width: 60px;
  height: 30px;
  background-color: #484691;
  border-radius: 50px;
  position: relative;
  cursor: pointer;
`;

const Slider = styled.div`
  position: absolute;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: white;
  top: 1px;
  left: ${props => (props.isDarkMode ? '1px' : '31px')};
  transition: left 0.2s ease;
`;

export default Navbar;
