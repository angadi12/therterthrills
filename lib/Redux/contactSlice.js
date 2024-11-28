import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {GetAllticketbydates} from "@/lib/API/Contact"
// Async thunk for fetching contacts by date range
export const fetchContactsByDateRange = createAsyncThunk(
    "expenses/fetchByBranchAndDate",
    async ({from, to }, { rejectWithValue }) => {
      try {
      
       const response = await GetAllticketbydates({ from, to })
        return response.data; 
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
      }
    }
  );

const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    contacts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContactsByDateRange.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContactsByDateRange.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = action.payload;
      })
      .addCase(fetchContactsByDateRange.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default contactsSlice.reducer;
