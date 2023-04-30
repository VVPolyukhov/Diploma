import ruRU from 'antd/lib/locale/ru_RU';
import React, { PropsWithChildren } from 'react';
import scssVariables from 'styles/variables/index.module.scss';
import colors from 'styles/variables/colors/light.module.scss';
import ConfigProvider from 'components/kit/ConfigProvider';
import { font } from 'styles/font';

interface IProps {}
const ConfigProviderWrapper: React.FC<PropsWithChildren<IProps>> = ({ children }) => {
  return (
    <ConfigProvider
      locale={ruRU}
      theme={{
        token: {
          colorPrimary: colors.colorPrimary,
          colorWarningOutline: colors.colorWarning,
          colorErrorOutline: colors.colorError,
          colorBorderBg: colors.colorBorder,
          colorBgBase: colors.colorBg,
          fontFamily: font.style.fontFamily,
          fontSize: parseInt(scssVariables.fontSizeBase),
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default ConfigProviderWrapper;
