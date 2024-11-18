import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Getbookingbyuserid } from "@/lib/API/Booking"; // Adjust the path as necessary

// Thunk for fetching booking by user ID
export const fetchBookingByUserId = createAsyncThunk(
  "booking/fetchBookingByUserId",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await Getbookingbyuserid(userId);
      if (response.success === true) {
        return response.data; 
      } else {
        return rejectWithValue(response.message || "Failed to fetch bookings");
      }
    } catch (error) {
      return rejectWithValue(error.message || "An error occurred");
    }
  }
);

const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    bookings: [],
    loading: false,
    error: null,
  },
  reducers: {
    // Optionally add non-async reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookingByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookingByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload; // Update state with fetched bookings
      })
      .addCase(fetchBookingByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Capture the error message
      });
  },
});

export const selectBookings = (state) => state.booking.bookings; // Selector for bookings
export const selectBookingLoading = (state) => state.booking.loading; // Selector for loading state
export const selectBookingError = (state) => state.booking.error; //

export default bookingSlice.reducer;
