import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { auth, database, timestamp } from '../../Firebase/config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FaUpload, FaLink, FaTimes, FaImage, FaFolder } from 'react-icons/fa';
import { useTheme } from '../../contexts/ThemeContext';
import { useCollections } from '../../contexts/CollectionsContext';

export default function UploadModal({ setAddImage, setError, setFile, isOpen, onClose, collectionId = null }) {

    const [ url, setUrl ] = useState(null);
    const [ imageName, setImageName ] = useState('');
    const [ imageDescription, setImageDescription ] = useState('');
    const [ selectedCollectionId, setSelectedCollectionId ] = useState(collectionId || 'none');
    const [ user ] = useAuthState(auth);
    const types = ['image/png', 'image/jpeg'];
    const { selectedTheme, colorThemes } = useTheme();
    const currentTheme = colorThemes[selectedTheme];
    const { collections } = useCollections();

    // Update selected collection when collectionId prop changes
    useEffect(() => {
        if (collectionId) {
            setSelectedCollectionId(collectionId);
        } else {
            setSelectedCollectionId('none');
        }
    }, [collectionId]);

    // Reset form when modal opens/closes
    useEffect(() => {
        if (!isOpen && !setAddImage) {
            setUrl(null);
            setImageName('');
            setImageDescription('');
            setSelectedCollectionId(collectionId || 'none');
        }
    }, [isOpen, setAddImage, collectionId]);

    const handleChange = (e) => {
        const selected = e.target.files[0];
        if(selected && types.includes(selected.type)){
            setFile({
                file: selected,
                name: imageName,
                description: imageDescription,
                collectionId: selectedCollectionId === 'none' ? null : selectedCollectionId
            })
            setAddImage(null)
            setError(null)
        } else {
            setFile(null);
            setError("Please select an image file (png or jpeg)")
            setAddImage(null)
        }
    }

    const handleURL = () => {
        const collectionRef = database.collection('images');
        if(validateURL(url)){
            if (onClose) onClose();
            if (setAddImage) setAddImage(null);
            const createdAt = timestamp();
            const imageData = { 
                url, 
                name: imageName || 'Untitled Image',
                description: imageDescription || '',
                createdAt, 
                user: user.displayName,
                userId: user.uid,
                collectionId: selectedCollectionId === 'none' ? null : selectedCollectionId
            };
            
            collectionRef.add(imageData)
            .then( resp => {
                // console.log(resp);
                setUrl(null)
                setImageName('')
                setImageDescription('')
            })
            .catch( error => {
                console.log(error);
            })
        } else {
            if (onClose) onClose();
            if (setAddImage) setAddImage(null);
            if (setError) setError("Please enter a valid url")
        }
    }

    const validateURL = (url) => {
        var pattern = new RegExp('^(https?:\\/\\/)?'+
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+
        '((\\d{1,3}\\.){3}\\d{1,3}))'+
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
        '(\\?[;&a-z\\d%_.~+=-]*)?'+
        '(\\#[-a-z\\d_]*)?$','i');
        return pattern.test(url);
    }

    const handleClick = (e) => {
        if(e.target.classList.contains('backdrop') || e.target.classList.contains('upload-wrapper')){
            if (onClose) onClose();
            if (setAddImage) setAddImage(null);
        }
    }

    if (!isOpen && !setAddImage) return null;

    return (
        <motion.div 
            className='backdrop fixed inset-0 bg-black/30 backdrop-blur-md z-50 flex items-center justify-center p-4' 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={handleClick}
        >
            <motion.div 
                className='upload-wrapper bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/20 max-w-lg w-full mx-4 overflow-hidden'
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
                {/* Compact Header */}
                <div className="flex items-center justify-between p-5 border-b border-gray-100/50 dark:border-gray-700/50">
                    <div>
                        <h2 className="text-lg font-medium text-gray-900 dark:text-white">Add New Image</h2>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Share your visual story</p>
                    </div>
                    <motion.button
                        className="p-1.5 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
                        onClick={() => {
                            if (onClose) onClose();
                            if (setAddImage) setAddImage(null);
                        }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <FaTimes className="text-base" />
                    </motion.button>
                </div>

                {/* Compact Content */}
                <div className="p-5">
                    {/* Streamlined Image Details */}
                    <div className="mb-5 space-y-3">
                        <div>
                            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                                Image Name *
                            </label>
                            <input 
                                type="text"
                                placeholder="Give your image a name"
                                value={imageName}
                                onChange={(e) => setImageName(e.target.value)}
                                className={`w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-${currentTheme.colors.primary.split('-')[1]}-500/20 focus:border-${currentTheme.colors.primary.split('-')[1]}-500 transition-all duration-200 bg-white/50 dark:bg-gray-800/50 dark:text-white`}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                                Description
                            </label>
                            <textarea 
                                placeholder="Add a brief description or caption"
                                value={imageDescription}
                                onChange={(e) => setImageDescription(e.target.value)}
                                rows="2"
                                className={`w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-${currentTheme.colors.primary.split('-')[1]}-500/20 focus:border-${currentTheme.colors.primary.split('-')[1]}-500 transition-all duration-200 resize-none bg-white/50 dark:bg-gray-800/50 dark:text-white`}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                                Collection (Optional)
                            </label>
                            <div className="relative">
                                <select
                                    value={selectedCollectionId}
                                    onChange={(e) => setSelectedCollectionId(e.target.value)}
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
                    </div>
                    
                    {/* Compact Upload Options */}
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
                                        imageName.trim() 
                                            ? `bg-${currentTheme.colors.primary.split('-')[1]}-600 text-white hover:bg-${currentTheme.colors.primary.split('-')[1]}-700 cursor-pointer shadow-sm` 
                                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    }`}
                                    htmlFor="inputFile"
                                    whileHover={imageName.trim() ? { scale: 1.02 } : {}}
                                    whileTap={imageName.trim() ? { scale: 0.98 } : {}}
                                >
                                    {imageName.trim() ? 'Choose File' : 'Name Required'}
                                </motion.label>
                                <input className="hidden" id="inputFile" type="file" onChange={handleChange} accept="image/png,image/jpeg"/>
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
                                    className={`w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-${currentTheme.colors.primary.split('-')[1]}-500/20 focus:border-${currentTheme.colors.primary.split('-')[1]}-500 transition-all duration-200 bg-white/50 dark:bg-gray-800/50 dark:text-white`}
                                    onChange={(e) => setUrl(e.target.value)}
                                    value={url || ''}
                                />
                                <motion.button 
                                    className={`w-full px-4 py-2 text-xs font-medium rounded-lg transition-all duration-300 ${
                                        url && imageName.trim()
                                            ? `bg-${currentTheme.colors.primary.split('-')[1]}-600 text-white hover:bg-${currentTheme.colors.primary.split('-')[1]}-700 shadow-sm` 
                                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    }`}
                                    onClick={handleURL}
                                    disabled={!url || !imageName.trim()}
                                    whileHover={url && imageName.trim() ? { scale: 1.02 } : {}}
                                    whileTap={url && imageName.trim() ? { scale: 0.98 } : {}}
                                >
                                    <FaLink className="inline mr-1.5 text-xs" />
                                    {!imageName.trim() ? 'Name Required' : !url ? 'URL Required' : 'Add Image'}
                                </motion.button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}
