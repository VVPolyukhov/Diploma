import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuthSlice } from "./types";

const AUTH_SLICE_ALIAS = 'auth'
const initialState: IAuthSlice = {
  accessToken: null,
  needToGetUser: false,
};

export const authSlice = createSlice({
  name: AUTH_SLICE_ALIAS,
  initialState,
  reducers: {
    setAccessToken: (state, { payload }: PayloadAction<string | null>) => {
      state.accessToken = payload;
    },
    setNeedToGetUser: (state, { payload }: PayloadAction<boolean>) => {
      state.needToGetUser = payload;
    },
  },
});

export const { setAccessToken, setNeedToGetUser } = authSlice.actions;

export default authSlice.reducer;
