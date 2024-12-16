import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  Gettheaterlocations,
  Gettheaterlocationsandslots,
  GetAlltheater,
  GetTheateravailablitybyid,
  Gettheaterbyid,
  Getalltheaterbybranchid
} from "@/lib/API/Theater";
import { startOfToday } from "date-fns";

// Async thunk to fetch theater locations
export const fetchTheaterLocations = createAsyncThunk(
  "theater/fetchLocations",
  async (branchid, { rejectWithValue }) => {
    try {
      const response = await Gettheaterlocations(branchid);
      return response.data.locations; // Assuming response contains a list of locations
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to fetch locations with slots
export const fetchLocationsAndSlots = createAsyncThunk(
  "theater/fetchLocationsAndSlots",
  async (data, { rejectWithValue }) => {
    try {
      const response = await Gettheaterlocationsandslots(data);
      return response.data; // Assuming response contains location and slot info
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchtheaterbyid = createAsyncThunk(
  "theater/fetchtheaterbyid",
  async (id, { rejectWithValue }) => {
    try {
      const response = await Gettheaterbyid(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchtheaterbybranchid = createAsyncThunk(
  "theater/fetchtheaterbybranchid",
  async (id, { rejectWithValue }) => {
    try {
      const response = await Getalltheaterbybranchid(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Async thunk to fetch all theaters
export const fetchAllTheaters = createAsyncThunk(
  "theater/fetchAllTheaters",
  async (date, { rejectWithValue }) => {
    try {
      const response = await GetAlltheater(date);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to fetch theater availability by ID
export const fetchTheaterAvailabilityById = createAsyncThunk(
  "theater/fetchTheaterAvailabilityById",
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
  name: "theater",
  initialState: {
    date: startOfToday().toISOString(),
    selectedLocation: "",
    locations: [],
    locationsWithSlots: [],
    allTheaters: [],
    theaterAvailability: null,
    theater: null,
    selectedTheater: "",
    selectedslotsid: "",
    branchtheatre:[], 
    opentheatre:false,
    openupdatetheatre:false,
    Updatetheaterid:"",

    locationsloading: false,
    locationsWithSlotsloading: false,
    theaterAvailabilityloading: false,
    loading: false,
    theaterloading: false,
    branchtheatreloading:false, 

    locationsWithSlotserror: null,
    error: null,
    theatererror: null,
    branchtheatreerror:null,

    opencreatetheatre:false
  },
  reducers: {
    setDate(state, action) {
      state.date = action.payload;
    },
    setSelectedLocation(state, action) {
      state.selectedLocation = action.payload;
    },
    setSelectedTheater(state, action) {
      state.selectedTheater = action.payload;
    },
    setSelectedSlotid(state, action) {
      state.selectedslotsid = action.payload;
    },
    setUpdatetheaterid(state, action) {
      state.Updatetheaterid = action.payload;
    },
    setopentheatre(state, action) {
      state.opentheatre = action.payload;
    },
    setopencreatetheatre(state, action) {
      state.opencreatetheatre = action.payload;
    },
    setopenupdatetheatre(state, action) {
      state.openupdatetheatre = action.payload;
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
    // Fetch Theater by branchid
    builder.addCase(fetchtheaterbybranchid.pending, (state) => {
      state.branchtheatreloading = true;
      state.branchtheatreerror = null;
    });
    builder.addCase(fetchtheaterbybranchid.fulfilled, (state, action) => {
      state.branchtheatre = action.payload;
      state.branchtheatreloading = false;
    });
    builder.addCase(fetchtheaterbybranchid.rejected, (state, action) => {
      state.branchtheatreloading = false;
      state.branchtheatreerror = action.payload?.message || "Something went wrong";
      state.branchtheatre = []; // Reset the theater list


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

    builder.addCase(fetchtheaterbyid.pending, (state) => {
      state.theaterloading = true;
      state.theatererror = null;
    });
    builder.addCase(fetchtheaterbyid.fulfilled, (state, action) => {
      state.theater = action.payload;
      state.theaterloading = false;
    });
    builder.addCase(fetchtheaterbyid.rejected, (state, action) => {
      state.theaterloading = false;
      state.theatererror = action.payload;
    });
  },
});

export const {
  setDate,
  setSelectedLocation,
  setSelectedTheater,
  setSelectedSlotid,
  setopentheatre,
  setopenupdatetheatre,
  setopencreatetheatre,
  setUpdatetheaterid
} = theaterSlice.actions;

export default theaterSlice.reducer;
