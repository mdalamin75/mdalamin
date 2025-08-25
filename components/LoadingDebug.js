import { useLoading } from "../contexts/LoadingContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const LoadingDebug = () => {
    const { isLoading, isRouteChanging } = useLoading();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Only show in development mode
    if (process.env.NODE_ENV !== 'development' || !mounted) {
        return null;
    }

    return (
        <div className="fixed top-4 right-4 bg-black/80 text-white p-2 rounded text-xs z-[10000] font-mono">
            <div>Route: {router.pathname}</div>
            <div>Loading: {isLoading ? '✅' : '❌'}</div>
            <div>Route Changing: {isRouteChanging ? '✅' : '❌'}</div>
            <div>Mounted: {mounted ? '✅' : '❌'}</div>
        </div>
    );
};

export default LoadingDebug;