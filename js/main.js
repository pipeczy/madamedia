// Mobile menu toggle
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
