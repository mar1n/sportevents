import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',

        // ⭐ These make your classes work
        brand: {
          DEFAULT: '#0ea5a4', // bg-brand
          strong: '#0b9b98', // hover:bg-brand-strong
          medium: '#34d1ce', // focus:ring-brand-medium
        },
      },
      borderRadius: {
        base: '0.5rem', // rounded-base
      },
      boxShadow: {
        xs: '0 1px 2px 0 rgba(0,0,0,0.05)', // shadow-xs
      },
    },
  },
  plugins: [],
} satisfies Config
