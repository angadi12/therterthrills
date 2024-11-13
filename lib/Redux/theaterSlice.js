import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Gettheaterlocations, Gettheaterlocationsandslots,GetAlltheater,GetTheateravailablitybyid } from '@/lib/API/Theater';
import { startOfToday } from "date-fns";

// Async thunk to fetch theater locations
export const fetchTheaterLocations = createAsyncThunk(
  'theater/fetchLocations',
  async (_, { rejectWithValue }) => {
    try {
      const response = await Gettheaterlocations();
      return response.data; // Assuming response contains a list of locations
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to fetch locations with slots
export const fetchLocationsAndSlots = createAsyncThunk(
  'theater/fetchLocationsAndSlots',
  async (data, { rejectWithValue }) => {
    try {
      const response = await Gettheaterlocationsandslots(data);
      return response.data; // Assuming response contains location and slot info
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


// Async thunk to fetch all theaters
export const fetchAllTheaters = createAsyncThunk(
  'theater/fetchAllTheaters',
  async (_, { rejectWithValue }) => {
    try {
      const response = await GetAlltheater();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to fetch theater availability by ID
export const fetchTheaterAvailabilityById = createAsyncThunk(
  'theater/fetchTheaterAvailabilityById',
  async (theaterId, { rejectWithValue }) => {
    try {
      const response = await GetTheateravailablitybyid(theaterId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);






const theaterSlice = createSlice({
  name: 'theater',
  initialState: {
    date: startOfToday().toISOString(), // Ensure the date is stored as a string
    selectedLocation: "",
    locations: [],
    locationsWithSlots: [],
    allTheaters: [],
    theaterAvailability: null,
    
    locationsloading: false,
    locationsWithSlotsloading: false,
    theaterAvailabilityloading:false,
    loading:false,

    locationsWithSlotserror: null,
    error: null,
  },
  reducers: {
    setDate(state, action) {
      state.date = action.payload;
    },
    setSelectedLocation(state, action) {
      state.selectedLocation = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch Theater Locations
    builder.addCase(fetchTheaterLocations.pending, (state) => {
      state.locationsloading = true;
      state.error = null;
    });
    builder.addCase(fetchTheaterLocations.fulfilled, (state, action) => {
      state.locations = action.payload;
      state.locationsloading = false;
    });
    builder.addCase(fetchTheaterLocations.rejected, (state, action) => {
      state.locationsloading = false;
      state.error = action.payload;
    });

    // Fetch Locations and Slots
    builder.addCase(fetchLocationsAndSlots.pending, (state) => {
      state.locationsWithSlotsloading = true;
      state.locationsWithSlotserror = null;
    });
    builder.addCase(fetchLocationsAndSlots.fulfilled, (state, action) => {
      state.locationsWithSlots = action.payload;
      state.locationsWithSlotsloading = false;
    });
    builder.addCase(fetchLocationsAndSlots.rejected, (state, action) => {
      state.locationsWithSlotsloading = false;
      state.locationsWithSlotserror = action.payload;
    });

    builder.addCase(fetchAllTheaters.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchAllTheaters.fulfilled, (state, action) => {
      state.allTheaters = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchAllTheaters.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });


    builder.addCase(fetchTheaterAvailabilityById.pending, (state) => {
      state.theaterAvailabilityloading = true;
      state.error = null;
    });
    builder.addCase(fetchTheaterAvailabilityById.fulfilled, (state, action) => {
      state.theaterAvailability = action.payload;
      state.theaterAvailabilityloading = false;
    });
    builder.addCase(fetchTheaterAvailabilityById.rejected, (state, action) => {
      state.theaterAvailabilityloading = false;
      state.error = action.payload;
    });

  },
});

export const { setDate, setSelectedLocation } = theaterSlice.actions;


export default theaterSlice.reducer;
