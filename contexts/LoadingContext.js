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
  const [isLoading, setIsLoading] = useState(false);
  const [isRouteChanging, setIsRouteChanging] = useState(false);
  const [currentRoute, setCurrentRoute] = useState('');
  const [nextRoute, setNextRoute] = useState('');

  // No automatic loading management to prevent loops

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