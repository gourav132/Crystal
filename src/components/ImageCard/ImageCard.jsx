import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCamera } from 'react-icons/fa';
import { LoadingSpinner, LikeIndicator } from '../index';

const ImageCard = ({ image, onClick, onDelete }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  if (imageError) {
    return (
      <motion.div 
        className="w-full rounded-xl p-2 bg-gray-100 dark:bg-gray-800 flex items-center justify-center h-48"
        layout
      >
        <div className="text-center text-gray-500 dark:text-gray-400">
          <p className="text-sm">Failed to load image</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="w-full rounded-xl p-2 img-wrap relative group" 
      layout
      onClick={() => onClick(image)}
      whileHover={{ opacity: 1, scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gray-200/80 dark:bg-gray-700/80 backdrop-blur-sm rounded animate-pulse flex items-center justify-center">
          <LoadingSpinner 
            size="sm" 
            variant="default" 
            text="Loading..." 
            showIcon={true}
          />
        </div>
      )}
      
      <motion.img 
        src={image.url}
        alt="gallery image"
        initial={{ opacity: 0 }}
        animate={{ opacity: imageLoaded ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className='rounded w-full h-auto'
        loading="lazy"
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
      
      {/* Like indicator */}
      <div className="absolute top-2 right-2 z-10">
        <LikeIndicator imageId={image.id} />
      </div>
      
      {/* Overlay with delete button */}
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(image.id);
          }}
          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors duration-200"
          title="Delete image"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
};

export default ImageCard;
