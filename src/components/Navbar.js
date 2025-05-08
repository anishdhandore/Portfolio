import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <Nav isDarkMode={isDarkMode}>
      <Name
        href="https://github.com/anishdhandore"
        target="_blank"
        rel="noopener noreferrer"
        isDarkMode={isDarkMode}
      >
        Anish Dhandore
      </Name>
      <ToggleContainer>
        <ToggleSwitch onClick={toggleTheme} isDarkMode={isDarkMode}>
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
  background: ${props => props.isDarkMode ? '#040a1c' : '#ffffff'};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 10rem;
  z-index: 1000;
  transition: background-color 0.3s ease;

  @media screen and (max-width: 768px) {
    padding: 1rem 1.5rem;
  }
`;

const Name = styled.a`
  font-size: 1rem;
  color: ${props => props.isDarkMode ? '#484691' : '#2c3e50'};
  font-weight: bold;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: ${props => props.isDarkMode ? '#c4babb' : '#34495e'};
  }
`;

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ToggleSwitch = styled.div`
  width: 60px;
  height: 30px;
  background-color: ${props => props.isDarkMode ? '#484691' : '#95a5a6'};
  border-radius: 50px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s ease;
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