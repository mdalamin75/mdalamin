// Custom hook for fetching real stats from testimonials and portfolio
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useFreelancerStats(useRealData = true) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [dataSource, setDataSource] = useState('demo');

  // Demo data - only used if useRealData is false
  const demoStats = {
    completedProjects: 47,
    averageRating: '4.9',
    totalReviews: 28,
    clientSatisfaction: '100%',
    uniqueClients: 25,
    fiveStarPercentage: '95%',
    memberSince: '2021-03-15'
  };

  useEffect(() => {
    if (!useRealData) {
      setStats(demoStats);
      setDataSource('demo');
      return;
    }

    const fetchStats = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get('/api/real-stats');
        
        if (response.data.success) {
          const realStats = response.data.data;
          
          setStats(realStats);
          setLastUpdated(response.data.lastUpdated);
          setDataSource(response.data.source);
          
          if (response.data.source === 'fallback') {
            setError('Using calculated data from your testimonials');
          }
        } else {
          console.warn('Stats calculation failed, using demo data:', response.data.error);
          setStats(demoStats);
          setDataSource('demo');
          setError('Stats calculation failed - using demo data');
        }
      } catch (err) {
        console.error('Error fetching real stats:', err);
        setStats(demoStats);
        setDataSource('demo');
        setError('Failed to fetch stats - using demo data');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [useRealData]);

  const calculateSatisfaction = (rating) => {
    if (!rating) return '100%';
    const percentage = Math.round((parseFloat(rating) / 5) * 100);
    return `${percentage}%`;
  };

  const refreshStats = async () => {
    if (!useRealData) return;
    
    setLoading(true);
    try {
      const response = await axios.get('/api/real-stats?refresh=true');
      if (response.data.success) {
        setStats(response.data.data);
        setLastUpdated(response.data.lastUpdated);
        setDataSource(response.data.source);
      }
    } catch (err) {
      console.error('Error refreshing stats:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    stats,
    loading,
    error,
    lastUpdated,
    refreshStats,
    dataSource,
    isRealData: useRealData && dataSource !== 'demo'
  };
}
