document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('currentYear');
  const lastModifiedEl = document.getElementById('lastModified');

  if (yearEl) yearEl.textContent = new Date().getFullYear();
  if (lastModifiedEl) lastModifiedEl.textContent = document.lastModified || 'Not available';
});
