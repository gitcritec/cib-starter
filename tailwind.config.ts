import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
  purge: {
    content: [
      './src/**/*.{js,jsx,ts,tsx}',
      // outros arquivos que contêm referências de classes
    ],
    safelist: [
      'grid-cols-12',
      'col-span-6',
      'col-span-4',
      'col-span-3',
      'col-span-12',
    ]
  },
};
export default config;
