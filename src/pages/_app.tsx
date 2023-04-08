import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import Layout from "components/Layout";
import { wrapper } from "store";
import 'antd/dist/reset.css';
import 'antd/dist/antd.css';
import "styles/index.scss";

const App: React.FC<AppProps> = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <Layout>
        <Component  {...props.pageProps} />
      </Layout>
    </Provider>
  );
};

export default App;
