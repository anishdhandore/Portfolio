import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import ProfileImage from '../images/profile_icon_no_bg.png';
import { useTheme } from '../context/ThemeContext';

const Home = () => {
  const { isDarkMode } = useTheme();
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let codeSnippets = [];

    const codeExamples = [
      { language: 'JavaScript', code: 'const greeting = "Hello World";\nconsole.log(greeting);', keywords: ['const', 'console.log'], strings: ['"Hello World"'] },
      { language: 'Python', code: 'def fibonacci(n):\n    if n <= 1:\n        return n\n    return fibonacci(n-1) + fibonacci(n-2)', keywords: ['def', 'if', 'return'], strings: [] },
      { language: 'Java', code: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello");\n    }\n}', keywords: ['public', 'class', 'static', 'void', 'String'], strings: ['"Hello"'] },
      { language: 'React', code: 'function App() {\n    return (\n        <div>\n            <h1>Hello</h1>\n        </div>\n    );\n}', keywords: ['function', 'return'], strings: ['"Hello"'], jsx: true },
      { language: 'SQL', code: 'SELECT * FROM users\nWHERE age > 18\nORDER BY name;', keywords: ['SELECT', 'FROM', 'WHERE', 'ORDER BY'], strings: [] },
    ];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class CodeSnippet {
      constructor() { this.reset(); this.y = Math.random() * canvas.height; }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = -100;
        this.speed = Math.random() * 0.25 + 0.15;
        this.opacity = Math.random() * 0.12 + 0.04;
        this.example = codeExamples[Math.floor(Math.random() * codeExamples.length)];
        this.fontSize = Math.random() * 2 + 11;
        this.rotation = (Math.random() - 0.5) * 0.04;
      }
      update() { this.y += this.speed; if (this.y > canvas.height + 100) this.reset(); }
      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.opacity;
        ctx.font = `${this.fontSize}px 'Fira Code', monospace`;

        const lines = this.example.code.split('\n');
        const lineHeight = this.fontSize * 1.5;
        const maxWidth = Math.max(...lines.map(l => ctx.measureText(l).width));

        const gradient = ctx.createLinearGradient(0, -10, 0, lineHeight * lines.length + 10);
        if (isDarkMode) {
          gradient.addColorStop(0, 'rgba(139,92,246,0.08)');
          gradient.addColorStop(1, 'rgba(139,92,246,0.03)');
        } else {
          gradient.addColorStop(0, 'rgba(124,58,237,0.06)');
          gradient.addColorStop(1, 'rgba(124,58,237,0.02)');
        }
        ctx.fillStyle = gradient;
        ctx.fillRect(-10, -10, maxWidth + 20, lineHeight * lines.length + 20);

        ctx.fillStyle = isDarkMode ? '#8B5CF6' : '#7C3AED';
        ctx.font = `${this.fontSize - 2}px 'Fira Code', monospace`;
        ctx.fillText(this.example.language, 0, -15);

        lines.forEach((line, index) => {
          let x = 0;
          let currentText = '';
          for (let i = 0; i < line.length; i++) {
            currentText += line[i];
            const matchedKeyword = this.example.keywords.find(k => currentText.endsWith(k));
            if (matchedKeyword) {
              ctx.fillStyle = isDarkMode ? '#9D97B8' : '#5C5470';
              ctx.fillText(currentText.slice(0, -matchedKeyword.length), x, index * lineHeight);
              x += ctx.measureText(currentText.slice(0, -matchedKeyword.length)).width;
              ctx.fillStyle = isDarkMode ? '#8B5CF6' : '#7C3AED';
              ctx.fillText(matchedKeyword, x, index * lineHeight);
              x += ctx.measureText(matchedKeyword).width;
              currentText = '';
            }
            const matchedString = this.example.strings.find(s => currentText.endsWith(s));
            if (matchedString) {
              ctx.fillStyle = isDarkMode ? '#9D97B8' : '#5C5470';
              ctx.fillText(currentText.slice(0, -matchedString.length), x, index * lineHeight);
              x += ctx.measureText(currentText.slice(0, -matchedString.length)).width;
              ctx.fillStyle = isDarkMode ? '#A78BFA' : '#9333EA';
              ctx.fillText(matchedString, x, index * lineHeight);
              x += ctx.measureText(matchedString).width;
              currentText = '';
            }
          }
          if (currentText) {
            ctx.fillStyle = isDarkMode ? '#9D97B8' : '#5C5470';
            ctx.fillText(currentText, x, index * lineHeight);
          }
        });
        ctx.restore();
      }
    }

    const init = () => {
      codeSnippets = [];
      const count = Math.min(5, Math.floor((canvas.width * canvas.height) / 120000));
      for (let i = 0; i < count; i++) {
        const s = new CodeSnippet();
        s.y = Math.random() * canvas.height;
        codeSnippets.push(s);
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      codeSnippets.forEach(s => { s.update(); s.draw(); });
      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas(); init(); animate();
    window.addEventListener('resize', () => { resizeCanvas(); init(); });
    return () => { window.removeEventListener('resize', resizeCanvas); cancelAnimationFrame(animationFrameId); };
  }, [isDarkMode]);

  const scrollToAbout = () => {
    const el = document.getElementById('about');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="responsive-container">
      <Canvas ref={canvasRef} />
      <HeroSection id="home" isDarkMode={isDarkMode}>
        <HeroContent>
          <Greeting isDarkMode={isDarkMode}>Hello, I'm</Greeting>
          <HeroName isDarkMode={isDarkMode}>Anish<br />Dhandore</HeroName>
          <HeroRole isDarkMode={isDarkMode}>Software Engineer</HeroRole>

          <ProfileWrapper>
            <ProfileRing isDarkMode={isDarkMode} />
            <ProfileRingOuter isDarkMode={isDarkMode} />
            <ProfileImg src={ProfileImage} alt="Anish Dhandore" />
          </ProfileWrapper>

          <ButtonRow>
            <PrimaryBtn
              href="https://anishdhandore.github.io/Portfolio/AnishDhandoreResume-8.pdf"
              target="_blank"
              rel="noopener noreferrer"
              isDarkMode={isDarkMode}
            >
              View CV
            </PrimaryBtn>
            <GhostBtn onClick={scrollToAbout} isDarkMode={isDarkMode}>
              About Me
            </GhostBtn>
          </ButtonRow>
        </HeroContent>
      </HeroSection>
    </div>
  );
};

