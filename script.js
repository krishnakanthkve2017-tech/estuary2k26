// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navActions = document.querySelector('.nav-actions');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navActions.classList.toggle('active');
    
    const icon = hamburger.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Active link updating on scroll
const sections = document.querySelectorAll('section, header');
const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').substring(1) === current) {
            item.classList.add('active');
        }
    });
});

// Reveal elements on scroll
const fadeElements = document.querySelectorAll('.section-fade');

const revealElements = () => {
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('visible');
        }
    });
};

window.addEventListener('scroll', revealElements);
// Initial check
revealElements();

// Modal Logic
const modal = document.getElementById('registrationModal');
const modalSubtitle = document.getElementById('modalSubtitle');

window.openModal = function(sessionName = '') {
    if (sessionName) {
        modalSubtitle.textContent = `Registering for: ${sessionName}`;
    } else {
        modalSubtitle.textContent = 'Secure your spot for ESTUARY 2026';
    }
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
};

window.closeModal = function() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Enable scrolling
};

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Form Submission handling
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    const originalText = btn.textContent;
    btn.textContent = 'Sending...';
    btn.style.opacity = '0.7';
    
    // Simulate API call
    setTimeout(() => {
        btn.textContent = 'Message Sent!';
        btn.style.background = '#10b981'; // Green success color
        e.target.reset();
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
            btn.style.opacity = '1';
        }, 3000);
    }, 1500);
});

document.getElementById('registerForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    const originalText = btn.textContent;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    
    // Simulate API call
    setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-check"></i> Registration Complete!';
        btn.style.background = '#10b981';
        
        setTimeout(() => {
            closeModal();
            e.target.reset();
            btn.textContent = originalText;
            btn.style.background = '';
        }, 2000);
    }, 2000);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        // Close mobile menu if open
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            navActions.classList.remove('active');
            hamburger.querySelector('i').classList.replace('fa-times', 'fa-bars');
        }
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const navHeight = navbar.offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});
