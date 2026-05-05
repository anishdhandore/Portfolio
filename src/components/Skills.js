import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import {
  FaCode, FaServer, FaDesktop, FaDatabase, FaCloud, FaCog,
} from 'react-icons/fa';
import {
  SiPython, SiJavascript, SiTypescript, SiCplusplus, SiSwift, SiCsharp,
  SiNodedotjs, SiExpress, SiFastapi, SiFlask, SiDotnet, SiReact, SiNextdotjs,
  SiRedux, SiTailwindcss, SiPostgresql, SiMysql, SiMongodb, SiRedis,
  SiAmazon, SiDocker, SiGithubactions, SiFirebase, SiLinux,
} from 'react-icons/si';
import { useTheme } from '../context/ThemeContext';

const skillCategories = {
  Languages: {
    icon: FaCode,
    color: '#F87171',
    skills: [
      { name: 'Python 3',        level: 95, icon: SiPython },
      { name: 'JavaScript',      level: 92, icon: SiJavascript },
      { name: 'TypeScript',      level: 90, icon: SiTypescript },
      { name: 'C++ 17/20',       level: 88, icon: SiCplusplus },
      { name: 'Java',            level: 85, icon: FaCode },
      { name: 'Swift',           level: 80, icon: SiSwift },
      { name: 'C#',              level: 82, icon: SiCsharp },
      { name: 'SQL',             level: 90, icon: FaDatabase },
      { name: 'Bash',            level: 85, icon: FaCode },
    ],
  },
  Backend: {
    icon: FaServer,
    color: '#34D399',
    skills: [
      { name: 'Node.js',     level: 92, icon: SiNodedotjs },
      { name: 'Express',     level: 90, icon: SiExpress },
      { name: 'FastAPI',     level: 88, icon: SiFastapi },
      { name: 'Flask',       level: 85, icon: SiFlask },
      { name: 'ASP.NET',     level: 80, icon: SiDotnet },
      { name: 'REST/gRPC',   level: 90, icon: FaCode },
      { name: 'WebSockets',  level: 85, icon: FaCode },
    ],
  },
  Frontend: {
    icon: FaDesktop,
    color: '#60A5FA',
    skills: [
      { name: 'React',       level: 95, icon: SiReact },
      { name: 'Next.js',     level: 88, icon: SiNextdotjs },
      { name: 'Redux/RTK',   level: 90, icon: SiRedux },
      { name: 'React Query', level: 85, icon: FaDesktop },
      { name: 'Tailwind',    level: 92, icon: SiTailwindcss },
      { name: 'Chakra UI',   level: 88, icon: FaDesktop },
    ],
  },
  Databases: {
    icon: FaDatabase,
    color: '#FBBF24',
    skills: [
      { name: 'PostgreSQL', level: 90, icon: SiPostgresql },
      { name: 'MySQL',      level: 88, icon: SiMysql },
      { name: 'SQLite',     level: 85, icon: FaDatabase },
      { name: 'MongoDB',    level: 87, icon: SiMongodb },
      { name: 'Redis',      level: 82, icon: SiRedis },
    ],
  },
  'Cloud/DevOps': {
    icon: FaCloud,
    color: '#A78BFA',
    skills: [
      { name: 'AWS',             level: 85, icon: SiAmazon },
      { name: 'Docker',          level: 90, icon: SiDocker },
      { name: 'GitHub Actions',  level: 88, icon: SiGithubactions },
      { name: 'Firebase',        level: 85, icon: SiFirebase },
      { name: 'Linux',           level: 90, icon: SiLinux },
      { name: 'CI/CD',           level: 88, icon: SiGithubactions },
    ],
  },
  Automation: {
    icon: FaCog,
    color: '#F472B6',
    skills: [
      { name: 'Test Automation',  level: 88, icon: FaCog },
      { name: 'Code Refactoring', level: 92, icon: FaCode },
      { name: 'Log Analysis',     level: 85, icon: FaCog },
    ],
  },
};

