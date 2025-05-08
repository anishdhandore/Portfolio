import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    width: 100%;
  }

  body {
    font-family: 'Poppins', sans-serif;
    background-color: ${props => props.isDarkMode ? '#040a1c' : '#ffffff'};
    color: ${props => props.isDarkMode ? '#ffffff' : '#333333'};
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  h1, h2, h3, h4 {
    font-weight: bold;
    color: ${props => props.isDarkMode ? '#484691' : '#2c3e50'};
  }

  button {
    background-color: #ff5a1f;
    color: #ffffff;
    border: none;
    padding: 0.75rem 1.5rem;
    cursor: pointer;
    font-size: 1rem;
  }

  button:hover {
    background-color: #e14d1b;
  }
`;