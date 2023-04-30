import type { AppProps } from "next/app";
import { Provider as ReduxProvider } from "react-redux";
import Layout from "components/service/Layout";
import AccessProvider from "components/service/AccessProvider";
import { wrapper } from "store";
import "antd/dist/reset.css";
import "styles/index.scss";

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
 *
 * !!! Необходимо использовать router.prefetch
 */

const App: React.FC<AppProps> = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <div id="app">
      <ReduxProvider store={store}>
        <AccessProvider>
          <Layout>
            <Component {...props.pageProps} />
          </Layout>
        </AccessProvider>
      </ReduxProvider>
    </div>
  );
};

export default App;
