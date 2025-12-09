// scripts/discover.js
// Module script for discover.html
import places from '../data/places.mjs';

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('discover-grid');
  const visitMessage = document.getElementById('visit-message');

  // 1) LocalStorage last-visit message
  const LAST_VISIT_KEY = 'ogbogu_last_visit';
  const now = Date.now();
  const last = parseInt(localStorage.getItem(LAST_VISIT_KEY), 10);

  if (!last) {
    visitMessage.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const msPerDay = 1000 * 60 * 60 * 24;
    const diffDays = Math.floor((now - last) / msPerDay);

    if (diffDays < 1) {
      visitMessage.textContent = "Back so soon! Awesome!";
    } else if (diffDays === 1) {
      visitMessage.textContent = "You last visited 1 day ago.";
    } else {
      visitMessage.textContent = `You last visited ${diffDays} days ago.`;
    }
  }
  // store current timestamp for next visit
  localStorage.setItem(LAST_VISIT_KEY, now.toString());

  // 2) build 8 cards from imported places
  // We'll set a1..a8 as grid areas via style.gridArea for each card
  const areaNames = ['a1','a2','a3','a4','a5','a6','a7','a8'];

  // sanitize function for text nodes
  const text = (s) => {
    const div = document.createElement('div');
    div.textContent = s;
    return div.textContent;
  };

  places.forEach((p, i) => {
    const card = document.createElement('article');
    card.className = 'discover-card';
    // assign named area
    const area = areaNames[i] || `a${i+1}`;
    card.style.gridArea = area;

    // card structure: h2, figure>img, address, p, button
    const h2 = document.createElement('h2');
    h2.textContent = p.title;

    const figure = document.createElement('figure');
    const img = document.createElement('img');
    img.src = `images/${p.image}`;
    img.alt = p.title + ' — image';
    img.width = 300;
    img.height = 200;
    img.loading = 'lazy'; // lazy load for performance
    figure.appendChild(img);

    const addr = document.createElement('address');
    addr.textContent = p.address;

    const desc = document.createElement('p');
    desc.textContent = p.description;

    const btn = document.createElement('button');
    btn.className = 'learn-btn';
    btn.type = 'button';
    btn.textContent = 'Learn More';
    btn.addEventListener('click', () => {
      // simple modal-like detail using alert for now (or expand later)
      alert(`${p.title}\n\n${p.address}\n\n${p.description}`);
    });

    card.appendChild(h2);
    card.appendChild(figure);
    card.appendChild(addr);
    card.appendChild(desc);
    card.appendChild(btn);

    grid.appendChild(card);
  });
});
