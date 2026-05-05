import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaTrophy, FaAward, FaRocket, FaCode, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import Swift from '../images/swift.jpg';
import GDSC from '../images/gdsc.jpg';
import CSUSM from '../images/csusm.jpg';
import SGS from '../images/sgs.jpg';
import { useTheme } from '../context/ThemeContext';

const Experience = () => {
  const { isDarkMode } = useTheme();
  const [visibleItems, setVisibleItems] = useState([]);
  const sectionRef = useRef(null);

  const experiences = [
    {
      logo: SGS,
      role: 'Software Engineer',
      company: 'SGS North America',
      duration: 'Feb 2025 – Present',
      location: 'San Diego, CA',
      icon: FaRocket,
      accent: '#F87171',
      badge: 'Current Role',
      current: true,
    },
    {
      logo: Swift,
      role: 'Software Developer',
      company: 'Swift Technologies',
      duration: 'Mar 2023 – May 2023',
      location: 'Remote',
      icon: FaCode,
      accent: '#34D399',
      badge: 'Frontend Master',
      current: false,
    },
    {
      logo: GDSC,
      role: 'President',
      company: 'Google Developer Student Clubs',
      duration: 'Jan 2022 – Aug 2024',
      location: 'CSUSM',
      icon: FaTrophy,
      accent: '#FBBF24',
      badge: 'Leadership',
      current: false,
    },
    {
      logo: CSUSM,
      role: 'STEM Tutor',
      company: 'CSUSM STEM Success Center',
      duration: 'Aug 2021 – Dec 2022',
      location: 'San Marcos, CA',
      icon: FaAward,
      accent: '#60A5FA',
      badge: 'Mentor',
      current: false,
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            experiences.forEach((_, i) => {
              setTimeout(() => setVisibleItems(prev => [...prev, i]), i * 180);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, []);

  return (
    <div className="responsive-container">
      <ExperienceSection id="experience" isDarkMode={isDarkMode} ref={sectionRef}>
        <SectionHeader>
          <SectionLabel isDarkMode={isDarkMode}>Work History</SectionLabel>
          <SectionTitle isDarkMode={isDarkMode}>Experience</SectionTitle>
          <SectionSub isDarkMode={isDarkMode}>The journey that shaped the engineer</SectionSub>
        </SectionHeader>

        <TimelineOuter>
          {experiences.map((exp, i) => {
            const Icon = exp.icon;
            const isLeft = i % 2 === 0;
            return (
              <TimelineRow key={exp.company} isLeft={isLeft} visible={visibleItems.includes(i)}>
                {/* Left slot */}
                <Slot left>
                  {isLeft && (
                    <ExpCard isDarkMode={isDarkMode} accentColor={exp.accent}>
                      <CardInner exp={exp} isDarkMode={isDarkMode} Icon={Icon} />
                    </ExpCard>
                  )}
                </Slot>

                {/* Center dot */}
                <DotSlot>
                  <Dot accentColor={exp.accent} isDarkMode={isDarkMode}>
                    <Icon size={13} color="#fff" />
                  </Dot>
                </DotSlot>

                {/* Right slot */}
                <Slot>
                  {!isLeft && (
                    <ExpCard isDarkMode={isDarkMode} accentColor={exp.accent}>
                      <CardInner exp={exp} isDarkMode={isDarkMode} Icon={Icon} />
                    </ExpCard>
                  )}
                </Slot>
              </TimelineRow>
            );
          })}
          <TimelineLine isDarkMode={isDarkMode} />
        </TimelineOuter>
      </ExperienceSection>
    </div>
  );
};

const CardInner = ({ exp, isDarkMode, Icon }) => (
  <>
    <CardTop>
      <LogoWrap>
        <Logo src={exp.logo} alt={exp.company} />
      </LogoWrap>
      <CardMeta>
        <Role isDarkMode={isDarkMode}>{exp.role}</Role>
        <Company accentColor={exp.accent}>{exp.company}</Company>
      </CardMeta>
      {exp.badge && (
        <Badge accentColor={exp.accent}>
          {exp.current && <PulseDot />}
          {exp.badge}
        </Badge>
      )}
    </CardTop>
    <CardDetails>
      <Detail isDarkMode={isDarkMode}>
        <FaCalendarAlt size={11} />
        {exp.duration}
      </Detail>
      <Detail isDarkMode={isDarkMode}>
        <FaMapMarkerAlt size={11} />
        {exp.location}
      </Detail>
    </CardDetails>
  </>
);

/* ── Animations ── */
const fadeLeft = keyframes`
  from { opacity: 0; transform: translateX(-24px); }
  to   { opacity: 1; transform: translateX(0); }
`;
const fadeRight = keyframes`
  from { opacity: 0; transform: translateX(24px); }
  to   { opacity: 1; transform: translateX(0); }
`;
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
`;
const blinkDot = keyframes`
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.3; }
`;

/* ── Sections ── */
const ExperienceSection = styled.section`
  padding: 5rem 1rem 4rem;
  background: ${props => props.isDarkMode
    ? 'linear-gradient(180deg, #06050A 0%, #0A0814 100%)'
    : 'linear-gradient(180deg, #FDFCFF 0%, #F3EEFF 100%)'};
  position: relative;
  z-index: 1;
  overflow: hidden;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 3.5rem;
  animation: ${fadeUp} 0.6s ease-out both;
`;

const SectionLabel = styled.div`
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: ${props => props.isDarkMode ? '#8B5CF6' : '#7C3AED'};
  margin-bottom: 0.6rem;
`;

const SectionTitle = styled.h2`
  font-size: clamp(1.8rem, 5vw, 3rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: ${props => props.isDarkMode ? '#F1EEFF' : '#1C1528'};
  margin-bottom: 0.5rem;
`;

const SectionSub = styled.p`
  font-size: 0.95rem;
  color: ${props => props.isDarkMode ? '#9D97B8' : '#5C5470'};
`;

/* ── Timeline layout ── */
const TimelineOuter = styled.div`
  position: relative;
  max-width: 860px;
  margin: 0 auto;
`;

const TimelineLine = styled.div`
  position: absolute;
  top: 0; bottom: 0;
  left: 50%;
  width: 2px;
  transform: translateX(-50%);
  background: linear-gradient(
    180deg,
    rgba(139,92,246,0.7) 0%,
    rgba(139,92,246,0.15) 85%,
    transparent 100%
  );
  pointer-events: none;

  @media (max-width: 620px) {
    left: 16px;
  }
`;

const TimelineRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 40px 1fr;
  align-items: start;
  margin-bottom: 2rem;
  opacity: ${props => props.visible ? 1 : 0};
  animation: ${props => props.visible
    ? (props.isLeft ? fadeLeft : fadeRight)
    : 'none'} 0.5s ease-out both;

  @media (max-width: 620px) {
    grid-template-columns: 40px 1fr;
  }
`;

const Slot = styled.div`
  padding: ${props => props.left ? '0 1.25rem 0 0' : '0 0 0 1.25rem'};

  @media (max-width: 620px) {
    /* left slot hides on mobile, card always goes in right slot */
    display: ${props => props.left ? 'none' : 'block'};
    padding: 0 0 0 0.75rem;
  }
`;

const DotSlot = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 1.5rem;
  position: relative;
  z-index: 2;

  @media (max-width: 620px) {
    padding-top: 1.25rem;
  }
`;

const Dot = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${props => props.accentColor}, ${props => props.accentColor}99);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid ${props => props.isDarkMode ? '#06050A' : '#FDFCFF'};
  box-shadow: 0 0 0 2px ${props => props.accentColor}55;
  flex-shrink: 0;
`;

/* ── Card ── */
const ExpCard = styled.div`
  background: ${props => props.isDarkMode
    ? 'rgba(14,12,21,0.75)'
    : 'rgba(255,255,255,0.88)'};
  border: 1px solid ${props => `${props.accentColor}22`};
  border-radius: 16px;
  padding: 1.25rem;
  backdrop-filter: blur(12px);
  box-shadow: 0 4px 20px ${props => props.isDarkMode ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.06)'};
  transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease;

  &:hover {
    border-color: ${props => `${props.accentColor}50`};
    box-shadow: 0 8px 28px ${props => `${props.accentColor}20`};
    transform: translateY(-2px);
  }
`;

const CardTop = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 0.85rem;
  flex-wrap: wrap;
`;

const LogoWrap = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 9px;
  overflow: hidden;
  flex-shrink: 0;
  background: rgba(139,92,246,0.1);
`;

const Logo = styled.img`
  width: 100%; height: 100%;
  object-fit: cover;
`;

const CardMeta = styled.div`
  flex: 1;
  min-width: 0;
`;

const Role = styled.div`
  font-size: 0.95rem;
  font-weight: 700;
  color: ${props => props.isDarkMode ? '#F1EEFF' : '#1C1528'};
  margin-bottom: 0.15rem;
`;

const Company = styled.div`
  font-size: 0.78rem;
  font-weight: 600;
  color: ${props => props.accentColor};
`;

const Badge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 0.25rem 0.55rem;
  border-radius: 7px;
  background: ${props => `${props.accentColor}18`};
  color: ${props => props.accentColor};
  border: 1px solid ${props => `${props.accentColor}35`};
  white-space: nowrap;
  flex-shrink: 0;
`;

const PulseDot = styled.div`
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #F87171;
  animation: ${blinkDot} 1.5s ease-in-out infinite;
`;

const CardDetails = styled.div`
  display: flex;
  gap: 0.85rem;
  flex-wrap: wrap;
`;

const Detail = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.76rem;
  color: ${props => props.isDarkMode ? '#9D97B8' : '#5C5470'};
  svg { opacity: 0.7; }
`;

export default Experience;
