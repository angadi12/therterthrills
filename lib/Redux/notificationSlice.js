// src/slices/notificationSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Getnotifications, DeleteNotification } from "@/lib/API/Notification"; // Import API functions

// Async thunk to fetch notifications
export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async (_, { rejectWithValue }) => {
    try {
      const response = await Getnotifications();
      return response.notifications; // Assuming the response contains a notifications array
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Async thunk to delete a notification
export const deleteNotification = createAsyncThunk(
  "notifications/deleteNotification",
  async (id, { rejectWithValue }) => {
    try {
      const response = await DeleteNotification(id);
      return { id }; // Return the id of the deleted notification
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  notifications: [],
  loading: false,
  error: null,
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handling fetch notifications actions
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
        state.error = null;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handling delete notification actions
      .addCase(deleteNotification.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteNotification.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = state.notifications.filter(
          (notification) => notification.id !== action.payload.id
        );
        state.error = null;
      })
      .addCase(deleteNotification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default notificationSlice.reducer;
