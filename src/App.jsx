import React, { useEffect } from 'react';
import './App.css';
import { AppRouter } from './routes.config';
import { RouterProvider } from 'react-router-dom';
import useAuthStore from './store/useAuthStore';

function App() {
  const initializeAuth = useAuthStore((state) => state.initialize);

  useEffect(() => {
    const unsubscribe = initializeAuth();
    return () => unsubscribe && unsubscribe();
  }, [initializeAuth]);

  return <RouterProvider router={AppRouter} />;
}

export default App
