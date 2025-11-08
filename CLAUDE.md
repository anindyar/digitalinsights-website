# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static website for Digital Insights, a UAE-based cybersecurity company. Features a canvas-based animated SOC (Security Operations Center) visualization with real-time threat detection display. Pure HTML/CSS/JavaScript with no framework dependencies.

## Local Development

```bash
# Start local server (Python)
python -m http.server 8000

# Start local server (Node.js)
npx http-server

# Access at
http://localhost:8000
```

Open `index.html` directly in a browser for quick testing.

## Architecture

### File Organization

- **index.html** - Single-page website structure, all content sections
- **css/main.css** - Core styles, CSS variables, layout, colors
- **css/animations.css** - Keyframe animations and transition effects
- **css/responsive.css** - Media queries (480px, 768px, 1024px breakpoints)
- **js/soc-animation.js** - Canvas animation system (SOCAnimation class)
- **js/main.js** - Interactive features, navigation, scroll effects

### Core Color Scheme

```css
--cyan-primary: #00D9FF      /* Primary accent */
--cyan-bright: #00F0FF       /* Highlights */
--cyan-glow: #00BFFF         /* Secondary cyan */
--gold-primary: #D4AF37      /* Hover states only */
--red: #FF4444               /* Threats/alerts */
--green: #00FF88             /* Success/blocked threats */
```

**Important**: Headers are white, cyan for accents, gold reserved for hovers. Background is dark blue gradient with 10% white tint overlay using `background-blend-mode: lighten`.

### Canvas Animation System

**SOCAnimation class** (js/soc-animation.js) manages all hero banner animations:

**Key Methods:**
- `createParticles()` - Floating dots (count = canvas.width/60, speed = 0.1)
- `createMonitors()` - 6 hexagonal security assets spread across banner width
- `createWorldLocations()` - 8 country markers (USA, EU, UAE, China, Japan, Brazil, Africa, Australia)
- `createAttacks()` - 10 attack line animations between countries
- `drawWorldMapGrid()` - Latitude/longitude grid (80px spacing, 15% opacity)
- `animate()` - Main render loop using requestAnimationFrame

**Animation Constraints:**
- Canvas opacity: 85% (visible but not overwhelming)
- Overlay: 30-40% dark gradient for text readability
- Particle speed: 0.1 velocity (very slow, deliberate)
- Attack speed: 0.001-0.002 (smooth, subtle)
- Hexagon opacity: 50% stroke, 8% fill (subdued to not interfere with text)
- Center area kept clear for hero text

**World Map Layout:**
```javascript
// Countries positioned to avoid center where text is
// Top row: USA (12%, 25%), EU (30%, 18%), UAE (52%, 20%), China (75%, 25%)
// Middle: Japan (88%, 45%)
// Bottom: Brazil (15%, 75%), Africa (35%, 82%), Australia (82%, 78%)
// UAE is main marker (green), others cyan
```

**Attack Visualization:**
- Red lines/packets = Detected threats
- Green lines/packets = Blocked attacks
- Dotted lines with moving packets
- Status labels ("DETECTED" / "BLOCKED") at mid-flight

### Interactive Features (main.js)

**Module Structure:**
- `initNavigation()` - Scroll effects, mobile menu, active link detection
- `initScrollAnimations()` - Intersection Observer for fade-in effects (threshold: 0.1)
- `initCounterAnimations()` - Number counters on scroll (500+, 1M+, etc.)
- `initSmoothScroll()` - Anchor link smooth scrolling (-70px offset for navbar)
- `initContactForm()` - Form validation and submission (currently simulated)
- `initScrollProgress()` - Top progress bar indicator
- `initParallax()` - Subtle parallax on hero content (0.5x speed)

**Scroll Animation System:**
Uses Intersection Observer (not AOS library) with `data-aos` attributes. Elements get `.aos-animate` class when intersecting. One-time trigger (unobserve after animation).

## Key Design Principles

1. **Text Readability Over Animation**: Always prioritize readable text. Animations are subdued with overlays.
2. **Gradient Backgrounds**: Hero title, emergency badge, and secondary button have radial/linear gradient white tints (10-15%) that fade outward
3. **Logo**: Official Digital Insights logo from https://digitalinsights-uae.com/wp-content/uploads/2021/11/digitalinsightslogo.webp with white background for black text readability
4. **Emergency Badge**: Located at BOTTOM of hero section (not top), with 10% white tint overlay
5. **Hexagons**: Use exact 60° angle geometry for all hexagonal shapes (canvas)
6. **Performance**: Target 60fps, use requestAnimationFrame, minimize particle count

