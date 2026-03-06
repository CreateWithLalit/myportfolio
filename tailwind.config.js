/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "portfolio-bg": "#F7F8F0",
                "portfolio-accent": "#4988C4",
                "portfolio-text": "#1a1a1a",
                "portfolio-muted": "#6b7280",
                "portfolio-card": "#ffffff",
                "portfolio-hero": "#F0F4FA",
                "portfolio-alt": "#F0F4F9",
            },
            fontFamily: {
                fraunces: ["Fraunces", "serif"],
                "dm-sans": ["DM Sans", "sans-serif"],
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};