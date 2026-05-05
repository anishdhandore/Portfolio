import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaTrophy, FaStar, FaMedal, FaAward } from 'react-icons/fa';
import MyPhoto from '../images/me.jpg';
import { useTheme } from '../context/ThemeContext';

const About = () => {
  const { isDarkMode } = useTheme();
  const [animatedStats, setAnimatedStats] = useState({});
  const [achievementsUnlocked, setAchievementsUnlocked] = useState(false);
  const sectionRef = useRef(null);

  const stats = {
    'Problem Solving': 95,
    'Full-Stack Dev': 90,
    'Cloud Architecture': 85,
    'Mobile Dev': 80,
    'Team Leadership': 88,
    'Innovation': 92,
  };

  const achievements = [
    { icon: FaTrophy, name: '4 Years Experience', color: '#F59E0B' },
    { icon: FaStar,   name: '20+ Projects',        color: '#EF4444' },
    { icon: FaMedal,  name: 'Always Learning',     color: '#10B981' },
    { icon: FaAward,  name: 'Tech Enthusiast',      color: '#06B6D4' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAchievementsUnlocked(true);
            Object.keys(stats).forEach((stat, i) => {
              setTimeout(() => {
                setAnimatedStats(prev => ({ ...prev, [stat]: stats[stat] }));
              }, i * 120);
            });
          }
        });
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, []);

  return (
    <div className="responsive-container">
      <AboutSection id="about" isDarkMode={isDarkMode} ref={sectionRef}>
        <SectionHeader>
          <SectionLabel isDarkMode={isDarkMode}>Character Profile</SectionLabel>
          <SectionTitle isDarkMode={isDarkMode}>About Me</SectionTitle>
          <SectionSub isDarkMode={isDarkMode}>Level 42 · Software Engineer</SectionSub>
        </SectionHeader>

        <BentoGrid>
          {/* Character card */}
          <CharacterCard isDarkMode={isDarkMode}>
            <CharacterImg src={MyPhoto} alt="Anish Dhandore" />
            <CharacterName isDarkMode={isDarkMode}>Anish Dhandore</CharacterName>
            <CharacterRole isDarkMode={isDarkMode}>Full-Stack Developer</CharacterRole>
            <LevelBlock isDarkMode={isDarkMode}>
              <LevelLabel isDarkMode={isDarkMode}>LVL 42</LevelLabel>
              <XPTrack isDarkMode={isDarkMode}>
                <XPFill isDarkMode={isDarkMode} style={{ width: '68%' }} />
              </XPTrack>
              <XPCaption isDarkMode={isDarkMode}>68% to Next Level</XPCaption>
            </LevelBlock>
          </CharacterCard>

          {/* Bio */}
          <BioCard isDarkMode={isDarkMode}>
            <CardLabel isDarkMode={isDarkMode}>Bio</CardLabel>
            <BioText isDarkMode={isDarkMode}>
              <span role="img" aria-label="wave">👋</span> Hello! I'm a passionate technology developer with expertise in several areas
              that come together to create effective and innovative solutions. My professional
              journey has been focused on driving efficiency and excellence through technology.
            </BioText>
          </BioCard>

          {/* Quick stats */}
          <QuickStatsCard isDarkMode={isDarkMode}>
            {[
              { value: '4+',  label: 'Years' },
              { value: '20+', label: 'Projects' },
              { value: '24/7', label: 'Available' },
            ].map(({ value, label }) => (
              <StatBlock key={label}>
                <StatNum isDarkMode={isDarkMode}>{value}</StatNum>
                <StatLbl isDarkMode={isDarkMode}>{label}</StatLbl>
              </StatBlock>
            ))}
          </QuickStatsCard>

          {/* Skill stats */}
          <SkillStatsCard isDarkMode={isDarkMode}>
            <CardLabel isDarkMode={isDarkMode}>Skill Stats</CardLabel>
            <BarList>
              {Object.entries(stats).map(([name, max], i) => {
                const val = animatedStats[name] || 0;
                return (
                  <BarItem key={name}>
                    <BarMeta>
                      <BarName isDarkMode={isDarkMode}>{name}</BarName>
                      <BarVal isDarkMode={isDarkMode}>{val}%</BarVal>
                    </BarMeta>
                    <BarTrack isDarkMode={isDarkMode}>
                      <BarFill style={{ width: `${val}%` }} isDarkMode={isDarkMode} delay={i * 100} />
                    </BarTrack>
                  </BarItem>
                );
              })}
            </BarList>
          </SkillStatsCard>

          {/* Achievements */}
          <AchievCard isDarkMode={isDarkMode}>
            <CardLabel isDarkMode={isDarkMode}>Achievements</CardLabel>
            <AchievGrid>
              {achievements.map(({ icon: Icon, name, color }, i) => (
                <AchievBadge
                  key={name}
                  isDarkMode={isDarkMode}
                  accentColor={color}
                  unlocked={achievementsUnlocked}
                  delay={i * 80}
                >
                  <Icon size={22} color={color} />
                  <AchievName isDarkMode={isDarkMode}>{name}</AchievName>
                </AchievBadge>
              ))}
            </AchievGrid>
          </AchievCard>
        </BentoGrid>
      </AboutSection>
    </div>
  );
};

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const fillBar = keyframes`from { width: 0%; }`;

