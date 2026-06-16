/* ============================================================
   MAIN.JS — Navigation, Dark Mode, Mobile Menu, Contact Form
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Dark Mode Toggle ────────────────────────────────────────
  const darkToggle = document.getElementById('dark-toggle');
  const darkIcon = document.getElementById('dark-icon');
  const html = document.documentElement;

  // Load saved preference
  const savedTheme = localStorage.getItem('theme') || 'light';
  html.setAttribute('data-theme', savedTheme);
  darkIcon.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

  darkToggle?.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    darkIcon.textContent = next === 'dark' ? '☀️' : '🌙';

    // Subtle animation
    darkToggle.style.transform = 'rotate(360deg) scale(1.2)';
    setTimeout(() => { darkToggle.style.transform = ''; }, 400);
  });

  // ── Mobile Hamburger ────────────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  hamburger?.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Close mobile nav on link click
  navLinks?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger?.classList.remove('active');
      hamburger?.setAttribute('aria-expanded', 'false');
    });
  });

  // Close mobile nav on outside click
  document.addEventListener('click', (e) => {
    if (
      navLinks?.classList.contains('open') &&
      !navLinks.contains(e.target) &&
      !hamburger?.contains(e.target)
    ) {
      navLinks.classList.remove('open');
      hamburger?.classList.remove('active');
      hamburger?.setAttribute('aria-expanded', 'false');
    }
  });

  // ── Navbar scroll behavior ──────────────────────────────────
  const navbar = document.getElementById('navbar');

  function handleNavbarScroll() {
    if (window.scrollY > 20) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll(); // run on load

  // ── Active nav link on scroll ───────────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinkEls = document.querySelectorAll('.nav-links a');

  function updateActiveNav() {
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < bottom) {
        navLinkEls.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });

  // ── Smooth scroll for all internal anchors ──────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      const navHeight = document.getElementById('navbar')?.offsetHeight || 72;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight;

      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    });
  });

  // ── Flip card touch support ─────────────────────────────────
  document.querySelectorAll('.flip-card, .member-card').forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
    });
  });

  // ── Button ripple effect ────────────────────────────────────
  document.querySelectorAll('.btn, .form-submit').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    });
  });

  // ── Toast notification utility ──────────────────────────────
  function showToast(message, duration = 3500) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), duration);
  }

  // ── Contact Form Submission ─────────────────────────────────
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('form-submit-btn');

  contactForm?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const fname = document.getElementById('fname').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Basic validation
    if (!fname) {
      showToast('⚠️ Please enter your name.', 3000);
      document.getElementById('fname').focus();
      return;
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showToast('⚠️ Please enter a valid email address.', 3000);
      document.getElementById('email').focus();
      return;
    }

    if (!message || message.length < 10) {
      showToast('⚠️ Please enter a message (at least 10 characters).', 3000);
      document.getElementById('message').focus();
      return;
    }

    // Simulate form submission
    submitBtn.disabled = true;
    submitBtn.textContent = '⏳ Sending…';

    await new Promise(r => setTimeout(r, 1800));

    submitBtn.textContent = '✅ Message Sent!';
    submitBtn.style.background = 'linear-gradient(135deg, #43a047, #66bb6a)';

    showToast('✅ Thank you! Your message has been sent. We\'ll be in touch soon.', 5000);

    contactForm.reset();

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = '📨 Send Message';
      submitBtn.style.background = '';
    }, 4000);
  });

  // ── Progress bars in resource cards (animated on view) ───────
  const progressObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.progress-fill').forEach(fill => {
            fill.style.width = fill.style.getPropertyValue('--progress-width') || '70%';
          });
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll('.resource-card').forEach(card => progressObserver.observe(card));

  // ── Keyboard accessibility for flip cards ───────────────────
  document.querySelectorAll('.flip-card, .member-card').forEach(card => {
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.classList.toggle('flipped');
      }
    });
  });

  // ── Scroll-triggered nav label detection ───────────────────
  // Ensure counters fire once hero is visible
  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    const heroObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) {
            // User has scrolled past hero; fire counter animations
          }
        });
      },
      { threshold: 0 }
    );
    heroObserver.observe(heroSection);
  }

  console.log('%c🧬 Cancer Biology Lab — AIIMS Bathinda', 'color:#ff6b6b;font-size:1.2rem;font-weight:bold;');
  console.log('%cDr. Sanjay Kumar | DrRajputsLabAIIMSBTI.in', 'color:#00bcd4;font-size:0.9rem;');
});
