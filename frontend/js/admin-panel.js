lucide.createIcons();

let data = [
  {
    name: "Ackerman",
    leader: "Alucard",
    email: "alu22@gmail.com",
    date: "2025-05-03",
    members: ["Miya", "Cecil"],
  },
  {
    name: "Nielman",
    leader: "Layla",
    email: "lay@gmail.com",
    date: "2025-05-06",
    members: ["Bruno"],
  },
  {
    name: "Telemoth",
    leader: "Saber",
    email: "sab@gmail.com",
    date: "2025-05-10",
    members: ["Ruby"],
  },
  {
    name: "Avenoir",
    leader: "Tigreal",
    email: "tig@gmail.com",
    date: "2025-05-11",
    members: ["Zilong", "Franco"],
  },
  {
    name: "Ophelia",
    leader: "Freya",
    email: "freya@gmail.com",
    date: "2025-05-20",
    members: ["Eudora", "Alice", "Guinevere"],
  },
];

let selectedIndex = null;

// Format date helper
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

// Render Functions
function render() {
  const searchQuery = document
    .getElementById("searchInput")
    .value.toLowerCase();
  const tbody = document.getElementById("tbody");
  const mobile = document.getElementById("mobileList");
  const emptyState = document.getElementById("emptyState");

  tbody.innerHTML = "";
  mobile.innerHTML = "";

  const filteredData = data.filter(
    (d) =>
      d.name.toLowerCase().includes(searchQuery) ||
      d.leader.toLowerCase().includes(searchQuery) ||
      d.email.toLowerCase().includes(searchQuery),
  );

  if (filteredData.length === 0) {
    emptyState.classList.remove("hidden");
    return;
  }

  emptyState.classList.add("hidden");

  filteredData.forEach((d, i) => {
    const originalIndex = data.indexOf(d);

    // Desktop Table Row
    tbody.innerHTML += `
            <tr class="table-row border-b border-border">
              <td class="px-8 py-5">
                <p class="text-lg font-medium text-brand-dark">${d.name}</p>
              </td>
              <td class="px-8 py-5">
                <p class="text-lg text-brand-dark">${formatDate(d.date)}</p>
              </td>
              <td class="px-8 py-5">
                <div class="flex items-center justify-center gap-3">
                  <button
                    onclick="openView(${originalIndex})"
                    class="action-btn p-2 text-brand hover:bg-brand/10 rounded-lg"
                    title="View"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </button>
                  <button
                    onclick="openEdit(${originalIndex})"
                    class="action-btn p-2 text-brand hover:bg-brand/10 rounded-lg"
                    title="Edit"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
                      <path d="m15 5 4 4"></path>
                    </svg>
                  </button>
                  <button
                    onclick="openDelete(${originalIndex})"
                    class="action-btn p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    title="Delete"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M3 6h18"></path>
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          `;

    // Mobile Card
    mobile.innerHTML += `
            <div class="bg-white/80 backdrop-blur-sm border border-border rounded-2xl p-4 shadow-sm">
              <div class="mb-3">
                <h3 class="font-semibold text-brand-dark text-lg mb-1">${d.name}</h3>
                <p class="text-sm text-brand-dark">${formatDate(d.date)}</p>
              </div>
              
              <div class="flex items-center gap-2 pt-3 border-t border-border">
                <button
                  onclick="openView(${originalIndex})"
                  class="flex-1 py-2 px-3 bg-brand/10 text-brand rounded-xl font-medium hover:bg-brand/20 transition flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                  View
                </button>
                <button
                  onclick="openEdit(${originalIndex})"
                  class="flex-1 py-2 px-3 bg-brand/10 text-brand rounded-xl font-medium hover:bg-brand/20 transition flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
                    <path d="m15 5 4 4"></path>
                  </svg>
                  Edit
                </button>
                <button
                  onclick="openDelete(${originalIndex})"
                  class="py-2 px-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M3 6h18"></path>
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                  </svg>
                </button>
              </div>
            </div>
          `;
  });
}

// Search Handler
function handleSearch() {
  render();
}

// Sort Function
function sortData(type) {
  if (type === "az") {
    data.sort((a, b) => a.name.localeCompare(b.name));
  } else if (type === "za") {
    data.sort((a, b) => b.name.localeCompare(a.name));
  } else if (type === "date-asc") {
    data.sort((a, b) => new Date(a.date) - new Date(b.date));
  } else if (type === "date-desc") {
    data.sort((a, b) => new Date(b.date) - new Date(a.date));
  }
  render();
}

