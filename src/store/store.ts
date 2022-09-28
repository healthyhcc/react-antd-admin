import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/store/reducers/userReducer";
import settingsReducer from "@/store/reducers/settingsReducer";
import tagsReducer from "@/store/reducers/tagsReducer";

const store = configureStore({
  reducer: {
    user: userReducer.reducer,
    settings: settingsReducer.reducer,
    tags: tagsReducer.reducer,
  },
  devTools: true,
});

export const { setToken, setUserInfo } = userReducer.actions;
export const { setCollapse, setIntl, setFixedHeader, setShowLogo, setShowTag } =
  settingsReducer.actions;
export const { addTag, closeTag, closeOtherTag, closeAllTag } =
  tagsReducer.actions;

export default store;
