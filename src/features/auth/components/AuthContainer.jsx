import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthContainer = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700 w-full max-w-md mx-auto transition-colors duration-300">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          {isLogin ? 'Sign in to list your car' : 'Join us to start hosting'}
        </p>
      </div>

      {isLogin ? <LoginForm /> : <RegisterForm />}

      <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <button 
          onClick={() => setIsLogin(!isLogin)}
          className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
        >
          {isLogin ? 'Register' : 'Sign In'}
        </button>
      </div>
    </div>
  );
};

export default AuthContainer;
