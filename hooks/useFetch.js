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
        }
    }, [fetchData, initialData, setIsLoading]);

    // Effect to manage global loading state based on local loading state
    useEffect(() => {
        if (!loading) {
            // Add a small delay before hiding the preloader
            // This ensures smooth transitions
            const timer = setTimeout(() => {
                setIsLoading(false);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [loading, setIsLoading]);

    return { data, loading, error, refetch: fetchData };
}