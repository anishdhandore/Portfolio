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
      <Name href="https://github.com/anishdhandore" target="_blank" rel="noopener noreferrer">
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

const Nav = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  background: #040a1c;
  display: flex;
  justify-content: space-between; /* Space between name and toggle */
  align-items: center; /* Center items vertically */
  padding: 1rem 10rem;
  z-index: 1000;
`;

const Name = styled.a`
  font-size: 1rem;
  color: #484691;
  font-weight: bold;
  text-decoration: none; /* Remove underline */
  
  &:hover {
    color: #c4babb; /* Change color on hover */
  }
`;

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ToggleSwitch = styled.div`
  width: 65px;
  height: 34px;
  background-color: ${props => (props.isDarkMode ? '#484691' : '#484691')}; /* Change color based on mode */
  border-radius: 50px;
  position: relative;
  cursor: pointer;
  margin-left: auto; /* Align toggle to the right */
`;

const Slider = styled.div`
  position: absolute;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background-color: white;
  top: 0;
  left: ${props => (props.isDarkMode ? '0' : '32px')}; /* Move slider based on mode */
  transition: left 0.2s; /* Smooth transition */
`;

export default Navbar;
