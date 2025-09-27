# Deepak Kumar Singh - Modern Portfolio

A modern, responsive, and secure portfolio website built with clean design principles, professional security practices, and privacy-focused analytics.

## 🌟 Features

- **Modern Design**: Clean, minimalist interface with thoughtful spacing and typography
- **Responsive Layout**: Optimized for all devices and screen sizes  
- **Interactive Elements**: Smooth scrolling, hover effects, and dynamic project filtering
- **Functional Contact Form**: EmailJS integration with 200 emails/month free tier
- **Security First**: Content Security Policy, input validation, rate limiting, and XSS protection
- **Privacy-Focused Analytics**: Plausible Analytics ready (GDPR compliant, cookieless)
- **SEO Optimized**: Sitemap, meta tags, Open Graph, and structured data
- **Professional Sections**: 
  - Hero with engaging introduction
  - About with developer journey and philosophy
  - Professional Work with detailed achievements
  - Personal Projects with status indicators and tech stacks
  - Skills with interactive progress bars
  - Contact form with multiple connection options

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3 (Custom Framework), Vanilla JavaScript ES6+
- **Email Service**: EmailJS with domain restrictions and rate limiting
- **Fonts**: Inter (primary), JetBrains Mono (monospace)
- **Icons**: Unicode emojis for better accessibility
- **Analytics**: Plausible (privacy-focused, optional)
- **Hosting**: GitHub Pages
- **Domain**: Custom domain (deepak.thedev.id)

## 🔒 Security Features

### **Comprehensive Security Implementation:**
- **Content Security Policy (CSP)**: Prevents XSS attacks and unauthorized resource loading
- **Input Validation**: Client and server-side validation with length limits and pattern matching
- **Rate Limiting**: 5 submissions per hour per user with localStorage tracking
- **Spam Protection**: Keyword filtering and suspicious content detection
- **Domain Restrictions**: EmailJS configured with allowed domains only
- **Input Sanitization**: HTML tag removal and JavaScript protocol blocking
- **Security Headers**: X-Content-Type-Options, X-Frame-Options, X-XSS-Protection
- **HTTPS Only**: All external resources loaded over secure connections

### **EmailJS Security Configuration:**
```javascript
// Domain restrictions
allowedDomains: ['deepak.thedev.id', 'deepaksingh.github.io', 'localhost']

// Rate limiting  
maxSubmissionsPerHour: 5

// Input validation
maxNameLength: 50, maxSubjectLength: 100, maxMessageLength: 1000
```

## 🎨 Design Philosophy

This portfolio embraces clean design principles inspired by minimalism:
- **Simplicity**: Thoughtful use of negative space
- **Growth**: Continuous improvement mindset
- **Clean Beauty**: Modern typography and subtle interactions
- **Professional Excellence**: Enterprise-level code quality and security

## 🚀 Performance Features

- **Optimized CSS**: Custom properties, efficient selectors, and minimal footprint
- **Lazy Loading**: Progressive animations and content loading
- **Throttled Handlers**: Optimized scroll and resize event handling
- **Mobile-First**: Responsive design with performance priority
- **Accessibility**: WCAG guidelines compliance
- **SEO Ready**: Structured data and meta optimization

## 📱 Responsive Breakpoints

- **Desktop**: 1200px+ (Primary workspace design)
- **Tablet**: 768px - 1199px (Touch-optimized interface)
- **Mobile**: < 768px (Mobile-first, optimized interaction)

## 🔧 Local Development

### Prerequisites
- Node.js (optional, for development server)
- Modern web browser
- Text editor (VS Code recommended)

### Setup Instructions
1. **Clone the repository**
   ```bash
   git clone https://github.com/iamdeepaksingh/deepaksingh.github.io.git
   cd deepaksingh.github.io
   ```

2. **Install dependencies (optional)**
   ```bash
   npm install
   ```

3. **Development Server**
   ```bash
   # Option 1: Node.js serve
   npm run serve
   
   # Option 2: Python server
   npm run start
   
   # Option 3: Direct file access
   # Open index.html in your browser
   ```

4. **Generate Favicon**
   - Open `favicon-generator.html` in browser
   - Right-click canvas and save as PNG
   - Convert to ICO format using online converter
   - Save as `favicon.ico`

## ⚙️ Configuration

