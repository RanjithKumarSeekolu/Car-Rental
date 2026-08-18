import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContainer from '../features/auth/components/AuthContainer';
import useAuthStore from '../store/useAuthStore';

const Login = () => {
  const user = useAuthStore((s) => s.user);
  const profile = useAuthStore((s) => s.profile);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && profile) navigate('/dashboard', { replace: true });
  }, [user, profile, navigate]);

  return (
    <div className="min-h-screen pt-28 pb-16 flex items-center justify-center px-4">
      <AuthContainer />
    </div>
  );
};

export default Login;
