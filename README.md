# e2People Limited - Landing Website

A modern, fully functional landing website for e2People Limited, a tech-enabled digital services agency based in Bangladesh.

## ✨ Features Implemented

### 1. **Responsive Design**
- Mobile-first approach with Tailwind CSS
- Desktop, tablet, and mobile layouts fully optimized
- Hamburger menu for mobile navigation
- Smooth scrolling navigation

### 2. **Sections Built**
- **Hero** - Eye-catching intro with gradient heading and CTAs
- **About** - Company mission with 3 pillar cards (Innovation, Scalability, Sustainability)
- **Services** - 6 service cards with hover effects
- **Products** - 3 featured products (VMS, PEPMIS, Textile ERP) with descriptions
- **Partners** - Logo grid for 5 partner companies
- **Team** - 3 team member profiles with photos
- **Contact** - Functional contact form with validation
- **Footer** - Links and contact information

### 3. **Animations & Interactions**
- ✅ Smooth scroll navigation (all nav links glide to sections)
- ✅ Scroll-triggered reveal animations (fade + slide effects)
- ✅ Staggered card animations (appear one after another)
- ✅ Hover effects on all interactive elements (cards lift, buttons scale)
- ✅ Sticky navbar (visible while scrolling)
- ✅ Mobile hamburger menu with smooth transitions
- ✅ Form validation with error messages
- ✅ Success message after form submission

### 4. **Contact Form**
- Real-time validation
- Email format checking
- Required field validation
- Loading state during submission
- Success/error messages with animations
- Form reset after successful submission

### 5. **Brand Integration**
- Logo loaded from `/public/logo.png`
- Brand colors: Deep blue (#1e3a5f) and light blue (#3b5998)
- All product images integrated
- Partner logos displayed
- Team member photos included

## 🚀 Getting Started

### Installation
```bash
cd e2people-website
npm install
```

### Development
```bash
npm run dev
```
The site will be available at `http://localhost:3000`

### Build for Production
```bash
npm run build
```
Output will be in the `dist/` folder.

## 📁 Project Structure

```
e2people-website/
├── public/                 # Static assets
│   ├── logo.png           # Company logo
│   ├── products/          # Product images
│   ├── partners/          # Partner logos
│   └── team/              # Team member photos
├── src/
│   ├── components/        # React components (one per section)
│   │   ├── Navbar.jsx     # Sticky navigation with smooth scroll
│   │   ├── Hero.jsx       # Main hero section
│   │   ├── About.jsx      # Company info & values
│   │   ├── Services.jsx   # Service offerings
│   │   ├── Products.jsx   # Product showcase
│   │   ├── Partners.jsx   # Partner logos
│   │   ├── Team.jsx       # Team members
│   │   ├── Contact.jsx    # Contact form
│   │   └── Footer.jsx     # Footer section
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles & animations
├── index.html             # HTML entry point
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── postcss.config.js      # PostCSS configuration
└── package.json           # Dependencies
```

## 🛠️ Technology Stack

- **React** 18.2 - UI library
- **Vite** 5.0 - Build tool
- **Tailwind CSS** 3.3 - Styling
- **Framer Motion** 10.16 - Animations
- **React Scroll** 1.8 - Smooth scroll navigation
- **React Hook Form** 7.48 - Form handling

## 📋 Component Documentation

Each component includes brief comments explaining:
- What the component does
- How to customize it
- Key props and configuration

### Easy Customization

**Change Brand Colors:**
Edit `tailwind.config.js`:
```javascript
colors: {
  brand: {
    dark: '#1e3a5f',    // Change these
    light: '#3b5998',
    accent: '#00a86b',
  }
}
```

**Update Contact Information:**
Edit the `contactInfo` array in `Contact.jsx`:
```javascript
const contactInfo = [
  { label: 'Email', value: 'your@email.com' },
  // ...
]
```

**Add/Remove Services:**
Edit the `services` array in `Services.jsx` to add, remove, or modify service cards.

**Update Team Members:**
Edit the `team` array in `Team.jsx` with new team photos and descriptions.

## ✅ Testing Checklist

- ✅ All pages load without errors
- ✅ Smooth scroll navigation works on all links
- ✅ Mobile menu opens/closes correctly
- ✅ Animations trigger on scroll
- ✅ Contact form validates input
- ✅ Contact form shows success message
- ✅ All images load properly
- ✅ Responsive design works on mobile (375px) and desktop
- ✅ Hover effects visible on cards and buttons
- ✅ Sticky navbar stays fixed while scrolling

## 📦 Deployment

### Deploy to Vercel (Recommended)
1. Push to GitHub
2. Connect repo to Vercel
3. Vercel auto-deploys on push

### Deploy to Netlify
1. Run `npm run build`
2. Drag `dist/` folder to Netlify
3. Or connect GitHub for auto-deploys

## 🎨 Design Notes

- **Minimalist aesthetic** with generous whitespace
- **Professional typography** using Inter font
- **Consistent spacing** following a 4px grid
- **Smooth transitions** on all interactive elements
- **Accessible color contrast** for readability
- **Responsive breakpoints** optimized for all screen sizes

## 📞 Support

For questions or modifications:
- Edit components directly in `src/components/`
- Update content arrays within each component
- Modify styles using Tailwind classes
- Adjust animations in framer-motion configuration

---

**Built with ❤️ for e2People Limited**
