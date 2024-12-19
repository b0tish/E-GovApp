/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["app/**/*.{js,jsx}", "components/**/*/.{js,jsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend:
    {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },

      fontFamily: {
<<<<<<< HEAD
        sans: ["Inter", "ui-sans-serif", "system-ui"],
=======
        inter: ["Inter", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        concert: ['"Concert One"', "cursive"],
        squada: ['"Squada One"', "sans-serif"],
        nepali: ["Noto Sans Devanagari", "sans-serif"],

        jaini: ["Jaini", "Noto Sans Devanagari"],
        kalam: ["Kalam", "Noto Sans Devanagari"],

        amita: ["amita", "Noto Sans Devanagari"],
>>>>>>> cb277b135c3afdac5c3a6d986181e41a0722f593
      },
    },
  },
  plugins: [],
};

