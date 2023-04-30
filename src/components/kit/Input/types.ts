import { InputProps as AntdInputProps, GroupProps as AntdGroupProps, PasswordProps as AntdPasswordProps, InputRef } from 'antd/es/input';

// Специально определяю заново стандартный тип из Antd "InputProps" для предоставления
// возможности дальнейшей кастомизации компонентов
export type TInput = React.FC<IInternalInputProps> & {
  Group: React.FC<IInputGroupProps>;
  Password: React.FC<IInputPasswordProps>
};

/* Input */
type TInternalInputPropsFromAntd = AntdInputProps & React.RefAttributes<InputRef>;
export interface IInternalInputProps extends TInternalInputPropsFromAntd {}

/* Input.Group */
type TInputGroupPropsFromAntd = AntdGroupProps & React.RefAttributes<HTMLSpanElement>;
export interface IInputGroupProps extends TInputGroupPropsFromAntd {}

/* Input.Password */
type TInputPasswordPropsFromAntd = AntdPasswordProps & React.RefAttributes<InputRef>;
export interface IInputPasswordProps extends TInputPasswordPropsFromAntd {}
