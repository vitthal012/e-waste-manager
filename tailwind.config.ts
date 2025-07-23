// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: "class", // Use class strategy for next-themes

  content: [
    // Paths to scan for Tailwind classes
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  theme: {
    // Theme customizations go here
    extend: {
      // Example: Add custom colors, fonts, etc.
      // colors: {
      //   'brand-blue': '#0070f3',
      // },
    },
  },

  plugins: [
    // List of Tailwind plugins
    require("tailwindcss-animate"),      // For shadcn/ui animations
    require("@tailwindcss/typography"), // For styling raw HTML (like Gemini output)
  ],

}; // End of the main config object

export default config; // Use ES Module export