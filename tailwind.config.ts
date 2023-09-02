import daisyui from "daisyui";

export default {
  plugins: [daisyui],
  daisyui: { themes: [], logs: false },
  content: ["./**/*.tsx"],
  theme: {
    container: { center: true },
    extend: {
      fontFamily: {
        "Poppins-Medium": ["Poppins-medium"],
        "Poppins-Regular": ["Poppins-regular"],
        "Poppins-SemiBold": ["Poppins-semibold"],
        "Element-Icons": ["ElementIcons"],
      },
      colors: {
        "pre-header": "#000000",
        "default": "#fff",
        "danger": "#b12534",
      },
    },
    fontSize: {
      xs: ["0.75rem", "1rem"],
      sm: "0.94rem",
      base: "1rem",
      xl: ".940rem",
      "2xl": "1.563rem",
      "3xl": "1.953rem",
      "4xl": "2.441rem",
      "5xl": "3.052rem",
    },
  },
};
