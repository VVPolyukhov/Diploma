import { TRootState } from "store/types";

export const getAccessToken = (state: TRootState) => state.auth.accessToken;
