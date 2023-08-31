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
      },
      colors: {
        "pre-header": "#000000",
      },
    },
  },
};
