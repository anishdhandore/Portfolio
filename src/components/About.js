import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { 
  FaCode, 
  FaDatabase, 
  FaCloud, 
  FaMobile, 
  FaRocket, 
  FaTrophy,
  FaStar,
  FaMedal,
  FaAward,
  FaGamepad
} from 'react-icons/fa';
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
    'Innovation': 92
  };

  const achievements = [
    { icon: FaTrophy, name: '4 Years Experience', color: '#FFD700' },
    { icon: FaStar, name: '20+ Projects', color: '#FF6B6B' },
    { icon: FaMedal, name: 'Always Learning', color: '#4ECDC4' },
    { icon: FaAward, name: 'Tech Enthusiast', color: '#95E1D3' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAchievementsUnlocked(true);
            // Animate stats
            Object.keys(stats).forEach((stat, index) => {
              setTimeout(() => {
                setAnimatedStats((prev) => ({
                  ...prev,
                  [stat]: stats[stat]
                }));
              }, index * 150);
            });
          }
        });
      },
      { threshold: 0.3 }
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
    <div className="responsive-container">
      <AboutSection id="about" isDarkMode={isDarkMode} ref={sectionRef}>
        <TitleContainer>
          <GameIcon isDarkMode={isDarkMode}>
            <FaGamepad />
          </GameIcon>
          <AboutMeTitle isDarkMode={isDarkMode}>Character Profile</AboutMeTitle>
          <Subtitle isDarkMode={isDarkMode}>Level 42 • Software Engineer</Subtitle>
        </TitleContainer>

        <GameContainer>
          <LeftPanel isDarkMode={isDarkMode}>
            <CharacterCard isDarkMode={isDarkMode}>
              <CharacterImage src={MyPhoto} alt="Anish Dhandore" />
              <CharacterName isDarkMode={isDarkMode}>Anish Dhandore</CharacterName>
              <CharacterClass isDarkMode={isDarkMode}>Full-Stack Developer</CharacterClass>
              <LevelBadge isDarkMode={isDarkMode}>
                <LevelText>LVL 42</LevelText>
                <XPBar>
                  <XPFill style={{ width: '68%' }} isDarkMode={isDarkMode} />
                </XPBar>
                <XPText>68% to Next Level</XPText>
              </LevelBadge>
            </CharacterCard>

            <AchievementsSection isDarkMode={isDarkMode}>
              <AchievementsTitle isDarkMode={isDarkMode}>Achievements</AchievementsTitle>
              <AchievementsGrid>
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon;
                  return (
                    <AchievementBadge
                      key={index}
                      isDarkMode={isDarkMode}
                      unlocked={achievementsUnlocked}
                      delay={index * 100}
                    >
                      <Icon size={24} color={achievement.color} />
                      <AchievementName>{achievement.name}</AchievementName>
                    </AchievementBadge>
                  );
                })}
              </AchievementsGrid>
            </AchievementsSection>
          </LeftPanel>

          <RightPanel isDarkMode={isDarkMode}>
            <BioCard isDarkMode={isDarkMode}>
              <BioTitle isDarkMode={isDarkMode}>Bio</BioTitle>
              <BioText isDarkMode={isDarkMode}>
                👋 Hello! I am a passionate technology developer, with expertise in several areas 
                that come together to create effective and innovative solutions. My professional 
                journey has been focused on driving efficiency and excellence through technology.
              </BioText>
            </BioCard>

            <StatsCard isDarkMode={isDarkMode}>
              <StatsTitle isDarkMode={isDarkMode}>Skill Stats</StatsTitle>
              <StatsList>
                {Object.entries(stats).map(([statName, value], index) => {
                  const animatedValue = animatedStats[statName] || 0;
                  return (
                    <StatItem key={statName} isDarkMode={isDarkMode}>
                      <StatHeader>
                        <StatName isDarkMode={isDarkMode}>{statName}</StatName>
                        <StatValue isDarkMode={isDarkMode}>{animatedValue}%</StatValue>
                      </StatHeader>
                      <StatBar isDarkMode={isDarkMode}>
                        <StatBarFill
                          style={{ width: `${animatedValue}%` }}
                          isDarkMode={isDarkMode}
                          delay={index * 100}
                        />
                      </StatBar>
                    </StatItem>
                  );
                })}
              </StatsList>
            </StatsCard>

            <QuickStats isDarkMode={isDarkMode}>
              <QuickStatItem isDarkMode={isDarkMode}>
                <QuickStatValue isDarkMode={isDarkMode}>4+</QuickStatValue>
                <QuickStatLabel>Years</QuickStatLabel>
              </QuickStatItem>
              <QuickStatItem isDarkMode={isDarkMode}>
                <QuickStatValue isDarkMode={isDarkMode}>20+</QuickStatValue>
                <QuickStatLabel>Projects</QuickStatLabel>
              </QuickStatItem>
              <QuickStatItem isDarkMode={isDarkMode}>
                <QuickStatValue isDarkMode={isDarkMode}>24/7</QuickStatValue>
                <QuickStatLabel>Available</QuickStatLabel>
              </QuickStatItem>
            </QuickStats>
          </RightPanel>
        </GameContainer>
      </AboutSection>
    </div>
  );
};

