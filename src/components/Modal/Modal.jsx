import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { BiTrash } from 'react-icons/bi';
import { IoClose } from 'react-icons/io5';
import { FaHeart, FaRegHeart, FaComment } from 'react-icons/fa';
import { database } from '../../Firebase/config';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { LoadingSpinner, PulseLoader } from '../index';
import { useLikes } from '../../hooks/useLikes';

export default function Modal({ selectedImg, setSelectedImg, isOwnGallery = false }) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const { user, isAuthenticated } = useAuth();
    const { selectedTheme, colorThemes } = useTheme();
    const currentTheme = colorThemes[selectedTheme];
    
    // Use the likes hook
    const { isLiked, likeCount, likesLoading, toggleLike } = useLikes(selectedImg?.id);

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                setSelectedImg(null);
            }
        };
        
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [setSelectedImg]);

    // Load comments when modal opens
    useEffect(() => {
        if (selectedImg?.id) {
            loadComments();
        }
    }, [selectedImg?.id]);

    const loadComments = async () => {
        try {
            const commentsSnapshot = await database
                .collection('images')
                .doc(selectedImg.id)
                .collection('comments')
                .orderBy('createdAt', 'desc')
                .limit(10)
                .get();
            
            const commentsData = commentsSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setComments(commentsData);
        } catch (error) {
            console.error('Error loading comments:', error);
        }
    };

    const handleClick = (e) => {
        if(e.target.classList.contains('backdrop')){
            setSelectedImg(null);
        }
    }

    const handleDeleteIMG = async () => {
        if (isDeleting) return;
        
        setIsDeleting(true);
        try {
            await database.collection('images').doc(selectedImg.id).delete();
            console.log("Image deleted");
            setSelectedImg(null);
        } catch (error) {
            console.log(error);
            alert("Failed to delete image. Please try again.");
        } finally {
            setIsDeleting(false);
        }
    }

    const handleLike = () => {
        toggleLike();
    }

    const handleComment = async (e) => {
        e.preventDefault();
        if (!comment.trim() || !user) return;

        try {
            await database
                .collection('images')
                .doc(selectedImg.id)
                .collection('comments')
                .add({
                    text: comment.trim(),
                    userId: user.uid,
                    userName: user.displayName || 'Anonymous',
                    createdAt: new Date()
                });
            
            setComment('');
            loadComments(); // Reload comments
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    }



    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className='backdrop fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4' 
            onClick={handleClick}
            key={selectedImg.id}
        >
            <motion.div 
                className="relative max-w-6xl w-full max-h-[90vh] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700">
                    <div className="flex-1">
                        <div className="flex items-center space-x-3">
                            <h2 className="text-xl font-light text-gray-900 dark:text-white">
                                {selectedImg.name || 'Image Details'}
                            </h2>
                            {likeCount > 0 && (
                                <div className="flex items-center space-x-1 px-2 py-1 bg-red-50 dark:bg-red-900/20 rounded-full">
                                    <FaHeart className="text-red-500 text-sm" />
                                    <span className="text-sm font-medium text-red-600 dark:text-red-400">
                                        {likeCount}
                                    </span>
                                </div>
                            )}
                        </div>
                        {selectedImg.description && (
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                                {selectedImg.description}
                            </p>
                        )}
                        {!selectedImg.description && (
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">View and interact with your image</p>
                        )}
                    </div>
                    <div className="flex items-center space-x-2">
                        <motion.button
                            className="p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
                            onClick={() => setSelectedImg(null)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            title="Close (ESC)"
                        >
                            <IoClose className="text-xl" />
                        </motion.button>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row h-[calc(90vh-140px)]">
                    {/* Image Section */}
                    <div className="flex-1 relative bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-6">
                        {!imageLoaded && (
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-lg">
                                <LoadingSpinner 
                                    size="md" 
                                    variant="default" 
                                    text="Loading image..." 
                                    showIcon={true}
                                />
                            </div>
                        )}
                        <motion.img 
                            key={selectedImg.id} 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}  
                            exit={{ scale: 0.9, opacity: 0 }}
                            src={selectedImg.url} 
                            alt="Enlarged image"
                            className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
                            onLoad={() => setImageLoaded(true)}
                        />
                    </div>

                    {/* Sidebar */}
                    <div className="w-full lg:w-80 bg-white dark:bg-gray-800 border-l border-gray-100 dark:border-gray-700 flex flex-col">
                        {/* Image Actions Section */}
                        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4">Actions</h3>
                            
                            {/* Primary Actions */}
                            <div className="space-y-3">
                                <div className="flex items-center space-x-2">
                                    <motion.button
                                        className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-200 border border-gray-200 dark:border-gray-600 hover:border-red-200 dark:hover:border-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                        onClick={handleLike}
                                        disabled={likesLoading}
                                        whileHover={!likesLoading ? { scale: 1.02 } : {}}
                                        whileTap={!likesLoading ? { scale: 0.98 } : {}}
                                    >
                                        {likesLoading ? (
                                            <div className="w-4 h-4 border-2 border-red-300 border-t-red-500 rounded-full animate-spin"></div>
                                        ) : isLiked ? (
                                            <FaHeart className="text-red-500 text-lg" />
                                        ) : (
                                            <FaRegHeart className="text-lg" />
                                        )}
                                        <span className="text-sm font-medium">
                                            {likesLoading ? '' : isLiked ? 'Liked' : 'Like'}
                                        </span>
                                        {likeCount > 0 && (
                                            <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-2 py-1 rounded-full">
                                                {likeCount}
                                            </span>
                                        )}
                                    </motion.button>
                                    
                                    <motion.button
                                        className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all duration-200 border border-gray-200 dark:border-gray-600 hover:border-blue-200 dark:hover:border-blue-500"
                                        onClick={() => setShowComments(!showComments)}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <FaComment className="text-lg" />
                                        <span className="text-sm font-medium">Comment</span>
                                    </motion.button>
                                </div>
                            </div>
                            
                            
                        </div>

                        {/* Comments Section */}
                        <div className="flex-1 flex flex-col">
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Comments</h3>
                                    <span className="text-xs text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                                        {comments.length}
                                    </span>
                                </div>
                                
                                {/* Add Comment */}
                                {isAuthenticated && (
                                    <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-100 dark:border-gray-600">
                                        <form onSubmit={handleComment}>
                                            <div className="flex space-x-2">
                                                <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                                                    <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                                                        {user.displayName?.charAt(0)?.toUpperCase() || 'U'}
                                                    </span>
                                                </div>
                                                <div className="flex-1">
                                                    <input
                                                        type="text"
                                                        value={comment}
                                                        onChange={(e) => setComment(e.target.value)}
                                                        placeholder="Write a comment..."
                                                        className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500 focus:border-transparent bg-white dark:bg-gray-800 dark:text-white"
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex justify-end mt-2">
                                                <motion.button
                                                    type="submit"
                                                    className="px-4 py-1.5 bg-gray-900 dark:bg-gray-800 text-white text-xs font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                                    disabled={!comment.trim()}
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    Post Comment
                                                </motion.button>
                                            </div>
                                        </form>
                                    </div>
                                )}

                                {/* Comments List */}
                                <div className="space-y-3 max-h-64 overflow-y-auto">
                                    <AnimatePresence>
                                        {comments.map((comment) => (
                                            <motion.div
                                                key={comment.id}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="p-3 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-100 dark:border-gray-600"
                                            >
                                                <div className="flex items-start space-x-3">
                                                    <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                                                        <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                                                            {comment.userName?.charAt(0)?.toUpperCase()}
                                                        </span>
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center space-x-2 mb-1">
                                                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                                                {comment.userName}
                                                            </p>
                                                            <span className="text-xs text-gray-400 dark:text-gray-500">
                                                                {comment.createdAt?.toDate?.()?.toLocaleDateString() || 'Just now'}
                                                            </span>
                                                        </div>
                                                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{comment.text}</p>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                    
                                    {comments.length === 0 && (
                                        <div className="text-center py-12">
                                            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-3">
                                                <FaComment className="text-gray-400 dark:text-gray-500 text-lg" />
                                            </div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">No comments yet</p>
                                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Be the first to share your thoughts!</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Delete Button (for image owner) */}
                        {isOwnGallery && user && (
                            <div className="p-6 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
                                <motion.button
                                    onClick={handleDeleteIMG}
                                    disabled={isDeleting}
                                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-white dark:bg-gray-800 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 border border-red-200 dark:border-red-700 hover:border-red-300 dark:hover:border-red-600 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                                                            {isDeleting ? (
                        <div className="flex items-center space-x-2">
                            <PulseLoader size="sm" variant="error" />
                            <span className="text-sm font-medium">Deleting...</span>
                        </div>
                    ) : (
                        <>
                            <BiTrash className="text-lg" />
                            <span className="text-sm font-medium">Delete Image</span>
                        </>
                    )}
                                </motion.button>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}
