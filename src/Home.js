// src/components/Home.js
import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import NarutoImage from '../naruto_processed.jpg';
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
            {
                language: 'JavaScript',
                code: 'const greeting = "Hello World";\nconsole.log(greeting);',
                keywords: ['const', 'console.log'],
                strings: ['"Hello World"']
            },
            {
                language: 'Python',
                code: 'def fibonacci(n):\n    if n <= 1:\n        return n\n    return fibonacci(n-1) + fibonacci(n-2)',
                keywords: ['def', 'if', 'return'],
                strings: []
            },
            {
                language: 'Java',
                code: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello");\n    }\n}',
                keywords: ['public', 'class', 'static', 'void', 'String'],
                strings: ['"Hello"']
            },
            {
                language: 'React',
                code: 'function App() {\n    return (\n        <div>\n            <h1>Hello</h1>\n        </div>\n    );\n}',
                keywords: ['function', 'return'],
                strings: ['"Hello"'],
                jsx: true
            },
            {
                language: 'SQL',
                code: 'SELECT * FROM users\nWHERE age > 18\nORDER BY name;',
                keywords: ['SELECT', 'FROM', 'WHERE', 'ORDER BY'],
                strings: []
            }
        ];

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        class CodeSnippet {
            constructor() {
                this.reset();
                this.y = Math.random() * canvas.height;
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = -100;
                this.speed = Math.random() * 0.3 + 0.2; // Slower, more consistent speed
                this.opacity = Math.random() * 0.2 + 0.1; // More subtle opacity
                this.example = codeExamples[Math.floor(Math.random() * codeExamples.length)];
                this.fontSize = Math.random() * 2 + 12; // Less size variation
                this.rotation = (Math.random() - 0.5) * 0.05; // Less rotation
            }

            update() {
                this.y += this.speed;
                if (this.y > canvas.height + 100) {
                    this.reset();
                }
            }

            draw() {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.rotation);
                ctx.globalAlpha = this.opacity;
                ctx.font = `${this.fontSize}px 'Fira Code', monospace`;

                const lines = this.example.code.split('\n');
                const lineHeight = this.fontSize * 1.5;
                const maxWidth = Math.max(...lines.map(line => ctx.measureText(line).width));

                // Draw background with subtle gradient
                const gradient = ctx.createLinearGradient(0, -10, 0, lineHeight * lines.length + 10);
                if (isDarkMode) {
                    gradient.addColorStop(0, 'rgba(72, 70, 145, 0.1)');
                    gradient.addColorStop(1, 'rgba(72, 70, 145, 0.05)');
                } else {
                    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
                    gradient.addColorStop(1, 'rgba(255, 255, 255, 0.8)');
                }
                ctx.fillStyle = gradient;
                ctx.fillRect(-10, -10, maxWidth + 20, lineHeight * lines.length + 20);

                // Draw language label
                ctx.fillStyle = isDarkMode ? '#c4babb' : '#3498db';
                ctx.font = `${this.fontSize - 2}px 'Fira Code', monospace`;
                ctx.fillText(this.example.language, 0, -15);

                // Draw code
                lines.forEach((line, index) => {
                    let x = 0;
                    let currentText = '';
                    
                    for (let i = 0; i < line.length; i++) {
                        currentText += line[i];
                        
                        // Check for keywords
                        const matchedKeyword = this.example.keywords.find(keyword => currentText.endsWith(keyword));
                        if (matchedKeyword) {
                            ctx.fillStyle = isDarkMode ? '#c4babb' : '#2c3e50';
                            ctx.fillText(currentText.slice(0, -matchedKeyword.length), x, index * lineHeight);
                            x += ctx.measureText(currentText.slice(0, -matchedKeyword.length)).width;
                            
                            ctx.fillStyle = isDarkMode ? '#484691' : '#3498db';
                            ctx.fillText(matchedKeyword, x, index * lineHeight);
                            x += ctx.measureText(matchedKeyword).width;
                            
                            currentText = '';
                        }
                        // Check for strings
                        const matchedString = this.example.strings.find(str => currentText.endsWith(str));
                        if (matchedString) {
                            ctx.fillStyle = isDarkMode ? '#c4babb' : '#2c3e50';
                            ctx.fillText(currentText.slice(0, -matchedString.length), x, index * lineHeight);
                            x += ctx.measureText(currentText.slice(0, -matchedString.length)).width;
                            
                            ctx.fillStyle = isDarkMode ? '#c4babb' : '#e74c3c';
                            ctx.fillText(matchedString, x, index * lineHeight);
                            x += ctx.measureText(matchedString).width;
                            
                            currentText = '';
                        }
                    }
                    
                    if (currentText) {
                        ctx.fillStyle = isDarkMode ? '#c4babb' : '#2c3e50';
                        ctx.fillText(currentText, x, index * lineHeight);
                    }
                });

                ctx.restore();
            }
        }

        const init = () => {
            codeSnippets = [];
            const snippetCount = Math.min(6, Math.floor((canvas.width * canvas.height) / 100000));
            for (let i = 0; i < snippetCount; i++) {
                const snippet = new CodeSnippet();
                snippet.y = Math.random() * canvas.height;
                codeSnippets.push(snippet);
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            codeSnippets.forEach(snippet => {
                snippet.update();
                snippet.draw();
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        resizeCanvas();
        init();
        animate();

        window.addEventListener('resize', () => {
            resizeCanvas();
            init();
        });

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, [isDarkMode]);

    const scrollToAbout = () => {
        const aboutSection = document.getElementById("about");
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className='responsive-container'>
            <Canvas ref={canvasRef} />
            <HeroSection id="home" isDarkMode={isDarkMode}>
                <HeroContent isDarkMode={isDarkMode}>
                    <AnimatedText>Hello, I am</AnimatedText>
                    <AnimatedTitle>Anish Dhandore</AnimatedTitle>
                    <AnimatedText>Software Engineer</AnimatedText>
                    <br />
                    <ImageContainer>
                        <Image src={NarutoImage} alt="Naruto" />
                        <ImageGlow isDarkMode={isDarkMode} />
                    </ImageContainer>

                    <ButtonContainer>
                        <OpenButton
                            href="https://anishdhandore.github.io/Portfolio/AnishDhandoreResumeCopy.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            isDarkMode={isDarkMode}
                        >
                            View CV
                        </OpenButton>

                        <AboutButton id="about" onClick={scrollToAbout} isDarkMode={isDarkMode}>
                            About Me
                        </AboutButton>
                    </ButtonContainer>
                </HeroContent>
            </HeroSection>
        </div>
    );
};

const Canvas = styled.canvas`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
`;

const fadeIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const HeroSection = styled.section`
    height: 100vh;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    text-align: center;
    position: relative;
    z-index: 1;
    padding-top: 20px;
`;

const HeroContent = styled.div`
    animation: ${fadeIn} 0.5s ease-out;
    margin-top: 2rem;
    
    h1 {
        font-size: 3.0rem;
        color: ${props => props.isDarkMode ? '#c4babb' : '#2c3e50'};
        font-weight: 300;
        margin: 1rem 0;
    }

    text {
        color: ${props => props.isDarkMode ? '#c4babb' : '#2c3e50'};
    }
`;

const AnimatedText = styled.text`
    display: block;
    animation: ${fadeIn} 0.3s ease-out;
    font-size: 1.5rem;
    margin: 0.5rem 0;
`;

const AnimatedTitle = styled.h1`
    font-size: 4rem !important;
    background: linear-gradient(45deg, ${props => props.isDarkMode ? '#484691' : '#3498db'}, ${props => props.isDarkMode ? '#c4babb' : '#2c3e50'});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: ${fadeIn} 1s ease-out;
    margin: 1rem 0;
`;

const ImageContainer = styled.div`
    position: relative;
    margin: 2rem auto;
    width: 30%;
    max-width: 200px;
`;

const Image = styled.img`
    width: 100%;
    height: auto;
    border-radius: 50%;
    position: relative;
    z-index: 1;
    transition: transform 0.3s ease;

    &:hover {
        transform: scale(1.05);
    }
`;

const ImageGlow = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    background: ${props => props.isDarkMode ? 'rgba(72, 70, 145, 0.3)' : 'rgba(52, 152, 219, 0.3)'};
    border-radius: 50%;
    filter: blur(20px);
    z-index: 0;
`;

const ButtonContainer = styled.div`
    margin-top: 2rem;
    display: flex;
    justify-content: center;
    gap: 1.5rem;
`;

const OpenButton = styled.a`
    background-color: transparent;
    color: ${props => props.isDarkMode ? '#484691' : '#2c3e50'};
    padding: 0.75rem 1.5rem;
    border: 1px solid ${props => props.isDarkMode ? '#484691' : '#2c3e50'};
    cursor: pointer;
    text-decoration: none;
    font-size: 1rem;
    border-radius: 5px;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;

    &:before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(
            90deg,
            transparent,
            ${props => props.isDarkMode ? 'rgba(72, 70, 145, 0.2)' : 'rgba(52, 152, 219, 0.2)'},
            transparent
        );
        transition: 0.5s;
    }

    &:hover:before {
        left: 100%;
    }

    &:hover {
        color: ${props => props.isDarkMode ? '#c4babb' : '#3498db'};
        transform: translateY(-2px);
    }
`;

const AboutButton = styled.a`
    background-color: ${props => props.isDarkMode ? '#484691' : '#3498db'};
    color: ${props => props.isDarkMode ? '#c4babb' : '#ffffff'};
    padding: 0.75rem 1.5rem;
    border: none;
    cursor: pointer;
    text-decoration: none;
    font-size: 1rem;
    border-radius: 5px;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;

    &:before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
        );
        transition: 0.5s;
    }

    &:hover:before {
        left: 100%;
    }

    &:hover {
        background-color: ${props => props.isDarkMode ? '#5a56b3' : '#2980b9'};
        transform: translateY(-2px);
    }
`;

export default Home;
