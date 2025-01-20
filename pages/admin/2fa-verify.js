// pages/admin/2fa-verify.js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { getSession } from 'next-auth/react';

const TwoFactorVerify = () => {
  const [token, setToken] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { data: session, update: updateSession } = useSession();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
  
    try {
      const response = await fetch('/api/auth/2fa-verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });
  
      const data = await response.json();
  
      if (response.ok && data.verified) {
        // Update session with new verification status
        await updateSession({
          ...session,
          user: {
            ...session?.user,
            twoFactorEnabled: true,
            twoFactorVerified: true
          }
        });
  
        // Wait for session update
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Force reload to admin page
        window.location.href = '/admin';
      } else {
        setError(data.message || 'Invalid verification code');
      }
    } catch (err) {
      console.error('Error during 2FA verification:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-md rounded-lg w-full max-w-md p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
        <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Two-Factor Authentication</h1>
            <p className="mt-2 text-sm text-gray-600">
              Please enter the verification code from your authenticator app
            </p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="token" className="block text-sm font-medium text-gray-700 mb-1">
              Verification Code
            </label>
            <input
              id="token"
              name="token"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              required
              maxLength="6"
              pattern="\d{6}"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter 6-digit code"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              isLoading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Verifying...' : 'Verify'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TwoFactorVerify;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/admin/login',
        permanent: false,
      },
    };
  }

  // Check if already verified
  if (session?.user?.twoFactorVerified) {
    return {
      redirect: {
        destination: '/admin',
        permanent: false,
      },
    };
  }

  return {
    props: {}
  };
}
