import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

const ProgressBar = ({ 
  progress = 0, 
  variant = "default", 
  size = "md",
  showLabel = true,
  animated = true,
  className = "" 
}) => {
  const { selectedTheme, colorThemes } = useTheme();
  const currentTheme = colorThemes[selectedTheme];

  const sizes = {
    sm: {
      height: "h-1",
      text: "text-xs"
    },
    md: {
      height: "h-2",
      text: "text-sm"
    },
    lg: {
      height: "h-3",
      text: "text-base"
    }
  };

  const variants = {
    default: {
      bg: "bg-gray-200 dark:bg-gray-700",
      fill: `bg-gradient-to-r ${currentTheme.colors.primary} ${currentTheme.colors.secondary}`,
      text: "text-gray-600 dark:text-gray-300"
    },
    success: {
      bg: "bg-green-100 dark:bg-green-900/30",
      fill: "bg-gradient-to-r from-green-500 to-emerald-500",
      text: "text-green-600 dark:text-green-400"
    },
    error: {
      bg: "bg-red-100 dark:bg-red-900/30",
      fill: "bg-gradient-to-r from-red-500 to-pink-500",
      text: "text-red-600 dark:text-red-400"
    },
    warning: {
      bg: "bg-yellow-100 dark:bg-yellow-900/30",
      fill: "bg-gradient-to-r from-yellow-500 to-orange-500",
      text: "text-yellow-600 dark:text-yellow-400"
    }
  };

  const currentSize = sizes[size];
  const currentVariant = variants[variant];

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className={`${currentSize.text} font-medium ${currentVariant.text}`}>
            Progress
          </span>
          <span className={`${currentSize.text} font-medium ${currentVariant.text}`}>
            {Math.round(progress)}%
          </span>
        </div>
      )}
      
      <div className={`w-full ${currentSize.height} ${currentVariant.bg} rounded-full overflow-hidden`}>
        <motion.div
          className={`h-full ${currentVariant.fill} rounded-full relative`}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ 
            duration: animated ? 0.5 : 0,
            ease: "easeOut"
          }}
        >
          {animated && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{
                x: ["-100%", "100%"]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ProgressBar;
