/* ══════════════════════════════════════════
   DARSHAN NAIDU PORTFOLIO — script.js
   ══════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─── COPYRIGHT WARNING ─── */
  console.log(
    "%cSTOP!%c\n\nThis website and its underlying source code are the exclusive property of %cDarshan Naidu%c.\nUnauthorized copying, cloning, or redistribution of this portfolio is strictly prohibited and will be treated as intellectual property theft.\n\nIf you want to hire me, reach out via the contact form!",
    "color: #ff0000; font-size: 50px; font-weight: bold; text-shadow: 2px 2px 0 #000;",
    "color: #ffffff; font-size: 16px; line-height: 1.5;",
    "color: #00f0ff; font-size: 18px; font-weight: bold;",
    "color: #ffffff; font-size: 16px; line-height: 1.5;"
  );

  /* ─── NAV SECTION SWITCHING ─── */
  const navBtns    = document.querySelectorAll('.nav-btn');
  const sections   = document.querySelectorAll('.section');
  const hamburger  = document.getElementById('hamburger');
  const navLinks   = document.querySelector('.nav-links');

  function activateSection(targetId) {
    const isMovingFromHome = document.body.classList.contains('state-home') && targetId !== 'home';

    if (isMovingFromHome) {
      // 1. Transition home page out and top navbar in
      document.body.classList.remove('state-home');
      document.body.classList.add('state-section');

      // 2. Wait for home-splash transition (opacity and translation) to finish before showing new section content
      setTimeout(() => {
        switchSectionDisplay(targetId);
      }, 400); // 400ms matches the style.css exit transition
    } else {
      // Direct instant transition
      if (targetId === 'home') {
        document.body.classList.remove('state-section');
        document.body.classList.add('state-home');
      } else {
        document.body.classList.remove('state-home');
        document.body.classList.add('state-section');
      }
      switchSectionDisplay(targetId);
    }
  }

  function switchSectionDisplay(targetId) {
    // Hide all sections
    sections.forEach(sec => {
      sec.classList.remove('active');
    });

    // Show target section
    const target = document.getElementById(targetId);
    if (target) {
      // Force re-trigger animation by briefly removing and re-adding
      target.style.animation = 'none';
      target.offsetHeight; // reflow
      target.style.animation = '';
      target.classList.add('active');
    }

    // Update nav button active states across all buttons (top & splash!)
    navBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.target === targetId);
    });

    // Close mobile menu if open
    if (navLinks) navLinks.classList.remove('open');
    if (hamburger) hamburger.classList.remove('open');

    // Scroll to top of content on section switch
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      activateSection(btn.dataset.target);
    });
  });

  /* ─── HAMBURGER TOGGLE ─── */
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // Close menu on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('#main-nav')) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
    }
  });

  /* ─── CONTACT FORM ─── */
  const form     = document.getElementById('contact-form');
  const formNote = document.getElementById('form-note');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name    = document.getElementById('cf-name').value.trim();
      const email   = document.getElementById('cf-email').value.trim();
      const subject = document.getElementById('cf-subject').value.trim();
      const msg     = document.getElementById('cf-msg').value.trim();

      if (!name || !email || !msg) {
        formNote.style.color = '#ff5078';
        formNote.textContent = '⚠ Please fill in Name, Email and Message.';
        return;
      }

      // Try backend API first
      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, subject, message: msg })
        });

        const data = await res.json();

        if (data.success) {
          formNote.style.color = 'var(--accent)';
          formNote.textContent = '✓ Message sent successfully!';
          form.reset();
          setTimeout(() => { formNote.textContent = ''; }, 4000);
          return;
        }
      } catch (err) {
        // Server not available, fall back to mailto
      }

      // Mailto fallback
      const mailtoLink = `mailto:darshannaidu696@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Contact')}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${msg}`)}`;
      window.location.href = mailtoLink;

      formNote.style.color = 'var(--accent)';
      formNote.textContent = '✓ Opening your mail client...';

      setTimeout(() => {
        form.reset();
        formNote.textContent = '';
      }, 3000);
    });
  }

  /* ─── STAGGERED SKILL CARD ANIMATIONS ─── */
  function animateSkillCards() {
    const cards = document.querySelectorAll('.skill-card');
    cards.forEach((card, i) => {
      card.style.animationDelay = `${i * 0.04}s`;
      card.classList.add('anim-ready');
    });
  }

  /* ─── INTERSECTION OBSERVER: Animate timeline items on Education section ─── */
  function observeTimelineItems() {
    const items = document.querySelectorAll('.timeline-item');
    if (!items.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    items.forEach((item, i) => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(20px)';
      item.style.transition = `opacity 0.5s ease ${i * 0.15}s, transform 0.5s ease ${i * 0.15}s`;
      observer.observe(item);
    });
  }

  /* ─── CERT CARD HOVER GLOW ─── */
  function initCertCards() {
    document.querySelectorAll('.cert-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.boxShadow = '0 0 18px rgba(0,240,255,0.07)';
      });
      card.addEventListener('mouseleave', () => {
        card.style.boxShadow = '';
      });
    });
  }

  /* ─── BENTO TILT EFFECT on Home ─── */
  function initBentoTilt() {
    document.querySelectorAll('.bento').forEach(bento => {
      bento.addEventListener('mousemove', (e) => {
        const rect = bento.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        bento.style.transform = `perspective(600px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
      });
      bento.addEventListener('mouseleave', () => {
        bento.style.transform = '';
        bento.style.transition = 'transform 0.5s ease';
      });
      bento.addEventListener('mouseenter', () => {
        bento.style.transition = 'transform 0.1s ease';
      });
    });
  }

  /* ─── KEYBOARD NAVIGATION ─── */
  document.addEventListener('keydown', (e) => {
    const sections_ids = ['home', 'about', 'education', 'experience', 'skills', 'projects', 'coding-profiles', 'contact'];
    const currentBtn = document.querySelector('.nav-btn.active');
    const currentTarget = currentBtn ? currentBtn.dataset.target : 'home';
    const currentIndex = sections_ids.indexOf(currentTarget);

    if (e.key === 'ArrowRight' && currentIndex < sections_ids.length - 1) {
      activateSection(sections_ids[currentIndex + 1]);
    } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
      activateSection(sections_ids[currentIndex - 1]);
    }
  });

  /* ─── NAV SCROLL BEHAVIOR (shrink on scroll) ─── */
  const nav = document.getElementById('main-nav');
  let lastScrollY = 0;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY > 40) {
      nav.style.background = 'rgba(8, 11, 8, 0.97)';
      nav.style.borderBottomColor = 'rgba(0,240,255,0.18)';
    } else {
      nav.style.background = 'rgba(8, 11, 8, 0.85)';
      nav.style.borderBottomColor = 'rgba(0,240,255,0.12)';
    }
    lastScrollY = scrollY;
  });

  /* ─── PROJECT CARD ENTRANCE ANIMATIONS ─── */
  function initProjectCards() {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach((card, i) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = `opacity 0.4s ease ${i * 0.1}s, transform 0.4s ease ${i * 0.1}s, border-color 0.35s, box-shadow 0.35s`;

      // Trigger with small delay for section entrance
      requestAnimationFrame(() => {
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 50 + i * 80);
      });
    });
  }

  /* ─── RE-ANIMATE ON SECTION SWITCH ─── */
  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const t = btn.dataset.target;
      setTimeout(() => {
        if (t === 'education') observeTimelineItems();
        if (t === 'skills')    animateSkillCards();
        if (t === 'projects')  initProjectCards();
        if (t === 'education') initCertCards();
      }, 80);
    });
  });

  /* ─── INIT ─── */
  initBentoTilt();
  initCertCards();

  // Ensure home is visible on load
  activateSection('home');

})();
