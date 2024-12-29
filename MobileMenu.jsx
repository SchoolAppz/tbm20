import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MobileMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="mobile-menu">
            <button 
                className={`hamburger ${isOpen ? 'active' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        className="mobile-nav"
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 20 }}
                    >
                        <nav>
                            <a href="#home" onClick={() => setIsOpen(false)}>Home</a>
                            <a href="#projects" onClick={() => setIsOpen(false)}>Projects</a>
                            <a href="#skills" onClick={() => setIsOpen(false)}>Skills</a>
                            <a href="#contact" onClick={() => setIsOpen(false)}>Contact</a>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MobileMenu; 