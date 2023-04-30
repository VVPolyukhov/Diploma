interface IRoute {
  /**
   * Должен начинаться со "/"
   */
  PATHNAME: string;
  TITLE: string;
}

type TRouteNames = "HOME" | "PRIVATE" | "AUTH_SIGN_IN" | "AUTH_SIGN_UP";

export const ROUTES: Record<TRouteNames, IRoute> = {
  HOME: {
    PATHNAME: "/",
    TITLE: "Главная страница",
  },
  AUTH_SIGN_IN: {
    PATHNAME: "/auth/sign-in",
    TITLE: "Вход в систему",
  },
  AUTH_SIGN_UP: {
    PATHNAME: "/auth/sign-up",
    TITLE: "Регистрация",
  },
  PRIVATE: {
    PATHNAME: "/private",
    TITLE: "Приватная страница",
  },
};

/**
 * Публичные роуты
 */
export const PUBLIC_ROUTES = [
  ROUTES.HOME,
  ROUTES.AUTH_SIGN_IN,
  ROUTES.AUTH_SIGN_UP,
];
export const PUBLIC_ROUTE_PATHNAMES = PUBLIC_ROUTES.map(
  ({ PATHNAME }) => PATHNAME
);

/**
 * Приватные роуты
 */
export const PRIVATE_ROUTES = Object.values(ROUTES).filter(
  (route) => !PUBLIC_ROUTES.includes(route)
);
export const PRIVATE_ROUTE_PATHNAMES = PRIVATE_ROUTES.map(
  ({ PATHNAME }) => PATHNAME
);
