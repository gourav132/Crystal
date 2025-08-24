import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { FaUser, FaBars, FaTimes, FaPlus } from "react-icons/fa";
import { auth, database } from "../../Firebase/config";
import { FaLink } from "react-icons/fa6";
import { useAuth } from "../../contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../contexts/ThemeContext";

export default function Navbar({
  isOwnGallery = false,
  showCombinedModal,
  setShowCombinedModal
}) {
  const [toggle, setToggle] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const { user, loading, isAuthenticated } = useAuth();
  const [name, setName] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const cardRef = useRef(null);
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode, getCurrentTheme } = useTheme();
  const currentTheme = getCurrentTheme();

  useEffect(() => {
    const getUser = async () => {
      if (!loading && user) {
        try {
          const userSnapshot = await database
            .collection("users")
            .doc(user.displayName)
            .get();
          setName(userSnapshot.data().firstName);
        } catch (err) {
          console.log(err);
        }
      } else console.log("user not signed in");
    };
    getUser();
  }, [loading, user]);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setToggle(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    auth.signOut();
  };

  const toggleCard = () => {
    setToggle(!toggle);
  };

  const handleCopyUrl = () => {
    const baseUrl = window.location.origin;
    const customUrl = `${baseUrl}/Gallery/${user.displayName}`;
    navigator.clipboard
      .writeText(customUrl)
      .then(() => {
        alert("URL copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy URL: ", err);
      });
  };

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-2xl border-b border-white/20 dark:border-gray-700/20' 
          : 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg'
      }`}
    >
      {/* Luxury accent line */}
      <div className={`h-0.5 bg-gradient-to-r from-transparent via-${currentTheme.colors.primary.split('-')[1]}-500/60 to-transparent`}></div>
      
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <div className="relative">
              <div className={`w-8 h-8 bg-gradient-to-br ${currentTheme.colors.primary} ${currentTheme.colors.secondary} rounded-lg flex items-center justify-center shadow-md`}>
                <span className="text-white font-bold text-sm">C</span>
              </div>
              {/* Luxury glow effect */}
              <div className={`absolute inset-0 w-8 h-8 bg-gradient-to-br ${currentTheme.colors.primary}/40 ${currentTheme.colors.secondary}/40 rounded-lg blur-sm`}></div>
            </div>
            <Link to="/" className="text-xl font-bold gradient-text-primary tracking-wide dark:text-white">
              Crystal
            </Link>
            <div className="hidden sm:block w-px h-4 bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {user && (
              <motion.ul 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center space-x-6"
              >
                <motion.li whileHover={{ y: -1 }}>
                  <Link
                    to={`/Gallery/${user.displayName}`}
                    className={`text-gray-700 dark:text-gray-300 hover:text-${currentTheme.colors.primary.split('-')[1]}-600 dark:hover:text-${currentTheme.colors.primary.split('-')[1]}-400 font-medium transition-all duration-300 relative group text-sm tracking-wide`}
                  >
                    <span className="relative z-10">Gallery</span>
                    <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r ${currentTheme.colors.primary} ${currentTheme.colors.secondary} transition-all duration-500 group-hover:w-full`}></span>
                    <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r ${currentTheme.colors.primary}/20 ${currentTheme.colors.secondary}/20 blur-sm transition-all duration-500 group-hover:w-full`}></span>
                  </Link>
                </motion.li>

                <motion.li whileHover={{ y: -1 }}>
                  <Link 
                    to="/About"
                    className={`text-gray-700 dark:text-gray-300 hover:text-${currentTheme.colors.primary.split('-')[1]}-600 dark:hover:text-${currentTheme.colors.primary.split('-')[1]}-400 font-medium transition-all duration-300 relative group text-sm tracking-wide`}
                  >
                    <span className="relative z-10">About</span>
                    <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r ${currentTheme.colors.primary} ${currentTheme.colors.secondary} transition-all duration-500 group-hover:w-full`}></span>
                    <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r ${currentTheme.colors.primary}/20 ${currentTheme.colors.secondary}/20 blur-sm transition-all duration-500 group-hover:w-full`}></span>
                  </Link>
                </motion.li>
              </motion.ul>
            )}
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">

            {user ? (
              <div className="relative" ref={cardRef}>
                <motion.button
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleCard}
                  className={`flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-white/80 to-white/60 dark:from-gray-800/80 dark:to-gray-700/60 backdrop-blur-md rounded-xl border border-white/30 dark:border-gray-700/30 text-gray-800 dark:text-gray-200 font-medium transition-all duration-300 hover:from-white/90 hover:to-white/80 dark:hover:from-gray-800/90 dark:hover:to-gray-700/80 hover:shadow-lg hover:border-${currentTheme.colors.primary.split('-')[1]}-500/20 group`}
                >
                  <div className="relative">
                    <div className={`w-6 h-6 bg-gradient-to-br ${currentTheme.colors.primary} ${currentTheme.colors.secondary} rounded-full flex items-center justify-center shadow-sm`}>
                      <span className="text-white text-xs font-bold">{name?.charAt(0)?.toUpperCase()}</span>
                    </div>
                    <div className={`absolute inset-0 w-6 h-6 bg-gradient-to-br ${currentTheme.colors.primary}/30 ${currentTheme.colors.secondary}/30 rounded-full blur-sm group-hover:blur-md transition-all duration-300`}></div>
                  </div>
                  <span className="hidden sm:block text-sm font-medium">{name}</span>
                  <div className={`w-1.5 h-1.5 bg-${currentTheme.colors.primary.split('-')[1]}-500 rounded-full opacity-60`}></div>
                </motion.button>

                <AnimatePresence>
                  {toggle && (
                    <motion.div
                      initial={{ opacity: 0, y: -20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.95 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="absolute right-0 mt-3 w-64 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-xl shadow-xl border border-white/30 dark:border-gray-700/30 overflow-hidden"
                    >
                      {/* Luxury header */}
                      <div className={`bg-gradient-to-r ${currentTheme.colors.primary}/5 ${currentTheme.colors.secondary}/5 p-4 border-b border-white/20 dark:border-gray-700/20`}>
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <div className={`w-10 h-10 bg-gradient-to-br ${currentTheme.colors.primary} ${currentTheme.colors.secondary} rounded-full flex items-center justify-center shadow-md`}>
                              <span className="text-white font-bold text-sm">{name?.charAt(0)?.toUpperCase()}</span>
                            </div>
                            <div className={`absolute inset-0 w-10 h-10 bg-gradient-to-br ${currentTheme.colors.primary}/30 ${currentTheme.colors.secondary}/30 rounded-full blur-md`}></div>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white text-base">{name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Gallery Curator</p>
                          </div>
                        </div>
                      </div>
                      
                                             <div className="p-3 space-y-1">
                         {isOwnGallery && (
                           <>                           
                              <motion.button
                                  whileHover={{ x: 6, backgroundColor: "rgba(20, 184, 166, 0.05)" }}
                                  onClick={() => {
                                  setToggle(false);
                                  // Open combined modal directly
                                  if (setShowCombinedModal) {
                                    setShowCombinedModal(true);
                                  }
                                  }}
                                className={`w-full flex items-center space-x-3 px-3 py-2 text-left text-gray-700 dark:text-gray-300 hover:text-${currentTheme.colors.primary.split('-')[1]}-600 dark:hover:text-${currentTheme.colors.primary.split('-')[1]}-400 rounded-lg transition-all duration-300 group`}
                              >
                                <div className={`w-6 h-6 bg-gradient-to-br ${currentTheme.colors.primary}/10 ${currentTheme.colors.secondary}/10 rounded-md flex items-center justify-center group-hover:${currentTheme.colors.primary}/20 group-hover:${currentTheme.colors.secondary}/20 transition-all duration-300`}>
                                  <FaPlus className={`text-${currentTheme.colors.primary.split('-')[1]}-500 text-xs`} />
                                </div>
                                <div>
                                  <span className="text-xs font-medium">Create Content</span>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">Create a new collection</p>
                                </div>
                              </motion.button>
                           </>
                         )}
                        
                        <motion.button
                          whileHover={{ x: 6, backgroundColor: "rgba(20, 184, 166, 0.05)" }}
                          onClick={handleCopyUrl}
                          className={`w-full flex items-center space-x-3 px-3 py-2 text-left text-gray-700 dark:text-gray-300 hover:text-${currentTheme.colors.primary.split('-')[1]}-600 dark:hover:text-${currentTheme.colors.primary.split('-')[1]}-400 rounded-lg transition-all duration-300 group`}
                        >
                          <div className={`w-6 h-6 bg-gradient-to-br ${currentTheme.colors.primary}/10 ${currentTheme.colors.secondary}/10 rounded-md flex items-center justify-center group-hover:${currentTheme.colors.primary}/20 group-hover:${currentTheme.colors.secondary}/20 transition-all duration-300`}>
                            <FaLink className={`text-${currentTheme.colors.primary.split('-')[1]}-500 text-xs`} />
                          </div>
                          <div>
                            <span className="text-xs font-medium">Share Gallery</span>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Copy your gallery URL</p>
                          </div>
                        </motion.button>
                        
                        {isAuthenticated && (
                          <motion.button
                            whileHover={{ x: 6, backgroundColor: "rgba(20, 184, 166, 0.05)" }}
                            onClick={() => navigate("/Profile")}
                            className={`w-full flex items-center space-x-3 px-3 py-2 text-left text-gray-700 dark:text-gray-300 hover:text-${currentTheme.colors.primary.split('-')[1]}-600 dark:hover:text-${currentTheme.colors.primary.split('-')[1]}-400 rounded-lg transition-all duration-300 group`}
                          >
                            <div className={`w-6 h-6 bg-gradient-to-br ${currentTheme.colors.primary}/10 ${currentTheme.colors.secondary}/10 rounded-md flex items-center justify-center group-hover:${currentTheme.colors.primary}/20 group-hover:${currentTheme.colors.secondary}/20 transition-all duration-300`}>
                              <FaUser className={`text-${currentTheme.colors.primary.split('-')[1]}-500 text-xs`} />
                            </div>
                            <div>
                              <span className="text-xs font-medium">Profile Settings</span>
                              <p className="text-xs text-gray-500 dark:text-gray-400">Manage your account</p>
                            </div>
                          </motion.button>
                        )}
                        
                        <div className="border-t border-gray-200/30 dark:border-gray-600/30 my-2"></div>
                        
                        <motion.button
                          whileHover={{ x: 6, backgroundColor: "rgba(239, 68, 68, 0.05)" }}
                          onClick={handleLogout}
                          className="w-full flex items-center space-x-3 px-3 py-2 text-left text-red-600 hover:text-red-700 rounded-lg transition-all duration-300 group"
                        >
                          <div className="w-6 h-6 bg-gradient-to-br from-red-500/10 to-red-600/10 rounded-md flex items-center justify-center group-hover:from-red-500/20 group-hover:to-red-600/20 transition-all duration-300">
                            <RiLogoutCircleRLine className="text-red-500 text-xs" />
                          </div>
                          <div>
                            <span className="text-xs font-medium">Sign Out</span>
                            <p className="text-xs text-red-500/70">End your session</p>
                          </div>
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Link
                  to="/Auth"
                  className={`px-6 py-2 bg-gradient-to-r ${currentTheme.colors.primary} ${currentTheme.colors.secondary} text-white font-medium rounded-xl hover:${currentTheme.colors.primary}/90 hover:${currentTheme.colors.secondary}/90 shadow-md hover:shadow-lg transition-all duration-300 relative group overflow-hidden`}
                >
                  <span className="relative z-10 text-sm">Sign In</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </Link>
              </motion.div>
            )}

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenu(!mobileMenu)}
              className={`lg:hidden p-2 text-gray-700 dark:text-gray-300 hover:text-${currentTheme.colors.primary.split('-')[1]}-600 dark:hover:text-${currentTheme.colors.primary.split('-')[1]}-400 transition-all duration-300 rounded-lg hover:bg-white/50 dark:hover:bg-gray-700/50`}
            >
              {mobileMenu ? <FaTimes size={18} /> : <FaBars size={18} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenu && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="lg:hidden border-t border-white/20 dark:border-gray-700/20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg rounded-xl mt-3 mb-3"
            >
              <div className="py-4 px-3 space-y-3">
                {user && (
                  <>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <Link
                        to={`/Gallery/${user.displayName}`}
                        className={`block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-${currentTheme.colors.primary.split('-')[1]}-600 dark:hover:text-${currentTheme.colors.primary.split('-')[1]}-400 hover:bg-white/50 dark:hover:bg-gray-700/50 rounded-lg transition-all duration-300 font-medium text-sm`}
                        onClick={() => setMobileMenu(false)}
                      >
                        Gallery
                      </Link>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Link 
                        to="/About"
                        className={`block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-${currentTheme.colors.primary.split('-')[1]}-600 dark:hover:text-${currentTheme.colors.primary.split('-')[1]}-400 hover:bg-white/50 dark:hover:bg-gray-700/50 rounded-lg transition-all duration-300 font-medium text-sm`}
                        onClick={() => setMobileMenu(false)}
                      >
                        About
                      </Link>
                    </motion.div>
                    
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
