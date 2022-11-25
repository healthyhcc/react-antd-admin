import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";

const initialTags = {
  tags: [{ label: "menulist.home", key: "/home" }],
};

const reducer: Slice = createSlice({
  name: "tags",
  initialState: initialTags,
  reducers: {
    addTag(state: any, action: PayloadAction<any>) {
      const exist = state.tags.find(
        (item: any) => item?.key === action?.payload?.key
      );
      if (exist) {
        return state;
      }
      state.tags.push(action?.payload);
      return state;
    },
    closeTag(state: any, action: PayloadAction<any>) {
      const targetIndex = state.tags.findIndex(
        (item: any) => item?.key === action?.payload?.key
      );
      state.tags.splice(targetIndex, 1);
      return state;
    },
    closeOtherTag(state: any, action: PayloadAction<any>) {
      const filterState = state.tags.filter(
        (item: any) =>
          item?.key === action?.payload?.key || item?.key === "/home"
      );
      state.tags = filterState;
      return state;
    },
    closeAllTag(state: any) {
      const emptyState = state.tags.filter(
        (item: any) => item?.key === "/home"
      );
      state.tags = emptyState;
      return state;
    },
  },
});

export default reducer;
