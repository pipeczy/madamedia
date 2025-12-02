// ============================================================================
// MOUSE PARALLAX EFFECT - Efecto interactivo con el mouse
// ============================================================================
document.addEventListener('DOMContentLoaded', function() {
  const parallaxSections = document.querySelectorAll('.mouse-parallax-section');
  
  parallaxSections.forEach(section => {
    section.addEventListener('mousemove', function(e) {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left; // Posición X del mouse relativa a la sección
      const y = e.clientY - rect.top;  // Posición Y del mouse relativa a la sección
      
      // Calcular el porcentaje de movimiento (-50 a 50)
      const xPercent = ((x / rect.width) - 0.5) * 100;
      const yPercent = ((y / rect.height) - 0.5) * 100;
      
      // Aplicar el movimiento a cada capa con diferentes intensidades
      const layer1Elements = section.querySelectorAll('.parallax-layer-1');
      const layer2Elements = section.querySelectorAll('.parallax-layer-2');
      const layer3Elements = section.querySelectorAll('.parallax-layer-3');
      
      layer1Elements.forEach(el => {
        const rotation = el.style.transform.includes('rotate') ? el.style.transform.match(/rotate\([^)]+\)/)[0] : '';
        el.style.transform = `translate(${xPercent * 0.15}px, ${yPercent * 0.15}px) ${rotation}`;
      });
      
      layer2Elements.forEach(el => {
        const rotation = el.style.transform.includes('rotate') ? el.style.transform.match(/rotate\([^)]+\)/)[0] : '';
        el.style.transform = `translate(${xPercent * 0.25}px, ${yPercent * 0.25}px) ${rotation}`;
      });
      
      layer3Elements.forEach(el => {
        const rotation = el.style.transform.includes('rotate') ? el.style.transform.match(/rotate\([^)]+\)/)[0] : '';
        el.style.transform = `translate(${xPercent * 0.35}px, ${yPercent * 0.35}px) ${rotation}`;
      });
    });
    
    // Resetear al salir de la sección
    section.addEventListener('mouseleave', function() {
      const allLayers = section.querySelectorAll('.parallax-layer-1, .parallax-layer-2, .parallax-layer-3');
      allLayers.forEach(el => {
        const rotation = el.style.transform.includes('rotate') ? el.style.transform.match(/rotate\([^)]+\)/)[0] : '';
        el.style.transform = `translate(0, 0) ${rotation}`;
      });
    });
  });
});

// ============================================================================
// MOBILE MENU TOGGLE
// ============================================================================
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

menuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when clicking a link
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
  });
});

// FAQ accordion
document.querySelectorAll('.faq-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const content = item.querySelector('.faq-content');
    const icon = btn.querySelector('.faq-icon');

    // Close all other FAQs
    document.querySelectorAll('.faq-item').forEach(otherItem => {
      if (otherItem !== item) {
        otherItem.querySelector('.faq-content').classList.remove('open');
        otherItem.querySelector('.faq-icon').style.transform = 'rotate(0deg)';
      }
    });

    // Toggle current FAQ
    content.classList.toggle('open');
    icon.style.transform = content.classList.contains('open') ? 'rotate(180deg)' : 'rotate(0deg)';
  });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ============================================================================
// STATS COUNTER ANIMATION - Count up effect increible
// ============================================================================
function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16); // 60fps
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }

    // Format number with commas for readability
    const displayValue = Math.floor(current);

    // Handle special cases like "M+" for millions
    const suffix = element.dataset.suffix || '+';
    if (suffix === 'M+') {
      element.textContent = '1M+';
    } else {
      element.textContent = displayValue + suffix;
    }
  }, 16);
}

// Intersection Observer para activar la animacion cuando sea visible
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statNumbers = entry.target.querySelectorAll('[data-target]');
      statNumbers.forEach(stat => {
        const target = parseInt(stat.dataset.target);
        animateCounter(stat, target, 2000);
      });
      // Solo animar una vez
      statsObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.5 // Activar cuando 50% del elemento es visible
});

// Observar el grid de stats
const statsGrid = document.getElementById('statsGrid');
if (statsGrid) {
  statsObserver.observe(statsGrid);
}

// ============================================================================
// HERO VIDEO BACKGROUND - Vimeo iframe con autoplay y loop
// ============================================================================
// El video de Vimeo se reproduce automáticamente gracias a los parámetros:
// autoplay=1, loop=1, muted=1, background=1
// No se requiere JavaScript adicional para controlar la reproducción

// ============================================================================
// VIDEO CAROUSEL - Carrusel automático de videos en "Sobre Nosotros"
// ============================================================================

let currentSlide = 0;
const slides = document.querySelectorAll('.video-carousel-item');
const dots = document.querySelectorAll('.carousel-dot');
const totalSlides = slides.length;

function showSlide(index) {
  // Mantener el índice dentro del rango válido
  if (index >= totalSlides) currentSlide = 0;
  if (index < 0) currentSlide = totalSlides - 1;

  // Actualizar visibilidad de los videos
  slides.forEach((slide, i) => {
    slide.style.opacity = i === currentSlide ? '1' : '0';
  });

  // Actualizar indicadores de puntos
  dots.forEach((dot, i) => {
    if (i === currentSlide) {
      dot.style.width = '24px';
      dot.style.backgroundColor = 'white';
    } else {
      dot.style.width = '8px';
      dot.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
    }
  });
}

function changeCarouselSlide(direction) {
  currentSlide += direction;
  showSlide(currentSlide);
}

function goToSlide(index) {
  currentSlide = index;
  showSlide(currentSlide);
}

// Auto-play del carrusel cada 8 segundos
setInterval(() => {
  changeCarouselSlide(1);
}, 8000);

// Inicializar el carrusel
if (slides.length > 0) {
  showSlide(0);
}
