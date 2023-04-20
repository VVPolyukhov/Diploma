import React from "react";
import { Checkbox as AntdCheckbox, CheckboxProps as AntdCheckboxProps } from "antd";

export interface ICheckboxProps extends AntdCheckboxProps {}
const Checkbox: React.FC<ICheckboxProps> = ({ ...props }) => {
  return <AntdCheckbox {...props} />;
};

export default Checkbox;
