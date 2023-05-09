import Button from "components/kit/Button";
import Image from "next/image";
import React from "react";
import styles from "./index.module.scss";
import avatarImage from 'images/Avatar.png'

interface IProps {}
const Profile: React.FC<IProps> = () => {
  const specifications = [
    {
      key: "Ниша",
      value: "Продюсирование",
    },
    {
      key: "Заработок",
      value: "300 тыс. руб - 1 млн. руб.",
    },
    {
      key: "Социальные сети",
      value: "@KatyushaPro",
    },
  ];

  return (
    <div className={styles.root}>
      <Image className={styles.image} alt="Аватар" src={avatarImage} width={240} height={200} />
      <h1>Екатерина</h1>
      <div className={styles.specifications}>
        {specifications.map(({ key, value }) => (
          <div key={key} className={styles.specification}>
            <span>{key}</span>
            <span>{value}</span>
          </div>
        ))}
      </div>
      <Button type="primary" size="large" className={styles.button}>Редактировать</Button>
    </div>
  );
};

export default Profile;
