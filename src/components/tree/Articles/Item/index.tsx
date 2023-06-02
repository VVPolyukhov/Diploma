import { Editor } from "@tinymce/tinymce-react";
import Button from "components/kit/Button";
import Header from "components/shared/Header";
import RichEditor from "components/tree/Admin/Articles/Item/Editor";
import React, { useRef } from "react";
import styles from "./index.module.scss";

interface IProps {}
const Article: React.FC<IProps> = () => {
  const editorRef = useRef<Editor | null>(null);

  return (
    <div className={styles.root}>
      <Header
        title={`Статья: "${"Для тех, кто хочет получать ежедневные диагностики"}"`}
      />
      <span className={styles.additionalText}>
        Дополнительный материал для курса &quot;Продажи на высокий чек&quot;
      </span>

      <div className={styles.meta}>
        <h3>Автори статьи: Яна Борисенко</h3>
        <Button type="primary" size="large">
          Перейти к курсу
        </Button>
      </div>

      <RichEditor readonly editorRef={editorRef} />
    </div>
  );
};

export default Article;
