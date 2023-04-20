import { TagProps as AntdTagProps } from "antd/es/tag";
import { CheckableTagProps as AntdTagCheckableTagProps } from "antd/es/tag/CheckableTag";

// Специально определяю заново стандартный тип из Antd "TagProps" для предоставления
// возможности дальнейшей кастомизации компонентов
export type TTag = React.FC<ITagProps> & {
  CheckableTag: React.FC<ITagCheckableTagProps>;
};

/* Tag */
type TTagPropsFromAntd = AntdTagProps & React.RefAttributes<HTMLElement>;
export interface ITagProps extends TTagPropsFromAntd {}

/* Tag.CheckableTag */
export interface ITagCheckableTagProps extends AntdTagCheckableTagProps {}
