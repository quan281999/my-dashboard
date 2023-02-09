import * as createPalette from "@mui/material/styles/createPalette";

declare module "@mui/material/styles/createPalette" {
  interface TypeBackground {
    alt: string;
  }

  interface PaletteOptions {
    background?: Partial<TypeBackground>;
  }

  interface Palette {
    background: TypeBackground;
  }
}
