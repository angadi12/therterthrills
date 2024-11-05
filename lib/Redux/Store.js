import { configureStore } from "@reduxjs/toolkit";
import checkoutReducer from "@/lib/Redux/checkoutSlice"

export const store = configureStore({
  reducer: {
    checkout: checkoutReducer,
  },
});
