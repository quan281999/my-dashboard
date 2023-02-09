import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { ThemeProvider, CssBaseline } from "@mui/material";

import { selectThemeModeState } from "../../store/globalSlice";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "../../utils/theme";

type TCustomThemeProvider = {
  children: React.ReactNode;
};

const CustomThemeProvider = ({ children }: TCustomThemeProvider) => {
  const themeMode = useSelector(selectThemeModeState);
  const theme = useMemo(
    () => createTheme(themeSettings(themeMode)),
    [themeMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default CustomThemeProvider;
