import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useLoading } from './LoadingContext';

// Create context
const FetchContext = createContext();

// Data cache - making it persistent
const dataCache = {};

export const FetchProvider = ({ children }) => {
  const { setIsLoading } = useLoading();
  const [activeRequests, setActiveRequests] = useState({});
  
  // Clear expired cache entries periodically (disabled in development)
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      const interval = setInterval(() => {
        const now = Date.now();
        let expired = 0;
        
        Object.keys(dataCache).forEach(key => {
          if (now - dataCache[key].timestamp > 600000) { // 10 minutes expiration
            delete dataCache[key];
            expired++;
          }
        });
      }, 30000);
      
      return () => clearInterval(interval);
    }
  }, []);

  // Pre-load common data when FetchProvider mounts (disabled in development)
  useEffect(() => {
    // Only prefetch in production to avoid development issues
    if (process.env.NODE_ENV === 'production') {
      const prefetchData = async () => {
        try {
          const criticalEndpoints = ['home', 'service', 'portfolio', 'testimonial'];
          
          for (const endpoint of criticalEndpoints) {
            if (!dataCache[endpoint]) {
              try {
                await fetchData(endpoint, { showLoading: false });
              } catch (err) {
                // Continue with other prefetches even if one fails
              }
            }
          }
          
          // Trigger animations after all critical data is loaded
          setTimeout(() => {
            if (typeof window !== 'undefined' && window.AOS) {
              window.AOS.refresh();
            }
          }, 200);
        } catch (err) {
          // Silently continue
        }
      };
      
      // Start pre-fetching
      prefetchData();
    }
  }, []);

  // Fetch data from API with caching and deduplication
  const fetchData = useCallback(async (endpoint, options = {}) => {
    const {
      forceRefresh = false,
      useCache = true,
      initialData = null,
      showLoading = true,
      timeout = 8000
    } = options;
    
    const cacheKey = endpoint;
    
    // If showLoading is true, update global loading state
    if (showLoading) {
      setIsLoading(true);
    }
    
    try {
      // Check if we have initial data and return it immediately
      if (initialData && Array.isArray(initialData) && initialData.length > 0) {
        // Still store it in cache
        if (!dataCache[cacheKey] || forceRefresh) {
          dataCache[cacheKey] = {
            data: initialData,
            timestamp: Date.now()
          };
        }
        
        if (showLoading) {
          setIsLoading(false);
        }
        
        // We'll still fetch in the background to update the cache
        if (!forceRefresh) {
          setTimeout(() => {
            fetchData(endpoint, { 
              forceRefresh: true, 
              showLoading: false,
              initialData: null
            });
          }, 500);
        }
        
        return initialData;
      }
      
      // Check cache first if we're not forcing a refresh
      if (useCache && !forceRefresh && dataCache[cacheKey]) {
        const cachedData = dataCache[cacheKey];
        const age = Date.now() - cachedData.timestamp;
        
        // Use cache if it's less than 1 minute old
        if (age < 60000) {
          if (showLoading) {
            setIsLoading(false);
          }
          
          return cachedData.data;
        }
      }
      
      // Check if there's already an active request for this endpoint
      if (activeRequests[cacheKey]) {
        try {
          // Set up a timeout for the in-flight request
          const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => reject(new Error(`Request for ${endpoint} timed out`)), timeout);
          });
          
          // Race between the actual request and the timeout
          const result = await Promise.race([
            activeRequests[cacheKey],
            timeoutPromise
          ]);
          
          if (showLoading) {
            setIsLoading(false);
          }
          
          return result;
        } catch (error) {
          // If we timeout or the in-flight request fails, remove it from active requests
          // so we can try again
          setActiveRequests(prev => {
            const newRequests = { ...prev };
            delete newRequests[cacheKey];
            return newRequests;
          });
          
          // Try again with a fresh request
          throw error;
        }
      }
      
      // Start a new request
      // Create a promise for this request
      const requestPromise = new Promise(async (resolve, reject) => {
        try {
          // Add cache-busting timestamp
          const timestamp = Date.now();
          const url = `/api/${endpoint}?_t=${timestamp}`;
          
          // Set up a timeout for the fetch
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), timeout);
          
          try {
            const response = await fetch(url, {
              headers: {
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
              },
              signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            
            if (!response.ok) {
              throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
            }
            
            // Parse JSON response
            const data = await response.json();
            
            // Validate data
            if (!data) {
              throw new Error(`No data returned from ${endpoint}`);
            }
            
            // Store in cache
            dataCache[cacheKey] = {
              data,
              timestamp: Date.now()
            };
            
            // Resolve the promise with the data
            resolve(data);
            
            // Trigger animations after data is loaded
            setTimeout(() => {
              if (typeof window !== 'undefined' && window.AOS) {
                window.AOS.refresh();
              }
            }, 100);
            
          } catch (fetchError) {
            clearTimeout(timeoutId);
            throw fetchError;
          }
        } catch (error) {
          // Check if we have valid cached data even if it's older
          if (dataCache[cacheKey]) {
            resolve(dataCache[cacheKey].data);
            return;
          }
          
          // If we have initialData, use it as fallback
          if (initialData !== null) {
            resolve(initialData);
          } else {
            reject(error);
          }
        } finally {
          // Clean up active request
          setTimeout(() => {
            setActiveRequests(prev => {
              const newRequests = { ...prev };
              delete newRequests[cacheKey];
              return newRequests;
            });
          }, 500);
          
          if (showLoading) {
            setIsLoading(false);
          }
        }
      });
      
      // Store the promise in active requests
      setActiveRequests(prev => ({
        ...prev,
        [cacheKey]: requestPromise
      }));
      
      // Wait for the request to complete
      return await requestPromise;
    } catch (error) {
      // Make sure loading is turned off regardless of errors
      if (showLoading) {
        setIsLoading(false);
      }
      
      // Return initial data as fallback if available
      if (initialData !== null) {
        return initialData;
      }
      
      // Return empty array as last resort to prevent UI errors
      return [];
    }
  }, [setIsLoading]);

  // Method to check if there's any data in the cache
  const hasCachedData = useCallback((endpoint) => {
    return !!dataCache[endpoint];
  }, []);

  return (
    <FetchContext.Provider 
      value={{ 
        fetchData, 
        hasCachedData,
      }}
    >
      {children}
    </FetchContext.Provider>
  );
};

export const useFetch = () => {
  const context = useContext(FetchContext);
  if (!context) {
    throw new Error('useFetch must be used within a FetchProvider');
  }
  return context;
};

export default FetchContext; 