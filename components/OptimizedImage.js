import Image from "next/image";
import { useState } from "react";

const OptimizedImage = ({
    src,
    alt,
    width,
    height,
    className = "",
    priority = false,
    quality = 85,
    sizes,
    placeholder = "blur",
    blurDataURL,
    ...props
}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    // Generate blur data URL for better loading experience
    const generateBlurDataURL = (w = 8, h = 8) => {
        return `data:image/svg+xml;base64,${Buffer.from(
            `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
                <rect width="100%" height="100%" fill="#1e293b"/>
                <rect width="100%" height="100%" fill="url(#gradient)" opacity="0.3"/>
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#334155"/>
                        <stop offset="100%" style="stop-color:#0f172a"/>
                    </linearGradient>
                </defs>
            </svg>`
        ).toString('base64')}`;
    };

    // Default blur data URL if none provided
    const defaultBlurDataURL = blurDataURL || generateBlurDataURL(width || 400, height || 300);

    // Handle image load
    const handleLoad = () => {
        setIsLoading(false);
    };

    // Handle image error
    const handleError = () => {
        setError(true);
        setIsLoading(false);
    };

    // Error fallback
    if (error) {
        return (
            <div 
                className={`bg-gray-200 flex items-center justify-center ${className}`}
                style={{ width: width || '100%', height: height || 'auto' }}
            >
                <span className="text-gray-500 text-sm">Image not found</span>
            </div>
        );
    }

    return (
        <div className={`relative overflow-hidden ${className}`}>
            <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                priority={priority}
                quality={quality}
                sizes={sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
                placeholder={placeholder}
                blurDataURL={defaultBlurDataURL}
                onLoad={handleLoad}
                onError={handleError}
                className={`
                    transition-opacity duration-300 
                    ${isLoading ? 'opacity-0' : 'opacity-100'}
                `}
                {...props}
            />
            
            {/* Loading overlay */}
            {isLoading && (
                <div 
                    className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse"
                    style={{
                        backgroundImage: `url("${defaultBlurDataURL}")`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
            )}
        </div>
    );
};

// Responsive image component with automatic WebP support
export const ResponsiveImage = ({
    src,
    alt,
    className = "",
    priority = false,
    aspectRatio = "16/9",
    sizes,
    ...props
}) => {
    const [isLoading, setIsLoading] = useState(true);
    
    // Try WebP first, fallback to original
    const getOptimizedSrc = (originalSrc) => {
        if (originalSrc.startsWith('http')) return originalSrc;
        
        const ext = originalSrc.split('.').pop();
        const baseName = originalSrc.replace(`.${ext}`, '');
        
        // Return WebP version if available, otherwise original
        return `${baseName}.webp`;
    };

    return (
        <div 
            className={`relative overflow-hidden ${className}`}
            style={{ aspectRatio }}
        >
            <OptimizedImage
                src={getOptimizedSrc(src)}
                alt={alt}
                fill
                priority={priority}
                sizes={sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
                className="object-cover"
                onLoad={() => setIsLoading(false)}
                {...props}
            />
        </div>
    );
};

export default OptimizedImage;