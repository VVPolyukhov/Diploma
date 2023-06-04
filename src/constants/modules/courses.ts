export interface BaseOptionType {
  disabled?: boolean;
  [name: string]: any;
}
export interface DefaultOptionType extends BaseOptionType {
  label: React.ReactNode;
  value?: string | number | null;
  children?: Omit<DefaultOptionType, "children">[];
}

export enum ECoursesCategory {
  smm = "smm",
  producing = "producing",
  sales = "sales",
}
export const coursesCategory = {
  [ECoursesCategory.producing]: "Продюсирование",
  [ECoursesCategory.sales]: "Продажи",
  [ECoursesCategory.smm]: "СММ",
};
export const coursesCategoryOptions: DefaultOptionType[] = Object.entries(
  coursesCategory
).map(([value, label]) => {
  return {
    label,
    value,
  };
});
