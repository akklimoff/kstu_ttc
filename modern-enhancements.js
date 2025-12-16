/**
 * Apple-Inspired Interactions for KSTU Transfer Website
 * Clean, smooth, minimal JavaScript enhancements
 */

(function() {
  'use strict';

  // ============================================
  // SMOOTH HEADER ON SCROLL
  // ============================================
  function initHeader() {
    const header = document.querySelector('header');
    if (!header) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      lastScroll = currentScroll;
    }, { passive: true });
  }

  // ============================================
  // INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS
  // ============================================
  function initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
        }
      });
    }, observerOptions);

    // Observe all elements with fade-in class
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
  }

  // ============================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ============================================
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#' || !href) return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const headerOffset = 100;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // ============================================
  // ENHANCED BUTTON INTERACTIONS
  // ============================================
  function initButtons() {
    document.querySelectorAll('button, .btn').forEach(button => {
      button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          left: ${x}px;
          top: ${y}px;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 50%;
          transform: scale(0);
          animation: ripple 0.6s ease-out;
          pointer-events: none;
        `;

        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
      });
    });

    // Add ripple animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes ripple {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // ============================================
  // FORM ENHANCEMENTS
  // ============================================
  function initForms() {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
      const inputs = form.querySelectorAll('input, textarea, select');

      inputs.forEach(input => {
        // Real-time validation feedback
        input.addEventListener('blur', function() {
          if (this.value && !this.validity.valid) {
            this.style.borderColor = '#ff3b30';
          } else if (this.value && this.validity.valid) {
            this.style.borderColor = '#34c759';
          }
        });

        input.addEventListener('input', function() {
          if (this.style.borderColor === 'rgb(255, 59, 48)' || this.style.borderColor === 'rgb(52, 199, 89)') {
            this.style.borderColor = '';
          }
        });
      });
    });
  }

  // ============================================
  // PARALLAX EFFECT FOR HERO SECTIONS
  // ============================================
  function initParallax() {
    const heroSections = document.querySelectorAll('.section-hero');

    window.addEventListener('scroll', () => {
      heroSections.forEach(section => {
        const scrolled = window.pageYOffset;
        const rect = section.getBoundingClientRect();

        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const yPos = -(scrolled * 0.3);
          section.style.transform = `translateY(${yPos}px)`;
        }
      });
    }, { passive: true });
  }

  // ============================================
  // LAZY LOADING IMAGES
  // ============================================
  function initLazyLoading() {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          imageObserver.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
  }

  // ============================================
  // INITIALIZE ALL ENHANCEMENTS
  // ============================================
  function init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
      return;
    }

    initHeader();
    initScrollAnimations();
    initSmoothScroll();
    initButtons();
    initForms();
    initLazyLoading();

    // Add page-loaded class for transitions
    document.body.classList.add('page-loaded');

    console.log('✨ Apple-inspired enhancements loaded');
  }

  init();

})();
