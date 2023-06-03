import { isArray, isNil } from "lodash";

export type Types = string | number | boolean | null | undefined;
export type TValue = Types | Array<Types>;
export type TObject<T = any> = { [key: string]: T };

/**
 * Функция приведения строки к подходящим ей типам
 * @param {string} str
 * @returns {Types}
 * @example
 * stringToTypedValue('123') => 123
 * stringToTypedValue('true') => true
 * stringToTypedValue('text') => 'text'
 * stringToTypedValue('null') => null
 * stringToTypedValue('undefined') => undefined
 */
export function stringToTypedValue(str: string): Types {
  if (!isNaN(Number(str))) {
    return Number(str);
  }

  if (["true", "false"].includes(str)) {
    return JSON.parse(str);
  }

  if (str === "null") {
    return null;
  }

  if (str === "undefined") {
    return undefined;
  }

  return str;
}

/**
 * Функция, с помощью которой можно составить строку в формате "query params"
 * @param {TObject<TValue>} object - объект для преобразования
 * @returns {string} строка в формате "query params"
 * @example
 * createQueryParams({ number: 1, string: "text", boolean: true, array: [1, "text", true] })
 * // '?number=1&string=text&boolean=true&array[]=1&array[]=text&array=true'
 */
export const createQueryParams = (
  object: Record<string, TValue>,
  ignoreNilProperies: boolean = false
): string => {
  const fields = Object.keys(object).reduce((acc: string[], param: string) => {
    const objectParam = object[param];
    if (ignoreNilProperies && isNil(objectParam)) {
      return acc;
    }
    const field = isArray(objectParam)
      ? // @ts-ignore
        objectParam
          // @ts-ignore
          .reduce((acc, value) => [...acc, `${param}[]=${value}`], [])
          // @ts-ignore
          .join("&")
      : `${param}=${objectParam}`;
    return [...acc, field];
  }, []);
  return `?${fields.join("&")}`;
};

/**
 * Получение типизированного объекта параметров поиска из window.location.search
 * @returns {TObject<TValue>} объект
 * @example
 * getQueryParams()
 * window.location.search = '?number=1&string=text&boolean=true&array[]=1&array[]=text&array=true'
 * { number: 1, string: "text", boolean: true, array: [1, "text", true] }
 */
export const getQueryParams = (): Record<string, TValue> => {
  const queryString = window.location.search;
  let params = {};
  new URLSearchParams(queryString).forEach((value, key) => {
    let decodedKey = decodeURIComponent(key);
    const decodedValue = stringToTypedValue(decodeURIComponent(value));
    if (decodedKey.endsWith("[]")) {
      decodedKey = decodedKey.replace("[]", "");
      // @ts-ignore
      params[decodedKey] || (params[decodedKey] = []);
      // @ts-ignore
      params[decodedKey].push(decodedValue);
    } else {
      // @ts-ignore
      params[decodedKey] = decodedValue;
    }
  });
  return params;
};

/**
 * @param {string} paramName - название параметра
 * @returns {TValue} значение параметра
 * @example
 * getQueryParam('name')
 * // 'Mike'
 */
export const getQueryParam = (paramName: string): TValue => {
  return getQueryParams()[paramName];
};
