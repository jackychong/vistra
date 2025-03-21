import { PaletteOptions } from "@mui/material";

// Vistra color system
const colors = {
  vistraBlue: "#0909b7",
  vistraWhite: "#fff",
  spaceBlue: "#001a5b",
  graphite: "#2a2a2a",
  grey: {
    500: "#2a2a2a",
    400: "#68696c",
    300: "#a6a9ad",
    200: "#e4e8ef",
    100: "#eff3f8",
  },
  blue: {
    500: "#2958ff",
    400: "#2670ff",
    300: "#3f80ff",
    200: "#66a3ff",
    100: "#9ccaff",
  },
  orange: {
    500: "#ff4b00",
    400: "#ff6100",
    300: "#ff7a00",
    200: "#ffaf74",
    100: "#ffdcc0",
  },
  skyBlueScale: {
    500: "#0083a0",
    400: "#0095b6",
    300: "#029fc2",
    200: "#37c3ee",
    100: "#97e3ff",
  },
  yellow: {
    500: "#936901",
    400: "#aa7a00",
    300: "#be8800",
    200: "#e7b400",
    100: "#fad550",
  },
  green: {
    500: "#1c7d29",
    400: "#039409",
    300: "#36a800",
    200: "#75d975",
    100: "#a6f6a6",
  },
  purple: {
    500: "#be00c2",
    400: "#cb38d1",
    300: "#d157d6",
    200: "#e071d3",
    100: "#e398d8",
  },
};

// Semantic colors
const semantic = {
  accent: {
    primaryBold: "#001a5b",
    primaryMedium: "#0909b7",
    secondaryBold: "#97e3ff",
  },
  background: {
    bold: "#e4e8ef",
    medium: "#eff3f8",
    light: "#fff",
    disabled: "#f8fafc",
  },
  stroke: {
    bold: "#a6a9ad",
    disabled: "#e4e8ef",
    focus: "#3f80ff",
    inverse: "#fff",
    light: "#e4e8ef",
  },
  text: {
    bold: "#2a2a2a",
    disabled: "#a6a9ad",
    inverseLight: "#d2d8e0",
    light: "#68696c",
    inverse: "#fff",
  },
  support: {
    error: "#da3237",
    info: "#3f80ff",
    success: "#039409",
    warning: "#ff6100",
    errorLight: "#ffd6d7",
    infoLight: "#cbf0ff",
    successLight: "#d2fad2",
    warningLight: "#ffefb6",
  },
};

export const lightPalette: PaletteOptions = {
  mode: "light",
  primary: {
    main: semantic.accent.primaryMedium,
    light: colors.blue[300],
    dark: semantic.accent.primaryBold,
    contrastText: semantic.text.inverse,
  },
  secondary: {
    main: semantic.accent.secondaryBold,
    light: colors.skyBlueScale[200],
    dark: colors.skyBlueScale[500],
    contrastText: semantic.text.bold,
  },
  background: {
    default: semantic.background.medium,
    paper: semantic.background.light,
  },
  text: {
    primary: semantic.text.bold,
    secondary: semantic.text.light,
    disabled: semantic.text.disabled,
  },
  divider: semantic.stroke.light,
  error: {
    main: semantic.support.error,
    light: semantic.support.errorLight,
    dark: colors.orange[500],
  },
  warning: {
    main: semantic.support.warning,
    light: semantic.support.warningLight,
    dark: colors.orange[500],
  },
  info: {
    main: semantic.support.info,
    light: semantic.support.infoLight,
    dark: colors.blue[500],
  },
  success: {
    main: semantic.support.success,
    light: semantic.support.successLight,
    dark: colors.green[500],
  },
  action: {
    active: semantic.text.bold,
    hover: semantic.background.bold,
    disabled: semantic.text.disabled,
    disabledBackground: semantic.background.disabled,
    focus: semantic.stroke.focus,
  },
};
