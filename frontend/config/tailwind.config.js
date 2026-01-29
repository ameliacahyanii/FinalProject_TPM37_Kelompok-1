tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui"],
        display: ["Changa", "Poppins", "sans-serif"],
      },
      colors: {
        background: "#04081F",
        surface: "#0B102F",

        brand: "#5C4DEC",
        "brand-dark": "#2D28BB",

        heading: "#FBF2FF",
        body: "#D7C4FF",
        muted: "#848199",

        accent: "#F482FE",
        "accent-soft": "#D7C4FF",

        border: "rgba(215,196,255,0.35)",
      },
      borderRadius: {
        base: "0.5rem",
      },
    },
  },
};
