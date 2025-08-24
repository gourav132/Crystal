import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('teal');

  // Luxury color themes
  const colorThemes = {
    teal: {
      name: "teal",
      label: "Ocean Teal",
      colors: {
        primary: "from-teal-500",
        secondary: "to-emerald-600",
        light: "from-teal-400",
        dark: "to-emerald-700"
      }
    },
    purple: {
      name: "purple",
      label: "Royal Purple",
      colors: {
        primary: "from-purple-500",
        secondary: "to-indigo-600",
        light: "from-purple-400",
        dark: "to-indigo-700"
      }
    },
    rose: {
      name: "rose",
      label: "Rose Gold",
      colors: {
        primary: "from-rose-500",
        secondary: "to-pink-600",
        light: "from-rose-400",
        dark: "to-pink-700"
      }
    },
    amber: {
      name: "amber",
      label: "Golden Amber",
      colors: {
        primary: "from-amber-500",
        secondary: "to-orange-600",
        light: "from-amber-400",
        dark: "to-orange-700"
      }
    },
    emerald: {
      name: "emerald",
      label: "Emerald Green",
      colors: {
        primary: "from-emerald-500",
        secondary: "to-teal-600",
        light: "from-emerald-400",
        dark: "to-teal-700"
      }
    },
    sapphire: {
      name: "sapphire",
      label: "Sapphire Blue",
      colors: {
        primary: "from-blue-500",
        secondary: "to-indigo-600",
        light: "from-blue-400",
        dark: "to-indigo-700"
      }
    },
    crimson: {
      name: "crimson",
      label: "Crimson Red",
      colors: {
        primary: "from-red-500",
        secondary: "to-rose-600",
        light: "from-red-400",
        dark: "to-rose-700"
      }
    },
    violet: {
      name: "violet",
      label: "Deep Violet",
      colors: {
        primary: "from-violet-500",
        secondary: "to-purple-600",
        light: "from-violet-400",
        dark: "to-purple-700"
      }
    },
    cyan: {
      name: "cyan",
      label: "Ocean Cyan",
      colors: {
        primary: "from-cyan-500",
        secondary: "to-blue-600",
        light: "from-cyan-400",
        dark: "to-blue-700"
      }
    },
    lime: {
      name: "lime",
      label: "Fresh Lime",
      colors: {
        primary: "from-lime-500",
        secondary: "to-green-600",
        light: "from-lime-400",
        dark: "to-green-700"
      }
    },
    indigo: {
      name: "indigo",
      label: "Royal Indigo",
      colors: {
        primary: "from-indigo-500",
        secondary: "to-blue-600",
        light: "from-indigo-400",
        dark: "to-blue-700"
      }
    },
    fuchsia: {
      name: "fuchsia",
      label: "Vibrant Fuchsia",
      colors: {
        primary: "from-fuchsia-500",
        secondary: "to-pink-600",
        light: "from-fuchsia-400",
        dark: "to-pink-700"
      }
    },
    sky: {
      name: "sky",
      label: "Sky Blue",
      colors: {
        primary: "from-sky-500",
        secondary: "to-blue-600",
        light: "from-sky-400",
        dark: "to-blue-700"
      }
    },
    orange: {
      name: "orange",
      label: "Sunset Orange",
      colors: {
        primary: "from-orange-500",
        secondary: "to-red-600",
        light: "from-orange-400",
        dark: "to-red-700"
      }
    },
    green: {
      name: "green",
      label: "Forest Green",
      colors: {
        primary: "from-green-500",
        secondary: "to-emerald-600",
        light: "from-green-400",
        dark: "to-emerald-700"
      }
    },
    pink: {
      name: "pink",
      label: "Soft Pink",
      colors: {
        primary: "from-pink-500",
        secondary: "to-rose-600",
        light: "from-pink-400",
        dark: "to-rose-700"
      }
    },
    yellow: {
      name: "yellow",
      label: "Golden Yellow",
      colors: {
        primary: "from-yellow-500",
        secondary: "to-amber-600",
        light: "from-yellow-400",
        dark: "to-amber-700"
      }
    },
    slate: {
      name: "slate",
      label: "Modern Slate",
      colors: {
        primary: "from-slate-500",
        secondary: "to-gray-600",
        light: "from-slate-400",
        dark: "to-gray-700"
      }
    },
    zinc: {
      name: "zinc",
      label: "Elegant Zinc",
      colors: {
        primary: "from-zinc-500",
        secondary: "to-gray-600",
        light: "from-zinc-400",
        dark: "to-gray-700"
      }
    },
    neutral: {
      name: "neutral",
      label: "Classic Neutral",
      colors: {
        primary: "from-neutral-500",
        secondary: "to-gray-600",
        light: "from-neutral-400",
        dark: "to-gray-700"
      }
    },
    stone: {
      name: "stone",
      label: "Warm Stone",
      colors: {
        primary: "from-stone-500",
        secondary: "to-gray-600",
        light: "from-stone-400",
        dark: "to-gray-700"
      }
    }
  };

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    const savedTheme = localStorage.getItem('theme') || 'teal';
    
    setDarkMode(savedDarkMode);
    setSelectedTheme(savedTheme);
    
    // Apply theme to document
    applyTheme(savedDarkMode, savedTheme);
  }, []);

  const applyTheme = (isDark, theme) => {
    const root = document.documentElement;
    
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    // Set CSS custom properties for theme colors
    const themeColors = colorThemes[theme];
    if (themeColors) {
      root.style.setProperty('--primary-gradient', `${themeColors.colors.primary} ${themeColors.colors.secondary}`);
      root.style.setProperty('--light-gradient', `${themeColors.colors.light} ${themeColors.colors.secondary}`);
    }
  };

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    applyTheme(newDarkMode, selectedTheme);
  };

  const changeTheme = (theme) => {
    setSelectedTheme(theme);
    localStorage.setItem('theme', theme);
    applyTheme(darkMode, theme);
  };

  const getCurrentTheme = () => colorThemes[selectedTheme];

  // Utility functions for theme-aware backgrounds
  const getPageBackground = () => {
    const theme = getCurrentTheme();
    const primaryColor = theme.colors.primary.split('-')[1];
    const secondaryColor = theme.colors.secondary.split('-')[1];
    
    if (darkMode) {
      return `bg-gradient-to-br from-gray-900 via-${primaryColor}-900/20 to-${secondaryColor}-900/20`;
    } else {
      return `bg-gradient-to-br from-slate-50 via-${primaryColor}-50/30 to-${secondaryColor}-50/30`;
    }
  };

  const getCardBackground = () => {
    if (darkMode) {
      return 'bg-white/5 dark:bg-gray-800/60 backdrop-blur-xl';
    } else {
      return 'bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl';
    }
  };

  const getBorderColor = () => {
    if (darkMode) {
      return 'border-white/10 dark:border-gray-700/30';
    } else {
      return 'border-white/30 dark:border-gray-700/30';
    }
  };

  const getGradientText = () => {
    const theme = getCurrentTheme();
    return `bg-gradient-to-r ${theme.colors.primary} ${theme.colors.secondary} bg-clip-text text-transparent`;
  };

  const getAccentGradient = () => {
    const theme = getCurrentTheme();
    return `bg-gradient-to-r ${theme.colors.primary} ${theme.colors.secondary}`;
  };

  const value = {
    darkMode,
    selectedTheme,
    colorThemes,
    toggleDarkMode,
    changeTheme,
    getCurrentTheme,
    getPageBackground,
    getCardBackground,
    getBorderColor,
    getGradientText,
    getAccentGradient
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
