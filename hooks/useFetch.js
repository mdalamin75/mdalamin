import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useLoading } from "../contexts/LoadingContext";

export default function useFetch(endpoint, initialData = null) {
    const [data, setData] = useState(initialData);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const { setIsLoading } = useLoading();

    const fetchData = useCallback(async () => {
        try {
            // Set both local and global loading states
            setLoading(true);
            setIsLoading(true);
            
            // Fetch data
            const response = await axios.get(`/api/${endpoint}`);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError(error);
            setData(initialData);
        } finally {
            // Set local loading state to false
            setLoading(false);
            
            // We'll only control the global preloader for initial page load
            // but keep content visible even while preloader is showing
        }
    }, [endpoint, initialData, setIsLoading]);

    useEffect(() => {
        // For SSR data, we already have the data
        if (initialData) {
            setLoading(false);
            // Still show a short preloader for consistent UX
            setTimeout(() => {
                setIsLoading(false);
            }, 800);
        } else {
            // No initial data, so fetch from API
            fetchData();
            
            // Always ensure preloader disappears after a timeout
            // This prevents preloader from getting stuck
            const timer = setTimeout(() => {
                setIsLoading(false);
            }, 2000);
            
            return () => clearTimeout(timer);
        }
    }, [fetchData, initialData, setIsLoading]);

    return { data, loading, error, refetch: fetchData };
}