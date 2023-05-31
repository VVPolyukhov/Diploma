import ArticlesItemAdmin from 'components/tree/Admin/Articles/Item';
import { NextPage } from 'next';

const ArticlesCreationAdminPage: NextPage = () => {
  return <ArticlesItemAdmin mode="create" />;
}

export default ArticlesCreationAdminPage