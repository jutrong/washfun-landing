import type { Config } from "tailwindcss";

// 워시펀 디자인 토큰(design-system/tokens.json)에서 만든 preset. 고치려면 npm run tokens:build.
// eslint-disable-next-line @typescript-eslint/no-var-requires
const tokensPreset = require("./design-system/generated/tailwind-preset.cjs");
const tokenColors = tokensPreset.theme.extend.colors;

const config: Config = {
  presets: [tokensPreset],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      "2xl": { max: "1535px" },
      // => @media (max-width: 1535px) { ... }

      xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      lg: { max: "1023px" },
      // => @media (max-width: 1023px) { ... }

      md: { max: "767px" },
      // => @media (max-width: 767px) { ... }

      sm: { max: "639px" },
      // => @media (max-width: 639px) { ... }
      sx: { min: "767px" },
    },
 
    extend: {
      backgroundImage: {
        "cover-image": "url('/cover.png')",
      },
      colors: {
        primary: "#2E87FF",
        subPrimary: "#0547F5",
        white: "#FFFFFF",
        gray: "#4F5055",
        lightGray: "#ecf0f1",
        lightPrimary: "#EFF6FF",
        lightSubPrimary: "#EBF3FF",
        lightPrimary2: "#F5F9FF",
        lightPrimary3: "#F5F9FF",
        lightPrimary4: "#F9FBFF",
        lightPrimary5: "#FEFFFF",
        black: tokenColors.fg.neutral,
        color: "white",
        day: "linear-gradient(180deg, #F5F9FF 0%, #EFF6FF 100%)",
        primary2: tokenColors.bg["brand-solid"],
  
        secondaryDefault: tokenColors.fg["neutral-muted"],
        secondaryForeground: "#F9F9FA",
        main: "#1C73BA",
        borderStrong: tokenColors.stroke["neutral-weak"],
        

      },
      height: {
        "200vh": "200vh",
        "250vh": "250vh",
        "300vh": "300vh",
        "400vh": "400vh",
      },
      width: {
        "400px": "400px",
        "500px": "500px",
        "600px": "600px",
        "700px": "700px",
        "800px": "800px",
        "900px": "900px",
        "1000px": "1000px",
      },
      fontFamily: {
        Jamsil: ["Jamsil-bold"],
        Poppins: ["Poppins"],
        PoppinsBlack: ["Poppins-Black"],
        PoppinsExtraBold: ["Poppins-ExtraBold"],
        Pretendard: ["var(--font-pretendard)", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
        NotoSansKR: ["NotoSansKR"],
        OneMobilePOP: ["ONE-Mobile-POP"],
      },
      boxShadow: {
        "primary-shadow": "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
      },
    },
  },
  plugins: [],
};
export default config;
