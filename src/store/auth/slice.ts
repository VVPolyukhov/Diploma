import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuthSlice } from "./types";

const AUTH_SLICE_ALIAS = 'auth'
const initialState: IAuthSlice = {
  accessToken: null,
};

export const authSlice = createSlice({
  name: AUTH_SLICE_ALIAS,
  initialState,
  reducers: {
    setAccessToken: (state, { payload }: PayloadAction<string | null>) => {
      console.log('payload', payload)
      state.accessToken = payload;
      console.log('state', state)
    },
  },
});

export const { setAccessToken } = authSlice.actions;

export default authSlice.reducer;
