import { Form, Select } from "antd";
import Header from "components/shared/Header";
import Spinner from "components/shared/Spinner";
import React from "react";
import { useGetArticlesQuery } from "store/articles/api";
import ArticleCard, { IArticleItem } from "../../Card";
import styles from "./index.module.scss";

interface IProps {}
const ArticlesGeneralList: React.FC<IProps> = () => {
  const [form] = Form.useForm();

  const { data, isLoading } = useGetArticlesQuery({});

  if (isLoading) {
    return <Spinner margin="100px auto" />;
  }

  return (
    <div className={styles.root}>
      <Header title={"Статьи"} />
      <Form form={form} layout="inline" size="large">
        <Form.Item name="authors" label="Авторы">
          <Select style={{ width: "200px" }} />
        </Form.Item>
        <Form.Item name="courses" label="Курсы">
          <Select style={{ width: "200px" }} />
        </Form.Item>
      </Form>
      <div className={styles.list}>
        {data?.result?.map((item: IArticleItem) => {
          return (
            <div key={item.id}>
              <ArticleCard {...item} />
              <span className={styles.postscript}>
                Дополнение к курсу ПРОДАЖИ НА ВЫСОТЕ
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ArticlesGeneralList;