const popIn = keyframes`
  0%   { opacity: 0; transform: scale(0.6) translateY(10px); }
  60%  { transform: scale(1.04); }
  100% { opacity: 1; transform: scale(1) translateY(0); }
`;

const AboutSection = styled.section`
  min-height: 100vh;
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
  margin-bottom: 3rem;
  animation: ${fadeUp} 0.6s ease-out both;
`;

const SectionLabel = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: ${props => props.isDarkMode ? '#8B5CF6' : '#7C3AED'};
  margin-bottom: 0.75rem;
`;

const SectionTitle = styled.h2`
  font-size: clamp(2.2rem, 5vw, 3.5rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1;
  margin-bottom: 0.75rem;
  color: ${props => props.isDarkMode ? '#F1EEFF' : '#1C1528'};
`;

const SectionSub = styled.p`
  font-size: 1rem;
  color: ${props => props.isDarkMode ? '#9D97B8' : '#5C5470'};
  font-weight: 400;
`;

const BentoGrid = styled.div`
  display: grid;
  grid-template-columns: 260px 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 1.1rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 580px) {
    grid-template-columns: 1fr;
  }
`;

const glass = (isDarkMode) => `
  background: ${isDarkMode
    ? 'rgba(14,12,21,0.7)'
    : 'rgba(255,255,255,0.75)'};
  border: 1px solid ${isDarkMode
    ? 'rgba(139,92,246,0.18)'
    : 'rgba(124,58,237,0.12)'};
  backdrop-filter: blur(12px);
  border-radius: 20px;
  box-shadow: 0 4px 30px ${isDarkMode ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.06)'};
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    border-color: ${isDarkMode ? 'rgba(139,92,246,0.35)' : 'rgba(124,58,237,0.25)'};
    box-shadow: 0 8px 40px ${isDarkMode ? 'rgba(139,92,246,0.1)' : 'rgba(124,58,237,0.08)'};
  }
`;

const CharacterCard = styled.div`
  ${props => glass(props.isDarkMode)}
  grid-row: 1 / 3;
  padding: 1.75rem 1.25rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${fadeUp} 0.6s 0.1s ease-out both;

  @media (max-width: 1024px) { grid-row: auto; }
  @media (max-width: 580px)  { padding: 1.5rem 1rem; }
`;

const pulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(139,92,246,0.4); }
  50%       { box-shadow: 0 0 0 8px rgba(139,92,246,0); }
`;

const CharacterImg = styled.img`
  width: 130px;
  height: 130px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid rgba(139,92,246,0.5);
  margin-bottom: 1rem;
  animation: ${pulse} 3s ease-in-out infinite;
`;

const CharacterName = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  color: ${props => props.isDarkMode ? '#F1EEFF' : '#1C1528'};
  margin-bottom: 0.3rem;
`;

const CharacterRole = styled.p`
  font-size: 0.85rem;
  color: ${props => props.isDarkMode ? '#8B5CF6' : '#7C3AED'};
  font-weight: 500;
  margin-bottom: 1.5rem;
`;

const LevelBlock = styled.div`
  width: 100%;
  text-align: left;
`;

const LevelLabel = styled.div`
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: ${props => props.isDarkMode ? '#8B5CF6' : '#7C3AED'};
  margin-bottom: 0.5rem;
