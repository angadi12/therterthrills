import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  Getbookingbyuserid,
  Getbookingbytheaterid,
  Getunsavedbookingbytheaterid,
  Getbookingbyid,
  GetbookingbyBranchid,
  Getunbookingbyid,
  Getbookingbyslottheaterid,
  Changeslot,
  GetunsavedbookingbyBranchid
} from "@/lib/API/Booking"; // Adjust the path as necessary

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

export const fetchBookingById = createAsyncThunk(
  "booking/fetchBookingById",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await Getbookingbyid(userId);
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
export const fetchUnBookingById = createAsyncThunk(
  "booking/fetchUnBookingById",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await Getunbookingbyid(userId);
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
  async ({ TheaterId, status ,startDate, endDate}, { rejectWithValue }) => {
    try {
      const response = await Getbookingbytheaterid( TheaterId, status,startDate, endDate);
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

export const fetchBookingByBranchId = createAsyncThunk(
  "booking/fetchBookingByBranchId",
  async ({ BranchId, status,startDate, endDate }, { rejectWithValue }) => {
    try {
      const response = await GetbookingbyBranchid( BranchId, status,startDate, endDate );
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

export const fetchTheaterslotbyid= createAsyncThunk(
  "booking/fetchTheaterslotbyid",
  async (data, { rejectWithValue }) => {
    try {
      const response = await Getbookingbyslottheaterid( data );
      if (response.status === true) {
        return response.data[0];
      } else {
        return rejectWithValue(response.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchChangeslot= createAsyncThunk(
  "booking/fetchChangeslot",
  async (data, { rejectWithValue }) => {
    try {
      const response = await Changeslot( data );
      if (response.status === true) {
        return response;
      } else {
        return rejectWithValue(response.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);



export const fetchUnsavedBookingByTheaterId = createAsyncThunk(
  "booking/fetchUnsavedBookingByTheaterId",
  async ({TheaterId, status,startDate, endDate}, { rejectWithValue }) => {
    try {
      const response = await Getunsavedbookingbytheaterid(TheaterId, status,startDate, endDate);
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
export const fetchUnsavedBookingByBranchId = createAsyncThunk(
  "booking/fetchUnsavedBookingByBranchId",
  async ({ BranchId, status,startDate, endDate }, { rejectWithValue }) => {
    try {
      const response = await GetunsavedbookingbyBranchid( BranchId, status,startDate, endDate );
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

const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    bookings: [],
    loading: false,
    error: null,
    Selectedtheaterbyid: "",

    Theaterbooking: [],
    Theaterloading: false,
    Theatererror: null,

    AllTheaterbooking: [],
    AllTheaterloading: false,
    AllTheatererror: null,

    UnsavedTheaterbooking: [],
    UnsavedTheaterloading: false,
    UnsavedTheatererror: null,

    Unsavedbooking: [],
    Unsavedloading: false,
    Unsavederror: null,

    singlebooking:{},
    bookingloading:false,
    bookingerror:null,

    singleunbooking:{},
    bookingunloading:false,
    bookingunerror:null,

    Availableslots:{},
    loadingslots:false,
    slotsserror:null,

    Changeslots:{},
    Changeloadingslots:false,
    Changeslotsserror:null,


    SelectedtheatreSlotid:"",



    proccedwithbranchid:"",
    Selectbookingsid:""

  },
  reducers: {
    Setselectedtheaterid: (state, action) => {
      state.Selectedtheaterbyid = action.payload;
    },
    Setselectedproccedbranchid: (state, action) => {
      state.proccedwithbranchid = action.payload;
    },
    SetSelectbookingsid: (state, action) => {
      state.Selectbookingsid = action.payload;
    },
    setSelectedtheatreSlotid: (state, action) => {
      state.SelectedtheatreSlotid = action.payload;
    },
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
        state.Theaterbooking = []; // Update state with fetched bookings

      })
      .addCase(fetchBookingByBranchId.pending, (state) => {
        state.AllTheaterloading = true;
        state.AllTheatererror = null;
      })
      .addCase(fetchBookingByBranchId.fulfilled, (state, action) => {
        state.AllTheaterloading = false;
        state.AllTheaterbooking = action.payload; // Update state with fetched bookings
      })
      .addCase(fetchBookingByBranchId.rejected, (state, action) => {
        state.AllTheaterloading = false;
        state.AllTheatererror = action.payload; // Capture the error message
        state.AllTheaterbooking = []; // Update state with fetched bookings

      })

      .addCase(fetchUnsavedBookingByTheaterId.pending, (state) => {
        state.UnsavedTheaterloading = true;
        state.UnsavedTheatererror = null;
      })
      .addCase(fetchUnsavedBookingByTheaterId.fulfilled, (state, action) => {
        state.UnsavedTheaterloading = false;
        state.UnsavedTheaterbooking = action.payload; // Update state with fetched bookings
      })
      .addCase(fetchUnsavedBookingByTheaterId.rejected, (state, action) => {
        state.UnsavedTheaterloading = false;
        state.UnsavedTheatererror = action.payload; // Capture the error message
      })

      .addCase(fetchBookingById.pending, (state) => {
        state.bookingloading = true;
        state.bookingerror = null;
      })
      .addCase(fetchBookingById.fulfilled, (state, action) => {
        state.bookingloading = false;
        state.singlebooking = action.payload;
      })
      .addCase(fetchBookingById.rejected, (state, action) => {
        state.bookingloading = false;
        state.bookingerror = action.payload; 
      })
      .addCase(fetchUnBookingById.pending, (state) => {
        state.bookingunloading = true;
        state.bookingunerror = null;
      })
      .addCase(fetchUnBookingById.fulfilled, (state, action) => {
        state.bookingunloading = false;
        state.singleunbooking = action.payload;
      })
      .addCase(fetchUnBookingById.rejected, (state, action) => {
        state.bookingunloading = false;
        state.bookingunerror = action.payload; 
      })
      .addCase(fetchTheaterslotbyid.pending, (state) => {
        state.loadingslots = true;
        state.slotsserror = null;
      })
      .addCase(fetchTheaterslotbyid.fulfilled, (state, action) => {
        state.loadingslots = false;
        state.Availableslots = action.payload;
      })
      .addCase(fetchTheaterslotbyid.rejected, (state, action) => {
        state.loadingslots = false;
        state.slotsserror = action.payload; 
      })
      .addCase(fetchChangeslot.pending, (state) => {
        state.Changeloadingslots = true;
        state.Changeslotsserror = null;
      })
      .addCase(fetchChangeslot.fulfilled, (state, action) => {
        state.Changeloadingslots = false;
        state.Changeslots = action.payload;
      })
      .addCase(fetchChangeslot.rejected, (state, action) => {
        state.Changeloadingslots = false;
        state.Changeslotsserror = action.payload; 
      })

      .addCase(fetchUnsavedBookingByBranchId.pending, (state) => {
        state.UnsavedTheaterloading = true;
        state.UnsavedTheatererror = null;
      })
      .addCase(fetchUnsavedBookingByBranchId.fulfilled, (state, action) => {
        state.UnsavedTheaterloading = false;
        state.UnsavedTheaterbooking = action.payload; 
      })
      .addCase(fetchUnsavedBookingByBranchId.rejected, (state, action) => {
        state.UnsavedTheaterloading = false;
        state.UnsavedTheatererror = action.payload;
      })
  },
});

export const selectBookings = (state) => state.booking.bookings; // Selector for bookings
export const selectunBookings = (state) => state.booking.bookings; // Selector for bookings
export const selectBookingLoading = (state) => state.booking.loading; // Selector for loading state
export const selectBookingError = (state) => state.booking.error; //

export const { Setselectedtheaterid,Setselectedproccedbranchid ,SetSelectbookingsid,setSelectedtheatreSlotid} = bookingSlice.actions;

export default bookingSlice.reducer;
