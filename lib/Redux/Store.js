import { configureStore } from "@reduxjs/toolkit";
import checkoutReducer from "@/lib/Redux/checkoutSlice";
import cakesReducer from "@/lib/Redux/cakeSlice";
import addOnsSlice from "@/lib/Redux/addOnsSlice";
import authSlice from "@/lib/Redux/authSlice";
import dialogReducer from "@/lib/Redux/dialogSlice";
import theaterReducer from '@/lib/Redux/theaterSlice'; 
import branchSlice from "@/lib/Redux/BranchSlice";
import totalAmountReducer from "@/lib/Redux/totalAmountSlice";

export const store = configureStore({
  reducer: {
    checkout: checkoutReducer,
    cakes: cakesReducer,
    addOns: addOnsSlice,
    auth: authSlice,
    dialog: dialogReducer,
    theater: theaterReducer,
    branches: branchSlice,
    totalAmount: totalAmountReducer,


  },
});
