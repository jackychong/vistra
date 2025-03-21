import { TypographyOptions } from "@mui/material/styles/createTypography";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const typography: TypographyOptions = {
  fontFamily: inter.style.fontFamily,
};
