import axios from "axios";
const API_URL = "/api/users";

export const loginUser = async (formData, thunkAPI) => {
  try {
    const response = await axios.post(`${API_URL}/login`, formData);
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
};

export const registerUser = async (formData, thunkAPI) => {
  try {
    const response = await axios.post(`${API_URL}/register`, formData);
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
};

export const changeUserAvatar = async (formData, thunkAPI) => {
  try {
    const response = await axios.put(`${API_URL}/me/avatar`, formData, {
      headers: {
        Authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    });
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
};
