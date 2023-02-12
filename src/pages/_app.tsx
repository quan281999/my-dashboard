import { type AppType } from "next/app";
import React, { useState, createContext } from "react";
import { Provider } from "react-redux";

import { api } from "../utils/api";
import "../styles/globals.css";
import { wrapper } from "../store";
import Layout from "../components/Layout";
import CustomThemeProvider from "../components/shared/CustomThemeProvider";

type TAuthContext = {
  userId: string;
};

export const AuthContext = createContext<TAuthContext>({
  userId: "63701cc1f03239b7f700000e",
});

const MyApp: AppType = ({ Component, ...rest }) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <CustomThemeProvider>
        {/* MOCK DEFAULT USER, AUTHENTICATION IS NOT IMPLEMENTED IN THIS SMALL APP */}
        <AuthContext.Provider value={{ userId: "63701cc1f03239b7f700000e" }}>
          <Layout>
            {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
            <Component {...props.pageProps} />
          </Layout>
        </AuthContext.Provider>
      </CustomThemeProvider>
    </Provider>
  );
};

export default api.withTRPC(MyApp);
