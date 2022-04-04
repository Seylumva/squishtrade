import {
  serverErrorMessage,
  listingRequest,
  userRequest,
} from "../../utils/sliceHelpers";

const userRequestWithoutToken = userRequest();
const listingRequestWithoutToken = listingRequest();

export const getUserProfileService = async (userId, thunkAPI) => {
  try {
    const response = await userRequestWithoutToken.get(`/${userId}`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(serverErrorMessage(error));
  }
};

export const getUserListingsService = async (thunkAPI) => {
  try {
    const requestInstance = listingRequest(thunkAPI);
    const response = await requestInstance.get();
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(serverErrorMessage(error));
  }
};

export const getAllListingsService = async (thunkAPI) => {
  try {
    const response = await listingRequestWithoutToken("/all");
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(serverErrorMessage(error));
  }
};

export const getListingService = async (listingId, thunkAPI) => {
  try {
    const response = await listingRequestWithoutToken(`/${listingId}`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(serverErrorMessage(error));
  }
};

export const createListingService = async (formData, thunkAPI) => {
  try {
    const requestInstance = listingRequest(thunkAPI);
    const response = await requestInstance.post("/", formData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(serverErrorMessage(error));
  }
};

export const editListingService = async (listingId, formData, thunkAPI) => {
  try {
    const requestInstance = listingRequest(thunkAPI);
    const response = await requestInstance.put(`/${listingId}`, formData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(serverErrorMessage(error));
  }
};

export const deleteListingService = async (listingId, thunkAPI) => {
  try {
    const requestInstance = listingRequest(thunkAPI);
    const response = await requestInstance.delete(`/${listingId}`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(serverErrorMessage(error));
  }
};
