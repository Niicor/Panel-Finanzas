/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                neon: {
                    green: '#10B981',
                    red: '#F43F5E',
                }
            }
        },
    },
    plugins: [],
}
