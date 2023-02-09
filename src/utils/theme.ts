export type TThemeMode = "dark" | "light";
type TTokens = Record<string, Record<number, string>>;

export const darkTokens = {
  grey: {
    0: "#ffffff",
    10: "#f6f6f6",
    50: "#f0f0f0",
    100: "#e0e0e0",
    200: "#c2c2c2",
    300: "#a3a3a3",
    400: "#858585",
    500: "#666666",
    600: "#525252",
    700: "#3d3d3d",
    800: "#292929",
    900: "#141414",
    1000: "#000000",
  },
  primary: {
    100: "#d3d4de",
    200: "#a6a9be",
    300: "#7a7f9d",
    400: "#4d547d",
    500: "#21295c",
    600: "#191F45",
    700: "#141937",
    800: "#0d1025",
    900: "#070812",
  },
  secondary: {
    50: "#f0f0f0",
    100: "#fff6e0",
    200: "#ffedc2",
    300: "#ffe3a3",
    400: "#ffda85",
    500: "#ffd166",
    600: "#cca752",
    700: "#997d3d",
    800: "#665429",
    900: "#332a14",
  },
};

const reverseTokens = (tokens: TTokens) => ({
  grey: {
    0: tokens.grey?.[1000],
    10: tokens.grey?.[900],
    50: tokens.grey?.[800],
    100: tokens.grey?.[700],
    200: tokens.grey?.[600],
    300: tokens.grey?.[500],
    400: tokens.grey?.[400],
    500: tokens.grey?.[300],
    600: tokens.grey?.[200],
    700: tokens.grey?.[100],
    800: tokens.grey?.[50],
    900: tokens.grey?.[10],
    1000: tokens.grey?.[0],
  },
  primary: {
    100: tokens.primary?.[900],
    200: tokens.primary?.[800],
    300: tokens.primary?.[700],
    400: tokens.primary?.[600],
    500: tokens.primary?.[500],
    600: tokens.primary?.[400],
    700: tokens.primary?.[300],
    800: tokens.primary?.[200],
    900: tokens.primary?.[100],
  },
  secondary: {
    100: tokens.secondary?.[900],
    200: tokens.secondary?.[800],
    300: tokens.secondary?.[700],
    400: tokens.secondary?.[600],
    500: tokens.secondary?.[500],
    600: tokens.secondary?.[400],
    700: tokens.secondary?.[300],
    800: tokens.secondary?.[200],
    900: tokens.secondary?.[100],
  },
});

export const tokensLight = reverseTokens(darkTokens);

export const themeSettings = (mode: TThemeMode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            primary: {
              ...darkTokens.primary,
              main: darkTokens.primary[400],
              light: darkTokens.primary[400],
            },
            secondary: {
              ...darkTokens.secondary,
              main: darkTokens.secondary[300],
            },
            neutral: {
              ...darkTokens.grey,
              main: darkTokens.grey[500],
            },
            background: {
              default: darkTokens.primary[600],
              alt: darkTokens.primary[500],
            },
          }
        : {
            primary: {
              ...tokensLight.primary,
              main: darkTokens.grey[50],
              light: darkTokens.grey[100],
            },
            secondary: {
              ...tokensLight.secondary,
              main: darkTokens.secondary[600],
              light: darkTokens.secondary[700],
            },
            neutral: {
              ...tokensLight.grey,
              main: darkTokens.grey[500],
            },
            background: {
              default: darkTokens.grey[0],
              alt: darkTokens.grey[50],
            },
          }),
    },
    typography: {
      fontFamily: "Inter,sans-serif",
      fontSize: 12,
      h1: {
        fontFamily: "Inter,sans-serif",
        fontSize: 40,
      },
      h2: {
        fontFamily: "Inter,sans-serif",
        fontSize: 32,
      },
      h3: {
        fontFamily: "Inter,sans-serif",
        fontSize: 24,
      },
      h4: {
        fontFamily: "Inter,sans-serif",
        fontSize: 20,
      },
      h5: {
        fontFamily: "Inter,sans-serif",
        fontSize: 16,
      },
      h6: {
        fontFamily: "Inter,sans-serif",
        fontSize: 14,
      },
    },
  };
};
