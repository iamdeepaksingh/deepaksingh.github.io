// ===== GLOBAL VARIABLES =====
let isNavOpen = false;
let currentFilter = 'all';
let isScrolling = false;

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollAnimations();
    initializeProjectFilters();
    initializeSkillBars();
    initializeContactForm();
    initializeSmoothScrolling();
    
    // Show initial animations
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// ===== NAVIGATION FUNCTIONALITY =====
function initializeNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Handle scroll to show/hide navigation
    let lastScrollTop = 0;
    const nav = document.querySelector('.nav');
    
    window.addEventListener('scroll', () => {
        if (isScrolling) return;
        
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down - hide nav
            nav.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up - show nav
            nav.style.transform = 'translateY(0)';
        }
        
        // Update active nav link based on scroll position
        updateActiveNavLink();
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }, { passive: true });
}

function toggleMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    isNavOpen = !isNavOpen;
    
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = isNavOpen ? 'hidden' : '';
}

function closeMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    isNavOpen = false;
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// ===== SMOOTH SCROLLING =====
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                isScrolling = true;
                
                const offsetTop = targetElement.offsetTop - 70; // Account for nav height
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Reset scrolling flag after animation
                setTimeout(() => {
                    isScrolling = false;
                }, 1000);
            }
        });
    });
}

// ===== SCROLL ANIMATIONS =====
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Special handling for skill bars
                if (entry.target.classList.contains('skill-category')) {
                    animateSkillBars(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(`
        .hero-content,
        .about-content,
        .work-item,
        .project-card,
        .skill-category,
        .contact-content
    `);
    
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// ===== PROJECT FILTERING =====
function initializeProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter projects
            filterProjects(filter);
            currentFilter = filter;
        });
    });
}

function filterProjects(filter) {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const categories = card.getAttribute('data-category');
        
        if (filter === 'all' || categories.includes(filter)) {
            card.style.display = 'block';
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            // Animate in
            setTimeout(() => {
                card.style.transition = 'all 0.3s ease-out';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

// ===== SKILL BARS ANIMATION =====
function initializeSkillBars() {
    // This will be triggered by the intersection observer
}

function animateSkillBars(skillCategory) {
    const skillBars = skillCategory.querySelectorAll('.skill-bar');
    
    skillBars.forEach((bar, index) => {
        setTimeout(() => {
            bar.style.width = bar.style.width || '0%';
            bar.style.transition = 'width 1s ease-out';
        }, index * 200);
    });
}

// ===== CONTACT FORM =====
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
        //console.log('Contact form event listener attached');
        
        // Simple check if EmailJS is ready (it's initialized in index.html now)
        if (typeof emailjs !== 'undefined') {
            //console.log('EmailJS is ready for use');
        } else {
            //console.error('EmailJS not available');
        }
    } else {
        //console.error('Contact form not found');
    }
}

async function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Update button state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    
    console.log('📤 Starting email send process...');
    
    // Check if EmailJS is ready
    if (typeof emailjs === 'undefined') {
        //console.error('EmailJS is not defined - script not loaded');
        showNotification('Email service not available. Please refresh the page and try again.', 'error');
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        return;
    }
    
    if (!window.emailjsReady) {
        //console.error('EmailJS not ready yet');
        showNotification('Email service is still loading. Please wait a moment and try again.', 'error');
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        return;
    }
    
    // Prepare data for EmailJS (using the same structure as test file)
    const templateParams = {
        from_name: formData.get('name'),
        from_email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message'),
        to_name: 'Deepak Kumar Singh',
    };
    
    console.log('📋 Template params:', JSON.stringify(templateParams, null, 2));
    
    try {
        // Send email using EmailJS (same approach as test file)
        //console.log('Calling emailjs.send()...');
        //console.log('EmailJS object check:', typeof emailjs, typeof emailjs.send);
        
        const response = await emailjs.send(
            'service_dtrgs1k',
            'template_q5xxp1n',
            templateParams
        );
        
        //console.log(`Email sent successfully! Response:`, response);
        showNotification('✅ Message sent successfully! Thank you for reaching out.', 'success');
        
        // Reset form
        e.target.reset();
        
    } catch (error) {
        //console.log('Error sending email:');
        //console.log('   - Error Type:', error.name || 'Unknown');
        //console.log('   - Error Message:', error.message || 'No message');
        //console.log('   - Error Code:', error.status || error.code || 'No code');
        //console.log('   - Full Error:', error);
        
        // Common error solutions
        if (error.message && error.message.includes('Invalid')) {
            //console.log('Suggestion: Check your EmailJS Service ID, Template ID, or Public Key');
        } else if (error.status === 412) {
            //console.log('Suggestion: Gmail API scope issue - try reconnecting Gmail service');
        } else if (error.status === 400) {
            //console.log('Suggestion: Template variable mismatch - check template setup');
        }
        
        showNotification('Failed to send message. Please try again or contact me directly.', 'error');
    } finally {
        // Reset button state
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }
}

// Remove the old simulateFormSubmission function
// function simulateFormSubmission(formData) {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             console.log('Form data:', Object.fromEntries(formData));
//             resolve();
//         }, 1500);
//     });
// }

// ===== NOTIFICATIONS =====
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 1001;
        transform: translateX(100%);
        transition: transform 0.3s ease-out;
        max-width: 400px;
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        removeNotification(notification);
    }, 5000);
    
    // Add close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => removeNotification(notification));
}

function removeNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// ===== PERFORMANCE OPTIMIZATIONS =====
// Optimized scroll handler
const optimizedScrollHandler = throttle(() => {
    updateActiveNavLink();
}, 100);

window.addEventListener('scroll', optimizedScrollHandler, { passive: true });

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', (e) => {
    // Close mobile menu with Escape key
    if (e.key === 'Escape' && isNavOpen) {
        closeMobileMenu();
    }
    
    // Navigate sections with arrow keys (when not in form fields)
    if (!e.target.matches('input, textarea, select')) {
        const sections = ['hero', 'about', 'work', 'projects', 'skills', 'contact'];
        const currentSectionIndex = sections.findIndex(section => 
            document.getElementById(section).getBoundingClientRect().top <= 100
        );
        
        if (e.key === 'ArrowDown' && currentSectionIndex < sections.length - 1) {
            e.preventDefault();
            document.getElementById(sections[currentSectionIndex + 1]).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        } else if (e.key === 'ArrowUp' && currentSectionIndex > 0) {
            e.preventDefault();
            document.getElementById(sections[currentSectionIndex - 1]).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// ===== PRELOAD CRITICAL RESOURCES =====
function preloadCriticalResources() {
    const criticalImages = [
        // Add any critical images here
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Initialize preloading
preloadCriticalResources();

// ===== ANALYTICS & TRACKING =====
function trackInteraction(category, action, label) {
    // Add your analytics tracking code here
    //console.log('Analytics:', { category, action, label });
}

// Track important interactions
document.addEventListener('click', (e) => {
    if (e.target.matches('.btn-primary')) {
        trackInteraction('Button', 'Click', 'Primary CTA');
    } else if (e.target.matches('.project-link')) {
        trackInteraction('Project', 'Click', e.target.textContent);
    } else if (e.target.matches('.contact-link')) {
        trackInteraction('Contact', 'Click', e.target.textContent);
    }
});

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    // Add error reporting here if needed
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    // Add error reporting here if needed
});

// ===== EXPORT FOR TESTING =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        toggleMobileMenu,
        filterProjects,
        showNotification,
        debounce,
        throttle
    };
}