import { Avatar, Dropdown, MenuProps } from "antd";
import Button from "components/kit/Button";
import { ROUTES } from "constants/shared/routes";
import Image from "next/image";
import Link from "next/link";
import React, { PropsWithChildren } from "react";
import styles from "./index.module.scss";
import logo from "images/logo.png";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { useAuth } from "utils/hooks/useAuth";
import { logout } from "utils/shared/auth";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

interface IProps {}
const MainLayout: React.FC<PropsWithChildren<IProps>> = ({ children }) => {
  const dispatch = useDispatch();
  const isAuth = useAuth();
  const router = useRouter();

  const items: MenuProps["items"] = [
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
      key: "logout",
      label: "Выйти",
      icon: <LogoutOutlined />,
      onClick: () => logout(dispatch),
    },
  ];

  return (
    <div className={styles.root}>
      <div className={styles.oops}>.</div>
      <header className={styles.header}>
        <div className={styles.leftSide}>
          <Link href={ROUTES.HOME.PATHNAME}>
            <Image alt="Логотип" src={logo} height={90} width={160} />
          </Link>
        </div>
        <div className={styles.rightSide}>
          <Link href={isAuth ? ROUTES.COURSES.PATHNAME : ROUTES.HOME.PATHNAME}>
            Курсы
          </Link>
          {isAuth ? (
            <>
              <Link href={ROUTES.ARTICLES.PATHNAME}>Статьи</Link>
              <Link href={ROUTES.EVENTS.PATHNAME}>Нетворкинг</Link>
              {/* <Link href={ROUTES.AUTHORS.PATHNAME}>Авторы</Link> */}
              <Dropdown
                menu={{ items }}
                trigger={["click"]}
                placement="bottomRight"
              >
                <Avatar>Е</Avatar>
              </Dropdown>
            </>
          ) : (
            <>
              <Link href="/">О нас</Link>
              <Link href="/">Преимущества</Link>
              <Link href={ROUTES.AUTH_SIGN_IN.PATHNAME}>
                <Button type="primary" size="large">
                  Учиться
                </Button>
              </Link>
            </>
          )}
        </div>
      </header>

      <div className={styles.content}>{children}</div>

      {/* <Footer style={{ textAlign: "center" }}>
        Ant Design ©2023 Created by Ant UED
      </Footer> */}
    </div>
  );
};

export default MainLayout;
