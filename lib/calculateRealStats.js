// Calculate real statistics from testimonials and portfolio data
export async function calculateRealStats() {
  try {
    // Import models directly instead of using fetch
    const Testimonial = (await import('../models/Testimonial.js')).default;
    const Portfolio = (await import('../models/Portfolio.js')).default;
    const mongooseConnect = (await import('./connectDB.js')).default;
    
    // Connect to database
    await mongooseConnect();
    
    // Fetch data directly from database
    const [testimonials, portfolio] = await Promise.all([
      Testimonial.find(),
      Portfolio.find()
    ]);

    // Filter published testimonials only (also include testimonials without status field)
    const publishedTestimonials = testimonials.filter(t => 
      t.status === 'publish' || !t.status || t.status === 'published'
    );
    
    // Debug logging (remove in production)
    console.log('Total testimonials:', testimonials.length);
    console.log('Published testimonials:', publishedTestimonials.length);
    console.log('Sample testimonial:', publishedTestimonials[0]);
    
    // Filter published portfolio items only
    const publishedPortfolio = portfolio.filter(p => p.status === 'publish');

    // Calculate statistics
    const stats = {
      // Total projects = portfolio items + testimonials (since some projects might only have testimonials)
      completedProjects: Math.max(publishedPortfolio.length, publishedTestimonials.length),
      
      // Average rating from testimonials
      averageRating: calculateAverageRating(publishedTestimonials),
      
      // Total client reviews
      totalReviews: publishedTestimonials.length,
      
      // Client satisfaction based on average rating
      clientSatisfaction: calculateSatisfactionPercentage(publishedTestimonials),
      
      // Unique clients (based on client names)
      uniqueClients: getUniqueClientsCount(publishedTestimonials),
      
      // Countries worked with
      countriesWorked: getUniqueCountries(publishedTestimonials),
      
      // Recent testimonials for display
      recentTestimonials: publishedTestimonials.slice(0, 3),
      
      // Calculate member since (earliest testimonial or portfolio date)
      memberSince: getEarliestDate(publishedTestimonials, publishedPortfolio),
      
      // 5-star reviews percentage
      fiveStarPercentage: getFiveStarPercentage(publishedTestimonials),
      
      // Portfolio categories
      portfolioCategories: getPortfolioCategories(publishedPortfolio)
    };

    return {
      success: true,
      data: stats,
      source: 'database',
      lastUpdated: new Date().toISOString()
    };

  } catch (error) {
    console.error('Error calculating real stats:', error);
    
    // Return fallback stats if calculation fails
    return {
      success: false,
      error: error.message,
      data: getFallbackStats(),
      source: 'fallback'
    };
  }
}

function calculateAverageRating(testimonials) {
  if (!testimonials || testimonials.length === 0) return '5.0';
  
  // Filter out testimonials without valid star ratings
  const validTestimonials = testimonials.filter(t => t.star && !isNaN(parseInt(t.star)));
  
  if (validTestimonials.length === 0) return '5.0';
  
  const totalStars = validTestimonials.reduce((sum, t) => sum + parseInt(t.star), 0);
  const average = totalStars / validTestimonials.length;
  return average.toFixed(1);
}

function calculateSatisfactionPercentage(testimonials) {
  if (!testimonials || testimonials.length === 0) return '100%';
  
  const averageRating = parseFloat(calculateAverageRating(testimonials));
  const percentage = Math.round((averageRating / 5) * 100);
  return `${percentage}%`;
}

function getUniqueClientsCount(testimonials) {
  if (!testimonials || testimonials.length === 0) return 0;
  
  const uniqueNames = new Set();
  testimonials.forEach(t => {
    if (t.clientname) {
      // Normalize client names (lowercase, trim)
      uniqueNames.add(t.clientname.toLowerCase().trim());
    }
  });
  
  return uniqueNames.size;
}

function getUniqueCountries(testimonials) {
  if (!testimonials || testimonials.length === 0) return [];
  
  const countries = new Set();
  testimonials.forEach(t => {
    if (t.nationality) {
      countries.add(t.nationality.trim());
    }
  });
  
  return Array.from(countries);
}

function getEarliestDate(testimonials, portfolio) {
  const dates = [];
  
  // Add testimonial dates
  testimonials.forEach(t => {
    if (t.date) {
      dates.push(new Date(t.date));
    }
    if (t.createdAt) {
      dates.push(new Date(t.createdAt));
    }
  });
  
  // Add portfolio dates
  portfolio.forEach(p => {
    if (p.createdAt) {
      dates.push(new Date(p.createdAt));
    }
  });
  
  if (dates.length === 0) {
    // Default to 2021 if no dates found
    return '2021-01-01';
  }
  
  const earliestDate = new Date(Math.min(...dates));
  return earliestDate.toISOString().split('T')[0];
}

function getFiveStarPercentage(testimonials) {
  if (!testimonials || testimonials.length === 0) return '100%';
  
  // Filter out testimonials without valid star ratings
  const validTestimonials = testimonials.filter(t => t.star && !isNaN(parseInt(t.star)));
  
  if (validTestimonials.length === 0) return '100%';
  
  const fiveStarCount = validTestimonials.filter(t => parseInt(t.star) === 5).length;
  const percentage = Math.round((fiveStarCount / validTestimonials.length) * 100);
  return `${percentage}%`;
}

function getPortfolioCategories(portfolio) {
  if (!portfolio || portfolio.length === 0) return [];
  
  const categories = new Set();
  portfolio.forEach(p => {
    if (p.projectcategory && Array.isArray(p.projectcategory)) {
      p.projectcategory.forEach(cat => categories.add(cat));
    }
  });
  
  return Array.from(categories);
}

function getFallbackStats() {
  return {
    completedProjects: 25,
    averageRating: '4.9',
    totalReviews: 15,
    clientSatisfaction: '98%',
    uniqueClients: 12,
    countriesWorked: ['USA', 'UK', 'Canada', 'Australia'],
    memberSince: '2021-01-01',
    fiveStarPercentage: '95%',
    portfolioCategories: ['Web Development', 'React', 'Next.js']
  };
}

// Calculate experience years from member since date
export function calculateExperienceYears(memberSince) {
  if (!memberSince) return 3;
  
  const startDate = new Date(memberSince);
  const now = new Date();
  const diffInYears = (now - startDate) / (1000 * 60 * 60 * 24 * 365.25);
  
  return Math.floor(diffInYears) || 1; // At least 1 year
}

// Format large numbers (e.g., 1500 -> 1.5K)
export function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}
