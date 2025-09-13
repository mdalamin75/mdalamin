import { useEffect } from 'react';

const PerformanceMonitor = () => {
  useEffect(() => {
    // Monitor Core Web Vitals
    if (typeof window !== 'undefined' && 'performance' in window) {
      // Monitor LCP (Largest Contentful Paint)
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'largest-contentful-paint') {
            console.log('LCP:', entry.startTime);
          }
        }
      });
      
      observer.observe({ entryTypes: ['largest-contentful-paint'] });

      // Monitor CLS (Cumulative Layout Shift)
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'layout-shift' && !entry.hadRecentInput) {
            console.log('CLS:', entry.value);
          }
        }
      });
      
      clsObserver.observe({ entryTypes: ['layout-shift'] });

      // Monitor FID (First Input Delay)
      const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'first-input') {
            console.log('FID:', entry.processingStart - entry.startTime);
          }
        }
      });
      
      fidObserver.observe({ entryTypes: ['first-input'] });

      return () => {
        observer.disconnect();
        clsObserver.disconnect();
        fidObserver.disconnect();
      };
    }
  }, []);

  return null; // This component doesn't render anything
};

export default PerformanceMonitor;
