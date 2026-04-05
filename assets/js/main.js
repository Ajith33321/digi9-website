// ===== STAR FIELD CANVAS =====
(function() {
  const canvas = document.getElementById('starfield');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let stars = [];
  const STAR_COUNT = 150; // Performance limits, bright stars

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
        size: Math.random() * 2.5 + 0.5,
        speed: Math.random() * 0.4 + 0.05,
        opacity: Math.random() * 0.8 + 0.2,
        twinkleSpeed: Math.random() * 0.05 + 0.01,
        twinklePhase: Math.random() * Math.PI * 2,
        isIceBlue: Math.random() > 0.8 // 20% ice blue stars
      });
    }
  }

  function drawStars(time) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(s => {
      const twinkle = Math.sin(time * 0.001 * s.twinkleSpeed + s.twinklePhase) * 0.4 + 0.6;
      
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      
      if (s.isIceBlue) {
        ctx.fillStyle = `rgba(180, 230, 255, ${s.opacity * twinkle})`;
        ctx.shadowColor = 'rgba(180, 230, 255, 0.8)';
      } else {
        ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity * twinkle})`;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
      }
      
      // Add subtle bloom to slightly larger stars
      if (s.size > 1.5) {
        ctx.shadowBlur = s.size * 3;
      } else {
        ctx.shadowBlur = 0;
      }
      
      ctx.fill();

      // Parallax-like drift (independent of scroll, just ambient)
      s.y -= s.speed;
      if (s.y < -10) {
        s.y = canvas.height + 10;
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


// ===== 3D PARALLAX SCROLL (Desktop Only) =====
(function() {
  // Only activate on minimum desktop widths
  if (window.innerWidth < 1024) return;

  const elements = Array.from(document.querySelectorAll('[data-depth]'));
  if (!elements.length) return;

  let ticking = false;

  function updateParallax() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    
    for (let i = 0; i < elements.length; i++) {
      const el = elements[i];
      // Positive depth goes towards user (moves fast upwards)
      // Negative depth goes away from user (moves slow upwards or even downwards relative to screen)
      const depth = parseFloat(el.getAttribute('data-depth')) || 0;
      const yPos = scrollY * (depth / 100); 
      
      // Using translate3d for hardware acceleration
      el.style.transform = `translate3d(0, ${yPos}px, 0)`;
    }
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });
})();


// ===== MASCOT CAROUSEL SCROLLER =====
(function() {
  const canvas = document.getElementById('mascot-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const TOTAL_FRAMES = 240;
  let frames = [];
  let imagesLoaded = 0;
  let currentFrame = 0;

  // Preload frames
  for (let i = 1; i <= TOTAL_FRAMES; i++) {
    const img = new Image();
    const frameNumber = i.toString().padStart(3, '0');
    img.src = `/assets/mascot/ezgif-frame-${frameNumber}.png`;
    img.onload = () => { imagesLoaded++; drawFrame(); };
    img.onerror = () => { imagesLoaded++; };
    frames.push(img);
  }

  function drawFrame() {
    if (imagesLoaded < TOTAL_FRAMES && currentFrame === 0) return; // Wait a bit
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const img = frames[currentFrame];
    if (img && img.complete && img.width > 0) {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
  }

  // Scroll Scrubbing Logic
  window.addEventListener('scroll', () => {
    // Determine scroll percentage (0 to 1)
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    
    // Safety check for short pages
    if (maxScroll <= 0) return;
    
    let scrollPercent = scrollTop / maxScroll;
    if (scrollPercent < 0) scrollPercent = 0;
    if (scrollPercent > 1) scrollPercent = 1;

    // Handle Mascot Visibility (Fade out at footer)
    const mascotContainer = canvas.parentElement;
    if (mascotContainer) {
      if (scrollPercent > 0.85) {
        let opacity = 1 - (scrollPercent - 0.85) * 6.6; 
        mascotContainer.style.opacity = Math.max(0, opacity).toString();
      } else {
        mascotContainer.style.opacity = '1';
      }
    }

    // Map percentage to frame index
    let frameIndex = Math.floor(scrollPercent * (TOTAL_FRAMES - 1));
    if (frameIndex !== currentFrame) {
      currentFrame = frameIndex;
      drawFrame();
    }
  }, { passive: true });

  // Fallback initial draw if preloading takes a while
  setTimeout(drawFrame, 500);

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
