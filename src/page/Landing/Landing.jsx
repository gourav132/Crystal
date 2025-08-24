import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { 
  FaCamera, 
  FaShieldAlt, 
  FaRocket, 
  FaHeart, 
  FaArrowRight, 
  FaPlay,
  FaStar,
  FaUsers,
  FaImage,
  FaLock,
  FaGlobe,
  FaMobile,
  FaDesktop,
  FaTablet
} from 'react-icons/fa';

const Landing = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const { darkMode, toggleDarkMode, getCurrentTheme, getPageBackground, getCardBackground, getBorderColor, getGradientText, getAccentGradient } = useTheme();
  const currentTheme = getCurrentTheme();
  const { user, isAuthenticated } = useAuth();

  const heroImages = [
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2071&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop"
  ];

  const features = [
    {
      icon: FaCamera,
      title: "Stunning Galleries",
      description: "Create breathtaking photo collections with our advanced masonry layout",
      color: "from-blue-500 to-purple-600"
    },
    {
      icon: FaShieldAlt,
      title: "Secure Storage",
      description: "Your memories are protected with enterprise-grade security",
      color: "from-green-500 to-teal-600"
    },
    {
      icon: FaRocket,
      title: "Lightning Fast",
      description: "Optimized performance ensures your galleries load instantly",
      color: "from-orange-500 to-red-600"
    },
    {
      icon: FaHeart,
      title: "Beautiful Design",
      description: "Elegant, modern interface that showcases your photos perfectly",
      color: "from-pink-500 to-rose-600"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Professional Photographer",
      content: "Crystal Gallery transformed how I showcase my work. The elegant design and smooth performance are unmatched.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=1974&auto=format&fit=crop"
    },
    {
      name: "Michael Chen",
      role: "Digital Artist",
      content: "The best gallery platform I've ever used. Clean, fast, and absolutely beautiful.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop"
    },
    {
      name: "Emma Davis",
      role: "Content Creator",
      content: "Perfect for sharing my creative work. The responsive design looks great on all devices.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop"
    }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`min-h-screen ${getPageBackground()} overflow-hidden`}>
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-400/20 to-orange-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-400/10 to-cyan-600/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        {/* Floating Particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-purple-400 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute bottom-32 left-1/3 w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce delay-2000"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-indigo-400 rounded-full animate-bounce delay-3000"></div>
      </div>

             {/* Navigation */}
       <nav className="relative z-50 px-4 py-3">
         <div className="max-w-5xl mx-auto flex items-center justify-between">
           <motion.div 
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             className="flex items-center space-x-2"
           >
             <div className="relative">
               <div className={`w-7 h-7 bg-gradient-to-br ${currentTheme.colors.primary} ${currentTheme.colors.secondary} rounded-lg flex items-center justify-center shadow-lg`}>
                 <span className="text-white font-bold text-sm">C</span>
               </div>
               <div className={`absolute inset-0 w-7 h-7 bg-gradient-to-br ${currentTheme.colors.primary}/30 ${currentTheme.colors.secondary}/30 rounded-lg blur-md`}></div>
             </div>
             <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
               Crystal
             </span>
           </motion.div>

                     <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             className="flex items-center space-x-4"
           >
             <Link
               to="/About"
               className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors duration-300"
             >
               About
             </Link>
             {/* <button
               onClick={toggleDarkMode}
               className="p-2 rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-white/30 dark:border-gray-700/30 text-gray-700 dark:text-gray-300 hover:shadow-lg transition-all duration-300"
             >
               {darkMode ? <FaStar className="text-xs" /> : <FaStar className="text-xs" />}
             </button> */}
             {isAuthenticated ? (
               <Link
                 to={`/Gallery/${user?.displayName}`}
                 className={`px-4 py-2 bg-gradient-to-r ${currentTheme.colors.primary} ${currentTheme.colors.secondary} text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 relative group overflow-hidden text-sm`}
               >
                 <span className="relative z-10">My Gallery</span>
                 <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
               </Link>
             ) : (
               <Link
                 to="/Auth"
                 className={`px-4 py-2 bg-gradient-to-r ${currentTheme.colors.primary} ${currentTheme.colors.secondary} text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 relative group overflow-hidden text-sm`}
               >
                 <span className="relative z-10">Get Started</span>
                 <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
               </Link>
             )}
           </motion.div>
        </div>
      </nav>

             {/* Hero Section */}
       <section className="relative min-h-screen flex items-center justify-center px-4 py-14">
         <div className="max-w-5xl mx-auto text-center">
          {/* Hero Images Background */}
          <div className="absolute inset-0 -z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute inset-0"
              >
                <img
                  src={heroImages[currentImageIndex]}
                  alt="Hero background"
                  className="w-full h-full object-cover"
                />
                                 <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white dark:via-gray-900/50 dark:to-gray-900"></div>
                 <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-pink-600/5"></div>
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
                         <motion.h1 
               className="text-4xl md:text-6xl font-playfair font-light text-gray-900 dark:text-white mb-4 leading-tight"
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.2, duration: 0.8 }}
             >
               Your Photos,
               <br />
               <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent font-bold">
                 Beautifully
               </span>
               <br />
               Displayed
             </motion.h1>

                         <motion.p 
               className="text-lg md:text-xl font-inter text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto leading-relaxed"
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.4, duration: 0.8 }}
             >
               Create stunning photo galleries with our elegant, modern platform. 
               Share your memories with the world in style.
             </motion.p>

                         <motion.div 
               className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4"
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.6, duration: 0.8 }}
             >
               {isAuthenticated ? (
                 <Link
                   to={`/Gallery/${user?.displayName}`}
                   className={`group px-6 py-3 bg-gradient-to-r ${currentTheme.colors.primary} ${currentTheme.colors.secondary} text-white font-semibold rounded-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden text-base`}
                 >
                   <span className="relative z-10 flex items-center space-x-2">
                     <span>My Gallery</span>
                     <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                   </span>
                   <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                 </Link>
               ) : (
                 <Link
                   to="/Auth"
                   className={`group px-6 py-3 bg-gradient-to-r ${currentTheme.colors.primary} ${currentTheme.colors.secondary} text-white font-semibold rounded-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden text-base`}
                 >
                   <span className="relative z-10 flex items-center space-x-2">
                     <span>Start Creating</span>
                     <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                   </span>
                   <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                 </Link>
               )}

               <button className="group px-6 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-white/30 dark:border-gray-700/30 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 text-base">
                 <FaPlay className="text-xs" />
                 <span>Watch Demo</span>
               </button>
             </motion.div>

                         {/* Stats */}
             <motion.div 
               className="flex justify-center items-center space-x-8 mt-12"
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.8, duration: 0.8 }}
             >
               <div className="text-center">
                 <div className="text-2xl font-bold text-gray-900 dark:text-white">10K+</div>
                 <div className="text-xs text-gray-500 uppercase tracking-wide">Galleries Created</div>
               </div>
               <div className="text-center">
                 <div className="text-2xl font-bold text-gray-900 dark:text-white">1M+</div>
                 <div className="text-xs text-gray-500 uppercase tracking-wide">Photos Shared</div>
               </div>
               <div className="text-center">
                 <div className="text-2xl font-bold text-gray-900 dark:text-white">99.9%</div>
                 <div className="text-xs text-gray-500 uppercase tracking-wide">Uptime</div>
               </div>
             </motion.div>
          </motion.div>
        </div>
      </section>

             {/* Features Section */}
       <section className="py-14 px-4 relative">
         <div className="max-w-5xl mx-auto">
                     <motion.div 
             className="text-center mb-12"
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
             viewport={{ once: true }}
           >
             <h2 className="text-3xl md:text-4xl font-playfair font-light text-gray-900 dark:text-white mb-4">
               Why Choose <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold">Crystal</span>?
             </h2>
             <p className="text-lg font-inter text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
               Experience the perfect blend of beauty, performance, and security
             </p>
           </motion.div>

                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             {features.map((feature, index) => (
               <motion.div
                 key={index}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ delay: index * 0.1, duration: 0.8 }}
                 viewport={{ once: true }}
                 className="group relative"
               >
                 <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-xl p-6 border border-white/30 dark:border-gray-700/30 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden group">
                   <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                   <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                     <feature.icon className="text-white text-lg" />
                   </div>
                   <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                     {feature.title}
                   </h3>
                   <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                     {feature.description}
                   </p>
                 </div>
               </motion.div>
             ))}
           </div>
        </div>
      </section>

             {/* Luxury Divider */}
       <div className="relative py-12">
         <div className="absolute inset-0 flex items-center">
           <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
         </div>
         <div className="relative flex justify-center">
           <div className="w-16 h-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full"></div>
         </div>
       </div>

       {/* Testimonials Section */}
       <section className="py-14 px-4 relative bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
         <div className="max-w-5xl mx-auto">
                     <motion.div 
             className="text-center mb-12"
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
             viewport={{ once: true }}
           >
             <h2 className="text-3xl md:text-4xl font-playfair font-light text-gray-900 dark:text-white mb-4">
               Loved by <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold">Creators</span>
             </h2>
             <p className="text-lg font-inter text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
               See what our community has to say about Crystal Gallery
             </p>
           </motion.div>

                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {testimonials.map((testimonial, index) => (
               <motion.div
                 key={index}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ delay: index * 0.1, duration: 0.8 }}
                 viewport={{ once: true }}
                 className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-xl p-6 border border-white/30 dark:border-gray-700/30 hover:shadow-xl transition-all duration-500"
               >
                 <div className="flex items-center mb-4">
                   <img
                     src={testimonial.avatar}
                     alt={testimonial.name}
                     className="w-10 h-10 rounded-full object-cover mr-3"
                   />
                   <div>
                     <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                       {testimonial.name}
                     </h4>
                     <p className="text-xs text-gray-500 dark:text-gray-400">
                       {testimonial.role}
                     </p>
                   </div>
                 </div>
                 <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                   "{testimonial.content}"
                 </p>
                 <div className="flex items-center mt-3">
                   {[...Array(5)].map((_, i) => (
                     <FaStar key={i} className="text-yellow-400 text-xs" />
                   ))}
                 </div>
               </motion.div>
             ))}
           </div>
        </div>
      </section>

             {/* CTA Section */}
       <section className="py-14 px-4 relative">
         <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
                         <h2 className="text-3xl md:text-4xl font-playfair font-light text-gray-900 dark:text-white mb-4">
               Ready to Create Your <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold">Gallery</span>?
             </h2>
             <p className="text-lg font-inter text-gray-600 dark:text-gray-300 mb-6 max-w-xl mx-auto">
               Join thousands of creators who trust Crystal Gallery to showcase their work beautifully
             </p>
             {isAuthenticated ? (
               <Link
                 to={`/Gallery/${user?.displayName}`}
                 className={`inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r ${currentTheme.colors.primary} ${currentTheme.colors.secondary} text-white font-semibold rounded-lg hover:shadow-xl transition-all duration-300 text-base group`}
               >
                 <span>Go to My Gallery</span>
                 <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
               </Link>
             ) : (
               <Link
                 to="/Auth"
                 className={`inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r ${currentTheme.colors.primary} ${currentTheme.colors.secondary} text-white font-semibold rounded-lg hover:shadow-xl transition-all duration-300 text-base group`}
               >
                 <span>Get Started Free</span>
                 <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
               </Link>
             )}
          </motion.div>
        </div>
      </section>

             {/* Footer */}
       <footer className="py-8 px-4 border-t border-gray-200 dark:border-gray-700">
         <div className="max-w-5xl mx-auto">
                     <div className="flex flex-col md:flex-row items-center justify-between">
             <div className="flex items-center space-x-2 mb-3 md:mb-0">
               <div className={`w-6 h-6 bg-gradient-to-br ${currentTheme.colors.primary} ${currentTheme.colors.secondary} rounded-md flex items-center justify-center`}>
                 <span className="text-white font-bold text-xs">C</span>
               </div>
               <span className="text-base font-semibold text-gray-900 dark:text-white">
                 Crystal Gallery
               </span>
             </div>
             <div className="flex items-center space-x-4 text-xs text-gray-600 dark:text-gray-400">
               <span>© 2024 Crystal Gallery. All rights reserved.</span>
             </div>
           </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
