import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

const AuthLayout = ({ children, title, subtitle, imageUrl }) => {
  const { selectedTheme, colorThemes, getPageBackground, getCardBackground, getBorderColor, getGradientText, getAccentGradient } = useTheme();
  const currentTheme = colorThemes[selectedTheme];
  
  return (
    <div className={`h-screen max-h-screen ${getPageBackground()} flex overflow-hidden`}>
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-xs w-full space-y-4"
        >
          {/* Logo */}
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className={`mx-auto h-10 w-10 bg-gradient-to-r ${currentTheme.colors.primary} ${currentTheme.colors.secondary} rounded-lg flex items-center justify-center shadow-md`}
            >
              <span className="text-lg font-bold text-white">C</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-3 text-xl font-bold text-gray-900 dark:text-white"
            >
              {title}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-1 text-xs text-gray-600 dark:text-gray-400"
            >
              {subtitle}
            </motion.p>
          </div>

          {/* Form Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className=""
          >
            {children}
          </motion.div>
        </motion.div>
      </div>

      {/* Right Side - Modern Elements */}
      <div className="hidden lg:flex lg:flex-1 relative overflow-hidden">
        {/* Background Image with Parallax Effect */}
        <div className="absolute inset-0">
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-full h-full object-cover"
            src={imageUrl || "https://images.unsplash.com/photo-1495745966610-2a67f2297e5e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
            alt="Gallery background"
          />
          {/* Multiple Gradient Overlays */}
          <div className={`absolute inset-0 bg-gradient-to-br ${currentTheme.colors.primary}/40 ${currentTheme.colors.secondary}/30`}></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-primary/10"></div>
        </div>

        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, white 1px, transparent 1px),
                              radial-gradient(circle at 75% 75%, white 1px, transparent 1px)`,
            backgroundSize: '30px 30px'
          }} />
        </div>

        {/* Floating Elements Container */}
        <div className="relative z-10 w-full h-full">
          {/* Animated Gradient Orbs */}
          <motion.div
            initial={{ opacity: 0, scale: 0, x: -50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 1, type: "spring" }}
            className={`absolute top-20 right-20 w-40 h-40 bg-gradient-to-r ${currentTheme.colors.primary}/20 ${currentTheme.colors.secondary}/20 rounded-full backdrop-blur-md border border-white/20`}
            style={{
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, rgba(147, 51, 234, 0.1) 50%, transparent 100%)'
            }}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 1, type: "spring" }}
            className={`absolute bottom-32 left-16 w-32 h-32 bg-gradient-to-r ${currentTheme.colors.primary}/15 ${currentTheme.colors.secondary}/15 rounded-full backdrop-blur-md`}
            style={{
              background: 'radial-gradient(circle, rgba(147, 51, 234, 0.15) 0%, rgba(99, 102, 241, 0.1) 50%, transparent 100%)'
            }}
          />

          {/* Geometric Shapes with Animations */}
          <motion.div
            initial={{ opacity: 0, rotate: -45, scale: 0 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className={`absolute top-40 left-8 w-24 h-24 bg-gradient-to-r ${currentTheme.colors.primary}/10 ${currentTheme.colors.secondary}/10 transform rotate-45 backdrop-blur-sm border border-white/10`}
          />
          
          <motion.div
            initial={{ opacity: 0, rotate: 45, scale: 0 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="absolute bottom-20 right-8 w-16 h-16 bg-white/5 transform rotate-45 backdrop-blur-sm border border-white/5"
          />

          {/* Floating Particles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="absolute top-1/3 left-1/4 w-2 h-2 bg-white/30 rounded-full"
          />
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            className="absolute top-2/3 right-1/3 w-1.5 h-1.5 bg-white/40 rounded-full"
          />
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-white/50 rounded-full"
          />

          {/* Main Content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7, duration: 0.8 }}
              className="text-center text-white relative z-20"
            >
              {/* Animated Logo Container */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 1.9, type: "spring", stiffness: 200 }}
                className="mb-8"
              >
                <div className="relative">
                  <div className="w-24 h-24 mx-auto bg-white/10 rounded-3xl backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl">
                    <span className="text-4xl font-bold text-white">✨</span>
                  </div>
                  {/* Glowing effect */}
                  <div className={`absolute inset-0 w-24 h-24 mx-auto bg-gradient-to-r ${currentTheme.colors.primary}/20 ${currentTheme.colors.secondary}/20 rounded-3xl blur-xl`}></div>
                </div>
              </motion.div>
              
              {/* Main Title with Gradient */}
              <motion.h1 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.1 }}
                className="text-5xl font-bold mb-6 text-shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, #ffffff 0%, #e0e7ff 50%, #c7d2fe 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Crystal Gallery
              </motion.h1>
              
              {/* Subtitle with enhanced styling */}
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.3 }}
                className="text-xl opacity-95 text-shadow-md max-w-lg mx-auto leading-relaxed"
              >
                Share your moments beautifully with our stunning photo gallery platform
              </motion.p>

              {/* Modern Feature Cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.5 }}
                className="grid grid-cols-3 gap-4 mt-10 max-w-md mx-auto"
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-all duration-300"
                >
                  <div className="text-2xl mb-2">📸</div>
                  <div className="text-xs font-medium">Photo Sharing</div>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-all duration-300"
                >
                  <div className="text-2xl mb-2">🔒</div>
                  <div className="text-xs font-medium">Secure Storage</div>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-all duration-300"
                >
                  <div className="text-2xl mb-2">⚡</div>
                  <div className="text-xs font-medium">Fast Upload</div>
                </motion.div>
              </motion.div>

              {/* Floating Action Button */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.7, type: "spring" }}
                className="mt-8"
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-white/15 backdrop-blur-md rounded-full border border-white/30 text-white font-medium hover:bg-white/20 transition-all duration-300 shadow-lg"
                >
                  Get Started Today
                </motion.button>
              </motion.div>
            </motion.div>
          </div>

          {/* Animated Border Elements */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.9, duration: 0.8 }}
            className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 3.1, duration: 0.8 }}
            className="absolute bottom-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-white/20 to-transparent"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
