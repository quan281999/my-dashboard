import { type AppType } from "next/app";
import { Provider } from "react-redux";

import { api } from "../utils/api";
import "../styles/globals.css";
import { wrapper } from "../store";
import Layout from "../components/Layout";
import CustomThemeProvider from "../components/shared/CustomeThemeProvider";

const MyApp: AppType = ({ Component, ...rest }) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <CustomThemeProvider>
        <Layout>
          {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
          <Component {...props.pageProps} />
        </Layout>
      </CustomThemeProvider>
    </Provider>
  );
};

export default api.withTRPC(MyApp);
