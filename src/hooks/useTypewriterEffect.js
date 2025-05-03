import { useState, useEffect } from 'react';

const useTypewriterEffect = (text, speed = 100) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let currentIndex = 0;

    const typeCharacter = () => {
      setDisplayedText((prev) => prev + text[currentIndex]);
      currentIndex++;
      if (currentIndex < text.length) {
        setTimeout(typeCharacter, speed);
      }
    };

    const timer = setTimeout(typeCharacter, speed); // Start typing

    return () => clearTimeout(timer); // Cleanup timeout on unmount
  }, [text, speed]);

  return displayedText;
};

export default useTypewriterEffect;
