import { configureStore } from "@reduxjs/toolkit";
import checkoutReducer from "@/lib/Redux/checkoutSlice";
import cakesReducer from "@/lib/Redux/cakeSlice";
import addOnsSlice from "@/lib/Redux/addOnsSlice";
import authSlice from "@/lib/Redux/authSlice";
import dialogReducer from "@/lib/Redux/dialogSlice";
import theaterReducer from "@/lib/Redux/theaterSlice";
import branchSlice from "@/lib/Redux/BranchSlice";
import totalAmountReducer from "@/lib/Redux/totalAmountSlice";
import bookingReducer from "@/lib/Redux/bookingSlice";
import expenseSlice from "@/lib/Redux/expensesSlice";
import adminReducer from "@/lib/Redux/AdminSlice";
import paymentReducer from "@/lib/Redux/paymentSlice";
import contactsSlice from "@/lib/Redux/contactSlice";
import theaterAnalyticsReducer from "@/lib/Redux/dashboardSlice";

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
    booking: bookingReducer,
    admin: adminReducer,
    payments: paymentReducer,
    expenses: expenseSlice,
    contacts: contactsSlice,
    theaterAnalytics: theaterAnalyticsReducer,

  },
});
