import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { auth } from '../../../Firebase/config';
import { FiMail, FiArrowLeft } from 'react-icons/fi';
import AuthLayout from '../../../components/AuthLayout/AuthLayout';
import FormInput from '../../../components/FormInput/FormInput';
import Button from '../../../components/Button/Button';

export default function ForgotPassword({ setMode }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');
    setSuccess(false);
    
    try {
      await auth.sendPasswordResetEmail(data.email);
      setSuccess(true);
    } catch (err) {
      if (err.code === 'auth/user-not-found') {
        setError('No account found with this email address.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Please enter a valid email address.');
      } else if (err.code === 'auth/too-many-requests') {
        setError('Too many requests. Please try again later.');
      } else {
        setError('An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <AuthLayout
        title="Check your email"
        subtitle="We've sent you a password reset link"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-3"
        >
          {/* Success Icon */}
          <div className="mx-auto w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>

          {/* Success Message */}
          <div className="space-y-1.5">
            <h3 className="text-sm font-semibold text-gray-900">Reset link sent!</h3>
            <p className="text-xs text-gray-600">
              We've sent a password reset link to your email address. 
              Please check your inbox and follow the instructions to reset your password.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5">
            <Button
              type="button"
              variant="outline"
              onClick={() => setMode('login')}
              className="w-full"
            >
              <FiArrowLeft className="w-3.5 h-3.5 mr-1.5" />
              Back to sign in
            </Button>
            
            <p className="text-xs text-gray-500">
              Didn't receive the email? Check your spam folder or{' '}
              <button
                type="button"
                onClick={() => {
                  setSuccess(false);
                  setError('');
                }}
                className="text-primary hover:text-primary/80 font-medium"
              >
                try again
              </button>
            </p>
          </div>
        </motion.div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Reset your password"
      subtitle="Enter your email address and we'll send you a link to reset your password"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        {/* Email Input */}
        <FormInput
          label="Email address"
          id="email"
          type="email"
          placeholder="Enter your email address"
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
          Send reset link
        </Button>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-2 bg-white text-gray-500">Remember your password?</span>
          </div>
        </div>

        {/* Back to Login */}
        <Button
          type="button"
          variant="outline"
          onClick={() => setMode('login')}
          className="w-full"
        >
          <FiArrowLeft className="w-3.5 h-3.5 mr-1.5" />
          Back to sign in
        </Button>
      </form>
    </AuthLayout>
  );
}
