import { Menu } from "antd";
import Button from "components/kit/Button";
import { ROUTES } from "constants/shared/routes";
import Link from "next/link";
import React, { PropsWithChildren } from "react";
import styles from "./index.module.scss";

interface IProps {}
const MainLayout: React.FC<PropsWithChildren<IProps>> = ({ children }) => {
  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <div className={styles.leftSide}>
          <div
            style={{
              width: 120,
              height: 31,
              // margin: "16px 24px 16px 0",
              background: "rgba(215, 155, 255, 0.2)",
            }}
          />
          <Menu
          className={styles.menu}
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            items={new Array(3).fill(null).map((_, index) => ({
              key: String(index + 1),
              label: `nav ${index + 1}`,
            }))}
          />
        </div>
        <Link href={ROUTES.AUTH_SIGN_IN.PATHNAME}>
          <Button type="primary">Войти</Button>
        </Link>
      </header>

      <div className={styles.content}>{children}</div>

      {/* <Footer style={{ textAlign: "center" }}>
        Ant Design ©2023 Created by Ant UED
      </Footer> */}
    </div>
  );
};

export default MainLayout;
