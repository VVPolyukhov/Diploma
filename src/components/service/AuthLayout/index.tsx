import React, { PropsWithChildren } from 'react';
import styles from './index.module.scss';

interface IProps {}
const AuthLayout: React.FC<PropsWithChildren<IProps>> = ({ children }) => {
  return <div className={styles.root}>{children}</div>
}

export default AuthLayout