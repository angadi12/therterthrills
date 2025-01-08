import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CreatRefund, GetAllrefunds, Getrefunddetails } from "@/lib/API/Refund";
import {GetRefundbookingbyBranchid,GetRefundbookingbytheaterid} from "@/lib/API/Booking"
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
  async ( {BranchId,startDate, endDate,} ,{ rejectWithValue }) => {
    try {
      const response = await GetAllrefunds( BranchId,startDate, endDate);
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
      return response.refund;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchRefundBookingByTheaterId = createAsyncThunk(
  "booking/fetchRefundBookingByTheaterId",
  async ({ TheaterId, status ,startDate, endDate}, { rejectWithValue }) => {
    try {
      const response = await GetRefundbookingbytheaterid( TheaterId, status,startDate, endDate);
      if (response.success === true) {
        return response;
      } else {
        return rejectWithValue(response.message || "Failed to fetch bookings");
      }
    } catch (error) {
      return rejectWithValue(error.message || "An error occurred");
    }
  }
);

export const fetchRefundBookingByBranchId = createAsyncThunk(
  "booking/fetchRefundBookingByBranchId",
  async ({ BranchId, status,startDate, endDate }, { rejectWithValue }) => {
    try {
      const response = await GetRefundbookingbyBranchid( BranchId, status,startDate, endDate );
      if (response.success === true) {
        return response;
      } else {
        return rejectWithValue(response.message || "Failed to fetch bookings");
      }
    } catch (error) {
      return rejectWithValue(error.message || "An error occurred");
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

    RefundTheaterbooking: [],
    RefundTheaterloading: false,
    RefundTheatererror: null,

    RefundAllTheaterbooking: [],
    RefundAllTheaterloading: false,
    RefundAllTheatererror: null,
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
      })

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
      })
  
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
      })

      .addCase(fetchRefundBookingByTheaterId.pending, (state) => {
        state.RefundTheaterloading = true;
        state.RefundTheatererror = null;
      })
      .addCase(fetchRefundBookingByTheaterId.fulfilled, (state, action) => {
        state.RefundTheaterloading = false;
        state.RefundTheaterbooking = action.payload; 
      })
      .addCase(fetchRefundBookingByTheaterId.rejected, (state, action) => {
        state.RefundTheaterloading = false;
        state.RefundTheatererror = action.payload; 
        state.RefundTheaterbooking = []; 
      })
      .addCase(fetchRefundBookingByBranchId.pending, (state) => {
        state.RefundAllTheaterloading = true;
        state.RefundAllTheatererror = null;
      })
      .addCase(fetchRefundBookingByBranchId.fulfilled, (state, action) => {
        state.RefundAllTheaterloading = false;
        state.RefundAllTheaterbooking = action.payload; 
      })
      .addCase(fetchRefundBookingByBranchId.rejected, (state, action) => {
        state.RefundAllTheaterloading = false;
        state.RefundAllTheatererror = action.payload; 
        state.RefundAllTheaterbooking = []; 
      });
  },
});

export default refundSlice.reducer;
