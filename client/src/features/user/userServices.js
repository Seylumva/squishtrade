import {
  serverErrorMessage,
  userRequest,
  conditionallyStoreUser,
} from "../../utils/sliceHelpers";

const userRequestWithoutToken = userRequest();

export const refreshUser = async (thunkAPI) => {
  try {
    const requestInstance = userRequest(thunkAPI);
    const response = await requestInstance.get("/me");
    conditionallyStoreUser(response);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(serverErrorMessage(error));
  }
};

export const loginUser = async (formData, thunkAPI) => {
  try {
    const response = await userRequestWithoutToken.post("/login", formData);
    conditionallyStoreUser(response);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(serverErrorMessage(error));
  }
};

export const registerUser = async (formData, thunkAPI) => {
  try {
    const response = await userRequestWithoutToken.post(`/register`, formData);
    conditionallyStoreUser(response);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(serverErrorMessage(error));
  }
};

export const changeUserAvatar = async (formData, thunkAPI) => {
  try {
    const requestInstance = userRequest(thunkAPI);
    const response = await requestInstance.put("/me/avatar", formData);
    conditionallyStoreUser(response);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(serverErrorMessage(error));
  }
};
