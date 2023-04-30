import { getCookie, setCookie } from "cookies-next";

const KEY = "refreshToken";

export const getRefreshToken = () => getCookie(KEY);
export const setRefreshToken = (payload: string) => setCookie(KEY, payload);
