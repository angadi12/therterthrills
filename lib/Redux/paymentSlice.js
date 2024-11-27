import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetAllpayments } from "@/lib/API/Payment";
import { addDays } from "date-fns";
import { subDays } from "date-fns"; // Use subDays to subtract days from the current date

export const fetchPayments = createAsyncThunk(
  "payments/fetchPayments",
  async ({ from, to, count, skip }, thunkAPI) => {
    try {
      const response = await GetAllpayments({ from, to, count, skip });
      return response.data; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const paymentSlice = createSlice({
  name: "payments",
  initialState: {
    payments: [],
    loading: false,
    error: null,
    dateRange: {
      from: subDays(new Date(), 7), 
      to: new Date(),
    },
  },
  reducers: {
    setDateRange(state, action) {
      state.dateRange = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPayments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.payments = action.payload; 
      })
      .addCase(fetchPayments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      });
  },
});

export const selectPayments = (state) => state.payments.payments;
export const selectPaymentsLoading = (state) => state.payments.loading;
export const selectPaymentsError = (state) => state.payments.error;

export const { setDateRange } = paymentSlice.actions;

export default paymentSlice.reducer;