### EmailJS Setup
1. Create account at [EmailJS](https://www.emailjs.com/)
2. Create email service (Gmail, Outlook, etc.)
3. Create email template
4. Update `config.js` with your credentials:
   ```javascript
   publicKey: 'your-public-key',
   serviceId: 'your-service-id',
   templateId: 'your-template-id'
   ```

### Analytics Setup (Optional)
1. **Plausible Analytics** (Recommended - Privacy-focused)
   - Sign up at [Plausible.io](https://plausible.io/)
   - Add your domain: `deepak.thedev.id`
   - Uncomment the analytics script in `index.html`
   
2. **Google Analytics** (Alternative)
   - Update `analytics.js` configuration
   - Add Google Analytics script tag

### Domain Configuration
1. Update `CNAME` file with your domain
2. Configure DNS A records:
   ```
   185.199.108.153
   185.199.109.153  
   185.199.110.153
   185.199.111.153
   ```
3. Configure DNS AAAA records:
   ```
   2606:50c0:8000::153
   2606:50c0:8001::153
   2606:50c0:8002::153
   2606:50c0:8003::153
   ```

## 🚀 Deployment

### GitHub Pages Deployment
1. **Push to Repository**
   ```bash
   git add .
   git commit -m "Deploy portfolio"
   git push origin main
   ```

2. **Configure GitHub Pages**
   - Go to repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: main / (root)
   - Save

3. **Custom Domain** (Optional)
   - Add `CNAME` file with your domain
   - Configure DNS as described above
   - Enable "Enforce HTTPS" in repository settings

### Security Checklist
- ✅ Content Security Policy configured
- ✅ Input validation and sanitization
- ✅ Rate limiting implemented
- ✅ Domain restrictions configured
- ✅ HTTPS enforcement
- ✅ Security headers set

### Performance Optimization
- ✅ Minified CSS and JavaScript (production ready)
- ✅ Optimized images and fonts
- ✅ Lazy loading implemented
- ✅ Caching headers configured
- ✅ Mobile-first responsive design

## 📈 Analytics & Monitoring

### Metrics Tracked
- Page views and unique visitors
- Contact form submissions
- Project link clicks
- Section engagement (scroll depth)
- Social media clicks
- Navigation usage patterns

### Privacy Compliance
- **GDPR Compliant**: No personal data collection without consent
- **Cookieless**: Plausible Analytics doesn't use cookies
- **Do Not Track**: Respects user privacy preferences
- **Data Retention**: 24 months maximum
- **Anonymous**: IP addresses anonymized

## 🧪 Testing

### Manual Testing Checklist
- [ ] All navigation links work correctly
- [ ] Contact form submits successfully
- [ ] Project filtering functions properly
- [ ] Responsive design on all devices
- [ ] All external links open correctly
- [ ] EmailJS integration working
- [ ] Security headers present

### Development Tools
- Use `test-contact-form.html` for EmailJS testing
- Browser Developer Tools for debugging
- Lighthouse for performance auditing
- WAVE for accessibility testing

## 🔧 Customization

### Updating Content
1. **Personal Information**: Edit `index.html` sections
2. **Projects**: Update the projects array in `script.js`
3. **Skills**: Modify skills section in HTML and CSS
4. **Styling**: Customize CSS variables in `styles.css`
5. **Colors**: Update CSS custom properties in `:root`

### Adding New Sections
1. Add HTML section with unique ID
2. Update navigation in header
3. Add corresponding CSS styles
4. Update JavaScript for smooth scrolling
5. Add to sitemap.xml for SEO

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/iamdeepaksingh/deepaksingh.github.io/issues).

## 📞 Support

If you have any questions or need help with setup:
- 📧 Email: deepak.singh.buzz@gmail.com
- 🐙 GitHub: [@iamdeepaksingh](https://github.com/iamdeepaksingh)
- 🌐 Website: [deepak.thedev.id](https://deepak.thedev.id)

## 🙏 Acknowledgments

- Design inspiration from modern portfolio trends
- EmailJS for reliable email service
- Plausible for privacy-focused analytics
- Inter and JetBrains Mono fonts by Google Fonts
- GitHub Pages for free hosting

---

**Made with ❤️ and lots of ☕**
3. For live development, use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   ```

## 🌐 Domain Setup

This portfolio is configured for the custom domain `deepak.thedev.id`. The CNAME file is already configured.

## 📊 Project Structure

```
/
├── index.html          # Main HTML file
├── styles.css          # CSS framework with Japanese-inspired design
├── script.js           # Interactive functionality
├── CNAME              # Custom domain configuration
└── README.md          # This file
```

## 🎯 Key Sections

### Professional Work
- Senior Consultant role at Avanade
- Enterprise Power Platform solutions
- Azure cloud services expertise

### Personal Projects
- Power Platform Demos
- AI Resume Parser
- Portfolio Website
- Azure Functions Toolkit
- Business Analytics Dashboard
- Intelligent Assistant Bot

### Skills & Technologies
- **Microsoft Platform**: Power Platform, Dynamics 365, Azure
- **Development**: Python, JavaScript, C#, HTML/CSS
- **Cloud & DevOps**: Azure DevOps, CI/CD, Git, Docker
- **AI & Analytics**: Azure Cognitive Services, Machine Learning, Databricks

## 📞 Contact

- **Email**: deepak.singh.buzz@gmail.com
- **LinkedIn**: [singh-deepak-kumar](https://www.linkedin.com/in/singh-deepak-kumar/)
- **GitHub**: [iamdeepaksingh](https://github.com/iamdeepaksingh)

## 🙏 Acknowledgments

Design inspiration from modern portfolio websites showcasing clean, professional design patterns.

---

**"Code is poetry written in logic, architecture is the art of making it sing"**

Made with ❤️ and lots of ☕