const getMastery = (level) => {
  if (level >= 90) return { name: 'Master',       color: '#F59E0B' };
  if (level >= 80) return { name: 'Expert',        color: '#F87171' };
  if (level >= 70) return { name: 'Advanced',      color: '#34D399' };
  if (level >= 60) return { name: 'Intermediate',  color: '#60A5FA' };
  return               { name: 'Novice',         color: '#A78BFA' };
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
            Object.values(skillCategories).forEach((cat) => {
              cat.skills.forEach((skill, i) => {
                setTimeout(() => {
                  setAnimatedSkills(prev => ({ ...prev, [skill.name]: skill.level }));
                }, i * 40);
              });
            });
          }
        });
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, []);

  return (
    <div className="responsive-container">
      <SkillsSection id="skills" isDarkMode={isDarkMode} ref={sectionRef}>
        <SectionHeader>
          <SectionLabel isDarkMode={isDarkMode}>Technical Arsenal</SectionLabel>
          <SectionTitle isDarkMode={isDarkMode}>Skill Constellation</SectionTitle>
          <SectionSub isDarkMode={isDarkMode}>Master your tools, master your craft</SectionSub>
        </SectionHeader>

        <Grid>
          {Object.entries(skillCategories).map(([catName, cat], catIdx) => {
            const CatIcon = cat.icon;
            return (
              <CategoryCard key={catName} isDarkMode={isDarkMode} accentColor={cat.color} delay={catIdx * 80}>
                <CatHeader>
                  <CatIconWrap accentColor={cat.color}>
                    <CatIcon size={20} color="#fff" />
                  </CatIconWrap>
                  <CatName isDarkMode={isDarkMode}>{catName}</CatName>
                </CatHeader>

                <SkillGrid>
                  {cat.skills.map((skill, skillIdx) => {
                    const SkillIcon = skill.icon || FaCode;
                    const animated = animatedSkills[skill.name] || 0;
                    const mastery = getMastery(skill.level);
                    const hovered = hoveredSkill === skill.name;

                    return (
                      <SkillChip
                        key={skill.name}
                        isDarkMode={isDarkMode}
                        accentColor={cat.color}
                        hovered={hovered}
                        delay={(catIdx * 40) + (skillIdx * 25)}
                        onMouseEnter={() => setHoveredSkill(skill.name)}
                        onMouseLeave={() => setHoveredSkill(null)}
                      >
                        <ChipIcon accentColor={cat.color} masteryColor={mastery.color}>
                          <SkillIcon size={16} />
                        </ChipIcon>
                        <ChipName isDarkMode={isDarkMode}>{skill.name}</ChipName>
                        <MasteryTag masteryColor={mastery.color}>{mastery.name}</MasteryTag>
                        <ChipTrack isDarkMode={isDarkMode}>
                          <ChipFill style={{ width: `${animated}%` }} accentColor={cat.color} />
                        </ChipTrack>
                        <ChipPct isDarkMode={isDarkMode}>{animated}%</ChipPct>

                        {hovered && (
                          <Tooltip isDarkMode={isDarkMode} masteryColor={mastery.color}>
                            <TipName>{skill.name}</TipName>
                            <TipMastery masteryColor={mastery.color}>{mastery.name}</TipMastery>
                            <TipPct isDarkMode={isDarkMode}>{skill.level}%</TipPct>
                          </Tooltip>
                        )}
                      </SkillChip>
                    );
                  })}
                </SkillGrid>
              </CategoryCard>
            );
          })}
        </Grid>
      </SkillsSection>
    </div>
  );
};

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const fillBar = keyframes`from { width: 0%; }`;

const SkillsSection = styled.section`
  padding: 5rem 1rem 4rem;
  overflow: hidden;
  background: ${props => props.isDarkMode
    ? 'linear-gradient(180deg, #0A0814 0%, #06050A 100%)'
    : 'linear-gradient(180deg, #F3EEFF 0%, #FDFCFF 100%)'};
  position: relative;
  z-index: 1;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
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
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: ${props => props.isDarkMode ? '#F1EEFF' : '#1C1528'};
  margin-bottom: 0.5rem;
`;

const SectionSub = styled.p`
  font-size: 0.95rem;
  color: ${props => props.isDarkMode ? '#9D97B8' : '#5C5470'};
  font-style: italic;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.1rem;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 580px) {
    grid-template-columns: 1fr;
  }
`;

