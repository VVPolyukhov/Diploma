import React from 'react';
import { Result as AntdResult, ResultProps as AntdResultProps } from 'antd';

export interface IResultProps extends AntdResultProps {}
const Result: React.FC<IResultProps> = ({ ...props }) => {
  return <AntdResult {...props} />;
};

export default Result;
