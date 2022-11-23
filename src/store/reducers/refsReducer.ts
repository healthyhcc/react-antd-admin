import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialRefs = {
  hamburgerRef: null,
  breadcrumbRef: null,
  fullscreenRef: null,
  intlRef: null,
  settingsRef: null,
};

const reducer = createSlice({
  name: "refs",
  initialState: initialRefs,
  reducers: {
    setHamburgerRef(state: any, action: PayloadAction<object>) {
      state.hamburgerRef = action.payload;
    },
    setBreadcrumbRef(state: any, action: PayloadAction<object>) {
      state.breadcrumbRef = action.payload;
    },
    setFullscreenRef(state: any, action: PayloadAction<object>) {
      state.fullscreenRef = action.payload;
    },
    setIntlRef(state: any, action: PayloadAction<object>) {
      state.intlRef = action.payload;
    },
    setSettingsRef(state: any, action: PayloadAction<object>) {
      state.settingsRef = action.payload;
    },
  },
});

export default reducer;
