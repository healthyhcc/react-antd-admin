import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialTags = [{ label: "menulist.home", key: "/home" }];

const reducer = createSlice({
  name: "tags",
  initialState: initialTags,
  reducers: {
    addTag(state: any, action: PayloadAction<object>) {
      const exist = state.find(
        (item: { key: any }) => item?.key === action?.data?.key
      );
      if (exist) {
        return state;
      }
      state.push(action?.payload);
      return state;
    },
    closeTag(state: any, action: PayloadAction<object>) {
      const targetIndex = state.findIndex(
        (item: { key: any }) => item?.key === action?.payload?.key
      );
      state.splice(targetIndex, 1);
      return state;
    },
    closeOtherTag(state: any, action: PayloadAction<object>) {
      const filterState = state.filter(
        (item: { key: string }) =>
          item?.key === action?.payload?.key || item?.key === "/home"
      );
      return filterState;
    },
    closeAllTag(state: any) {
      const emptyState = state.filter(
        (item: { key: string }) => item?.key === "/home"
      );
      return emptyState;
    },
  },
});

export default reducer;
