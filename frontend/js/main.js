// Multistep Navigation
const steps = document.querySelectorAll(".step");
let currentStep = 0;

function showStep() {
  steps.forEach((step, i) => {
    step.classList.toggle("hidden", i !== currentStep);
  });
}

function nextStep() {
  if (currentStep < steps.length - 1) {
    currentStep++;
    showStep();
  }
}

function prevStep() {
  if (currentStep > 0) {
    currentStep--;
    showStep();
  }
}

showStep();

// Form validation
function validateStep() {
  let isValid = true;

  steps.forEach((step) => {
    const requiredInputs = step.querySelectorAll("input[required]");
    const emptyField = document.getElementById("emptyField");

    requiredInputs.forEach((input) => {
      const empty =
        input.type === "file"
          ? input.files.length === 0
          : !input.value.trim();

      if (empty) {
        isValid = false;
        input.classList.add("border-red-500");
        emptyField.classList.remove("hidden");
      } else {
        input.classList.remove("border-red-500");
        emptyField.classList.add("hidden");
      }
    });
    return isValid;
  });
  submitForm();
}

document.querySelectorAll("input[required]").forEach((input) => {
  const handler = () => {
    const empty =
      input.type === "file"
        ? input.files.length === 0
        : !input.value.trim();

    if (!empty) {
      input.classList.remove("border-red-500");
    }
  };

  input.addEventListener("input", handler);
  input.addEventListener("change", handler);
});

// Password validation
const passwordInput = document.getElementById("password");
const passwordError = document.getElementById("passwordError");

passwordInput.addEventListener("input", () => {
  const password = passwordInput.value;

  const hasMinLength = password.length >= 8;
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);

  if (hasMinLength && hasLowercase && hasUppercase && hasNumber && hasSymbol) {
    // valid
    passwordInput.classList.remove("border-red-500");
    passwordError.classList.remove("text-red-500");
    passwordError.classList.add("opacity-50");
  } else {
    // invalid
    passwordInput.classList.add("border-red-500");
    passwordError.classList.add("text-red-500");
    passwordError.classList.remove("opacity-50");
  }
});

// Password Confirmation
const confirmInput = document.getElementById("confirmPassword");
const confirmHint = document.getElementById("confirmHint");

function validateConfirmPassword() {
  if (confirmInput.value.length === 0) {
    confirmInput.classList.remove("border-red-500");
    confirmHint.classList.remove("text-red-400");
    return;
  }

  if (confirmInput.value === passwordInput.value) {
    //match
    confirmInput.classList.remove("border-red-500");
    confirmHint.classList.remove("text-red-400");
    confirmHint.classList.add("opacity-50");
  } else {
    //not match
    confirmInput.classList.add("border-red-500");
    confirmHint.classList.add("text-red-400");
    confirmHint.classList.remove("opacity-50");
  }
}

confirmInput.addEventListener("input", validateConfirmPassword);
passwordInput.addEventListener("input", validateConfirmPassword);

// Email validation
const emailInput = document.getElementById("email");
const emailError = document.getElementById("emailError");

function validateEmail() {
  const email = emailInput.value.trim();

  // Simple but solid email regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Empty → neutral
  if (email.length === 0) {
    emailInput.classList.remove("border-red-500");
    emailError.classList.add("hidden");
    return;
  }

  if (emailRegex.test(email)) {
    // valid
    emailInput.classList.remove("border-red-500");
    emailHint.classList.add("opacity-50");
    emailHint.classList.remove("text-red-500");
  } else {
    // invalid
    emailInput.classList.add("border-red-500");
    emailHint.classList.remove("opacity-50");
    emailHint.classList.add("text-red-500");
  }
}

emailInput.addEventListener("input", validateEmail);

// Whatsapp validation
const whatsappInput = document.getElementById("whatsapp");
const whatsappError = document.getElementById("whatsappError");

function validateWhatsapp() {
  const value = whatsappInput.value.trim();

  // only digits, min 9
  const whatsappRegex = /^\d{9,}$/;

  // empty → neutral
  if (value.length === 0) {
    whatsappInput.classList.remove("border-red-500", "border-green-500");
    whatsappError.classList.add("hidden");
    return;
  }

  if (whatsappRegex.test(value)) {
    // valid
    whatsappInput.classList.remove("border-red-500");
    whatsappHint.classList.add("opacity-50");
    whatsappHint.classList.remove("text-red-500");
  } else {
    // invalid
    whatsappInput.classList.add("border-red-500");
    whatsappHint.classList.add("text-red-500");
    whatsappHint.classList.remove("opacity-50");
  }
}

whatsappInput.addEventListener("input", validateWhatsapp);

// Birthdate validation
const birthdateInput = document.getElementById("birthdateInput");
const birthdateHint = document.getElementById("birthdateHint");

function validateAge() {
  if (!birthdateInput.value) {
    birthdateInput.classList.remove("border-red-500", "border-green-500");
    return;
  }

  const today = new Date();
  const birthDate = new Date(birthdateInput.value);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();

  // adjust if birthday hasn't happened yet this year
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  if (age >= 17) {
    // valid
    birthdateInput.classList.remove("border-red-500");
    birthdateHint.classList.add("opacity-50");
    birthdateHint.classList.remove("text-red-500");
  } else {
    // invalid
    birthdateInput.classList.add("border-red-500");
    birthdateHint.classList.remove("opacity-50");
    birthdateHint.classList.add("text-red-500");
  }
}

birthdateInput.addEventListener("change", validateAge);

// Login validation
function loginvalidate() {
  const teamInput = document.getElementById("teamInput");
  const passwordInput = document.getElementById("passwordInput");
  const errorText = document.getElementById("errorText");

  const teamName = teamInput.value.trim();
  const password = passwordInput.value.trim();

  errorText.classList.add("hidden");
  teamInput.classList.remove("border-red-500");
  passwordInput.classList.remove("border-red-500");

  let isValid = true;

  if (!teamName) {
    teamInput.classList.add("border-red-500");
    isValid = false;
  }

  if (!password) {
    passwordInput.classList.add("border-red-500");
    isValid = false;
  }

  if (!isValid) {
    errorText.classList.remove("hidden");
    return;
  }

  // success
  window.location.href = "./dashboard.html";
}

