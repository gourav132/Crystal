import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { database } from '../../Firebase/config';
import { useParams } from 'react-router-dom';
import Loading from '../Loading/Loading';
import { FaCamera, FaPlus } from 'react-icons/fa';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { useCollections } from '../../contexts/CollectionsContext';
import { LoadingSpinner, CollectionCard } from '../../components';

export default function Home({ setShowCombinedModal, setEditingCollection }) {
  const { uid } = useParams();
  const [userData, setUserData] = useState(null);
  const [load, setLoad] = useState(true);
  const [error, setError] = useState(null);
  const { selectedTheme, colorThemes, getPageBackground, getGradientText } = useTheme();
  
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

  // Get user's gradient text
  const getUserGradientText = () => {
    const userTheme = getUserTheme();
    return `bg-gradient-to-r ${userTheme.primary} ${userTheme.secondary} bg-clip-text text-transparent`;
  };
  const { user, isAuthenticated } = useAuth();
  const { collections, loading: collectionsLoading, deleteCollection, fetchCollectionsByUser } = useCollections();
  
  // Check if current user owns this gallery
  const isOwnGallery = isAuthenticated && user && user.uid === uid;

  // Function to create user document
  const createUserDocument = async (userId) => {
    try {
      const defaultUserData = {
        title: `${user.displayName || 'My'}'s Gallery`,
        description: 'A curated collection of visual moments.',
        firstName: user.displayName?.split(' ')[0] || 'User',
        lastName: user.displayName?.split(' ').slice(1).join(' ') || '',
        email: user.email,
        user: userId, // Store the user ID in the user field
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      await database.collection('users').doc(userId).set(defaultUserData);
      return defaultUserData;
    } catch (error) {
      console.error('Error creating user document:', error);
      throw error;
    }
  };

  // Function to get or create user document
  const getOrCreateUserDocument = async (userId) => {
    try {
      // First try to find user document by the userId
      const userDoc = await database.collection('users').doc(userId).get();
      
      if (userDoc.exists) {
        return userDoc.data();
      } else {
        // Only create document if user is authenticated and owns this gallery
        if (isAuthenticated && user && user.uid === userId) {
          return await createUserDocument(userId);
        } else {
          throw new Error('User not found');
        }
      }
    } catch (error) {
      console.error('Error getting user document:', error);
      throw error;
    }
  };

  useEffect(() => {
    const initializeGallery = async () => {
      if (!uid) {
        setError("Invalid UID in URL.");
        setLoad(false);
        return;
      }

             try {
         setLoad(true);
         setError(null);
         
         const userDocument = await getOrCreateUserDocument(uid);
         setUserData(userDocument);
         
         // Fetch collections for this user using the uid from URL
         await fetchCollectionsByUser(uid);
         
         setLoad(false);
       } catch (error) {
         console.error('Error initializing gallery:', error);
         setError("Failed to load gallery. Please try again.");
         setLoad(false);
       }
    };

    initializeGallery();
     }, [uid, isAuthenticated, user, fetchCollectionsByUser]);

  if (load) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br ${getUserPageBackground()} dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300`}>
        <div className="text-center bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl p-8 border border-white/30 dark:border-gray-700/30 shadow-xl">
          <div className="w-12 h-12 bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaCamera className="text-red-500 dark:text-red-400 text-lg" />
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-inter mb-4">{error}</p>
          {isAuthenticated && user && (
            <button
              onClick={() => window.location.href = `/Gallery/${user.uid}`}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
            >
              Go to My Gallery
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getUserPageBackground()} dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300`}>
      {/* Minimal Header */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="pt-24 pb-16 relative z-10"
      >
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center">
            {/* Gallery Title */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-5xl md:text-6xl font-playfair font-light text-gray-900 dark:text-white mb-6"
            >
              {userData?.title ? (
                <>
                  {userData.title.split(' ').map((word, index) => (
                    <span key={index}>
                      {index === 0 ? (
                        <span className={`${getUserGradientText()} font-bold`}>
                          {word}
                        </span>
                      ) : (
                        <span className="text-gray-900 dark:text-white font-light">
                          {word}
                        </span>
                      )}
                      {index < userData.title.split(' ').length - 1 && ' '}
                    </span>
                  ))}
                </>
              ) : (
                <span className={`${getUserGradientText()} font-bold`}>
                  Untitled Gallery
                </span>
              )}
            </motion.h1>
            
            {/* Gallery Description */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-lg text-gray-500 dark:text-gray-400 font-inter max-w-2xl mx-auto leading-relaxed mb-8"
            >
              {userData?.description || 'A curated collection of visual moments that tell stories, capture emotions, and preserve memories through the lens of creativity.'}
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Collections Section - Show all collections */}
      <section className="max-w-6xl mx-auto px-6 pb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className=""
        >
          {/* <div className="text-center">
            <h2 className="text-2xl font-playfair font-light text-gray-900 dark:text-white mb-2">
              Collections
            </h2>
            <p className="text-gray-500 dark:text-gray-400 font-inter">
              Organized visual stories and curated moments
            </p>
          </div> */}
        </motion.div>

        {collectionsLoading ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-12"
          >
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-8 border border-white/30 dark:border-gray-700/30 shadow-xl">
              <LoadingSpinner
                size="lg"
                variant="default"
                text="Loading Collections"
                showIcon={true}
                className="text-center"
              />
            </div>
          </motion.div>
        ) : collections && collections.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {collections.map((collection, index) => (
              <CollectionCard
                key={collection.id}
                collection={collection}
                isOwnGallery={isOwnGallery}
                onEdit={(collection) => {
                  setEditingCollection(collection);
                  if (setShowCombinedModal) {
                    setShowCombinedModal(true);
                  }
                }}
                onDelete={deleteCollection}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-center py-20"
          >
            <div className="max-w-md mx-auto bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl p-8 border border-white/30 dark:border-gray-700/30 shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaCamera className="text-blue-500 dark:text-blue-400 text-xl" />
              </div>
              <h3 className="text-lg font-playfair font-light text-gray-900 dark:text-white mb-2">
                {isOwnGallery ? 'No Collections Yet' : 'No Collections'}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-inter mb-6">
                {isOwnGallery 
                  ? 'Start organizing your visual stories by creating your first collection.'
                  : 'This gallery has no collections yet.'
                }
              </p>
              {isOwnGallery && (
                <motion.button
                  onClick={() => {
                    if (setShowCombinedModal) {
                      setShowCombinedModal(true);
                    }
                  }}
                  className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 flex items-center space-x-2 mx-auto"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaPlus className="text-sm" />
                  <span>Create Collection</span>
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </section>


    </div>
  );
}