const CategoryCard = styled.div`
  background: ${props => props.isDarkMode
    ? 'rgba(14,12,21,0.7)'
    : 'rgba(255,255,255,0.8)'};
  border: 1px solid ${props => `${props.accentColor}25`};
  border-radius: 18px;
  padding: 1.5rem;
  backdrop-filter: blur(12px);
  box-shadow: 0 4px 24px ${props => props.isDarkMode ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.05)'};
  opacity: 0;
  animation: ${fadeUp} 0.5s ${props => props.delay}ms ease-out forwards;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    border-color: ${props => `${props.accentColor}50`};
    box-shadow: 0 8px 32px ${props => `${props.accentColor}15`};
  }
`;

const CatHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
  padding-bottom: 0.85rem;
  border-bottom: 1px solid rgba(139,92,246,0.12);
`;

const CatIconWrap = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: linear-gradient(135deg, ${props => props.accentColor}, ${props => props.accentColor}99);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px ${props => props.accentColor}40;
  flex-shrink: 0;
`;

const CatName = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  color: ${props => props.isDarkMode ? '#F1EEFF' : '#1C1528'};
  margin: 0;
`;

const SkillGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(95px, 1fr));
  gap: 0.6rem;
`;

const SkillChip = styled.div`
  position: relative;
  border-radius: 12px;
  padding: 0.65rem 0.5rem;
  background: ${props => props.isDarkMode
    ? 'rgba(139,92,246,0.04)'
    : 'rgba(124,58,237,0.03)'};
  border: 1px solid ${props => props.hovered
    ? `${props.accentColor}60`
    : `${props.accentColor}20`};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  cursor: default;
  opacity: 0;
  animation: ${fadeUp} 0.4s ${props => props.delay}ms ease-out forwards;
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px ${props => `${props.accentColor}25`};
  }
`;

const ChipIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, ${props => props.accentColor}30, ${props => props.masteryColor}20);
  color: ${props => props.accentColor};
  transition: transform 0.2s ease;

  ${SkillChip}:hover & { transform: scale(1.1); }
`;

const ChipName = styled.span`
  font-size: 0.65rem;
  font-weight: 600;
  text-align: center;
  color: ${props => props.isDarkMode ? '#F1EEFF' : '#1C1528'};
  line-height: 1.2;
`;

const MasteryTag = styled.div`
  font-size: 0.55rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 0.1rem 0.35rem;
  border-radius: 6px;
  background: ${props => props.masteryColor}22;
  color: ${props => props.masteryColor};
`;

const ChipTrack = styled.div`
  width: 100%;
  height: 3px;
  border-radius: 3px;
  background: ${props => props.isDarkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'};
  overflow: hidden;
`;

const ChipFill = styled.div`
  height: 100%;
  border-radius: 3px;
  background: ${props => props.accentColor};
  animation: ${fillBar} 1.2s ease-out;
`;

const ChipPct = styled.span`
  font-size: 0.6rem;
  font-weight: 600;
  color: ${props => props.isDarkMode ? '#5C5470' : '#9D97B8'};
`;

const Tooltip = styled.div`
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  background: ${props => props.isDarkMode ? 'rgba(14,12,21,0.97)' : 'rgba(255,255,255,0.97)'};
  border: 1px solid ${props => props.masteryColor}55;
  border-radius: 10px;
  padding: 0.75rem;
  min-width: 130px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.25);
  z-index: 100;
  pointer-events: none;
  animation: ${fadeUp} 0.2s ease-out;

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 6px solid transparent;
    border-top-color: ${props => props.masteryColor}55;
  }
`;

const TipName = styled.div`
  font-size: 0.85rem;
  font-weight: 700;
  color: ${props => props.isDarkMode ? '#F1EEFF' : '#1C1528'};
  margin-bottom: 0.25rem;
`;

const TipMastery = styled.div`
  font-size: 0.75rem;
  font-weight: 600;
  color: ${props => props.masteryColor};
  margin-bottom: 0.15rem;
`;

const TipPct = styled.div`
  font-size: 0.7rem;
  color: ${props => props.isDarkMode ? '#9D97B8' : '#5C5470'};
`;

export default Skills;
