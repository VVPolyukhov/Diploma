import { DropdownProps as AntdDropdownProps } from "antd";
import { DropdownButtonProps as AntdDropdownButtonProps } from "antd/es/dropdown";

// Специально определяю заново стандартный тип из Antd "TypographyProps" для предоставления
// возможности дальнейшей кастомизации компонентов
export type TDropdown = React.FC<IDropdownProps> & {
  Button: React.FC<IDropdownButtonProps>;
};

export interface IDropdownProps extends AntdDropdownProps {}
export interface IDropdownButtonProps extends AntdDropdownButtonProps {}
