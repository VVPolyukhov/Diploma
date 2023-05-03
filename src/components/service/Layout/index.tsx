import { Menu } from "antd";
import Button from "components/kit/Button";
import { ROUTES } from "constants/shared/routes";
import Image from "next/image";
import Link from "next/link";
import React, { PropsWithChildren } from "react";
import styles from "./index.module.scss";
import logo from "images/logo.png";

interface IProps {}
const MainLayout: React.FC<PropsWithChildren<IProps>> = ({ children }) => {
  return (
    <div className={styles.root}>
      <div className={styles.oops}>.</div>
      <header className={styles.header}>
        <div className={styles.leftSide}>
          <Link href={ROUTES.HOME.PATHNAME}>
            <Image alt="Логотип" src={logo} height={90} width={160} />
          </Link>
          {/* <Menu
            className={styles.menu}
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            items={new Array(3).fill(null).map((_, index) => ({
              key: String(index + 1),
              label: `nav ${index + 1}`,
            }))}
          /> */}
        </div>
        <div className={styles.rightSide}>
          <Link href="/">Курсы</Link>
          <Link href="/">О нас</Link>
          <Link href="/">Преимущества</Link>
          <Link href={ROUTES.AUTH_SIGN_IN.PATHNAME}>
            <Button type="primary" size="large">
              Учиться
            </Button>
          </Link>
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
