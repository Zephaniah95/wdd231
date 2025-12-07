document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("spotlight-container");

  try {
    const response = await fetch("data/members.json");
    const data = await response.json();

    const filtered = data.members.filter(m =>
      m.membership === "Gold" || m.membership === "Silver"
    );

    const selected = filtered.sort(() => Math.random() - 0.5).slice(0, 3);

    container.innerHTML = "";

    selected.forEach(member => {
      const card = document.createElement("div");
      card.classList.add("spotlight-card");

      card.innerHTML = `
        <img src="${member.image}" alt="${member.name} logo">
        <h3>${member.name}</h3>
        <p>${member.phone}</p>
        <p>${member.address}</p>
        <a href="${member.website}" target="_blank">Visit Website</a>
        <p><strong>${member.membership} Member</strong></p>
      `;

      container.appendChild(card);
    });

  } catch (err) {
    container.innerHTML = "<p>Error loading spotlight members</p>";
  }
});
