/** @type {import('tailwindcss').Config}  */

module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,tsx,jsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#1e40af",
            },
        },
    },
    plugins: [],
}