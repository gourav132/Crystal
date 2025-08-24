import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import { FaPalette, FaSave, FaPlus, FaFolder, FaUpload, FaLink, FaImage } from 'react-icons/fa';
import { auth, database, timestamp } from '../../Firebase/config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollections } from '../../contexts/CollectionsContext';
import { useTheme } from '../../contexts/ThemeContext';

const CombinedModal = ({ isOpen, onClose, collectionId = null, onImageAdded = null }) => {
  const [activeTab, setActiveTab] = useState('collection'); // 'collection' or 'upload'
  
  // Collection form state
  const [collectionForm, setCollectionForm] = useState({
    name: '',
    description: '',
    theme: {
      primary: 'from-blue-500',
      secondary: 'to-purple-500',
      background: 'from-gray-50 via-blue-50 to-indigo-100',
      darkBackground: 'from-gray-900 via-gray-800 to-gray-900'
    }
  });
  
  // Upload form state
  const [uploadForm, setUploadForm] = useState({
    url: '',
    imageName: '',
    imageDescription: '',
    selectedCollectionId: collectionId || 'none'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [user] = useAuthState(auth);
  const { createCollection } = useCollections();
  const { colorThemes, selectedTheme } = useTheme();
  const currentTheme = colorThemes[selectedTheme];
  const { collections } = useCollections();

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

  // Reset forms when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setCollectionForm({
        name: '',
        description: '',
        theme: themeOptions[0]
      });
      setUploadForm({
        url: '',
        imageName: '',
        imageDescription: '',
        selectedCollectionId: collectionId || 'none'
      });
      setErrors({});
    }
  }, [isOpen, collectionId]);

  // Update selected collection when collectionId prop changes
  useEffect(() => {
    if (collectionId) {
      setUploadForm(prev => ({
        ...prev,
        selectedCollectionId: collectionId
      }));
    }
  }, [collectionId]);

  // Collection form validation
  const validateCollectionForm = () => {
    const newErrors = {};
    if (!collectionForm.name.trim()) {
      newErrors.collectionName = 'Collection name is required';
    }
    if (collectionForm.name.trim().length < 2) {
      newErrors.collectionName = 'Collection name must be at least 2 characters';
    }
    if (collectionForm.description.trim().length > 200) {
      newErrors.collectionDescription = 'Description must be less than 200 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Upload form validation
  const validateUploadForm = () => {
    const newErrors = {};
    if (!uploadForm.imageName.trim()) {
      newErrors.imageName = 'Image name is required';
    }
    if (!uploadForm.url.trim()) {
      newErrors.url = 'Image URL is required';
    } else if (!validateURL(uploadForm.url)) {
      newErrors.url = 'Please enter a valid image URL';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateURL = (url) => {
    const pattern = new RegExp('^(https?:\\/\\/)?'+
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+
    '((\\d{1,3}\\.){3}\\d{1,3}))'+
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
    '(\\?[;&a-z\\d%_.~+=-]*)?'+
    '(\\#[-a-z\\d_]*)?$','i');
    return pattern.test(url);
  };

  // Handle collection creation
  const handleCollectionSubmit = async (e) => {
    e.preventDefault();
    if (!validateCollectionForm()) return;

    setIsSubmitting(true);
    try {
      await createCollection(collectionForm);
      onClose();
    } catch (error) {
      console.error('Error creating collection:', error);
      setErrors({ submit: 'Failed to create collection. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle image upload via URL
  const handleImageUpload = async (e) => {
    e.preventDefault();
    if (!validateUploadForm()) return;

    setIsSubmitting(true);
    try {
      const collectionRef = database.collection('images');
      const createdAt = timestamp();
      const imageData = { 
        url: uploadForm.url, 
        name: uploadForm.imageName || 'Untitled Image',
        description: uploadForm.imageDescription || '',
        createdAt, 
        user: user.displayName,
        userId: user.uid,
        collectionId: uploadForm.selectedCollectionId === 'none' ? null : uploadForm.selectedCollectionId
      };
      
      const docRef = await collectionRef.add(imageData);
      
      // Call the callback if provided
      if (onImageAdded) {
        onImageAdded({
          id: docRef.id,
          ...imageData
        });
      }
      
      onClose();
    } catch (error) {
      console.error('Error uploading image:', error);
      setErrors({ submit: 'Failed to upload image. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    const selected = e.target.files[0];
    const types = ['image/png', 'image/jpeg'];
    
    if (selected && types.includes(selected.type)) {
      // Handle file upload logic here
      console.log('File selected:', selected);
      // You can implement file upload to storage here
    } else {
      setErrors({ file: 'Please select an image file (png or jpeg)' });
    }
  };

  const handleInputChange = (formType, field, value) => {
    if (formType === 'collection') {
      setCollectionForm(prev => ({
        ...prev,
        [field]: value
      }));
    } else {
      setUploadForm(prev => ({
        ...prev,
        [field]: value
      }));
    }
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleThemeSelect = (theme) => {
    setCollectionForm(prev => ({
      ...prev,
      theme
    }));
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
            className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/20 max-w-lg w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-100/50 dark:border-gray-700/50">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 bg-gradient-to-r ${currentTheme.colors.primary} ${currentTheme.colors.secondary} rounded-lg flex items-center justify-center`}>
                  <FaPlus className="text-white text-sm" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Add New</h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Create collection or upload image</p>
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

            {/* Tab Navigation */}
            <div className="flex border-b border-gray-100/50 dark:border-gray-700/50">
              <motion.button
                onClick={() => setActiveTab('collection')}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 text-sm font-medium transition-all duration-200 ${
                  activeTab === 'collection'
                    ? `text-${currentTheme.colors.primary.split('-')[1]}-600 dark:text-${currentTheme.colors.primary.split('-')[1]}-400 border-b-2 border-${currentTheme.colors.primary.split('-')[1]}-500`
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaFolder className="text-sm" />
                <span>Collection</span>
              </motion.button>
              <motion.button
                onClick={() => setActiveTab('upload')}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 text-sm font-medium transition-all duration-200 ${
                  activeTab === 'upload'
                    ? `text-${currentTheme.colors.primary.split('-')[1]}-600 dark:text-${currentTheme.colors.primary.split('-')[1]}-400 border-b-2 border-${currentTheme.colors.primary.split('-')[1]}-500`
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaImage className="text-sm" />
                <span>Upload Image</span>
              </motion.button>
            </div>

            {/* Tab Content */}
            <div className="p-5">
              <AnimatePresence mode="wait">
                {activeTab === 'collection' ? (
                  <motion.div
                    key="collection"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <form onSubmit={handleCollectionSubmit} className="space-y-4">
                      {/* Collection Name */}
                      <div>
                        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                          Collection Name *
                        </label>
                        <input
                          type="text"
                          value={collectionForm.name}
                          onChange={(e) => handleInputChange('collection', 'name', e.target.value)}
                          className={`w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-${currentTheme.colors.primary.split('-')[1]}-500/20 focus:border-${currentTheme.colors.primary.split('-')[1]}-500 transition-all duration-200 ${
                            errors.collectionName ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500' : ''
                          } bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-white`}
                          placeholder="Enter collection name"
                        />
                        {errors.collectionName && (
                          <p className="text-red-500 text-xs mt-1">{errors.collectionName}</p>
                        )}
                      </div>

                      {/* Collection Description */}
                      <div>
                        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                          Description
                        </label>
                        <textarea
                          value={collectionForm.description}
                          onChange={(e) => handleInputChange('collection', 'description', e.target.value)}
                          rows={2}
                          className={`w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-${currentTheme.colors.primary.split('-')[1]}-500/20 focus:border-${currentTheme.colors.primary.split('-')[1]}-500 transition-all duration-200 resize-none ${
                            errors.collectionDescription ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500' : ''
                          } bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-white`}
                          placeholder="Describe your collection (optional)"
                        />
                        <div className="flex justify-between items-center mt-1">
                          {errors.collectionDescription && (
                            <p className="text-red-500 text-xs">{errors.collectionDescription}</p>
                          )}
                          <p className="text-gray-400 dark:text-gray-500 text-xs ml-auto">
                            {collectionForm.description.length}/200
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
                                collectionForm.theme.name === theme.name
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
                              {collectionForm.theme.name === theme.name && (
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

                      {/* Submit Button */}
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r ${currentTheme.colors.primary} ${currentTheme.colors.secondary} hover:shadow-lg rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2`}
                        whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                        whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            <span>Creating...</span>
                          </>
                        ) : (
                          <>
                            <FaPlus className="text-xs" />
                            <span>Create Collection</span>
                          </>
                        )}
                      </motion.button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="upload"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <form onSubmit={handleImageUpload} className="space-y-4">
                      {/* Image Name */}
                      <div>
                        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                          Image Name *
                        </label>
                        <input
                          type="text"
                          value={uploadForm.imageName}
                          onChange={(e) => handleInputChange('upload', 'imageName', e.target.value)}
                          className={`w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-${currentTheme.colors.primary.split('-')[1]}-500/20 focus:border-${currentTheme.colors.primary.split('-')[1]}-500 transition-all duration-200 ${
                            errors.imageName ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500' : ''
                          } bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-white`}
                          placeholder="Give your image a name"
                        />
                        {errors.imageName && (
                          <p className="text-red-500 text-xs mt-1">{errors.imageName}</p>
                        )}
                      </div>

                      {/* Image Description */}
                      <div>
                        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                          Description
                        </label>
                        <textarea
                          value={uploadForm.imageDescription}
                          onChange={(e) => handleInputChange('upload', 'imageDescription', e.target.value)}
                          rows={2}
                          className={`w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-${currentTheme.colors.primary.split('-')[1]}-500/20 focus:border-${currentTheme.colors.primary.split('-')[1]}-500 transition-all duration-200 resize-none bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-white`}
                          placeholder="Add a brief description or caption"
                        />
                      </div>

                      {/* Collection Selection */}
                      <div>
                        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                          Collection (Optional)
                        </label>
                        <div className="relative">
                          <select
                            value={uploadForm.selectedCollectionId}
                            onChange={(e) => handleInputChange('upload', 'selectedCollectionId', e.target.value)}
                            className={`w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-${currentTheme.colors.primary.split('-')[1]}-500/20 focus:border-${currentTheme.colors.primary.split('-')[1]}-500 transition-all duration-200 bg-white/50 dark:bg-gray-800/50 dark:text-white appearance-none pr-10`}
                          >
                            <option value="none">No Collection (All Images)</option>
                            {collections && collections.length > 0 ? (
                              collections.map((collection) => (
                                <option key={collection.id} value={collection.id}>
                                  {collection.name}
                                </option>
                              ))
                            ) : (
                              <option value="none" disabled>No collections available</option>
                            )}
                          </select>
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <FaFolder className="text-gray-400 dark:text-gray-500 text-sm" />
                          </div>
                        </div>
                        {collections && collections.length === 0 && (
                          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                            Create a collection first to organize your images
                          </p>
                        )}
                      </div>

                      {/* Upload Options */}
                      <div className="space-y-3">
                        {/* File Upload Option */}
                        <motion.div 
                          className={`group relative p-4 border border-gray-200 dark:border-gray-600 rounded-2xl hover:border-${currentTheme.colors.primary.split('-')[1]}-300 dark:hover:border-${currentTheme.colors.primary.split('-')[1]}-400 hover:bg-${currentTheme.colors.primary.split('-')[1]}-50/30 dark:hover:bg-${currentTheme.colors.primary.split('-')[1]}-900/20 transition-all duration-300`}
                          whileHover={{ y: -1 }}
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center group-hover:bg-${currentTheme.colors.primary.split('-')[1]}-100 dark:group-hover:bg-${currentTheme.colors.primary.split('-')[1]}-800 transition-colors duration-300 flex-shrink-0`}>
                              <FaUpload className={`text-gray-500 dark:text-gray-400 text-sm group-hover:text-${currentTheme.colors.primary.split('-')[1]}-600 dark:group-hover:text-${currentTheme.colors.primary.split('-')[1]}-400`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1">Upload from Device</h3>
                              <p className="text-xs text-gray-500 dark:text-gray-400">JPG, PNG files supported</p>
                            </div>
                            <motion.label 
                              className={`inline-flex items-center justify-center px-4 py-2 text-xs font-medium rounded-lg transition-all duration-300 ${
                                uploadForm.imageName.trim() 
                                  ? `bg-${currentTheme.colors.primary.split('-')[1]}-600 text-white hover:bg-${currentTheme.colors.primary.split('-')[1]}-700 cursor-pointer shadow-sm` 
                                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                              }`}
                              htmlFor="inputFile"
                              whileHover={uploadForm.imageName.trim() ? { scale: 1.02 } : {}}
                              whileTap={uploadForm.imageName.trim() ? { scale: 0.98 } : {}}
                            >
                              {uploadForm.imageName.trim() ? 'Choose File' : 'Name Required'}
                            </motion.label>
                            <input className="hidden" id="inputFile" type="file" onChange={handleFileUpload} accept="image/png,image/jpeg"/>
                          </div>
                        </motion.div>

                        {/* URL Upload Option */}
                        <motion.div 
                          className={`group relative p-4 border border-gray-200 dark:border-gray-600 rounded-2xl hover:border-${currentTheme.colors.primary.split('-')[1]}-300 dark:hover:border-${currentTheme.colors.primary.split('-')[1]}-400 hover:bg-${currentTheme.colors.primary.split('-')[1]}-50/30 dark:hover:bg-${currentTheme.colors.primary.split('-')[1]}-900/20 transition-all duration-300`}
                          whileHover={{ y: -1 }}
                        >
                          <div className="flex items-center space-x-3 mb-3">
                            <div className={`w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center group-hover:bg-${currentTheme.colors.primary.split('-')[1]}-100 dark:group-hover:bg-${currentTheme.colors.primary.split('-')[1]}-800 transition-colors duration-300 flex-shrink-0`}>
                              <FaLink className={`text-gray-500 dark:text-gray-400 text-sm group-hover:text-${currentTheme.colors.primary.split('-')[1]}-600 dark:group-hover:text-${currentTheme.colors.primary.split('-')[1]}-400`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1">Paste Image URL</h3>
                              <p className="text-xs text-gray-500 dark:text-gray-400">Direct image links only</p>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <input 
                              type="text"
                              placeholder="https://example.com/image.jpg" 
                              value={uploadForm.url}
                              onChange={(e) => handleInputChange('upload', 'url', e.target.value)}
                              className={`w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-${currentTheme.colors.primary.split('-')[1]}-500/20 focus:border-${currentTheme.colors.primary.split('-')[1]}-500 transition-all duration-200 bg-white/50 dark:bg-gray-800/50 dark:text-white ${
                                errors.url ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500' : ''
                              }`}
                            />
                            {errors.url && (
                              <p className="text-red-500 text-xs">{errors.url}</p>
                            )}
                            <motion.button 
                              type="submit"
                              disabled={!uploadForm.url || !uploadForm.imageName.trim() || isSubmitting}
                              className={`w-full px-4 py-2 text-xs font-medium rounded-lg transition-all duration-300 ${
                                uploadForm.url && uploadForm.imageName.trim() && !isSubmitting
                                  ? `bg-${currentTheme.colors.primary.split('-')[1]}-600 text-white hover:bg-${currentTheme.colors.primary.split('-')[1]}-700 shadow-sm` 
                                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                              }`}
                              whileHover={uploadForm.url && uploadForm.imageName.trim() && !isSubmitting ? { scale: 1.02 } : {}}
                              whileTap={uploadForm.url && uploadForm.imageName.trim() && !isSubmitting ? { scale: 0.98 } : {}}
                            >
                              {isSubmitting ? (
                                <>
                                  <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin inline mr-1.5"></div>
                                  Uploading...
                                </>
                              ) : (
                                <>
                                  <FaLink className="inline mr-1.5 text-xs" />
                                  {!uploadForm.imageName.trim() ? 'Name Required' : !uploadForm.url ? 'URL Required' : 'Add Image'}
                                </>
                              )}
                            </motion.button>
                          </div>
                        </motion.div>
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>

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
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CombinedModal;
