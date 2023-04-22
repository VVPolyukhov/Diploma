import { InputProps as AntdInputProps, GroupProps as AntdGroupProps ,InputRef } from "antd/es/input";

// Специально определяю заново стандартный тип из Antd "TypographyProps" для предоставления
// возможности дальнейшей кастомизации компонентов
export type TInput = React.FC<IInternalInputProps> & {
    Group: React.FC<IInputGroupProps>;
};

/* Input */
type TInternalInputPropsFromAntd = AntdInputProps &
  React.RefAttributes<InputRef>;
export interface IInternalInputProps extends TInternalInputPropsFromAntd {}

/* Input.Group */
type TInputGroupPropsFromAntd = AntdGroupProps &
  React.RefAttributes<HTMLSpanElement>;
export interface IInputGroupProps extends TInputGroupPropsFromAntd {}
