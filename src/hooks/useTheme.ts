import React from 'react';

export const useDarkMode = () => {
  const [darkMode, toggleDarkMode] = React.useReducer(
    (previous) => !previous,
    true
  );

  return [darkMode, toggleDarkMode] as const;
};
