import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaBriefcase, FaTrophy, FaAward, FaRocket, FaCode } from 'react-icons/fa';
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
      duration: 'Feb 2025 - Present',
      location: 'San Diego, CA',
      icon: FaRocket,
      color: '#FF6B6B',
      achievement: 'Current Role',
    },
    {
      logo: Swift,
      role: 'Software Developer',
      company: 'Swift Technologies',
      duration: 'Mar 2023 - May 2023',
      location: 'Remote',
      icon: FaCode,
      color: '#4ECDC4',
      achievement: 'Frontend Master',
    },
    {
      logo: GDSC,
      role: 'President',
      company: 'Google Developer Student Clubs',
      duration: 'Jan 2022 - Aug 2024',
      location: 'CSUSM',
      icon: FaTrophy,
      color: '#FFE66D',
      achievement: 'Leadership',
    },
    {
      logo: CSUSM,
      role: 'STEM Tutor',
      company: 'CSUSM STEM Success Center',
      duration: 'Aug 2021 - Dec 2022',
      location: 'San Marcos, CA',
      icon: FaAward,
      color: '#95E1D3',
      achievement: 'Mentor',
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            experiences.forEach((_, index) => {
              setTimeout(() => {
                setVisibleItems((prev) => [...prev, index]);
              }, index * 200);
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <ExperienceSection id="experience" isDarkMode={isDarkMode} ref={sectionRef}>
      <TitleContainer>
        <Subtitle isDarkMode={isDarkMode}>Career Journey</Subtitle>
        <Heading isDarkMode={isDarkMode}>
          <TitleIcon>💼</TitleIcon>
          Experience Timeline
        </Heading>
      </TitleContainer>

      <TimelineContainer>
        <TimelineLine isDarkMode={isDarkMode} />
        {experiences.map((exp, index) => {
          const Icon = exp.icon;
          const isVisible = visibleItems.includes(index);
          const isEven = index % 2 === 0;

          return (
            <TimelineItem
              key={index}
              isVisible={isVisible}
              isEven={isEven}
              delay={index * 200}
            >
              <TimelineNode
                isDarkMode={isDarkMode}
                color={exp.color}
                isVisible={isVisible}
              >
                <NodeIcon color={exp.color}>
                  <Icon size={20} />
                </NodeIcon>
                <NodeGlow color={exp.color} />
              </TimelineNode>

              <ExperienceCard
                isDarkMode={isDarkMode}
                isEven={isEven}
                isVisible={isVisible}
                color={exp.color}
              >
                <CardHeader>
                  <LogoContainer color={exp.color}>
                    <Logo src={exp.logo} alt={`${exp.company} Logo`} />
                  </LogoContainer>
                  <CardInfo>
                    <RoleBadge color={exp.color}>
                      {exp.role}
                    </RoleBadge>
                    <CompanyName isDarkMode={isDarkMode}>{exp.company}</CompanyName>
                    <DurationBadge isDarkMode={isDarkMode}>
                      <FaBriefcase size={12} />
                      {exp.duration}
                    </DurationBadge>
                    <LocationBadge isDarkMode={isDarkMode}>
                      📍 {exp.location}
                    </LocationBadge>
                  </CardInfo>
                </CardHeader>
                <AchievementBadge color={exp.color}>
                  <FaTrophy size={14} />
                  {exp.achievement}
                </AchievementBadge>
              </ExperienceCard>
            </TimelineItem>
          );
        })}
      </TimelineContainer>
    </ExperienceSection>
  );
};

const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.5);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.9;
  }
`;

const glow = keyframes`
  0%, 100% {
    box-shadow: 0 0 20px rgba(72, 70, 145, 0.5);
  }
  50% {
    box-shadow: 0 0 40px rgba(72, 70, 145, 0.8);
  }
