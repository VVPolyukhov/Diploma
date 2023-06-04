import ArticleCard from "components/tree/Articles/Card";
import ReducedArticlesList from "components/tree/Articles/List/Reduced";
import React from "react";
import { ICourseItem } from "..";
import CourseItemHeader from "../Header";
import styles from "./index.module.scss";

interface IProps {
  data: ICourseItem;
}
const SellingCourseItem: React.FC<IProps> = ({ data }) => {
  return (
    <div className={styles.root}>
      <CourseItemHeader data={data} mode="selling" />

      <section className={styles.forWhom}>
        <h1>Для кого этот курс?</h1>
        <div className={styles.features}>
          {data?.features.map((feature, index) => {
            return (
              <div key={index} className={styles.feature}>
                {feature}
              </div>
            );
          })}
        </div>
      </section>

      <h1 className={styles.useful}>Полезные материалы от автора</h1>
      <div className={styles.articles}>
        {data.articleinfoShortForCourseResponseDtos.map((el, index) => {
          if (index <= 4) {
            /* @ts-ignore */
            return <ArticleCard key={el.id} {...el} />;
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default SellingCourseItem;
