import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import GridItem from './components/GridItem';
import Cursor from './components/Cursor';
import Footer from './components/Footer';
import CustomScrollbar from './components/CustomScrollbar';
import MobileMenu from './components/MobileMenu';
import Logo from './components/Logo';
import Bubbles from './components/Bubbles';
import ScrollFollower from './components/ScrollFollower';
import ScrollWheel from './components/ScrollWheel';
import './styles/scrollbar.css';
import './styles/mobile.css';
import './styles/logo.css';
import './styles/bubbles.css';
import './styles/scrollFollower.css';
import './styles/scrollWheel.css';
import { useEventListeners } from './hooks/useEventListeners';

function App() {
    return (
        <>
            <Cursor />
            <CustomScrollbar />
            <Bubbles />
            <ScrollFollower />
            <ScrollWheel />
            <nav className="navbar">
                <Logo />
                <div className="nav-links">
                    <a href="#home" className="nav-link">Home</a>
                    <a href="#projects" className="nav-link">Projects</a>
                    <a href="#skills" className="nav-link">Skills</a>
                    <a href="#contact" className="nav-link">Contact</a>
                </div>
                <MobileMenu />
            </nav>

            <section id="home" className="hero">
                <div className="text-box">
                    <h1 className="glitch" data-text="Hello, I'm TBM">
                        Hello, I'm TBM
                    </h1>
                </div>
                <div className="text-box">
                    <h3>Creative Developer & Problem Solver</h3>
                    <p>Turning ideas into elegant solutions</p>
                </div>
            </section>

            <section id="projects" className="hero">
                <div className="text-box featured-box">
                    <h3>Featured Projects</h3>
                    <p>Crafting innovative web solutions with modern technologies. Specializing in interactive and responsive applications that deliver exceptional user experiences.</p>
                    <div className="projects-list">
                        <motion.div 
                            className="project-item"
                            initial={{ x: -100, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h4>Discord Bot</h4>
                            <p>A versatile Discord bot with advanced moderation and music features</p>
                        </motion.div>
                        
                        <motion.div 
                            className="project-item"
                            initial={{ x: 100, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <h4>Portfolio Website</h4>
                            <p>Modern, responsive portfolio with interactive animations</p>
                        </motion.div>
                        
                        <motion.div 
                            className="project-item"
                            initial={{ x: -100, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            <h4>Web Application</h4>
                            <p>Full-stack application with real-time updates and user authentication</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section id="skills" className="hero">
                <div className="text-box">
                    <h3>Tech Stack</h3>
                    <p>Mastering the art of web development with React, Node.js, and cutting-edge tools. Building seamless, scalable applications with modern best practices.</p>
                </div>
            </section>

            <section id="contact" className="hero">
                <div className="text-box">
                    <h3>Contact</h3>
                    <p>Ready to bring your ideas to life? Let's collaborate on creating something extraordinary. Reach out and let's discuss your next project.</p>
                </div>
            </section>

            <Footer />
        </>
    );
}

export default App; 