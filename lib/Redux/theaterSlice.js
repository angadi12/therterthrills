import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Gettheaterlocations, Gettheaterlocationsandslots } from '@/lib/API/Theater';

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

const theaterSlice = createSlice({
  name: 'theater',
  initialState: {
    locations: [],
    locationsWithSlots: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Fetch Theater Locations
    builder.addCase(fetchTheaterLocations.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchTheaterLocations.fulfilled, (state, action) => {
      state.locations = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchTheaterLocations.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Fetch Locations and Slots
    builder.addCase(fetchLocationsAndSlots.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchLocationsAndSlots.fulfilled, (state, action) => {
      state.locationsWithSlots = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchLocationsAndSlots.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default theaterSlice.reducer;
