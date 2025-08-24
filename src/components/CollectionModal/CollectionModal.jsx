import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import { FaPalette, FaSave, FaPlus, FaFolder } from 'react-icons/fa';
import { useCollections } from '../../contexts/CollectionsContext';
import { useTheme } from '../../contexts/ThemeContext';

const CollectionModal = ({ isOpen, onClose, collection = null, mode = 'create' }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    theme: {
      primary: 'from-blue-500',
      secondary: 'to-purple-500',
      background: 'from-gray-50 via-blue-50 to-indigo-100',
      darkBackground: 'from-gray-900 via-gray-800 to-gray-900'
    }
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const { createCollection, updateCollection } = useCollections();
  const { colorThemes, selectedTheme } = useTheme();
  const currentTheme = colorThemes[selectedTheme];

  // Predefined theme options
  const themeOptions = [
    {
      name: 'Ocean Blue',
      primary: 'from-blue-500',
      secondary: 'to-purple-500',
      background: 'from-gray-50 via-blue-50 to-indigo-100',
      darkBackground: 'from-gray-900 via-gray-800 to-gray-900'
    },
    {
      name: 'Sunset',
      primary: 'from-orange-500',
      secondary: 'to-pink-500',
      background: 'from-gray-50 via-orange-50 to-pink-100',
      darkBackground: 'from-gray-900 via-gray-800 to-gray-900'
    },
    {
      name: 'Forest',
      primary: 'from-green-500',
      secondary: 'to-teal-500',
      background: 'from-gray-50 via-green-50 to-teal-100',
      darkBackground: 'from-gray-900 via-gray-800 to-gray-900'
    },
    {
      name: 'Royal',
      primary: 'from-purple-500',
      secondary: 'to-indigo-500',
      background: 'from-gray-50 via-purple-50 to-indigo-100',
      darkBackground: 'from-gray-900 via-gray-800 to-gray-900'
    },
    {
      name: 'Coral',
      primary: 'from-red-500',
      secondary: 'to-orange-500',
      background: 'from-gray-50 via-red-50 to-orange-100',
      darkBackground: 'from-gray-900 via-gray-800 to-gray-900'
    },
    {
      name: 'Lavender',
      primary: 'from-purple-500',
      secondary: 'to-pink-500',
      background: 'from-gray-50 via-purple-50 to-pink-100',
      darkBackground: 'from-gray-900 via-gray-800 to-gray-900'
    }
  ];

  useEffect(() => {
    if (collection && mode === 'edit') {
      setFormData({
        name: collection.name || '',
        description: collection.description || '',
        theme: collection.theme || themeOptions[0]
      });
    } else {
      setFormData({
        name: '',
        description: '',
        theme: themeOptions[0]
      });
    }
    setErrors({});
  }, [collection, mode, isOpen]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Collection name is required';
    }
    if (formData.name.trim().length < 2) {
      newErrors.name = 'Collection name must be at least 2 characters';
    }
    if (formData.description.trim().length > 200) {
      newErrors.description = 'Description must be less than 200 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      if (mode === 'create') {
        await createCollection(formData);
      } else {
        await updateCollection(collection.id, formData);
      }
      onClose();
    } catch (error) {
      console.error('Error saving collection:', error);
      setErrors({ submit: 'Failed to save collection. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleThemeSelect = (theme) => {
    setFormData(prev => ({
      ...prev,
      theme
    }));
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/40 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/20 max-w-md w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Compact Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-100/50 dark:border-gray-700/50">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 bg-gradient-to-r ${currentTheme.colors.primary} ${currentTheme.colors.secondary} rounded-lg flex items-center justify-center`}>
                  <FaFolder className="text-white text-sm" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {mode === 'create' ? 'New Collection' : 'Edit Collection'}
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {mode === 'create' ? 'Organize your images' : 'Update collection details'}
                  </p>
                </div>
              </div>
              <motion.button
                onClick={onClose}
                className="p-1.5 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <IoClose className="text-lg" />
              </motion.button>
            </div>

            {/* Compact Form */}
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              {/* Name Field */}
              <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                  Collection Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-${currentTheme.colors.primary.split('-')[1]}-500/20 focus:border-${currentTheme.colors.primary.split('-')[1]}-500 transition-all duration-200 ${
                    errors.name ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500' : ''
                  } bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-white`}
                  placeholder="Enter collection name"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>

              {/* Description Field */}
              <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={2}
                  className={`w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-${currentTheme.colors.primary.split('-')[1]}-500/20 focus:border-${currentTheme.colors.primary.split('-')[1]}-500 transition-all duration-200 resize-none ${
                    errors.description ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500' : ''
                  } bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-white`}
                  placeholder="Describe your collection (optional)"
                />
                <div className="flex justify-between items-center mt-1">
                  {errors.description && (
                    <p className="text-red-500 text-xs">{errors.description}</p>
                  )}
                  <p className="text-gray-400 dark:text-gray-500 text-xs ml-auto">
                    {formData.description.length}/200
                  </p>
                </div>
              </div>

              {/* Theme Selection */}
              <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2 flex items-center">
                  <FaPalette className="mr-1.5 text-xs" />
                  Collection Theme
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {themeOptions.map((theme, index) => (
                    <motion.button
                      key={index}
                      type="button"
                      onClick={() => handleThemeSelect(theme)}
                      className={`relative p-2.5 rounded-xl border transition-all duration-200 ${
                        formData.theme.name === theme.name
                          ? `border-${theme.primary.split('-')[1]}-500 bg-${theme.primary.split('-')[1]}-50/50 dark:bg-${theme.primary.split('-')[1]}-900/20 shadow-sm`
                          : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 hover:bg-gray-50/50 dark:hover:bg-gray-700/50'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className={`w-full h-6 bg-gradient-to-r ${theme.primary} ${theme.secondary} rounded-lg mb-1.5`}></div>
                      <p className="text-xs font-medium text-gray-700 dark:text-gray-300 text-center leading-tight">
                        {theme.name}
                      </p>
                      {formData.theme.name === theme.name && (
                        <motion.div 
                          className={`absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r ${theme.primary} ${theme.secondary} rounded-full flex items-center justify-center shadow-sm`}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", damping: 15, stiffness: 300 }}
                        >
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </motion.div>
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Error Message */}
              {errors.submit && (
                <motion.div 
                  className="p-3 bg-red-50/80 dark:bg-red-900/20 border border-red-200/50 dark:border-red-700/50 rounded-xl"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <p className="text-red-600 dark:text-red-400 text-xs">{errors.submit}</p>
                </motion.div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-2">
                <motion.button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-400 bg-gray-100/80 dark:bg-gray-700/80 hover:bg-gray-200/80 dark:hover:bg-gray-600/80 rounded-xl transition-all duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex-1 px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r ${currentTheme.colors.primary} ${currentTheme.colors.secondary} hover:shadow-lg rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2`}
                  whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      {mode === 'create' ? <FaPlus className="text-xs" /> : <FaSave className="text-xs" />}
                      <span>{mode === 'create' ? 'Create' : 'Save'}</span>
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CollectionModal;
