import React, { useMemo, useState, createContext } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";

import { createTheme } from "@mui/material/styles";
import { themeSettings } from "../../utils/theme";
import type { TThemeMode } from "../../utils/theme";

type TThemeModeContext = {
  themeMode: TThemeMode;
  setThemeMode: React.Dispatch<React.SetStateAction<TThemeMode>>;
};

export const ThemeModeContext = createContext<TThemeModeContext>({
  themeMode: "dark",
  setThemeMode: () => undefined,
});

type TCustomThemeProviderProps = {
  children: React.ReactNode;
};

const CustomThemeProvider = ({ children }: TCustomThemeProviderProps) => {
  const [themeMode, setThemeMode] = useState<TThemeMode>("dark");
  const theme = useMemo(
    () => createTheme(themeSettings(themeMode)),
    [themeMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ThemeModeContext.Provider value={{ themeMode, setThemeMode }}>
        {children}
      </ThemeModeContext.Provider>
    </ThemeProvider>
  );
};

export default CustomThemeProvider;
