// scripts/projects.js
import { loadProjects } from './datafetch.js';
import { enableModalAccessibility } from './ui.js';

// DOM references
const grid = document.getElementById('projects-grid');
const filter = document.getElementById('filter');
const search = document.getElementById('search');
const visitMsg = document.getElementById('visit-message');

// Modal references
const MODAL = {
  el: document.getElementById('modal'),
  title: document.getElementById('modal-title'),
  img: document.getElementById('modal-image'),
  desc: document.getElementById('modal-desc'),
  meta: document.getElementById('modal-meta'),
  closeBtn: document.querySelector('.modal-close')
};

// Global projects array (populated after fetching JSON)
let projects = [];

// =====================================
// LOCAL STORAGE (Visitor State)
// =====================================
(function manageVisit() {
  const key = 'zg_last_visit';
  const now = Date.now();
  const last = Number(localStorage.getItem(key)) || 0;

  if (!last) {
    visitMsg.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const days = Math.floor((now - last) / (1000 * 60 * 60 * 24));
    if (days < 1) visitMsg.textContent = "Back so soon! Awesome!";
    else if (days === 1) visitMsg.textContent = "You last visited 1 day ago.";
    else visitMsg.textContent = `You last visited ${days} days ago.`;
  }

  localStorage.setItem(key, now);
})();

// =====================================
// CREATE CARD HTML
// =====================================
const createCardHTML = (p) => {
  return `
    <article class="project-card" data-id="${p.id}">
      <img 
        src="images/${p.image}" 
        alt="${p.title}" 
        loading="lazy" 
        width="400" 
        height="240">
      
      <h3>${p.title}</h3>

      <p class="project-meta">${p.category} • ${p.year}</p>

      <p>${p.description}</p>

      <div class="card-bottom">
        <button class="learn-btn" data-id="${p.id}" aria-label="Learn more about ${p.title}">
          Learn more
        </button>
      </div>
    </article>
  `;
};

// =====================================
// RENDER PROJECTS (ARRAY METHODS)
// =====================================
function render(list) {
  grid.innerHTML = list.map(createCardHTML).join('');

  grid.querySelectorAll('.learn-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = Number(e.currentTarget.dataset.id);
      openModal(id);
    });
  });
}

// =====================================
// MODAL (Accessible)
// =====================================
const modalControls = enableModalAccessibility(MODAL.el, MODAL.closeBtn);

function openModal(id) {
  const p = projects.find(x => x.id === id);
  if (!p) return;

  MODAL.title.textContent = p.title;
  MODAL.img.src = `images/${p.image}`;
  MODAL.img.alt = p.title;
  MODAL.desc.textContent = p.description;
  MODAL.meta.textContent = `${p.category} • ${p.year}`;

  modalControls.openModal();
}

// =====================================
// ASYNC INITIALIZATION
// =====================================
async function init() {
  try {
    projects = await loadProjects();  // <-- ASYNC FETCH + JSON PARSE

    render(projects); // render AFTER loading

  } catch (err) {
    console.error("Failed to initialize project list:", err);
    grid.innerHTML = `<p class="error">Error loading projects. Please try again later.</p>`;
  }
}

init(); // run

// =====================================
// FILTER
// =====================================
filter.addEventListener('change', () => {
  const val = filter.value;
  const filtered = val === 'all'
    ? projects
    : projects.filter(p => p.category === val);

  render(filtered);
});

// =====================================
// SEARCH
// =====================================
search.addEventListener('input', () => {
  const q = search.value.trim().toLowerCase();

  const filtered = projects.filter(p => {
    return (
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.join(' ').toLowerCase().includes(q)
    );
  });

  render(filtered);
});
