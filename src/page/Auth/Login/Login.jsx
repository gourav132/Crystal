import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { auth } from '../../../Firebase/config';
import { ThreeDots } from 'react-loader-spinner';

export default function Login({ setMode }) {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [ error, setError ] = useState();
  const [ load, setload ] = useState(false);

  const onSubmit = async (data) => {
    setload(true);
    try {
      const userCredential = await auth.signInWithEmailAndPassword(data.email, data.password);
      const user = userCredential.user;
    } catch (err) {
      if(err.code === "auth/invalid-credential") setError("Incorrect email or password");
      else setError("Error occured while logging you in");
    }
    setload(false);
  };

  return (
    <div>
      <h3 className="text-2xl font-semibold text-center">Welcome Back to Crystal!</h3>
      <p className="font-semibold text-sm text-gray-600 mt-2 w-96 text-center">
        Log in to manage and share your stunning photo gallery effortlessly.
      </p>
      <form className="mt-8 w-96" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
            Email address
          </label>
          <input
            id="email"
            {...register('email', { required: true })}
            className={`border py-2 px-2 w-96 rounded-md shadow-sm mt-1 text-sm focus:outline-none ${
              errors.email ? 'border-red-300' : 'focus:ring-2 focus:ring-secondary'
            }`}
            autoComplete="off"
            type="text"
            placeholder="Enter email"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">Email is required</p>}
        </div>

        <div className="mt-3">
          <label className="block text-sm font-semibold text-gray-700" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            {...register('password', { required: true })}
            className={`border py-2 px-2 w-96 rounded shadow-sm mt-1 text-sm focus:outline-none ${
              errors.password ? 'border-red-300' : 'focus:ring-2 focus:ring-secondary'
            }`}
            type="password"
            placeholder="Enter password"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">Password is required</p>}
        </div>
        <p
          onClick={() => setMode('FP')}
          className="text-sm font-semibold text-primary/80 mt-1 flex justify-end cursor-pointer"
        >
          Forgot password?
        </p>
        <p className='text-center mt-4 text-red-500 text-sm font-bold'>{error && error}</p>
        <button
          type="submit"
          className="mt-4 w-96 bg-primary hover:bg-primary/90 py-2 px-6 rounded-md shadow-lg flex items-center justify-center font-semibold text-white text-sm"
        >
          <ThreeDots
            visible={load}
            height="20"
            width="50"
            color="#ffffff"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
            />
          {!load && "Login" }
        </button>
        <p className="text-sm font-semibold text-gray-700 mt-4 text-center">
          Don't have an account?{' '}
          <button onClick={() => setMode('register')} className="text-primary font-bold">
            Create now
          </button>
        </p>
      </form>
    </div>
  );
}
