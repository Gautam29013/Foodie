import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setIsLoading(true);
      const res = await axios.post('http://localhost:5001/api/auth/google', {
        credential: credentialResponse.credential,
      });
      
      // Store user info
      localStorage.setItem('userInfo', JSON.stringify(res.data));
      
      toast.success('Successfully logged in!');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to authenticate with Google');
      console.error('Google Auth Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleError = () => {
    toast.error('Google Sign In was unsuccessful. Try again later.');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-background px-4 py-12">
      <div className="max-w-md w-full space-y-8 bg-card p-8 rounded-2xl shadow-xl border border-border">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
            <span className="text-white font-bold text-3xl">F</span>
          </div>
          <h2 className="text-3xl font-extrabold text-foreground tracking-tight">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Sign in to your Foodie account to continue
          </p>
        </div>
        
        <div className="mt-8 space-y-6">
          <div className="flex flex-col items-center justify-center space-y-4">
            {isLoading ? (
              <div className="flex justify-center items-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="w-full flex justify-center scale-105 transform transition hover:scale-110">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  theme="outline"
                  size="large"
                  text="continue_with"
                  shape="rectangular"
                  width="100%"
                />
              </div>
            )}
          </div>
          
          <div className="relative mt-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-700" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-card text-gray-500">Secure Authentication</span>
            </div>
          </div>
          
          <div className="mt-6 flex items-center justify-center text-center">
            <span className="text-xs text-gray-500">
              By signing in, you agree to our{' '}
              <Link to="/terms" className="text-primary hover:underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
