import '@fontsource/open-sans';
import '@fontsource-variable/inter';
import '@fontsource-variable/inter-tight';
import './styles/tokens.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
