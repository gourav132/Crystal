import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { PulseLoader } from '../index';

const Button = ({ 
  children, 
  type = "button", 
  variant = "primary", 
  size = "md",
  loading = false,
  disabled = false,
  className = "",
  onClick,
  ...props 
}) => {
  const { selectedTheme, colorThemes } = useTheme();
  const currentTheme = colorThemes[selectedTheme];
  
  const baseClasses = "inline-flex items-center justify-center font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: `bg-gradient-to-r ${currentTheme.colors.primary} ${currentTheme.colors.secondary} text-white hover:${currentTheme.colors.primary}/90 hover:${currentTheme.colors.secondary}/90 focus:ring-${currentTheme.colors.primary.split('-')[1]}-500/50 shadow-sm hover:shadow-md`,
    secondary: "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 focus:ring-gray-500/50",
    outline: `border-2 border-${currentTheme.colors.primary.split('-')[1]}-500 text-${currentTheme.colors.primary.split('-')[1]}-500 hover:bg-${currentTheme.colors.primary.split('-')[1]}-500 hover:text-white focus:ring-${currentTheme.colors.primary.split('-')[1]}-500/50`,
    danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500/50"
  };
  
  const sizes = {
    sm: "px-2.5 py-1 text-xs",
    md: "px-3 py-1.5 text-xs",
    lg: "px-5 py-2 text-xs"
  };

  return (
    <motion.button
      type={type}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      {...props}
    >
      {loading ? (
        <div className="flex items-center space-x-2">
          <PulseLoader size="sm" variant="default" />
          <span className="text-xs">Loading...</span>
        </div>
      ) : (
        children
      )}
    </motion.button>
  );
};

export default Button;
