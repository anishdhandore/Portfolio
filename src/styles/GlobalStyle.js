// src/styles/GlobalStyle.js
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
    // background-color: #0a091c;  /* Updated background color */
    background-color: #040a1c;
    color: #ffffff;
  }

  h1, h2, h3, h4 {
    font-weight: bold;
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
