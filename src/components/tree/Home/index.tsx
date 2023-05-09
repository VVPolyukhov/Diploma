import Image from "next/image";
import CommonTag from "components/shared/CommonTag";
import previewImage from "images/Designer.png";
import styles from "./index.module.scss";

interface IProps {}
const PublicHome: React.FC<IProps> = () => {
  return (
    <>
      <section className={styles.preview}>
        <div className={styles.leftSide}>
          <CommonTag>InCourse - образовательная платформа</CommonTag>
          <div className={styles.additionalText}>
            <span className={styles.marked}>Курсы маркетинга</span>
            <br />
            <span>в социальных сетях</span>
          </div>
        </div>
        <div className={styles.rightSide}>
          <div className={styles.image}>
            <Image alt="" src={previewImage} fill />
          </div>
        </div>
      </section>
      <section className={styles.aboutUs} id="aboutUs">
        <h1 className={styles.title}>О нас</h1>
        <span className={styles.text}>
          InCourse - образовательная платформа с самыми современными курсами
          маркетинга в социальных сетях от проверенных медийных экспертов
        </span>
        <div className={styles.cards}>
          <div className={styles.card}>
            <div className={styles.primaryTitle}>Польза</div>
            <h3 className={styles.secondaryTitle}>Статьи и уроки</h3>
            <span className={styles.description}>
              Изучай бесплатные материалы сразу на платформе
            </span>
          </div>
          <div className={styles.card}>
            <div className={styles.primaryTitle}>Нетворкинг</div>
            <h3 className={styles.secondaryTitle}>Тематические мероприятия</h3>
            <span className={styles.description}>
              Находи коллег, партнёров и заказчиков, посещая нетворкинг
              мероприятия на платформе
            </span>
          </div>
          <div className={styles.card}>
            <div className={styles.primaryTitle}>Поддержка</div>
            <h3 className={styles.secondaryTitle}>За руку с экспертом</h3>
            <span className={styles.description}>
              Пройди свой путь к большим заказам вместе с экспертом
            </span>
          </div>
          <div className={styles.card}>
            <div className={styles.primaryTitle}>Выбор</div>
            <h3 className={styles.secondaryTitle}>На одной волне</h3>
            <span className={styles.description}>
              Изучай статьи, знакомься с экспертами выбирай преподавателя по
              душе
            </span>
          </div>
        </div>
      </section>
    </>
  );
};

export default PublicHome;
