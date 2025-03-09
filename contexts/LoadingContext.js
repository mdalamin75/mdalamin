'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const LoadingContext = createContext({
  isLoading: true,
  setIsLoading: () => {},
  isRouteChanging: false,
  setIsRouteChanging: () => {},
  currentRoute: '',
  nextRoute: '',
  setNextRoute: () => {}
});

export function LoadingProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isRouteChanging, setIsRouteChanging] = useState(false);
  const [currentRoute, setCurrentRoute] = useState('');
  const [nextRoute, setNextRoute] = useState('');

  // Ensure initial loading for minimum time
  useEffect(() => {
    // Force loading state to true on initial load
    setIsLoading(true);
    
    // Minimum loading time of 800ms
    const initialLoadingTimer = setTimeout(() => {
      if (!isRouteChanging) {
        setIsLoading(false);
      }
    }, 800);
    
    return () => clearTimeout(initialLoadingTimer);
  }, []);

  // Apply body styles directly when loading state changes
  // But DO NOT hide content - only control the preloader
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const documentBody = document.body;
      const htmlElement = document.documentElement;
      
      if (isLoading || isRouteChanging) {
        // Just prevent scrolling during preloader
        documentBody.style.overflow = 'hidden';
        htmlElement.style.overflow = 'hidden';
      } else {
        // Immediately restore scrolling when loading is done
        documentBody.style.overflow = '';
        htmlElement.style.overflow = '';
      }
    }
  }, [isLoading, isRouteChanging]);
  
  // Auto-reset loading state if it gets stuck (safety mechanism)
  useEffect(() => {
    if (isLoading) {
      // If loading state is stuck for more than 5 seconds, force reset it
      const safetyTimer = setTimeout(() => {
        setIsLoading(false);
        setIsRouteChanging(false);
      }, 5000);
      
      return () => clearTimeout(safetyTimer);
    }
  }, [isLoading]);

  return (
    <LoadingContext.Provider 
      value={{ 
        isLoading, 
        setIsLoading, 
        isRouteChanging, 
        setIsRouteChanging,
        currentRoute,
        nextRoute,
        setNextRoute
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  return useContext(LoadingContext);
} 