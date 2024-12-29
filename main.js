document.addEventListener('DOMContentLoaded', () => {
    // Custom cursor
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    let isTrackpad = false;
    let lastScrollTime = Date.now();

    // Detect if user is using a trackpad
    document.addEventListener('wheel', (e) => {
        const now = Date.now();
        if (now - lastScrollTime < 50) { // Short time between scroll events indicates trackpad
            isTrackpad = true;
        }
        lastScrollTime = now;
    }, { passive: true });

    // Handle both mouse and touch/trackpad movement
    document.addEventListener('mousemove', handleCursorMove);
    document.addEventListener('touchmove', (e) => {
        e.preventDefault();
        handleCursorMove(e.touches[0]);
    });

    function handleCursorMove(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Immediate positioning for trackpad users
        if (isTrackpad) {
            followerX = mouseX;
            followerY = mouseY;
            follower.style.left = (followerX - follower.clientWidth / 2) + 'px';
            follower.style.top = (followerY - follower.clientHeight / 2) + 'px';
        }
    }

    function updateFollower() {
        if (isTrackpad) return; // Skip animation for trackpad users

        // Calculate the distance between current follower position and mouse position
        const dx = mouseX - followerX;
        const dy = mouseY - followerY;
        
        // Update follower position with easing
        followerX += dx * 0.08; // Reduced easing for smoother movement
        followerY += dy * 0.08;
        
        // Apply the new position
        follower.style.left = (followerX - follower.clientWidth / 2) + 'px';
        follower.style.top = (followerY - follower.clientHeight / 2) + 'px';
        
        requestAnimationFrame(updateFollower);
    }

    // Start the animation loop
    updateFollower();

    // Hide cursors when leaving the window
    document.addEventListener('mouseleave', hideCursors);
    document.addEventListener('touchend', hideCursors);

    function hideCursors() {
        cursor.style.display = 'none';
        follower.style.display = 'none';
    }

    document.addEventListener('mouseenter', showCursors);
    document.addEventListener('touchstart', showCursors);

    function showCursors() {
        cursor.style.display = 'block';
        follower.style.display = 'block';
    }

    // One-time typing animation for subtitle
    const subtitleEl = document.querySelector('.text-box-hero .subtitle-typing');
    const descEl = document.querySelector('.text-box-hero .subtitle-desc');
    const subtitleText = "Creative Developer & Problem Solver";
    const descText = "Turning ideas into elegant solutions";
    let subtitleIndex = 0;
    let descIndex = 0;

    function typeSubtitle() {
        if (subtitleIndex < subtitleText.length) {
            subtitleEl.textContent += subtitleText.charAt(subtitleIndex);
            subtitleIndex++;
            setTimeout(typeSubtitle, 50);
        } else {
            // Start typing description after subtitle is done
            setTimeout(typeDesc, 500);
        }
    }

    function typeDesc() {
        if (descIndex < descText.length) {
            descEl.textContent += descText.charAt(descIndex);
            descIndex++;
            setTimeout(typeDesc, 50);
        }
    }

    // Start typing animation after a delay
    setTimeout(() => {
        if (subtitleEl && descEl) {
            typeSubtitle();
        }
    }, 1000);

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Scroll Animation
    const hiddenElements = document.querySelectorAll('.hidden');

    // Function to handle sliding animations
    function slideIn(element, delay = 0) {
        setTimeout(() => {
            // Add show class immediately
            element.classList.add('show');
            
            // Only scroll if not the first section
            if (!element.classList.contains('first-section')) {
                const offset = element.offsetTop - 100; // Adjust for navbar
                window.scrollTo({
                    top: offset,
                    behavior: 'smooth'
                });
            }
            
            // Animate child grid items if any
            element.querySelectorAll('.grid-item').forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('show');
                }, index * 200);
            });
            
            // Fix for MacOS trackpad scrolling
            setTimeout(() => {
                document.body.style.transform = 'translateZ(0)';
                setTimeout(() => {
                    document.body.style.transform = '';
                }, 10);
            }, 1000);
        }, delay);
    }

    // Initial animation for first section
    setTimeout(() => {
        const firstSection = document.querySelector('.section');
        if (firstSection) {
            slideIn(firstSection);
        }
    }, 100);

    // Observer for subsequent sections
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('show')) {
                slideIn(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '-50px 0px -50px 0px'
    });

    // Start observing all sections except the first one
    hiddenElements.forEach((el, index) => {
        if (index > 0) { // Skip first section as it's handled by initial animation
            observer.observe(el);
        }
    });

    // Add hover effect to bubbles
    document.querySelectorAll('.bubble').forEach(bubble => {
        bubble.addEventListener('mousemove', (e) => {
            const rect = bubble.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            bubble.style.background = `radial-gradient(circle at ${x}px ${y}px, 
                rgba(79, 195, 247, 0.2), 
                rgba(79, 195, 247, 0.1))`;
        });
        
        bubble.addEventListener('mouseleave', () => {
            bubble.style.background = '';
        });
    });

    // Update scroll behavior for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').slice(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offset = targetSection.offsetTop;
                // Adjust offset for skills section
                const adjustedOffset = targetId === 'skills' ? 
                    offset + 20 :  // Small offset for visual spacing
                    offset;
                
                window.scrollTo({
                    top: adjustedOffset,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Particle background
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: '#4fc3f7'
        },
        shape: {
            type: 'circle'
        },
        opacity: {
            value: 0.5,
            random: false
        },
        size: {
            value: 3,
            random: true
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#4fc3f7',
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 6,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'repulse'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        }
    },
    retina_detect: true
}); 