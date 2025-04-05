
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const navigate = useNavigate();
  const { authState } = useAuth();
  
  useEffect(() => {
    // Redirect to dashboard if authenticated, otherwise to login
    if (authState.isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  }, [authState.isAuthenticated, navigate]);
  
  // Render a loading state while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-scholar-primary to-scholar-secondary p-4">
      <div className="text-white text-center">
        <h1 className="text-3xl font-bold animate-pulse">Scholar Sync</h1>
        <p className="mt-2">Loading...</p>
      </div>
    </div>
  );
};

export default Index;
