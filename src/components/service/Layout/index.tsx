import { DesktopOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { PropsWithChildren } from "react";

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: any
) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("Option 1", "1", <DesktopOutlined />),
  getItem("Option 2", "2", <DesktopOutlined />),
  getItem("User", "sub1", <DesktopOutlined />, [
    getItem("Tom", "3"),
    getItem("Bill", "4"),
    getItem("Alex", "5"),
  ]),
  getItem("Team", "sub2", <DesktopOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("Files", "9", <DesktopOutlined />),
];

interface IProps {}
const { Header, Content, Sider } = Layout;
const MainLayout: React.FC<PropsWithChildren<IProps>> = ({ children }) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider theme="light" collapsible>
        <Menu items={items} />
      </Sider>
      <Layout>
        <Header />
        <Content>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
