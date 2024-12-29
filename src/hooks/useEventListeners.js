import { useEffect } from 'react';

export const useEventListeners = (callbacks = {}) => {
    useEffect(() => {
        const handleFullscreenChange = () => {
            const isFullscreen = document.fullscreenElement !== null;
            callbacks.onFullscreenChange?.(isFullscreen);
        };

        const handleKeyDown = (e) => {
            callbacks.onKeyDown?.(e);
        };

        const handleKeyUp = (e) => {
            callbacks.onKeyUp?.(e);
        };

        const handleMouseDown = (e) => {
            callbacks.onMouseDown?.(e);
        };

        const handleMouseUp = (e) => {
            callbacks.onMouseUp?.(e);
        };

        const handleScroll = (e) => {
            callbacks.onScroll?.(e);
        };

        const handleTouchStart = (e) => {
            callbacks.onTouchStart?.(e);
        };

        const handleTouchMove = (e) => {
            callbacks.onTouchMove?.(e);
        };

        const handleTouchEnd = (e) => {
            callbacks.onTouchEnd?.(e);
        };

        const handleVisibilityChange = () => {
            callbacks.onVisibilityChange?.(document.hidden);
        };

        // Add event listeners
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);
        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('scroll', handleScroll, { passive: true });
        document.addEventListener('touchstart', handleTouchStart, { passive: false });
        document.addEventListener('touchmove', handleTouchMove, { passive: false });
        document.addEventListener('touchend', handleTouchEnd);
        document.addEventListener('visibilitychange', handleVisibilityChange);

        // Cleanup
        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('scroll', handleScroll);
            document.removeEventListener('touchstart', handleTouchStart);
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [callbacks]);
}; 
