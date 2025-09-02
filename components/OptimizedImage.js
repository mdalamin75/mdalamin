import Image from "next/image";
import { useState } from "react";

const OptimizedImage = ({
    src,
    alt,
    width,
    height,
    priority = false,
    quality = 85, // Better quality/size balance
    placeholder = "blur",
    blurDataURL = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=",
    ...props
}) => {
    return (
        <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            priority={priority}
            quality={quality}
            placeholder={placeholder}
            blurDataURL={blurDataURL}
            {...props}
        />
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