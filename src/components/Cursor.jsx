import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const Cursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isTrackpad, setIsTrackpad] = useState(false);
    const cursorRef = useRef(null);
    const followerRef = useRef(null);
    const lastScrollY = useRef(0);
    const lastScrollTime = useRef(Date.now());
    const { scrollY } = useScroll();

    // Smooth spring animation for scroll
    const smoothY = useSpring(0, {
        stiffness: 100,
        damping: 20,
        mass: 0.5
    });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY
            });
        };

        const handleScroll = () => {
            const now = Date.now();
            const delta = window.scrollY - lastScrollY.current;
            const timeDiff = now - lastScrollTime.current;

            // Detect trackpad by checking scroll characteristics
            if (Math.abs(delta) < 40 && timeDiff < 50) {
                setIsTrackpad(true);
                smoothY.set(window.scrollY);
            } else {
                setIsTrackpad(false);
            }

            lastScrollY.current = window.scrollY;
            lastScrollTime.current = now;
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [smoothY]);

    // Update smooth scroll value
    useEffect(() => {
        if (!isTrackpad) {
            smoothY.set(window.scrollY);
        }
    }, [scrollY, isTrackpad, smoothY]);

    const springConfig = {
        type: "spring",
        stiffness: isTrackpad ? 200 : 500,
        damping: isTrackpad ? 20 : 28,
        mass: isTrackpad ? 0.8 : 0.5
    };

    return (
        <>
            <motion.div
                ref={cursorRef}
                className="cursor"
                style={{
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    translateX: mousePosition.x - 10,
                    translateY: mousePosition.y - 10,
                    pointerEvents: 'none'
                }}
                animate={{
                    x: mousePosition.x - 10,
                    y: mousePosition.y - 10
                }}
                transition={springConfig}
            />
            <motion.div
                ref={followerRef}
                className="cursor-follower"
                style={{
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    translateX: mousePosition.x - 8,
                    translateY: mousePosition.y - 8,
                    pointerEvents: 'none',
                    opacity: isTrackpad ? 0.5 : 0.8
                }}
                animate={{
                    x: mousePosition.x - 8,
                    y: mousePosition.y - 8,
                    scale: isTrackpad ? 0.8 : 1
                }}
                transition={{
                    ...springConfig,
                    stiffness: isTrackpad ? 150 : 250,
                    damping: isTrackpad ? 15 : 24
                }}
            />
        </>
    );
};

export default Cursor; 
