/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark Dashboard Design System Colors
        "dark-bg": "#0D0D0D",
        "dark-panel": "#1A1A1A",
        "dark-card": "#111111",
        "primary-blue": "#1E90FF",
        "success-green": "#00D084",
        "danger-red": "#FF4D4F",
        "warning-yellow": "#FADB14",
        "info-cyan": "#13C2C2",
        "text-primary": "#FFFFFF",
        "text-secondary": "#A6A6A6",
        "border-dark": "#2E2E2E",
        "blue-accent": "#1976D2",
        "green-accent": "#00C853",
        "red-accent": "#D32F2F",
        "gray-accent": "#B0BEC5",
      },
    },
  },
};
