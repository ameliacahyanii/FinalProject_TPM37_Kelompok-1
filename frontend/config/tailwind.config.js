tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui"],
        display: ["Changa", "Poppins", "sans-serif"],
      },
      colors: {
        // Background Colors
        background: "#04081F",
        surface: "#5C4DEC",
        nav: "#27216A",

        // Brand Colors
        brand: "#5C4DEC",
        "brand-dark": "#27216A",
        branding: "#FBF2FF",

        // Accent Colors
        accent: "#F482FE",

        // Text Colors
        heading: "#FBF2FF",
        body: "#D7C4FF",
        muted: "#848199",

        // Border Colors
        border: "rgba(215,196,255,0.35)",
      },
      animation: {
        // Float animation for trophy
        float: "float 6s ease-in-out infinite",

        // Glow effect
        glow: "glow 2s ease-in-out infinite alternate",

        // Scroll animation for media partners
        scroll: "scroll 30s linear infinite",

        // Fade in animation
        "fade-in": "fadeIn 0.6s ease-out forwards",
      },
      keyframes: {
        // Float up and down
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },

        // Glow effect
        glow: {
          "0%": { boxShadow: "0 0 20px rgba(215,196,255,0.3)" },
          "100%": { boxShadow: "0 0 40px rgba(244,130,254,0.5)" },
        },

        // Horizontal scroll
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },

        // Fade in
        fadeIn: {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        "glow-sm": "0 0 10px rgba(215,196,255,0.3)",
        "glow-md": "0 0 20px rgba(215,196,255,0.4)",
        "glow-lg": "0 0 30px rgba(244,130,254,0.5)",
        "glow-xl": "0 0 40px rgba(244,130,254,0.6)",
      },
      zIndex: {
        60: "60",
        70: "70",
        80: "80",
        90: "90",
        100: "100",
      },
      backdropBlur: {
        xs: "2px",
      },
      screens: {
        xs: "475px",
        "3xl": "1920px",
      },
      animation: {
        "modal-in": "modalIn 0.3s ease-out",
      },
      keyframes: {
        modalIn: {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
  content: ["./index.html", "./js/**/*.js", "./pages/**/*.html"],
  darkMode: "class",
};
