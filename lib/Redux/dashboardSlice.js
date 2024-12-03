import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetAlltheateranalytics } from "@/lib/API/Dashboard"; // Update the path to your API function

// Thunk for fetching theater analytics
export const fetchTheaterAnalytics = createAsyncThunk(
  "theaterAnalytics/fetchAnalytics",
  async ({ id, year }, { rejectWithValue }) => {
    try {
      const response = await GetAlltheateranalytics(id, year);
      console.log(response)
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
      });
  },
});

export const { clearAnalyticsData } = theaterAnalyticsSlice.actions;

export default theaterAnalyticsSlice.reducer;
