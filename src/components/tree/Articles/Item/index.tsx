import { Editor } from "@tinymce/tinymce-react";
import Button from "components/kit/Button";
import Header from "components/shared/Header";
import Spinner from "components/shared/Spinner";
import RichEditor from "components/tree/Admin/Articles/Item/Editor";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import { useGetArticleQuery } from "store/articles/api";
import { IArticleItem } from "../Card";
import styles from "./index.module.scss";

interface IProps {}
const Article: React.FC<IProps> = () => {
  const router = useRouter();
  const editorRef = useRef<Editor | null>(null);

  const { data, isLoading } = useGetArticleQuery(
    {
      articleId: router.query?.id,
    },
    {
      skip: !router.query?.id,
    }
  );

  const courseInfo = (data as IArticleItem)
    ?.courseInfoShortForArticleResponseDto?.[0];

  if (isLoading || !data) {
    return <Spinner margin="200px auto" />;
  }

  return (
    <div className={styles.root}>
      <Header title={`Статья: "${data?.title}"`} />
      {courseInfo && (
        <span className={styles.additionalText}>
          Дополнительный материал для курса &quot;{courseInfo.title}&quot;
        </span>
      )}

      <div className={styles.meta}>
        <h3>Автори статьи: {data?.authorShortModel?.firstLastName}</h3>
        {courseInfo ? (
          <Link href={`/courses/${courseInfo.id}`}>
            <Button type="primary" size="large">
              Перейти к курсу
            </Button>
          </Link>
        ) : (
          <div />
        )}
      </div>

      <RichEditor
        readonly
        editorRef={editorRef}
        initialValue={data?.textArticle}
      />
    </div>
  );
};

export default Article;
