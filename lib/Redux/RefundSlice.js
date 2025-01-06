import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CreatRefund, GetAllrefunds, Getrefunddetails } from "@/lib/API/Refund"; 

// Thunks
export const initiateRefund = createAsyncThunk(
  "refunds/initiateRefund",
  async (data, { rejectWithValue }) => {
    try {
      const response = await CreatRefund(data);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchAllRefunds = createAsyncThunk(
  "refunds/fetchAllRefunds",
  async (_, { rejectWithValue }) => {
    try {
      const response = await GetAllrefunds();
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchRefundDetails = createAsyncThunk(
  "refunds/fetchRefundDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await Getrefunddetails(id);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Slice
const refundSlice = createSlice({
  name: "refunds",
  initialState: {
    refunds: [],
    refundDetails: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Initiate Refund
    builder
      .addCase(initiateRefund.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(initiateRefund.fulfilled, (state, action) => {
        state.loading = false;
        state.refunds.push(action.payload);
      })
      .addCase(initiateRefund.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch All Refunds
    builder
      .addCase(fetchAllRefunds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllRefunds.fulfilled, (state, action) => {
        state.loading = false;
        state.refunds = action.payload;
      })
      .addCase(fetchAllRefunds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch Refund Details
    builder
      .addCase(fetchRefundDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRefundDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.refundDetails = action.payload;
      })
      .addCase(fetchRefundDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default refundSlice.reducer;
