import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialSettings = {
  collapsed: false,
  intl: "zh",
  fixedHeader: false,
  showLogo: true,
  showTag: true,
};
const settingsData = localStorage.getItem("settings");
const settingsState = settingsData ? JSON.parse(settingsData) : initialSettings;

const reducer = createSlice({
  name: "settings",
  initialState: settingsState,
  reducers: {
    setCollapse(state: any, action: PayloadAction<boolean>) {
      const settingsCollapsed = {
        ...state,
        collapsed: action?.payload,
      };
      localStorage.setItem("settings", JSON.stringify(settingsCollapsed));
    },
    setIntl(state: any, action: PayloadAction<string>) {
      const settingsIntl = {
        ...state,
        intl: action?.payload,
      };
      localStorage.setItem("settings", JSON.stringify(settingsIntl));
    },
    setFixedHeader(state: any, action: PayloadAction<boolean>) {
      const settingsFixedHeader = {
        ...state,
        fixedHeader: action?.payload,
      };
      localStorage.setItem("settings", JSON.stringify(settingsFixedHeader));
    },
    setShowLogo(state: any, action: PayloadAction<boolean>) {
      const settingsShowLogo = {
        ...state,
        showLogo: action?.payload,
      };
      localStorage.setItem("settings", JSON.stringify(settingsShowLogo));
    },
    setShowTag(state: any, action: PayloadAction<boolean>) {
      const settingsShowTag = {
        ...state,
        showTag: action?.payload,
      };
      localStorage.setItem("settings", JSON.stringify(settingsShowTag));
    },
  },
});

export default reducer;
