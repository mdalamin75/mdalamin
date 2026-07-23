// pages/admin/login.js
import React, { useState, useEffect } from 'react';
import { signIn, getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const SignIn = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();

  // Check if user is already fully authenticated on mount (skip login page)
  useEffect(() => {
    if (status === 'authenticated' && session?.user?.twoFactorVerified) {
      router.replace('/admin');
    }
  }, [status, session, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    const formData = new FormData(e.currentTarget);

    try {
      const result = await signIn('credentials', {
        email: formData.get('email'),
        password: formData.get('password'),
        redirect: false,
      });

      if (result.error) {
        setError(result.error);
        setIsLoading(false);
        return;
      }

      // Session cookie is set by signIn() above.
      // Redirect to 2fa-verify to complete the flow.
      // Using router.replace to avoid full page reload (which triggers webpack HMR issues)
      router.replace('/admin/2fa-verify');
    } catch (err) {
      console.error("Login error:", err);
      setError('An unexpected error occurred.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md p-8">
        <h1 className="text-2xl font-bold mb-6">Sign In</h1>

        {error && <div className="text-red-500 text-sm bg-red-50 p-3 rounded">{error}</div>}

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input name="email" type="email" required className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input name="password" type="password" required className="w-full p-2 border rounded" />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
};

export default SignIn;

