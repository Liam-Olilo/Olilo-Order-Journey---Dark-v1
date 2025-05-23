import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
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
        // Figma design colors
        figma: {
          // Dark backgrounds
          "bg-darkest": "#0d0e11",
          "bg-darker": "#15171a",
          "bg-dark": "#171a1d",
          "bg-medium": "#25282d",
          "bg-light": "#2d3136",
          // Purple accent colors
          "accent-primary": "#bddfef",
          "accent-light": "#a5c7d7",
          "accent-lighter": "#8fb8c9",
          // Light grays
          "gray-light": "#dadde2",
          "gray-lighter": "#e9ebee",
          "gray-medium": "#606670",
          // Green tones
          "green-dark": "#616f3c",
          "green-light": "#7d8f4c",
          // Gray
          "gray-dark": "#474c54",
        },
        // Button colors using Figma design tokens
        "btn-filled": {
          DEFAULT: "#bddfef", // Purple for filled buttons
          hover: "#a5c7d7",
          pressed: "#8fb8c9",
          disabled: "#39384b",
        },
        "btn-faint": {
          DEFAULT: "#a5c7d7", // Lighter purple for faint buttons
          hover: "#8fb8c9",
          pressed: "#7da9b8",
          disabled: "#39384b",
        },
        "btn-outlined": {
          DEFAULT: "#25282d", // Dark gray for outlined buttons
          hover: "#2d3136",
          pressed: "#1a1c20",
          disabled: "#25282d",
          border: "#474c54",
        },
        "btn-muted": {
          DEFAULT: "#2c2b34", // Darker gray for muted buttons
          hover: "#39384b",
          pressed: "#25242c",
          disabled: "#25282d",
        },
        "btn-destructive": {
          DEFAULT: "#b73f54", // Red for destructive buttons
          hover: "#e15970",
          pressed: "#9e3548",
          disabled: "#4a2028",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
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
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
