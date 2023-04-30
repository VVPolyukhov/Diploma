import { ConfigProviderProps as AntdConfigProviderProps } from 'antd/es/config-provider';
import { Theme as AntdTheme } from 'antd/es/config-provider/context';

interface ITheme extends AntdTheme {}

// Вставляю типизацию сюда, так как этот тип не импортируется из antd
type AntdConfigOfConfigProvider = ({
  prefixCls,
  iconPrefixCls,
  theme,
}: Pick<IInternalConfigProviderProps, 'prefixCls' | 'iconPrefixCls'> & {
  theme?: ITheme | undefined;
}) => void;

// Специально определяю заново стандартный тип из Antd "ConfigProviderProps" для предоставления
// возможности дальнейшей кастомизации компонентов
export type TConfigProvider = React.FC<IInternalConfigProviderProps> & {
  config: AntdConfigOfConfigProvider;
};

/* ConfigProvider */
export interface IInternalConfigProviderProps extends AntdConfigProviderProps {}