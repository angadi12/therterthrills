import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Createbranchapi, Getbranch,Getbranchanalytics,Getbranchsummary } from "@/lib/API/Branch";

// Define the async thunk
export const fetchBranches = createAsyncThunk(
  "branches/fetchBranches",
  async (_, { rejectWithValue }) => {
    try {
      const response = await Getbranch();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const fetchBranchesanalytics = createAsyncThunk(
  "branches/fetchBranchesanalytics",
  async (_, { rejectWithValue }) => {
    try {
      const response = await Getbranchanalytics();
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const fetchBranchsummary = createAsyncThunk(
  "branches/fetchBranchsummary",
  async (id, { rejectWithValue }) => {
    try {
      const response = await Getbranchsummary(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createBranch = createAsyncThunk(
  "branches/createBranch",
  async (branchData, { dispatch }) => {
    const result = await Createbranchapi(branchData);
    if (result.status) {
      dispatch(fetchBranches());
      return result;
    } else {
      throw new Error(result.message || "Failed to create branch");
    }
  }
);

const branchSlice = createSlice({
  name: "branches",
  initialState: {
    branches: [],
    selectedBranchId: null,
    filterQuery: '',
    status: "idle", 
    openbranch:false,
    openupdatebranch:false,
    openadmin:false,
    openupdateadmin:false,
    Branchid:"",
    error: null,

    branchData:[],
    branchDataloading:false,
    branchDataerror:null,

    branchSummaryData:[],
    branchSummaryloading:false,
    branchSummaryerror:null

  },
  reducers: {
    setBranches(state, action) {
      state.branches = action.payload;
      state.status = "succeeded";
    },
    setBranchError(state, action) {
      state.status = "failed";
      state.error = action.payload;
    },
    setSelectedBranch: (state, action) => {
      state.selectedBranchId = action.payload;
    },
    setFilterQuery(state, action) {
      state.filterQuery = action.payload;
    },
    Setopenbranch(state, action) {
      state.openbranch = action.payload;
    },
    Setopenupdatebranch(state, action) {
      state.openupdatebranch = action.payload;
    },
    Setopenupdateadmin(state, action) {
      state.openupdateadmin = action.payload;
    },
    Setopenadmin(state, action) {
      state.openadmin = action.payload;
    },
    Setbranchid(state, action) {
      state.Branchid = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBranches.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBranches.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.branches = action.payload;
      })
      .addCase(fetchBranches.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createBranch.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(createBranch.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(fetchBranchesanalytics.pending, (state, action) => {
        state.branchDataloading = true;
        state.branchDataerror = null;

      })
      .addCase(fetchBranchesanalytics.fulfilled, (state, action) => {
        state.branchDataloading = false;
        state.branchData = action.payload;

      })
      .addCase(fetchBranchesanalytics.rejected, (state, action) => {
        state.branchDataloading = false;
        state.branchDataerror = action.payload;
      })

      .addCase(fetchBranchsummary.pending, (state, action) => {
        state.branchSummaryloading = true;
        state.branchSummaryerror = null;

      })
      .addCase(fetchBranchsummary.fulfilled, (state, action) => {
        state.branchSummaryloading = false;
        state.branchSummaryData = action.payload;

      })
      .addCase(fetchBranchsummary.rejected, (state, action) => {
        state.branchSummaryloading = false;
        state.branchSummaryerror = action.payload;
      });
  },
});

export const { setBranches, setBranchError,setSelectedBranch,setFilterQuery,Setopenbranch,Setopenadmin,Setbranchid,Setopenupdatebranch ,Setopenupdateadmin} = branchSlice.actions;

export default branchSlice.reducer;
