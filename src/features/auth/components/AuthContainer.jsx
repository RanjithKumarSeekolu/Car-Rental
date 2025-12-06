import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthContainer = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100 w-full max-w-md mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>
        <p className="text-gray-500 mt-2">
          {isLogin ? 'Sign in to list your car' : 'Join us to start hosting'}
        </p>
      </div>

      {isLogin ? <LoginForm /> : <RegisterForm />}

      <div className="mt-6 text-center text-sm text-gray-600">
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <button 
          onClick={() => setIsLogin(!isLogin)}
          className="text-indigo-600 font-semibold hover:underline"
        >
          {isLogin ? 'Register' : 'Sign In'}
        </button>
      </div>
    </div>
  );
};

export default AuthContainer;
