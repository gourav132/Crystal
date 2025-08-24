import React, { useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { FaCamera, FaSpinner } from 'react-icons/fa';

export default function Loading() {
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    const { uid } = useParams();
    const { selectedTheme, colorThemes, getPageBackground, getCardBackground, getBorderColor, getGradientText, getAccentGradient } = useTheme();
    const currentTheme = colorThemes[selectedTheme];

    useEffect(() => {
        if(!loading && !uid) {
            if(user) navigate(`/Gallery/${user.displayName}`);
            else navigate('/Auth');
        }
    }, [user, navigate, loading, uid])

    return (
        <div className={`h-screen w-full flex items-center justify-center ${getPageBackground()} transition-colors duration-300`}>
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div 
                    className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-3xl"
                    animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{ 
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div 
                    className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-400/10 to-orange-600/10 rounded-full blur-3xl"
                    animate={{ 
                        scale: [1.2, 1, 1.2],
                        opacity: [0.6, 0.3, 0.6]
                    }}
                    transition={{ 
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2
                    }}
                />
                <motion.div 
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-400/5 to-cyan-600/5 rounded-full blur-3xl"
                    animate={{ 
                        scale: [1, 1.1, 1],
                        opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    }}
                />
            </div>

            {/* Main Loading Content */}
            <motion.div 
                className="relative z-10 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                {/* Loading Card */}
                <div className={`${getCardBackground()} rounded-3xl p-8 ${getBorderColor()} shadow-2xl`}>
                    {/* Icon Container */}
                    <motion.div 
                        className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 dark:from-blue-500/30 dark:to-purple-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6"
                        animate={{ 
                            rotate: [0, 360],
                            scale: [1, 1.05, 1]
                        }}
                        transition={{ 
                            rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                        }}
                    >
                        <FaCamera className="text-2xl text-blue-600 dark:text-blue-400" />
                    </motion.div>

                    {/* Loading Text */}
                    <motion.h2 
                        className="text-xl font-semibold text-gray-800 dark:text-white mb-2"
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                        Loading Crystal Gallery
                    </motion.h2>
                    
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                        Preparing your visual experience...
                    </p>

                    {/* Animated Spinner */}
                    <div className="flex justify-center">
                        <motion.div 
                            className="relative"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        >
                            <div className={`w-8 h-8 border-2 border-gray-200 dark:border-gray-600 border-t-${currentTheme.colors.primary.split('-')[1]}-500 rounded-full`} />
                        </motion.div>
                    </div>

                    {/* Loading Dots */}
                    <div className="flex justify-center space-x-1 mt-4">
                        {[0, 1, 2].map((index) => (
                            <motion.div
                                key={index}
                                className={`w-2 h-2 bg-${currentTheme.colors.primary.split('-')[1]}-500 rounded-full`}
                                animate={{ 
                                    scale: [1, 1.5, 1],
                                    opacity: [0.5, 1, 0.5]
                                }}
                                transition={{ 
                                    duration: 1.5,
                                    repeat: Infinity,
                                    delay: index * 0.2,
                                    ease: "easeInOut"
                                }}
                            />
                        ))}
                    </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-br from-pink-400/30 to-orange-400/30 rounded-full blur-sm" />
                <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full blur-sm" />
            </motion.div>
        </div>
    )
}