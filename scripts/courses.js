const courses = [
  { code: 'WDD101', title: 'Intro to Web Dev', credits: 3, subject: 'WDD', completed: true },
  { code: 'WDD131', title: 'HTML & CSS', credits: 3, subject: 'WDD', completed: true },
  { code: 'WDD231', title: 'Responsive Layouts', credits: 3, subject: 'WDD', completed: false },
  { code: 'CSE101', title: 'Intro to Programming', credits: 4, subject: 'CSE', completed: true },
  { code: 'CSE205', title: 'Data Structures', credits: 4, subject: 'CSE', completed: false }
];

function renderCourses(filter = 'all') {
  const container = document.getElementById('courses');
  const totalEl = document.getElementById('totalCredits');
  if (!container) return;

  let displayed = courses.slice();
  if (filter === 'WDD') displayed = displayed.filter(c => c.subject === 'WDD');
  if (filter === 'CSE') displayed = displayed.filter(c => c.subject === 'CSE');

  container.innerHTML = '';

  displayed.forEach(c => {
    const card = document.createElement('article');
    card.className = 'course-card' + (c.completed ? ' completed' : '');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `${c.code} ${c.title} ${c.completed ? 'completed' : 'not completed'}`);
    card.innerHTML = `
      <h3>${c.code} — ${c.title}</h3>
      <div class="course-meta">Subject: ${c.subject} · Credits: ${c.credits} ${c.completed ? '· ✅ Completed' : ''}</div>
    `;
    container.appendChild(card);
  });

  // compute total credits for currently displayed courses
  const total = displayed.reduce((acc, cur) => acc + (Number(cur.credits) || 0), 0);
  if (totalEl) totalEl.textContent = total;
}

document.addEventListener('DOMContentLoaded', () => {
  renderCourses('all');

  const buttons = document.querySelectorAll('.filter-buttons .filter-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      // update aria-pressed and active class
      buttons.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed','false'); });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed','true');

      const filter = btn.getAttribute('data-filter');
      renderCourses(filter);
    });
  });
});
