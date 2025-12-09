// ui.js — Handles accessible modal focus trapping and keyboard behavior

export function enableModalAccessibility(modalEl, closeBtn) {
  let lastFocusedElement = null;

  function trapFocus(e) {
    const focusable = modalEl.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.key === "Tab") {
      // SHIFT + TAB (backward)
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
      // TAB (forward)
      else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  function openModal() {
    lastFocusedElement = document.activeElement;
    modalEl.setAttribute("aria-hidden", "false");
    modalEl.style.display = "flex";
    closeBtn.focus();
    document.addEventListener("keydown", trapFocus);
  }

  function closeModal() {
    modalEl.setAttribute("aria-hidden", "true");
    modalEl.style.display = "none";
    document.removeEventListener("keydown", trapFocus);
    if (lastFocusedElement) lastFocusedElement.focus();
  }

  // Close button behavior
  closeBtn.addEventListener("click", closeModal);

  // Click outside modal to close
  modalEl.addEventListener("click", (e) => {
    if (e.target === modalEl) closeModal();
  });

  // ESC key closes modal
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalEl.getAttribute("aria-hidden") === "false") {
      closeModal();
    }
  });

  return { openModal, closeModal };
}
