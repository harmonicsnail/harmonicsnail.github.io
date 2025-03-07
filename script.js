document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');
        
        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        
        // Burger Animation
        burger.classList.toggle('toggle');
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust for header height
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (nav.classList.contains('nav-active')) {
                    nav.classList.remove('nav-active');
                    burger.classList.remove('toggle');
                    
                    navLinks.forEach(link => {
                        link.style.animation = '';
                    });
                }
            }
        });
    });
    
    // Scroll to reveal animations
    const revealElements = document.querySelectorAll('.section, .project-card, .skill-item, .timeline-item');
    
    function checkScroll() {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight) {
                element.classList.add('reveal');
            }
        });
    }
    
    // Initial check
    checkScroll();
    
    // Check on scroll
    window.addEventListener('scroll', checkScroll);
    
    // Recipe toggle functionality
    const recipeToggles = document.querySelectorAll('.recipe-toggle');
    
    recipeToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const details = this.nextElementSibling;
            details.classList.toggle('hidden');
            
            if (details.classList.contains('hidden')) {
                this.textContent = 'View Recipe';
            } else {
                this.textContent = 'Hide Recipe';
            }
        });
    });
    
    // Form submission handler
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // In a real implementation, you would send this data to a server
            console.log('Form submitted with data:', formObject);
            
            // For demo purposes, show success message
            this.innerHTML = `
                <div class="form-success">
                    <i class="fas fa-check-circle"></i>
                    <h3>Message Sent!</h3>
                    <p>Thank you for reaching out. I'll get back to you soon.</p>
                </div>
            `;
        });
    }
    
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Audio player custom styling (optional enhancement)
    const audioPlayers = document.querySelectorAll('audio');
    
    audioPlayers.forEach(player => {
        player.addEventListener('play', function() {
            // Add a class to the parent container for styling
            this.closest('.track').classList.add('playing');
        });
        
        player.addEventListener('pause', function() {
            this.closest('.track').classList.remove('playing');
        });
    });
    
    // Add CSS animations for the scrolled effect
    const style = document.createElement('style');
    style.textContent = `
        @keyframes navLinkFade {
            from {
                opacity: 0;
                transform: translateX(50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        .toggle .line1 {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .toggle .line2 {
            opacity: 0;
        }
        
        .toggle .line3 {
            transform: rotate(45deg) translate(-5px, -6px);
        }
        
        .scrolled {
            padding: 10px 30px;
            background-color: rgba(255, 255, 255, 0.98);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        .reveal {
            animation: reveal 0.8s ease forwards;
        }
        
        @keyframes reveal {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .form-success {
            text-align: center;
            padding: 30px;
        }
        
        .form-success i {
            font-size: 4rem;
            color: var(--success-color);
            margin-bottom: 20px;
        }
        
        .playing {
            box-shadow: 0 0 20px rgba(58, 134, 255, 0.3);
            transform: scale(1.02);
            transition: all 0.3s ease;
        }
    `;
    
    document.head.appendChild(style);
});