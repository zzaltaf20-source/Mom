/* ==========================================================================
   INTERACTIVE MOTHER'S DAY EXPERIENCE — DYNAMIC 1:1 VECTOR CONVERGENCE
   ========================================================================== */

(function () {
  'use strict';

  // --- Element Bindings ---
  const canvas = document.getElementById('stageCanvas');
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  const bgMusic = document.getElementById('bgMusic');
  const soundBtn = document.getElementById('soundBtn');
  const shockwave = document.getElementById('shockwave');

  const startSurpriseBtn = document.getElementById('startSurpriseBtn');
  const portalTrigger = document.getElementById('portalTrigger');
  const toLetterBtn = document.getElementById('toLetterBtn');
  const unveilStarsBtn = document.getElementById('unveilStarsBtn');
  const assembleHint = document.getElementById('assembleHint');
  const finaleContent = document.getElementById('finaleContent');
  const replayBtn = document.getElementById('replayBtn');

  const scenes = {
    1: document.getElementById('scene1'),
    2: document.getElementById('scene2'),
    3: document.getElementById('scene3'),
    4: document.getElementById('scene4')
  };

  const stepIndicators = {
    1: document.getElementById('step1'),
    2: document.getElementById('step2'),
    3: document.getElementById('step3'),
    4: document.getElementById('step4')
  };

  let currentScene = 1;
  let width = 0;
  let height = 0;
  let dpr = 1;

  // Scene 4 State Machine: 'DORMANT' -> 'EXPLODED' -> 'ASSEMBLING' -> 'REVEALED'
  let scene4State = 'DORMANT';

  // Dynamic Particles & Vector Coordinate Registry
  const particles = [];
  const targetCoordinates = [];
  let imageReady = false;

  // Falling Petals in Finale
  const petals = [];
  const TOTAL_PETALS = 32;

  // Cursor & Touch Tracking
  const mouse = { x: -9999, y: -9999, radius: 90 };

  function updatePointer(clientX, clientY) {
    mouse.x = clientX;
    mouse.y = clientY;
  }

  window.addEventListener('pointermove', (e) => updatePointer(e.clientX, e.clientY));
  window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      updatePointer(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });

  window.addEventListener('pointerleave', () => {
    mouse.x = -9999;
    mouse.y = -9999;
  });

  /* --------------------------------------------------------------------------
     RESPONSIVE CANVAS SIZING
     -------------------------------------------------------------------------- */
  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.scale(dpr, dpr);

    if (imageReady) {
      sampleVectorCoordinates();
    }
  }

  window.addEventListener('resize', resize);

  /* --------------------------------------------------------------------------
     ACCURATE VECTOR IMAGE SAMPLER (1:1 COMPLETE RECONSTRUCTION)
     -------------------------------------------------------------------------- */
  const momImage = new Image();
  momImage.src = 'mom.png';

  momImage.onload = () => {
    imageReady = true;
    sampleVectorCoordinates();
  };

  momImage.onerror = () => {
    console.info("Using built-in procedural maternal embrace vector.");
    generateProceduralArtwork();
    imageReady = true;
  };

  function sampleVectorCoordinates() {
    targetCoordinates.length = 0;
    const offCanvas = document.createElement('canvas');
    const offCtx = offCanvas.getContext('2d');

    const isMobile = width < 768;

    // Responsive Bounding Box: Preserves Aspect Ratio without clipping
    const maxBoundW = isMobile ? width * 0.84 : Math.min(width * 0.52, 480);
    const maxBoundH = isMobile ? height * 0.40 : Math.min(height * 0.46, 440);

    const scale = Math.min(maxBoundW / momImage.width, maxBoundH / momImage.height);
    const renderW = Math.max(10, Math.round(momImage.width * scale));
    const renderH = Math.max(10, Math.round(momImage.height * scale));

    offCanvas.width = renderW;
    offCanvas.height = renderH;
    offCtx.drawImage(momImage, 0, 0, renderW, renderH);

    const imgData = offCtx.getImageData(0, 0, renderW, renderH).data;

    // Position Image: Centered horizontally, placed in the upper portion to clear finale typography
    const startX = (width - renderW) / 2;
    const startY = isMobile
      ? Math.max(68, height * 0.12)
      : (height - renderH) / 2 - (height * 0.08);

    // Adaptive sampling stride to ensure clean resolution on mobile and desktop
    const pixelDensity = renderW * renderH;
    let step = 3;
    if (pixelDensity > 140000) step = 4;
    if (pixelDensity < 35000) step = 2;

    for (let y = 0; y < renderH; y += step) {
      for (let x = 0; x < renderW; x += step) {
        const idx = (y * renderW + x) * 4;
        const r = imgData[idx];
        const g = imgData[idx + 1];
        const b = imgData[idx + 2];
        const a = imgData[idx + 3];

        // CRITICAL FIX: Only check for alpha visibility.
        // Dark pixels (black silhouettes, deep outlines) are fully captured!
        if (a > 35) {
          targetCoordinates.push({
            x: startX + x,
            y: startY + y,
            color: `rgba(${r}, ${g}, ${b}, ${a / 255})`
          });
        }
      }
    }

    if (targetCoordinates.length < 30) {
      generateProceduralArtwork();
    }
  }

  // Built-in Procedural Vector Artwork Fallback
  function generateProceduralArtwork() {
    targetCoordinates.length = 0;
    const count = 3000;
    const isMobile = width < 768;
    const cx = width / 2;
    const cy = isMobile ? Math.max(180, height * 0.32) : height * 0.38;
    const scale = Math.min(width, height) * (isMobile ? 0.016 : 0.014);

    for (let i = 0; i < count; i++) {
      const theta = (i / count) * Math.PI * 2;
      let x, y, col;

      if (i < count * 0.4) {
        // Celestial Gilded Halo
        const rad = 18 * scale + (Math.random() - 0.5) * (scale * 2.2);
        x = cx + Math.cos(theta * 3) * rad;
        y = cy + Math.sin(theta * 3) * rad;
        col = 'rgba(247, 208, 124, 0.9)';
      } else {
        // Parametric Maternal Embrace Silhouette
        const t = theta * 2;
        const hx = 16 * Math.pow(Math.sin(t), 3);
        const hy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
        const fill = Math.sqrt(Math.random());
        x = cx + (hx * scale * 0.92 * fill);
        y = cy + (hy * scale * 0.92 * fill);
        col = `rgba(255, ${160 + Math.random() * 60}, ${180 + Math.random() * 50}, 0.92)`;
      }

      targetCoordinates.push({ x, y, color: col });
    }
  }

  /* --------------------------------------------------------------------------
     COSMIC STAR DOT PHYSICS
     -------------------------------------------------------------------------- */
  class StarDot {
    constructor(target) {
      this.x = width / 2;
      this.y = height / 2;
      this.vx = 0;
      this.vy = 0;
      this.size = Math.random() * 1.8 + 0.8;
      this.tx = target.x;
      this.ty = target.y;
      this.targetColor = target.color;
      this.alpha = Math.random() * 0.7 + 0.3;
    }

    explode() {
      this.x = width / 2;
      this.y = height / 2;
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 18 + 7;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.size = Math.random() * 2.2 + 1.0;
    }

    update() {
      if (scene4State === 'EXPLODED') {
        this.x += this.vx;
        this.y += this.vy;

        this.vx *= 0.94;
        this.vy *= 0.94;

        // Boundary wrapping
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        // Interactive cursor repulsion
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.hypot(dx, dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 5;
          this.y -= (dy / dist) * force * 5;
        }
      } else if (scene4State === 'ASSEMBLING' || scene4State === 'REVEALED') {
        // High-precision spring attraction to exact target pixel
        const dx = this.tx - this.x;
        const dy = this.ty - this.y;
        this.vx = (this.vx + dx * 0.08) * 0.72;
        this.vy = (this.vy + dy * 0.08) * 0.72;
        this.x += this.vx;
        this.y += this.vy;

        // Subtle holographic ripple on hover without breaking the image
        const mdx = mouse.x - this.x;
        const mdy = mouse.y - this.y;
        const mdist = Math.hypot(mdx, mdy);
        if (mdist < 55) {
          this.x -= (mdx / mdist) * 3;
          this.y -= (mdy / mdist) * 3;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

      if (scene4State === 'ASSEMBLING' || scene4State === 'REVEALED') {
        ctx.fillStyle = this.targetColor;
      } else {
        ctx.fillStyle = `rgba(255, 215, 225, ${this.alpha})`;
      }
      ctx.fill();
    }
  }

  /* --------------------------------------------------------------------------
     FALLING ROSE PETALS (Finale Only)
     -------------------------------------------------------------------------- */
  class FallingPetal {
    constructor() {
      this.init();
    }

    init() {
      this.x = Math.random() * width;
      this.y = -30 - Math.random() * 80;
      this.size = Math.random() * 9 + 6;
      this.vy = Math.random() * 1.4 + 0.8;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.rotation = Math.random() * 360;
      this.rotSpeed = (Math.random() - 0.5) * 1.5;
      this.pitch = Math.random() * Math.PI;
      this.pitchSpeed = Math.random() * 0.03 + 0.01;
      this.opacity = Math.random() * 0.5 + 0.4;
    }

    update() {
      this.y += this.vy;
      this.x += Math.sin(this.y * 0.012) * 1.1 + this.vx;
      this.rotation += this.rotSpeed;
      this.pitch += this.pitchSpeed;

      if (this.y > height + 40) {
        this.init();
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);
      ctx.scale(1, Math.sin(this.pitch));

      const grad = ctx.createRadialGradient(0, 0, 1, 0, 0, this.size);
      grad.addColorStop(0, `rgba(255, 175, 195, ${this.opacity})`);
      grad.addColorStop(1, `rgba(215, 55, 95, ${this.opacity * 0.85})`);

      ctx.beginPath();
      ctx.ellipse(0, 0, this.size, this.size * 0.6, 0, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.restore();
    }
  }

  /* --------------------------------------------------------------------------
     RENDER LOOP (Active ONLY in Scene 4)
     -------------------------------------------------------------------------- */
  function render() {
    if (scene4State === 'DORMANT') {
      ctx.clearRect(0, 0, width, height);
      requestAnimationFrame(render);
      return;
    }

    ctx.globalCompositeOperation = 'source-over';
    ctx.clearRect(0, 0, width, height);

    // Glowing stardust additive blend
    ctx.globalCompositeOperation = 'lighter';
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }

    // Render falling petals after dots form the image
    if (scene4State === 'REVEALED') {
      ctx.globalCompositeOperation = 'source-over';
      for (let j = 0; j < petals.length; j++) {
        petals[j].update();
        petals[j].draw();
      }
    }

    requestAnimationFrame(render);
  }

  /* --------------------------------------------------------------------------
     SCENE CHOREOGRAPHY
     -------------------------------------------------------------------------- */
  function setScene(targetIdx) {
    if (scenes[currentScene]) scenes[currentScene].classList.remove('active');
    currentScene = targetIdx;
    if (scenes[currentScene]) scenes[currentScene].classList.add('active');

    Object.keys(stepIndicators).forEach(step => {
      stepIndicators[step].classList.toggle('active', parseInt(step, 10) === currentScene);
    });
  }

  function beginSurprise() {
    if (bgMusic && bgMusic.paused) {
      bgMusic.play().catch(() => {});
    }
    setScene(2);
  }

  function goToLetter() {
    setScene(3);
  }

  function triggerCosmicExplosion() {
    setScene(4);

    // Trigger visual shockwave
    shockwave.classList.remove('trigger');
    void shockwave.offsetWidth;
    shockwave.classList.add('trigger');

    // 1:1 Dynamic particle generation (Every single target point gets a dot!)
    particles.length = 0;
    for (let i = 0; i < targetCoordinates.length; i++) {
      const p = new StarDot(targetCoordinates[i]);
      p.explode();
      particles.push(p);
    }

    scene4State = 'EXPLODED';
    assembleHint.classList.remove('hide');
  }

  function assembleDotsIntoImage() {
    if (currentScene !== 4 || scene4State !== 'EXPLODED') return;

    scene4State = 'ASSEMBLING';
    assembleHint.classList.add('hide');

    // Reveal finale typography and lanterns after dots converge
    setTimeout(() => {
      scene4State = 'REVEALED';
      document.body.classList.add('stage-revealed');
      finaleContent.classList.add('show');
    }, 1600);
  }

  // Audio Toggle
  soundBtn.addEventListener('click', () => {
    if (!bgMusic) return;
    if (bgMusic.paused) {
      bgMusic.play();
      document.body.classList.remove('audio-paused');
    } else {
      bgMusic.pause();
      document.body.classList.add('audio-paused');
    }
  });

  // UI Event Handlers
  startSurpriseBtn.addEventListener('click', beginSurprise);
  portalTrigger.addEventListener('click', beginSurprise);
  toLetterBtn.addEventListener('click', goToLetter);
  unveilStarsBtn.addEventListener('click', triggerCosmicExplosion);

  // Click / Touch anywhere in Scene 4 to trigger assembly
  window.addEventListener('click', (e) => {
    if (currentScene === 4 && scene4State === 'EXPLODED' && !e.target.closest('.top-bar')) {
      assembleDotsIntoImage();
    }
  });

  // Replay
  replayBtn.addEventListener('click', () => {
    document.body.classList.remove('stage-revealed');
    finaleContent.classList.remove('show');
    scene4State = 'DORMANT';
    particles.length = 0;
    setScene(1);
  });

  /* --------------------------------------------------------------------------
     STARTUP
     -------------------------------------------------------------------------- */
  function init() {
    resize();
    petals.length = 0;
    for (let j = 0; j < TOTAL_PETALS; j++) {
      petals.push(new FallingPetal());
    }
    requestAnimationFrame(render);
  }

  init();
})();

  /* ==========================================================================
     STABILIZER PATCH: REMOVE WOBBLE, BOUNCE & TOUCH DISTURBANCE
     ========================================================================== */
  StarDot.prototype.update = function () {
    // 1. Drifting Star Phase (Explosion)
    if (scene4State === 'EXPLODED') {
      this.x += this.vx;
      this.y += this.vy;

      this.vx *= 0.94;
      this.vy *= 0.94;

      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
      if (this.y < 0) this.y = height;
      if (this.y > height) this.y = 0;

      // Mouse/touch repulsion only during free floating
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const dist = Math.hypot(dx, dy);
      if (dist < mouse.radius) {
        const force = (mouse.radius - dist) / mouse.radius;
        this.x -= (dx / dist) * force * 5;
        this.y -= (dy / dist) * force * 5;
      }
    } 
    // 2. Smooth Assembly Phase (Locks directly with ZERO oscillation or shaking)
    else if (scene4State === 'ASSEMBLING' || scene4State === 'REVEALED') {
      const dx = this.tx - this.x;
      const dy = this.ty - this.y;

      // Smooth direct exponential glide (No spring bounce)
      this.x += dx * 0.14;
      this.y += dy * 0.14;

      // Instantly lock completely still once close to the target coordinate
      if (Math.abs(dx) < 0.25) this.x = this.tx;
      if (Math.abs(dy) < 0.25) this.y = this.ty;
    }
  };

