import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import { auth, database } from '../../../Firebase/config';
import { ThreeDots } from 'react-loader-spinner'
import Profile from '../../Profile Setup/Profile';


export default function Register({ setMode }) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [ error, setError ] = useState();
  const [load, setLoad ] = useState(false);


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
    setLoad(true);
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(data.email, data.password);
      const user = userCredential.user;
      const userId = await generateUniqueId();
      await user.updateProfile({
        displayName: userId,
      })
      await database.collection('users').doc(userId).set({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        Firebaseuid: user.uid,
        uniqueId: userId 
      })
      setLoad(false);
    }
    catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setError('The email address is already in use by another account.');
      } else {
        setError('An error occurred. Please try again.');
      }
      setLoad(false);
    }
  };

  return (
    <div>
      {/* <Profile /> */}
      <h3 className="text-2xl font-semibold text-center">Welcome to Crystal!</h3>
      <p className="font-semibold text-sm text-gray-600 w-96 mt-2 text-center">
        Create your account and start sharing your stunning photo gallery with the world.
      </p>
      <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex w-full gap-3">
          <div className="w-full">
            <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700">
              First Name
            </label>
            <input
              id="firstName"
              {...register('firstName', { required: true })}
              className={`border py-2 px-2 w-full rounded-md shadow-sm mt-1 text-sm focus:outline-none ${
                errors.firstName ? 'border-red-200' : 'focus:ring-2 focus:ring-secondary'
              }`}
              type="text"
              placeholder="Gourav"
            />
            {errors.firstName && <p className="text-red-400 text-sm mt-1">First Name is required</p>}
          </div>

          <div className="w-full">
            <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700">
              Last Name
            </label>
            <input
              id="lastName"
              {...register('lastName', { required: true })}
              className={`border py-2 px-2 w-full rounded shadow-sm mt-1 text-sm focus:outline-none ${
                errors.lastName ? 'border-red-200' : 'focus:ring-2 focus:ring-secondary'
              }`}
              type="text"
              placeholder="Chatterjee"
            />
            {errors.lastName && <p className="text-red-400 text-sm mt-1">Last Name is required</p>}
          </div>
        </div>

        <div className="mt-3">
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
            Email address
          </label>
          <input
            id="email"
            {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
            className={`border py-2 px-2 w-96 rounded-md shadow-sm mt-1 text-sm focus:outline-none ${
              errors.email ? 'border-red-200' : 'focus:ring-2 focus:ring-secondary'
            }`}
            type="text"
            placeholder="someone@gmail.com"
          />
          {errors.email && (
            <p className="text-red-400 text-sm mt-1">
              {errors.email.type === 'required' ? 'Email is required' : 'Invalid email format'}
            </p>
          )}
        </div>

        <div className="mt-3">
          <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
            Password
          </label>
          <input
            id="password"
            {...register('password', { required: true, minLength: 6 })}
            className={`border py-2 px-2 w-96 rounded shadow-sm mt-1 text-sm focus:outline-none ${
              errors.password ? 'border-red-200' : 'focus:ring-2 focus:ring-secondary'
            }`}
            type="password"
            placeholder="******"
          />
          {errors.password && (
            <p className="text-red-400 text-sm mt-1">
              {errors.password.type === 'required'
                ? 'Password is required'
                : 'Password must be at least 6 characters long'}
            </p>
          )}
        </div>
           {error &&  <p className='text-center mt-4 text-red-500 text-sm font-bold'> {error} </p> }
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
          {!load && "Register" }
        </button>
        <p className="text-sm font-semibold text-gray-700 mt-4 text-center">
          Already have an account?{' '}
          <span onClick={() => setMode('login')} className="text-primary cursor-pointer font-bold">
            Login
          </span>
        </p>
      </form>
    </div>
  );
}
