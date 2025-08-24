import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoCheckmarkCircle, IoCloseCircle, IoInformationCircle } from 'react-icons/io5';

const Toast = ({ message, type = 'info', isVisible, onClose, duration = 3000 }) => {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <IoCheckmarkCircle className="text-green-500" size={20} />;
      case 'error':
        return <IoCloseCircle className="text-red-500" size={20} />;
      default:
        return <IoInformationCircle className="text-blue-500" size={20} />;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700';
      case 'error':
        return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700';
      default:
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700';
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.3 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.3 }}
          className={`fixed top-4 right-4 z-50 p-4 rounded-lg border shadow-lg ${getBgColor()}`}
        >
          <div className="flex items-center gap-3">
            {getIcon()}
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{message}</span>
            <button
              onClick={onClose}
              className="ml-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <IoCloseCircle size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
