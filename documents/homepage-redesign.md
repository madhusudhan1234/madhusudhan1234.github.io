# Homepage Redesign Plan - Brittany Chiang Style

## Overview
This document outlines the content and components needed to redesign the homepage following the style of [Brittany Chiang's website](https://brittanychiang.com/).

## Missing Content Elements
Based on a review of the current homepage, these are the specific content elements that need to be created:

1. **Hero Section Content**
   - Large, bold display of "Madhu Sudhan Subedi"
   - Professional title: "Software Engineer specializing in web development"
   - Brief tagline about your approach to development

2. **Experience Timeline Content**
   - Need at least 3-4 work experiences with:
     - Company names and locations
     - Position titles
     - Date ranges
     - Responsibilities and achievements
     - Technologies used for each position

3. **Projects Content**
   - Need 4-6 featured projects with:
     - Project names
     - Descriptions
     - Technologies used
     - Links to GitHub/live sites
     - Screenshots or visual representations

4. **Skills & Technologies Content**
   - Categorized list of skills:
     - Languages (JavaScript, PHP, etc.)
     - Frameworks (React, Laravel, etc.)
     - Tools & Platforms (Git, AWS, etc.)
     - Soft skills

5. **Navigation Elements**
   - Section links (About, Experience, Projects, Contact)
   - Social media links (GitHub, LinkedIn, Twitter)
   - Resume download option

## Key Sections to Implement

### 1. Minimalist Hero Section
- Large, bold name display (your name as the focal point)
- Brief professional title/description
- Clean, dark background with accent color highlights
- Subtle animations for text appearance

### 2. About Section
- Personal introduction paragraph (2-3 sentences about yourself)
- Current professional role and focus
- Key skills and interests
- Personal touch (hobbies, interests outside of work)

### 3. Experience Timeline
- Chronological work history (most recent first)
- For each position:
  - Years active
  - Company name with possible link
  - Job title
  - Technologies used (as tags/pills)
  - Brief description of responsibilities
  - Notable achievements or projects

### 4. Projects Showcase
- Featured projects in card format
- For each project:
  - Project title
  - Brief description
  - Technologies used (as tags)
  - Links to live site and repository
  - Optional screenshot or visual

### 5. Skills & Technologies
- Visual representation of technical skills
- Organized by category (languages, frameworks, tools)
- Skill level indicators or years of experience

### 6. Minimal Navigation
- Fixed position navigation
- Links to main sections of the site
- Social media/contact icons
- Dark/light mode toggle

## Design Elements

### Color Scheme
- Primary dark background (#0a192f or similar)
- Light text for contrast (#e6f1ff or similar)
- Accent color for highlights and hover states (#64ffda or similar)
- Secondary background for cards/sections (#112240 or similar)

### Typography
- Sans-serif fonts for clean, modern look
- Monospace font for code elements or technical details
- Variable font weights for hierarchy
- Consistent line heights and letter spacing

### Interactive Elements
- Subtle hover animations
- Smooth scrolling between sections
- Animated transitions for content loading
- Micro-interactions for buttons and links

### Responsive Design
- Mobile-first approach
- Collapsible navigation for smaller screens
- Adjusted layouts for different viewport sizes
- Touch-friendly interactive elements

## Technical Requirements

### Frontend Framework
- Continue using Astro or consider React components
- CSS modules or styled components for styling
- Framer Motion or similar for animations

### Performance Considerations
- Lazy loading for images
- Code splitting for faster initial load
- Optimized assets (SVGs where possible)
- Minimal third-party dependencies

### Accessibility
- Semantic HTML structure
- Keyboard navigation support
- Proper contrast ratios
- Screen reader friendly content
- ARIA attributes where necessary

## Implementation Plan
1. Create new component structure
2. Implement base styling and theme
3. Develop individual sections
4. Add animations and interactions
5. Ensure responsive behavior
6. Test for accessibility and performance
7. Deploy updated site

## References
- [Brittany Chiang's Website](https://brittanychiang.com/)
- [GitHub Repository](https://github.com/bchiang7/v4) (if available)