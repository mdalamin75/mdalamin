import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';

export default function Custom404() {
  const [mounted, setMounted] = useState(false);

  // Use useEffect to ensure animations only run client-side
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <SEO
        title="Page Not Found | MD. AL AMIN"
        description="Oops! The page you're looking for cannot be found."
        keywords="404, page not found, error page"
        ogImage="/images/og-image.jpg"
      />

      <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          {/* Purple gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/10 dark:to-indigo-900/10 opacity-70"></div>
          
          {/* Decorative shapes */}
          {mounted && (
            <>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 0.05, y: 0 }}
                transition={{ duration: 1 }}
                className="absolute top-1/4 right-[10%] w-64 h-64 rounded-full bg-gradient-to-br from-purple-500 to-purple-700"
              ></motion.div>
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 0.05, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="absolute bottom-1/4 left-[10%] w-40 h-40 rounded-full bg-gradient-to-tr from-purple-400 to-purple-600"
              ></motion.div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.05, scale: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-r from-purple-300 to-indigo-500"
              ></motion.div>
            </>
          )}
        </div>

        <div className="w-full max-w-3xl mx-auto text-center relative z-10">
          {mounted && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Error code with gradient text */}
              <h1 className="text-9xl font-bold font-josefin text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-300 mb-4">404</h1>
              
              {/* Message */}
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">Page Not Found</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-xl mx-auto">
                Oops! The page you are looking for doesn't exist or has been moved.
              </p>

              {/* SVG illustration */}
              <div className="w-full max-w-sm mx-auto mb-8">
                <motion.svg
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 500 240"
                  className="w-full"
                >
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    d="M220,80 Q270,20 320,80 T420,80"
                    fill="none"
                    stroke="#9333ea"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                  <motion.circle
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1.8 }}
                    cx="250"
                    cy="140"
                    r="40"
                    fill="#a855f7"
                  />
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
                    d="M100,120 Q150,170 200,120 T300,120"
                    fill="none"
                    stroke="#9333ea"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </motion.svg>
              </div>

              {/* Go back home button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.8 }}
              >
                <Link 
                  href="/" 
                  className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  Back to Homepage
                </Link>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
} 