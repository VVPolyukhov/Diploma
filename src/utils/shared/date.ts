import {
  LONG_DATE_MASK,
  PICKER_DATE_FULL_TIME_NUMBER,
  PICKER_DATE_MASK,
  PICKER_DATE_MASK_FULL_TIME,
  PICKER_SHORT_DATE_MASK,
  PICKER_SHORT_YEAR_DATE_MASK,
  PICKER_TIME_MASK,
  SERVER_DATE_MASK,
} from "constants/shared/date";
import dayjs, { Dayjs } from "dayjs";

/* Start convert date function */
export type TСonvertibleDate = Date | string | number | Dayjs;
interface IConvertDateSettings {
  format:
    | typeof SERVER_DATE_MASK
    | typeof PICKER_DATE_MASK
    | typeof PICKER_DATE_MASK_FULL_TIME
    | typeof PICKER_SHORT_YEAR_DATE_MASK
    | typeof PICKER_TIME_MASK
    | typeof LONG_DATE_MASK
    | typeof PICKER_DATE_FULL_TIME_NUMBER
    | typeof PICKER_SHORT_DATE_MASK
    | string;
  noData: string;
}
const defaultConvertDateSettings: IConvertDateSettings = {
  format: PICKER_DATE_MASK,
  noData: `Нет данных`,
};

/**
 * Функция, конвертирующая даты в необходимый формат
 * @param {TСonvertibleDate} date - дата
 * @param {Partial<IConvertDateSettings> | undefined} settings - настройки конвертации (опционально)
 * @returns {string} дата в новом формате
 * @example
 * convertDate(new Date());
 * convertDate(new Date(), { format: 'DD.MM.YYYY', noData: 'Нет данных' });
 */
export const convertDate = (
  date: TСonvertibleDate,
  {
    format = defaultConvertDateSettings.format,
    noData = defaultConvertDateSettings.noData,
  }: Partial<IConvertDateSettings> = defaultConvertDateSettings
): string => {
  return date ? dayjs(date).format(format) : noData;
};

export const сonvertDateWithNullCheck = (
  date: string | null
): string | null => {
  return date ? convertDate(date) : null;
};

export const convertDateForServer = (
  date: TСonvertibleDate,
  options: Partial<IConvertDateSettings> = {}
): string => {
  return convertDate(date, {
    format: SERVER_DATE_MASK,
    ...options,
  });
};
/* End convert date function */
