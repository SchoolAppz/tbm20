import { useState, useRef, useEffect } from 'react';

export const useSmoothScroll = () => {
    const [scrollY, setScrollY] = useState(0);
    const lastTimestamp = useRef(0);
    const targetScrollY = useRef(0);
    const isAnimating = useRef(false);
    const velocity = 0.08; // Slightly slower for smoother effect
    const lastTouchY = useRef(0);

    const scrollHandler = (e) => {
        e.preventDefault();
        targetScrollY.current = Math.max(
            0,
            Math.min(
                targetScrollY.current + e.deltaY,
                document.documentElement.scrollHeight - window.innerHeight
            )
        );
        
        if (!isAnimating.current) {
            isAnimating.current = true;
            requestAnimationFrame(animateScroll);
        }
    };

    const handleTouchStart = (e) => {
        lastTouchY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
        const deltaY = lastTouchY.current - e.touches[0].clientY;
        lastTouchY.current = e.touches[0].clientY;
        
        targetScrollY.current = Math.max(
            0,
            Math.min(
                targetScrollY.current + deltaY,
                document.documentElement.scrollHeight - window.innerHeight
            )
        );
        
        if (!isAnimating.current) {
            isAnimating.current = true;
            requestAnimationFrame(animateScroll);
        }
    };

    const animateScroll = (timestamp) => {
        const progress = timestamp - lastTimestamp.current;
        if (Math.abs(scrollY - targetScrollY.current) > 0.5) {
            setScrollY(prev => {
                const newScroll = prev + (targetScrollY.current - prev) * velocity;
                window.scrollTo(0, newScroll);
                return newScroll;
            });
            lastTimestamp.current = timestamp;
            requestAnimationFrame(animateScroll);
        } else {
            isAnimating.current = false;
        }
    };

    useEffect(() => {
        window.addEventListener('wheel', scrollHandler, { passive: false });
        window.addEventListener('touchstart', handleTouchStart, { passive: true });
        window.addEventListener('touchmove', handleTouchMove, { passive: false });

        return () => {
            window.removeEventListener('wheel', scrollHandler);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchmove', handleTouchMove);
        };
    }, []);

    return scrollY;
}; 
