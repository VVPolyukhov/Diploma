// TODO: Убрать ?
/* eslint-disable react/display-name */
import React from "react";
import { Input as AntdInput } from "antd";
import { TInput } from "./types";

const Input: TInput = ({ ...props }) => {
  return <AntdInput {...props} />;
};

Input.Group = ({ ...props }) => {
  return <AntdInput.Group {...props} />;
};

export default Input;
