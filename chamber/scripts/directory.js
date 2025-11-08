const directory = document.querySelector("#directory");
const gridBtn = document.querySelector("#gridBtn");
const listBtn = document.querySelector("#listBtn");

async function loadMembers() {
  try {
    const response = await fetch("data/members.json");
    const data = await response.json();
    displayMembers(data.members);
  } catch (error) {
    console.error("Error loading members:", error);
  }
}

function getMembershipName(level) {
  switch (level) {
    case 3: return "Gold Member 🥇";
    case 2: return "Silver Member 🥈";
    case 1: return "Member 🟢";
    default: return "Standard Member";
  }
}

function displayMembers(members) {
  directory.innerHTML = "";

  members.forEach(member => {
    const card = document.createElement("div");
    card.classList.add("member-card");

    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name}" class="member-image">
      <div class="member-info">
        <h2>${member.name}</h2>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <a href="${member.website}" target="_blank" rel="noopener">${member.website}</a>
        <p><strong>${getMembershipName(member.membershipLevel)}</strong></p>
      </div>
    `;

    directory.appendChild(card);
  });
}

gridBtn.addEventListener("click", () => {
  directory.classList.add("grid");
  directory.classList.remove("list");
  gridBtn.classList.add("active");
  listBtn.classList.remove("active");
});

listBtn.addEventListener("click", () => {
  directory.classList.add("list");
  directory.classList.remove("grid");
  listBtn.classList.add("active");
  gridBtn.classList.remove("active");
});

loadMembers();
