// TODO: Убрать ?
/* eslint-disable react/display-name */
import React from "react";
import { Alert as AntdAlert } from "antd";
import { TAlert } from "./types";

const Alert: TAlert = ({ ...props }) => {
  return <AntdAlert {...props} />;
};

Alert.ErrorBoundary = ({ ...props }) => {
  return <AntdAlert.ErrorBoundary {...props} />;
};
