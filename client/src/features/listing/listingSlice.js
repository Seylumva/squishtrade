import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getUserProfileService,
  getUserListingsService,
  getAllListingsService,
  getListingService,
  createListingService,
  editListingService,
  deleteListingService,
  deleteListingImageService,
} from "./listingServices";

export const getUserProfile = createAsyncThunk(
  "listing/getUserProfile",
  async (userId, thunkAPI) => {
    return await getUserProfileService(userId, thunkAPI);
  }
);

export const deleteListingImage = createAsyncThunk(
  "listing/deleteImage",
  async ({ postId, imageId }, thunkAPI) => {
    return await deleteListingImageService(postId, imageId, thunkAPI);
  }
);

export const getUserListings = createAsyncThunk(
  "listing/getUserListings",
  async (_, thunkAPI) => {
    return await getUserListingsService(thunkAPI);
  }
);

export const getAllListings = createAsyncThunk(
  "listing/getListings",
  async (_, thunkAPI) => {
    return await getAllListingsService(thunkAPI);
  }
);

export const getListing = createAsyncThunk(
  "listing/getListing",
  async (postId, thunkAPI) => {
    return await getListingService(postId, thunkAPI);
  }
);

export const createListing = createAsyncThunk(
  "listing/createListing",
  async (formData, thunkAPI) => {
    return await createListingService(formData, thunkAPI);
  }
);

export const editListing = createAsyncThunk(
  "listing/editListing",
  async ({ listingId, formData }, thunkAPI) => {
    return await editListingService(listingId, formData, thunkAPI);
  }
);

export const deleteListing = createAsyncThunk(
  "listing/deleteListing",
  async (listingId, thunkAPI) => {
    return await deleteListingService(listingId, thunkAPI);
  }
);

const initialState = {
  listings: null,
  listing: null,
  status: null,
  profile: null,
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
      })
      .addCase(getUserProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.status = "success";
        state.profile = action.payload.user;
        state.listings = action.payload.listings;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.status = "error";
        state.message = action.payload;
      })
      .addCase(deleteListingImage.fulfilled, (state, action) => {
        state.listing = action.payload;
      })
      .addCase(deleteListingImage.rejected, (state, action) => {
        state.message = action.payload;
      });
  },
});

export default listingSlice.reducer;
export const { reset } = listingSlice.actions;
