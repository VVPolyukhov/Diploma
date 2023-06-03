import Image from "next/image";
import React from "react";
import styles from "./index.module.scss";
import courseImage from "images/CourseImage.jpg";
import Button from "components/kit/Button";
import Link from "next/link";
import ReducedArticlesList from "components/tree/Articles/List/Reduced";

interface IProps {}
const CourseItem: React.FC<IProps> = () => {
  return (
    <div className={styles.root}>
      <section className={styles.main}>
        <div className={styles.leftSide}>
          <div>
            <h1 className={styles.title}>Прогрев, как сериал</h1>
            <span className={styles.description}>
              Научитесь влюблять в себя аудиторию через контент, делать прогрев,
              который будут смотреть и ждать, как сериал.
            </span>
          </div>

          <Link href={"https://payform.ru/dw2btHD/"} target="_blank">
            <Button type="primary" size="large" className={styles.buyButton}>
              Купить курс
            </Button>
          </Link>
        </div>
        <div className={styles.rightSide}>
          <Image src={courseImage} alt="" fill />
        </div>
      </section>

      <section className={styles.forWhom}>
        <h1>Для кого этот курс?</h1>
        <div className={styles.features}>
          <div className={styles.feature}>
            Блогеры. Если вы хотите улучшить свой контент, делать прогревы,
            который будут с интересом смотреть
          </div>
          <div className={styles.feature}>
            Эксперты. Вы эксперт в любой области, будь то плавание или
            кулинарное искусство. После курса вы сможете делать sold out на свои
            услуги
          </div>
          <div className={styles.feature}>
            Фрилансеры. Если вы работаете с блогерами за кадром научитесь делать
            контент для блогеров интереснее, повысите свою востребованность, как
            специалиста.
          </div>
          <div className={styles.feature}>
            Предприниматели. Владельцы бизнесов смогут повысить лояльность
            клиентов к их бизнесу, а также увеличить продажи за счёт контента{" "}
          </div>
        </div>
      </section>

      <h1 className={styles.useful}>Полезные материалы от автора</h1>
      <ReducedArticlesList className={styles.articles} />
    </div>
  );
};

export default CourseItem;
