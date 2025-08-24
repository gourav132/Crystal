import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import ResponsiveMasonry from 'react-responsive-masonry';
import { database } from '../../Firebase/config';
import { useAuth } from '../../contexts/AuthContext';
import { useCollections } from '../../contexts/CollectionsContext';
import { 
  FaCamera, 
  FaArrowLeft, 
  FaPlus, 
  FaEdit, 
  FaTrash,
  FaImages,
  FaCalendarAlt,
  FaUser,
  FaHeart,
  FaEye,
  FaFolder,
  FaClock,
  FaEllipsisH
} from 'react-icons/fa';
import { Modal, CombinedModal, LoadingSpinner, LikeIndicator } from '../../components';
import { useTheme } from '../../contexts/ThemeContext';

const CollectionDetail = () => {
  const { getPageBackground, getCardBackground, getBorderColor, getGradientText, getAccentGradient } = useTheme();
  const { uid, collectionId } = useParams();
  
  // Get user's theme settings or fall back to default
  const getUserTheme = () => {
    if (userData?.theme) {
      return userData.theme;
    }
    // Fall back to default theme
    return {
      primary: 'from-blue-500',
      secondary: 'to-purple-500',
      background: 'from-gray-50 via-blue-50 to-indigo-100',
      darkBackground: 'from-gray-900 via-gray-800 to-gray-900'
    };
  };

  // Get user's page background
  const getUserPageBackground = () => {
    const userTheme = getUserTheme();
    return userTheme.background || 'from-gray-50 via-blue-50 to-indigo-100';
  };
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { getCollection, getCollectionImages, deleteCollection } = useCollections();
  
  // Function to refresh images after adding a new one
  const handleImageAdded = async (newImage) => {
    try {
      // Refresh the images list
      const imagesData = await getCollectionImages(collectionId);
      setImages(imagesData);
    } catch (error) {
      console.error('Error refreshing images:', error);
    }
  };
  
  const [collection, setCollection] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImg, setSelectedImg] = useState(null);
  const [showCombinedModal, setShowCombinedModal] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isOwnGallery, setIsOwnGallery] = useState(false);
  const [hoveredImage, setHoveredImage] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  // Masonry grid configuration
  const columnsCountBreakPoints = {
    350: 1,
    750: 2,
    900: 3,
    1200: 4,
    1600: 5
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showDropdown && !event.target.closest('.dropdown-container')) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch collection data
        const collectionData = await getCollection(collectionId);
        if (!collectionData) {
          setError('Collection not found');
          return;
        }
        setCollection(collectionData);

        // Check if user owns this gallery
        if (isAuthenticated && user && user.uid === collectionData.userId) {
          setIsOwnGallery(true);
        }

        // Fetch user data
        const userSnapshot = await database.collection('users').doc(uid).get();
        if (userSnapshot.exists) {
          setUserData(userSnapshot.data());
        }

        // Fetch collection images
        const imagesData = await getCollectionImages(collectionId);
        setImages(imagesData);

      } catch (err) {
        console.error('Error fetching collection data:', err);
        setError('Failed to load collection');
      } finally {
        setLoading(false);
      }
    };

    if (collectionId) {
      fetchData();
    }
     }, [collectionId, uid, getCollection, getCollectionImages, isAuthenticated, user]);

  const handleDeleteCollection = async () => {
    if (window.confirm(`Are you sure you want to delete "${collection.name}"? This will also delete all images in this collection.`)) {
      try {
        await deleteCollection(collectionId);
        navigate(`/Gallery/${uid}`);
      } catch (error) {
        console.error('Error deleting collection:', error);
        alert('Failed to delete collection');
      }
    }
  };

  const handleEditCollection = () => {
    // This would open the edit modal
            // For now, we'll just navigate to the main gallery
        navigate(`/Gallery/${uid}`);
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br ${getUserPageBackground()} dark:from-gray-900 dark:via-gray-800 dark:to-gray-900`}>
        <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl p-8 border border-white/30 dark:border-gray-700/30 shadow-xl">
          <LoadingSpinner size="lg" variant="default" text="Loading Collection" showIcon={true} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br ${getUserPageBackground()} dark:from-gray-900 dark:via-gray-800 dark:to-gray-900`}>
        <motion.div 
          className="text-center bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl p-8 border border-white/30 dark:border-gray-700/30 shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-12 h-12 bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaCamera className="text-red-500 dark:text-red-400 text-lg" />
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-inter mb-4">{error}</p>
          <motion.button
            onClick={() => navigate(`/Gallery/${uid}`)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Back to Gallery
          </motion.button>
        </motion.div>
      </div>
    );
  }

  if (!collection) {
    return null;
  }

  const formatDate = (date) => {
    if (!date) return '';
    const d = date.toDate ? date.toDate() : new Date(date);
    return d.toLocaleDateString('en-US', { 
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getUserPageBackground()} dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300`}>

      {/* Minimal Header */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="pt-20 pb-16 relative z-10"
      >
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center">
            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="flex justify-center mb-8"
            >
              <motion.button
                onClick={() => navigate(`/Gallery/${uid}`)}
                className="group flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-white/30 dark:border-gray-700/30 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaArrowLeft className="text-sm group-hover:-translate-x-1 transition-transform duration-200" />
                <span className="text-sm font-medium">Back to Gallery</span>
              </motion.button>
            </motion.div>

            {/* Collection Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center space-x-2 mb-6"
            >
              <div className={`w-8 h-8 bg-gradient-to-r ${collection.theme?.primary || 'from-blue-500'} ${collection.theme?.secondary || 'to-purple-500'} rounded-lg flex items-center justify-center`}>
                <FaFolder className="text-white text-xs" />
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Collection</span>
            </motion.div>

            {/* Title */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-3xl font-playfair font-light text-gray-900 dark:text-white mb-3"
            >
              {collection.name}
            </motion.h1>
             
            {/* Description */}
            {collection.description && (
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-gray-500 dark:text-gray-400 text-sm font-inter max-w-md mx-auto leading-relaxed mb-8"
              >
                {collection.description}
              </motion.p>
            )}
             
                                      {/* Minimal Stats & Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex items-center justify-center space-x-6"
              >
                {/* Minimal Stats */}
                <div className="flex items-center space-x-4">
                  {/* Image Counter */}
                  <motion.div 
                    className="flex items-center space-x-2 px-3 py-1.5 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-full border border-white/30 dark:border-gray-700/30"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaImages className="text-blue-500 dark:text-blue-400 text-sm" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {images.length} images
                    </span>
                  </motion.div>

                  {/* Creation Date */}
                  <motion.div 
                    className="flex items-center space-x-2 px-3 py-1.5 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-full border border-white/30 dark:border-gray-700/30"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaCalendarAlt className="text-emerald-500 dark:text-emerald-400 text-sm" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {formatDate(collection.createdAt)}
                    </span>
                  </motion.div>
                </div>

                
              </motion.div>
          </div>
        </div>
      </motion.section>

             {/* Masonry Images Grid */}
       <section className="max-w-6xl mx-auto px-6 pb-20 relative z-10">
         {images.length > 0 ? (
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.7, duration: 0.6 }}
           >
             <ResponsiveMasonry
               columnsCountBreakPoints={columnsCountBreakPoints}
               className="my-masonry-grid"
             >
               {images.map((image, index) => (
                 <motion.div
                   key={image.id}
                   initial={{ opacity: 0, scale: 0.95 }}
                   animate={{ opacity: 1, scale: 1 }}
                   transition={{ 
                     delay: index * 0.05, 
                     duration: 0.3,
                     ease: "easeOut"
                   }}
                   className="group relative m-2 overflow-hidden rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-lg dark:shadow-gray-900/50 hover:shadow-2xl dark:hover:shadow-gray-900/80 hover:-translate-y-1 transition-all duration-500 border border-white/30 dark:border-gray-700/30"
                   onClick={() => setSelectedImg({ 
                     url: image.url, 
                     id: image.id, 
                     name: image.name, 
                     description: image.description 
                   })}
                   onMouseEnter={() => setHoveredImage(image.id)}
                   onMouseLeave={() => setHoveredImage(null)}
                 >
                   {/* Image Container */}
                   <div className="relative overflow-hidden">
                     <motion.img
                       src={image.url}
                       alt={image.name || "collection image"}
                       className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                       loading="lazy"
                     />
                     
                     {/* Like indicator */}
                     <div className="absolute top-3 left-3 z-10">
                       <LikeIndicator imageId={image.id} />
                     </div>
                     
                     {/* Minimal Overlay */}
                     <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 dark:group-hover:bg-black/20 transition-all duration-300">
                       <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                         <div className="w-6 h-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm">
                           <FaCamera className="text-gray-600 dark:text-gray-300 text-xs" />
                         </div>
                       </div>
                     </div>

                     {/* Hover Overlay */}
                     <AnimatePresence>
                       {hoveredImage === image.id && (
                         <motion.div 
                           className="absolute inset-0 flex items-center justify-center"
                           initial={{ opacity: 0 }}
                           animate={{ opacity: 1 }}
                           exit={{ opacity: 0 }}
                           transition={{ duration: 0.2 }}
                         >
                           <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-2 shadow-lg border border-white/30 dark:border-gray-700/30">
                             <FaEye className="text-gray-700 dark:text-gray-300 text-sm" />
                           </div>
                         </motion.div>
                       )}
                     </AnimatePresence>
                   </div>
                 </motion.div>
               ))}
             </ResponsiveMasonry>
           </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-center py-32"
          >
            <div className="max-w-sm mx-auto bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl p-8 border border-white/30 dark:border-gray-700/30 shadow-xl dark:shadow-gray-900/50">
                              <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 dark:from-blue-500/30 dark:to-purple-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaCamera className="text-blue-500 dark:text-blue-400 text-xl" />
                </div>
              <h3 className="text-lg font-playfair font-light text-gray-900 dark:text-white mb-2">
                {isOwnGallery ? 'No Images Yet' : 'No Images'}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-inter mb-6">
                {isOwnGallery 
                  ? 'Start building your collection by adding some images.'
                  : 'This collection is empty.'
                }
              </p>
              {isOwnGallery && (
                <motion.button
                  onClick={() => setShowCombinedModal(true)}
                  className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg hover:shadow-lg dark:hover:shadow-blue-500/25 transition-all duration-300 flex items-center space-x-2 mx-auto"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaPlus className="text-sm" />
                  <span>Add Images</span>
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </section>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImg && (
          <Modal
            selectedImg={selectedImg}
            setSelectedImg={setSelectedImg}
            isOwnGallery={isOwnGallery}
          />
        )}
      </AnimatePresence>

                    {/* Floating CTA Button */}
        {isOwnGallery && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <div className="flex items-center space-x-2">
              {/* Add Images CTA Button */}
              <motion.button
                onClick={() => setShowCombinedModal(true)}
                className="group relative p-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:shadow-xl dark:hover:shadow-blue-500/25 transition-all duration-300 overflow-hidden shadow-lg"
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                
                <div className="relative">
                  <FaPlus className="text-white text-sm" />
                </div>
              </motion.button>

              {/* Compact Dropdown */}
              <div className="relative dropdown-container">
                <motion.button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="group p-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50/80 dark:hover:bg-gray-700/30 rounded-xl transition-all duration-200 border border-transparent hover:border-gray-200 dark:hover:border-gray-600 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg dark:shadow-gray-900/50"
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaEllipsisH className="text-sm" />
                </motion.button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {showDropdown && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute bottom-full right-0 mb-2 w-40 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-xl shadow-xl dark:shadow-gray-900/80 border border-white/30 dark:border-gray-700/30 overflow-hidden z-[9999]"
                    >
                      {/* Edit Option */}
                      <motion.button
                        onClick={() => {
                          setShowDropdown(false);
                          handleEditCollection();
                        }}
                        className="w-full flex items-center space-x-3 px-3 py-2.5 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50/80 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200"
                        whileHover={{ x: 4 }}
                      >
                        <FaEdit className="text-sm" />
                        <span>Edit Collection</span>
                      </motion.button>

                      {/* Divider */}
                      <div className="w-full h-px bg-gray-200 dark:bg-gray-600"></div>

                      {/* Delete Option */}
                      <motion.button
                        onClick={() => {
                          setShowDropdown(false);
                          handleDeleteCollection();
                        }}
                        className="w-full flex items-center space-x-3 px-3 py-2.5 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-red-50/80 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-400 transition-all duration-200"
                        whileHover={{ x: 4 }}
                      >
                        <FaTrash className="text-sm" />
                        <span>Delete Collection</span>
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}

       {/* Combined Modal */}
               <AnimatePresence>
          {showCombinedModal && (
            <CombinedModal
              isOpen={showCombinedModal}
              onClose={() => setShowCombinedModal(false)}
              collectionId={collectionId}
              onImageAdded={handleImageAdded}
            />
          )}
        </AnimatePresence>
     </div>
   );
 };

export default CollectionDetail;
