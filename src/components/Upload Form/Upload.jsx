import React, { useState } from 'react'
import Progress from '../Progress Bar/Progress'
import UploadModal from '../Upload Modal/UploadModal';
import { AnimatePresence, motion } from 'framer-motion';
import { FaPlus, FaImage } from 'react-icons/fa';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../Firebase/config';

export default function Upload() {
    
    const [ file, setFile ] = useState(null);
    const [ error, setError ] = useState(null);
    const [ addImage, setAddImage ] = useState(false);
    const [ user ] = useAuthState(auth);

    return (
        <>
        <AnimatePresence>
            { addImage && 
                <UploadModal 
                    setAddImage = { setAddImage }
                    setError = { setError }
                    setFile = { setFile }
                /> 
            }
        </AnimatePresence>
        
        {user ? (
            <div className="flex flex-col items-center space-y-3">
                {/* Modern Upload Button */}
                <motion.button 
                    className="group relative flex items-center justify-center w-12 h-12 bg-white border-2 border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-md transition-all duration-300"
                    onClick={() => setAddImage(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <div className="flex items-center justify-center w-full h-full">
                        <FaPlus className="text-gray-400 text-base group-hover:text-gray-600 transition-colors duration-300" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.button>
                
                {/* Upload Label */}
                <div className="text-center">
                    <p className="text-xs text-gray-500 font-medium">Add Image</p>
                    <p className="text-xs text-gray-400">Click to upload</p>
                </div>
                
                {/* Output Section */}
                <div className="w-full max-w-sm">
                    {error && (
                        <motion.div 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center p-3 bg-red-50 border border-red-200 rounded-lg mb-3"
                        >
                            <p className="text-red-600 text-sm">{error}</p>
                        </motion.div>
                    )}
                    
                    {file && (
                        <motion.div 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center p-3 bg-gray-50 border border-gray-200 rounded-lg mb-3"
                        >
                            <div className="flex items-center justify-center space-x-2 mb-2">
                                <FaImage className="text-gray-400 text-sm" />
                                <p className="text-gray-700 text-sm font-medium">{file.file?.name || file.name}</p>
                            </div>
                            <Progress file={file.file || file} setFile={setFile} />
                        </motion.div>
                    )}
                </div>
            </div>
        ) : null}
        </>
    )
}
