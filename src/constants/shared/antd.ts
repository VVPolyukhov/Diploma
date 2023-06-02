import { IFormItemProps } from "components/kit/Form/types";

export type TCustomFormItem<InternalComponentType = any> = {
  formItemProps?: IFormItemProps;
  internalComponentProps?: InternalComponentType;
};
