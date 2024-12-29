import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const GlowingBox = ({ children }) => {
    const boxRef = useRef(null);
    const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!boxRef.current) return;
            
            const rect = boxRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            setMousePosition({ x, y });
            
            // Update CSS variables for glow position
            boxRef.current.style.setProperty('--mouse-x', `${x}px`);
            boxRef.current.style.setProperty('--mouse-y', `${y}px`);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <motion.div 
            ref={boxRef}
            className="glowing-box"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{ 
                display: 'inline-block',
                margin: '2rem auto'
            }}
        >
            <div className="glowing-box-content">
                {children}
            </div>
            <div className="glow" />
        </motion.div>
    );
};

export default GlowingBox; 
