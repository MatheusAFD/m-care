import type { Config } from 'tailwindcss'

export default {
  content: ['./src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'green-dark': '#285430',
        green: '#5F8D4E',
        'green-lite': '#F4FFF3',
        black: '#181C32',
        grey: '#C9C9C9',
        'grey-lite': '#FAFAFA'
      }
    }
  },
  plugins: []
} satisfies Config
