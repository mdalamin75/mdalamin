// pages/admin/login.js
import React, { useState } from 'react';
import { signIn, getSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const SignIn = () => {
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const result = await signIn('credentials', {
        email: formData.get('email'),
        password: formData.get('password'),
        redirect: false,
      });

      if (result.error) {
        setError(result.error);
      } else {
        const session = await getSession();
        console.log("Login success, session:", session);
        
        // Check if 2FA is already setup for this user
        if (session.user?.twoFactorEnabled) {
          // If 2FA is enabled but not verified for this session, redirect to verify
          router.push('/admin/2fa-verify');
        } else {
          // If 2FA is not set up yet, redirect to setup
          router.push('/admin/2fa-setup');
        }
      }
    } catch (err) {
      console.error("Login error:", err);
      setError('An unexpected error occurred.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md p-8">
        <h1 className="text-2xl font-bold mb-6">Sign In</h1>

        {error && <div className="text-red-500 text-sm">{error}</div>}

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input name="email" type="email" required className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input name="password" type="password" required className="w-full p-2 border rounded" />
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
