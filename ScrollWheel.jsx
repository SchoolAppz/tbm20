import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

const ScrollWheel = () => {
    const wheelRef = useRef(null);
    const { scrollYProgress } = useScroll();
    
    // Smooth spring animation for the scroll indicator
    const scrollProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Create sections for the wheel
    const sections = ['Home', 'Projects', 'Skills', 'Contact'];

    return (
        <motion.div 
            className="scroll-wheel-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="scroll-wheel">
                <motion.div 
                    className="scroll-progress"
                    style={{ scaleY: scrollProgress }}
                />
                
                {sections.map((section, index) => (
                    <motion.div
                        key={section}
                        className="wheel-section"
                        initial={{ opacity: 0.3 }}
                        animate={{ 
                            opacity: useTransform(
                                scrollProgress,
                                [(index) / sections.length, (index + 1) / sections.length],
                                [0.3, 1]
                            )
                        }}
                        onClick={() => {
                            document.getElementById(section.toLowerCase())
                                ?.scrollIntoView({ behavior: 'smooth' });
                        }}
                    >
                        <div className="section-dot" />
                        <span className="section-label">{section}</span>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default ScrollWheel; 