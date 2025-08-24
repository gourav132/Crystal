import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../../../Firebase/config';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import AuthLayout from '../../../components/AuthLayout/AuthLayout';
import FormInput from '../../../components/FormInput/FormInput';
import Button from '../../../components/Button/Button';

export default function Login({ setMode }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');
    
    try {
      await auth.signInWithEmailAndPassword(data.email, data.password);
      // Redirect to the intended page or user's gallery
      const from = location.state?.from?.pathname || `/Gallery/${auth.currentUser?.displayName}`;
      navigate(from, { replace: true });
    } catch (err) {
      if (err.code === "auth/invalid-credential") {
        setError("Incorrect email or password");
      } else if (err.code === "auth/user-not-found") {
        setError("No account found with this email address");
      } else if (err.code === "auth/too-many-requests") {
        setError("Too many failed attempts. Please try again later");
      } else {
        setError("An error occurred while signing you in");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to your Crystal account to continue"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        {/* Email Input */}
        <FormInput
          label="Email address"
          id="email"
          type="email"
          placeholder="Enter your email"
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
          <label htmlFor="password" className="block text-xs font-medium text-gray-700 dark:text-gray-300">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
              <FiLock className="h-3.5 w-3.5 text-gray-400 dark:text-gray-500" />
            </div>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              {...register('password', { required: 'Password is required' })}
              className={`
                block w-full pl-7 pr-8 py-2 border border-gray-300 dark:border-gray-600 rounded-md
                placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white text-xs
                focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
                transition-all duration-200 ease-in-out bg-white dark:bg-gray-800
                ${errors.password ? 'border-red-300 dark:border-red-500 focus:ring-red-200 dark:focus:ring-red-500 focus:border-red-500' : ''}
                hover:border-gray-400 dark:hover:border-gray-500
              `}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
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

        {/* Forgot Password Link */}
        <div className="flex items-center justify-end">
          <button
            type="button"
            onClick={() => setMode('FP')}
            className="text-xs font-medium text-primary hover:text-primary/80 transition-colors duration-200"
          >
            Forgot your password?
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-md p-2.5"
          >
            <div className="flex">
              <svg className="w-3.5 h-3.5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div className="ml-1.5">
                <p className="text-xs text-red-800 dark:text-red-200">{error}</p>
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
          Sign in to Crystal
        </Button>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-600" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">New to Crystal?</span>
          </div>
        </div>

        {/* Sign Up Link */}
        <Button
          type="button"
          variant="outline"
          onClick={() => setMode('register')}
          className="w-full"
        >
          Create your account
        </Button>
      </form>
    </AuthLayout>
  );
}
