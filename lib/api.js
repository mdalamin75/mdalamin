import axios from 'axios';

/**
 * Helper function to fetch data from the API
 * @param {string} endpoint - The API endpoint to fetch data from
 * @param {Object} params - Optional query parameters
 * @returns {Promise<any>} The API response data
 */
export async function fetchAPI(endpoint, params = {}) {
  try {
    // Determine if we're running on the server or client
    const baseUrl = typeof window === 'undefined' 
      ? process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
      : '';
    
    // Make the API request
    const response = await axios.get(`${baseUrl}/api/${endpoint}`, { params });
    
    // Return the data
    return response.data;
  } catch (error) {
    console.error(`Error fetching from /${endpoint}:`, error);
    return [];
  }
} 