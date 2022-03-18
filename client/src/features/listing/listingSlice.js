import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "/api/listings";

export const getUserListings = createAsyncThunk(
  "listing/getUserListings",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      });
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAllListings = createAsyncThunk(
  "listing/getListings",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/all`);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getListing = createAsyncThunk(
  "listing/getListing",
  async (postId, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/${postId}`);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createListing = createAsyncThunk(
  "listing/createListing",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(API_URL, formData, {
        headers: {
          Authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      });
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const editListing = createAsyncThunk(
  "listing/editListing",
  async ({ listingId, formData }, thunkAPI) => {
    try {
      const response = await axios.put(`${API_URL}/${listingId}`, formData, {
        headers: {
          Authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      });
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteListing = createAsyncThunk(
  "listing/deleteListing",
  async (listingId, thunkAPI) => {
    try {
      const response = await axios.delete(`${API_URL}/${listingId}`, {
        headers: {
          Authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      });
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  listings: null,
  listing: null,
  status: null,
  message: "",
};

const listingSlice = createSlice({
  name: "listing",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserListings.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserListings.fulfilled, (state, action) => {
        state.status = "success";
        state.listings = action.payload;
      })
      .addCase(getUserListings.rejected, (state, action) => {
        state.status = "error";
        state.message = action.payload;
      })
      .addCase(getListing.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getListing.fulfilled, (state, action) => {
        state.status = "success";
        state.listing = action.payload;
      })
      .addCase(getListing.rejected, (state, action) => {
        state.status = "error";
        state.message = action.payload;
      })
      .addCase(createListing.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createListing.fulfilled, (state, action) => {
        state.status = "success";
        state.listing = action.payload;
      })
      .addCase(createListing.rejected, (state, action) => {
        state.status = "error";
        state.message = action.payload;
      })
      .addCase(deleteListing.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteListing.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(deleteListing.rejected, (state, action) => {
        state.status = "error";
        state.message = action.payload;
      })
      .addCase(editListing.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editListing.fulfilled, (state) => {
        state.status = "success";
      })
      .addCase(editListing.rejected, (state, action) => {
        state.status = "error";
        state.message = action.payload;
      })
      .addCase(getAllListings.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllListings.fulfilled, (state, action) => {
        state.status = "success";
        state.listings = action.payload;
      })
      .addCase(getAllListings.rejected, (state, action) => {
        state.status = "error";
        state.message = action.payload;
      });
  },
});

export default listingSlice.reducer;
export const { reset } = listingSlice.actions;
