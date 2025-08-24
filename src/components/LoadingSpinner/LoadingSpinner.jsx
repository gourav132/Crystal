import React from 'react';
import { motion } from 'framer-motion';
import { FaCamera } from 'react-icons/fa';
import { useTheme } from '../../contexts/ThemeContext';

const LoadingSpinner = ({ 
  size = "md", 
  variant = "default", 
  text = "Loading...", 
  showIcon = false,
  className = "" 
}) => {
  const { selectedTheme, colorThemes } = useTheme();
  const currentTheme = colorThemes[selectedTheme];

  const sizes = {
    sm: {
      container: "w-6 h-6",
      icon: "text-sm",
      text: "text-xs"
    },
    md: {
      container: "w-8 h-8",
      icon: "text-base",
      text: "text-sm"
    },
    lg: {
      container: "w-12 h-12",
      icon: "text-lg",
      text: "text-base"
    },
    xl: {
      container: "w-16 h-16",
      icon: "text-xl",
      text: "text-lg"
    }
  };

  const variants = {
    default: {
      iconBg: "from-blue-500/20 to-purple-500/20 dark:from-blue-500/30 dark:to-purple-500/30",
      iconColor: "text-blue-600 dark:text-blue-400",
      spinnerColor: `border-t-${currentTheme.colors.primary.split('-')[1]}-500`,
      dotColor: `bg-${currentTheme.colors.primary.split('-')[1]}-500`
    },
    error: {
      iconBg: "from-red-500/20 to-pink-500/20 dark:from-red-500/30 dark:to-pink-500/30",
      iconColor: "text-red-500 dark:text-red-400",
      spinnerColor: "border-t-red-500",
      dotColor: "bg-red-500"
    },
    success: {
      iconBg: "from-green-500/20 to-emerald-500/20 dark:from-green-500/30 dark:to-emerald-500/30",
      iconColor: "text-green-500 dark:text-green-400",
      spinnerColor: "border-t-green-500",
      dotColor: "bg-green-500"
    }
  };

  const currentSize = sizes[size];
  const currentVariant = variants[variant];

  return (
    <div className={`flex flex-col items-center space-y-3 ${className}`}>
      {/* Icon Container */}
      {showIcon && (
        <motion.div 
          className={`${currentSize.container} bg-gradient-to-br ${currentVariant.iconBg} rounded-xl flex items-center justify-center`}
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            rotate: { duration: 2, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <FaCamera className={`${currentSize.icon} ${currentVariant.iconColor}`} />
        </motion.div>
      )}
      
      {/* Spinner */}
      <div className="flex justify-center">
        <motion.div 
          className="relative"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        >
          <div className={`${currentSize.container} border-2 border-gray-200 dark:border-gray-600 ${currentVariant.spinnerColor} rounded-full`} />
        </motion.div>
      </div>
      
      {/* Loading Text */}
      {text && (
        <motion.p 
          className={`${currentSize.text} text-gray-500 dark:text-gray-400 text-center`}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          {text}
        </motion.p>
      )}
      
      {/* Loading Dots */}
      <div className="flex justify-center space-x-1">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className={`w-1.5 h-1.5 ${currentVariant.dotColor} rounded-full`}
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
    </div>
  );
};

export default LoadingSpinner;
