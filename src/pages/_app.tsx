import type { AppProps } from "next/app";
import { Provider as ReduxProvider } from "react-redux";
import Layout from "components/service/Layout";
import AccessProvider from "components/service/AccessProvider";
import { wrapper } from "store";
import "antd/dist/reset.css";
import "styles/index.scss";
import ConfigProviderWrapper from "components/service/ConfigProviderWrapper";
import { font } from "styles/font";
import Head from "next/head";

// draft-js
import "components/tree/Admin/Articles/Item/Editor/css/example.css";
import "components/tree/Admin/Articles/Item/Editor/css/draft.css";
import "components/tree/Admin/Articles/Item/Editor/css/rich-editor.css";

/**
 * При первой загрузке приложения необходимо получить accessToken, если есть refreshToken
 * Если запрос получится неудачным, то просто отрисовываем кнопку "Войти", иначе появляется профиль пользователя
 *
 * Для публичных страниц:
 * Загружаем по SSR контент для SEO, авторизация на клиенте (заглушки для лоадингов)
 *
 * Для приватных страниц:
 * Выключаем SSR, так как индексации страницы происходить не будет, авторизация через клиент
 *
 * Итог: Авторизация всегда выполняется на стороне клиента
 */


// !!! TODO: Баг: Если зайти на страницу / и быть авторизованным, то будут ошибки гидрации падать
const App: React.FC<AppProps> = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <div id="app" data-theme="light" className={font.className}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ReduxProvider store={store}>
        <ConfigProviderWrapper>
          <AccessProvider>
            <Layout>
              <Component {...props.pageProps} />
            </Layout>
          </AccessProvider>
        </ConfigProviderWrapper>
      </ReduxProvider>
    </div>
  );
};

export default App;
