import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { useLoading } from "../contexts/LoadingContext";

export default function useFetch(endpoint, initialData = null) {
    const [data, setData] = useState(initialData);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const { setIsLoading } = useLoading();
    const abortControllerRef = useRef(null);
    const lastFetchTimeRef = useRef(0);
    const cacheTimeout = 30000; // 30 seconds cache
    const isMountedRef = useRef(true);

    const fetchData = useCallback(async () => {
        try {
            // Check if we have recent data and avoid unnecessary fetches
            const now = Date.now();
            if (data && (now - lastFetchTimeRef.current) < cacheTimeout) {
                setLoading(false);
                return;
            }

            // Cancel previous request if still pending
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }

            // Create new abort controller
            abortControllerRef.current = new AbortController();

            // Set both local and global loading states
            setLoading(true);
            setIsLoading(true);

            // Fetch data with timeout
            const response = await axios.get(`/api/${endpoint}`, {
                signal: abortControllerRef.current.signal,
                timeout: 5000 // 5 second timeout
            });

            // Only update state if component is still mounted
            if (isMountedRef.current) {
                setData(response.data);
                lastFetchTimeRef.current = now;
            }
        } catch (error) {
            // Handle different types of errors
            if (error.name === 'AbortError' || error.code === 'ERR_CANCELED') {
                // Request was cancelled, don't show error
                return;
            }

            if (isMountedRef.current) {
                console.error('Error fetching data:', error);
                setError(error);
                setData(initialData);
            }
        } finally {
            // Only update loading state if component is still mounted
            if (isMountedRef.current) {
                setLoading(false);
            }
        }
    }, [endpoint, initialData, setIsLoading, data, cacheTimeout]);

    useEffect(() => {
        // For SSR data, we already have the data
        if (initialData) {
            setLoading(false);
            // Still show a short preloader for consistent UX
            setTimeout(() => {
                if (isMountedRef.current) {
                    setIsLoading(false);
                }
            }, 300); // Reduced from 800ms
        } else {
            // No initial data, so fetch from API
            fetchData();
        }

        // Cleanup function
        return () => {
            isMountedRef.current = false;
            if (abortControllerRef.current) {
                try {
                    abortControllerRef.current.abort();
                } catch (e) {
                    // Ignore abort errors during cleanup
                }
            }
        };
    }, [fetchData, initialData, setIsLoading]);

    // Effect to manage global loading state based on local loading state
    useEffect(() => {
        if (!loading) {
            // Add a small delay before hiding the preloader
            // This ensures smooth transitions
            const timer = setTimeout(() => {
                if (isMountedRef.current) {
                    setIsLoading(false);
                }
            }, 150); // Reduced from 300ms
            return () => clearTimeout(timer);
        }
    }, [loading, setIsLoading]);

    return { data, loading, error, refetch: fetchData };
}