const Canvas = styled.canvas`
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  z-index: 0;
`;

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  z-index: 1;
  padding: 80px 1rem 2rem;
  background: ${props => props.isDarkMode
    ? 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(139,92,246,0.06) 0%, transparent 70%)'
    : 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(124,58,237,0.04) 0%, transparent 70%)'};
`;

const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
  animation: ${fadeUp} 0.7s ease-out both;
`;

const Greeting = styled.span`
  font-size: 0.95rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: ${props => props.isDarkMode ? '#8B5CF6' : '#7C3AED'};
  margin-bottom: 0.75rem;
  animation: ${fadeUp} 0.5s 0.1s ease-out both;
`;

const HeroName = styled.h1`
  font-size: clamp(2.8rem, 10vw, 7rem);
  font-weight: 800;
  line-height: 0.95;
  letter-spacing: -0.03em;
  margin: 0 0 1.25rem;
  color: ${props => props.isDarkMode ? '#F1EEFF' : '#1C1528'};
  animation: ${fadeUp} 0.6s 0.15s ease-out both;
  word-break: break-word;
`;

const HeroRole = styled.p`
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  font-weight: 400;
  color: ${props => props.isDarkMode ? '#9D97B8' : '#5C5470'};
  letter-spacing: 0.04em;
  margin-bottom: 2.5rem;
  animation: ${fadeUp} 0.6s 0.2s ease-out both;
`;

const ProfileWrapper = styled.div`
  position: relative;
  width: clamp(160px, 25vw, 220px);
  height: clamp(160px, 25vw, 220px);
  margin-bottom: 2.5rem;
  animation: ${fadeUp} 0.6s 0.25s ease-out both;
`;

const ringPulse = keyframes`
  0%, 100% { transform: translate(-50%,-50%) scale(1); opacity: 0.6; }
  50%       { transform: translate(-50%,-50%) scale(1.06); opacity: 0.3; }
`;

const ProfileRing = styled.div`
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%,-50%);
  width: 106%;
  height: 106%;
  border-radius: 50%;
  border: 2px solid ${props => props.isDarkMode ? '#8B5CF6' : '#7C3AED'};
  animation: ${ringPulse} 3s ease-in-out infinite;
`;

const ProfileRingOuter = styled.div`
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%,-50%);
  width: 115%;
  height: 115%;
  border-radius: 50%;
  border: 1px solid ${props => props.isDarkMode ? 'rgba(139,92,246,0.3)' : 'rgba(124,58,237,0.2)'};
  animation: ${ringPulse} 3s 0.8s ease-in-out infinite;
`;

const ProfileImg = styled.img`
  width: 100%; height: 100%;
  border-radius: 50%;
  object-fit: cover;
  position: relative;
  z-index: 1;
  transition: transform 0.3s ease;

  &:hover { transform: scale(1.04); }
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  animation: ${fadeUp} 0.6s 0.35s ease-out both;
`;

const PrimaryBtn = styled.a`
  padding: 0.75rem 1.75rem;
  border-radius: 10px;
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${props => props.isDarkMode ? '#8B5CF6' : '#7C3AED'};
  color: #fff;
  border: 2px solid transparent;
  box-shadow: 0 4px 20px ${props => props.isDarkMode ? 'rgba(139,92,246,0.35)' : 'rgba(124,58,237,0.25)'};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 28px ${props => props.isDarkMode ? 'rgba(139,92,246,0.5)' : 'rgba(124,58,237,0.4)'};
  }
`;

const GhostBtn = styled.button`
  padding: 0.75rem 1.75rem;
  border-radius: 10px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  background: transparent;
  color: ${props => props.isDarkMode ? '#8B5CF6' : '#7C3AED'};
  border: 2px solid ${props => props.isDarkMode ? 'rgba(139,92,246,0.45)' : 'rgba(124,58,237,0.35)'};

  &:hover {
    transform: translateY(-2px);
    background: ${props => props.isDarkMode ? 'rgba(139,92,246,0.1)' : 'rgba(124,58,237,0.07)'};
    border-color: ${props => props.isDarkMode ? '#8B5CF6' : '#7C3AED'};
  }
`;

export default Home;
