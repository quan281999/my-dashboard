import { Color } from "@mui/material";
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

  interface NeutralColor {
    0: string | undefined;
    10: string | undefined;
    50: string | undefined;
    100: string | undefined;
    200: string | undefined;
    300: string | undefined;
    400: string | undefined;
    500: string | undefined;
    600: string | undefined;
    700: string | undefined;
    800: string | undefined;
    900: string | undefined;
    1000: string | undefined;
    main: string | undefined;
  }
  interface TypeBackground {
    alt: string;
  }

  interface PaletteOptions {
    background?: Partial<TypeBackground>;
    neutral: NeutralColor;
  }

  interface Palette {
    background: TypeBackground;
    primary: PaletteColor;
    secondary: PaletteColor;
    neutral: Partial<NeutralColor>;
  }
}