`;

const ExperienceSection = styled.section`
  background: ${props => props.isDarkMode 
    ? 'linear-gradient(180deg, #040a1c 0%, #0a0f1f 100%)' 
    : 'linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%)'};
  padding: 3rem 2rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 50% 50%, ${props => props.isDarkMode ? 'rgba(72, 70, 145, 0.05)' : 'rgba(52, 152, 219, 0.03)'}, transparent 70%);
    pointer-events: none;
  }

  @media screen and (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const TitleContainer = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
  z-index: 2;
`;

const Subtitle = styled.p`
  color: ${props => props.isDarkMode ? '#c4babb' : '#7f8c8d'};
  font-size: 1rem;
  margin-bottom: 0.5rem;
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const TitleIcon = styled.span`
  font-size: 2.5rem;
  display: inline-block;
  margin-right: 0.75rem;
  animation: ${pulse} 2s ease-in-out infinite;
`;

const Heading = styled.h2`
  font-size: 3rem;
  background: linear-gradient(45deg, ${props => props.isDarkMode ? '#484691' : '#3498db'}, ${props => props.isDarkMode ? '#c4babb' : '#2c3e50'});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;

  @media screen and (max-width: 768px) {
    font-size: 2rem;
  }
`;

const TimelineContainer = styled.div`
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 0;
`;

const TimelineLine = styled.div`
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 4px;
  background: linear-gradient(180deg, 
    ${props => props.isDarkMode ? '#484691' : '#3498db'} 0%,
    ${props => props.isDarkMode ? '#c4babb' : '#2c3e50'} 100%);
  transform: translateX(-50%);
  border-radius: 2px;
  box-shadow: 0 0 20px ${props => props.isDarkMode ? 'rgba(72, 70, 145, 0.5)' : 'rgba(52, 152, 219, 0.5)'};

  @media screen and (max-width: 968px) {
    left: 30px;
  }
`;

const TimelineItem = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 3rem;
  opacity: ${props => props.isVisible ? 1 : 0};
  animation: ${props => props.isEven ? slideInLeft : slideInRight} 0.6s ease-out forwards;
  animation-delay: ${props => props.delay}ms;
  animation-fill-mode: both;

  &:last-child {
    margin-bottom: 0;
  }

  @media screen and (max-width: 968px) {
    flex-direction: column;
    align-items: flex-start;
    padding-left: 60px;
  }
`;

const TimelineNode = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${props => props.isDarkMode 
    ? 'linear-gradient(135deg, #241e20 0%, #1a1416 100%)' 
    : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)'};
  border: 4px solid ${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  box-shadow: 0 0 30px ${props => props.color}50;
  transition: all 0.3s ease;
  opacity: ${props => props.isVisible ? 1 : 0};
  animation: ${props => props.isVisible ? scaleIn : 'none'} 0.5s ease-out;
  animation-delay: ${props => props.isVisible ? '0.3s' : '0s'};
  animation-fill-mode: both;

  &:hover {
    transform: translateX(-50%) scale(1.15);
    box-shadow: 0 0 40px ${props => props.color}70;
  }

  @media screen and (max-width: 968px) {
    left: 30px;
    transform: translateX(-50%);
  }
`;

const NodeIcon = styled.div`
  color: ${props => props.color};
  z-index: 2;
  position: relative;
`;

const NodeGlow = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: ${props => props.color};
  opacity: 0.2;
  animation: ${pulse} 2s ease-in-out infinite;
`;

const ExperienceCard = styled.div`
  width: 45%;
  background: ${props => props.isDarkMode 
    ? 'linear-gradient(135deg, rgba(36, 30, 32, 0.9) 0%, rgba(26, 20, 22, 0.9) 100%)' 
    : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 249, 250, 0.95) 100%)'};
  border-radius: 20px;
  padding: 1.5rem;
  border: 2px solid ${props => props.color}40;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3),
              0 0 20px ${props => props.color}20;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  opacity: ${props => props.isVisible ? 1 : 0};
  transform: ${props => props.isVisible ? 'translateY(0)' : 'translateY(20px)'};
  animation: ${props => props.isVisible ? (props.isEven ? slideInLeft : slideInRight) : 'none'} 0.6s ease-out;
  animation-delay: ${props => props.isVisible ? '0.2s' : '0s'};
  animation-fill-mode: both;

  ${props => props.isEven ? 'margin-right: auto;' : 'margin-left: auto;'}

  &:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4),
                0 0 30px ${props => props.color}30;
    border-color: ${props => props.color};
  }

  @media screen and (max-width: 968px) {
    width: 100%;
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
`;

const CardHeader = styled.div`
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const LogoContainer = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 12px;
  padding: 0.5rem;
  background: ${props => props.color}20;
  border: 2px solid ${props => props.color}40;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 5px 15px ${props => props.color}30;
`;

const Logo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 8px;
`;

const CardInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const RoleBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;
  font-weight: 700;
  color: ${props => props.color};
  text-transform: capitalize;
`;

const CompanyName = styled.h3`
  font-size: 1.3rem;
  color: ${props => props.isDarkMode ? '#c4babb' : '#2c3e50'};
  font-weight: 600;
  margin: 0;
`;

const DurationBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: ${props => props.isDarkMode ? '#7f8c8d' : '#95a5a6'};
  font-weight: 500;
`;

const LocationBadge = styled.div`
  font-size: 0.8rem;
  color: ${props => props.isDarkMode ? '#7f8c8d' : '#95a5a6'};
  font-weight: 400;
`;

const AchievementBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: ${props => props.color}20;
  border: 1px solid ${props => props.color}40;
  border-radius: 10px;
  color: ${props => props.color};
  font-size: 0.85rem;
  font-weight: 600;
  width: fit-content;
  margin-top: 0.5rem;
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 2px solid ${props => props.isDarkMode ? '#484691' : '#3498db'}40;

  @media screen and (max-width: 768px) {
    gap: 1.5rem;
    flex-wrap: wrap;
  }
`;

const StatCard = styled.div`
  text-align: center;
  padding: 1rem 1.5rem;
  background: ${props => props.isDarkMode 
    ? 'linear-gradient(135deg, rgba(36, 30, 32, 0.8) 0%, rgba(26, 20, 22, 0.8) 100%)' 
    : 'linear-gradient(135deg, rgba(248, 249, 250, 0.9) 0%, rgba(233, 236, 239, 0.9) 100%)'};
  border-radius: 15px;
  border: 2px solid ${props => props.isDarkMode ? '#484691' : '#3498db'}40;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 700;
  background: linear-gradient(45deg, ${props => props.isDarkMode ? '#484691' : '#3498db'}, ${props => props.isDarkMode ? '#c4babb' : '#2c3e50'});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: ${props => props.isDarkMode ? '#7f8c8d' : '#95a5a6'};
  margin-top: 0.5rem;
  font-weight: 500;
`;

export default Experience;
