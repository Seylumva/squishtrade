import axios from "axios";

export const serverErrorMessage = (error) => {
  return (
    (error.response && error.response.data && error.response.data.message) ||
    error.message ||
    error.toString()
  );
};

// User Slice Helpers

export const userRequest = (thunkAPI) => {
  return axios.create({
    baseURL: "/api/users",
    headers: thunkAPI && {
      Authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
    },
  });
};

export const conditionallyStoreUser = (axiosRequest) => {
  if (axiosRequest.data) {
    localStorage.setItem("user", JSON.stringify(axiosRequest.data));
  }
};

// Listing Slice Helpers

export const listingRequest = (thunkAPI) => {
  return axios.create({
    baseURL: "/api/listings",
    headers: thunkAPI && {
      Authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
    },
  });
};
