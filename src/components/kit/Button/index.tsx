import React from "react";
import { Button as AntdButton, ButtonProps as AntdButtonProps } from "antd";

export interface IButtonProps extends AntdButtonProps {}
const Button: React.FC<IButtonProps> = ({ ...props }) => {
  return <AntdButton shape="round" {...props} />;
};

export default Button;
