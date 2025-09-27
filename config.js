// ===== EMAIL CONFIGURATION =====
// Note: These are public identifiers meant to be visible in client-side code
// EmailJS uses domain restrictions and rate limiting for security
const EMAIL_CONFIG = {
    // EmailJS Public Configuration (safe to commit)
    publicKey: 'KV0pU49NLP7qljz7a',
    serviceId: 'service_dtrgs1k',
    templateId: 'template_q5xxp1n',
    
    // Security Settings
    allowedDomains: [
        'deepak.thedev.id',
        'deepaksingh.github.io', 
        'localhost'
    ],
    
    // Rate limiting (client-side protection)
    maxSubmissionsPerHour: 5,
    
    // Validation rules
    validation: {
        minNameLength: 2,
        maxNameLength: 50,
        maxSubjectLength: 100,
        maxMessageLength: 1000
    }
};

// Store submission timestamps for rate limiting
let submissionTimestamps = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');

// Clean old timestamps (older than 1 hour)
const oneHourAgo = Date.now() - (60 * 60 * 1000);
submissionTimestamps = submissionTimestamps.filter(timestamp => timestamp > oneHourAgo);
localStorage.setItem('contactSubmissions', JSON.stringify(submissionTimestamps));

// Export configuration
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EMAIL_CONFIG;
} else if (typeof window !== 'undefined') {
    window.EMAIL_CONFIG = EMAIL_CONFIG;
}