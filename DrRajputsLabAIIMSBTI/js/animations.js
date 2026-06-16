/* ============================================================
   ANIMATIONS.JS — Scroll Reveal & Canvas Particles
   ============================================================ */

// ── Page Loader ──────────────────────────────────────────────
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('page-loader');
    if (loader) loader.classList.add('fade-out');
  }, 1800);
});

// ── Intersection Observer: Scroll Reveal ─────────────────────
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Don't unobserve so we keep it visible
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── Scroll Progress Bar ───────────────────────────────────────
function updateScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  bar.style.width = pct + '%';
}

window.addEventListener('scroll', updateScrollProgress, { passive: true });

// ── Canvas Particle System (DNA particles in hero) ────────────
function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  resize();
  window.addEventListener('resize', resize);

  const particles = [];
  const PARTICLE_COUNT = 60;

  function createParticle() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.6,
      speedY: (Math.random() - 0.5) * 0.6,
      opacity: Math.random() * 0.5 + 0.1,
      color: Math.random() > 0.5 ? '#4dd0e1' : '#ff6b6b',
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.02 + 0.01,
    };
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(createParticle());
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(77, 208, 225, ${0.15 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawConnections();

    particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;
      p.pulse += p.pulseSpeed;

      // Wrap around edges
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      const pulsedOpacity = p.opacity + Math.sin(p.pulse) * 0.1;
      const pulsedSize = p.size + Math.sin(p.pulse) * 0.5;

      ctx.beginPath();
      ctx.arc(p.x, p.y, pulsedSize, 0, Math.PI * 2);
      ctx.fillStyle = p.color.replace(')', `, ${pulsedOpacity})`).replace('rgb', 'rgba').replace('#4dd0e1', `rgba(77,208,225,${pulsedOpacity})`).replace('#ff6b6b', `rgba(255,107,107,${pulsedOpacity})`);

      // Simpler approach
      ctx.globalAlpha = pulsedOpacity;
      ctx.fillStyle = p.color;
      ctx.fill();
      ctx.globalAlpha = 1;
    });

    requestAnimationFrame(animate);
  }

  animate();
}

// ── Animated Number Counters ─────────────────────────────────
function animateCounter(el, target, duration = 2000) {
  let start = 0;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(eased * target);
    el.textContent = current;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target + '+';
    }
  }

  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        if (!isNaN(target)) animateCounter(el, target);
        counterObserver.unobserve(el);
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

// ── Parallax effect on hero bg ────────────────────────────────
function initParallax() {
  const heroBgImage = document.querySelector('.hero-bg-image');
  if (!heroBgImage) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    heroBgImage.style.transform = `translateY(${scrollY * 0.3}px)`;
  }, { passive: true });
}

// ── Init on DOM ready ─────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initParallax();
});