`;

const XPTrack = styled.div`
  width: 100%;
  height: 8px;
  border-radius: 8px;
  background: ${props => props.isDarkMode ? 'rgba(139,92,246,0.15)' : 'rgba(124,58,237,0.1)'};
  overflow: hidden;
  margin-bottom: 0.4rem;
`;

const shimmer = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(300%); }
`;

const XPFill = styled.div`
  height: 100%;
  border-radius: 8px;
  background: linear-gradient(90deg, #7C3AED, #8B5CF6, #A78BFA);
  position: relative;
  overflow: hidden;
  animation: ${fillBar} 1.5s ease-out;

  &::after {
    content: '';
    position: absolute;
    top: 0; left: 0; bottom: 0;
    width: 40%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
    animation: ${shimmer} 2s 1.5s ease-in-out infinite;
  }
`;

const XPCaption = styled.div`
  font-size: 0.75rem;
  color: ${props => props.isDarkMode ? '#9D97B8' : '#5C5470'};
`;

const BioCard = styled.div`
  ${props => glass(props.isDarkMode)}
  padding: 1.75rem;
  animation: ${fadeUp} 0.6s 0.15s ease-out both;
`;

const CardLabel = styled.div`
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${props => props.isDarkMode ? '#8B5CF6' : '#7C3AED'};
  margin-bottom: 1rem;
`;

const BioText = styled.p`
  font-size: 0.95rem;
  line-height: 1.8;
  color: ${props => props.isDarkMode ? '#9D97B8' : '#5C5470'};
`;

const QuickStatsCard = styled.div`
  ${props => glass(props.isDarkMode)}
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 1rem;
  animation: ${fadeUp} 0.6s 0.2s ease-out both;
`;

const StatBlock = styled.div`
  text-align: center;
`;

const StatNum = styled.div`
  font-size: 1.8rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: ${props => props.isDarkMode ? '#8B5CF6' : '#7C3AED'};
`;

const StatLbl = styled.div`
  font-size: 0.75rem;
  font-weight: 500;
  color: ${props => props.isDarkMode ? '#9D97B8' : '#5C5470'};
  margin-top: 0.25rem;
`;

const SkillStatsCard = styled.div`
  ${props => glass(props.isDarkMode)}
  padding: 1.75rem;
  animation: ${fadeUp} 0.6s 0.25s ease-out both;
`;

const BarList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
`;

const BarItem = styled.div``;

const BarMeta = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.4rem;
`;

const BarName = styled.span`
  font-size: 0.85rem;
  font-weight: 500;
  color: ${props => props.isDarkMode ? '#F1EEFF' : '#1C1528'};
`;

const BarVal = styled.span`
  font-size: 0.85rem;
  font-weight: 700;
  color: ${props => props.isDarkMode ? '#8B5CF6' : '#7C3AED'};
`;

const BarTrack = styled.div`
  width: 100%;
  height: 6px;
  border-radius: 6px;
  background: ${props => props.isDarkMode ? 'rgba(139,92,246,0.12)' : 'rgba(124,58,237,0.08)'};
  overflow: hidden;
`;

const BarFill = styled.div`
  height: 100%;
  border-radius: 6px;
  background: linear-gradient(90deg, #7C3AED, #A78BFA);
  animation: ${fillBar} 1.2s ${props => props.delay}ms ease-out both;
`;

const AchievCard = styled.div`
  ${props => glass(props.isDarkMode)}
  padding: 1.75rem;
  animation: ${fadeUp} 0.6s 0.3s ease-out both;
`;

const AchievGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
`;

const AchievBadge = styled.div`
  padding: 1rem;
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  background: ${props => props.isDarkMode ? 'rgba(139,92,246,0.06)' : 'rgba(124,58,237,0.04)'};
  border: 1px solid ${props => `${props.accentColor}28`};
  cursor: default;
  opacity: ${props => props.unlocked ? 1 : 0};
  animation: ${props => props.unlocked ? popIn : 'none'} 0.5s ${props => props.delay}ms ease-out both;
  transition: transform 0.2s ease, border-color 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    border-color: ${props => `${props.accentColor}55`};
  }
`;

const AchievName = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  text-align: center;
  color: ${props => props.isDarkMode ? '#9D97B8' : '#5C5470'};
  line-height: 1.3;
`;

export default About;
