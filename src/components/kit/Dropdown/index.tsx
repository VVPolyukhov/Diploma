/* eslint-disable react/display-name */
import React from "react";
import { Dropdown as AntdDropdown } from "antd";
import { TDropdown } from "./types";

const Dropdown: TDropdown = ({ ...props }) => {
  return <AntdDropdown {...props} />;
};

Dropdown.Button = ({ ...props }) => {
  return <AntdDropdown.Button {...props} />;
};

export default Dropdown;
