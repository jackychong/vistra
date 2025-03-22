import { TypographyOptions } from "@mui/material/styles";
import localFont from "next/font/local";

const vistraSans = localFont({
  src: [
    {
      path: "./fonts/VistraSans-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/VistraSans-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/VistraSans-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/VistraSans-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  fallback: ["Arial", "Helvetica", "sans-serif"],
  preload: true,
  variable: "--font-vistra-sans",
});

export const typography: TypographyOptions = {
  fontFamily: vistraSans.style.fontFamily,
  h1: {
    fontWeight: 700,
  },
  h2: {
    fontWeight: 700,
  },
  h3: {
    fontWeight: 600,
  },
  h4: {
    fontWeight: 600,
  },
  h5: {
    fontWeight: 500,
  },
  h6: {
    fontWeight: 500,
  },
  subtitle1: {
    fontWeight: 500,
  },
  subtitle2: {
    fontWeight: 500,
  },
  body1: {
    fontWeight: 400,
  },
  body2: {
    fontWeight: 400,
  },
  button: {
    fontWeight: 500,
    textTransform: "none",
  },
};
