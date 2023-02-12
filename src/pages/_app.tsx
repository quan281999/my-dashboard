import { type AppType } from "next/app";
import React, { createContext } from "react";

import { api } from "../utils/api";
import "../styles/globals.css";
import Layout from "../components/Layout";
import CustomThemeProvider from "../components/shared/CustomThemeProvider";

type TAuthContext = {
  userId: string;
};

export const AuthContext = createContext<TAuthContext>({
  userId: "63701cc1f03239b7f700000e",
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <CustomThemeProvider>
      {/* MOCK DEFAULT USER, AUTHENTICATION IS NOT IMPLEMENTED IN THIS SMALL APP */}
      <AuthContext.Provider value={{ userId: "63701cc1f03239b7f700000e" }}>
        <Layout>
          {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
          <Component {...pageProps} />
        </Layout>
      </AuthContext.Provider>
    </CustomThemeProvider>
  );
};

export default api.withTRPC(MyApp);
