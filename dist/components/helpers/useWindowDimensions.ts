import { useState, useEffect } from 'react';

export default function useWindowDimensions() {

    const hasWindow = typeof window !== 'undefined';

    function getWindowDimensions() {
        const innerWidth = hasWindow ? window.innerWidth : null;
        const innerHeight = hasWindow ? window.innerHeight : null;
        return {
            innerWidth,
            innerHeight,
        };
    }

    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        if (hasWindow) {
            const handleResize = () => {
                setWindowDimensions(getWindowDimensions());
            };

            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
        return
    }, [hasWindow]);

    return windowDimensions;
}
