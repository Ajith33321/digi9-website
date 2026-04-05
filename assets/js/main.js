// ===== STAR FIELD CANVAS =====
(function() {
  const canvas = document.getElementById('starfield');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let stars = [];
  const STAR_COUNT = 200;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createStars() {
    stars = [];
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.8 + 0.2,
        speed: Math.random() * 0.3 + 0.05,
        opacity: Math.random() * 0.8 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2
      });
    }
  }

  function drawStars(time) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(s => {
      const twinkle = Math.sin(time * s.twinkleSpeed + s.twinklePhase) * 0.3 + 0.7;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity * twinkle})`;
      ctx.fill();

      // Slow drift
      s.y -= s.speed;
      if (s.y < -5) {
        s.y = canvas.height + 5;
        s.x = Math.random() * canvas.width;
      }
    });
    requestAnimationFrame(drawStars);
  }

  resize();
  createStars();
  requestAnimationFrame(drawStars);
  window.addEventListener('resize', () => { resize(); createStars(); });
})();


// ===== SHOOTING STARS =====
(function() {
  function fireShootingStar() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    const star = document.createElement('div');
    star.className = 'shooting-star';
    star.style.top = Math.random() * 40 + '%';
    star.style.left = Math.random() * 30 + '%';
    star.style.width = (Math.random() * 80 + 80) + 'px';
    hero.appendChild(star);
    requestAnimationFrame(() => star.classList.add('fire'));
    setTimeout(() => star.remove(), 1200);
  }
  // Fire every 3-7 seconds
  function scheduleShoot() {
    const delay = 3000 + Math.random() * 4000;
    setTimeout(() => { fireShootingStar(); scheduleShoot(); }, delay);
  }
  scheduleShoot();
})();


// ===== FLOATING PARTICLES =====
(function() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  for (let i = 0; i < 15; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.bottom = '-10px';
    p.style.animationDuration = (8 + Math.random() * 12) + 's';
    p.style.animationDelay = Math.random() * 10 + 's';
    p.style.width = p.style.height = (2 + Math.random() * 3) + 'px';
    hero.appendChild(p);
  }
})();


// ===== SCROLL REVEAL (Intersection Observer) =====
(function() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        // Staggered delay for cards
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => entry.target.classList.add('visible'), delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  // Observe all reveal elements
  document.querySelectorAll('.reveal, .reveal-card').forEach((el, i) => {
    if (el.classList.contains('reveal-card')) {
      el.dataset.delay = i * 100; // stagger cards
    }
    observer.observe(el);
  });
})();


// ===== CONTACT FORM =====
function handleFormSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('button[type="submit"]');
  const success = document.getElementById('formSuccess');
  btn.textContent = 'Sending...';
  btn.disabled = true;
  setTimeout(() => {
    form.style.display = 'none';
    if (success) success.style.display = 'block';
  }, 1500);
}
