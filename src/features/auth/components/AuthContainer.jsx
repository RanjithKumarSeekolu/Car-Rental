import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const COPY = {
  default: {
    loginTitle: 'Welcome back',
    loginSubtitle: 'Sign in to book or list your car',
    registerTitle: 'Create account',
    registerSubtitle: 'Join RentNHost to start hosting',
  },
  host: {
    loginTitle: 'Sign in to list your car',
    loginSubtitle: 'You need an account before you can host.',
    registerTitle: 'Create a host account',
    registerSubtitle: 'Register to list your car and set your own rate.',
  },
};

const AuthContainer = ({ intent = 'default' }) => {
  const [isLogin, setIsLogin] = useState(true);
  const copy = COPY[intent] || COPY.default;

  return (
    <div className={`bg-[var(--surface)] p-8 rounded-[var(--radius)] shadow-[var(--shadow)] border border-[var(--line)] w-full max-w-md ${intent === 'host' ? '' : 'mx-auto'}`}>
      <div className="text-center mb-6">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)] mb-2">
          {isLogin ? 'Sign in' : 'Join'}
        </p>
        <h2 className="text-2xl font-bold text-[var(--ink)]">
          {isLogin ? copy.loginTitle : copy.registerTitle}
        </h2>
        <p className="text-[var(--muted)] mt-2">
          {isLogin ? copy.loginSubtitle : copy.registerSubtitle}
        </p>
      </div>

      {isLogin ? <LoginForm /> : <RegisterForm />}

      <div className="mt-6 text-center text-sm text-[var(--muted)]">
        {isLogin ? "Don't have an account? " : 'Already have an account? '}
        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="text-[var(--accent)] font-semibold hover:underline"
        >
          {isLogin ? 'Register' : 'Sign in'}
        </button>
      </div>
    </div>
  );
};

export default AuthContainer;
