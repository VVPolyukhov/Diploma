import { Avatar, Dropdown, Tag } from "antd";
import Button from "components/kit/Button";
import { ROUTES } from "constants/shared/routes";
import Image from "next/image";
import Link from "next/link";
import React, { PropsWithChildren } from "react";
import styles from "./index.module.scss";
import logo from "images/logo.png";
import { CrownOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { useAuth } from "utils/hooks/useAuth";
import { logout } from "utils/shared/auth";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useGetUserQuery } from "store/user/api";

interface IProps {}
const MainLayout: React.FC<PropsWithChildren<IProps>> = ({ children }) => {
  const dispatch = useDispatch();
  const isAuth = useAuth();
  const router = useRouter();

  const { data } = useGetUserQuery({});

  const isAdmin = true;
  const isAdminPathname = router.pathname.startsWith("/admin");

  const items = [
    {
      key: "profile",
      label: "Профиль",
      icon: <UserOutlined />,
      onClick: () => router.push(ROUTES.PROFILE.PATHNAME),
    },
    {
      type: "divider",
    },
    {
      key: "admin",
      label: "Админ. панель",
      icon: <CrownOutlined />,
      hidden: !isAdmin || data?.email === "user@mail.ru",
      onClick: () => router.push(ROUTES.ADMIN_COURSES.PATHNAME),
    },
    {
      type: "divider",
      hidden: !isAdmin || data?.email === "user@mail.ru",
    },
    {
      key: "logout",
      label: "Выйти",
      icon: <LogoutOutlined />,
      onClick: () => logout(dispatch),
    },
  ].filter((el) => !el.hidden);

  return (
    <div className={styles.root}>
      <div className={styles.oops}>.</div>
      <header className={styles.header}>
        <div className={styles.leftSide}>
          <Link href={isAuth ? ROUTES.MAIN.PATHNAME : ROUTES.HOME.PATHNAME}>
            <Image alt="Логотип" src={logo} height={90} width={160} />
          </Link>
          {isAdminPathname && (
            <Tag style={{ marginTop: "5px" }} color="geekblue">
              Админ. панель
            </Tag>
          )}
        </div>
        <nav className={styles.nav}>
          {isAuth ? (
            <>
              {isAdminPathname ? (
                <>
                  <Link href={ROUTES.ADMIN_COURSES.PATHNAME}>Курсы</Link>
                  <Link href={ROUTES.ADMIN_ARTICLES.PATHNAME}>Статьи</Link>
                  <Link href={ROUTES.ADMIN_EVENTS.PATHNAME}>Нетворкинг</Link>
                  <Link href={ROUTES.ADMIN_USERS.PATHNAME}>Пользователи</Link>
                </>
              ) : (
                <>
                  <Link href={ROUTES.COURSES.PATHNAME}>Курсы</Link>
                  <Link href={ROUTES.ARTICLES.PATHNAME}>Статьи</Link>
                  <Link href={ROUTES.EVENTS.PATHNAME}>Нетворкинг</Link>
                </>
              )}
            </>
          ) : (
            <>
              {/* <Link href="#aboutUs">О нас</Link> */}
              {/* <Link href="#advantages">Преимущества</Link> */}
            </>
          )}
        </nav>
        {isAuth ? (
          <Dropdown
            // @ts-ignore
            menu={{ items }}
            trigger={["hover"]}
            placement="bottomRight"
          >
            <div className={styles.profile}>
              <span>{data?.firstName}</span>

              <Avatar icon={<UserOutlined />} />
            </div>
          </Dropdown>
        ) : (
          <Link href={ROUTES.AUTH_SIGN_IN.PATHNAME}>
            <Button type="primary" size="large">
              Учиться
            </Button>
          </Link>
        )}
      </header>

      <div className={styles.content}>{children}</div>

      {/* <Footer style={{ textAlign: "center" }}>
        Ant Design ©2023 Created by Ant UED
      </Footer> */}
    </div>
  );
};

export default MainLayout;
