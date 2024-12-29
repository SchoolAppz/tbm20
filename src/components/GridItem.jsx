import React from 'react';
import { motion } from 'framer-motion';

const GridItem = ({ children, index }) => {
    return (
        <motion.div
            className="grid-item"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
                duration: 0.6,
                delay: index * 0.2,
                ease: [0.4, 0, 0.2, 1]
            }}
        >
            {children}
        </motion.div>
    );
};

export default GridItem; 
