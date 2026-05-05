import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';

const NAV_LINKS = [
  { label: 'Home',       id: 'home' },
  { label: 'About',      id: 'about' },
  { label: 'Skills',     id: 'skills' },
  { label: 'Experience', id: 'experience' },
  { label: 'Projects',   id: 'portfolio' },
  { label: 'Contact',    id: 'contact' },
];

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active] = useState('home');

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - offset, behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && !e.target.closest('.dropdown-container')) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <Nav isDarkMode={isDarkMode} scrolled={scrolled}>
      <LeftSection>
        <DropdownContainer className="dropdown-container">
          <Burger onClick={() => setIsOpen(!isOpen)} isDarkMode={isDarkMode} aria-label="Toggle menu">
            <BurgerLine isOpen={isOpen} />
            <BurgerLine isOpen={isOpen} mid />
            <BurgerLine isOpen={isOpen} last />
          </Burger>
          {isOpen && (
            <DropdownMenu isDarkMode={isDarkMode}>
              {NAV_LINKS.map(({ label, id }) => (
                <DropdownItem key={id} onClick={() => scrollToSection(id)} isDarkMode={isDarkMode}>
                  {label}
                </DropdownItem>
              ))}
            </DropdownMenu>
          )}
        </DropdownContainer>

        <Logo
          href="https://github.com/anishdhandore"
          target="_blank"
          rel="noopener noreferrer"
          isDarkMode={isDarkMode}
        >
          AD
        </Logo>
      </LeftSection>

      <DesktopLinks>
        {NAV_LINKS.map(({ label, id }) => (
          <NavLink key={id} onClick={() => scrollToSection(id)} isDarkMode={isDarkMode} active={active === id}>
            {label}
          </NavLink>
        ))}
      </DesktopLinks>

      <RightSection>
        <ThemeToggle onClick={toggleTheme} isDarkMode={isDarkMode} aria-label="Toggle theme">
          <ToggleTrack isDarkMode={isDarkMode}>
            <ToggleThumb isDarkMode={isDarkMode} />
            <ToggleIcon left>{isDarkMode ? '☀️' : '🌙'}</ToggleIcon>
          </ToggleTrack>
        </ThemeToggle>
      </RightSection>
    </Nav>
  );
};

const Nav = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2.5rem;
  height: 64px;
  transition: background 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease;

  background: ${props => props.isDarkMode
    ? props.scrolled ? 'rgba(6,5,10,0.85)' : 'rgba(6,5,10,0.5)'
    : props.scrolled ? 'rgba(253,252,255,0.9)' : 'rgba(253,252,255,0.6)'};
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid ${props => props.isDarkMode
    ? props.scrolled ? 'rgba(139,92,246,0.2)' : 'rgba(139,92,246,0.08)'
    : props.scrolled ? 'rgba(124,58,237,0.15)' : 'rgba(124,58,237,0.05)'};

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const DropdownContainer = styled.div`
  position: relative;
  display: none;

  @media (max-width: 900px) {
    display: block;
  }
`;

const Burger = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.4rem;
  display: flex;
  flex-direction: column;
  gap: 5px;
  justify-content: center;
`;

const BurgerLine = styled.span`
  display: block;
  width: 22px;
  height: 2px;
  background: ${props => props.isDarkMode ? '#8B5CF6' : '#7C3AED'};
  border-radius: 2px;
  transition: all 0.25s ease;
  transform-origin: center;

  ${props => props.isOpen && !props.mid && !props.last && `transform: translateY(7px) rotate(45deg);`}
  ${props => props.mid && props.isOpen && `opacity: 0; transform: scaleX(0);`}
  ${props => props.last && props.isOpen && `transform: translateY(-7px) rotate(-45deg);`}
`;

const Logo = styled.a`
  font-size: 1rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  color: ${props => props.isDarkMode ? '#8B5CF6' : '#7C3AED'};
  text-decoration: none;
  transition: opacity 0.2s ease;

  &:hover { opacity: 0.7; }
`;

const DesktopLinks = styled.div`
  display: flex;
  gap: 0.25rem;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  @media (max-width: 900px) { display: none; }
`;

const NavLink = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.4rem 0.85rem;
  font-size: 0.85rem;
  font-weight: 500;
  letter-spacing: 0.03em;
  border-radius: 8px;
  color: ${props => props.isDarkMode
    ? props.active ? '#F1EEFF' : '#9D97B8'
    : props.active ? '#1C1528' : '#5C5470'};
  transition: color 0.2s ease, background 0.2s ease;

  &:hover {
    color: ${props => props.isDarkMode ? '#F1EEFF' : '#1C1528'};
    background: ${props => props.isDarkMode ? 'rgba(139,92,246,0.12)' : 'rgba(124,58,237,0.08)'};
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
`;

const ThemeToggle = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
`;

const ToggleTrack = styled.div`
  width: 52px;
  height: 28px;
  border-radius: 14px;
  background: ${props => props.isDarkMode ? 'rgba(139,92,246,0.3)' : 'rgba(124,58,237,0.15)'};
  border: 1px solid ${props => props.isDarkMode ? 'rgba(139,92,246,0.5)' : 'rgba(124,58,237,0.3)'};
  position: relative;
  transition: all 0.3s ease;
`;

const ToggleThumb = styled.div`
  position: absolute;
  top: 2px;
  left: ${props => props.isDarkMode ? '26px' : '2px'};
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: ${props => props.isDarkMode ? '#8B5CF6' : '#7C3AED'};
  transition: left 0.25s ease;
  box-shadow: 0 2px 8px rgba(139,92,246,0.4);
`;

const ToggleIcon = styled.span`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.7rem;
  ${props => props.left ? 'right: 5px;' : 'left: 5px;'}
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 0.75rem);
  left: 0;
  background: ${props => props.isDarkMode ? 'rgba(14,12,21,0.95)' : 'rgba(253,252,255,0.97)'};
  border: 1px solid ${props => props.isDarkMode ? 'rgba(139,92,246,0.25)' : 'rgba(124,58,237,0.15)'};
  border-radius: 12px;
  min-width: 180px;
  overflow: hidden;
  backdrop-filter: blur(20px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.3);
  animation: dropIn 0.2s ease-out;

  @keyframes dropIn {
    from { opacity: 0; transform: translateY(-8px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const DropdownItem = styled.div`
  padding: 0.85rem 1.25rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: ${props => props.isDarkMode ? '#9D97B8' : '#5C5470'};
  cursor: pointer;
  border-bottom: 1px solid ${props => props.isDarkMode ? 'rgba(139,92,246,0.08)' : 'rgba(124,58,237,0.06)'};
  transition: all 0.15s ease;

  &:last-child { border-bottom: none; }

  &:hover {
    background: ${props => props.isDarkMode ? 'rgba(139,92,246,0.12)' : 'rgba(124,58,237,0.08)'};
    color: ${props => props.isDarkMode ? '#F1EEFF' : '#1C1528'};
    padding-left: 1.5rem;
  }
`;

export default Navbar;
