document.addEventListener("DOMContentLoaded", () => {
  // Set timestamp
  document.getElementById("timestamp").value = new Date().toISOString();

  // Animate cards on load
  const cards = document.querySelectorAll(".membership-cards .card");
  cards.forEach((card, index) => {
    card.style.opacity = 0;
    setTimeout(() => { card.style.transition = "opacity 1s"; card.style.opacity = 1; }, index * 200);
  });

  // Modal functionality
  cards.forEach(card => {
    const membership = card.dataset.membership;
    const modal = document.getElementById(`modal-${membership}`);
    const link = card.querySelector("a");
    const close = modal.querySelector(".close");

    link.addEventListener("click", e => {
      e.preventDefault();
      modal.style.display = "block";
    });

    close.addEventListener("click", () => modal.style.display = "none");

    window.addEventListener("click", e => {
      if (e.target === modal) modal.style.display = "none";
    });
  });
});
