import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';

const NotFound = () => {
  return (
    <Container className="min-h-[80vh] flex flex-col items-center justify-center text-center pt-20">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)] mb-4">Error</p>
      <h1 className="text-8xl md:text-9xl font-extrabold text-[var(--line)] mb-4">404</h1>
      <h2 className="text-3xl md:text-4xl font-bold text-[var(--ink)] mb-4">Page not found</h2>
      <p className="text-lg text-[var(--muted)] max-w-md mx-auto mb-8">
        The page you are looking for might have been removed or is temporarily unavailable.
      </p>
      <Link to="/">
        <Button variant="accent" size="lg">
          Go back home
        </Button>
      </Link>
    </Container>
  );
};

export default NotFound;
