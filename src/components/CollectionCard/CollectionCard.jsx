import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { 
  FaCamera, 
  FaEdit, 
  FaTrash, 
  FaPlus,
  FaImages,
  FaCalendarAlt
} from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import { useCollections } from '../../contexts/CollectionsContext';

const CollectionCard = ({ collection, onEdit, onDelete, isOwnGallery = false }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { user } = useAuth();
  const { getCollectionImages } = useCollections();
  const [previewImage, setPreviewImage] = useState(null);
  const { uid } = useParams(); // Get the uid from URL

  // Get preview image for the collection
  React.useEffect(() => {
    const fetchPreviewImage = async () => {
      try {
        const images = await getCollectionImages(collection.id);
        if (images.length > 0) {
          setPreviewImage(images[0]);
        }
      } catch (error) {
        console.error('Error fetching preview image:', error);
      }
    };

    fetchPreviewImage();
  }, [collection.id, getCollectionImages]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const formatDate = (date) => {
    if (!date) return '';
    const d = date.toDate ? date.toDate() : new Date(date);
    return d.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete "${collection.name}"? This will also delete all images in this collection.`)) {
      onDelete(collection.id);
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onEdit(collection);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="group relative"
    >
      <Link 
        to={`/Gallery/${uid}/collection/${collection.id}`}
        className="block"
      >
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-white/30 dark:border-gray-700/30 hover:shadow-xl transition-all duration-300 overflow-hidden">
          {/* Image Preview */}
          <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
            {previewImage && !imageError ? (
              <>
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-gray-300 dark:border-gray-600 border-t-blue-500 rounded-full animate-spin"></div>
                  </div>
                )}
                <img
                  src={previewImage.url}
                  alt={collection.name}
                  className={`w-full h-full object-cover transition-opacity duration-300 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                />
              </>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <FaCamera className="text-4xl text-gray-400 dark:text-gray-500 mx-auto mb-2" />
                  <p className="text-xs text-gray-500 dark:text-gray-400">No images yet</p>
                </div>
              </div>
            )}
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
            
            {/* Action Buttons (for collection owner) */}
            {isOwnGallery && user && (
              <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <motion.button
                  onClick={handleEdit}
                  className="w-8 h-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaEdit className="text-xs" />
                </motion.button>
                <motion.button
                  onClick={handleDelete}
                  className="w-8 h-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaTrash className="text-xs" />
                </motion.button>
              </div>
            )}
            
            {/* Image Count Badge */}
            <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm rounded-lg px-2 py-1">
              <div className="flex items-center space-x-1">
                <FaImages className="text-white text-xs" />
                <span className="text-white text-xs font-medium">
                  {collection.imageCount || 0}
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 line-clamp-1">
              {collection.name}
            </h3>
            
            {collection.description && (
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                {collection.description}
              </p>
            )}
            
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-1">
                <FaCalendarAlt className="text-xs" />
                <span>{formatDate(collection.createdAt)}</span>
              </div>
              
              {collection.imageCount > 0 && (
                <div className="flex items-center space-x-1">
                  <FaImages className="text-xs" />
                  <span>{collection.imageCount} image{collection.imageCount !== 1 ? 's' : ''}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CollectionCard;
