import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../contexts/AuthContext";
import { database } from "../../Firebase/config";
import Loading from "../Loading/Loading";
import { Navbar, PulseLoader } from "../../components";
import { motion } from "framer-motion";
import { useTheme } from "../../contexts/ThemeContext";
import { 
  FaUser, 
  FaCamera, 
  FaEdit, 
  FaSave, 
  FaCheck, 
  FaPalette, 
  FaMoon, 
  FaSun, 
  FaUserEdit,
  FaCog,
  FaEye,
  FaEyeSlash
} from "react-icons/fa";

export default function Profile({ setMode }) {
  const { user, loading } = useAuth();
  const [userData, setUserData] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState("gallery");
  const [showPassword, setShowPassword] = useState(false);
  const [themeSearchTerm, setThemeSearchTerm] = useState("");
  
  const { darkMode, toggleDarkMode, selectedTheme, changeTheme, colorThemes, getPageBackground, getCardBackground, getBorderColor, getGradientText, getAccentGradient } = useTheme();

  useEffect(() => {
    const getUserDetails = async () => {
      if (!loading && user) {
        try {
          const snapshot = await database
            .collection("users")
            .doc(user.displayName)
            .get();
          const data = snapshot.data();
          setUserData(data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    getUserDetails();
  }, [user, loading]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Filter out undefined values and provide defaults
      const updateData = {
        title: data.title || "",
        description: data.description || "",
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        email: data.email || user?.email || ""
      };

      // Only update fields that have values
      const filteredData = Object.fromEntries(
        Object.entries(updateData).filter(([_, value]) => value !== undefined && value !== null)
      );

      await database.collection("users").doc(user.displayName).update(filteredData);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 2000);
    } catch (error) {
      console.log("Error in profile setup -> ", error, error.code);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleThemeChange = (theme) => {
    changeTheme(theme);
  };

  return (
    <div className={`min-h-screen ${getPageBackground()} transition-colors duration-300`}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Navbar />
          <div className="pt-16 pb-8">
            <div className="max-w-4xl mx-auto px-6">
              {/* Dashboard Header */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-8"
              >
                                 <div className="relative inline-block mb-4">
                   <div className={`w-16 h-16 bg-gradient-to-br ${colorThemes[selectedTheme]?.colors.primary} ${colorThemes[selectedTheme]?.colors.secondary} rounded-2xl flex items-center justify-center shadow-lg`}>
                     <FaUser className="text-white text-xl" />
                   </div>
                   <div className={`absolute -bottom-1 -right-1 w-5 h-5 bg-${colorThemes[selectedTheme]?.colors.primary.split('-')[1]}-500 rounded-full flex items-center justify-center`}>
                     <FaCog className="text-white text-xs" />
                   </div>
                 </div>
                 <h1 className="text-xl font-medium text-gray-900 dark:text-white mb-1">
                   Settings Dashboard
                 </h1>
                 <p className="text-sm text-gray-500 dark:text-gray-400">
                   Manage your profile, appearance, and preferences
                 </p>
              </motion.div>

              {/* Dashboard Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Sidebar Navigation */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="lg:col-span-1"
                >
                                     <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/20 p-4">
                     <nav className="space-y-2">
                       {[
                         { id: "gallery", label: "Gallery Settings", icon: FaCamera },
                         { id: "personal", label: "Personal Data", icon: FaUserEdit },
                         { id: "appearance", label: "Appearance", icon: FaPalette },
                         { id: "preferences", label: "Preferences", icon: FaCog }
                       ].map((tab) => (
                         <motion.button
                           key={tab.id}
                           onClick={() => setActiveTab(tab.id)}
                           className={`w-full flex items-center space-x-3 px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 ${
                             activeTab === tab.id
                               ? `bg-gradient-to-r ${colorThemes[selectedTheme]?.colors.primary} ${colorThemes[selectedTheme]?.colors.secondary} text-white shadow-md`
                               : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
                           }`}
                           whileHover={{ scale: 1.02 }}
                           whileTap={{ scale: 0.98 }}
                         >
                           <tab.icon className="text-sm" />
                           <span>{tab.label}</span>
                         </motion.button>
                       ))}
                     </nav>
                   </div>
                </motion.div>

                {/* Main Content Area */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="lg:col-span-3"
                >
                                     <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/20 p-6">
                    {/* Gallery Settings Tab */}
                    {activeTab === "gallery" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                      >
                                                 <div className="mb-4">
                           <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Gallery Settings</h2>
                           <p className="text-sm text-gray-500 dark:text-gray-400">Customize your gallery's appearance</p>
                         </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                          <div>
                                                         <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                               Gallery Title *
                             </label>
                                                           <input
                                {...register("title", { 
                                  required: "Gallery title is required",
                                  minLength: { value: 2, message: "Title must be at least 2 characters" }
                                })}
                                className={`w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-${colorThemes[selectedTheme]?.colors.primary.split('-')[1]}-500/20 focus:border-${colorThemes[selectedTheme]?.colors.primary.split('-')[1]}-500 transition-all duration-200 bg-white/50 dark:bg-gray-700/50 dark:text-white ${
                                  errors.title ? "border-red-300 focus:ring-red-500/20 focus:border-red-500" : ""
                                }`}
                                placeholder="Enter gallery title"
                                defaultValue={userData?.title || ""}
                              />
                              {errors.title && (
                                <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
                              )}
                          </div>

                          <div>
                                                         <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                               Gallery Description *
                             </label>
                                                           <textarea
                                rows={3}
                                {...register("description", { 
                                  required: "Gallery description is required",
                                  minLength: { value: 10, message: "Description must be at least 10 characters" }
                                })}
                                className={`w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-${colorThemes[selectedTheme]?.colors.primary.split('-')[1]}-500/20 focus:border-${colorThemes[selectedTheme]?.colors.primary.split('-')[1]}-500 transition-all duration-200 bg-white/50 dark:bg-gray-700/50 dark:text-white resize-none ${
                                  errors.description ? "border-red-300 focus:ring-red-500/20 focus:border-red-500" : ""
                                }`}
                                placeholder="Brief description of your gallery"
                                defaultValue={userData?.description || ""}
                              />
                              {errors.description && (
                                <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
                              )}
                          </div>
                        </form>
                      </motion.div>
                    )}

                    {/* Personal Data Tab */}
                    {activeTab === "personal" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                      >
                                                 <div className="mb-4">
                           <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Personal Information</h2>
                           <p className="text-sm text-gray-500 dark:text-gray-400">Update your personal details</p>
                         </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                                             <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                                 First Name *
                               </label>
                                                               <input
                                  {...register("firstName", { 
                                    required: "First name is required",
                                    minLength: { value: 2, message: "First name must be at least 2 characters" }
                                  })}
                                  className={`w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-${colorThemes[selectedTheme]?.colors.primary.split('-')[1]}-500/20 focus:border-${colorThemes[selectedTheme]?.colors.primary.split('-')[1]}-500 transition-all duration-200 bg-white/50 dark:bg-gray-700/50 dark:text-white ${
                                    errors.firstName ? "border-red-300 focus:ring-red-500/20 focus:border-red-500" : ""
                                  }`}
                                  placeholder="First name"
                                  defaultValue={userData?.firstName || ""}
                                />
                                {errors.firstName && (
                                  <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>
                                )}
                            </div>
                            <div>
                                                             <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                                 Last Name *
                               </label>
                                                               <input
                                  {...register("lastName", { 
                                    required: "Last name is required",
                                    minLength: { value: 2, message: "Last name must be at least 2 characters" }
                                  })}
                                  className={`w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-${colorThemes[selectedTheme]?.colors.primary.split('-')[1]}-500/20 focus:border-${colorThemes[selectedTheme]?.colors.primary.split('-')[1]}-500 transition-all duration-200 bg-white/50 dark:bg-gray-700/50 dark:text-white ${
                                    errors.lastName ? "border-red-300 focus:ring-red-500/20 focus:border-red-500" : ""
                                  }`}
                                  placeholder="Last name"
                                  defaultValue={userData?.lastName || ""}
                                />
                                {errors.lastName && (
                                  <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>
                                )}
                            </div>
                          </div>

                          <div>
                                                         <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                               Email Address *
                             </label>
                                                           <input
                                {...register("email", { 
                                  required: "Email is required",
                                  pattern: { 
                                    value: /^\S+@\S+$/i, 
                                    message: "Please enter a valid email address" 
                                  }
                                })}
                                type="email"
                                className={`w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-${colorThemes[selectedTheme]?.colors.primary.split('-')[1]}-500/20 focus:border-${colorThemes[selectedTheme]?.colors.primary.split('-')[1]}-500 transition-all duration-200 bg-white/50 dark:bg-gray-700/50 dark:text-white ${
                                  errors.email ? "border-red-300 focus:ring-red-500/20 focus:border-red-500" : ""
                                }`}
                                placeholder="your@email.com"
                                defaultValue={userData?.email || user?.email || ""}
                              />
                              {errors.email && (
                                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                              )}
                          </div>
                        </form>
                      </motion.div>
                    )}

                    {/* Appearance Tab */}
                    {activeTab === "appearance" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                      >
                                                 <div className="mb-4">
                           <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Appearance Settings</h2>
                           <p className="text-sm text-gray-500 dark:text-gray-400">Customize your visual experience</p>
                         </div>

                                                 {/* Dark Mode Toggle */}
                         <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                           <div className="flex items-center space-x-3">
                             {darkMode ? <FaMoon className="text-gray-600 dark:text-gray-400" /> : <FaSun className="text-gray-600 dark:text-gray-400" />}
                             <div>
                               <h3 className="text-sm font-medium text-gray-900 dark:text-white">Dark Mode</h3>
                               <p className="text-xs text-gray-500 dark:text-gray-400">Switch between light and dark themes</p>
                             </div>
                           </div>
                          <motion.button
                            onClick={toggleDarkMode}
                                                         className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
                               darkMode ? `bg-${colorThemes[selectedTheme]?.colors.primary.split('-')[1]}-600` : "bg-gray-300"
                             }`}
                            whileTap={{ scale: 0.95 }}
                          >
                            <motion.div
                              className="w-5 h-5 bg-white rounded-full shadow-md"
                              animate={{ x: darkMode ? 24 : 2 }}
                              transition={{ duration: 0.2 }}
                            />
                          </motion.button>
                        </div>

                                                {/* Color Theme Selection */}
                        <div>
                          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Color Theme</h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">Choose from 20 beautiful color themes to personalize your experience</p>
                          
                          {/* Theme Preview */}
                          <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                            <h4 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-3">Theme Preview</h4>
                            <div className="flex items-center space-x-4">
                              <div className={`px-3 py-2 bg-gradient-to-r ${colorThemes[selectedTheme]?.colors.primary} ${colorThemes[selectedTheme]?.colors.secondary} text-white text-xs font-medium rounded-lg`}>
                                Button
                              </div>
                              <div className={`w-8 h-8 bg-gradient-to-r ${colorThemes[selectedTheme]?.colors.primary} ${colorThemes[selectedTheme]?.colors.secondary} rounded-lg flex items-center justify-center`}>
                                <span className="text-white text-xs font-bold">C</span>
                              </div>
                              <div className={`w-3 h-3 bg-gradient-to-r ${colorThemes[selectedTheme]?.colors.primary} ${colorThemes[selectedTheme]?.colors.secondary} rounded-full`}></div>
                              <span className="text-xs text-gray-600 dark:text-gray-400">
                                Current: {colorThemes[selectedTheme]?.label}
                              </span>
                            </div>
                          </div>
                          
                          {/* Theme Search */}
                          <div className="mb-4">
                            <input
                              type="text"
                              placeholder="Search themes..."
                              value={themeSearchTerm}
                              className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-white/50 dark:bg-gray-700/50 dark:text-white"
                              onChange={(e) => setThemeSearchTerm(e.target.value)}
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                            {Object.values(colorThemes)
                              .filter(theme => 
                                theme.label.toLowerCase().includes(themeSearchTerm.toLowerCase())
                              )
                              .map((theme) => (
                                <motion.button
                                  key={theme.name}
                                  onClick={() => handleThemeChange(theme.name)}
                                  className={`relative p-3 rounded-xl border-2 transition-all duration-200 ${
                                    selectedTheme === theme.name
                                      ? `border-${colorThemes[selectedTheme]?.colors.primary.split('-')[1]}-500 bg-${colorThemes[selectedTheme]?.colors.primary.split('-')[1]}-50 dark:bg-${colorThemes[selectedTheme]?.colors.primary.split('-')[1]}-900/20 shadow-md`
                                      : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 hover:shadow-sm"
                                  }`}
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  <div className={`w-full h-8 bg-gradient-to-r ${theme.colors.primary} ${theme.colors.secondary} rounded-lg mb-2 shadow-sm`}></div>
                                  <p className="text-xs font-medium text-gray-700 dark:text-gray-300">{theme.label}</p>
                                  {selectedTheme === theme.name && (
                                    <div className="absolute top-2 right-2">
                                      <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                                        <FaCheck className="text-white text-xs" />
                                      </div>
                                    </div>
                                  )}
                                </motion.button>
                              ))}
                            
                            {/* No themes found message */}
                            {Object.values(colorThemes).filter(theme => 
                              theme.label.toLowerCase().includes(themeSearchTerm.toLowerCase())
                            ).length === 0 && themeSearchTerm && (
                              <div className="col-span-full text-center py-8">
                                <p className="text-gray-500 dark:text-gray-400 text-sm">
                                  No themes found matching "{themeSearchTerm}"
                                </p>
                                <button
                                  onClick={() => setThemeSearchTerm("")}
                                  className="mt-2 text-blue-500 hover:text-blue-600 text-xs underline"
                                >
                                  Clear search
                                </button>
                              </div>
                            )}
                          </div>
                          
                          {/* Theme Actions */}
                          <div className="mt-4 flex justify-between items-center">
                            <button
                              onClick={() => changeTheme('teal')}
                              className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 underline"
                            >
                              Reset to Default
                            </button>
                            <span className="text-xs text-gray-400 dark:text-gray-500">
                              {Object.values(colorThemes).filter(theme => 
                                theme.label.toLowerCase().includes(themeSearchTerm.toLowerCase())
                              ).length} of {Object.keys(colorThemes).length} themes
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Preferences Tab */}
                    {activeTab === "preferences" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                      >
                                                 <div className="mb-4">
                           <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Preferences</h2>
                           <p className="text-sm text-gray-500 dark:text-gray-400">Manage your account preferences</p>
                         </div>

                        <div className="space-y-4">
                                                     <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                                                           <div>
                                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Email Notifications</h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Receive updates about your gallery</p>
                              </div>
                             <div className={`w-12 h-6 bg-${colorThemes[selectedTheme]?.colors.primary.split('-')[1]}-600 rounded-full relative`}>
                               <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                             </div>
                          </div>

                                                     <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                                                           <div>
                                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Public Profile</h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Allow others to view your gallery</p>
                              </div>
                             <div className={`w-12 h-6 bg-${colorThemes[selectedTheme]?.colors.primary.split('-')[1]}-600 rounded-full relative`}>
                               <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                             </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Save Button */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                                             className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700"
                    >
                      <motion.button
                        onClick={handleSubmit(onSubmit)}
                        disabled={isSubmitting}
                                                 className={`w-full flex items-center justify-center space-x-2 px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 ${
                           isSubmitting || isSuccess
                             ? "bg-green-600 text-white cursor-not-allowed"
                             : `bg-gradient-to-r ${colorThemes[selectedTheme]?.colors.primary} ${colorThemes[selectedTheme]?.colors.secondary} text-white hover:shadow-lg`
                         }`}
                        whileHover={!isSubmitting && !isSuccess ? { scale: 1.02 } : {}}
                        whileTap={!isSubmitting && !isSuccess ? { scale: 0.98 } : {}}
                      >
                        {isSubmitting ? (
                          <>
                            <PulseLoader size="sm" variant="default" />
                            <span>Saving Changes...</span>
                          </>
                        ) : isSuccess ? (
                          <>
                            <FaCheck className="text-xs" />
                            <span>Changes Saved!</span>
                          </>
                        ) : (
                          <>
                            <FaSave className="text-xs" />
                            <span>Save All Changes</span>
                          </>
                        )}
                      </motion.button>
                    </motion.div>

                    {/* Success Message */}
                    {isSuccess && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                                                 className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-xl"
                      >
                                                 <p className="text-green-700 dark:text-green-400 text-sm text-center">
                           All settings have been updated successfully!
                         </p>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
