import { makeStore, rootReducer } from "store";

export type TAppStore = ReturnType<typeof makeStore>;
export type TRootState = ReturnType<typeof rootReducer>;
export type TAppDispatch = TAppStore["dispatch"];