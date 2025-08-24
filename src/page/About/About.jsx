import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { 
  FaCamera, 
  FaPalette, 
  FaUsers, 
  FaHeart, 
  FaStar, 
  FaRocket, 
  FaShieldAlt, 
  FaLightbulb,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
  FaArrowRight,
  FaPlay,
  FaCode,
  FaPaintBrush,
  FaMobile,
  FaGlobe
} from 'react-icons/fa';

const About = () => {
  const { selectedTheme, colorThemes, darkMode, getPageBackground, getCardBackground, getBorderColor, getGradientText, getAccentGradient } = useTheme();
  const { isAuthenticated, user } = useAuth();
  const currentTheme = colorThemes[selectedTheme];

  const features = [
    {
      icon: FaCamera,
      title: "Beautiful Galleries",
      description: "Create stunning visual collections with our intuitive gallery builder"
    },
    {
      icon: FaPalette,
      title: "20+ Color Themes",
      description: "Personalize your experience with our carefully crafted color schemes"
    },
    {
      icon: FaUsers,
      title: "Social Sharing",
      description: "Share your galleries with friends and the world"
    },
    {
      icon: FaHeart,
      title: "User-Friendly",
      description: "Designed with simplicity and ease of use in mind"
    }
  ];

  const stats = [
    { number: "10K+", label: "Images Uploaded", icon: FaCamera },
    { number: "5K+", label: "Happy Users", icon: FaUsers },
    { number: "20+", label: "Color Themes", icon: FaPalette },
    { number: "99.9%", label: "Uptime", icon: FaShieldAlt }
  ];

  const team = [
    {
      name: "Alex Johnson",
      role: "Lead Developer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      bio: "Full-stack developer passionate about creating beautiful user experiences"
    },
    {
      name: "Sarah Chen",
      role: "UI/UX Designer",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      bio: "Creative designer focused on intuitive and aesthetic interfaces"
    },
    {
      name: "Mike Rodriguez",
      role: "Product Manager",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      bio: "Product strategist dedicated to user-centric solutions"
    }
  ];

  const technologies = [
    { name: "React", icon: FaCode, color: "text-blue-500" },
    { name: "Firebase", icon: FaRocket, color: "text-orange-500" },
    { name: "Tailwind CSS", icon: FaPaintBrush, color: "text-cyan-500" },
    { name: "Framer Motion", icon: FaMobile, color: "text-purple-500" }
  ];

  return (
    <div className={`min-h-screen ${getPageBackground()} transition-colors duration-300`}>
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
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

      {/* Navigation */}
      <nav className="relative z-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-b border-white/30 dark:border-gray-700/30">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <div className={`w-10 h-10 bg-gradient-to-br ${currentTheme.colors.primary} ${currentTheme.colors.secondary} rounded-xl flex items-center justify-center`}>
                <FaCamera className="text-white text-lg" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">Crystal Gallery</span>
            </Link>
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <Link
                  to={`/Gallery/${user?.displayName}`}
                  className={`px-4 py-2 bg-gradient-to-r ${currentTheme.colors.primary} ${currentTheme.colors.secondary} text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300`}
                >
                  My Gallery
                </Link>
              ) : (
                <Link
                  to="/Auth"
                  className={`px-4 py-2 bg-gradient-to-r ${currentTheme.colors.primary} ${currentTheme.colors.secondary} text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300`}
                >
                  Get Started
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="inline-flex items-center space-x-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-full border border-white/30 dark:border-gray-700/30 mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <FaStar className="text-yellow-500 text-sm" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Beautiful Image Galleries</span>
            </motion.div>

            <motion.h1 
              className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Where{' '}
              <span className={`bg-gradient-to-r ${currentTheme.colors.primary} ${currentTheme.colors.secondary} bg-clip-text text-transparent`}>
                Visual Stories
              </span>
              {' '}Come to Life
            </motion.h1>

            <motion.p 
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Crystal Gallery is a modern, beautiful platform for creating and sharing your visual collections. 
              With 20+ stunning color themes and seamless dark mode support, your galleries will look amazing in any setting.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {isAuthenticated ? (
                <Link
                  to={`/Gallery/${user?.displayName}`}
                  className={`group px-8 py-4 bg-gradient-to-r ${currentTheme.colors.primary} ${currentTheme.colors.secondary} text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300 flex items-center space-x-2`}
                >
                  <span>View My Gallery</span>
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              ) : (
                <Link
                  to="/Auth"
                  className={`group px-8 py-4 bg-gradient-to-r ${currentTheme.colors.primary} ${currentTheme.colors.secondary} text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300 flex items-center space-x-2`}
                >
                  <span>Start Creating</span>
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              )}
              <button className="group px-8 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:shadow-xl transition-all duration-300 flex items-center space-x-2">
                <FaPlay className="text-sm" />
                <span>Watch Demo</span>
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Crystal Gallery?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Experience the perfect blend of beauty, functionality, and performance
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/30 dark:border-gray-700/30 hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${currentTheme.colors.primary}/20 ${currentTheme.colors.secondary}/20 dark:${currentTheme.colors.primary}/30 dark:${currentTheme.colors.secondary}/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`text-2xl ${currentTheme.colors.primary.split('-')[1]}-500`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${currentTheme.colors.primary}/20 ${currentTheme.colors.secondary}/20 dark:${currentTheme.colors.primary}/30 dark:${currentTheme.colors.secondary}/30 rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <stat.icon className={`text-2xl ${currentTheme.colors.primary.split('-')[1]}-500`} />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-300">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative z-10 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              The passionate minds behind Crystal Gallery
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/30 dark:border-gray-700/30 hover:shadow-xl transition-all duration-300 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 ring-4 ring-white/30 dark:ring-gray-700/30">
                  <img 
                    src={member.avatar} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                  {member.name}
                </h3>
                <p className={`text-sm font-medium ${currentTheme.colors.primary.split('-')[1]}-500 mb-3`}>
                  {member.role}
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="relative z-10 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Built with Modern Technologies
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We use cutting-edge tools to deliver the best experience
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/30 dark:border-gray-700/30 hover:shadow-xl transition-all duration-300 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${currentTheme.colors.primary}/20 ${currentTheme.colors.secondary}/20 dark:${currentTheme.colors.primary}/30 dark:${currentTheme.colors.secondary}/30 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <tech.icon className={`text-2xl ${tech.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {tech.name}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div 
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-12 border border-white/30 dark:border-gray-700/30 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Create Your Gallery?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of users who are already sharing their visual stories with the world
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              {isAuthenticated ? (
                <Link
                  to={`/Gallery/${user?.displayName}`}
                  className={`group px-8 py-4 bg-gradient-to-r ${currentTheme.colors.primary} ${currentTheme.colors.secondary} text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300 flex items-center space-x-2`}
                >
                  <span>Go to My Gallery</span>
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              ) : (
                <Link
                  to="/Auth"
                  className={`group px-8 py-4 bg-gradient-to-r ${currentTheme.colors.primary} ${currentTheme.colors.secondary} text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300 flex items-center space-x-2`}
                >
                  <span>Get Started Free</span>
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              )}
              <Link
                to="/"
                className="group px-8 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
              >
                <span>Learn More</span>
                <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-t border-white/30 dark:border-gray-700/30">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className={`w-10 h-10 bg-gradient-to-br ${currentTheme.colors.primary} ${currentTheme.colors.secondary} rounded-xl flex items-center justify-center`}>
                  <FaCamera className="text-white text-lg" />
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-white">Crystal Gallery</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md">
                Create beautiful, shareable image galleries with our modern platform. 
                Perfect for photographers, artists, and anyone who loves visual storytelling.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300">
                  <FaGithub className="text-lg" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300">
                  <FaLinkedin className="text-lg" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300">
                  <FaTwitter className="text-lg" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300">
                  <FaEnvelope className="text-lg" />
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300">Features</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300">Pricing</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300">API</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300">Documentation</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300">About</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300">Blog</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300">Careers</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 mt-12 pt-8 text-center">
            <p className="text-gray-600 dark:text-gray-300">
              © 2024 Crystal Gallery. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
