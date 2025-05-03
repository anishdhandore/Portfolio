// src/App.js
import React from 'react';
import { GlobalStyle } from './styles/GlobalStyle';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Experience from './components/Experience';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';
// src/index.js or src/App.js
import '@fontsource/poppins';  // Defaults to weight 400


function App() {
  return (
    <>
      <GlobalStyle />
      <Navbar />
      <Home />
      <About />
      <Experience/>
      <Portfolio />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
