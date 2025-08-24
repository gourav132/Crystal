import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

const PulseLoader = ({ 
  size = "md", 
  variant = "default", 
  dots = 3,
  className = "" 
}) => {
  const { selectedTheme, colorThemes } = useTheme();
  const currentTheme = colorThemes[selectedTheme];

  const sizes = {
    sm: "w-1 h-1",
    md: "w-2 h-2",
    lg: "w-3 h-3"
  };

  const variants = {
    default: `bg-${currentTheme.colors.primary.split('-')[1]}-500`,
    error: "bg-red-500",
    success: "bg-green-500",
    warning: "bg-yellow-500"
  };

  const currentSize = sizes[size];
  const currentVariant = variants[variant];

  return (
    <div className={`flex space-x-1 ${className}`}>
      {Array.from({ length: dots }).map((_, index) => (
        <motion.div
          key={index}
          className={`${currentSize} ${currentVariant} rounded-full`}
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ 
            duration: 1.5,
            repeat: Infinity,
            delay: index * 0.2,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

export default PulseLoader;
