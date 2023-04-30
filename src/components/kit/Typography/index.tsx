import React from "react";
import { Typography as AntdTypography } from "antd";
import { TTypography } from "./types";

const Typography: TTypography = ({ ...props }) => {
  return <AntdTypography {...props} />;
};

Typography.Text = ({ ...props }) => {
  return <AntdTypography.Text {...props} />;
};

Typography.Title = ({ ...props }) => {
  return <AntdTypography.Title {...props} />;
};

Typography.Link = ({ ...props }) => {
  return <AntdTypography.Link {...props} />;
};

Typography.Paragraph = ({ ...props }) => {
  return <AntdTypography.Paragraph {...props} />;
};

export default Typography;
