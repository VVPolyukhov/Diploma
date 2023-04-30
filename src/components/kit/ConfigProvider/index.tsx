import React from "react";
import { ConfigProvider as AntdConfigProvider } from "antd";
import { TConfigProvider } from "./types";

const ConfigProvider: TConfigProvider = ({ ...props }) => {
  return <AntdConfigProvider {...props} />;
};

ConfigProvider.config = AntdConfigProvider.config

export default ConfigProvider