## Customization Guide

### Changing Animation Speed

In `js/soc-animation.js`:
```javascript
// Particle speed (line 58-59)
vx: (Math.random() - 0.5) * 0.1,  // Increase multiplier for faster

// Attack speed (line 136)
speed: 0.001 + Math.random() * 0.001,  // Increase for faster attacks
```

### Changing Colors

In `css/main.css`, edit `:root` variables. Remember:
- Cyan = primary accent (animations, borders, icons)
- Gold = hover states only
- White = all headers and primary text

### Adjusting Canvas Opacity

In `css/main.css`:
```css
#socCanvas {
    opacity: 0.85;  /* 85% visible - balance with overlay */
}

.hero::before {
    background: linear-gradient(...);  /* 30-40% dark overlay */
}
```

### Adding Countries to World Map

In `js/soc-animation.js`, edit `createWorldLocations()`:
```javascript
// Add to worldLocations array
{ x: this.canvas.width * X_PERCENT, y: this.canvas.height * Y_PERCENT, label: 'NAME', pulsing: 0 }

// Mark main location with isMain: true (gets green color)
```

Then adjust `createAttacks()` attack count to match country count (typically count = countries + 2).

## Contact Form Integration

Currently uses simulated submission. To connect backend:

In `js/main.js`, replace `simulateFormSubmission()` (line 228):
```javascript
async function submitToBackend(formData) {
    const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    });
    if (!response.ok) throw new Error('Submission failed');
    return response.json();
}
```

Then update `initContactForm()` line 212 to call `submitToBackend(formData)`.

## Responsive Design

**Breakpoints:**
- Mobile: 480px (1 column layouts)
- Tablet: 768px (2 column service grid, stacked about section)
- Desktop: 1024px (full 3 column service grid)

**Mobile Considerations:**
- Navigation converts to hamburger menu at 768px
- Canvas animations scale with viewport
- Service cards stack vertically
- Statistics grid changes from 2x2 to 1x4

## Performance Notes

- Particle count scales with screen width (`width / 60`)
- Canvas clears and redraws every frame (requestAnimationFrame)
- Intersection Observer only triggers once per element (unobserve after animation)
- No external libraries except Font Awesome and Google Fonts (CDN)
- Reduced motion support via CSS `prefers-reduced-motion`

## Deployment

Static site - deployable to any hosting:
- Netlify: Drag/drop or git integration
- Vercel: `vercel` command
- GitHub Pages: Enable in repo settings
- Traditional: FTP/SFTP all files

No build process required. Files work as-is.

## Important Constraints

**DO NOT:**
- Change logo source or remove white background
- Move emergency badge back to top
- Increase animation opacity beyond 85% (text readability)
- Use gold for primary colors (gold is hover only)
- Add animations to center area (conflicts with text)
- Reduce white tint overlays (needed for visibility)

**DO:**
- Maintain radial gradient fade on hero title background
- Keep country markers evenly distributed, avoiding center
- Test canvas animations at different screen sizes
- Preserve 10% white tint on background via blend mode
- Keep attack line opacity at 50-60% (subdued)

## Browser Compatibility

Requires:
- Canvas 2D Context API
- CSS Custom Properties
- CSS Grid & Flexbox
- Intersection Observer API
- RequestAnimationFrame
- CSS Blend Modes

All modern browsers (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+) fully supported.

## Common Tasks

**Adjust banner text background:**
In `css/main.css`, find `.hero-title` radial gradient. Center opacity controls brightness, edge should remain transparent for fade effect.

**Change attack visualization:**
In `js/soc-animation.js`, `drawAttackLines()` method controls line drawing, packet movement, and status labels. Red = detected, Green = blocked.

**Modify hexagon assets:**
In `js/soc-animation.js`, `createMonitors()` defines positions, `drawMonitors()` handles rendering. Hexagons use 60° angles via `drawHexagon()`.

**Update statistics:**
In `index.html`, change `data-target` attributes on stat elements. Counter animation handles M/K formatting automatically.

## References

- [PROJECT_DOCUMENTATION.md](PROJECT_DOCUMENTATION.md) - Complete technical documentation (40+ pages)
- [README.md](README.md) - Quick reference guide
- Component reference image: `component-of-cybersecurity.webp` (design inspiration)
