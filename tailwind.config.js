/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                "alegreya-sans": ["Alegreya Sans", "sans-serif"],
                inter: ["Inter", "sans-serif"],
                "open-sans": ["Open Sans", "sans-serif"],
                "roboto-slab": ["Roboto Slab", "serif"],
            },
        },
    },
    plugins: [],
};
