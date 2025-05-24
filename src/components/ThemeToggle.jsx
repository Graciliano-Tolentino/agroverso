import React, { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow transition"
      aria-label="Alternar tema"
    >
      {darkMode ? '🌙' : '☀️'}
    </button>
  );
}
