# Digital Insights - Cybersecurity Company Website

A modern, high-tech static website for Digital Insights, a UAE-based cybersecurity company, featuring an advanced animated SOC (Security Operations Center) environment with real-time threat visualization.

## 📋 Quick Links

- **[Comprehensive Documentation](PROJECT_DOCUMENTATION.md)** - Complete project details, design decisions, and technical specifications
- **Live Demo**: Open `index.html` in your browser or run a local server

## 🎨 Design Highlights

### Color Scheme
- **Primary**: Cyber Cyan (#00D9FF) - High-tech cybersecurity aesthetic
- **Background**: Dark blue gradient with 10% white tint
- **Accents**: Gold (#D4AF37) for CTAs, Red for alerts, Green for success
- **Typography**: Space Grotesk (headings), Inter (body text)

### Key Features
- **Animated SOC Environment**: Canvas-based real-time threat monitoring visualization
- **World Map**: 8 global locations with animated cyber attack connections
- **Responsive Design**: Mobile-first approach, fully responsive
- **Smooth Animations**: 60fps canvas animations with Intersection Observer scroll effects

### Key Sections

1. **Hero Section with SOC Animation**
   - Animated canvas-based Security Operations Center visualization
   - Network topology with glowing nodes and data streams
   - Real-time threat detection animations
   - Monitoring dashboards with scan lines
   - Pulsing center hub representing the core security system

2. **Services**
   - Digital Forensics & Incident Response
   - Security Operations Center (SOC)
   - Penetration Testing
   - Security Assessments
   - Platform Engineering
   - AI Solutions

3. **About Section**
   - Company overview
   - Key features and capabilities
   - Statistics with animated counters

4. **AI Solutions**
   - Neural network visualization
   - AI-powered security features
   - Automated threat detection

5. **Contact Form**
   - Contact information with 24/7 emergency hotline
   - Service inquiry form
   - UAE location information

### Technical Features

- **Pure HTML/CSS/JavaScript** - No framework dependencies
- **Canvas-based animations** - High-performance SOC environment visualization
- **Intersection Observer API** - Efficient scroll-triggered animations
- **Responsive Design** - Mobile-first approach
- **Smooth Scrolling** - Enhanced user experience
- **Form Validation** - Client-side validation
- **Performance Optimized** - Lazy loading and efficient animations

## File Structure

```
/dicwebsite
├── index.html              # Main HTML file
├── css/
│   ├── main.css           # Core styles and layout
│   ├── animations.css     # Keyframe animations and effects
│   └── responsive.css     # Media queries for responsive design
├── js/
│   ├── soc-animation.js   # Canvas-based SOC animation
│   └── main.js            # Interactive features and functionality
├── assets/
│   ├── images/            # Image assets (empty - add as needed)
│   └── icons/             # Icon assets (empty - add as needed)
└── README.md              # This file
```

## How to Use

### Local Development

1. Open `index.html` in a modern web browser
2. Or use a local server:
   ```bash
   # Python 3
   python -m http.server 8000

   # Node.js
   npx http-server
   ```
3. Navigate to `http://localhost:8000`

### Deployment

This is a static website and can be deployed to any static hosting service:

- **Netlify**: Drag and drop the folder or connect to git
- **Vercel**: Import the project
- **GitHub Pages**: Push to repository and enable Pages
- **AWS S3**: Upload files and configure for static hosting
- **Traditional hosting**: Upload via FTP/SFTP

## Customization

### Colors

Edit CSS variables in `css/main.css`:

```css
:root {
    --gold-primary: #D4AF37;
    --gold-secondary: #B8860B;
    --gold-bright: #FFD700;
    --gold-muted: #8B7355;
    /* ... */
}
```

### Content

- Edit text content directly in `index.html`
- Update services, features, and contact information
- Modify meta tags for SEO

### Animation Speed

Adjust animation timing in `css/animations.css` and `js/soc-animation.js`

### Contact Form

The contact form currently uses a simulated submission. To connect to a backend:

1. Edit `initContactForm()` in `js/main.js`
2. Replace `simulateFormSubmission()` with your API endpoint
3. Add proper error handling

Example:
```javascript
const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
});
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Optimized canvas animations using `requestAnimationFrame`
- Intersection Observer for scroll animations
- Minimal dependencies (only Font Awesome and Google Fonts CDN)
- Responsive images and lazy loading support

## Accessibility

- Semantic HTML structure
- ARIA labels where needed
- Reduced motion support via `prefers-reduced-motion`
- Keyboard navigation support
- High contrast golden-brown on black theme

## Credits

- **Icons**: Font Awesome 6.5.1
- **Fonts**: Google Fonts (Space Grotesk, Inter)
- **Design**: Custom design for cybersecurity industry
- **Animation**: Custom canvas-based SOC visualization

## License

This project is for Digital Insights cybersecurity company.

## Support

For questions or support regarding this website:
- Email: info@digitalinsights.ae
- Phone: +971 4 2415888 (24/7 Emergency Hotline)

---

Built with modern web technologies for optimal performance and user experience.
