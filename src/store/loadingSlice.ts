import { createSlice, type PayloadAction,  } from "@reduxjs/toolkit";

type LoadingState = {
  globalLoading: boolean;
  loadingMap: Record<string, boolean>;
};

const initialState: LoadingState = {
  globalLoading: false,
  loadingMap: {},
};

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    // Global loading
    setGlobalLoading(state, action: PayloadAction<boolean>) {
      state.globalLoading = action.payload;
    },

    // Set loading theo key
    setLoading(
      state,
      action: PayloadAction<{ key: string; value: boolean }>
    ) {
      const { key, value } = action.payload;
      state.loadingMap[key] = value;
    },

    // Reset tất cả loading
    resetLoading(state) {
      state.globalLoading = false;
      state.loadingMap = {};
    },
  },
});

export const { setGlobalLoading, setLoading, resetLoading } =
  loadingSlice.actions;

export default loadingSlice.reducer;