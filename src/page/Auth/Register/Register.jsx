import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth, database } from '../../../Firebase/config';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import AuthLayout from '../../../components/AuthLayout/AuthLayout';
import FormInput from '../../../components/FormInput/FormInput';
import Button from '../../../components/Button/Button';

export default function Register({ setMode }) {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const password = watch('password');

  // Function to generate a unique 5-digit ID
  const generateUniqueId = async () => {
    let id;
    let exists = true;

    while (exists) {
      id = Math.floor(10000 + Math.random() * 90000).toString();
      const doc = await database.collection('users').doc(id).get();
      if (!doc.exists) {
        exists = false;
      }
    }

    return id;
  };

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');
    
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(data.email, data.password);
      const user = userCredential.user;
      const userId = await generateUniqueId();
      
      await user.updateProfile({
        displayName: userId,
      });
      
      await database.collection('users').doc(userId).set({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        Firebaseuid: user.uid,
        uniqueId: userId,
        createdAt: new Date().toISOString()
      });
      
      // Redirect to the intended page or user's gallery
      const from = location.state?.from?.pathname || `/Gallery/${userId}`;
      navigate(from, { replace: true });
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setError('An account with this email already exists. Please sign in instead.');
      } else if (err.code === 'auth/weak-password') {
        setError('Password should be at least 6 characters long.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Please enter a valid email address.');
      } else {
        setError('An error occurred while creating your account. Please try again.');
      }
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Join Crystal"
      subtitle="Create your account and start sharing your stunning photo gallery"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        {/* Name Fields */}
        <div className="grid grid-cols-2 gap-2.5">
          <FormInput
            label="First name"
            id="firstName"
            type="text"
            placeholder="John"
            register={register('firstName', { 
              required: 'First name is required',
              minLength: {
                value: 2,
                message: 'First name must be at least 2 characters'
              }
            })}
            error={errors.firstName?.message}
            icon={FiUser}
          />
          
          <FormInput
            label="Last name"
            id="lastName"
            type="text"
            placeholder="Doe"
            register={register('lastName', { 
              required: 'Last name is required',
              minLength: {
                value: 2,
                message: 'Last name must be at least 2 characters'
              }
            })}
            error={errors.lastName?.message}
            icon={FiUser}
          />
        </div>

        {/* Email Input */}
        <FormInput
          label="Email address"
          id="email"
          type="email"
          placeholder="john@example.com"
          register={register('email', { 
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Please enter a valid email address'
            }
          })}
          error={errors.email?.message}
          icon={FiMail}
        />

        {/* Password Input */}
        <div className="space-y-1">
          <label htmlFor="password" className="block text-xs font-medium text-gray-700">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
              <FiLock className="h-3.5 w-3.5 text-gray-400" />
            </div>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a strong password"
              {...register('password', { 
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters'
                }
              })}
              className={`
                block w-full pl-7 pr-8 py-2 border border-gray-300 rounded-md
                placeholder-gray-400 text-gray-900 text-xs
                focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
                transition-all duration-200 ease-in-out
                ${errors.password ? 'border-red-300 focus:ring-red-200 focus:border-red-500' : ''}
                hover:border-gray-400
              `}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <FiEyeOff className="h-3.5 w-3.5" /> : <FiEye className="h-3.5 w-3.5" />}
            </button>
          </div>
          {errors.password && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-red-600 flex items-center gap-1"
            >
              <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.password.message}
            </motion.p>
          )}
        </div>

        {/* Confirm Password Input */}
        <div className="space-y-1">
          <label htmlFor="confirmPassword" className="block text-xs font-medium text-gray-700">
            Confirm password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
              <FiLock className="h-3.5 w-3.5 text-gray-400" />
            </div>
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              {...register('confirmPassword', { 
                required: 'Please confirm your password',
                validate: value => value === password || 'Passwords do not match'
              })}
              className={`
                block w-full pl-7 pr-8 py-2 border border-gray-300 rounded-md
                placeholder-gray-400 text-gray-900 text-xs
                focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
                transition-all duration-200 ease-in-out
                ${errors.confirmPassword ? 'border-red-300 focus:ring-red-200 focus:border-red-500' : ''}
                hover:border-gray-400
              `}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <FiEyeOff className="h-3.5 w-3.5" /> : <FiEye className="h-3.5 w-3.5" />}
            </button>
          </div>
          {errors.confirmPassword && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-red-600 flex items-center gap-1"
            >
              <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.confirmPassword.message}
            </motion.p>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 rounded-md p-2.5"
          >
            <div className="flex">
              <svg className="w-3.5 h-3.5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div className="ml-1.5">
                <p className="text-xs text-red-800">{error}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          loading={loading}
          className="w-full"
          size="lg"
        >
          Create your account
        </Button>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-2 bg-white text-gray-500">Already have an account?</span>
          </div>
        </div>

        {/* Sign In Link */}
        <Button
          type="button"
          variant="outline"
          onClick={() => setMode('login')}
          className="w-full"
        >
          Sign in to your account
        </Button>
      </form>
    </AuthLayout>
  );
}
