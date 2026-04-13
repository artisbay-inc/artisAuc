/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './styles/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#1E398A',
        secondary: '#1DA1F2',
        accent: '#FF9900',
        ink: '#0f172a',
        muted: '#4b5563',
        surface: '#f7f9fd',
        border: '#e5e7eb',
      },
    },
  },
  plugins: [],
}

