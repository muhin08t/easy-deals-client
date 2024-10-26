import React, { useState, useEffect } from 'react';

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState('light'); // Default theme

  // Toggle between themes
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    // Set `data-theme` attribute on `html` tag
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="p-6">
      <button onClick={toggleTheme} className="btn btn-primary">
        Toggle Theme
      </button>
      <p className="mt-4">Current theme: {theme}</p>
    </div>
  );
};

export default ThemeSwitcher;
