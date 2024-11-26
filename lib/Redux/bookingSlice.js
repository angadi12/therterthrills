import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Getbookingbyuserid,Getbookingbytheaterid} from "@/lib/API/Booking"; // Adjust the path as necessary

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
export const fetchBookingByTheaterId = createAsyncThunk(
  "booking/fetchBookingByTheaterId",
  async (TheaterId, { rejectWithValue }) => {
    try {
      const response = await Getbookingbytheaterid(TheaterId);
      if (response.success === true) {
        console.log(response.data)
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
     Selectedtheaterbyid:"",
    Theaterbooking:[],
    Theaterloading:false,
    Theatererror:null
  },
  reducers: {
       Setselectedtheaterid:(state,action)=>{
        state.Selectedtheaterbyid=action.payload
       }

       

       
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
      })
      .addCase(fetchBookingByTheaterId.pending, (state) => {
        state.Theaterloading = true;
        state.Theatererror = null;
      })
      .addCase(fetchBookingByTheaterId.fulfilled, (state, action) => {
        state.Theaterloading = false;
        state.Theaterbooking = action.payload; // Update state with fetched bookings
      })
      .addCase(fetchBookingByTheaterId.rejected, (state, action) => {
        state.Theaterloading = false;
        state.Theatererror = action.payload; // Capture the error message
      });
  },
});

export const selectBookings = (state) => state.booking.bookings; // Selector for bookings
export const selectBookingLoading = (state) => state.booking.loading; // Selector for loading state
export const selectBookingError = (state) => state.booking.error; //

export const { Setselectedtheaterid} = bookingSlice.actions;

export default bookingSlice.reducer;
