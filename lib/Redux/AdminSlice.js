import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  Getadminsbybranchid,
  Getadminbyid,
  Createadminapi,
  Upadteadminapi,
  Deleteadminapi,
} from "@/lib/API/Admin";

// Initial state
const initialState = {
  admins: [], // List of admins
  selectedAdmin: null, // Details of a single admin
  adminsStatus: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  selectedAdminStatus: "idle", // Separate status for fetching a single admin
  error: null,
};

// Async thunks
export const fetchAdminsByBranchId = createAsyncThunk(
  "admin/fetchAdminsByBranchId",
  async (branchId, { rejectWithValue }) => {
    try {
      const response = await Getadminsbybranchid(branchId);
      return response?.data?.admins;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAdminById = createAsyncThunk(
  "admin/fetchAdminById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await Getadminbyid(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice
const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    resetSelectedAdmin(state) {
      state.selectedAdmin = null;
      state.selectedAdminStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch admins by branch ID
      .addCase(fetchAdminsByBranchId.pending, (state) => {
        state.adminsStatus = "loading";
      })
      .addCase(fetchAdminsByBranchId.fulfilled, (state, action) => {
        state.adminsStatus = "succeeded";
        state.admins = action.payload;
      })
      .addCase(fetchAdminsByBranchId.rejected, (state, action) => {
        state.adminsStatus = "failed";
        state.error = action.payload;
      })

      // Fetch single admin by ID
      .addCase(fetchAdminById.pending, (state) => {
        state.selectedAdminStatus = "loading";
      })
      .addCase(fetchAdminById.fulfilled, (state, action) => {
        state.selectedAdminStatus = "succeeded";
        state.selectedAdmin = action.payload;
      })
      .addCase(fetchAdminById.rejected, (state, action) => {
        state.selectedAdminStatus = "failed";
        state.error = action.payload;
      });
  },
});

// Export actions and reducer
export const { resetSelectedAdmin } = adminSlice.actions;
export default adminSlice.reducer;
