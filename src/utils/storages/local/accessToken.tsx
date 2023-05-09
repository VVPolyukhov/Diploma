import { isBrowser } from "utils/shared/next";

const KEY = "accessToken";

export const setAccessToken = (data: string) => localStorage.setItem(KEY, data);
export const getAccessToken = () =>
  isBrowser() ? localStorage.getItem(KEY) : null;
export const deleteAccessToken = () => localStorage.removeItem(KEY);
