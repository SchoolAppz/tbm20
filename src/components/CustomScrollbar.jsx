import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

const CustomScrollbar = () => {
    const { scrollYProgress } = useScroll();
    const scrollRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startY, setStartY] = useState(0);
    const [startScroll, setStartScroll] = useState(0);

    // Smooth spring animation for the thumb
    const springConfig = { damping: 15, stiffness: 150 };
    const y = useSpring(
        useTransform(scrollYProgress, [0, 1], ['0%', '85%']),
        springConfig
    );

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartY(e.clientY);
        setStartScroll(window.scrollY);
        document.body.style.userSelect = 'none';
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;

        const delta = e.clientY - startY;
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const percentMove = delta / window.innerHeight;
        const scrollAmount = percentMove * totalHeight;

        window.scrollTo({
            top: startScroll + scrollAmount,
            behavior: 'smooth'
        });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        document.body.style.userSelect = '';
    };

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, startY, startScroll]);

    // Progress indicator animation
    const scaleX = useSpring(scrollYProgress, springConfig);

    return (
        <>
            <motion.div 
                className="custom-scrollbar"
                ref={scrollRef}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                <motion.div 
                    className="scrollbar-thumb"
                    style={{ y }}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.95 }}
                    onMouseDown={handleMouseDown}
                >
                    <motion.div 
                        className="scrollbar-dot"
                        animate={{
                            scale: isDragging ? 1.5 : 1,
                            opacity: isDragging ? 1 : 0.8
                        }}
                    />
                </motion.div>
            </motion.div>
            
            {/* Progress indicator at the top of the page */}
            <motion.div
                className="scroll-progress"
                style={{
                    scaleX,
                    transformOrigin: "left"
                }}
            />
        </>
    );
};

export default CustomScrollbar; 
