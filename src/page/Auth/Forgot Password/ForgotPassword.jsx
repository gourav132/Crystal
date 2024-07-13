import React from 'react';
import { useForm } from 'react-hook-form';
import { SiAxios } from 'react-icons/si';
import { auth } from '../../../Firebase/config';

export default function ForgotPassword({ setMode }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // Handle the form submission
    try {
      const resp = auth.sendPasswordResetEmail(data.email);
      console.log(resp);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h3 className="text-2xl font-semibold text-center">Lost Your Way?</h3>
      <p className="font-semibold text-sm text-gray-600 mt-2 w-96 text-center">
        No worries! Enter your email and we'll help you recover access to your Crystal account.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 w-96">
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
            Email address
          </label>
          <input
            id="email"
            className={`border py-2 px-2 w-full rounded-md shadow-sm mt-1 text-sm focus:outline-none ${
              errors.email ? 'border-red-300' : 'focus:ring-2 focus:ring-secondary'
            }`}            type="email"
            placeholder="Enter your registered email address"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: 'Enter a valid email address',
              },
            })}
          />
          {errors.email && (
            <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
          )}
        </div>
        <button className="mt-4 w-96 bg-primary hover:bg-primary/90 py-2 px-6 rounded-md shadow-lg font-semibold text-white text-sm" type="submit">Recover your account</button>
        <p className="text-sm font-semibold text-gray-700 mt-4 text-center"> Suddenly remembered your password?{' '}<span onClick={() => setMode('login')} className="text-primary font-bold cursor-pointer">Login now</span>
        </p>
      </form>
    </div>
  );
}
