import { useMemo } from "react";
import { type AppType } from "next/app";
import { Provider } from "react-redux";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "../utils/theme";

import { api } from "../utils/api";
import "../styles/globals.css";
import { wrapper } from "../store";

const MyApp: AppType = ({ Component, ...rest }) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { store, props } = wrapper.useWrappedStore(rest);
  const themeMode = store.getState().global.themeMode;
  const theme = useMemo(
    () => createTheme(themeSettings(themeMode)),
    [themeMode]
  );

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
        <Component {...props.pageProps} />;
      </ThemeProvider>
    </Provider>
  );
};

export default api.withTRPC(MyApp);
