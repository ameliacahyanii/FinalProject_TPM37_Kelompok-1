(function () {
  "use strict";

  /* FAQ ACCORDION FUNCTIONALITY */
  const initFAQAccordion = () => {
    const faqButtons = document.querySelectorAll(".faq-btn");

    if (!faqButtons.length) return;

    faqButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const faqItem = this.closest(".faq-item");
        const content = faqItem.querySelector(".faq-content");
        const icon = faqItem.querySelector(".faq-icon");

        const isActive = content.classList.contains("active");

        document.querySelectorAll(".faq-item").forEach((item) => {
          const itemContent = item.querySelector(".faq-content");
          const itemIcon = item.querySelector(".faq-icon");

          itemContent.classList.remove("active");
          itemIcon.textContent = "+";
        });

        if (!isActive) {
          content.classList.add("active");
          icon.textContent = "−";
        }
      });
    });
  };

  /* SMOOTH SCROLL WITH NAVBAR OFFSET */
  const initSmoothScroll = () => {
    const anchors = document.querySelectorAll('a[href^="#"]');

    if (!anchors.length) return;

    const navbarHeight = 80;

    anchors.forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        const href = this.getAttribute("href");

        if (!href || href === "#") return;

        const target = document.querySelector(href);

        if (target) {
          e.preventDefault();

          const targetPosition =
            target.getBoundingClientRect().top +
            window.pageYOffset -
            navbarHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });

          const mobileMenu = document.getElementById("navbar-sticky");
          if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
            mobileMenu.classList.add("hidden");
          }
        }
      });
    });
  };

  /* MOBILE MENU TOGGLE */
  const initMobileMenu = () => {
    const menuButton = document.querySelector(
      '[data-collapse-toggle="navbar-sticky"]',
    );
    const mobileMenu = document.getElementById("navbar-sticky");

    if (!menuButton || !mobileMenu) return;

    menuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");

      const isExpanded = !mobileMenu.classList.contains("hidden");
      menuButton.setAttribute("aria-expanded", isExpanded);
    });

    document.addEventListener("click", (e) => {
      if (!menuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.add("hidden");
        menuButton.setAttribute("aria-expanded", "false");
      }
    });
  };

  /* NAVBAR SCROLL EFFECT */
  const initNavbarScroll = () => {
    const navbar = document.querySelector("nav");

    if (!navbar) return;

    let lastScroll = 0;

    window.addEventListener("scroll", () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll > 10) {
        navbar.classList.add("shadow-lg");
      } else {
        navbar.classList.remove("shadow-lg");
      }

      lastScroll = currentScroll;
    });
  };

  /* INTERSECTION OBSERVER FOR ANIMATIONS */
  const initScrollAnimations = () => {
    if (!("IntersectionObserver" in window)) return;

    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
      observer.observe(section);
    });
  };

  /*LAZY LOADING IMAGES */
  const initLazyLoading = () => {
    if (!("IntersectionObserver" in window)) {
      const images = document.querySelectorAll('img[loading="lazy"]');
      images.forEach((img) => {
        if (img.dataset.src) {
          img.src = img.dataset.src;
        }
      });
      return;
    }

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute("data-src");
          }
          imageObserver.unobserve(img);
        }
      });
    });

    const images = document.querySelectorAll("img[data-src]");
    images.forEach((img) => imageObserver.observe(img));
  };

  /* FORM VALIDATION */
  const initFormValidation = () => {
    const form = document.querySelector("form");

    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(this);
      const data = Object.fromEntries(formData);

      let isValid = true;
      const inputs = this.querySelectorAll("input, textarea");

      inputs.forEach((input) => {
        if (input.hasAttribute("required") && !input.value.trim()) {
          isValid = false;
          input.classList.add("border-red-500");
        } else {
          input.classList.remove("border-red-500");
        }
      });

      if (isValid) {
        console.log("Form data:", data);
        alert("Thank you for your message! We will get back to you soon.");
        this.reset();
      } else {
        alert("Please fill in all required fields.");
      }
    });
  };

  const init = () => {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => {
        initFAQAccordion();
        initSmoothScroll();
        initMobileMenu();
        initNavbarScroll();
        initScrollAnimations();
        initLazyLoading();
        initFormValidation();
      });
    } else {
      initFAQAccordion();
      initSmoothScroll();
      initMobileMenu();
      initNavbarScroll();
      initScrollAnimations();
      initLazyLoading();
      initFormValidation();
    }
  };

  init();

  const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  const throttle = (func, limit) => {
    let inThrottle;
    return function (...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  };

  window.HackathonUtils = {
    debounce,
    throttle,
  };
})();

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

  if (!isValid) return;
  submitForm();
}

async function submitForm() {
  const emptyField = document.getElementById("emptyField");
  const registerButton = document.getElementById("registerButton");

  try {
    if (registerButton) registerButton.disabled = true;

    const nameInput = document.getElementById("name");
    const passwordInput = document.getElementById("password");
    const fullNameInput = document.getElementById("fullName");
    const emailInput = document.getElementById("email");
    const whatsappInput = document.getElementById("whatsapp");
    const lineIdInput = document.getElementById("lineID");
    const githubIdInput = document.getElementById("githubId");
    const birthPlaceInput = document.getElementById("birthPlace");
    const birthDateInput = document.getElementById("birthdateInput");
    const cvInput = document.getElementById("cvFile");
    const idCardInputs = document.querySelectorAll('input#idCardFile');

    const name = nameInput?.value?.trim();
    const password = passwordInput?.value?.trim();
    const fullName = fullNameInput?.value?.trim();
    const email = emailInput?.value?.trim();
    const whatsapp = whatsappInput?.value?.trim();
    const lineId = lineIdInput?.value?.trim();
    const githubId = githubIdInput?.value?.trim();
    const birthPlace = birthPlaceInput?.value?.trim();
    const birthDate = birthDateInput?.value;

    const cvFile = cvInput?.files?.[0];
    const idCardFile = Array.from(idCardInputs)
      .map((el) => el.files && el.files[0])
      .find(Boolean);

    if (!cvFile || !idCardFile) {
      if (emptyField) emptyField.classList.remove("hidden");
      return;
    }

    const formData = new FormData();
    formData.append("name", name || "");
    formData.append("password", password || "");
    formData.append("fullName", fullName || "");
    formData.append("email", email || "");
    formData.append("whatsapp", whatsapp || "");
    formData.append("lineId", lineId || "");
    formData.append("githubId", githubId || "");
    formData.append("birthPlace", birthPlace || "");
    formData.append("birthDate", birthDate || "");
    formData.append("cvFile", cvFile);
    formData.append("idCardFile", idCardFile);

    await apiRequest("/api/auth/register", {
      method: "POST",
      body: formData,
    });

    await loginController(name, password);
  } catch (err) {
    alert(err.message || "Registrasi gagal");
  } finally {
    if (registerButton) registerButton.disabled = false;
  }
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
const passwordInput = document.getElementById("password"); // register password input, not login
const passwordError = document.getElementById("passwordError");

if (passwordInput) passwordInput.addEventListener("input", () => {
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

if (confirmInput) confirmInput.addEventListener("input", validateConfirmPassword);
if (passwordInput) passwordInput.addEventListener("input", validateConfirmPassword);

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

if (emailInput) emailInput.addEventListener("input", validateEmail);

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

if (whatsappInput) whatsappInput.addEventListener("input", validateWhatsapp);

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

if (birthdateInput) birthdateInput.addEventListener("change", validateAge);

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
  loginController(teamName, password);
}

