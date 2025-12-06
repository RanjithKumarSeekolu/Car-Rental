import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';

const NotFound = () => {
  return (
    <Container className="min-h-[80vh] flex flex-col items-center justify-center text-center">
      <h1 className="text-9xl font-extrabold text-indigo-100 mb-4">404</h1>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Page Not Found</h2>
      <p className="text-lg text-gray-600 max-w-md mx-auto mb-8">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      
      <Link to="/">
        <Button variant="primary" size="lg" className="shadow-lg hover:shadow-xl">
            Go Back Home
        </Button>
      </Link>
    </Container>
  );
};

export default NotFound;