// View Modal
function openView(index) {
  const d = data[index];

  document.getElementById("vName").textContent = d.name;
  document.getElementById("vLeader").textContent = d.leader;
  document.getElementById("vEmail").textContent = d.email;
  document.getElementById("vDate").textContent = formatDate(d.date);

  const membersHtml =
    d.members.length > 0
      ? d.members
          .map(
            (m) =>
              `<div class="flex items-center gap-2 py-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-brand">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                      <span class="text-muted">${m}</span>
                    </div>`,
          )
          .join("")
      : '<p class="text-muted text-sm">No members</p>';

  document.getElementById("vMembers").innerHTML = membersHtml;

  openModal("viewModal");
}

// Edit Modal
function openEdit(index) {
  selectedIndex = index;
  const d = data[index];

  document.getElementById("eName").value = d.name;
  document.getElementById("eLeader").value = d.leader;
  document.getElementById("eEmail").value = d.email;
  document.getElementById("eDate").value = d.date;

  renderMemberFields(d.members);
  openModal("editModal");
}

function renderMemberFields(members) {
  const container = document.getElementById("memberList");
  container.innerHTML = "";

  members.forEach((m, index) => {
    const div = document.createElement("div");
    div.className = "flex gap-2";
    div.innerHTML = `
            <input class="member-input flex-1 px-4 py-3 bg-white/70 border border-border rounded-2xl text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand/30" value="${m}" placeholder="Member name" />
            <button onclick="removeMember(${index})" class="text-red-500 hover:text-red-700 px-3 py-2 hover:bg-red-50 rounded-xl transition">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
            </button>
          `;
    container.appendChild(div);
  });
}

function addMemberField() {
  const container = document.getElementById("memberList");
  const div = document.createElement("div");
  div.className = "flex gap-2";
  div.innerHTML = `
          <input class="member-input flex-1 px-4 py-3 bg-white/70 border border-border rounded-2xl text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand/30" placeholder="New member name" />
          <button onclick="this.parentElement.remove()" class="text-red-500 hover:text-red-700 px-3 py-2 hover:bg-red-50 rounded-xl transition">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </button>
        `;
  container.appendChild(div);
}

function removeMember(index) {
  data[selectedIndex].members.splice(index, 1);
  renderMemberFields(data[selectedIndex].members);
}

function saveEdit() {
  const memberInputs = document.querySelectorAll(".member-input");
  const members = Array.from(memberInputs)
    .map((input) => input.value.trim())
    .filter((value) => value !== "");

  const name = document.getElementById("eName").value.trim();
  const leader = document.getElementById("eLeader").value.trim();
  const email = document.getElementById("eEmail").value.trim();
  const date = document.getElementById("eDate").value;

  if (!name || !leader || !email || !date) {
    alert("Please fill in all required fields");
    return;
  }

  data[selectedIndex] = {
    name,
    leader,
    email,
    date,
    members,
  };

  closeModal("editModal");
  render();
}

// Delete Modal
function openDelete(index) {
  selectedIndex = index;
  openModal("deleteModal");
}

function confirmDelete() {
  data.splice(selectedIndex, 1);
  closeModal("deleteModal");
  render();
}

// Modal Controls
function openModal(id) {
  const modal = document.getElementById(id);
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.body.style.overflow = "hidden";
}

function closeModal(id) {
  const modal = document.getElementById(id);
  modal.classList.add("hidden");
  modal.classList.remove("flex");
  document.body.style.overflow = "auto";
}

function closeModalOnOverlay(event, id) {
  if (event.target === event.currentTarget) {
    closeModal(id);
  }
}

render();

function toggleSort() {
  const sortMenu = document.getElementById("sortMenu");
  sortMenu.classList.toggle("hidden");
}

function selectSort(value, label) {
  document.getElementById("sortLabel").textContent = label;
  document.getElementById("sortMenu").classList.add("hidden");
  sortData(value);
}

document.addEventListener("click", (e) => {
  if (!e.target.closest(".relative")) {
    document.getElementById("sortMenu")?.classList.add("hidden");
  }
});
