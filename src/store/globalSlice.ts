import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { AppState } from "./index";

import type { TThemeMode } from "../utils/theme";

export interface GlobalState {
  themeMode: TThemeMode;
}

const initialState: GlobalState = {
  themeMode: "dark",
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setThemeMode(state, action: PayloadAction<TThemeMode>) {
      state.themeMode = action.payload;
    },
  },
});

export const { setThemeMode } = globalSlice.actions;

export const selectThemeModeState = (state: AppState) => state.global.themeMode;

export default globalSlice.reducer;
