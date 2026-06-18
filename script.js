
const greeting = document.querySelector('.greeting');
const details = document.querySelector('.details');
const scrollIndicator = document.querySelector('.scroll-indicator');
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    // Show/hide greeting based on scroll position
    if (currentScrollY > 50) {
        greeting.classList.add('hide');
        details.classList.add('show');
        scrollIndicator.classList.add('hide');
        navbar.classList.add('scrolled');
    } else {
        greeting.classList.remove('hide');
        details.classList.remove('show');
        scrollIndicator.classList.remove('hide');
        navbar.classList.remove('scrolled');
    }
    
    // Parallax effect for hero video
    const heroVideo = document.querySelector('.hero-video');
    const overlay = document.querySelector('.overlay');
    
    if (heroVideo) {
        heroVideo.style.transform = `translateY(${currentScrollY * 0.5}px)`;
    }
    
    // Darken overlay on scroll
    if (overlay) {
        const opacity = Math.min(0.55 + (currentScrollY / 1000) * 0.3, 0.85);
        overlay.style.background = `rgba(0, 0, 0, ${opacity})`;
    }
});

// ==================== SMOOTH SCROLL FOR NAVIGATION ====================

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - navbar.offsetHeight;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== ACTIVE NAVIGATION HIGHLIGHTING ====================

const navLinks = document.querySelectorAll('.nav-links a');
const sectionElements = document.querySelectorAll('section[id]');

function setActiveNav() {
    let currentSection = '';
    
    sectionElements.forEach(section => {
        const sectionTop = section.offsetTop;
        
        // Check if section is in viewport
        if (window.scrollY >= (sectionTop - navbar.offsetHeight - 100)) {
            currentSection = section.getAttribute('id');
        }
    });
    
    // Update active state for all nav links
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Update active nav on scroll
window.addEventListener('scroll', setActiveNav);

// Initialize on load
window.addEventListener('load', () => {
    setActiveNav();
});