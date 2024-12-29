import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ScrollFollower = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const { scrollYProgress } = useScroll();

    // Create multiple followers with different offsets and delays
    const followers = [
        { delay: 0, offset: 100 },
        { delay: 0.1, offset: 200 },
        { delay: 0.2, offset: 300 }
    ];

    // Transform scroll progress to scale and opacity
    const scale = useTransform(scrollYProgress, [0, 1], [1, 2]);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY + window.scrollY
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <>
            {followers.map((follower, index) => (
                <motion.div
                    key={index}
                    className="scroll-follower"
                    style={{
                        position: 'absolute',
                        left: mousePosition.x,
                        top: mousePosition.y,
                        scale,
                        opacity,
                        zIndex: -1,
                        pointerEvents: 'none'
                    }}
                    animate={{
                        x: -follower.offset,
                        y: -follower.offset
                    }}
                    transition={{
                        type: 'spring',
                        stiffness: 100,
                        damping: 15,
                        delay: follower.delay
                    }}
                >
                    <motion.div
                        className="follower-circle"
                        animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 180, 360]
                        }}
                        transition={{
                            duration: 3,
                            ease: "linear",
                            repeat: Infinity
                        }}
                    />
                </motion.div>
            ))}
        </>
    );
};

export default ScrollFollower; 