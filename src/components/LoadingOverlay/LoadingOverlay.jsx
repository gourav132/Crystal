import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LoadingSpinner } from '../index';

const LoadingOverlay = ({ 
  isLoading = false, 
  text = "Loading...", 
  variant = "default",
  size = "md",
  showIcon = true,
  backdrop = true,
  className = "" 
}) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={`absolute inset-0 z-50 flex items-center justify-center ${
            backdrop 
              ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm' 
              : 'bg-transparent'
          } ${className}`}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl p-6 border border-white/30 dark:border-gray-700/30 shadow-2xl"
          >
            <LoadingSpinner 
              size={size}
              variant={variant}
              text={text}
              showIcon={showIcon}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingOverlay;
