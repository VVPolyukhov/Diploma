import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import Layout from "components/Layout";
import { wrapper } from "store";
import "antd/dist/reset.css";
import "styles/index.scss";
import { useEffect } from "react";

/**
 * При первой загрузке приложения необходимо получить accessToken, если есть refreshToken
 * Если запрос получится неудачным, то просто отрисовываем кнопку "Войти", иначе появляется профиль пользователя
 * 
 * Для публичных страниц:
 * Загружаем по SSR контент для SEO, проверки по авторизации могут быть на клиенте
 * 
 * Для приватных страниц:
 * ??? Выключаем SSR, так как индексации страницы происходить не будет, авторизация через клиент
*/
const App: React.FC<AppProps> = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <Layout>
        <Component {...props.pageProps} />
      </Layout>
    </Provider>
  );
};

export default App;
