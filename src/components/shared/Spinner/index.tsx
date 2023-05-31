import { Spin, SpinProps } from "antd";
import React from "react";

import styles from "./index.module.scss";

interface IProps extends SpinProps {
  margin?: string;
  onFullScreen?: boolean;
}
const Spinner: React.FC<IProps> = ({
  margin = "",
  onFullScreen,
  ...spinProps
}) => {
  return (
    <div
      className={styles.root}
      style={{
        height: onFullScreen ? "100vh" : "100%",
        margin,
      }}
    >
      <Spin {...spinProps} />
    </div>
  );
};

export default Spinner;
