import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const offset = 80; // Account for navbar height
      const sectionTop = section.getBoundingClientRect().top + window.pageYOffset - offset;
      
      window.scrollTo({
        top: sectionTop,
        behavior: 'smooth',
        duration: 3000 // Increased duration for gentler scrolling
      });
      
      setIsOpen(false);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.dropdown-container')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <Nav isDarkMode={isDarkMode}>
      <LeftSection>
        <DropdownContainer className="dropdown-container">
          <DropdownButton onClick={() => setIsOpen(!isOpen)} isDarkMode={isDarkMode}>
            <HamburgerIcon isOpen={isOpen}>
              <span></span>
              <span></span>
              <span></span>
            </HamburgerIcon>
          </DropdownButton>
          {isOpen && (
            <DropdownMenu isDarkMode={isDarkMode}>
              <DropdownItem onClick={() => scrollToSection('home')} isDarkMode={isDarkMode}>
                <span role="img" aria-label="Home">✨</span> Home
              </DropdownItem>
              <DropdownItem onClick={() => scrollToSection('about')} isDarkMode={isDarkMode}>
                <span role="img" aria-label="About">🎯</span> About
              </DropdownItem>
              <DropdownItem onClick={() => scrollToSection('skills')} isDarkMode={isDarkMode}>
                <span role="img" aria-label="Skills">⚡</span> Skills
              </DropdownItem>
              <DropdownItem onClick={() => scrollToSection('experience')} isDarkMode={isDarkMode}>
                <span role="img" aria-label="Experience">💼</span> Experience
              </DropdownItem>
              <DropdownItem onClick={() => scrollToSection('portfolio')} isDarkMode={isDarkMode}>
                <span role="img" aria-label="Projects">🎨</span> Projects
              </DropdownItem>
              <DropdownItem onClick={() => scrollToSection('contact')} isDarkMode={isDarkMode}>
                <span role="img" aria-label="Contact">💫</span> Contact
              </DropdownItem>
            </DropdownMenu>
          )}
        </DropdownContainer>
        <Name
          href="https://github.com/anishdhandore"
          target="_blank"
          rel="noopener noreferrer"
          isDarkMode={isDarkMode}
        >
          Anish Dhandore
        </Name>
      </LeftSection>
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

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
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

const DropdownContainer = styled.div`
  position: relative;
`;

const DropdownButton = styled.button`
  background: transparent;
  border: none;
  color: ${props => props.isDarkMode ? '#484691' : '#2c3e50'};
  padding: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const HamburgerIcon = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 24px;
  height: 18px;
  cursor: pointer;
  transition: all 0.3s ease;

  span {
    display: block;
    width: 100%;
    height: 2px;
    background-color: ${props => props.isDarkMode ? '#484691' : '#2c3e50'};
    transition: all 0.3s ease;
  }

  ${props => props.isOpen && `
    span:first-child {
      transform: translateY(8px) rotate(45deg);
    }
    span:nth-child(2) {
      opacity: 0;
    }
    span:last-child {
      transform: translateY(-8px) rotate(-45deg);
    }
  `}
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 0.5rem;
  background: ${props => props.isDarkMode ? 'rgba(4, 10, 28, 0.95)' : '#ffffff'};
  border: 1px solid ${props => props.isDarkMode ? 'rgba(72, 70, 145, 0.3)' : '#2c3e50'};
  border-radius: 10px;
  min-width: 200px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
  animation: fadeIn 0.2s ease-in-out;
  overflow: hidden;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
`;

const DropdownItem = styled.div`
  padding: 1rem 1.5rem;
  color: ${props => props.isDarkMode ? '#c4babb' : '#2c3e50'};
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 1rem;
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid ${props => props.isDarkMode ? 'rgba(72, 70, 145, 0.1)' : 'transparent'};

  &:last-child {
    border-bottom: none;
  }

  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 3px;
    background: ${props => props.isDarkMode ? '#c4babb' : '#3498db'};
    transform: scaleY(0);
    transition: transform 0.2s ease;
  }

  &:hover {
    background: ${props => props.isDarkMode ? 'rgba(72, 70, 145, 0.15)' : 'rgba(52, 152, 219, 0.1)'};
    color: ${props => props.isDarkMode ? '#ffffff' : '#3498db'};
    padding-left: 2rem;

    &:before {
      transform: scaleY(1);
    }

    span[role="img"] {
      transform: scale(1.1);
    }
  }

  span[role="img"] {
    transition: transform 0.2s ease;
  }

  &:first-child {
    border-radius: 10px 10px 0 0;
  }

  &:last-child {
    border-radius: 0 0 10px 10px;
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
  left: ${props => (props.isDarkMode ? '31px' : '1px')};
  transition: left 0.2s ease;
`;

export default Navbar;
