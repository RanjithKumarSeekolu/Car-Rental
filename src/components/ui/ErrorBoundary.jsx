import React from 'react';
import { useRouteError, Link } from 'react-router-dom';
import Container from './Container';
import Button from './Button';

const ErrorBoundary = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <Container className="min-h-screen flex flex-col items-center justify-center text-center py-20">
      <div className="bg-red-50 p-6 rounded-full mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-red-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
      </div>
      
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Oops! Something went wrong.</h1>
      <p className="text-lg text-gray-600 max-w-md mx-auto mb-8">
        We encountered an unexpected error. Sorry for the inconvenience.
      </p>

      {error && (
        <div className="bg-gray-100 p-4 rounded-lg mb-8 max-w-2xl overflow-auto text-left w-full text-sm text-gray-700">
            <p className="font-mono">{error.statusText || error.message}</p>
        </div>
      )}

      <Link to="/">
        <Button variant="primary" size="lg">
            Back to Home
        </Button>
      </Link>
    </Container>
  );
};

export default ErrorBoundary;
