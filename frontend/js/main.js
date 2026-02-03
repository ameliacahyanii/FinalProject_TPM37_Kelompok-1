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
