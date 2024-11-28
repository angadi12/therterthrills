// store/expenseSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CreateExpanseapi, GetExpensebyBranch, Getexpensebyid, UpadteExpenseapi } from '@/lib/API/Expenses';

// Async Thunks
export const createExpense = createAsyncThunk(
  'expenses/createExpense',
  async (data, { rejectWithValue }) => {
    try {
      const response = await CreateExpanseapi(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to create expense");
    }
  }
);

export const fetchExpensesByBranch = createAsyncThunk(
  'expenses/fetchExpensesByBranch',
  async (branchId, { rejectWithValue }) => {
    try {
      const response = await GetExpensebyBranch(branchId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch expenses");
    }
  }
);

export const fetchExpenseById = createAsyncThunk(
  'expenses/fetchExpenseById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await Getexpensebyid(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch expense");
    }
  }
);

export const updateExpense = createAsyncThunk(
  'expenses/updateExpense',
  async ({ data, id }, { rejectWithValue }) => {
    try {
      const response = await UpadteExpenseapi(data, id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to update expense");
    }
  }
);

// Slice
const expenseSlice = createSlice({
  name: 'expenses',
  initialState: {
    expenses: [],
    expense: null,
    status: 'idle',
    error: null,
    singleExpenseStatus: 'idle',
    singleExpenseError: null,
    selectedExpenseId: null,
    setopenexpense:false
  },
  reducers: {
    setSelectedExpenseId: (state, action) => {
      state.selectedExpenseId = action.payload;
    },
    setOpenexpense: (state, action) => {
      state.setopenexpense = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createExpense.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createExpense.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.expenses.push(action.payload);
      })
      .addCase(createExpense.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchExpensesByBranch.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchExpensesByBranch.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.expenses = action.payload;
      })
      .addCase(fetchExpensesByBranch.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchExpenseById.pending, (state) => {
        state.singleExpenseStatus = 'loading';
      })
      .addCase(fetchExpenseById.fulfilled, (state, action) => {
        state.singleExpenseStatus = 'succeeded';
        state.expense = action.payload;
      })
      .addCase(fetchExpenseById.rejected, (state, action) => {
        state.singleExpenseStatus = 'failed';
        state.singleExpenseError = action.error.message;
      })
      .addCase(updateExpense.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateExpense.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.expenses.findIndex(exp => exp._id === action.payload._id);
        if (index !== -1) {
          state.expenses[index] = action.payload;
        }
      })
      .addCase(updateExpense.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setSelectedExpenseId,setOpenexpense } = expenseSlice.actions;

export default expenseSlice.reducer;
