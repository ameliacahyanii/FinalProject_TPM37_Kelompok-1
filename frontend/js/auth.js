async function loginController(teamName, password) {
  const errorText = document.getElementById("errorText");

  try {
    const res = await apiRequest("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        name: teamName,
        password,
      }),
    });

    if (res.token) {
      localStorage.setItem("token", res.token);
    }

    window.location.href = "./admin/user-dashboard.html"; 
  } catch (err) {
    if (errorText) {
      errorText.textContent = err.message || "Login gagal";
      errorText.classList.remove("hidden");
    } else {
      console.error("Error text element not found:", err.message || "Login gagal");
    }
  }
}

async function adminLoginController(username, password) {
  const errorText = document.getElementById("errorText");

  try {
    const res = await apiRequest("/api/auth/admin-login", {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (res.token) {
      localStorage.setItem("token", res.token);
      localStorage.setItem("userRole", res.role || "admin");
    }

    window.location.href = "./admin-panel.html";
  } catch (err) {
    if (errorText) {
      errorText.textContent = err.message || "Login admin gagal";
      errorText.classList.remove("hidden");
    }
  }
}

function adminLoginvalidate() {
  const usernameInput = document.getElementById("teamInput");
  const passwordInput = document.getElementById("passwordInput");
  const errorText = document.getElementById("errorText");

  const username = usernameInput?.value?.trim();
  const password = passwordInput?.value?.trim();

  if (errorText) errorText.classList.add("hidden");
  usernameInput?.classList.remove("border-red-500");
  passwordInput?.classList.remove("border-red-500");

  let isValid = true;

  if (!username) {
    usernameInput?.classList.add("border-red-500");
    isValid = false;
  }

  if (!password) {
    passwordInput?.classList.add("border-red-500");
    isValid = false;
  }

  if (!isValid) {
    if (errorText) errorText.classList.remove("hidden");
    return;
  }

  adminLoginController(username, password);
}

// register controller
async function registerTeam() {
  const payload = {
    name: "Debuggers",
    password: "123456",
    fullName: "Val",
    email: "val@test.com",
    whatsapp: "081234567890",
    lineId: "val_line",
    githubId: "valgithub",
    birthPlace: "Jakarta",
    birthDate: "2000-01-01",
    cvFile: "examplecv.pdf",
    idCardFile: "exampleidcard.png",
  };

  try {
    const res = await apiRequest("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    console.log("REGISTER SUCCESS:", res);
  } catch (err) {
    console.error("REGISTER FAILED:", err.message);
  }
}

