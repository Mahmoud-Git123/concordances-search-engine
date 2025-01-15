'use client'
import { useEffect } from 'react';

const ThemeToggle = () => {
  useEffect(() => {
    const toggleButton = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);

    const toggleTheme = () => {
      const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    };

    toggleButton?.addEventListener('click', toggleTheme);

    return () => {
      toggleButton?.removeEventListener('click', toggleTheme);
    };
  }, []);

  return null;
};

export default ThemeToggle;