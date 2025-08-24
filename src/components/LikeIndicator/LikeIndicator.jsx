import React, { useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';
import { database } from '../../Firebase/config';

const LikeIndicator = ({ imageId, className = "" }) => {
  const [likeCount, setLikeCount] = useState(0);

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

  if (likeCount === 0) return null;

  return (
    <div className={`flex items-center space-x-1 px-2 py-1 bg-red-500/90 backdrop-blur-sm rounded-full text-white text-xs font-medium ${className}`}>
      <FaHeart className="text-white text-xs" />
      <span>{likeCount}</span>
    </div>
  );
};

export default LikeIndicator;
