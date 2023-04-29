import type { Config } from 'tailwindcss'

/**
 * # Tailwindcss Configuration file
 */
export default <Partial<Config>>{
  theme: {
    fontFamily: {
      'dm-sans': ['DM Sans', 'sans-serif'],
      recoleta: ['Recoleta', 'serif'],
    },
    extend: {
      colors: {
        brand: {
          pink: '#FFB9F8',
          purple: '#6532F8',
          black: '#0E0D10',
          'purple-dark': '#1A094B',
        },
      },
    },
  },
}
