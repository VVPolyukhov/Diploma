import { deleteCookie, getCookie, setCookie } from "cookies-next";

const KEY = "refreshToken";

export const getRefreshToken = () => getCookie(KEY);
export const setRefreshToken = (payload: string) => setCookie(KEY, payload);
export const deleteRefreshToken = () => deleteCookie(KEY);
