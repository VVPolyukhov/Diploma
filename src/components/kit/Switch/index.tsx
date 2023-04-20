import React from "react";
import { Switch as AntdSwitch, SwitchProps as AntdSwitchProps } from "antd";

export interface ISwitchProps extends AntdSwitchProps {}
const Switch: React.FC<ISwitchProps> = ({ ...props }) => {
  return <AntdSwitch {...props} />;
};

export default Switch;
