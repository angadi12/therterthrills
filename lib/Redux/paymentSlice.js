import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetAllpayments,Getsinglepayments} from "@/lib/API/Payment";
import { addDays } from "date-fns";
import { format, subDays } from "date-fns";

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
export const fetchsinglePayments = createAsyncThunk(
  "payments/fetchsinglePayments",
  async (id, thunkAPI) => {
    try {
      const response = await Getsinglepayments(id);
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

    singlePayment: null, 
    singleLoading: false,
    singleError: null,
   
    Selectedpaymentid:"",

    dateRange: {
      from: subDays(new Date(), 7), 
      to: new Date(),
    },
  },
  reducers: {
    setDateRange(state, action) {
      state.dateRange = action.payload;
    },
    setSelectedpaymentid(state, action) {
      state.Selectedpaymentid = action.payload;
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
      })

      .addCase(fetchsinglePayments.pending, (state) => {
        state.singleLoading = true;
        state.singleError = null;
      })
      .addCase(fetchsinglePayments.fulfilled, (state, action) => {
        state.singleLoading = false;
        state.singlePayment = action.payload;
      })
      .addCase(fetchsinglePayments.rejected, (state, action) => {
        state.singleLoading = false;
        state.singleError = action.payload;
      });
  },
});

export const selectPayments = (state) => state.payments.payments;
export const selectPaymentsLoading = (state) => state.payments.loading;
export const selectPaymentsError = (state) => state.payments.error;
export const selectSinglePayment = (state) => state.payments.singlePayment; 
export const selectSinglePaymentLoading = (state) => state.payments.singleLoading; 
export const selectSinglePaymentError = (state) => state.payments.singleError; // Selector for single error

export const { setDateRange ,setSelectedpaymentid} = paymentSlice.actions;

export default paymentSlice.reducer;
