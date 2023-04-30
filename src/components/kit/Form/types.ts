import {
  FormProps as AntdFormProps,
  FormInstance as AntdFormInstance,
  FormItemProps as AntdFormItemProps,
  Rule as AntdRule,
} from 'antd/es/form';
import { Form as AntdForm } from 'antd';

export type TFormItemRule = AntdRule;

// Специально определяю заново стандартный тип из Antd "FormProps" для предоставления
// возможности дальнейшей кастомизации компонентов
export type TForm = React.FC<IInternalFormProps> & {
  Item: React.FC<IFormItemProps>;
  useForm: typeof AntdForm.useForm;
};

/* Form */
type TInternalFormPropsFromAntd<Values = any> = AntdFormProps<Values> & {
  children?: React.ReactNode;
} & {
  ref?: React.Ref<AntdFormInstance<Values>> | undefined;
};
export interface IInternalFormProps<Values = any> extends TInternalFormPropsFromAntd<Values> {}

/* Form.Item */
export interface IFormItemProps<Values = any> extends AntdFormItemProps<Values> {}
