tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui"],
        display: ["Changa", "Poppins", "sans-serif"],
      },
      colors: {
        /* Base */
        background: "#04081F", // body bg
        surface: "#5C4DEC", // card, input, bubble soft
        nav: "#27216A", // navbar & footer

        /* Brand & Accent */
        brand: "#5C4DEC",
        "brand-dark": "#27216A",
        accent: "#F482FE",

        /* Text */
        heading: "#FBF2FF", // title / heading
        body: "#D7C4FF", // paragraph / icon
        muted: "#848199",

        /* UI */
        border: "rgba(215,196,255,0.35)",
      },
      borderRadius: {
        base: "0.5rem",
        lg: "0.75rem",
      },
    },
  },
};
