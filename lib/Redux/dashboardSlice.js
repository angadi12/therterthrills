import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  GetAlltheateranalytics,
  Gettheateranalytics,
  getHourlyTheaterAnalytics,
  getAllHourlyTheaterAnalytics,
} from "@/lib/API/Dashboard"; // Update the path to your API function
import { startOfToday } from "date-fns";

// Thunk for fetching theater analytics
export const fetchTheaterAnalytics = createAsyncThunk(
  "theaterAnalytics/fetchAnalytics",
  async ({ id, year }, { rejectWithValue }) => {
    try {
      const response = await Gettheateranalytics(id, year);
      if (response.error) {
        return rejectWithValue(response.message);
      }
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const fetchAllTheaterAnalytics = createAsyncThunk(
  "AlltheaterAnalytics/fetchAnalytics",
  async ({ id, year }, { rejectWithValue }) => {
    try {
      const response = await GetAlltheateranalytics(id, year);
      if (response.error) {
        return rejectWithValue(response.message);
      }
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchHourlyTheaterAnalytics = createAsyncThunk(
  "HourlyTheaterAnalytics/fetchAnalytics",
  async ({ id, date }, { rejectWithValue }) => {
    try {
      const response = await getHourlyTheaterAnalytics(id, date);
      if (response.error) {
        return rejectWithValue(response.message);
      }
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAllHourlyTheaterAnalytics = createAsyncThunk(
  "AllHourlyTheaterAnalytics/fetchAnalytics",
  async ({ id, date }, { rejectWithValue }) => {
    try {
      const response = await getAllHourlyTheaterAnalytics(id, date);
      if (response.error) {
        return rejectWithValue(response.message);
      }
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const theaterAnalyticsSlice = createSlice({
  name: "theaterAnalytics",
  initialState: {
    data: null,
    loading: false,
    error: null,

    Alldata: null,
    Allloading: false,
    Allerror: null,

    Hourlydata: null,
    Hourlyloading: false,
    Hourlyerror: null,

    AllHourlydata: null,
    AllHourlyloading: false,
    AllHourlyerror: null,

    Hourlydate: startOfToday().toISOString(),
    
  },
  reducers: {
    clearAnalyticsData: (state) => {
      state.data = null;
      state.error = null;
    },
    setHourlydate(state, action) {
      state.Hourlydate = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTheaterAnalytics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTheaterAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchTheaterAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch analytics";
      })
      .addCase(fetchAllTheaterAnalytics.pending, (state) => {
        state.Allloading = true;
        state.Allerror = null;
      })
      .addCase(fetchAllTheaterAnalytics.fulfilled, (state, action) => {
        state.Allloading = false;
        state.Alldata = action.payload;
      })
      .addCase(fetchAllTheaterAnalytics.rejected, (state, action) => {
        state.Allloading = false;
        state.Allerror = action.payload || "Failed to fetch analytics";
      })
      .addCase(fetchHourlyTheaterAnalytics.pending, (state) => {
        state.Hourlyloading = true;
        state.Hourlyerror = null;
      })
      .addCase(fetchHourlyTheaterAnalytics.fulfilled, (state, action) => {
        state.Hourlyloading = false;
        state.Hourlydata = action.payload;
      })
      .addCase(fetchHourlyTheaterAnalytics.rejected, (state, action) => {
        state.Hourlyloading = false;
        state.Hourlyerror = action.payload || "Failed to fetch analytics";
      })
      .addCase(fetchAllHourlyTheaterAnalytics.pending, (state) => {
        state.AllHourlyloading = true;
        state.AllHourlyerror = null;
      })
      .addCase(fetchAllHourlyTheaterAnalytics.fulfilled, (state, action) => {
        state.AllHourlyloading = false;
        state.AllHourlydata = action.payload;
      })
      .addCase(fetchAllHourlyTheaterAnalytics.rejected, (state, action) => {
        state.AllHourlyloading = false;
        state.AllHourlyerror = action.payload || "Failed to fetch analytics";
      })
  },
});

export const { clearAnalyticsData ,setHourlydate} = theaterAnalyticsSlice.actions;

export default theaterAnalyticsSlice.reducer;
