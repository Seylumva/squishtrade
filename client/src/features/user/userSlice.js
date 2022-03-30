import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  registerUser,
  loginUser,
  changeUserAvatar,
  refreshUser,
} from "./userServices";

const user = JSON.parse(localStorage.getItem("user"));

export const refreshUserData = createAsyncThunk(
  "user/refreshUser",
  async (_, thunkAPI) => {
    return await refreshUser(thunkAPI);
  }
);

export const changeAvatar = createAsyncThunk(
  "user/changeAvatar",
  async (formData, thunkAPI) => {
    return await changeUserAvatar(formData, thunkAPI);
  }
);

export const register = createAsyncThunk(
  "user/register",
  async (formData, thunkAPI) => {
    return await registerUser(formData, thunkAPI);
  }
);

export const login = createAsyncThunk(
  "user/login",
  async (formData, thunkAPI) => {
    return await loginUser(formData, thunkAPI);
  }
);

export const logout = createAsyncThunk("user/logout", async () => {
  await localStorage.removeItem("user");
});

const initialState = {
  user: user ? user : null,
  status: null,
  message: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state) => {
      state.message = "";
      state.status = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.status = "loading";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "error";
        state.message = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "error";
        state.message = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(refreshUserData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(refreshUserData.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload;
      })
      .addCase(refreshUserData.rejected, (state, action) => {
        state.status = "error";
        state.message = action.payload;
      })
      .addCase(changeAvatar.pending, (state) => {
        state.status = "loading";
      })
      .addCase(changeAvatar.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload;
      })
      .addCase(changeAvatar.rejected, (state, action) => {
        state.status = "error";
        state.message = action.payload;
      });
  },
});

export default userSlice.reducer;
export const { reset } = userSlice.actions;
