import { configureStore } from "@reduxjs/toolkit";
import checkoutReducer from "@/lib/Redux/checkoutSlice";
import cakesReducer from "@/lib/Redux/cakeSlice";
import addOnsSlice from "@/lib/Redux/addOnsSlice";
import authSlice from "@/lib/Redux/authSlice";
import dialogReducer from "@/lib/Redux/dialogSlice";

export const store = configureStore({
  reducer: {
    checkout: checkoutReducer,
    cakes: cakesReducer,
    addOns: addOnsSlice,
    auth: authSlice,
    dialog: dialogReducer,
  },
});
