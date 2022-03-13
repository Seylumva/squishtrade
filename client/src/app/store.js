import { configureStore } from "@reduxjs/toolkit";
import listingReducer from "../features/listing/listingSlice";
import userReducer from "../features/user/userSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    listing: listingReducer,
  },
});
