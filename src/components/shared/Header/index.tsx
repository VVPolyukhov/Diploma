import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useRouter } from "next/router";
import React from "react";
import styles from "./index.module.scss";

interface IProps {
  title: string | JSX.Element;
  additionalContent?: JSX.Element;
  goBackButton?: boolean
}
const Header: React.FC<IProps> = ({ title, additionalContent= null, goBackButton=false }) => {
    const router = useRouter()

  return (
    <div className={styles.root}>
      {goBackButton && (<Button icon={<ArrowLeftOutlined />} shape="circle" onClick={() => router.back()} />)}
      <h2>{title}</h2>
      {additionalContent}
    </div>
  );
};

export default Header;
