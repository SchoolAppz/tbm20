import React from 'react';
import { motion } from 'framer-motion';

const Logo = () => {
    return (
        <motion.div 
            className="logo-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <span className="logo-text">TBM</span>
            <span className="blink">_</span>
        </motion.div>
    );
};

export default Logo; 
