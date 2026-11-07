// src/App.js
import React, { useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/navbar/Navbar';
import Hero from './components/hero/Hero';
import ScrollTrail from './components/scroll-trail/ScrollTrail';
import BridgedShowcase from './components/bridged/BridgedShowcase';
import ProjectDeck from './components/deck/ProjectDeck';
import CaseStudyPage from './pages/case-study/CaseStudyPage';
import { matchCaseStudy, useLinkInterception, useRoute } from './lib/router';
import Experience from './components/experience/Experience';
import Contact from './components/contact/Contact';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  /* Keep anchored sections clear of the fixed navbar */
  section[id] {
    scroll-margin-top: calc(var(--nav-offset) + var(--nav-height) + 16px);
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
    background: var(--color-paper);
  }

  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }

  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb {
    background: rgba(139,92,246,0.4);
    border-radius: 6px;
  }
  ::-webkit-scrollbar-thumb:hover { background: rgba(139,92,246,0.7); }
`;

const HomePage = () => (
  <>
    <ScrollTrail />
    <Hero />
    <BridgedShowcase />
    <ProjectDeck />
    <Experience />
    <Contact />
  </>
);

const App = () => {
  const { pathname } = useRoute();
  const caseStudySlug = matchCaseStudy(pathname);
  useLinkInterception();

  useEffect(() => {
    // Add smooth scrolling to all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }, []);

  return (
    <ThemeProvider>
      <GlobalStyle />
      <Navbar />
      {caseStudySlug ? <CaseStudyPage key={caseStudySlug} slug={caseStudySlug} /> : <HomePage />}
    </ThemeProvider>
  );
};

export default App;
