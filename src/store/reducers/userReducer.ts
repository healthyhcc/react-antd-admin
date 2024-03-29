import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";

const initialUser = {
  token: "",
  userInfo: {
    id: 0,
    username: "",
    role: 1,
    avatar: "",
    last_login_time: "",
    last_login_ip: "",
  },
};

const userData = localStorage.getItem("user");
const userState = userData ? JSON.parse(userData) : initialUser;

const reducer: Slice = createSlice({
  name: "user",
  initialState: userState,
  reducers: {
    setToken(state: any, action: PayloadAction<string>) {
      state.token = action?.payload;
      localStorage.setItem("user", JSON.stringify(state));
    },
    setUserInfo(state: any, action: PayloadAction<object>) {
      state.userInfo = action?.payload;
      localStorage.setItem("user", JSON.stringify(state));
    },
  },
});

export default reducer;
