/** @type {import('tailwindcss').Config}  */

module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,tsx,jsx}",
    ],
    theme: {
        extend: {
            keyframes: {
                fadeIn: {
                    "0%": { opactiy: 0, transform: "scale(0.9)" },
                    "100%": { opactiy: 1, transform: "scale(1)" }
                },
            },
            animation: {
                fadeIn: "fadeIn 0.5s ease-out forwards"
            },
            colors: {
                primary: "#1e40af",
            },
        },
    },
    plugins: [],
}