import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FaEnvelope, FaLinkedin, FaGithub, FaArrowRight } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const LINKS = [
  { icon: FaEnvelope, label: 'Email', href: 'mailto:anish.dhandore@gmail.com', display: 'anish.dhandore@gmail.com', color: '#F87171' },
  { icon: FaLinkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/anish-dhandore/', display: 'linkedin.com/in/anish-dhandore', color: '#60A5FA', external: true },
  { icon: FaGithub,   label: 'GitHub',   href: 'https://github.com/anishdhandore', display: 'github.com/anishdhandore', color: '#A78BFA', external: true },
];

const Contact = () => {
  const { isDarkMode } = useTheme();

  return (
    <ContactSection id="contact" isDarkMode={isDarkMode}>
      <Inner>
        <SectionLabel isDarkMode={isDarkMode}>Get In Touch</SectionLabel>
        <Heading isDarkMode={isDarkMode}>Connect With Me</Heading>
        <Sub isDarkMode={isDarkMode}>
          Open to opportunities, collaborations, or just a chat about tech.
        </Sub>

        <LinkList>
          {LINKS.map(({ icon: Icon, label, href, display, color, external }) => (
            <ContactLink
              key={label}
              href={href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              isDarkMode={isDarkMode}
              accentColor={color}
            >
              <IconWrap accentColor={color}>
                <Icon size={20} />
              </IconWrap>
              <LinkText>
                <LinkLabel isDarkMode={isDarkMode}>{label}</LinkLabel>
                <LinkDisplay isDarkMode={isDarkMode}>{display}</LinkDisplay>
              </LinkText>
              <Arrow isDarkMode={isDarkMode}>
                <FaArrowRight size={14} />
              </Arrow>
            </ContactLink>
          ))}
        </LinkList>
      </Inner>
    </ContactSection>
  );
};

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const ContactSection = styled.section`
  padding: 5rem 2rem 6rem;
  background: ${props => props.isDarkMode
    ? 'linear-gradient(180deg, #06050A 0%, #0A0814 100%)'
    : 'linear-gradient(180deg, #FDFCFF 0%, #F3EEFF 100%)'};
  position: relative;
  z-index: 1;
`;

const Inner = styled.div`
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  animation: ${fadeUp} 0.6s ease-out both;
`;

const SectionLabel = styled.div`
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: ${props => props.isDarkMode ? '#8B5CF6' : '#7C3AED'};
  margin-bottom: 0.75rem;
`;

const Heading = styled.h2`
  font-size: clamp(2rem, 5vw, 2.75rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: ${props => props.isDarkMode ? '#F1EEFF' : '#1C1528'};
  margin-bottom: 1rem;
`;

const Sub = styled.p`
  font-size: 1rem;
  color: ${props => props.isDarkMode ? '#9D97B8' : '#5C5470'};
  margin-bottom: 2.5rem;
  line-height: 1.7;
`;

const LinkList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
`;

const ContactLink = styled.a`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.1rem 1.35rem;
  border-radius: 14px;
  text-decoration: none;
  background: ${props => props.isDarkMode
    ? 'rgba(14,12,21,0.7)'
    : 'rgba(255,255,255,0.85)'};
  border: 1px solid ${props => `${props.accentColor}22`};
  backdrop-filter: blur(12px);
  box-shadow: 0 2px 12px ${props => props.isDarkMode ? 'rgba(0,0,0,0.25)' : 'rgba(0,0,0,0.05)'};
  transition: all 0.25s ease;

  &:hover {
    border-color: ${props => `${props.accentColor}55`};
    box-shadow: 0 6px 24px ${props => `${props.accentColor}20`};
    transform: translateY(-2px);
  }
`;

const IconWrap = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: ${props => `${props.accentColor}18`};
  border: 1px solid ${props => `${props.accentColor}30`};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.accentColor};
  flex-shrink: 0;
  transition: background 0.2s ease;

  ${ContactLink}:hover & {
    background: ${props => `${props.accentColor}28`};
  }
`;

const LinkText = styled.div`
  flex: 1;
  text-align: left;
`;

const LinkLabel = styled.div`
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${props => props.isDarkMode ? '#9D97B8' : '#5C5470'};
  margin-bottom: 0.15rem;
`;

const LinkDisplay = styled.div`
  font-size: 0.9rem;
  font-weight: 500;
  color: ${props => props.isDarkMode ? '#F1EEFF' : '#1C1528'};
`;

const Arrow = styled.div`
  color: ${props => props.isDarkMode ? '#5C5470' : '#9D97B8'};
  transition: transform 0.2s ease, color 0.2s ease;
  flex-shrink: 0;

  ${ContactLink}:hover & {
    transform: translateX(3px);
    color: ${props => props.isDarkMode ? '#8B5CF6' : '#7C3AED'};
  }
`;

export default Contact;
