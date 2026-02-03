// login controlller
// async function loginController(teamName, password) {
//   const errorText = document.getElementById("errorText");

//   try {
//     const res = await apiRequest("/api/auth/login", {
//       method: "POST",
//       body: JSON.stringify({
//         teamName,
//         password,
//       }),
//     });

//     if (res.token) {
//       localStorage.setItem("token", res.token);
//     }

//     // success redirect
//     window.location.href = "./dashboard.html";
//   } catch (err) {
//     errorText.textContent = err.message || "Login gagal";
//     errorText.classList.remove("hidden");
//   }
// }

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

