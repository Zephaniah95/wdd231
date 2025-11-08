document.addEventListener("DOMContentLoaded", () => {
  const currentYearEl = document.getElementById("year");
  const lastModifiedEl = document.getElementById("lastModified");

  // Only run if elements exist
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  } else {
    console.warn("currentYear element not found in DOM");
  }

  if (lastModifiedEl) {
    lastModifiedEl.textContent = document.lastModified;
  } else {
    console.warn("lastModified element not found in DOM");
  }
});
