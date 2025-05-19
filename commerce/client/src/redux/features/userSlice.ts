import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ProfileInfo, UserLogin } from "../../types";

const getUserFromStorage = (): ProfileInfo => {
  const stored = localStorage.getItem("userProfile");
  return stored
    ? JSON.parse(stored)
    : {
        email: "",
        displayName: "",
        occupation: "",
        photoUrl: "",
        user: undefined,
      };
};

const initialState: ProfileInfo = getUserFromStorage();

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    addToUser: (state, action: PayloadAction<ProfileInfo>) => {
      localStorage.setItem("userProfile", JSON.stringify(action.payload));
      return action.payload;
    },

    updateUserProfile(state, action: PayloadAction<Partial<ProfileInfo>>) {
      const updatedUser = { ...state, ...action.payload };
      localStorage.setItem("userProfile", JSON.stringify(updatedUser));
      return updatedUser;
    }
  },
});

export const { addToUser, updateUserProfile } = userSlice.actions;
export default userSlice.reducer;
