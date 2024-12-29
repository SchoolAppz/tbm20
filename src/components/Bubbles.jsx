import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Bubbles = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const bubblePositions = [
        { offsetX: -100, offsetY: -100 },
        { offsetX: 100, offsetY: 100 },
        { offsetX: -100, offsetY: 100 }
    ];

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <>
            {bubblePositions.map((offset, index) => (
                <div key={index}>
                    <motion.div
                        className="bubble-outline"
                        animate={{
                            left: mousePosition.x + offset.offsetX,
                            top: mousePosition.y + offset.offsetY
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 150,
                            damping: 15
                        }}
                    />
                    <motion.div
                        className="bubble-dot"
                        animate={{
                            left: mousePosition.x + offset.offsetX,
                            top: mousePosition.y + offset.offsetY
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 250,
                            damping: 24
                        }}
                    />
                </div>
            ))}
        </>
    );
};

export default Bubbles; 
