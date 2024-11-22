import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Createbranchapi, Getbranch } from "@/lib/API/Branch";

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
    Branchid:"",
    error: null,
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
      });
  },
});

export const { setBranches, setBranchError,setSelectedBranch,setFilterQuery,Setopenbranch,Setopenadmin,Setbranchid,Setopenupdatebranch } = branchSlice.actions;

export default branchSlice.reducer;
