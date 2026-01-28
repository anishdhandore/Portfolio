import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import {
  FaCode,
  FaServer,
  FaDesktop,
  FaDatabase,
  FaCloud,
  FaCog,
  FaGitAlt
} from 'react-icons/fa';
import {
  SiPython,
  SiJavascript,
  SiTypescript,
  SiCplusplus,
  SiSwift,
  SiCsharp,
  SiNodedotjs,
  SiExpress,
  SiFastapi,
  SiFlask,
  SiDotnet,
  SiReact,
  SiNextdotjs,
  SiRedux,
  SiTailwindcss,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiRedis,
  SiAmazon,
  SiDocker,
  SiGithubactions,
  SiFirebase,
  SiLinux
} from 'react-icons/si';
import { useTheme } from '../context/ThemeContext';

// Skill data with mastery levels (1-5 scale mapped to percentages)
const skillCategories = {
  Languages: {
    icon: FaCode,
    color: '#FF6B6B',
    skills: [
      { name: 'Python 3', level: 95, icon: SiPython },
      { name: 'JavaScript (ES6+)', level: 92, icon: SiJavascript },
      { name: 'TypeScript', level: 90, icon: SiTypescript },
      { name: 'C++ 17/20', level: 88, icon: SiCplusplus },
      { name: 'Java', level: 85, icon: FaCode },
      { name: 'Swift', level: 80, icon: SiSwift },
      { name: 'C#', level: 82, icon: SiCsharp },
      { name: 'SQL', level: 90, icon: FaDatabase },
      { name: 'Bash', level: 85, icon: FaCode },
    ]
  },
  Backend: {
    icon: FaServer,
    color: '#4ECDC4',
    skills: [
      { name: 'Node.js', level: 92, icon: SiNodedotjs },
      { name: 'Express', level: 90, icon: SiExpress },
      { name: 'FastAPI', level: 88, icon: SiFastapi },
      { name: 'Flask', level: 85, icon: SiFlask },
      { name: 'ASP.NET Core', level: 80, icon: SiDotnet },
      { name: 'REST/gRPC', level: 90, icon: FaCode },
      { name: 'WebSockets', level: 85, icon: FaCode },
    ]
  },
  Frontend: {
    icon: FaDesktop,
    color: '#95E1D3',
    skills: [
      { name: 'React', level: 95, icon: SiReact },
      { name: 'Next.js', level: 88, icon: SiNextdotjs },
      { name: 'Redux/RTK', level: 90, icon: SiRedux },
      { name: 'React Query', level: 85, icon: FaDesktop },
      { name: 'Tailwind CSS', level: 92, icon: SiTailwindcss },
      { name: 'Chakra UI', level: 88, icon: FaDesktop },
    ]
  },
  Databases: {
    icon: FaDatabase,
    color: '#FFE66D',
    skills: [
      { name: 'PostgreSQL', level: 90, icon: SiPostgresql },
      { name: 'MySQL', level: 88, icon: SiMysql },
      { name: 'SQLite', level: 85, icon: FaDatabase },
      { name: 'MongoDB', level: 87, icon: SiMongodb },
      { name: 'Redis', level: 82, icon: SiRedis },
    ]
  },
  'Cloud/DevOps': {
    icon: FaCloud,
    color: '#A8E6CF',
    skills: [
      { name: 'AWS', level: 85, icon: SiAmazon },
      { name: 'Docker', level: 90, icon: SiDocker },
      { name: 'GitHub Actions', level: 88, icon: SiGithubactions },
      { name: 'Firebase', level: 85, icon: SiFirebase },
      { name: 'Linux', level: 90, icon: SiLinux },
      { name: 'CI/CD', level: 88, icon: SiGithubactions },
    ]
  },
  Automation: {
    icon: FaCog,
    color: '#FF8B94',
    skills: [
      { name: 'Test Automation', level: 88, icon: FaCog },
      { name: 'Code Refactoring', level: 92, icon: FaCode },
      { name: 'Log Analysis', level: 85, icon: FaCog },
    ]
  }
};

