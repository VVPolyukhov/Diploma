import Button from "components/kit/Button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ICourseItem } from "..";
import styles from "./index.module.scss";

enum ECourseItemType {
  viewing = "viewing",
  selling = "selling",
}

interface IProps {
  data: ICourseItem;
  mode: `${ECourseItemType}`;
}
const CourseItemHeader: React.FC<IProps> = ({ data, mode }) => {
  return (
    <section className={styles.main}>
      <div className={styles.leftSide}>
        <div>
          <h1 className={styles.title}>{data?.title}</h1>
          <span className={styles.author}>Автор: Семен Демидов</span>
          <span className={styles.description}>{data?.description}</span>
        </div>

        {mode === "selling" && (
          <Link href={data?.linkPayment} target="_blank">
            <Button type="primary" size="large" className={styles.buyButton}>
              Купить курс
            </Button>
          </Link>
        )}
      </div>
      <div className={styles.rightSide}>
        <Image src={`data:image/png;base64,${data?.image}`} alt="" fill />
      </div>
    </section>
  );
};

export default CourseItemHeader;
