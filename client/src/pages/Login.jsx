import React, { useState, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Utensils, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // 2FA state
  const [requires2FA, setRequires2FA] = useState(false);
  const [twoFactorToken, setTwoFactorToken] = useState('');
  const [tempUserId, setTempUserId] = useState('');

  useEffect(() => {
    // Set the body background to match the login page theme for overscroll (rubber-banding on Mac)
    document.body.style.backgroundColor = '#0b0f19';
    return () => {
      // Revert to original background (defined in index.css variables) when leaving the page
      document.body.style.backgroundColor = '';
    };
  }, []);

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setIsLoading(true);
      const res = await axios.post('http://localhost:5001/api/auth/google', {
        credential: credentialResponse.credential,
      });
      
      if (res.data.requires2FA) {
        setTempUserId(res.data.tempUserId);
        setRequires2FA(true);
        toast('Google Authenticated. Please enter 2FA code.', { icon: '🔐' });
        return;
      }
      
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

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await axios.post('http://localhost:5001/api/auth/login', { email, password });
      
      if (res.data.requires2FA) {
        setTempUserId(res.data.tempUserId);
        setRequires2FA(true);
        toast('Credentials accepted. Please enter 2FA code.', { icon: '🔐' });
        return;
      }

      localStorage.setItem('userInfo', JSON.stringify(res.data));
      toast.success('Successfully logged in!');
      
      if (res.data.role === 'ADMIN') {
        window.location.href = 'http://localhost:5174/';
      } else {
        navigate('/');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handle2FASubmit = async (e) => {
    e.preventDefault();
    if (!twoFactorToken) return toast.error('Enter 2FA code');
    
    try {
      setIsLoading(true);
      const res = await axios.post('http://localhost:5001/api/auth/login/2fa', { 
        userId: tempUserId, 
        token: twoFactorToken 
      });
      
      localStorage.setItem('userInfo', JSON.stringify(res.data));
      toast.success('Successfully logged in!');
      
      if (res.data.role === 'ADMIN') {
        window.location.href = 'http://localhost:5174/';
      } else {
        navigate('/');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid 2FA code');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[100vh] flex flex-col items-center justify-center bg-[#0b0f19] px-4 font-sans relative overflow-hidden flex-grow w-full">
      
      {/* Background ambient light effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-[420px] bg-[#131b2f] p-8 sm:p-10 rounded-3xl border border-slate-800/50 shadow-2xl relative z-10">
        
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 bg-blue-500 rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(59,130,246,0.4)] relative">
            <div className="absolute inset-0 bg-white/20 rounded-2xl" />
            {requires2FA ? (
              <ShieldCheck className="text-white w-7 h-7 relative z-10" strokeWidth={2.5} />
            ) : (
              <Utensils className="text-white w-7 h-7 relative z-10" strokeWidth={2.5} />
            )}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            {requires2FA ? 'Two-Factor Auth' : 'Welcome back'}
          </h2>
          <p className="text-slate-400 text-sm">
            {requires2FA ? 'Enter the code from your authenticator app' : 'Sign in to Foodie'}
          </p>
        </div>

        {requires2FA ? (
          <form onSubmit={handle2FASubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-300">6-Digit Code</label>
              <input
                type="text"
                maxLength="6"
                value={twoFactorToken}
                onChange={(e) => setTwoFactorToken(e.target.value)}
                placeholder="000000"
                className="w-full bg-[#1c253b] border border-slate-700/50 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 text-center tracking-[0.5em] text-lg font-mono"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-xl transition-all duration-200 shadow-[0_4px_14px_0_rgba(59,130,246,0.39)] hover:shadow-[0_6px_20px_rgba(59,130,246,0.23)] active:scale-[0.98] mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Verifying...' : 'Verify & Sign In'}
            </button>
            <button
              type="button"
              onClick={() => {
                setRequires2FA(false);
                setTwoFactorToken('');
              }}
              className="w-full text-slate-400 text-sm hover:text-white transition-colors mt-4"
            >
              Cancel and go back
            </button>
          </form>
        ) : (
          <>
            <form onSubmit={handleSignIn} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-300">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-[#1c253b] border border-slate-700/50 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-300">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-[#1c253b] border border-slate-700/50 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 tracking-widest"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300 focus:outline-none transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-xl transition-all duration-200 shadow-[0_4px_14px_0_rgba(59,130,246,0.39)] hover:shadow-[0_6px_20px_rgba(59,130,246,0.23)] active:scale-[0.98] mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </form>

            <div className="mt-8 relative flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-700/50"></div>
              </div>
              <span className="relative bg-[#131b2f] px-4 text-xs text-slate-400">
                Or continue with
              </span>
            </div>

            <div className="mt-8">
              {isLoading ? (
                <div className="flex justify-center items-center py-3 bg-white rounded-xl">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
                </div>
              ) : (
                <div className="relative w-full overflow-hidden rounded-xl h-[46px] group">
                  <button className="absolute inset-0 w-full h-full bg-white hover:bg-gray-50 flex items-center justify-center gap-3 text-gray-900 font-medium transition-colors border border-gray-200">
                    <FcGoogle className="w-5 h-5" />
                    Google
                  </button>
                  <div className="absolute inset-0 opacity-0 cursor-pointer">
                    <GoogleLogin
                      onSuccess={handleGoogleSuccess}
                      onError={handleGoogleError}
                      width="400"
                      useOneTap={false}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8 text-center text-sm text-slate-400">
              Don't have an account?{' '}
              <Link to="/signup" className="text-blue-500 font-medium hover:text-blue-400 transition-colors">
                Sign up
              </Link>
            </div>

            <div className="mt-8 text-center">
              <Link to="/" className="text-xs text-slate-500 hover:text-slate-400 transition-colors flex items-center justify-center gap-1">
                <span role="img" aria-label="eyes">👀</span> Browse as guest &rarr;
              </Link>
            </div>
          </>
        )}
      </div>
      
      {/* Brand mark bottom left corner as in screenshot */}
      <div className="absolute bottom-6 left-6 w-8 h-8 bg-black/40 rounded-full flex items-center justify-center border border-white/10 backdrop-blur-sm z-10">
        <span className="text-white text-xs font-bold">N</span>
      </div>
    </div>
  );
};

export default Login;
