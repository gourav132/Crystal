import { useState, useEffect } from 'react';
import { database } from '../Firebase/config';
import { useAuth } from '../contexts/AuthContext';

export const useLikes = (imageId) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [likesLoading, setLikesLoading] = useState(false);
  const { user, isAuthenticated } = useAuth();

  // Check if current user has liked this image
  useEffect(() => {
    if (!imageId || !user) return;

    const checkUserLike = async () => {
      try {
        const likeDoc = await database
          .collection('images')
          .doc(imageId)
          .collection('likes')
          .doc(user.uid)
          .get();
        
        setIsLiked(likeDoc.exists);
      } catch (error) {
        console.error('Error checking user like:', error);
      }
    };

    checkUserLike();
  }, [imageId, user]);

  // Get total like count
  useEffect(() => {
    if (!imageId) return;

    const unsubscribe = database
      .collection('images')
      .doc(imageId)
      .collection('likes')
      .onSnapshot((snapshot) => {
        setLikeCount(snapshot.size);
      }, (error) => {
        console.error('Error listening to likes:', error);
      });

    return () => unsubscribe();
  }, [imageId]);

  // Toggle like functionality
  const toggleLike = async () => {
    if (!isAuthenticated) {
      alert('Please sign in to like images');
      return;
    }

    if (!imageId || !user) return;

    setLikesLoading(true);
    try {
      const likeRef = database
        .collection('images')
        .doc(imageId)
        .collection('likes')
        .doc(user.uid);

      if (isLiked) {
        // Unlike
        await likeRef.delete();
        setIsLiked(false);
      } else {
        // Like
        await likeRef.set({
          userId: user.uid,
          userName: user.displayName || 'Anonymous',
          createdAt: new Date()
        });
        setIsLiked(true);
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      alert('Failed to update like. Please try again.');
    } finally {
      setLikesLoading(false);
    }
  };

  return {
    isLiked,
    likeCount,
    likesLoading,
    toggleLike
  };
};
