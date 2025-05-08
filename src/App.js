import React from 'react';
import { GlobalStyle } from './styles/GlobalStyle';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Experience from './components/Experience';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import '@fontsource/poppins';

const AppContent = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <>
      <GlobalStyle isDarkMode={isDarkMode} />
      <Navbar />
      <Home />
      <About />
      <Experience/>
      <Portfolio />
      <Contact />
      <Footer />
    </>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;