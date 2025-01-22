// hooks/useFetch.js
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export default function useFetch(endpoint, initialData = null) {
    const [data, setData] = useState(initialData);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(!initialData);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axios.get(`/api/${endpoint}`);
            setData(response.data);
        } catch (error) {
            setError(error);
            setData(initialData);
        } finally {
            setLoading(false);
        }
    }, [endpoint, initialData]);

    useEffect(() => {
        if (!initialData) fetchData();
    }, [fetchData, initialData]);

    return { data, loading, error, refetch: fetchData };
}