lucide.createIcons();

// Modal functionality
const logoutBtn = document.getElementById("logoutBtn");
const logoutModal = document.getElementById("logoutModal");
const cancelBtn = document.getElementById("cancelBtn");
const confirmLogoutBtn = document.getElementById("confirmLogoutBtn");

logoutBtn.addEventListener("click", () => {
  logoutModal.classList.remove("hidden");
  logoutModal.classList.add("flex");
  lucide.createIcons();
});

cancelBtn.addEventListener("click", () => {
  logoutModal.classList.add("hidden");
  logoutModal.classList.remove("flex");
});

logoutModal.addEventListener("click", (e) => {
  if (e.target === logoutModal) {
    logoutModal.classList.add("hidden");
    logoutModal.classList.remove("flex");
  }
});

confirmLogoutBtn.addEventListener("click", () => {
  console.log("Logging out...");

  // For demo purposes:
  alert("Logout successful!");
  logoutModal.classList.add("hidden");
  logoutModal.classList.remove("flex");
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !logoutModal.classList.contains("hidden")) {
    logoutModal.classList.add("hidden");
    logoutModal.classList.remove("flex");
  }
});
