import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";

const initialSettings = {
  collapsed: false,
  intl: "zh",
  fixedHeader: false,
  showLogo: true,
  showTag: true,
  themeColor: "",
};
const settingsData = localStorage.getItem("settings");
const settingsState = settingsData ? JSON.parse(settingsData) : initialSettings;

const reducer: Slice = createSlice({
  name: "settings",
  initialState: settingsState,
  reducers: {
    setCollapse(state: any, action: PayloadAction<boolean>) {
      state.collapsed = action?.payload;
      localStorage.setItem("settings", JSON.stringify(state));
    },
    setIntl(state: any, action: PayloadAction<string>) {
      state.intl = action?.payload;
      localStorage.setItem("settings", JSON.stringify(state));
    },
    setFixedHeader(state: any, action: PayloadAction<boolean>) {
      state.fixedHeader = action?.payload;
      localStorage.setItem("settings", JSON.stringify(state));
    },
    setShowLogo(state: any, action: PayloadAction<boolean>) {
      state.showLogo = action?.payload;
      localStorage.setItem("settings", JSON.stringify(state));
    },
    setShowTag(state: any, action: PayloadAction<boolean>) {
      state.showTag = action?.payload;
      localStorage.setItem("settings", JSON.stringify(state));
    },
    setThemeColor(state: any, action: PayloadAction<any>) {
      state.themeColor = action?.payload;
      localStorage.setItem("settings", JSON.stringify(state));
    },
  },
});

export default reducer;
