// TODO: Убрать ?
/* eslint-disable react/display-name */
import React from "react";
import { Tag as AntdTag } from "antd";
import { TTag } from "./types";

const Tag: TTag = ({ ...props }) => {
  return <AntdTag {...props} />;
};

Tag.CheckableTag = ({ ...props }) => {
  return <AntdTag.CheckableTag {...props} />;
};
