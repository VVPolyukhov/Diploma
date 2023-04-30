import React from "react";
import { Radio as AntdRadio, RadioProps as AntdRadioProps } from "antd";

export interface IRadioProps extends AntdRadioProps {}
const Radio: React.FC<IRadioProps> = ({ ...props }) => {
  return <AntdRadio {...props} />;
};

export default Radio;
