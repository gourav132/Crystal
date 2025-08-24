import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { database } from '../Firebase/config';
import { useAuth } from './AuthContext';

const CollectionsContext = createContext();

export const useCollections = () => {
  const context = useContext(CollectionsContext);
  if (!context) {
    throw new Error('useCollections must be used within a CollectionsProvider');
  }
  return context;
};

export const CollectionsProvider = ({ children }) => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  // Fetch collections for the current user
  const fetchCollections = useCallback(async () => {
    if (!user) {
      setCollections([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const collectionsSnapshot = await database
        .collection('collections')
        .where('userId', '==', user.uid)
        .orderBy('createdAt', 'desc')
        .get();

      const collectionsData = collectionsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setCollections(collectionsData);
    } catch (err) {
      console.error('Error fetching collections:', err);
      setError('Failed to load collections');
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Fetch collections by user field (for public galleries)
  const fetchCollectionsByUser = useCallback(async (uid) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching collections for user:', uid);
      const collectionsSnapshot = await database
        .collection('collections')
        .where('user', '==', uid)
        .orderBy('createdAt', 'desc')
        .get();

      console.log('Collections snapshot size:', collectionsSnapshot.size);

      const collectionsData = collectionsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      console.log('Collections data:', collectionsData);
      setCollections(collectionsData);
    } catch (err) {
      console.error('Error fetching collections by user:', err);
      setError('Failed to load collections');
    } finally {
      setLoading(false);
    }
  }, []);

  // Create a new collection
  const createCollection = async (collectionData) => {
    if (!user) throw new Error('User must be authenticated');

    try {
      const newCollection = {
        userId: user.uid,
        user: user.displayName || user.uid, // Add user field to match images
        name: collectionData.name,
        description: collectionData.description,
        theme: collectionData.theme || {
          primary: 'from-blue-500',
          secondary: 'to-purple-500',
          background: 'from-gray-50 via-blue-50 to-indigo-100',
          darkBackground: 'from-gray-900 via-gray-800 to-gray-900'
        },
        imageCount: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const docRef = await database.collection('collections').add(newCollection);
      
      const createdCollection = {
        id: docRef.id,
        ...newCollection
      };

      setCollections(prev => [createdCollection, ...prev]);
      return createdCollection;
    } catch (err) {
      console.error('Error creating collection:', err);
      throw new Error('Failed to create collection');
    }
  };

  // Update a collection
  const updateCollection = async (collectionId, updates) => {
    if (!user) throw new Error('User must be authenticated');

    try {
      const updateData = {
        ...updates,
        updatedAt: new Date()
      };

      await database.collection('collections').doc(collectionId).update(updateData);
      
      setCollections(prev => 
        prev.map(collection => 
          collection.id === collectionId 
            ? { ...collection, ...updateData }
            : collection
        )
      );
    } catch (err) {
      console.error('Error updating collection:', err);
      throw new Error('Failed to update collection');
    }
  };

  // Delete a collection
  const deleteCollection = async (collectionId) => {
    if (!user) throw new Error('User must be authenticated');

    try {
      // First, get all images in this collection
      const imagesSnapshot = await database
        .collection('images')
        .where('collectionId', '==', collectionId)
        .get();

      // Delete all images in the collection
      const deletePromises = imagesSnapshot.docs.map(doc => doc.ref.delete());
      await Promise.all(deletePromises);

      // Delete the collection
      await database.collection('collections').doc(collectionId).delete();
      
      setCollections(prev => prev.filter(collection => collection.id !== collectionId));
    } catch (err) {
      console.error('Error deleting collection:', err);
      throw new Error('Failed to delete collection');
    }
  };

  // Get a specific collection
  const getCollection = async (collectionId) => {
    try {
      const doc = await database.collection('collections').doc(collectionId).get();
      if (doc.exists) {
        return { id: doc.id, ...doc.data() };
      }
      return null;
    } catch (err) {
      console.error('Error fetching collection:', err);
      throw new Error('Failed to fetch collection');
    }
  };

  // Get images for a specific collection
  const getCollectionImages = async (collectionId) => {
    try {
      const imagesSnapshot = await database
        .collection('images')
        .where('collectionId', '==', collectionId)
        .orderBy('createdAt', 'desc')
        .get();

      return imagesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (err) {
      console.error('Error fetching collection images:', err);
      throw new Error('Failed to fetch collection images');
    }
  };

  // Add image to collection
  const addImageToCollection = async (collectionId, imageData) => {
    if (!user) throw new Error('User must be authenticated');

    try {
      const newImage = {
        ...imageData,
        collectionId,
        userId: user.uid,
        createdAt: new Date()
      };

      const docRef = await database.collection('images').add(newImage);
      
      // Update collection image count
      await updateCollection(collectionId, {
        imageCount: collections.find(c => c.id === collectionId)?.imageCount + 1 || 1
      });

      return { id: docRef.id, ...newImage };
    } catch (err) {
      console.error('Error adding image to collection:', err);
      throw new Error('Failed to add image to collection');
    }
  };

  // Remove image from collection
  const removeImageFromCollection = async (imageId, collectionId) => {
    if (!user) throw new Error('User must be authenticated');

    try {
      await database.collection('images').doc(imageId).delete();
      
      // Update collection image count
      const currentCount = collections.find(c => c.id === collectionId)?.imageCount || 0;
      await updateCollection(collectionId, {
        imageCount: Math.max(0, currentCount - 1)
      });
    } catch (err) {
      console.error('Error removing image from collection:', err);
      throw new Error('Failed to remove image from collection');
    }
  };

  // Fetch collections when user changes
  useEffect(() => {
    fetchCollections();
  }, [fetchCollections]);

  const value = useMemo(() => ({
    collections,
    loading,
    error,
    createCollection,
    updateCollection,
    deleteCollection,
    getCollection,
    getCollectionImages,
    addImageToCollection,
    removeImageFromCollection,
    fetchCollections,
    fetchCollectionsByUser
  }), [collections, loading, error, fetchCollections, fetchCollectionsByUser]);

  return (
    <CollectionsContext.Provider value={value}>
      {children}
    </CollectionsContext.Provider>
  );
};
