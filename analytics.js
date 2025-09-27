// ===== ANALYTICS CONFIGURATION =====
// Privacy-focused analytics setup for Deepak's Portfolio

const ANALYTICS_CONFIG = {
    // Analytics Provider Settings
    provider: 'plausible', // 'plausible' | 'google' | 'none'
    
    // Plausible Analytics Settings (Privacy-focused, GDPR compliant)
    plausible: {
        domain: 'deepak.thedev.id',
        apiHost: 'https://plausible.io',
        trackLocalhost: false,
        
        // Custom Events to Track
        events: {
            contactForm: 'Contact Form Submit',
            projectView: 'Project View',
            skillsView: 'Skills Section View',
            resumeDownload: 'Resume Download',
            socialClick: 'Social Link Click',
            navigationClick: 'Navigation Click'
        }
    },
    
    // Privacy Settings
    privacy: {
        respectDoNotTrack: true,
        anonymizeIP: true,
        cookieless: true, // Plausible doesn't use cookies
        dataRetention: '24 months'
    }
};

// ===== ANALYTICS FUNCTIONS =====
function initializeAnalytics() {
    // Check if user has Do Not Track enabled
    if (ANALYTICS_CONFIG.privacy.respectDoNotTrack && navigator.doNotTrack === '1') {
        console.log('Analytics disabled: Do Not Track is enabled');
        return;
    }
    
    // Initialize based on provider
    if (ANALYTICS_CONFIG.provider === 'plausible') {
        initializePlausible();
    }
}

function initializePlausible() {
    // Check if Plausible script is loaded
    if (typeof window.plausible === 'undefined') {
        console.log('Plausible analytics not loaded');
        return;
    }
    
    console.log('Plausible analytics initialized');
}

// Custom event tracking function
function trackEvent(eventName, properties = {}) {
    if (ANALYTICS_CONFIG.privacy.respectDoNotTrack && navigator.doNotTrack === '1') {
        return; // Respect user's privacy preference
    }
    
    if (ANALYTICS_CONFIG.provider === 'plausible' && typeof window.plausible !== 'undefined') {
        window.plausible(eventName, { props: properties });
    }
    
    // Fallback to console for development
    if (window.location.hostname === 'localhost') {
        console.log('Analytics Event:', eventName, properties);
    }
}

// ===== AUTOMATIC EVENT TRACKING =====
function setupAutomaticTracking() {
    // Track contact form submissions
    document.addEventListener('submit', (e) => {
        if (e.target.id === 'contact-form') {
            trackEvent(ANALYTICS_CONFIG.plausible.events.contactForm, {
                method: 'EmailJS'
            });
        }
    });
    
    // Track project links
    document.addEventListener('click', (e) => {
        if (e.target.matches('.project-link')) {
            const projectTitle = e.target.closest('.project-card')?.querySelector('.project-title')?.textContent || 'Unknown';
            trackEvent(ANALYTICS_CONFIG.plausible.events.projectView, {
                project: projectTitle
            });
        }
        
        // Track social links
        if (e.target.matches('.contact-link[href^="http"]')) {
            const platform = e.target.textContent.trim();
            trackEvent(ANALYTICS_CONFIG.plausible.events.socialClick, {
                platform: platform
            });
        }
        
        // Track navigation
        if (e.target.matches('.nav-link')) {
            const section = e.target.textContent.trim();
            trackEvent(ANALYTICS_CONFIG.plausible.events.navigationClick, {
                section: section
            });
        }
    });
    
    // Track section views with Intersection Observer
    const sections = document.querySelectorAll('section[id]');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '-50px'
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionName = entry.target.id;
                if (sectionName === 'skills') {
                    trackEvent(ANALYTICS_CONFIG.plausible.events.skillsView);
                }
            }
        });
    }, observerOptions);
    
    sections.forEach(section => sectionObserver.observe(section));
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    initializeAnalytics();
    setupAutomaticTracking();
});

// ===== EXPORT FOR TESTING =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ANALYTICS_CONFIG,
        trackEvent,
        initializeAnalytics
    };
} else if (typeof window !== 'undefined') {
    window.ANALYTICS_CONFIG = ANALYTICS_CONFIG;
    window.trackEvent = trackEvent;
}