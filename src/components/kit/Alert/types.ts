import { AlertProps as AntdAlertProps } from "antd/es/alert";

// Вставляю типизацию сюда, так как этот интерфейс не импортируется из antd
interface AntdAlertErrorBoundaryProps {
  message?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
}

// Специально определяю заново стандартный тип из Antd "AlertProps" для предоставления
// возможности дальнейшей кастомизации компонентов
export type TAlert = React.FC<IInternalAlertProps> & {
  ErrorBoundary: React.FC<IAlertErrorBoundaryProps>;
};

/* Alert */
export interface IInternalAlertProps extends AntdAlertProps {}

/* Alert.ErrorBoundary */
export interface IAlertErrorBoundaryProps extends AntdAlertErrorBoundaryProps {}
