// ============================================================================
// UTILIDAD: Throttle para optimización de eventos
// ============================================================================
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// ============================================================================
// MOUSE PARALLAX EFFECT - Efecto interactivo con el mouse (optimizado)
// ============================================================================
document.addEventListener('DOMContentLoaded', function() {
  const parallaxSections = document.querySelectorAll('.mouse-parallax-section');

  // Configuración de capas para evitar repetición
  const layers = [
    { selector: '.parallax-layer-1', intensity: 0.15 },
    { selector: '.parallax-layer-2', intensity: 0.25 },
    { selector: '.parallax-layer-3', intensity: 0.35 }
  ];

  parallaxSections.forEach(section => {
    const handleMouseMove = throttle(function(e) {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const xPercent = ((x / rect.width) - 0.5) * 100;
      const yPercent = ((y / rect.height) - 0.5) * 100;

      layers.forEach(({ selector, intensity }) => {
        section.querySelectorAll(selector).forEach(el => {
          const rotation = el.style.transform.includes('rotate')
            ? el.style.transform.match(/rotate\([^)]+\)/)[0]
            : '';
          el.style.transform = `translate(${xPercent * intensity}px, ${yPercent * intensity}px) ${rotation}`;
        });
      });
    }, 16); // ~60fps

    section.addEventListener('mousemove', handleMouseMove);

    section.addEventListener('mouseleave', function() {
      layers.forEach(({ selector }) => {
        section.querySelectorAll(selector).forEach(el => {
          const rotation = el.style.transform.includes('rotate')
            ? el.style.transform.match(/rotate\([^)]+\)/)[0]
            : '';
          el.style.transform = `translate(0, 0) ${rotation}`;
        });
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
// VIDEO MODAL - Lightbox para videos del portafolio con controles personalizados
// ============================================================================
const videoModal = document.getElementById('videoModal');
const modalVideoContainer = document.getElementById('modalVideoContainer');
const closeModalBtn = document.getElementById('closeModal');
const portfolioCards = document.querySelectorAll('.portfolio-card[data-video-id]');
const playPauseBtn = document.getElementById('playPauseBtn');
const playIcon = document.getElementById('playIcon');
const pauseIcon = document.getElementById('pauseIcon');
const volumeSlider = document.getElementById('volumeSlider');
const volumeIcon = document.getElementById('volumeIcon');

let player = null;
let isPlaying = true;

// Cargar API de YouTube iframe
if (!window.YT) {
  const tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  const firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

// Función para abrir el modal con controles personalizados
function openVideoModal(videoId, aspectRatio = "9:16") {
  // Ajustar el contenedor del modal seg�n el aspect ratio
  const modalContainer = videoModal.querySelector(".relative.w-full");
  if (aspectRatio === "16:9") {
    modalContainer.className = "relative w-full max-w-5xl mx-4 aspect-video";
  } else {
    modalContainer.className = "relative w-full max-w-xl mx-4 aspect-[9/16]";
  }
  
  // Crear div para el player de YouTube
  const playerDiv = document.createElement('div');
  playerDiv.id = 'youtube-player';
  playerDiv.style.cssText = 'width: 100%; height: 100%;';
  
  // Limpiar contenedor y agregar nuevo div
  modalVideoContainer.innerHTML = '';
  modalVideoContainer.appendChild(playerDiv);
  
  // Inicializar player de YouTube con API
  window.onYouTubeIframeAPIReady = function() {
    createPlayer(videoId);
  };
  
  if (window.YT && window.YT.Player) {
    createPlayer(videoId);
  }
  
  // Mostrar modal con animación
  videoModal.classList.remove('hidden');
  videoModal.classList.add('flex');
  
  // Prevenir scroll del body
  document.body.style.overflow = 'hidden';
  
  // Resetear estado de play/pause
  isPlaying = true;
  playIcon.classList.add('hidden');
  pauseIcon.classList.remove('hidden');
}

// Crear player de YouTube con máxima restricción
function createPlayer(videoId) {
  player = new YT.Player('youtube-player', {
    videoId: videoId,
    playerVars: {
      autoplay: 1,
      controls: 0,                 // Sin controles
      modestbranding: 1,           // Sin marca de YouTube
      rel: 0,                      // Sin videos relacionados
      showinfo: 0,                 // Sin información
      playsinline: 1,              // Reproducción inline
      disablekb: 1,                // Teclado deshabilitado
      fs: 0,                       // Sin pantalla completa
      iv_load_policy: 3,           // Sin anotaciones
      enablejsapi: 1,              // API JavaScript habilitada
      cc_load_policy: 0,           // Sin subtítulos automáticos
      color: 'white',              // Color de barra (si aparece)
      hl: 'es',                    // Idioma español
      widget_referrer: '',         // Sin referrer
      origin: window.location.origin,
      autohide: 1,                 // Ocultar controles
      branding: 0                  // Sin branding
    },
    events: {
      onReady: onPlayerReady
    }
  });
}

// Cuando el player está listo
function onPlayerReady(event) {
  event.target.setVolume(100);
  event.target.playVideo();
}

// Toggle play/pause
playPauseBtn.addEventListener('click', function() {
  if (!player) return;
  
  if (isPlaying) {
    player.pauseVideo();
    playIcon.classList.remove('hidden');
    pauseIcon.classList.add('hidden');
  } else {
    player.playVideo();
    playIcon.classList.add('hidden');
    pauseIcon.classList.remove('hidden');
  }
  isPlaying = !isPlaying;
});

// Control de volumen
volumeSlider.addEventListener('input', function() {
  if (!player) return;
  
  const volume = this.value;
  player.setVolume(volume);
  
  // Actualizar el color del track del slider
  this.style.setProperty('--volume-percentage', volume + '%');
  
  // Cambiar icono según el volumen
  updateVolumeIcon(volume);
});

// Actualizar icono de volumen
function updateVolumeIcon(volume) {
  if (volume == 0) {
    volumeIcon.innerHTML = '<path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>';
  } else if (volume < 50) {
    volumeIcon.innerHTML = '<path d="M7 9v6h4l5 5V4l-5 5H7z"/>';
  } else {
    volumeIcon.innerHTML = '<path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>';
  }
}

// Mute/unmute al hacer clic en el icono de volumen
volumeIcon.addEventListener('click', function() {
  if (!player) return;
  
  if (player.isMuted()) {
    player.unMute();
    const currentVolume = player.getVolume();
    volumeSlider.value = currentVolume || 100;
    volumeSlider.style.setProperty('--volume-percentage', (currentVolume || 100) + '%');
    updateVolumeIcon(currentVolume || 100);
  } else {
    player.mute();
    volumeSlider.value = 0;
    volumeSlider.style.setProperty('--volume-percentage', '0%');
    updateVolumeIcon(0);
  }
});

// Función para cerrar el modal
function closeVideoModal() {
  // Destruir el player si existe
  if (player) {
    player.destroy();
    player = null;
  }
  
  // Ocultar modal
  videoModal.classList.add('hidden');
  videoModal.classList.remove('flex');
  
  // Limpiar el contenedor del video
  modalVideoContainer.innerHTML = '';
  
  // Restaurar scroll del body
  document.body.style.overflow = '';
  
  // Reset estados
  isPlaying = true;
  playIcon.classList.remove('hidden');
  pauseIcon.classList.add('hidden');
}

// Agregar event listeners a las tarjetas del portafolio
portfolioCards.forEach(card => {
  card.addEventListener('click', function() {
    const videoId = this.getAttribute('data-video-id');
    const aspectRatio = this.getAttribute('data-aspect') || '9:16';
    if (videoId) {
      openVideoModal(videoId, aspectRatio);
    }
  });
});

// Cerrar modal al hacer clic en el botón de cerrar
closeModalBtn.addEventListener('click', closeVideoModal);

// Cerrar modal al hacer clic fuera del video
videoModal.addEventListener('click', function(e) {
  if (e.target === videoModal) {
    closeVideoModal();
  }
});

// Cerrar modal con la tecla ESC
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && !videoModal.classList.contains('hidden')) {
    closeVideoModal();
  }
});
