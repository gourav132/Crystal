import React from 'react';
import { motion } from 'framer-motion';

const Skeleton = ({ 
  variant = "rectangular", 
  width = "100%", 
  height = "20px", 
  className = "",
  animate = true 
}) => {
  const baseClasses = "bg-gray-200 dark:bg-gray-700 rounded";
  
  const variants = {
    rectangular: "rounded",
    circular: "rounded-full",
    text: "rounded h-4",
    avatar: "rounded-full w-10 h-10",
    card: "rounded-lg h-32",
    image: "rounded-lg h-48"
  };

  const shimmerClasses = animate ? "relative overflow-hidden" : "";

  return (
    <div 
      className={`${baseClasses} ${variants[variant]} ${shimmerClasses} ${className}`}
      style={{ width, height }}
    >
      {animate && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent"
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
    </div>
  );
};

// Compound components for common skeleton patterns
Skeleton.Text = ({ lines = 3, className = "" }) => (
  <div className={`space-y-2 ${className}`}>
    {Array.from({ length: lines }).map((_, index) => (
      <Skeleton 
        key={index}
        variant="text" 
        width={index === lines - 1 ? "60%" : "100%"}
        className="h-4"
      />
    ))}
  </div>
);

Skeleton.Card = ({ className = "" }) => (
  <div className={`bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 ${className}`}>
    <div className="flex items-center space-x-3 mb-4">
      <Skeleton variant="avatar" />
      <div className="flex-1">
        <Skeleton variant="text" width="60%" className="h-3 mb-2" />
        <Skeleton variant="text" width="40%" className="h-2" />
      </div>
    </div>
    <Skeleton variant="image" className="mb-4" />
    <Skeleton.Text lines={2} />
  </div>
);

Skeleton.Gallery = ({ items = 6, className = "" }) => (
  <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ${className}`}>
    {Array.from({ length: items }).map((_, index) => (
      <div key={index} className="space-y-2">
        <Skeleton variant="image" className="h-48" />
        <Skeleton variant="text" width="70%" className="h-3" />
        <Skeleton variant="text" width="50%" className="h-2" />
      </div>
    ))}
  </div>
);

export default Skeleton;
