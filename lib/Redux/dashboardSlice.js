import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetAlltheateranalytics,Gettheateranalytics ,getHourlyTheaterAnalytics} from "@/lib/API/Dashboard"; // Update the path to your API function

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
export const fetchAllTheaterAnalytics = createAsyncThunk(
  "AlltheaterAnalytics/fetchAnalytics",
  async ({id,year}, { rejectWithValue }) => {
    try {
      const response = await GetAlltheateranalytics(id,year);
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


  },
  reducers: {
    clearAnalyticsData: (state) => {
      state.data = null;
      state.error = null;
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
      });
  },
});

export const { clearAnalyticsData } = theaterAnalyticsSlice.actions;

export default theaterAnalyticsSlice.reducer;
