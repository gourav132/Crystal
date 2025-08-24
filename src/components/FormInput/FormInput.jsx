import React from 'react';
import { motion } from 'framer-motion';

const FormInput = ({ 
  label, 
  id, 
  type = "text", 
  placeholder, 
  register, 
  error, 
  icon: Icon,
  ...props 
}) => {
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="block text-xs font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
            <Icon className="h-3.5 w-3.5 text-gray-400 dark:text-gray-500" />
          </div>
        )}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          {...register}
          {...props}
          className={`
            block w-full px-2.5 py-2 border border-gray-300 dark:border-gray-600 rounded-md
            placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white text-xs
            focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
            transition-all duration-200 ease-in-out bg-white dark:bg-gray-800
            ${Icon ? 'pl-7' : ''}
            ${error ? 'border-red-300 dark:border-red-500 focus:ring-red-200 dark:focus:ring-red-500 focus:border-red-500' : ''}
            hover:border-gray-400 dark:hover:border-gray-500
          `}
        />
      </div>
      {error && (
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-red-600 dark:text-red-400 flex items-center gap-1"
        >
          <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </motion.p>
      )}
    </div>
  );
};

export default FormInput;
