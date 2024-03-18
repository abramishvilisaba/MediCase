/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                Montserrat: "Montserrat",
                FiraGO: "FiraGO",
            },
            screens: {
                tall: { raw: "(min-height: 800px)" },
                // => @media (min-height: 800px) { ... }
            },
            colors: {
                mainText: "#4D4D4D",
                secondaryText: "#5A7CC6",
                nav: "#99ACD1",
                bgMain: "#F1F5F9",
                bgLight: "#FCFCFC",
            },
        },
    },
    plugins: [],
};
