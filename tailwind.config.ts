import type { Config } from "tailwindcss";
import daisyui from "daisyui";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        one: 'var(--one)',
        two: 'var(--two)',
        five: 'var(--five)',
        ten: 'var(--ten)',
        cf: 'var(--cf)',
        pch: 'var(--pch)',
        ch: 'var(--ch)',
        ct: 'var(--ct)',
      },
      fontFamily: {
        rye: ['var(--font-rye)']
      }
    }
  },
  daisyui: {
    themes: [
      "nord"
    ],
  },
  plugins: [daisyui],
};
export default config;
