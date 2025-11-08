document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('primary-nav');

  // Make sure nav is hidden by default on small screens
  if (nav && window.innerWidth < 768) nav.style.display = 'none';

  if (hamburger && nav) {
    function toggleNav() {
      const expanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', String(!expanded));
      if (expanded) {
        nav.style.display = 'none';
      } else {
        nav.style.display = 'block';
      }
    }

    hamburger.addEventListener('click', toggleNav);

    // close nav when Escape is pressed
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        hamburger.setAttribute('aria-expanded', 'false');
        if (window.innerWidth < 768) nav.style.display = 'none';
      }
    });

    // On resize, reset nav display for large screens
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768) {
        nav.style.display = '';
        hamburger.setAttribute('aria-expanded', 'false');
      } else {
        nav.style.display = 'none';
      }
    });
  }
});
