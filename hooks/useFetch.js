// hooks/useFetch.js
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export const useFetch = (endpoint) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axios.get(`/api/${endpoint}`);
            setData(response.data);
            setError(null);
        } catch (error) {
            console.error(`Failed to fetch ${endpoint}:`, error);
            setError(error);
        } finally {
            setLoading(false);
        }
    }, [endpoint]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, refetch: fetchData };
};