const glow = keyframes`
  0%, 100% {
    box-shadow: 0 0 10px rgba(72, 70, 145, 0.5);
  }
  50% {
    box-shadow: 0 0 20px rgba(72, 70, 145, 0.8);
  }
`;

const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const bounceIn = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.3) translateY(-20px);
  }
  50% {
    transform: scale(1.05);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

const fillBar = keyframes`
  from {
    width: 0%;
  }
`;

const AboutSection = styled.section`
  padding: 3rem 2rem;
  background-color: ${props => props.isDarkMode ? '#040a1c' : '#ffffff'};
  color: ${props => props.isDarkMode ? '#c4babb' : '#2c3e50'};
  transition: background-color 0.3s ease, color 0.3s ease;
  position: relative;
  z-index: 1;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const TitleContainer = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  animation: ${slideInRight} 0.6s ease-out;
`;

const GameIcon = styled.div`
  font-size: 3rem;
  color: ${props => props.isDarkMode ? '#484691' : '#3498db'};
  margin-bottom: 1rem;
  animation: ${pulse} 2s ease-in-out infinite;
`;

const AboutMeTitle = styled.h2`
  font-size: 3rem;
  margin: 0.5rem 0;
  background: linear-gradient(45deg, ${props => props.isDarkMode ? '#484691' : '#3498db'}, ${props => props.isDarkMode ? '#c4babb' : '#2c3e50'});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;

  @media screen and (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: ${props => props.isDarkMode ? '#c4babb' : '#7f8c8d'};
  margin-top: 0.5rem;
  font-weight: 300;
`;

const GameContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 2rem;
  max-width: 1200px;
  width: 100%;

  @media screen and (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const LeftPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  animation: ${slideInLeft} 0.6s ease-out;
`;

const RightPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  animation: ${slideInRight} 0.6s ease-out;
`;

const CharacterCard = styled.div`
  background: ${props => props.isDarkMode 
    ? 'linear-gradient(135deg, #241e20 0%, #1a1416 100%)' 
    : 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'};
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  border: 2px solid ${props => props.isDarkMode ? '#484691' : '#3498db'};
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(72, 70, 145, 0.4);
  }
`;

const CharacterImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid ${props => props.isDarkMode ? '#484691' : '#3498db'};
  margin-bottom: 1rem;
  animation: ${pulse} 3s ease-in-out infinite;
`;

const CharacterName = styled.h3`
  font-size: 1.5rem;
  color: ${props => props.isDarkMode ? '#c4babb' : '#2c3e50'};
  margin: 0.5rem 0;
  font-weight: 600;
`;

const CharacterClass = styled.p`
  font-size: 1rem;
  color: ${props => props.isDarkMode ? '#484691' : '#3498db'};
  margin-bottom: 1.5rem;
  font-weight: 500;
`;

const LevelBadge = styled.div`
  margin-top: 1rem;
`;

const LevelText = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  color: ${props => props.isDarkMode ? '#484691' : '#3498db'};
  margin-bottom: 0.5rem;
`;

const XPBar = styled.div`
  width: 100%;
  height: 12px;
  background-color: ${props => props.isDarkMode ? '#1a1416' : '#e9ecef'};
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 0.5rem;
`;

const XPFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, ${props => props.isDarkMode ? '#484691' : '#3498db'}, ${props => props.isDarkMode ? '#5a56b3' : '#2980b9'});
  border-radius: 10px;
  animation: ${fillBar} 1.5s ease-out;
  box-shadow: 0 0 10px ${props => props.isDarkMode ? 'rgba(72, 70, 145, 0.6)' : 'rgba(52, 152, 219, 0.6)'};
`;

const XPText = styled.div`
  font-size: 0.85rem;
  color: ${props => props.isDarkMode ? '#c4babb' : '#7f8c8d'};
`;

const AchievementsSection = styled.div`
  background: ${props => props.isDarkMode 
    ? 'linear-gradient(135deg, #241e20 0%, #1a1416 100%)' 
    : 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'};
  border-radius: 20px;
  padding: 1.5rem;
  border: 2px solid ${props => props.isDarkMode ? '#484691' : '#3498db'};
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
`;

const AchievementsTitle = styled.h3`
  font-size: 1.3rem;
  color: ${props => props.isDarkMode ? '#c4babb' : '#2c3e50'};
  margin-bottom: 1rem;
  text-align: center;
  font-weight: 600;
`;

const AchievementsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

const AchievementBadge = styled.div`
  background: ${props => props.isDarkMode ? '#1a1416' : '#ffffff'};
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  border: 2px solid ${props => props.isDarkMode ? '#484691' : '#3498db'};
  opacity: ${props => props.unlocked ? 1 : 0};
  transform: ${props => props.unlocked ? 'scale(1)' : 'scale(0.5)'};
  animation: ${props => props.unlocked ? bounceIn : 'none'} 0.6s ease-out;
  animation-delay: ${props => props.delay}ms;
  animation-fill-mode: both;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const AchievementName = styled.span`
  font-size: 0.85rem;
  color: ${props => props.isDarkMode ? '#c4babb' : '#2c3e50'};
  text-align: center;
  font-weight: 500;
`;

const BioCard = styled.div`
  background: ${props => props.isDarkMode 
    ? 'linear-gradient(135deg, #241e20 0%, #1a1416 100%)' 
    : 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'};
  border-radius: 20px;
  padding: 2rem;
  border: 2px solid ${props => props.isDarkMode ? '#484691' : '#3498db'};
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
`;

const BioTitle = styled.h3`
  font-size: 1.5rem;
  color: ${props => props.isDarkMode ? '#484691' : '#3498db'};
  margin-bottom: 1rem;
  font-weight: 600;
`;

const BioText = styled.p`
  font-size: 1rem;
  color: ${props => props.isDarkMode ? '#c4babb' : '#2c3e50'};
  line-height: 1.8;
  margin: 0;
`;

const StatsCard = styled.div`
  background: ${props => props.isDarkMode 
    ? 'linear-gradient(135deg, #241e20 0%, #1a1416 100%)' 
    : 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'};
  border-radius: 20px;
  padding: 2rem;
  border: 2px solid ${props => props.isDarkMode ? '#484691' : '#3498db'};
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
`;

const StatsTitle = styled.h3`
  font-size: 1.5rem;
  color: ${props => props.isDarkMode ? '#484691' : '#3498db'};
  margin-bottom: 1.5rem;
  font-weight: 600;
`;

const StatsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const StatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StatName = styled.span`
  font-size: 1rem;
  color: ${props => props.isDarkMode ? '#c4babb' : '#2c3e50'};
  font-weight: 500;
`;

const StatValue = styled.span`
  font-size: 1rem;
  color: ${props => props.isDarkMode ? '#484691' : '#3498db'};
  font-weight: 700;
`;

const StatBar = styled.div`
  width: 100%;
  height: 16px;
  background-color: ${props => props.isDarkMode ? '#1a1416' : '#e9ecef'};
  border-radius: 10px;
  overflow: hidden;
  position: relative;
`;

const StatBarFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, ${props => props.isDarkMode ? '#484691' : '#3498db'}, ${props => props.isDarkMode ? '#5a56b3' : '#2980b9'});
  border-radius: 10px;
  animation: ${fillBar} 1.5s ease-out;
  animation-delay: ${props => props.delay}ms;
  animation-fill-mode: both;
  box-shadow: 0 0 10px ${props => props.isDarkMode ? 'rgba(72, 70, 145, 0.6)' : 'rgba(52, 152, 219, 0.6)'};
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    animation: shimmer 2s infinite;
  }
`;

const shimmer = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
`;

const QuickStats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
`;

const QuickStatItem = styled.div`
  background: ${props => props.isDarkMode 
    ? 'linear-gradient(135deg, #241e20 0%, #1a1416 100%)' 
    : 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'};
  border-radius: 15px;
  padding: 1.5rem;
  text-align: center;
  border: 2px solid ${props => props.isDarkMode ? '#484691' : '#3498db'};
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const QuickStatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${props => props.isDarkMode ? '#484691' : '#3498db'};
  margin-bottom: 0.5rem;
`;

const QuickStatLabel = styled.div`
  font-size: 0.9rem;
  color: ${props => props.isDarkMode ? '#c4babb' : '#7f8c8d'};
  font-weight: 500;
`;

export default About;
