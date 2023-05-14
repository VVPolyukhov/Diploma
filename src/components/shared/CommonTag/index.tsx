import React, { PropsWithChildren } from 'react';
import styles from './index.module.scss';

interface IProps {}
const CommonTag: React.FC<PropsWithChildren<IProps>> = ({ children }) => {
  return <div className={styles.tag}>{children}</div>
}

export default CommonTag
