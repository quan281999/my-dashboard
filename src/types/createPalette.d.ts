import * as createPalette from "@mui/material/styles/createPalette";

declare module "@mui/material/styles/createPalette" {
  interface PaletteColor {
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  }
  interface TypeBackground {
    alt: string;
  }

  interface PaletteOptions {
    background?: Partial<TypeBackground>;
  }

  interface Palette {
    background: TypeBackground;
    primary: PaletteColor;
    secondary: PaletteColor;
  }
}
