import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import listingReducer from "../features/listing/listingSlice";
import userReducer from "../features/user/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    listing: listingReducer,
    cart: cartReducer,
  },
});
