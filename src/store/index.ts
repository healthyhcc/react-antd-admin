import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/store/reducers/userReducer";
import settingsReducer from "@/store/reducers/settingsReducer";
import tagsReducer from "@/store/reducers/tagsReducer";
import refsReducer from "@/store/reducers/refsReducer";

const store = configureStore({
  reducer: {
    user: userReducer.reducer,
    settings: settingsReducer.reducer,
    tags: tagsReducer.reducer,
    refs: refsReducer.reducer,
  },
  middleware: [],
  devTools: true,
});

export const { setToken, setUserInfo } = userReducer.actions;
export const { setCollapse, setIntl, setFixedHeader, setShowLogo, setShowTag } =
  settingsReducer.actions;
export const { addTag, closeTag, closeOtherTag, closeAllTag } =
  tagsReducer.actions;
export const {
  setHamburgerRef,
  setBreadcrumbRef,
  setFullscreenRef,
  setIntlRef,
  setSettingsRef,
} = refsReducer.actions;

export default store;
