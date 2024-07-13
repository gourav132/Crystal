import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, database } from '../../Firebase/config';
import Loading from '../Loading/Loading';
import { Navbar } from '../../components';

export default function Login({ setMode }) {

  const [ user, loading, error ] = useAuthState(auth);
  const [ userData, setUserData ] = useState("");

  useEffect(() => {
    const getUserDetails = async () => {
      if(!loading && user) {
        try {
          const snapshot = await database.collection('users').doc(user.displayName).get();
          setUserData(snapshot.data());
        } catch (error) {
          console.log(error);
        }
      }
      }
    getUserDetails();
  }, [user, loading]);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      await database.collection('users').doc(user.displayName).update({
        title: data.title,
        description: data.description
      })
    } catch (error) {
      console.log("Error in profile setup -> ", error, error.code);
    }
  };

  return (
    <div>
    {loading ? 
    <Loading /> : <>
      <Navbar />
      <div className=' flex flex-col items-center justify-center mt-20'>
      <h1 className="text-2xl font-semibold">Hey! {userData.firstName} nice to meet you</h1>
      <p className="font-semibold text-sm text-gray-600 mt-2 w-96">
      Just fill out a few more details to setup your gallery
      </p>
      <form className="mt-8 w-96" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
            Gallery title
          </label>
          <input
            id="email"
            {...register('title', { required: true })}
            className={`border py-2 px-2 w-96 rounded-md shadow-sm mt-1 text-sm focus:outline-none ${
              errors.title ? 'border-red-300' : 'focus:ring-2 focus:ring-secondary'
            }`}
            autoComplete="off"
            type="text"
            // placeholder="Enter a catchy title for your gallery"
            value={userData && userData.title}
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">Title is required</p>}
        </div>

        <div className="mt-3">
          <label className="block text-sm font-semibold text-gray-700" htmlFor="desc">
            Description
          </label>
          <textarea
          rows={5}
            id="desc"
            {...register('description', { required: true })}
            className={`border py-2 px-2 w-96 rounded shadow-sm mt-1 text-sm focus:outline-none ${
              errors.description ? 'border-red-300' : 'focus:ring-2 focus:ring-secondary'
            }`}
            type="password"
            // placeholder="Write something related to your work or passion"
            value={ userData && userData.description}
          />
          {errors.dsecription && <p className="text-red-500 text-sm mt-1">Description is required</p>}
        </div>

        <button
          type="submit"
          className="mt-4 w-96 bg-primary hover:bg-primary/90 py-2 px-6 rounded-md shadow-lg font-semibold text-white text-sm"
        >
          Continue
        </button>
      </form>
    </div></> }
    </div>
  );
}
