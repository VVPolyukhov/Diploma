import React, { PropsWithChildren } from "react";

interface IProps {}
const Layout: React.FC<PropsWithChildren<IProps>> = ({ children }) => {
  return <>{children}</>;
};

export default Layout;
