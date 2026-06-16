# 🧬 Cancer Biology Lab — Dr. Sanjay Kumar | AIIMS Bathinda

**Live URL:** [DrRajputsLabAIIMSBTI.in](https://DrRajputsLabAIIMSBTI.in)

A professional, fully responsive, animated academic lab website for Dr. Sanjay Kumar's Cancer Biology Laboratory at AIIMS Bathinda.

---

## 📁 Project Structure

```
DrRajputsLabAIIMSBTI/
├── index.html              # Main website (all sections)
├── css/
│   ├── style.css           # Core design system & components
│   └── animations.css      # All animation keyframes & scroll reveals
├── js/
│   ├── animations.js       # Canvas particles, scroll reveal, counters
│   ├── publications.js     # Publication filter logic
│   └── main.js             # Navigation, dark mode, contact form
├── assets/
│   └── images/
│       ├── hero_background.png
│       └── pi_profile.png
└── README.md
```

---

## ✨ Features

- **Hero Section** with animated DNA particle canvas, parallax background, animated counters
- **Research Cards** — 6 flip-card projects (ETS1/EMT, Tadalafil/TNBC, cfDNA/ctDNA, CSCs, TME, Epigenetics)
- **Team Section** — PI featured card + 8 interactive flip member cards
- **Publications** — 8 papers with year/topic filter tabs and scroll-reveal
- **News & Events** — Animated bilateral timeline with icons and tags
- **Blog** — 6 card grid with hover lift effects
- **Resources** — Downloadable CV, brochure, SOPs, datasets
- **Contact Form** — Validated form with simulated submission + toast notifications
- **Dark Mode** — Persistent dark/light toggle with smooth transition
- **Mobile Responsive** — Hamburger menu, stacked layouts for all breakpoints

---

## 🚀 Deployment Instructions

### Option A: Netlify (Recommended — Free)

1. **Create a GitHub Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Cancer Biology Lab website"
   git remote add origin https://github.com/YOUR_USERNAME/DrRajputsLabAIIMSBTI.git
   git push -u origin main
   ```

2. **Connect to Netlify**
   - Go to [app.netlify.com](https://app.netlify.com) → "New site from Git"
   - Choose your GitHub repo
   - Build settings: Leave blank (static site)
   - Deploy!

3. **Add Custom Domain**
   - In Netlify → Domain settings → Add custom domain: `DrRajputsLabAIIMSBTI.in`
   - Update your domain registrar's nameservers to Netlify's:
     ```
     dns1.p04.nsone.net
     dns2.p04.nsone.net
     dns3.p04.nsone.net
     dns4.p04.nsone.net
     ```
   - SSL is automatically provisioned via Let's Encrypt (free) ✅

4. **Verify DNS propagation** (can take 24–48 hours)

### Option B: GitHub Pages (Free)

1. Push code to a GitHub repo named `DrRajputsLabAIIMSBTI`
2. Go to Settings → Pages → Source: `main` branch → root folder
3. For custom domain: Add `CNAME` file to repo root containing `DrRajputsLabAIIMSBTI.in`
4. Set DNS at your registrar:
   ```
   A record → 185.199.108.153
   A record → 185.199.109.153
   CNAME www → YOUR_USERNAME.github.io
   ```

### Option C: Direct Server (Shared Hosting / VPS)

- Upload all files to `public_html/` or `www/` via cPanel or SFTP
- Ensure the domain `DrRajputsLabAIIMSBTI.in` points to server IP
- Enable HTTPS via Let's Encrypt (cPanel → SSL/TLS → Auto SSL)

---

## 🌐 Custom Domain Setup (DrRajputsLabAIIMSBTI.in)

1. **Purchase domain** at [GoDaddy](https://godaddy.com), [BigRock](https://bigrock.in), or [Namecheap](https://namecheap.com)
2. **Point to Netlify** by updating nameservers (see Netlify instructions above)
3. **SSL** is auto-enabled via Netlify's Let's Encrypt integration

---

## 🎨 Customization Guide

### Update PI Information
Edit `index.html` → search for `Dr. Sanjay Kumar` and update:
- Name, department, degrees
- Email: `sanjay.kumar@aiimsbathinda.edu.in`
- Phone number (currently placeholder)

### Update Publications
Edit `index.html` → `<div id="pub-list">` section:
- Add new `<article class="pub-item">` elements
- Set `data-year` and `data-topic` attributes for filtering

### Update Team Members
Edit `index.html` → `<div class="team-grid">` section:
- Replace emoji avatars with actual `<img>` tags
- Update names, roles, bios, and interest tags

### Update Colors
Edit `css/style.css` → `:root` section:
```css
--primary:   #1a237e;   /* Deep Navy */
--accent:    #ff6b6b;   /* Coral */
--teal:      #00bcd4;   /* Teal */
```

### Add Team Photos
Replace emoji avatars in `.member-avatar` divs with:
```html
<img src="assets/images/member_name.jpg" alt="Name" />
```

---

## 📧 Contact Form — Backend Integration

The contact form currently simulates submission (frontend only). To enable real email delivery:

### Option 1: Netlify Forms (Easiest)
Add `netlify` attribute to the form tag:
```html
<form id="contact-form" netlify name="contact">
```
Netlify auto-processes submissions and emails them to you.

### Option 2: Formspree
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

### Option 3: EmailJS (No backend needed)
```js
emailjs.send('service_id', 'template_id', formData, 'public_key');
```

---

## ♿ Accessibility

- Semantic HTML5 with ARIA labels
- Focus management for keyboard navigation
- High contrast color ratios
- Screen reader announcements for dynamic content
- Skip navigation support

---

## 🔧 Performance Tips

- Compress images using [Squoosh](https://squoosh.app) before deployment
- Enable Netlify's asset optimization (CSS/JS minification)
- Add `loading="lazy"` to below-fold images
- Consider adding a `sitemap.xml` for SEO

---

## 📞 Support

For questions about the website, contact:
- **Email:** sanjay.kumar@aiimsbathinda.edu.in
- **Domain:** DrRajputsLabAIIMSBTI.in

---

*© 2024 Cancer Biology Lab, AIIMS Bathinda. Dr. Sanjay Kumar.*
