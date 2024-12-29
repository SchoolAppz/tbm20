import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useAnimation } from 'framer-motion';

const ScrollSection = ({ children, direction = 'left', delay = 0 }) => {
    const ref = useRef(null);
    const controls = useAnimation();
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const x = useTransform(
        scrollYProgress,
        [0, 0.5, 1],
        direction === 'left' ? [-100, 0, 0] : [100, 0, 0]
    );

    const opacity = useTransform(
        scrollYProgress,
        [0, 0.3, 1],
        [0, 1, 1]
    );

    // Function to trigger animation
    const triggerAnimation = () => {
        controls.start({
            x: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 20
            }
        });
    };

    // Export the trigger function to be accessible from parent
    React.useImperativeHandle(ref, () => ({
        triggerAnimation,
        element: ref.current
    }));

    return (
        <motion.div
            ref={ref}
            style={{
                x,
                opacity,
                width: '100%'
            }}
            initial={{ x: direction === 'left' ? -100 : 100, opacity: 0 }}
            animate={controls}
        >
            {children}
        </motion.div>
    );
};

export default ScrollSection; 