const Skills = () => {
  const { isDarkMode } = useTheme();
  const [animatedSkills, setAnimatedSkills] = useState({});
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate all skills
            Object.values(skillCategories).forEach((category) => {
              category.skills.forEach((skill, index) => {
                setTimeout(() => {
                  setAnimatedSkills((prev) => ({
                    ...prev,
                    [skill.name]: skill.level
                  }));
                }, index * 50);
              });
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

  const getMasteryLevel = (level) => {
    if (level >= 90) return { name: 'Master', color: '#FFD700' };
    if (level >= 80) return { name: 'Expert', color: '#FF6B6B' };
    if (level >= 70) return { name: 'Advanced', color: '#4ECDC4' };
    if (level >= 60) return { name: 'Intermediate', color: '#95E1D3' };
    return { name: 'Novice', color: '#A8E6CF' };
  };

  return (
    <div className="responsive-container">
      <SkillsSection id="skills" isDarkMode={isDarkMode} ref={sectionRef}>
        <TitleContainer>
          <SkillsTitle isDarkMode={isDarkMode}>
            <TitleIcon>⚡</TitleIcon>
            Skill Constellation
          </SkillsTitle>
          <Subtitle isDarkMode={isDarkMode}>
            Master your tools, master your craft
          </Subtitle>
        </TitleContainer>

        <CategoriesGrid>
          {Object.entries(skillCategories).map(([categoryName, category], catIndex) => {
            const CategoryIcon = category.icon;
            return (
              <CategoryCard
                key={categoryName}
                isDarkMode={isDarkMode}
                categoryColor={category.color}
                delay={catIndex * 100}
              >
                <CategoryHeader>
                  <CategoryIconWrapper categoryColor={category.color}>
                    <CategoryIcon size={28} />
                  </CategoryIconWrapper>
                  <CategoryTitle isDarkMode={isDarkMode}>{categoryName}</CategoryTitle>
                </CategoryHeader>

                <SkillsGrid>
                  {category.skills.map((skill, skillIndex) => {
                    const SkillIcon = skill.icon || FaCode;
                    const animatedLevel = animatedSkills[skill.name] || 0;
                    const mastery = getMasteryLevel(skill.level);
                    const isHovered = hoveredSkill === skill.name;

                    return (
                      <SkillOrb
                        key={skill.name}
                        isDarkMode={isDarkMode}
                        categoryColor={category.color}
                        masteryColor={mastery.color}
                        level={skill.level}
                        delay={(catIndex * 50) + (skillIndex * 30)}
                        isHovered={isHovered}
                        onMouseEnter={() => setHoveredSkill(skill.name)}
                        onMouseLeave={() => setHoveredSkill(null)}
                      >
                        <SkillIconWrapper
                          categoryColor={category.color}
                          masteryColor={mastery.color}
                          isHovered={isHovered}
                        >
                          <SkillIcon size={18} />
                        </SkillIconWrapper>
                        <SkillName isDarkMode={isDarkMode}>{skill.name}</SkillName>
                        <MasteryBadge masteryColor={mastery.color}>
                          {mastery.name}
                        </MasteryBadge>
                        <LevelBar>
                          <LevelFill
                            style={{ width: `${animatedLevel}%` }}
                            categoryColor={category.color}
                            masteryColor={mastery.color}
                          />
                        </LevelBar>
                        <LevelText>{animatedLevel}%</LevelText>
                        
                        {isHovered && (
                          <Tooltip isDarkMode={isDarkMode} masteryColor={mastery.color}>
                            <TooltipTitle>{skill.name}</TooltipTitle>
                            <TooltipLevel>Mastery: {mastery.name}</TooltipLevel>
                            <TooltipProgress>Progress: {skill.level}%</TooltipProgress>
                          </Tooltip>
                        )}
                      </SkillOrb>
                    );
                  })}
                </SkillsGrid>
              </CategoryCard>
            );
          })}
        </CategoriesGrid>
      </SkillsSection>
    </div>
  );
};

const float = keyframes`
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-10px) rotate(5deg);
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

const slideInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fillBar = keyframes`
  from {
    width: 0%;
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const SkillsSection = styled.section`
  padding: 2.5rem 2rem;
  background: ${props => props.isDarkMode 
    ? 'linear-gradient(180deg, #040a1c 0%, #0a0f1f 100%)' 
    : 'linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%)'};
  color: ${props => props.isDarkMode ? '#c4babb' : '#2c3e50'};
  position: relative;
  z-index: 1;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 20% 50%, ${props => props.isDarkMode ? 'rgba(72, 70, 145, 0.1)' : 'rgba(52, 152, 219, 0.05)'}, transparent 50%),
                radial-gradient(circle at 80% 80%, ${props => props.isDarkMode ? 'rgba(72, 70, 145, 0.1)' : 'rgba(52, 152, 219, 0.05)'}, transparent 50%);
    pointer-events: none;
  }

  @media screen and (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

const TitleContainer = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  position: relative;
  z-index: 2;
`;

const TitleIcon = styled.span`
  font-size: 2rem;
  display: inline-block;
  animation: ${pulse} 2s ease-in-out infinite;
  margin-right: 0.5rem;
`;

const SkillsTitle = styled.h2`
  font-size: 2.5rem;
  margin: 0.5rem 0;
  background: linear-gradient(45deg, ${props => props.isDarkMode ? '#484691' : '#3498db'}, ${props => props.isDarkMode ? '#c4babb' : '#2c3e50'});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;

  @media screen and (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1rem;
  color: ${props => props.isDarkMode ? '#c4babb' : '#7f8c8d'};
  margin-top: 0.5rem;
  font-weight: 300;
  font-style: italic;
`;

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 2;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const CategoryCard = styled.div`
  background: ${props => props.isDarkMode 
    ? 'linear-gradient(135deg, rgba(36, 30, 32, 0.8) 0%, rgba(26, 20, 22, 0.8) 100%)' 
    : 'linear-gradient(135deg, rgba(248, 249, 250, 0.9) 0%, rgba(233, 236, 239, 0.9) 100%)'};
  border-radius: 20px;
  padding: 1.25rem;
  border: 2px solid ${props => props.categoryColor}40;
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3),
              0 0 30px ${props => props.categoryColor}20;
  opacity: 0;
  animation: ${slideInUp} 0.6s ease-out forwards;
  animation-delay: ${props => props.delay}ms;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 50px rgba(0, 0, 0, 0.4),
                0 0 40px ${props => props.categoryColor}30;
  }
`;

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid ${props => props.isDarkMode ? '#484691' : '#3498db'}40;
`;

const CategoryIconWrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: linear-gradient(135deg, ${props => props.categoryColor}, ${props => props.categoryColor}CC);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 5px 15px ${props => props.categoryColor}50;
  animation: ${pulse} 3s ease-in-out infinite;
  
  svg {
    font-size: 20px;
  }
`;

const CategoryTitle = styled.h3`
  font-size: 1.2rem;
  color: ${props => props.isDarkMode ? '#c4babb' : '#2c3e50'};
  font-weight: 600;
  margin: 0;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 0.75rem;

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
  }
`;

const SkillOrb = styled.div`
  position: relative;
  background: ${props => props.isDarkMode 
    ? 'linear-gradient(135deg, rgba(26, 20, 22, 0.9) 0%, rgba(36, 30, 32, 0.9) 100%)' 
    : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 249, 250, 0.9) 100%)'};
  border-radius: 12px;
  padding: 0.75rem 0.5rem;
  border: 2px solid ${props => props.categoryColor}40;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: 0;
  animation: ${slideInUp} 0.5s ease-out forwards;
  animation-delay: ${props => props.delay}ms;
  box-shadow: ${props => props.isHovered 
    ? `0 10px 30px ${props.categoryColor}50, 0 0 20px ${props.masteryColor}40` 
    : '0 5px 15px rgba(0, 0, 0, 0.2)'};

  &:hover {
    transform: translateY(-8px) scale(1.05);
    border-color: ${props => props.categoryColor};
    background: ${props => props.isDarkMode 
      ? 'linear-gradient(135deg, rgba(36, 30, 32, 1) 0%, rgba(26, 20, 22, 1) 100%)' 
      : 'linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, rgba(248, 249, 250, 1) 100%)'};
  }
`;

const SkillIconWrapper = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${props => props.categoryColor}, ${props => props.masteryColor});
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 3px 10px ${props => props.categoryColor}50;
  transition: all 0.3s ease;
  animation: ${props => props.isHovered ? float : 'none'} 2s ease-in-out infinite;

  ${SkillOrb}:hover & {
    transform: scale(1.1) rotate(5deg);
    box-shadow: 0 6px 20px ${props => props.categoryColor}70;
  }
`;

const SkillName = styled.span`
  font-size: 0.7rem;
  color: ${props => props.isDarkMode ? '#c4babb' : '#2c3e50'};
  text-align: center;
  font-weight: 600;
  line-height: 1.1;
`;

const MasteryBadge = styled.div`
  font-size: 0.6rem;
  padding: 0.15rem 0.4rem;
  border-radius: 8px;
  background: ${props => props.masteryColor}30;
  color: ${props => props.masteryColor};
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`;

const LevelBar = styled.div`
  width: 100%;
  height: 4px;
  background-color: ${props => props.isDarkMode ? '#1a1416' : '#e9ecef'};
  border-radius: 8px;
  overflow: hidden;
  margin-top: 0.15rem;
`;

const LevelFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, ${props => props.categoryColor}, ${props => props.masteryColor});
  border-radius: 10px;
  animation: ${fillBar} 1.5s ease-out;
  box-shadow: 0 0 10px ${props => props.categoryColor}60;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
    animation: ${rotate} 2s linear infinite;
  }
`;

const LevelText = styled.span`
  font-size: 0.65rem;
  color: ${props => props.isDarkMode ? '#7f8c8d' : '#95a5a6'};
  font-weight: 600;
`;

const Tooltip = styled.div`
  position: absolute;
  bottom: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
  background: ${props => props.isDarkMode 
    ? 'linear-gradient(135deg, #241e20 0%, #1a1416 100%)' 
    : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)'};
  padding: 1rem;
  border-radius: 12px;
  border: 2px solid ${props => props.masteryColor};
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4),
              0 0 20px ${props => props.masteryColor}40;
  z-index: 1000;
  min-width: 150px;
  animation: ${slideInUp} 0.3s ease-out;
  pointer-events: none;

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 8px solid transparent;
    border-top-color: ${props => props.masteryColor};
  }
`;

const TooltipTitle = styled.div`
  font-size: 1rem;
  font-weight: 700;
  color: ${props => props.isDarkMode ? '#c4babb' : '#2c3e50'};
  margin-bottom: 0.5rem;
`;

const TooltipLevel = styled.div`
  font-size: 0.85rem;
  color: ${props => props.masteryColor};
  font-weight: 600;
  margin-bottom: 0.25rem;
`;

const TooltipProgress = styled.div`
  font-size: 0.8rem;
  color: ${props => props.isDarkMode ? '#7f8c8d' : '#95a5a6'};
`;

export default Skills;
