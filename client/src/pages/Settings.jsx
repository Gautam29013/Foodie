import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { User, Shield, CheckCircle, XCircle } from 'lucide-react';

const Settings = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  
  // 2FA state
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [show2FASetup, setShow2FASetup] = useState(false);
  const [qrCode, setQrCode] = useState('');
  const [twoFactorSecret, setTwoFactorSecret] = useState('');
  const [twoFactorToken, setTwoFactorToken] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Using interceptors or just withCredentials for cookies
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:5001/api',
    withCredentials: true,
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.get('/auth/me');
      setUser(res.data);
      setName(res.data.name);
      setEmail(res.data.email);
      setPhone(res.data.phone || '');
      setIs2FAEnabled(res.data.twoFactorEnabled || false);
      
      // Update local storage safely
      let userInfo = {};
      try {
        const stored = localStorage.getItem('userInfo');
        if (stored && stored !== 'undefined') {
          userInfo = JSON.parse(stored);
        }
      } catch (e) {
        console.error('Failed to parse userInfo', e);
      }
      localStorage.setItem('userInfo', JSON.stringify({ ...userInfo, ...res.data }));
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.put('/auth/me', { name, email, phone });
      toast.success('Profile updated successfully');
      setUser(res.data);
      
      // Safely update local storage
      let userInfo = {};
      try {
        const stored = localStorage.getItem('userInfo');
        if (stored && stored !== 'undefined') {
          userInfo = JSON.parse(stored);
        }
      } catch (e) {
        console.error('Failed to parse userInfo', e);
      }
      localStorage.setItem('userInfo', JSON.stringify({ ...userInfo, ...res.data }));
    } catch (error) {
      toast.error(error.response?.data?.message || 'Update failed');
    }
  };

  const generate2FA = async () => {
    try {
      const res = await axiosInstance.post('/auth/2fa/generate');
      setQrCode(res.data.qrCodeUrl);
      setTwoFactorSecret(res.data.secret);
      setShow2FASetup(true);
    } catch (error) {
      toast.error('Failed to generate 2FA');
    }
  };

  const verifyAndEnable2FA = async () => {
    if (!twoFactorToken) return toast.error('Enter the 6-digit code');
    try {
      await axiosInstance.post('/auth/2fa/verify', { token: twoFactorToken });
      toast.success('2FA Enabled Successfully!');
      setIs2FAEnabled(true);
      setShow2FASetup(false);
      setTwoFactorToken('');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid code');
    }
  };

  const disable2FA = async () => {
    try {
      await axiosInstance.post('/auth/2fa/disable');
      toast.success('2FA Disabled');
      setIs2FAEnabled(false);
      setShow2FASetup(false);
    } catch (error) {
      toast.error('Failed to disable 2FA');
    }
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Account Settings</h1>

      <div className="bg-white shadow rounded-lg mb-8 overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
            <User className="w-5 h-5 text-blue-500" /> Profile Information
          </h2>
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <button
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-green-500" /> Two-Factor Authentication (2FA)
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Add an extra layer of security to your account. Once enabled, you'll be prompted to enter a 6-digit code from your authenticator app during login.
          </p>

          {!is2FAEnabled ? (
            <div>
              {!show2FASetup ? (
                <button
                  onClick={generate2FA}
                  className="inline-flex justify-center rounded-md border border-transparent bg-gray-900 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-800"
                >
                  Set up 2FA
                </button>
              ) : (
                <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Scan QR Code</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Use Google Authenticator, Authy, or your preferred 2FA app to scan the QR code below.
                  </p>
                  <div className="mb-4 bg-white p-4 inline-block rounded border border-gray-200">
                    <img src={qrCode} alt="2FA QR Code" className="w-48 h-48" />
                  </div>
                  
                  <div className="max-w-xs">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Enter the 6-digit code</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        maxLength="6"
                        value={twoFactorToken}
                        onChange={(e) => setTwoFactorToken(e.target.value)}
                        className="block w-full rounded-md border border-gray-300 px-3 py-2 text-center text-lg tracking-widest focus:border-blue-500 focus:outline-none"
                        placeholder="000000"
                      />
                      <button
                        onClick={verifyAndEnable2FA}
                        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 font-medium"
                      >
                        Verify
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-between bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-500" />
                <div>
                  <h3 className="text-sm font-medium text-green-800">2FA is Enabled</h3>
                  <p className="text-xs text-green-600">Your account is secured with Two-Factor Authentication.</p>
                </div>
              </div>
              <button
                onClick={disable2FA}
                className="text-sm text-red-600 hover:text-red-700 font-medium px-3 py-1 bg-white border border-red-200 rounded hover:bg-red-50"
              >
                Disable 2FA
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
