import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

const reducer = createSlice({
  name: "user",
  initialState: userState,
  reducers: {
    setToken(state: object, action: PayloadAction<string>) {
      const userToken = {
        ...state,
        toekn: action?.payload,
      };
      localStorage.setItem("user", JSON.stringify(userToken));
    },
    setUserInfo(state: object, action: PayloadAction<object>) {
      const userUserInfo = {
        ...state,
        userInfo: action?.payload,
      };
      localStorage.setItem("user", JSON.stringify(userUserInfo));
    },
  },
});

export default reducer;
