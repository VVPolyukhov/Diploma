import { TypographyProps as AntdTypographyProps } from "antd/es/typography/Typography";
import { TextProps as AntdTextProps } from "antd/es/typography/Text";
import { TitleProps as AntdTitleProps } from "antd/es/typography/Title";
import { LinkProps as AntdLinkProps } from "antd/es/typography/Link";
import { ParagraphProps as AntdParagraphProps } from "antd/es/typography/Paragraph";

// Специально определяю заново стандартный тип из Antd "TypographyProps" для предоставления
// возможности дальнейшей кастомизации компонентов
export type TTypography = React.FC<IInternalTypographyProps> & {
  Text: React.FC<ITypographyTextProps>;
  Title: React.FC<ITypographyTitleProps>;
  Link: React.FC<ITypographyLinkProps>;
  Paragraph: React.FC<ITypographyParagraphProps>;
};

/* Typography */
type TInternalTypographyPropsFromAntd = AntdTypographyProps<
  keyof JSX.IntrinsicElements
> &
  React.RefAttributes<HTMLElement>;
export interface IInternalTypographyProps
  extends TInternalTypographyPropsFromAntd {}

/* Typography.Text */
type TTypographyTextPropsFromAntd = AntdTextProps &
  React.RefAttributes<HTMLSpanElement>;
export interface ITypographyTextProps extends TTypographyTextPropsFromAntd {}

/* Typography.Title */
type TTypographyTitlePropsFromAntd = AntdTitleProps &
  React.RefAttributes<HTMLElement>;
export interface ITypographyTitleProps extends TTypographyTitlePropsFromAntd {}

/* Typography.Link */
type TTypographyLinkPropsFromAntd = AntdLinkProps &
  React.RefAttributes<HTMLElement>;
export interface ITypographyLinkProps extends TTypographyLinkPropsFromAntd {}

/* Typography.Paragraph */
type TTypographyParagraphPropsFromAntd = AntdParagraphProps &
  React.RefAttributes<HTMLElement>;
export interface ITypographyParagraphProps
  extends TTypographyParagraphPropsFromAntd {}
