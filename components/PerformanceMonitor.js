import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

const PerformanceMonitor = ({ enabled = process.env.NODE_ENV === 'development' }) => {
    const router = useRouter();
    const metricsRef = useRef({});
    const observerRef = useRef(null);

    useEffect(() => {
        if (!enabled || typeof window === 'undefined') return;

        // Web Vitals monitoring
        const reportWebVitals = (metric) => {
            metricsRef.current[metric.name] = metric.value;
            
            // Log performance metrics in development
            if (process.env.NODE_ENV === 'development') {
                console.group(`🚀 Performance Metric: ${metric.name}`);
                console.log(`Value: ${metric.value.toFixed(2)}${metric.name.includes('CLS') ? '' : 'ms'}`);
                console.log(`Rating: ${getMetricRating(metric.name, metric.value)}`);
                console.groupEnd();
            }
        };

        // Import and setup web-vitals
        const setupWebVitals = async () => {
            try {
                const { getCLS, getFID, getFCP, getLCP, getTTFB } = await import('web-vitals');
                
                getCLS(reportWebVitals);
                getFID(reportWebVitals);
                getFCP(reportWebVitals);
                getLCP(reportWebVitals);
                getTTFB(reportWebVitals);
            } catch (error) {
                if (process.env.NODE_ENV === 'development') {
                    console.log('Web Vitals not available. Install with: npm install --save-dev web-vitals');
                }
            }
        };

        setupWebVitals();

        // Performance Observer for additional metrics
        if ('PerformanceObserver' in window) {
            observerRef.current = new PerformanceObserver((list) => {
                list.getEntries().forEach((entry) => {
                    if (entry.entryType === 'navigation') {
                        reportNavigationMetrics(entry);
                    } else if (entry.entryType === 'resource') {
                        reportResourceMetrics(entry);
                    }
                });
            });

            try {
                observerRef.current.observe({ 
                    entryTypes: ['navigation', 'resource', 'paint', 'largest-contentful-paint'] 
                });
            } catch (error) {
                console.warn('Performance Observer setup failed:', error);
            }
        }

        // Route change performance monitoring
        const handleRouteChangeStart = (url) => {
            metricsRef.current.routeChangeStart = performance.now();
        };

        const handleRouteChangeComplete = (url) => {
            const routeChangeEnd = performance.now();
            const routeChangeTime = routeChangeEnd - (metricsRef.current.routeChangeStart || 0);
            
            if (process.env.NODE_ENV === 'development') {
                console.log(`🔄 Route Change Performance: ${url}`);
                console.log(`Time: ${routeChangeTime.toFixed(2)}ms`);
            }
        };

        router.events.on('routeChangeStart', handleRouteChangeStart);
        router.events.on('routeChangeComplete', handleRouteChangeComplete);

        // Cleanup
        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
            router.events.off('routeChangeStart', handleRouteChangeStart);
            router.events.off('routeChangeComplete', handleRouteChangeComplete);
        };
    }, [enabled, router]);

    // Report navigation metrics
    const reportNavigationMetrics = (entry) => {
        const metrics = {
            'DNS Lookup': entry.domainLookupEnd - entry.domainLookupStart,
            'TCP Connection': entry.connectEnd - entry.connectStart,
            'TLS Setup': entry.connectEnd - entry.secureConnectionStart,
            'Request': entry.responseStart - entry.requestStart,
            'Response': entry.responseEnd - entry.responseStart,
            'DOM Processing': entry.domComplete - entry.responseEnd,
            'Load Complete': entry.loadEventEnd - entry.loadEventStart,
        };

        if (process.env.NODE_ENV === 'development') {
            console.group('🌐 Navigation Metrics');
            Object.entries(metrics).forEach(([key, value]) => {
                if (value > 0) {
                    console.log(`${key}: ${value.toFixed(2)}ms`);
                }
            });
            console.groupEnd();
        }
    };

    // Report resource metrics
    const reportResourceMetrics = (entry) => {
        // Only report large resources or slow loading resources
        if (entry.transferSize > 100000 || entry.duration > 1000) { // 100KB or 1s
            if (process.env.NODE_ENV === 'development') {
                console.warn(`🐌 Slow Resource: ${entry.name}`);
                console.log(`Size: ${(entry.transferSize / 1024).toFixed(2)}KB`);
                console.log(`Duration: ${entry.duration.toFixed(2)}ms`);
            }
        }
    };

    // Get metric rating
    const getMetricRating = (name, value) => {
        const thresholds = {
            'CLS': { good: 0.1, poor: 0.25 },
            'FID': { good: 100, poor: 300 },
            'FCP': { good: 1800, poor: 3000 },
            'LCP': { good: 2500, poor: 4000 },
            'TTFB': { good: 800, poor: 1800 },
        };

        const threshold = thresholds[name];
        if (!threshold) return 'unknown';

        if (value <= threshold.good) return '✅ Good';
        if (value <= threshold.poor) return '⚠️ Needs Improvement';
        return '❌ Poor';
    };

    // Performance summary (only in development)
    useEffect(() => {
        if (!enabled || process.env.NODE_ENV !== 'development') return;

        const logPerformanceSummary = () => {
            const metrics = metricsRef.current;
            if (Object.keys(metrics).length === 0) return;

            console.group('📊 Performance Summary');
            console.table(metrics);
            console.groupEnd();
        };

        // Log summary after 5 seconds
        const timer = setTimeout(logPerformanceSummary, 5000);
        return () => clearTimeout(timer);
    }, [enabled, router.pathname]);

    return null; // This component doesn't render anything
};

export default PerformanceMonitor;